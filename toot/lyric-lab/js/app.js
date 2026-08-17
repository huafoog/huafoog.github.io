/* ============================================================
 * RHYME LAB · 交互层
 * ============================================================ */
'use strict';

const $ = id => document.getElementById(id);
const el = {
  themeInput: $('themeInput'), genBtn: $('genBtn'),
  songTitle: $('songTitle'), songTags: $('songTags'), lyricsBox: $('lyricsBox'),
  copyBtn: $('copyBtn'), downloadBtn: $('downloadBtn'), diceBtn: $('diceBtn'),
  rhymeMode: $('rhymeMode'), lengthSelect: $('lengthSelect'), rhymeSelect: $('rhymeSelect'),
  melodyBox: $('melodyBox'), scaleSelect: $('scaleSelect'), toneSelect: $('toneSelect'),
  drumToggle: $('drumToggle'), melodyPlayBtn: $('melodyPlayBtn'), pianoRoll: $('pianoRoll'),
  meterBar: $('meterBar'), diagText: $('diagText'), testToneBtn: $('testToneBtn'),
  toast: $('toast')
};

const state = { style: 'oldschool', voice: 'duet', last: null, comp: null };

/* ---------- Chips 选择 ---------- */
function bindChips(id, key, onChange) {
  document.querySelectorAll('#' + id + ' .chip').forEach(c => {
    c.onclick = () => {
      document.querySelectorAll('#' + id + ' .chip').forEach(x => x.classList.remove('sel'));
      c.classList.add('sel');
      state[key] = c.dataset[key];
      if (onChange) onChange(state[key]);
    };
  });
}
bindChips('styleChips', 'style');
bindChips('voiceChips', 'voice');

/* 主题快捷 chips 填入输入框 */
document.querySelectorAll('#themeChips .chip').forEach(c => {
  c.onclick = () => {
    el.themeInput.value = c.dataset.theme;
    generate();
  };
});

/* ---------- 生成 ---------- */
let genTimer = null;
function generate() {
  clearTimeout(genTimer);
  el.genBtn.classList.add('generating');

  const res = LyricEngine.generate({
    themeInput: el.themeInput.value,
    style: state.style,
    voice: state.voice,
    rhymeMode: el.rhymeMode.value,
    length: el.lengthSelect.value,
    rhymeKey: el.rhymeSelect.value || null
  });
  state.last = res;

  /* 歌名 + 标签 */
  el.songTitle.textContent = res.title;
  el.songTags.innerHTML = '';
  const tagData = [
    { cls:'', html: res.style.name + ' <b>' + res.style.bpm + ' BPM</b>' },
    { cls:'rhyme-tag', html: '韵脚：' + res.rhyme.name + ' <b>' + res.rhyme.vowel + '</b>' },
    { cls:'', html: '主题：' + res.themeName }
  ];
  tagData.forEach(t => {
    const span = document.createElement('span');
    span.className = 'tag ' + t.cls;
    span.innerHTML = t.html;
    el.songTags.appendChild(span);
  });

  /* 歌词渲染（逐行浮现） */
  el.lyricsBox.innerHTML = '';
  const frag = document.createDocumentFragment();
  let lineIdxCounter = 0;
  res.lines.forEach((ln, i) => {
    const div = document.createElement('div');
    if (ln.role === 'tag') {
      div.className = 'line tag';
      div.textContent = ln.text;
    } else {
      div.className = 'line';
      div.style.animationDelay = (i * 70) + 'ms';
      /* 节拍徽章（正拍起/反拍起），由 buildMelody 填充 */
      const beat = document.createElement('span');
      beat.className = 'role beat-badge';
      beat.dataset.idx = lineIdxCounter++;
      div.appendChild(beat);
      const role = document.createElement('span');
      role.className = 'role ' + ln.role;
      role.textContent = ln.role === 'male' ? '男声' : '女声';
      div.appendChild(role);
      if (ln.rhyme) {
        /* 高亮句尾韵脚词 */
        const idx = ln.text.lastIndexOf(ln.rhyme);
        if (idx >= 0) {
          div.appendChild(document.createTextNode(ln.text.slice(0, idx)));
          const r = document.createElement('span');
          r.className = 'rhyme-word';
          r.textContent = ln.rhyme;
          r.title = '韵脚 · ' + res.rhyme.name;
          div.appendChild(r);
          div.appendChild(document.createTextNode(ln.text.slice(idx + ln.rhyme.length)));
        } else {
          div.appendChild(document.createTextNode(ln.text));
        }
      } else {
        div.appendChild(document.createTextNode(ln.text));
      }
    }
    frag.appendChild(div);
  });
  el.lyricsBox.appendChild(frag);

  /* 歌词区顶部对齐 */
  el.lyricsBox.scrollTop = 0;

  /* 旋律参考：编配 + 渲染钢琴卷帘 */
  buildMelody(res);

  genTimer = setTimeout(() => el.genBtn.classList.remove('generating'), 700);
}

/* ---------- 旋律参考 ---------- */
let lineEls = [];
function buildMelody(res) {
  MelodyEngine.stop();
  el.melodyPlayBtn.textContent = '▶ 试听';

  const bpm = res.style.bpm;
  const comp = MelodyEngine.compose(
    res.lines, bpm,
    el.scaleSelect.value,
    el.toneSelect.value,
    el.drumToggle.checked
  );
  state.comp = comp;
  MelodyEngine.setTone(el.toneSelect.value);

  el.melodyBox.style.display = 'block';

  /* 记录歌词行 DOM（用于播放时高亮） */
  lineEls = Array.from(el.lyricsBox.querySelectorAll('.line:not(.tag)'));

  /* 钢琴卷帘：每行一条音轨，竖轴音高、横轴时间 */
  const rows = comp.visual;
  let minPitch = Infinity, maxPitch = -Infinity;
  rows.forEach(v => v.notes.forEach(n => {
    if (n.pitch < minPitch) minPitch = n.pitch;
    if (n.pitch > maxPitch) maxPitch = n.pitch;
  }));
  if (minPitch === Infinity) { minPitch = 0; maxPitch = 7; }
  const pitchSpan = Math.max(7, maxPitch - minPitch + 1);
  const totalDur = comp.duration;
  const stepDur = 60 / bpm;

  el.pianoRoll.innerHTML = '';
  rows.forEach((row, ri) => {
    const rowEl = document.createElement('div');
    rowEl.className = 'pr-row' + (row.role === 'female' ? ' pr-f' : ' pr-m');
    rowEl.dataset.idx = ri;

    const label = document.createElement('div');
    label.className = 'pr-label';
    label.textContent = (row.role === 'female' ? '女' : '男') + ' · ' + (row.text.length > 8 ? row.text.slice(0, 8) + '…' : row.text);
    rowEl.appendChild(label);

    const track = document.createElement('div');
    track.className = 'pr-track';
    /* 节拍网格：每行画 4/4 拍位竖线（正拍实线、反拍虚线） */
    const lineDur = row.lineBeats * stepDur;
    for (let b = 0; b <= row.lineBeats; b++) {
      const g = document.createElement('div');
      const isOnBeat = b === Math.floor(b) && b % 1 === 0;
      g.className = 'pr-gridline' + (isOnBeat ? ' on' : ' off');
      const leftPct = (b / row.lineBeats) * 100;
      g.style.left = leftPct + '%';
      if (b % 1 !== 0) g.style.display = 'none'; /* 反拍线由音符位置体现，避免过密 */
      track.appendChild(g);
    }
    row.notes.forEach(n => {
      const nb = document.createElement('div');
      nb.className = 'pr-note' + (n.pitch === 0 ? ' pr-root' : '') + (n.off ? ' pr-off' : '');
      const left = (n.start / totalDur) * 100;
      const width = Math.max(2.5, (n.dur / totalDur) * 100);
      const top = ((maxPitch - n.pitch) / pitchSpan) * 100;
      nb.style.left = left + '%';
      nb.style.width = width + '%';
      nb.style.top = top + '%';
      nb.style.height = (100 / pitchSpan) * 0.82 + '%';
      nb.title = '音高 ' + n.pitch + (n.off ? ' · 反拍' : ' · 正拍') + ' · 第 ' + (ri + 1) + ' 行';
      track.appendChild(nb);
    });
    rowEl.appendChild(track);
    el.pianoRoll.appendChild(rowEl);

    /* 填充歌词行的节拍徽章（正拍起/反拍起） */
    const badge = el.lyricsBox.querySelector('.beat-badge[data-idx="' + ri + '"]');
    if (badge) {
      const off = row.offStart > 0;
      badge.textContent = off ? '反拍起' : '正拍起';
      badge.classList.add(off ? 'off' : 'on');
      badge.title = (off ? '从后半拍（&）起句，切分感' : '从正拍起句，稳') + ' · BPM ' + bpm + ' · 4/4';
    }
  });

  /* 播放进度游标 */
  const cursor = document.createElement('div');
  cursor.className = 'pr-cursor';
  cursor.id = 'prCursor';
  el.pianoRoll.appendChild(cursor);
}

/* 播放旋律 */
el.melodyPlayBtn.onclick = () => {
  if (!state.comp) return;
  if (MelodyEngine.isPlaying()) {
    MelodyEngine.stop();
    el.melodyPlayBtn.textContent = '▶ 试听';
    clearLineHighlight();
    hideCursor();
    return;
  }
  MelodyEngine.setTone(el.toneSelect.value);
  MelodyEngine.play(state.comp, (lineIdx, now) => {
    clearLineHighlight();
    if (lineIdx >= 0 && lineEls[lineIdx]) lineEls[lineIdx].classList.add('playing');
    const rows = el.pianoRoll.querySelectorAll('.pr-row');
    rows.forEach((r, i) => r.classList.toggle('pr-active', i === lineIdx));
    showCursor(now);
    /* 更新小节/拍位显示 */
    const bp = $('beatPos');
    if (bp && state.comp) {
      const step = 60 / state.comp.bpm;
      const beat = now / step;
      const bar = Math.floor(beat / 4) + 1;
      const inBar = (Math.floor(beat % 4)) + 1;
      bp.textContent = '小节 ' + bar + ' · 第 ' + inBar + ' 拍' + (beat % 1 >= 0.5 ? ' (反拍)' : '');
    }
  }, () => {
    /* 音频被策略拦截 */
    el.melodyPlayBtn.textContent = '▶ 试听';
    toast('浏览器拦截了音频：请点击页面任意处后再试听');
  });
  el.melodyPlayBtn.textContent = '■ 停止';
};

/* 首次用户手势（点击/触摸）时预热解锁音频，确保后续试听立即有声 */
document.addEventListener('pointerdown', function unlockOnce() {
  MelodyEngine.unlock();
  document.removeEventListener('pointerdown', unlockOnce);
}, { once: true });

/* ---------- 音频自检：电平监测 ---------- */
let meterRaf = null;
function startMeter() {
  if (meterRaf) return;
  const loop = () => {
    const lv = MelodyEngine.getLevel();
    el.meterBar.style.width = Math.max(2, lv * 100) + '%';
    if (lv > 0.02) {
      el.diagText.textContent = '音频状态：正在发声 ✓';
      el.diagText.classList.add('active');
    } else {
      el.diagText.classList.remove('active');
    }
    meterRaf = requestAnimationFrame(loop);
  };
  loop();
}
startMeter();

/* 测试音按钮：验证音频链路是否真的能出声 */
el.testToneBtn.onclick = () => {
  MelodyEngine.unlock().then(ok => {
    if (!ok) { toast('音频被拦截：请点击页面任意处后重试'); return; }
    el.testToneBtn.classList.add('playing');
    el.diagText.textContent = '播放测试音… 若听不到，检查浏览器/系统音量';
    el.diagText.classList.add('active');
    MelodyEngine.playTestTone().then(scheduled => {
      if (!scheduled) toast('音频不可用');
    });
    setTimeout(() => el.testToneBtn.classList.remove('playing'), 900);
  });
};

/* 切换音色/音阶/鼓点时若在播放，重编配并重播 */
[el.scaleSelect, el.toneSelect, el.drumToggle].forEach(c => {
  c.addEventListener('change', () => {
    if (!state.last) return;
    const wasPlaying = MelodyEngine.isPlaying();
    buildMelody(state.last);
    if (wasPlaying) {
      MelodyEngine.setTone(el.toneSelect.value);
      MelodyEngine.play(state.comp, (lineIdx, now) => {
        clearLineHighlight();
        if (lineIdx >= 0 && lineEls[lineIdx]) lineEls[lineIdx].classList.add('playing');
        const rows = el.pianoRoll.querySelectorAll('.pr-row');
        rows.forEach((r, i) => r.classList.toggle('pr-active', i === lineIdx));
        showCursor(now);
      });
      el.melodyPlayBtn.textContent = '■ 停止';
    }
  });
});

function clearLineHighlight() {
  lineEls.forEach(l => l.classList.remove('playing'));
}
function hideCursor() {
  const c = $('prCursor');
  if (c) c.style.display = 'none';
}
function showCursor(now) {
  const c = $('prCursor');
  if (!c || !state.comp) return;
  c.style.display = 'block';
  const pct = Math.min(100, (now / state.comp.duration) * 100);
  c.style.left = pct + '%';
}

/* ---------- 复制 ---------- */
function plainText() {
  if (!state.last) return '';
  const t = state.last;
  let out = t.title + '\n';
  out += '[' + t.style.name + ' · ' + t.style.bpm + ' BPM · 韵脚 ' + t.rhyme.name + ']\n\n';
  t.lines.forEach(ln => {
    if (ln.role === 'tag') out += ln.text + '\n';
    else out += '[' + (ln.role === 'male' ? '男声' : '女声') + '] ' + ln.text + '\n';
  });
  return out;
}

el.copyBtn.onclick = () => {
  const txt = plainText();
  if (!txt) return toast('先生成一首歌词吧');
  copyText(txt);
};

function copyText(txt) {
  /* 优先使用 Clipboard API（https/localhost 环境） */
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(txt)
      .then(() => toast('已复制到剪贴板 ✓'))
      .catch(() => legacyCopy(txt));
  } else {
    legacyCopy(txt);
  }
}

/* file:// 等场景的降级复制 */
function legacyCopy(txt) {
  const ta = document.createElement('textarea');
  ta.value = txt;
  ta.style.cssText = 'position:fixed;top:-999px;left:-999px;opacity:0;';
  document.body.appendChild(ta);
  ta.select();
  try {
    document.execCommand('copy');
    toast('已复制到剪贴板 ✓');
  } catch (e) {
    toast('复制失败，请手动选择复制');
  }
  document.body.removeChild(ta);
}

el.downloadBtn.onclick = () => {
  const txt = plainText();
  if (!txt) return toast('先生成一首歌词吧');
  const blob = new Blob(['\ufeff' + txt], { type: 'text/plain;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = (state.last.title || '歌词') + '.txt';
  a.click();
  URL.revokeObjectURL(a.href);
  toast('已下载 .txt ✓');
};

el.diceBtn.onclick = generate;
el.genBtn.onclick = generate;

/* Enter 生成 */
el.themeInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') generate();
});

/* ---------- Toast ---------- */
let toastTimer = null;
function toast(msg) {
  el.toast.textContent = msg;
  el.toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.toast.classList.remove('show'), 1800);
}

/* ---------- 初始化：进来自动生成一首 ---------- */
el.themeInput.value = '熬夜到天亮';
generate();
