<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
<title>万能节拍器 · Metronome Pro</title>
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🎵</text></svg>">
<style>
  :root {
    --bg1:#0b0e17; --bg2:#141a2e;
    --card:rgba(255,255,255,.045); --card-brd:rgba(255,255,255,.09);
    --txt:#e8ecf8; --txt-dim:#8b93ad;
    --cyan:#22d3ee; --cyan2:#38bdf8; --purple:#a78bfa;
    --red:#ff4d6d; --orange:#ffb020; --green:#2ed573;
    --font:"Segoe UI","PingFang SC","Microsoft YaHei",system-ui,sans-serif;
  }
  * { margin:0; padding:0; box-sizing:border-box; -webkit-tap-highlight-color:transparent; }
  body {
    font-family:var(--font); color:var(--txt); min-height:100vh;
    background:
      radial-gradient(1200px 700px at 85% -10%, rgba(167,139,250,.14), transparent 60%),
      radial-gradient(1000px 600px at -10% 20%, rgba(34,211,238,.12), transparent 55%),
      linear-gradient(160deg, var(--bg1), var(--bg2));
    background-attachment:fixed;
    display:flex; flex-direction:column; align-items:center;
    padding:18px 14px 40px;
  }
  header { width:100%; max-width:780px; display:flex; align-items:center; justify-content:space-between; margin-bottom:14px; }
  .logo { display:flex; align-items:center; gap:10px; }
  .logo .icon {
    width:38px; height:38px; border-radius:11px;
    background:linear-gradient(135deg,var(--cyan),var(--purple));
    display:flex; align-items:center; justify-content:center;
    font-size:20px; box-shadow:0 4px 18px rgba(34,211,238,.35);
  }
  .logo h1 { font-size:18px; font-weight:700; letter-spacing:.5px; }
  .logo small { display:block; color:var(--txt-dim); font-size:11px; font-weight:400; letter-spacing:1.5px; }
  .header-status { font-size:12px; color:var(--txt-dim); padding:6px 12px; border:1px solid var(--card-brd); border-radius:20px; background:var(--card); }
  .header-status b { color:var(--green); font-weight:600; }

  main { width:100%; max-width:780px; display:flex; flex-direction:column; gap:14px; }
  .card { background:var(--card); border:1px solid var(--card-brd); border-radius:18px; padding:18px; backdrop-filter:blur(12px); }
  .card h3 { font-size:13px; font-weight:600; color:var(--txt-dim); letter-spacing:2px; margin-bottom:12px; display:flex; align-items:center; gap:8px; }
  .card h3 .dot { width:6px; height:6px; border-radius:50%; background:linear-gradient(135deg,var(--cyan),var(--purple)); }

  /* ===== 播放区 ===== */
  .play-card { display:flex; flex-direction:column; align-items:center; padding:22px 18px 24px; }
  .bar-tag {
    font-size:12px; color:var(--txt-dim); letter-spacing:3px;
    background:var(--card); border:1px solid var(--card-brd);
    padding:5px 14px; border-radius:20px; margin-bottom:14px;
  }
  .bar-tag b { color:var(--cyan2); font-weight:700; }

  .ring-area { position:relative; width:300px; height:300px; }
  .ring { position:absolute; inset:0; }
  .beat-dot {
    position:absolute; left:50%; top:50%; width:32px; height:32px; margin:-16px;
    transform:rotate(var(--ang)) translateY(-134px);
    display:flex; align-items:center; justify-content:center;
  }
  .beat-dot .core {
    width:13px; height:13px; border-radius:50%;
    background:rgba(255,255,255,.10); border:1px solid rgba(255,255,255,.10);
    transition:background .09s, box-shadow .09s, transform .09s, border-color .09s;
  }
  .beat-dot.a3 .core { background:rgba(255,77,109,.35); border-color:rgba(255,77,109,.6); }
  .beat-dot.a2 .core { background:rgba(255,176,32,.30); border-color:rgba(255,176,32,.6); }
  .beat-dot.a1 .core { background:rgba(56,189,248,.28); border-color:rgba(56,189,248,.55); }
  .beat-dot.a0 .core { background:rgba(255,255,255,.06); border-color:rgba(255,255,255,.08); }
  .beat-dot.active .core { transform:scale(1.9); }
  .beat-dot.a3.active .core { background:var(--red); border-color:var(--red); box-shadow:0 0 16px var(--red), 0 0 36px rgba(255,77,109,.5); }
  .beat-dot.a2.active .core { background:var(--orange); border-color:var(--orange); box-shadow:0 0 14px var(--orange), 0 0 30px rgba(255,176,32,.45); }
  .beat-dot.a1.active .core { background:var(--cyan2); border-color:var(--cyan2); box-shadow:0 0 14px var(--cyan2), 0 0 30px rgba(56,189,248,.45); }

  .beat-circle {
    position:absolute; left:50%; top:50%; width:150px; height:150px; margin:-75px;
    border-radius:50%;
    background:radial-gradient(circle at 32% 28%, rgba(56,189,248,.16), rgba(11,14,23,.9) 62%);
    border:1px solid rgba(255,255,255,.10);
    display:flex; flex-direction:column; align-items:center; justify-content:center;
    gap:2px;
    transition:box-shadow .12s, transform .12s;
    cursor:pointer; user-select:none;
  }
  .beat-circle.on { box-shadow:0 0 26px rgba(56,189,248,.30); }
  .beat-circle.pulse { animation:pop .12s ease-out; }
  @keyframes pop { 0%{ transform:scale(.93);} 100%{ transform:scale(1.03);} }
  .bpm-big { font-size:42px; font-weight:800; font-variant-numeric:tabular-nums; line-height:1; }
  .bpm-big small { font-size:13px; font-weight:500; color:var(--txt-dim); margin-left:3px; }
  .beat-label { font-size:12px; color:var(--txt-dim); letter-spacing:1px; }

  .ctrl-row { display:flex; align-items:center; gap:12px; margin-top:16px; flex-wrap:wrap; justify-content:center; }
  .play-btn {
    min-width:150px; padding:14px 34px; border:none; border-radius:40px; cursor:pointer;
    font-size:16px; font-weight:700; font-family:inherit; letter-spacing:1px; color:#07121a;
    background:linear-gradient(135deg, var(--cyan), var(--cyan2));
    box-shadow:0 6px 24px rgba(34,211,238,.35);
    transition:transform .12s, box-shadow .12s, filter .12s;
  }
  .play-btn:hover { transform:translateY(-1px); filter:brightness(1.06); }
  .play-btn:active { transform:scale(.97); }
  .play-btn.stopping { background:linear-gradient(135deg, var(--red), #ff7a5c); box-shadow:0 6px 24px rgba(255,77,109,.35); }
  .ghost-btn {
    padding:12px 22px; border-radius:30px; cursor:pointer;
    background:var(--card); border:1px solid var(--card-brd);
    color:var(--txt); font-size:14px; font-weight:600; font-family:inherit;
    transition:border-color .12s, background .12s, transform .12s;
  }
  .ghost-btn:hover { border-color:var(--cyan); background:rgba(34,211,238,.08); }
  .ghost-btn:active { transform:scale(.96); }
  .ghost-btn .kbd { color:var(--txt-dim); font-size:11px; margin-left:6px; border:1px solid var(--card-brd); border-radius:5px; padding:1px 5px; }

  /* ===== 参数网格 ===== */
  .param-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(200px,1fr)); gap:14px; }
  .field label { display:block; font-size:12px; color:var(--txt-dim); letter-spacing:1.5px; margin-bottom:7px; }
  .field select, .field input[type=number] {
    width:100%; padding:10px 12px; border-radius:11px;
    background:rgba(11,14,23,.55); border:1px solid var(--card-brd);
    color:var(--txt); font-size:14px; font-family:inherit; outline:none;
    transition:border-color .12s;
  }
  .field select:focus { border-color:var(--cyan); }
  .field select option { background:#141a2e; color:var(--txt); }
  .vol-row { display:flex; align-items:center; gap:10px; }
  .vol-row .vol-val { min-width:38px; text-align:right; font-size:13px; color:var(--cyan2); font-weight:700; font-variant-numeric:tabular-nums; }

  input[type=range] { -webkit-appearance:none; appearance:none; width:100%; height:6px; border-radius:6px; background:rgba(255,255,255,.12); outline:none; }
  input[type=range]::-webkit-slider-thumb {
    -webkit-appearance:none; width:18px; height:18px; border-radius:50%;
    background:linear-gradient(135deg,var(--cyan),var(--purple));
    box-shadow:0 0 10px rgba(34,211,238,.5); cursor:pointer; border:none;
  }
  input[type=range]::-moz-range-thumb {
    width:18px; height:18px; border-radius:50%;
    background:linear-gradient(135deg,var(--cyan),var(--purple));
    box-shadow:0 0 10px rgba(34,211,238,.5); cursor:pointer; border:none;
  }

  /* ===== 预设 ===== */
  .chips { display:flex; flex-wrap:wrap; gap:9px; }
  .chip {
    padding:9px 16px; border-radius:24px; cursor:pointer;
    background:var(--card); border:1px solid var(--card-brd);
    color:var(--txt); font-size:13px; font-weight:600; font-family:inherit;
    transition:border-color .12s, background .12s, transform .12s, color .12s;
  }
  .chip:hover { border-color:var(--purple); transform:translateY(-1px); }
  .chip:active { transform:scale(.96); }
  .chip .meta { display:block; font-size:10px; color:var(--txt-dim); font-weight:400; margin-top:1px; }

  /* ===== 高级 ===== */
  details.adv { border:1px solid var(--card-brd); border-radius:14px; background:rgba(11,14,23,.35); overflow:hidden; }
  details.adv > summary {
    cursor:pointer; list-style:none; padding:14px 18px;
    font-size:14px; font-weight:600; display:flex; align-items:center; gap:8px;
  }
  details.adv > summary::-webkit-details-marker { display:none; }
  details.adv > summary .arrow { margin-left:auto; color:var(--txt-dim); transition:transform .2s; }
  details.adv[open] > summary .arrow { transform:rotate(180deg); }
  .adv-body { padding:4px 18px 18px; display:flex; flex-direction:column; gap:16px; }
  .adv-row { display:flex; align-items:center; gap:12px; flex-wrap:wrap; }
  .adv-row .lbl { font-size:13px; color:var(--txt); min-width:88px; }
  .adv-row .hint { font-size:11px; color:var(--txt-dim); }

  .editor { display:grid; gap:8px; margin-top:6px; }
  .editor .egrid { display:flex; gap:8px; flex-wrap:wrap; }
  .e-cell {
    width:42px; height:42px; border-radius:11px; cursor:pointer;
    background:rgba(255,255,255,.05); border:1px solid var(--card-brd);
    display:flex; align-items:center; justify-content:center;
    font-size:15px; font-weight:700; font-family:inherit; color:var(--txt);
    transition:background .1s, border-color .1s, transform .1s;
  }
  .e-cell:hover { transform:translateY(-2px); }
  .e-cell.c1 { background:rgba(56,189,248,.18); border-color:var(--cyan2); color:var(--cyan2); }
  .e-cell.c2 { background:rgba(255,176,32,.18); border-color:var(--orange); color:var(--orange); }
  .e-cell.c3 { background:rgba(255,77,109,.22); border-color:var(--red); color:var(--red); box-shadow:0 0 12px rgba(255,77,109,.25); }
  .e-cell .idx { font-size:9px; color:var(--txt-dim); position:absolute; }

  .switch { position:relative; width:44px; height:24px; flex:none; }
  .switch input { opacity:0; width:0; height:0; }
  .switch .slider {
    position:absolute; inset:0; border-radius:24px; cursor:pointer;
    background:rgba(255,255,255,.12); transition:background .18s;
  }
  .switch .slider::before {
    content:""; position:absolute; width:18px; height:18px; border-radius:50%;
    left:3px; top:3px; background:#fff; transition:transform .18s;
  }
  .switch input:checked + .slider { background:linear-gradient(135deg,var(--cyan),var(--purple)); }
  .switch input:checked + .slider::before { transform:translateX(20px); }

  .mini-btn {
    padding:8px 14px; border-radius:10px; cursor:pointer; font-size:12px;
    background:rgba(255,255,255,.05); border:1px solid var(--card-brd); color:var(--txt-dim);
    font-family:inherit; transition:border-color .12s, color .12s;
  }
  .mini-btn:hover { border-color:var(--cyan); color:var(--txt); }

  footer { margin-top:18px; font-size:12px; color:var(--txt-dim); text-align:center; line-height:1.9; }
  footer kbd { border:1px solid var(--card-brd); border-radius:5px; padding:1px 6px; background:rgba(255,255,255,.05); font-family:inherit; font-size:11px; }

  .toast {
    position:fixed; left:50%; bottom:34px; transform:translateX(-50%) translateY(20px);
    background:rgba(20,26,46,.95); border:1px solid var(--card-brd); color:var(--txt);
    padding:10px 20px; border-radius:30px; font-size:13px; opacity:0; pointer-events:none;
    transition:opacity .25s, transform .25s; z-index:99; box-shadow:0 8px 30px rgba(0,0,0,.4);
  }
  .toast.show { opacity:1; transform:translateX(-50%) translateY(0); }

  @media (max-width:560px) {
    .ring-area { width:250px; height:250px; }
    .beat-dot { transform:rotate(var(--ang)) translateY(-112px); }
    .beat-circle { width:120px; height:120px; margin:-60px; }
    .bpm-big { font-size:34px; }
    .play-btn { width:100%; }
  }
</style>
</head>
<body>
<header>
  <div class="logo">
    <div class="icon">🎵</div>
    <div>
      <h1>万能节拍器</h1>
      <small>METRONOME PRO</small>
    </div>
  </div>
  <div class="header-status">引擎 <b>Web Audio</b> · 高精度</div>
</header>

<main>
  <!-- 播放区 -->
  <section class="card play-card">
    <div class="bar-tag">小节 <b id="barNum">1</b> <span id="tsTag">· 4/4</span></div>
    <div class="ring-area">
      <div class="ring" id="ring"></div>
      <div class="beat-circle" id="beatCircle" title="点击显示/隐藏小节重置菜单">
        <div class="bpm-big" id="bpmValue">96<small>BPM</small></div>
        <div class="beat-label" id="beatLabel">第 1 拍</div>
      </div>
    </div>
    <div class="ctrl-row">
      <button class="play-btn" id="playBtn">▶ 开始</button>
      <button class="ghost-btn" id="tapBtn">敲击定速<span class="kbd">T</span></button>
    </div>
    <div class="ctrl-row" style="margin-top:14px; width:100%;">
      <div style="display:flex; align-items:center; gap:10px; width:100%;">
        <button class="mini-btn" id="bpmMinus" style="font-size:18px; padding:8px 16px;">−</button>
        <input type="range" id="bpmSlider" min="30" max="300" value="96" step="1" style="flex:1;">
        <button class="mini-btn" id="bpmPlus" style="font-size:18px; padding:8px 16px;">+</button>
      </div>
    </div>
    <div class="chips" id="bpmChips" style="margin-top:12px; justify-content:center;">
      <button class="chip" data-bpm="60">60</button>
      <button class="chip" data-bpm="72">72</button>
      <button class="chip" data-bpm="80">80</button>
      <button class="chip" data-bpm="90">90</button>
      <button class="chip" data-bpm="100">100</button>
      <button class="chip" data-bpm="120">120</button>
      <button class="chip" data-bpm="140">140</button>
      <button class="chip" data-bpm="150">150</button>
      <button class="chip" data-bpm="180">180</button>
    </div>
  </section>

  <!-- 参数 -->
  <section class="card">
    <h3><span class="dot"></span>节拍参数</h3>
    <div class="param-grid">
      <div class="field">
        <label>拍号</label>
        <select id="tsSelect">
          <option value="2/4">2/4</option>
          <option value="3/4">3/4</option>
          <option value="4/4" selected>4/4</option>
          <option value="5/4">5/4</option>
          <option value="6/4">6/4</option>
          <option value="2/2">2/2</option>
          <option value="6/8">6/8</option>
          <option value="7/8">7/8</option>
          <option value="9/8">9/8</option>
          <option value="12/8">12/8</option>
        </select>
      </div>
      <div class="field">
        <label>节拍细分</label>
        <select id="subSelect">
          <option value="none" selected>无（只打主拍）</option>
          <option value="eighth">八分音符</option>
          <option value="triplet">三连音</option>
          <option value="sixteenth">十六分音符</option>
        </select>
      </div>
      <div class="field">
        <label>音色</label>
        <select id="soundSelect">
          <option value="click" selected>经典滴答</option>
          <option value="drumkit">鼓组 · 动次打次 🥁</option>
          <option value="wood">木鱼</option>
          <option value="beep">电子蜂鸣</option>
          <option value="rim">鼓边</option>
          <option value="cowbell">牛铃</option>
          <option value="tick">高频敲击</option>
        </select>
      </div>
      <div class="field">
        <label>重音模式</label>
        <select id="accentSelect">
          <option value="auto" selected>跟随拍号（自动）</option>
          <option value="custom">自定义重音</option>
        </select>
      </div>
      <div class="field" style="grid-column:1/-1;">
        <label>音量</label>
        <div class="vol-row">
          <input type="range" id="volSlider" min="0" max="1" step="0.01" value="0.85">
          <span class="vol-val" id="volVal">85%</span>
        </div>
      </div>
    </div>
  </section>

  <!-- 说唱预设 -->
  <section class="card">
    <h3><span class="dot"></span>🎤 说唱 / 曲风一键预设</h3>
    <div class="chips" id="presetChips">
      <button class="chip" data-preset="Boom Bap">Boom Bap<span class="meta">90 BPM · 律动</span></button>
      <button class="chip" data-preset="Trap">Trap<span class="meta">145 BPM · 重低</span></button>
      <button class="chip" data-preset="Drill">Drill<span class="meta">140 BPM · 冷酷</span></button>
      <button class="chip" data-preset="Lo-fi">Lo-fi<span class="meta">78 BPM · 慵懒</span></button>
      <button class="chip" data-preset="House">House<span class="meta">126 BPM · 四踩</span></button>
      <button class="chip" data-preset="Reggaeton">Reggaeton<span class="meta">96 BPM · 摇摆</span></button>
      <button class="chip" data-preset="Grime">Grime<span class="meta">140 BPM · 干脆</span></button>
      <button class="chip" data-preset="Rock">Rock<span class="meta">120 BPM · 硬朗</span></button>
      <button class="chip" data-preset="Waltz">华尔兹 3/4<span class="meta">90 BPM</span></button>
      <button class="chip" data-preset="Folk68">民谣 6/8<span class="meta">80 BPM</span></button>
    </div>
  </section>

  <!-- 高级 -->
  <section class="card">
    <h3><span class="dot"></span>进阶功能</h3>
    <details class="adv">
      <summary>⚙️ 节奏型编辑器 / 复节奏 / 渐变速 / 训练 <span class="arrow">▼</span></summary>
      <div class="adv-body">
        <div class="adv-row">
          <span class="lbl">自定义重音</span>
          <span class="hint">点击格子循环：弱 → 中 → 强 → 无</span>
        </div>
        <div class="editor">
          <div class="egrid" id="editorGrid"></div>
        </div>

        <div class="adv-row">
          <span class="lbl">复节奏</span>
          <select id="polySelect" style="padding:8px 12px; border-radius:10px; background:rgba(11,14,23,.55); border:1px solid var(--card-brd); color:var(--txt); font-family:inherit;">
            <option value="off">关闭</option>
            <option value="2:3">2 : 3（三连感）</option>
            <option value="3:2">3 : 2（摇摆）</option>
            <option value="3:4">3 : 4</option>
            <option value="4:3">4 : 3</option>
            <option value="5:4">5 : 4</option>
          </select>
          <span class="hint">m:n = 每 n 拍叠加 m 个均匀击点</span>
        </div>

        <div class="adv-row">
          <span class="lbl">渐变速</span>
          <div style="display:flex; align-items:center; gap:10px;">
            <label class="switch"><input type="checkbox" id="accelToggle"><span class="slider"></span></label>
            <input type="number" id="accelInput" value="2" min="-10" max="10" step="1" style="width:64px; padding:8px; border-radius:10px; background:rgba(11,14,23,.55); border:1px solid var(--card-brd); color:var(--txt); font-family:inherit; text-align:center;">
            <span class="hint">BPM / 小节（可为负 = 渐慢）</span>
          </div>
        </div>

        <div class="adv-row">
          <span class="lbl">训练模式</span>
          <div style="display:flex; align-items:center; gap:10px;">
            <label class="switch"><input type="checkbox" id="trainToggle"><span class="slider"></span></label>
            <span class="hint">随机约 15% 小节静音，考验内心数拍</span>
          </div>
        </div>

        <div class="adv-row">
          <span class="lbl">其他</span>
          <button class="mini-btn" id="resetBarBtn">重置小节计数</button>
          <button class="mini-btn" id="resetSettingsBtn">恢复默认设置</button>
        </div>
      </div>
    </details>
  </section>
</main>

<footer>
  快捷键：<kbd>空格</kbd> 开始/暂停 · <kbd>↑</kbd>/<kbd>↓</kbd> 调速（Shift=±10）· <kbd>T</kbd> 敲击定速 · <kbd>R</kbd> 重置小节<br>
  点击中央 BPM 数字可直接输入速度 · 所有设置自动保存
</footer>

<div class="toast" id="toast"></div>

<script>
'use strict';
/* ================= 状态 ================= */
const TS = { '2/4':2,'3/4':3,'4/4':4,'5/4':5,'6/4':6,'2/2':2,'6/8':6,'7/8':7,'9/8':9,'12/8':12 };
const RAP_PRESETS = {
  'Boom Bap':  { bpm:90,  ts:'4/4', pat:[3,1,2,1], sub:'none' },
  'Trap':      { bpm:145, ts:'4/4', pat:[3,1,1,2], sub:'none' },
  'Drill':     { bpm:140, ts:'4/4', pat:[3,1,1,1], sub:'none' },
  'Lo-fi':     { bpm:78,  ts:'4/4', pat:[3,1,2,1], sub:'eighth' },
  'House':     { bpm:126, ts:'4/4', pat:[3,2,3,2], sub:'none' },
  'Reggaeton': { bpm:96,  ts:'4/4', pat:[3,1,2,1], sub:'none' },
  'Grime':     { bpm:140, ts:'4/4', pat:[3,1,3,1], sub:'none' },
  'Rock':      { bpm:120, ts:'4/4', pat:[3,1,2,1], sub:'none' },
  'Waltz':     { bpm:90,  ts:'3/4', pat:[3,1,1],   sub:'none' },
  'Folk68':    { bpm:80,  ts:'6/8', pat:[3,1,1,2,1,1], sub:'none' }
};

let state = {
  bpm: 96, ts: '4/4', sub: 'none', sound: 'click', vol: 0.85,
  accentMode: 'auto', custom: [3,1,2,1],
  poly: 'off', accel: 0, accelOn: false, train: false
};

/* ================= DOM ================= */
const $ = id => document.getElementById(id);
const el = {
  ring:$('ring'), beatCircle:$('beatCircle'), bpmValue:$('bpmValue'),
  beatLabel:$('beatLabel'), barNum:$('barNum'), tsTag:$('tsTag'),
  playBtn:$('playBtn'), tapBtn:$('tapBtn'), bpmSlider:$('bpmSlider'),
  bpmMinus:$('bpmMinus'), bpmPlus:$('bpmPlus'), tsSelect:$('tsSelect'),
  subSelect:$('subSelect'), soundSelect:$('soundSelect'), accentSelect:$('accentSelect'),
  volSlider:$('volSlider'), volVal:$('volVal'), editorGrid:$('editorGrid'),
  polySelect:$('polySelect'), accelToggle:$('accelToggle'), accelInput:$('accelInput'),
  trainToggle:$('trainToggle'), resetBarBtn:$('resetBarBtn'), resetSettingsBtn:$('resetSettingsBtn'),
  toast:$('toast')
};

/* ================= 音频引擎 ================= */
let actx = null, master = null, noiseBuf = null;
function ensureAudio() {
  if (!actx) {
    actx = new (window.AudioContext || window.webkitAudioContext)();
    master = actx.createGain(); master.gain.value = 1; master.connect(actx.destination);
    noiseBuf = actx.createBuffer(1, actx.sampleRate, actx.sampleRate);
    const d = noiseBuf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  }
  if (actx.state === 'suspended') actx.resume();
}

function playSound(time, accent, layer) {
  const v = (layer === 'poly' ? state.vol * 0.5 : state.vol);
  if (v <= 0.015) return;
  const g = actx.createGain();
  g.connect(master);
  const s = state.sound;
  const strong = accent >= 2;
  if (s === 'click') {
    const o = actx.createOscillator(); o.type = 'square';
    o.frequency.value = strong ? 1760 : 990;
    g.gain.setValueAtTime(v, time);
    g.gain.exponentialRampToValueAtTime(0.001, time + (strong ? 0.05 : 0.028));
    o.connect(g); o.start(time); o.stop(time + 0.07);
  } else if (s === 'wood') {
    const src = actx.createBufferSource(); src.buffer = noiseBuf;
    const bp = actx.createBiquadFilter(); bp.type = 'bandpass';
    bp.frequency.value = strong ? 1800 : 2400; bp.Q.value = 2.2;
    g.gain.setValueAtTime(v, time);
    g.gain.exponentialRampToValueAtTime(0.001, time + (strong ? 0.09 : 0.05));
    src.connect(bp); bp.connect(g); src.start(time); src.stop(time + 0.12);
  } else if (s === 'beep') {
    const o = actx.createOscillator(); o.type = 'sine';
    o.frequency.value = strong ? 1320 : 880;
    g.gain.setValueAtTime(0.0001, time);
    g.gain.exponentialRampToValueAtTime(v, time + 0.005);
    g.gain.exponentialRampToValueAtTime(0.001, time + (strong ? 0.12 : 0.08));
    o.connect(g); o.start(time); o.stop(time + 0.14);
  } else if (s === 'rim') {
    const src = actx.createBufferSource(); src.buffer = noiseBuf;
    const hp = actx.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 4000;
    g.gain.setValueAtTime(v, time);
    g.gain.exponentialRampToValueAtTime(0.001, time + 0.03);
    src.connect(hp); hp.connect(g); src.start(time); src.stop(time + 0.05);
  } else if (s === 'cowbell') {
    const o = actx.createOscillator(); o.type = 'square'; o.frequency.value = 540;
    const bp = actx.createBiquadFilter(); bp.type = 'bandpass';
    bp.frequency.value = strong ? 1250 : 900; bp.Q.value = 1;
    g.gain.setValueAtTime(v, time);
    g.gain.exponentialRampToValueAtTime(0.001, time + 0.13);
    o.connect(bp); bp.connect(g); o.start(time); o.stop(time + 0.16);
  } else if (s === 'drumkit') {
    /* 鼓组：强拍=底鼓(动) 中拍=军鼓(打) 弱拍=踩镲(次) */
    if (accent >= 3) kick(time, v);
    else if (accent === 2) snare(time, v);
    else hat(time, v);
  } else { /* tick */
    const o = actx.createOscillator(); o.type = 'triangle';
    o.frequency.value = strong ? 2600 : 2000;
    g.gain.setValueAtTime(v, time);
    g.gain.exponentialRampToValueAtTime(0.001, time + 0.022);
    o.connect(g); o.start(time); o.stop(time + 0.03);
  }
}

/* ---- 鼓组合成 ---- */
function kick(time, v) {
  const o = actx.createOscillator(); o.type = 'sine';
  o.frequency.setValueAtTime(160, time);
  o.frequency.exponentialRampToValueAtTime(44, time + 0.09);
  const g = actx.createGain();
  g.gain.setValueAtTime(v, time);
  g.gain.exponentialRampToValueAtTime(0.001, time + 0.22);
  o.connect(g); g.connect(master);
  o.start(time); o.stop(time + 0.25);
  /* 瞬态 click 让底鼓更有力 */
  const src = actx.createBufferSource(); src.buffer = noiseBuf;
  const hp = actx.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 3000;
  const g2 = actx.createGain();
  g2.gain.setValueAtTime(v * 0.35, time);
  g2.gain.exponentialRampToValueAtTime(0.001, time + 0.012);
  src.connect(hp); hp.connect(g2); g2.connect(master);
  src.start(time); src.stop(time + 0.03);
}
function snare(time, v) {
  const src = actx.createBufferSource(); src.buffer = noiseBuf;
  const bp = actx.createBiquadFilter(); bp.type = 'bandpass';
  bp.frequency.value = 1900; bp.Q.value = 0.8;
  const g = actx.createGain();
  g.gain.setValueAtTime(v, time);
  g.gain.exponentialRampToValueAtTime(0.001, time + 0.15);
  src.connect(bp); bp.connect(g); g.connect(master);
  src.start(time); src.stop(time + 0.2);
  /* 鼓皮共振音 */
  const o = actx.createOscillator(); o.type = 'triangle';
  o.frequency.setValueAtTime(230, time);
  o.frequency.exponentialRampToValueAtTime(160, time + 0.06);
  const g3 = actx.createGain();
  g3.gain.setValueAtTime(v * 0.5, time);
  g3.gain.exponentialRampToValueAtTime(0.001, time + 0.09);
  o.connect(g3); g3.connect(master);
  o.start(time); o.stop(time + 0.12);
}
function hat(time, v) {
  const src = actx.createBufferSource(); src.buffer = noiseBuf;
  const hp = actx.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 8000;
  const g = actx.createGain();
  g.gain.setValueAtTime(v * 0.55, time);
  g.gain.exponentialRampToValueAtTime(0.001, time + 0.05);
  src.connect(hp); hp.connect(g); g.connect(master);
  src.start(time); src.stop(time + 0.08);
}

/* ================= 节奏构建 ================= */
const SUB_STEPS = { none:1, eighth:2, triplet:3, sixteenth:4 };
function defaultAccents(beats) {
  const a = new Array(beats).fill(1);
  a[0] = 3;
  if (beats === 6) { a[3] = 2; }
  else if (beats >= 4) { a[Math.floor(beats / 2)] = 2; }
  return a;
}
function getPattern() {
  const beats = TS[state.ts];
  if (state.accentMode === 'custom') {
    const p = state.custom.slice(0, beats);
    while (p.length < beats) p.push(1);
    return p;
  }
  return defaultAccents(beats);
}
function stepsPerBeat() { return SUB_STEPS[state.sub] || 1; }
function buildGrid() {
  const pat = getPattern();
  const st = stepsPerBeat();
  const grid = [];
  pat.forEach(acc => {
    for (let i = 0; i < st; i++) grid.push(i === 0 ? acc : 1);
  });
  return grid;
}

/* ================= 调度器 ================= */
let playing = false, timerID = null, visualGen = 0;
let nextNoteTime = 0, curIdx = 0, bar = 0, grid = [];
let polyIdx = 0, nextPoly = 0, muted = false, dotEls = [];

const LOOKAHEAD_MS = 25, SCHED_AHEAD = 0.1;

function secondsPerStep() { return 60 / state.bpm / stepsPerBeat(); }

function start() {
  if (playing) return;
  ensureAudio();
  grid = buildGrid();
  curIdx = 0; bar = 0; polyIdx = 0; nextPoly = 0; muted = false; visualGen++;
  nextNoteTime = actx.currentTime + 0.08;
  playing = true;
  timerID = setInterval(scheduler, LOOKAHEAD_MS);
  el.playBtn.textContent = '■ 停止';
  el.playBtn.classList.add('stopping');
  el.beatCircle.classList.add('on');
  syncDots();
}

function stop() {
  if (!playing) return;
  playing = false;
  visualGen++;
  clearInterval(timerID);
  el.playBtn.textContent = '▶ 开始';
  el.playBtn.classList.remove('stopping');
  el.beatCircle.classList.remove('on');
  clearDots();
  el.bpmValue.innerHTML = state.bpm + '<small>BPM</small>';
  el.beatLabel.textContent = '就绪';
}

function toggle() { playing ? stop() : start(); }

function scheduler() {
  const sps = secondsPerStep();
  while (nextNoteTime < actx.currentTime + SCHED_AHEAD) {
    scheduleNote(curIdx, nextNoteTime);
    nextNoteTime += sps;
    curIdx = (curIdx + 1) % grid.length;
  }
}

function scheduleNote(idx, time) {
  const step = grid[idx];
  const isBarStart = idx === 0;
  if (isBarStart) {
    bar++;
    polyIdx = 0; nextPoly = 0;
    if (state.accelOn && state.accel !== 0) {
      state.bpm = Math.min(300, Math.max(30, Math.round(state.bpm + state.accel)));
      el.bpmValue.innerHTML = state.bpm + '<small>BPM</small>';
      el.bpmSlider.value = state.bpm;
      save();
    }
    if (state.train) muted = Math.random() < 0.15;
    el.barNum.textContent = bar;
  }
  const stepOffset = idx * secondsPerStep();
  if (!muted) {
    if (step > 0) playSound(time, step);
    if (state.poly !== 'off') {
      const [m, n] = state.poly.split(':').map(Number);
      const barDur = TS[state.ts] * 60 / state.bpm;
      while (stepOffset >= nextPoly - 1e-6 && polyIdx < m) {
        playSound(time, 1, 'poly');
        polyIdx++;
        nextPoly = polyIdx * barDur / m;
      }
    }
  }
  /* 视觉（延迟到发声时刻，与声音严格同步） */
  const lightIdx = Math.floor(idx / stepsPerBeat());
  const delayMs = Math.max(0, (time - actx.currentTime) * 1000);
  const myGen = visualGen;
  setTimeout(() => {
    if (myGen !== visualGen) return;
    flashDot(lightIdx);
    el.beatLabel.textContent = (lightIdx + 1) + '/' + TS[state.ts] + ' 拍';
    el.beatCircle.classList.remove('pulse');
    void el.beatCircle.offsetWidth;
    el.beatCircle.classList.add('pulse');
    if (step > 0 && isBarStart) el.bpmValue.innerHTML = state.bpm + '<small>BPM</small>';
  }, delayMs);
}

/* ================= 视觉 ================= */
function buildDots() {
  const beats = TS[state.ts];
  el.ring.innerHTML = '';
  dotEls = [];
  const st = stepsPerBeat();
  const pat = getPattern();
  for (let i = 0; i < beats; i++) {
    const d = document.createElement('div');
    d.className = 'beat-dot a' + pat[i];
    d.style.setProperty('--ang', ((i / beats) * 360 - 90) + 'deg');
    const core = document.createElement('div');
    core.className = 'core';
    d.appendChild(core);
    el.ring.appendChild(d);
    dotEls.push(d);
  }
}
function syncDots() {
  dotEls.forEach((d, i) => { d.className = 'beat-dot a' + (getPattern()[i] || 1); });
}
function flashDot(idx) {
  dotEls.forEach((d, i) => d.classList.remove('active'));
  if (dotEls[idx]) dotEls[idx].classList.add('active');
}
function clearDots() { dotEls.forEach(d => d.classList.remove('active')); }
function renderEditor() {
  const beats = TS[state.ts];
  if (state.custom.length > beats) state.custom = state.custom.slice(0, beats);
  while (state.custom.length < beats) state.custom.push(1);
  el.editorGrid.innerHTML = '';
  state.custom.forEach((v, i) => {
    const c = document.createElement('button');
    c.className = 'e-cell c' + v;
    c.textContent = ['·', '●', '●', '●'][v];
    c.title = '第 ' + (i + 1) + ' 拍 · 点击切换重音';
    c.onclick = () => {
      state.custom[i] = (state.custom[i] + 1) % 4;
      renderEditor(); syncDots(); save();
      if (playing) grid = buildGrid();
    };
    el.editorGrid.appendChild(c);
  });
}

/* ================= 工具 ================= */
let toastTimer = null;
function toast(msg) {
  el.toast.textContent = msg;
  el.toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.toast.classList.remove('show'), 1800);
}

function changeBpm(d) {
  state.bpm = Math.min(300, Math.max(30, state.bpm + d));
  syncBpmUI(); save();
}
function syncBpmUI() {
  el.bpmValue.innerHTML = state.bpm + '<small>BPM</small>';
  el.bpmSlider.value = state.bpm;
}
function setBpm(v) {
  state.bpm = Math.min(300, Math.max(30, Math.round(v)));
  syncBpmUI(); save();
  if (playing) { grid = buildGrid(); }
}

const tapTimes = [];
function tap() {
  const now = performance.now();
  tapTimes.push(now);
  while (tapTimes.length && now - tapTimes[0] > 2500) tapTimes.shift();
  if (tapTimes.length >= 2) {
    const avg = (tapTimes[tapTimes.length - 1] - tapTimes[tapTimes.length - 2]);
    const bpm = 60000 / avg;
    if (bpm >= 30 && bpm <= 300) setBpm(bpm);
    el.tapBtn.style.transform = 'scale(.94)';
    setTimeout(() => el.tapBtn.style.transform = '', 80);
  }
}

function applyPreset(name) {
  const p = RAP_PRESETS[name];
  if (!p) return;
  state.bpm = p.bpm; state.ts = p.ts; state.sub = p.sub;
  state.accentMode = 'custom'; state.custom = p.pat.slice();
  state.poly = 'off';
  syncBpmUI(); syncUI(); renderEditor(); buildDots();
  toast('已应用：' + name + ' · ' + p.bpm + ' BPM');
  if (!playing) start(); else { grid = buildGrid(); }
}

/* ================= UI 同步 ================= */
function syncUI() {
  el.tsSelect.value = state.ts;
  el.subSelect.value = state.sub;
  el.soundSelect.value = state.sound;
  el.accentSelect.value = state.accentMode;
  el.volSlider.value = state.vol;
  el.volVal.textContent = Math.round(state.vol * 100) + '%';
  el.polySelect.value = state.poly;
  el.accelToggle.checked = state.accelOn;
  el.accelInput.value = state.accel;
  el.trainToggle.checked = state.train;
  el.tsTag.textContent = '· ' + state.ts;
  el.bpmValue.innerHTML = state.bpm + '<small>BPM</small>';
  el.bpmSlider.value = state.bpm;
  el.barNum.textContent = bar || 1;
  buildDots();
  if (state.accentMode === 'custom') renderEditor();
}

/* ================= 存储 ================= */
function save() {
  try { localStorage.setItem('metronome-pro', JSON.stringify(state)); } catch (e) {}
}
function load() {
  try {
    const raw = localStorage.getItem('metronome-pro');
    if (raw) {
      const s = JSON.parse(raw);
      Object.keys(state).forEach(k => { if (s[k] !== undefined) state[k] = s[k]; });
    }
  } catch (e) {}
}

/* ================= 事件 ================= */
el.playBtn.onclick = toggle;
el.tapBtn.onclick = tap;
el.bpmMinus.onclick = () => changeBpm(-1);
el.bpmPlus.onclick = () => changeBpm(1);
el.bpmSlider.oninput = () => setBpm(+el.bpmSlider.value);
document.querySelectorAll('#bpmChips .chip').forEach(c => {
  c.onclick = () => { setBpm(+c.dataset.bpm); toast('速度 ' + c.dataset.bpm + ' BPM'); };
});
document.querySelectorAll('#presetChips .chip').forEach(c => {
  c.onclick = () => applyPreset(c.dataset.preset);
});

el.tsSelect.onchange = () => { state.ts = el.tsSelect.value; buildDots(); if (state.accentMode === 'custom') renderEditor(); if (playing) grid = buildGrid(); save(); };
el.subSelect.onchange = () => { state.sub = el.subSelect.value; buildDots(); if (playing) grid = buildGrid(); save(); };
el.soundSelect.onchange = () => { state.sound = el.soundSelect.value; save(); };
el.accentSelect.onchange = () => { state.accentMode = el.accentSelect.value; if (state.accentMode === 'custom') renderEditor(); buildDots(); if (playing) grid = buildGrid(); save(); };
el.volSlider.oninput = () => {
  state.vol = +el.volSlider.value;
  el.volVal.textContent = Math.round(state.vol * 100) + '%';
  save();
};
el.polySelect.onchange = () => { state.poly = el.polySelect.value; if (playing) { grid = buildGrid(); } save(); };
el.accelToggle.onchange = () => { state.accelOn = el.accelToggle.checked; save(); };
el.accelInput.onchange = () => { state.accel = Math.min(10, Math.max(-10, +el.accelInput.value || 0)); el.accelInput.value = state.accel; save(); };
el.trainToggle.onchange = () => { state.train = el.trainToggle.checked; save(); };
el.resetBarBtn.onclick = () => { bar = 0; el.barNum.textContent = 1; curIdx = 0; polyIdx = 0; nextPoly = 0; if (playing) nextNoteTime = actx.currentTime + 0.08; };
el.resetSettingsBtn.onclick = () => {
  state = { bpm:96, ts:'4/4', sub:'none', sound:'click', vol:0.85, accentMode:'auto', custom:[3,1,2,1], poly:'off', accel:0, accelOn:false, train:false };
  syncUI(); save(); toast('已恢复默认设置');
};

/* BPM 数字点击编辑 */
let editingBpm = false;
el.bpmValue.onclick = () => {
  if (editingBpm) return;
  editingBpm = true;
  const old = el.bpmValue.textContent.replace('BPM','');
  el.bpmValue.innerHTML = '<input id="bpmInput" type="number" min="30" max="300" value="' + old + '" style="width:96px; font-size:34px; font-weight:800; text-align:center; background:rgba(11,14,23,.6); border:1px solid var(--cyan); border-radius:10px; color:var(--txt); font-family:inherit; outline:none;">';
  const inp = $('bpmInput');
  inp.focus(); inp.select();
  const commit = () => {
    const v = parseInt(inp.value, 10);
    if (v >= 30 && v <= 300) setBpm(v);
    syncBpmUI();
    editingBpm = false;
  };
  inp.onblur = commit;
  inp.onkeydown = e => {
    if (e.key === 'Enter') { commit(); }
    if (e.key === 'Escape') { syncBpmUI(); editingBpm = false; }
  };
};

/* 键盘 */
document.addEventListener('keydown', e => {
  const tag = (e.target.tagName || '').toUpperCase();
  const editable = ['INPUT','SELECT','TEXTAREA'].includes(tag);
  if (e.code === 'Space') {
    if (editable) { e.preventDefault(); return; }
    e.preventDefault(); toggle();
  } else if (e.key === 'ArrowUp' && !editable) {
    e.preventDefault(); changeBpm(e.shiftKey ? 10 : 1);
  } else if (e.key === 'ArrowDown' && !editable) {
    e.preventDefault(); changeBpm(e.shiftKey ? -10 : -1);
  } else if ((e.key === 't' || e.key === 'T') && !editable) {
    tap();
  } else if ((e.key === 'r' || e.key === 'R') && !editable) {
    el.resetBarBtn.onclick();
  }
});

/* 页面不可见时暂停视觉刷新（调度器继续，保证节拍不漂移） */

/* ================= 初始化 ================= */
load();
syncUI();
</script>
</body>
</html>
