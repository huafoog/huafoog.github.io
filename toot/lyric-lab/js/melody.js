/* ============================================================
 * QINGSHAN RHYME LAB · 旋律参考引擎
 * 根据歌词字数/韵脚自动编配旋律线 + 鼓点，Web Audio 实时合成
 * ============================================================ */

const MelodyEngine = (() => {
  'use strict';

  /* ---------- 音阶（半音集，相对根音） ---------- */
  const SCALES = {
    minor:      { name: '小调',   semis: [0, 2, 3, 5, 7, 8, 10] },
    major:      { name: '大调',   semis: [0, 2, 4, 5, 7, 9, 11] },
    pentatonic: { name: '五声',   semis: [0, 2, 4, 7, 9] },
    blues:      { name: '布鲁斯', semis: [0, 3, 5, 6, 7, 10] }
  };

  /* ---------- 音色参数 ---------- */
  const TONES = {
    piano:  { osc: 'triangle', decay: 0.32, bright: 1800 },
    epiano: { osc: 'sine',     decay: 0.5,  bright: 1200, shimmer: true },
    pluck:  { osc: 'square',   decay: 0.18, bright: 2400 },
    pad:    { osc: 'sawtooth', decay: 0.8,  bright: 900 }
  };

  /* ---------- 状态 ---------- */
  let actx = null, master = null, noiseBuf = null, analyser = null;
  let playing = false, schedTimer = null, tickTimer = null, idx = 0;
  let curEvents = [], visualGen = 0;
  let audioReady = false;

  function ensureAudio() {
    if (!actx) {
      actx = new (window.AudioContext || window.webkitAudioContext)();
      master = actx.createGain();
      master.gain.value = 0.9;
      /* Analyser 用于电平监测（自检：确认页面确实在发声） */
      analyser = actx.createAnalyser();
      analyser.fftSize = 256;
      master.connect(analyser);
      analyser.connect(actx.destination);
      noiseBuf = actx.createBuffer(1, actx.sampleRate * 2, actx.sampleRate);
      const d = noiseBuf.getChannelData(0);
      for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    }
    if (actx.state === 'suspended') return actx.resume();
    return Promise.resolve();
  }

  /* 实时电平（0~1），用于 UI 电平条 */
  function getLevel() {
    if (!analyser) return 0;
    const buf = new Uint8Array(analyser.fftSize);
    analyser.getByteTimeDomainData(buf);
    let sum = 0;
    for (let i = 0; i < buf.length; i++) {
      const v = (buf[i] - 128) / 128;
      sum += v * v;
    }
    return Math.min(1, Math.sqrt(sum / buf.length) * 3);
  }

  /* 测试音：验证音频链路是否正常出声 */
  function playTestTone() {
    return waitAudioReady().then(ready => {
      if (!ready) return false;
      const t0 = actx.currentTime + 0.02;
      [440, 554, 660].forEach((f, i) => {
        const o = actx.createOscillator();
        o.type = 'sine';
        o.frequency.value = f;
        const g = actx.createGain();
        g.gain.setValueAtTime(0.0001, t0 + i * 0.18);
        g.gain.exponentialRampToValueAtTime(0.5, t0 + i * 0.18 + 0.03);
        g.gain.exponentialRampToValueAtTime(0.0001, t0 + i * 0.18 + 0.16);
        o.connect(g); g.connect(master);
        o.start(t0 + i * 0.18); o.stop(t0 + i * 0.18 + 0.2);
      });
      return true;
    });
  }

  /* 等待音频上下文真正可播放 */
  function waitAudioReady() {
    if (audioReady) return Promise.resolve(true);
    return ensureAudio().then(() => {
      audioReady = true;
      return true;
    }).catch(() => false);
  }

  /**
   * 音频解锁：必须在用户手势（点击）中调用才有效。
   * 浏览器自动播放策略要求 AudioContext 在用户交互后 resume，
   * 提前预热避免首次试听无声。
   */
  function unlock() {
    ensureAudio();
    if (actx && actx.state === 'suspended') {
      return actx.resume().then(() => { audioReady = true; return true; }).catch(() => false);
    }
    audioReady = true;
    return Promise.resolve(true);
  }

  function isAudioBlocked() {
    return actx !== null && actx.state === 'suspended';
  }

  /* ---------- 音符合成 ---------- */
  function note(freq, time, dur, vel, tone) {
    const t = TONES[tone] || TONES.piano;
    const g = actx.createGain();
    const filt = actx.createBiquadFilter();
    filt.type = 'lowpass';
    filt.frequency.value = t.bright;
    g.connect(filt); filt.connect(master);

    const o = actx.createOscillator();
    o.type = t.osc;
    o.frequency.value = freq;
    /* 电钢柔和的泛音 */
    if (t.shimmer) {
      const o2 = actx.createOscillator();
      o2.type = 'sine';
      o2.frequency.value = freq * 2;
      const g2 = actx.createGain();
      g2.gain.value = 0.25;
      o2.connect(g2); g2.connect(filt);
      o2.start(time); o2.stop(time + dur);
    }

    g.gain.setValueAtTime(0.0001, time);
    g.gain.exponentialRampToValueAtTime(vel, time + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, time + dur);
    o.connect(g);
    o.start(time); o.stop(time + dur + 0.05);
  }

  /* ---------- 鼓点合成 ---------- */
  function kick(time, vel) {
    const o = actx.createOscillator(); o.type = 'sine';
    o.frequency.setValueAtTime(150, time);
    o.frequency.exponentialRampToValueAtTime(45, time + 0.1);
    const g = actx.createGain();
    g.gain.setValueAtTime(vel, time);
    g.gain.exponentialRampToValueAtTime(0.001, time + 0.25);
    o.connect(g); g.connect(master);
    o.start(time); o.stop(time + 0.28);
  }
  function snare(time, vel) {
    const src = actx.createBufferSource(); src.buffer = noiseBuf;
    const bp = actx.createBiquadFilter(); bp.type = 'bandpass';
    bp.frequency.value = 1800; bp.Q.value = 0.8;
    const g = actx.createGain();
    g.gain.setValueAtTime(vel, time);
    g.gain.exponentialRampToValueAtTime(0.001, time + 0.16);
    src.connect(bp); bp.connect(g); g.connect(master);
    src.start(time); src.stop(time + 0.2);
  }
  function hat(time, vel) {
    const src = actx.createBufferSource(); src.buffer = noiseBuf;
    const hp = actx.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 7500;
    const g = actx.createGain();
    g.gain.setValueAtTime(vel, time);
    g.gain.exponentialRampToValueAtTime(0.001, time + 0.06);
    src.connect(hp); hp.connect(g); g.connect(master);
    src.start(time); src.stop(time + 0.08);
  }

  /* ---------- 编曲：歌词 → 旋律事件 ---------- */
  /**
   * lines: [{ text, role, rhyme }]
   * bpm, scaleKey, tone, drumOn
   * 返回 { events, drumEvents, visual, duration }
   * visual 每行含节拍元数据：
   *   startBeat 行起始拍位（浮点，如 0.0=正拍起 / 0.5=反拍起）
   *   charBeats 每字的拍位数组
   *   offStart  是否反拍起
   */
  function compose(lines, bpm, scaleKey, tone, drumOn) {
    const scale = SCALES[scaleKey] || SCALES.pentatonic;
    const root = 220; /* A3 附近，男声偏低，女声 Hook 可上移 */
    const step = 60 / bpm; /* 每拍秒数 */

    const events = [];      /* 旋律事件 */
    const drumEvents = [];  /* 鼓事件 */
    const visual = [];      /* 可视化：每行一个 { text, notes, start, ... } */
    let t = step;           /* 前奏：整拍起（1 拍留白，确保正拍对齐） */

    /* 基础鼓型：Boom Bap 风格 4/4 */
    const barBeats = 4;
    let bar = 0;

    lines.forEach(ln => {
      if (ln.role === 'tag') {
        /* 结构标签：留 1 拍过渡（保持整拍对齐），不唱词，只加鼓 */
        if (drumOn && bar > 0) {
          drumEvents.push({ time: t, type: 'kick', vel: 0.55 });
          drumEvents.push({ time: t + step * 0.5, type: 'hat', vel: 0.3 });
        }
        t += step;
        bar += 1;
        return;
      }

      /* 歌词行：字数为 n，每字一拍内的时值，整行 4-6 拍 */
      const chars = ln.text.replace(/[，。！？、：；""''（）\s]/g, '').split('');
      const n = chars.length;
      const lineBeats = Math.min(6, Math.max(3, Math.ceil(n / 2) + 1)); /* 字数多节奏密 */
      const beatPerChar = lineBeats / n;
      /* 声部：女声 Hook 上移五度，男声低沉 */
      const voiceShift = (ln.role === 'female') ? 5 : 0;

      /* 反拍 flow：约 1/4 的行从后半拍起（切分感，其他行正拍起） */
      const offStart = (Math.random() < 0.25) ? 0.5 : 0;
      const lineStart = t + offStart * step;
      const startBeat = lineStart / step; /* 行起始拍位（0.0=正拍，0.5=反拍） */

      const notes = [];
      let pitch = 0; /* 音阶内索引 */
      for (let c = 0; c < n; c++) {
        const isLast = c === n - 1;
        /* 音高游走：小步上下 + 尾字落回根音收束 */
        let target;
        if (isLast) target = 0;                    /* 韵脚/行尾 → 根音 */
        else {
          const r = Math.random();
          if (r < 0.45) target = pitch;            /* 同音反复 */
          else if (r < 0.75) target = pitch + (Math.random() < 0.6 ? 1 : -1);
          else target = pitch + (Math.random() < 0.5 ? 2 : -2);
        }
        target = Math.max(-4, Math.min(8, target));
        pitch = target;
        const semis = scale.semis[((target % scale.semis.length) + scale.semis.length) % scale.semis.length];
        const octave = Math.floor(target / scale.semis.length);
        const freq = root * Math.pow(2, (octave * 12 + semis + voiceShift) / 12);

        const dur = beatPerChar * step * (isLast ? 1.6 : 1);
        const noteTime = lineStart + c * beatPerChar * step;
        notes.push({ start: noteTime, dur, freq, pitch: octave * 12 + semis + voiceShift, off: isOffBeat(c, beatPerChar, offStart) });
        events.push({ time: noteTime, dur, freq, vel: isLast ? 0.5 : 0.42, role: ln.role });
      }

      /* 鼓点：每行重拍在第 1、3 拍（Boom Bap） */
      if (drumOn) {
        for (let b = 0; b < lineBeats; b++) {
          const bt = t + b * step;
          if (b % 4 === 0) drumEvents.push({ time: bt, type: 'kick', vel: 0.9 });
          else if (b % 4 === 2) drumEvents.push({ time: bt, type: 'snare', vel: 0.75 });
          else if (b % 2 === 1) drumEvents.push({ time: bt, type: 'hat', vel: 0.4 });
        }
      }

      const charBeats = [];
      for (let c = 0; c < n; c++) {
        charBeats.push(startBeat + c * beatPerChar);
      }
      visual.push({
        text: ln.text, role: ln.role, notes, start: lineStart,
        startBeat, offStart,
        charBeats,
        lineBeats
      });
      t += lineBeats * step;
      bar += lineBeats / barBeats;
    });

    /* 结尾留白 */
    const duration = t + 0.6;
    return { events, drumEvents, visual, duration, bpm, scaleKey, tone, drumOn };
  }

  /* 判断某字是否落在反拍（后半拍）上 */
  function isOffBeat(charIdx, beatPerChar, offStart) {
    const beatPos = offStart + charIdx * beatPerChar;
    const frac = beatPos - Math.floor(beatPos);
    return frac >= 0.5;
  }

  /* ---------- 播放 ---------- */
  function play(composition, onTick, onBlocked) {
    stop();
    /* 关键：先等待音频上下文 resume 成功，否则 currentTime 不前进、无声音 */
    waitAudioReady().then(ready => {
      if (!ready) {
        if (onBlocked) onBlocked();
        return; /* 音频被浏览器策略拦截（如 iframe 内） */
      }
      startScheduling(composition, onTick);
    });
  }

  function startScheduling(composition, onTick) {
    curEvents = composition.events.concat(composition.drumEvents.map(d => ({ ...d, isDrum: true })));
    curEvents.sort((a, b) => a.time - b.time);
    idx = 0;
    const baseTime = actx.currentTime + 0.12; /* 所有事件的绝对时基 */
    playing = true;
    visualGen++;
    const myGen = visualGen;

    schedTimer = setInterval(() => {
      if (!playing) return;
      const ahead = 0.15;
      while (idx < curEvents.length && baseTime + curEvents[idx].time < actx.currentTime + ahead) {
        scheduleEvent(curEvents[idx], baseTime + curEvents[idx].time);
        idx++;
      }
      if (idx >= curEvents.length && actx.currentTime > baseTime + composition.duration) {
        finish();
      }
    }, 30);

    /* 播放进度回调（高亮歌词行） */
    tickTimer = setInterval(() => {
      if (!playing || myGen !== visualGen) return;
      const now = actx.currentTime - baseTime;
      let lineIdx = -1;
      composition.visual.forEach((v, i) => {
        if (now >= v.start && now < v.start + 8 * stepDur(composition.bpm)) lineIdx = i;
      });
      if (onTick) onTick(lineIdx, Math.max(0, now));
    }, 120);
  }

  function scheduleEvent(ev, time) {
    if (ev.isDrum) {
      const v = ev.vel || 0.5;
      if (ev.type === 'kick') kick(time, v);
      else if (ev.type === 'snare') snare(time, v);
      else hat(time, v);
    } else {
      note(ev.freq, time, ev.dur, ev.vel, curTone());
    }
  }

  let toneKey = 'piano';
  function curTone() { return toneKey; }
  function setTone(k) { toneKey = k; }

  function stepDur(bpm) { return 60 / bpm; }

  function stop() {
    playing = false;
    if (schedTimer) { clearInterval(schedTimer); schedTimer = null; }
    if (tickTimer) { clearInterval(tickTimer); tickTimer = null; }
  }

  function finish() { stop(); return true; }

  function isPlaying() { return playing; }

  return { compose, play, stop, setTone, isPlaying, unlock, isAudioBlocked, getLevel, playTestTone, SCALES };
})();
