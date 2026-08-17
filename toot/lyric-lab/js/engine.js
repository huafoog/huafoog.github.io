/* ============================================================
 * RHYME LAB · 歌词生成引擎
 * 主题匹配 → 选辙 → 模板填充 → 句句押韵 → 结构化组装
 * ============================================================ */

const LyricEngine = (() => {
  'use strict';

  /* ---------- 工具 ---------- */
  function rand(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  /* 从池中不重复取词（取完重新洗牌） */
  function makePicker(pool) {
    let bag = shuffle(pool);
    return () => {
      if (!bag.length) bag = shuffle(pool);
      return bag.pop();
    };
  }

  /* ---------- 主题匹配 ---------- */
  function matchTheme(userInput) {
    const kw = (userInput || '').trim();
    if (!kw) return { key: 'night', theme: THEMES.night, custom: null };
    for (const [key, theme] of Object.entries(THEMES)) {
      if (theme.match.some(m => kw.includes(m) || m.includes(kw))) {
        return { key, theme, custom: null };
      }
    }
    /* 未匹配 → 自定义主题：兜底意象池 + 用户词作主题词 */
    return { key: 'custom', theme: FALLBACK_THEME, custom: kw };
  }

  /* ---------- 选辙（可自动/手动） ---------- */
  function pickRhymeGroup(rhymeKey) {
    if (rhymeKey && RHYME_BANKS[rhymeKey]) return rhymeKey;
    const keys = Object.keys(RHYME_BANKS);
    return rand(keys);
  }

  /* ---------- 模板填充 ---------- */
  function fill(tpl, ctx) {
    let out = tpl
      .replace(/\{\s*i\s*\}/g, rand(ctx.nouns))
      .replace(/\{\s*v\s*\}/g, rand(ctx.verbs))
      .replace(/\{\s*a\s*\}/g, rand(ctx.adjs))
      .replace(/\{\s*t\s*\}/g, ctx.custom || ctx.name);
    return out;
  }

  /* ---------- 主生成 ---------- */
  /**
   * config: {
   *   themeInput, style, rhymeMode('every'|'alt'), voice('duet'|'male'|'female'),
   *   length('short'|'standard'|'full'), rhymeKey(null=auto)
   * }
   */
  function generate(config) {
    const { themeInput = '', style = 'oldschool', rhymeMode = 'every',
            voice = 'duet', length = 'standard', rhymeKey = null } = config;

    /* 1. 主题 */
    const { theme, custom } = matchTheme(themeInput);
    const ctx = {
      name: theme.name,
      custom,
      nouns: theme.nouns,
      verbs: theme.verbs,
      adjs: theme.adjs
    };

    /* 2. 韵辙 */
    const rgKey = pickRhymeGroup(rhymeKey);
    const rg = RHYME_BANKS[rgKey];
    const rhymePicker = makePicker(rg.words);

    /* 3. 组装句式池（按人声） */
    const isFemaleVoice = voice === 'female';
    const versePool = (voice === 'male') ? VERSE_MALE
                    : (voice === 'female') ? VERSE_FEMALE
                    : VERSE_MALE; /* duet：主verse 男声，hook 女声 */
    const hookPool = (voice === 'female') ? HOOK_FEMALE
                   : (voice === 'male') ? HOOK_MALE
                   : HOOK_FEMALE; /* duet hook 女声 */

    let verseBag = shuffle(versePool);
    let hookBag = shuffle(hookPool);
    let freeBag = shuffle(VERSE_FREE);
    let lastTpl = null, lastFreeTpl = null;

    const take = (bag, pool, lastRef) => {
      if (!bag.length) bag = shuffle(pool);
      /* 避免与上一句相同模板 */
      let tpl = bag.pop();
      let guard = 0;
      while (tpl === lastRef && bag.length && guard++ < 5) {
        bag.unshift(tpl);
        tpl = bag.pop();
      }
      return tpl;
    };

    /* 4. 押韵行生成 */
    const rhymeLine = (tpl) => {
      const r = rhymePicker();
      const line = fill(tpl, ctx)
        .replace(/\{r\}/g, r);
      return { text: line, rhyme: r };
    };

    /* 细分：把押韵句在最后一个逗号处拆成两个半句（前半叙事、后半押韵），flow 更细 */
    const splitHalf = (ln) => {
      if (!ln.rhyme) return [ln];
      const m = ln.text.match(/^(.*)[，,、]([^，,、]*)$/);
      if (!m) return [ln];
      const head = m[1].trim();
      const tail = m[2].trim();
      if (!head || !tail || !tail.includes(ln.rhyme)) return [ln];
      return [
        { text: head + '，', role: ln.role, rhyme: null },
        { text: tail, role: ln.role, rhyme: ln.rhyme }
      ];
    };

    const freeLine = () => {
      const tpl = take(freeBag, VERSE_FREE, lastFreeTpl);
      lastFreeTpl = tpl;
      const line = fill(tpl, ctx);
      return { text: line, rhyme: null };
    };

    /* Pre-Hook 预副歌：短句蓄力，句句押韵 */
    let preBag = shuffle(PRE_HOOK);
    const preHookLines = (role) => {
      const out = [];
      for (let i = 0; i < 2; i++) {
        const tpl = take(preBag, PRE_HOOK, lastTpl);
        lastTpl = tpl;
        out.push({ role, ...rhymeLine(tpl) });
      }
      return out;
    };

    /* 5. 结构规划 */
    const verseLen = length === 'short' ? 5 : length === 'full' ? 8 : 7;
    const hookTimes = length === 'short' ? 1 : length === 'full' ? 3 : 2;
    const verseCount = length === 'short' ? 1 : length === 'full' ? 3 : 2;

    const lines = [];
    /* Intro */
    lines.push({ role: 'tag', text: rand(INTRO_LINES), rhyme: null });

    /* Verse × N（每句拆成两个半句 → 行数细分） */
    for (let v = 0; v < verseCount; v++) {
      lines.push({ role: 'tag', text: `[Verse ${v + 1}] ${voice === 'female' ? '女声' : '男声'}`.trim(), rhyme: null });
      const verseRole = isFemaleVoice ? 'female' : 'male';
      for (let i = 0; i < verseLen; i++) {
        const tpl = take(verseBag, versePool, lastTpl);
        lastTpl = tpl;
        if (rhymeMode === 'every') {
          const ln = { role: verseRole, ...rhymeLine(tpl) };
          splitHalf(ln).forEach(x => lines.push(x));
        } else {
          /* 隔句押：奇数行押，偶数行自由（自由句不拆分） */
          if (i % 2 === 0) {
            const ln = { role: verseRole, ...rhymeLine(tpl) };
            splitHalf(ln).forEach(x => lines.push(x));
          } else {
            lines.push({ role: verseRole, ...freeLine() });
          }
        }
      }
      /* Pre-Hook：Verse 结束后蓄力，推向 Hook（short 长度省略） */
      if (length !== 'short' && v < verseCount - 1) {
        lines.push({ role: 'tag', text: '[Pre-Hook] 预副歌', rhyme: null });
        preHookLines(isFemaleVoice ? 'female' : 'male').forEach(x => lines.push(x));
      }
    }

    /* Hook × N（duet 或纯女 → 女声旋律；纯男 → 男声 hook） */
    for (let h = 0; h < hookTimes; h++) {
      lines.push({ role: 'tag', text: h === 0 ? '[Hook] 副歌' : '[Hook] 副歌 重复', rhyme: null });
      const hookRole = voice === 'male' ? 'male' : 'female';
      for (let i = 0; i < 4; i++) {
        const tpl = take(hookBag, hookPool, lastTpl);
        lastTpl = tpl;
        lines.push({ role: hookRole, ...rhymeLine(tpl) });
      }
    }

    /* Bridge（full 长度时插入） */
    if (length === 'full' && voice !== 'female') {
      lines.push({ role: 'tag', text: '[Bridge] 桥段', rhyme: null });
      lines.push({ role: 'male', text: rand(BRIDGE_LINES), rhyme: null });
    }

    /* Outro */
    lines.push({ role: 'tag', text: rand(OUTRO_LINES), rhyme: null });

    /* 6. 歌名生成 */
    const title = makeTitle(ctx, rgKey, style);

    return {
      title,
      style: STYLES[style],
      rhyme: rg,
      themeName: custom || theme.name,
      lines
    };
  }

  /* ---------- 歌名生成 ---------- */
  function makeTitle(ctx, rgKey, styleKey) {
    const rw = () => rand(RHYME_BANKS[rgKey].words);
    const patterns = [
      () => `向${rw()}出发`,
      () => `${rand(ctx.nouns)}与${rw()}`,
      () => `${ctx.custom || ctx.name}·${rand(ctx.adjs)}`,
      () => `等${rw()}的人`,
      () => `${rand(ctx.verbs)}在${rand(ctx.nouns)}`,
      () => `夜未眠 · ${rw()}`
    ];
    return rand(patterns)();
  }

  return { generate, matchTheme, pickRhymeGroup };
})();
