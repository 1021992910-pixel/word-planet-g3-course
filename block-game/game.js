(function game() {
  'use strict';
  const { sets, words } = UNIT_ONE;
  const game = document.querySelector('#game');
  const sound = document.querySelector('#sound');
  const storageKey = 'word-planet-unit1-blocks-v1';
  const intervals = [1, 3, 7, 14, 30];
  const meaningClues = { to: '向、到', too: '也', no: '不、不行', know: '知道、认识' };
  const materials = { grass: '草方块', wood: '橡木', sand: '砂岩', stone: '石头', copper: '铜矿', gem: '水晶' };
  const setByWord = Object.fromEntries(sets.flatMap(set => set.ids.map(id => [id, set])));
  const labels = { mine: '挖矿 · 听音选字母', write: '解锁图纸 · 听音写词', due: '今日复习', retry: '本轮错词再练' };
  const homeSlots = [2, 6, 7, 8, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
  const speaker = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 9v6h4l5 4V5L7 9H3zm12-1.8v2.1a3.6 3.6 0 010 5.4v2.1a5.6 5.6 0 000-9.6zm0-3.6v2.1a7.5 7.5 0 010 12.6v2.1a9.4 9.4 0 000-16.8z"/></svg>';
  const esc = value => String(value).replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' })[c]);
  const normalized = value => value.normalize('NFKC').trim().toLowerCase().replace(/[’‘]/g, "'");
  const shuffle = list => {
    const next = [...list];
    for (let i = next.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [next[i], next[j]] = [next[j], next[i]];
    }
    return next;
  };
  let data = { records: {}, mined: {}, unlocked: {}, finished: {}, placements: {}, sessions: {} };
  try {
    const stored = JSON.parse(localStorage.getItem(storageKey));
    if (stored && typeof stored === 'object') data = { ...data, ...stored };
  } catch { document.querySelector('#save-warning').hidden = false; }
  let screen = 'home';
  let setIndex = 0;
  let round = null;
  let coachStep = 0;
  let selected = [];
  let tiles = [];
  let typed = '';
  let result = null;
  let heard = false;
  let activeMaterial = '';
  let audioRun = 0;
  let animationFrame = 0;
  let roundMessage = '';

  function save() {
    try { localStorage.setItem(storageKey, JSON.stringify(data)); }
    catch { document.querySelector('#save-warning').hidden = false; }
    updateReviewCount();
  }

  function dueIds(now = Date.now()) {
    return Object.keys(words).filter(id => data.records[id]?.due <= now)
      .sort((a, b) => data.records[a].due - data.records[b].due);
  }

  function updateReviewCount() {
    document.querySelector('#due-count').textContent = dueIds().length;
  }

  function reviewDate(now, days) {
    const date = new Date(now);
    date.setDate(date.getDate() + days);
    date.setHours(0, 0, 0, 0);
    return date.getTime();
  }

  function record(id, mode, answer, correct) {
    const old = data.records[id] || { misses: 0, level: 0 };
    const now = Date.now();
    const next = { ...old };
    if (!correct) {
      next.misses++;
      next.lastWrong = { mode, answer, at: now };
      next.byMode = { ...next.byMode, [mode]: next.lastWrong };
      if (mode !== 'retry') {
        next.level = 1;
        next.due = reviewDate(now, 1);
      }
    } else if (mode === 'due') {
      next.level = Math.min(intervals.length, next.level + 1);
      next.due = reviewDate(now, intervals[next.level - 1]);
    } else if (mode === 'write' && !Number.isFinite(next.due)) {
      next.level = 1;
      next.due = reviewDate(now, 1);
    }
    data.records[id] = next;
  }

  function stopAudio() {
    audioRun++;
    cancelAnimationFrame(animationFrame);
    sound.pause();
    sound.onended = null;
    sound.onerror = null;
  }

  function audioStatus(message) {
    const status = document.querySelector('#sound-status');
    if (status) status.textContent = message;
  }

  function playFile(file, run, options = {}) {
    sound.src = 'audio/' + encodeURIComponent(file);
    sound.playbackRate = options.rate || 1;
    sound.onended = () => { if (run === audioRun) options.end?.(); };
    const fail = () => {
      if (run !== audioRun) return;
      audioStatus('声音没有播出来，请再点一次。');
    };
    sound.onerror = fail;
    sound.play().then(() => { if (run === audioRun) options.start?.(); }).catch(fail);
  }

  function highlight(positions) {
    document.querySelectorAll('[data-letter]').forEach((node, i) => node.classList.toggle('active', positions.includes(i)));
  }

  function playWhole() {
    const id = currentId();
    if (!id) return;
    stopAudio();
    highlight([]);
    audioStatus('正在播放…');
    playFile(words[id].wholeFile, audioRun, {
      rate: .92,
      end: () => {
        if (screen === 'coach') {
          finishCoachStep(2);
          audioStatus('跟读一遍，然后去挖矿。');
        } else {
          heard = true;
          refreshAnswer();
          audioStatus('可以再听一遍。');
        }
      }
    });
  }

  function finishCoachStep(step) {
    if (screen !== 'coach' || coachStep !== step) return;
    coachStep++;
    for (const control of game.querySelectorAll('[data-coach-step]')) {
      const index = Number(control.dataset.coachStep);
      control.disabled = index > coachStep;
      control.classList.toggle('primary', index === coachStep);
      control.classList.toggle('secondary', index !== coachStep);
    }
  }

  function playCoach(kind) {
    const id = screen === 'coach' ? currentId() : result.id;
    const w = words[id];
    stopAudio();
    highlight([]);
    const run = audioRun;
    if (kind === 'letters') {
      const letters = [...w.word];
      let index = 0;
      function next() {
        if (run !== audioRun) return;
        if (index === letters.length) {
          highlight(letters.map((_, i) => i));
          audioStatus('听完整单词。');
          playFile(w.wholeFile, run, {
            rate: .92,
            end: () => {
              finishCoachStep(0);
              audioStatus(screen === 'coach' ? '接着点「跟我拼读」。' : '轮到你拼一遍。');
            }
          });
          return;
        }
        const letter = letters[index];
        highlight([index++]);
        if (letter === "'") {
          audioStatus('这里有一个撇号。');
          setTimeout(next, 540);
        } else {
          audioStatus('听老师逐个拼字母。');
          playFile('letter-' + letter + '.mp3', run, { end: () => setTimeout(next, 240) });
        }
      }
      next();
      return;
    }
    const phonics = w.phonics;
    function sync() {
      if (run !== audioRun || sound.ended) return;
      const time = sound.currentTime;
      const cue = phonics.cues.find(step => time >= step.start && time < step.end);
      highlight(cue?.letters || []);
      audioStatus(time < phonics.stageTwo ? '先听单词。'
        : time < phonics.blendStart ? '看字母，听声音。'
        : time < phonics.finalStart ? '把声音连起来。' : '听完整单词。');
      animationFrame = requestAnimationFrame(sync);
    }
    audioStatus('正在播放…');
    playFile('paced-' + id + '.mp3', run, {
      start: sync,
      end: () => {
        cancelAnimationFrame(animationFrame);
        highlight([...w.word].map((_, i) => i));
        finishCoachStep(1);
        audioStatus(screen === 'coach' ? '跟读一遍，再点「听整词」。' : '轮到你读一遍。');
      }
    });
  }

  const button = (action, title, style = 'primary', attrs = '') =>
    `<button type="button" class="${style}" data-action="${action}" ${attrs}>${title}</button>`;
  const listen = title => button('listen', speaker + title, 'primary listen');
  const status = '<p class="sound-status" id="sound-status" role="status"></p>';
  const wordMarkup = w => `<div class="word" lang="en" aria-label="${esc(w)}">${[...w].map(c => '<span data-letter>' + esc(c) + '</span>').join('')}</div>`;
  const panel = inner => `<section class="panel">${inner}</section>`;
  const block = type => `<span class="block ${type}" aria-hidden="true"></span>`;
  const counter = (index, length) => `<div class="progress" aria-hidden="true">${Array.from({ length }, (_, i) =>
    `<span class="${i < index ? 'done' : i === index ? 'active' : ''}"></span>`).join('')}</div>`;
  const crumb = (title, number) => `<div class="crumb"><span>${title}</span><span>${number}</span></div>`;
  const isMain = mode => mode === 'mine' || mode === 'write';
  const currentId = () => round?.ids[round.index];

  function switchTo(next) {
    stopAudio();
    screen = next;
    render();
    window.scrollTo(0, 0);
    const heading = game.querySelector('h1');
    heading?.setAttribute('tabindex', '-1');
    heading?.focus({ preventScroll: true });
  }

  function openSet(index) {
    setIndex = index;
    if (data.sessions[index]) {
      round = structuredClone(data.sessions[index]);
      if (round.index < round.ids.length) openCurrentWord();
      else switchTo('round-end');
      return;
    }
    startRound('mine', [...sets[index].ids]);
  }

  function startRound(mode, ids, missed = []) {
    round = { mode, ids, index: 0, setIndex, missed: [...missed], passed: 0 };
    checkpoint();
    openCurrentWord();
  }

  function checkpoint() {
    if (isMain(round.mode)) data.sessions[setIndex] = structuredClone(round);
    save();
  }

  function openCurrentWord() {
    if (round.mode !== 'mine') {
      loadQuestion();
      return;
    }
    coachStep = 0;
    switchTo('coach');
  }

  function loadQuestion() {
    const id = currentId();
    const letters = [...words[id].word];
    selected = [];
    typed = '';
    result = null;
    heard = false;
    tiles = [];
    if (round.mode === 'mine') {
      const distractors = [...'abcdefghijklmnopqrstuvwxyz'].filter(letter => !letters.includes(letter));
      const extra = distractors[Math.floor(Math.random() * distractors.length)];
      tiles = shuffle([...letters, extra]);
    }
    switchTo('question');
  }

  function submit(answer) {
    if (!heard || result || !answer.trim()) return;
    const id = currentId();
    const w = words[id];
    const correct = normalized(answer) === w.word;
    record(id, round.mode, answer, correct);
    if (!correct && !round.missed.includes(id)) round.missed.push(id);
    if (correct) round.passed++;
    const found = correct && round.mode === 'mine' && !data.mined[id];
    if (found) data.mined[id] = setByWord[id].block;
    if (correct && ['write', 'due', 'retry'].includes(round.mode)) data.unlocked[id] = true;
    result = { correct, answer, found, id };
    round.index++;
    checkpoint();
    if (round.mode === 'write' && round.index === round.ids.length) {
      data.finished[setIndex] = true;
      save();
    }
    stopAudio();
    screen = 'feedback';
    render();
    game.querySelector('[data-action="advance"]')?.focus({ preventScroll: true });
  }

  function advance() {
    if (round.index < round.ids.length) {
      openCurrentWord();
      return;
    }
    if (round.mode === 'write') {
      delete data.sessions[setIndex];
      save();
    }
    switchTo('round-end');
  }

  function refreshAnswer() {
    const submit = document.querySelector('#submit');
    if (screen !== 'question' || !submit) return;
    if (round.mode === 'mine') {
      document.querySelectorAll('.tile').forEach((node, i) => { node.disabled = selected.includes(i); });
      document.querySelectorAll('.slot').forEach((node, i) => {
        node.textContent = selected[i] === undefined ? '' : tiles[selected[i]];
      });
      document.querySelector('[data-action="undo"]').disabled = !selected.length;
      submit.disabled = !heard || selected.length !== words[currentId()].word.length;
    } else {
      submit.disabled = !heard || !typed.trim();
    }
  }

  function mapView() {
    const complete = Object.keys(data.finished).length;
    const placed = Object.keys(data.placements).length;
    const active = Object.values(data.sessions).find(session => !data.finished[session.setIndex]);
    const main = active ? button('set', '继续闯关', 'primary', `data-index="${active.setIndex}"`)
      : button('set', complete ? '继续探索' : '进入草地营地', 'primary', `data-index="${Math.max(0, sets.findIndex((_, i) => !data.finished[i]))}"`);
    return `<section class="hero"><canvas id="land" width="256" height="92" aria-hidden="true"></canvas>
      <div class="hero-copy"><div class="kicker">外研版三年级上册 · Unit 1 Let’s be friends!</div>
      <h1>单词方块世界</h1><p>听单词挖方块，独立拼出单词，盖一间自己的小屋。</p>
      <div class="actions">${main}${button('build', '我的小屋', 'secondary')}</div></div></section>
      <div class="map-head"><h2>探索地图</h2><p>第一单元重点拼写 · 走过 ${complete} / ${sets.length} 站 · 已放 ${placed} 个方块</p></div>
      <div class="map">${sets.map((set, index) => `<button data-action="set" data-index="${index}">${block(set.block)}
        <span><strong>${esc(set.name)}</strong><small>${data.finished[index] ? '已走过 · ' : ''}${set.ids.length} 个词</small></span></button>`).join('')}</div>`;
  }

  function coachView() {
    const set = sets[setIndex];
    const w = words[currentId()];
    const stepButton = (index, action, title) => button(action, title,
      index === coachStep ? 'primary' : 'secondary',
      `data-coach-step="${index}" ${index > coachStep ? 'disabled' : ''}`);
    return panel(crumb(set.name, `${round.index + 1} / ${round.ids.length}`) + counter(round.index, round.ids.length) +
      `<h1>挖矿前，先听一听</h1>${wordMarkup(w.word)}<p class="muted">${esc(w.meaning)}</p>
      <div class="actions">${stepButton(0, 'letters', '① 拼字母')}${stepButton(1, 'phonics', '② 跟我拼读')}${stepButton(2, 'listen', '③ 听整词')}</div>
      ${status}<p class="muted">${esc(w.hint)}</p>
      <div class="actions">${stepButton(3, 'mine', '去挖这个词 →')}</div>`);
  }

  function questionView() {
    const id = currentId();
    const w = words[id];
    const mode = round.mode;
    const mine = mode === 'mine';
    const clue = meaningClues[id];
    const exercise = mine
      ? `<div class="slots" aria-label="已选字母">${[...w.word].map(() => '<span class="slot"></span>').join('')}</div>
        <div class="tiles" aria-label="可选字母">${tiles.map((tile, i) =>
          button('tile', esc(tile), 'tile', `data-index="${i}" ${tile === "'" ? 'aria-label="撇号"' : ''}`)).join('')}</div>
        <div class="actions">${button('undo', '撤回一个', 'plain', 'disabled')}${button('submit-mine', '提交', 'primary', 'id="submit" disabled')}</div>`
      : `<form id="answer-form"><label for="answer">输入你听到的单词</label>
        <input id="answer" type="text" inputmode="text" lang="en" autocomplete="off" autocorrect="off" autocapitalize="none" spellcheck="false" maxlength="30" enterkeyhint="done">
        <div class="actions"><button id="submit" class="primary" type="submit" disabled>提交</button></div></form>`;
    return panel(crumb(isMain(mode) ? sets[setIndex].name : '错词复习', `${round.index + 1} / ${round.ids.length}`) +
      counter(round.index, round.ids.length) + `<h1>${labels[mode]}</h1>
      <p class="muted">${mine ? '听完，按顺序点字母方块。有一块是多出来的。' : '听完，把单词打进框里。'}</p>
      ${listen('播放单词')}${status}${clue ? `<p class="muted">词义提示 · ${clue}</p>` : ''}${exercise}`);
  }

  function feedbackView() {
    const w = words[result.id];
    const right = result.correct;
    const reviewLine = round.mode === 'retry' ? '这次练习完成后，按原计划复习。' : '这个词已加入明天的复习。';
    return panel(`<h1>${right ? (result.found ? '挖到一个方块！' : '拼对了！') : '这个词再练一练'}</h1>
      <div class="feedback ${right ? 'correct' : ''}">${wordMarkup(w.word)}<p>${esc(w.meaning)}</p>
      ${right ? '' : `<p>你写的是 <strong lang="en">${esc(result.answer)}</strong>。${reviewLine}</p>`}</div>
      <div class="actions">${button('feedback-phonics', '▶ 再听拼读', 'secondary')}${button('feedback-letters', '▶ 再听拼字母', 'plain')}
      ${button('advance', round.index < round.ids.length ? '下一题 →' : '看结果 →')}</div>${status}`);
  }

  function roundEndView() {
    const mode = round.mode;
    const mine = mode === 'mine';
    const write = mode === 'write';
    const retry = (write || mode === 'due') && round.missed.length;
    const note = `这轮 ${round.ids.length} 个词，答对 ${round.passed} 个。`;
    const next = mine ? button('write', '去听写 →') : write ? button('build', '去盖小屋 →') : button('review', '回今日复习');
    return panel(`<h1>${mine ? '挖矿结束' : write ? '本站闯关结束' : '复习结束'}</h1>
      <p>${note}</p>${mine ? '<p class="muted">接下来打乱顺序，听声音输入单词。</p>' : ''}
      <div class="actions">${next}${retry ? button('retry', '本轮错词再练', 'secondary') : ''}${button('home', '回地图', 'plain')}</div>`);
  }

  function reviewView() {
    const due = dueIds();
    const logged = Object.keys(words).filter(id => data.records[id]?.lastWrong)
      .sort((a,b) => data.records[b].lastWrong.at - data.records[a].lastWrong.at);
    const date = new Intl.DateTimeFormat('zh-CN', { month: 'numeric', day: 'numeric' });
    const next = Math.min(...Object.values(data.records).map(r => r.due).filter(t => t > Date.now()));
    return panel(`<h1>今日复习</h1><p>${due.length ? `有 ${due.length} 个词可以复习。先听，再独立写一遍。`
      : Number.isFinite(next) ? `今天的复习已做完。下一批 ${date.format(next)} 可以来练。` : '先去地图闯关，练过的词会安排复习。'}</p>
      <div class="actions">${due.length ? button('due', '开始复习') : button('home', '回地图')}</div>
      ${logged.length ? `<details><summary>查看错词记录（${logged.length}）</summary><ul class="log">${logged.map(id => {
        const r = data.records[id];
        const attempts = Object.values(r.byMode || { last: r.lastWrong })
          .map(wrong => `${labels[wrong.mode]}写成 <span lang="en">${esc(wrong.answer)}</span>`).join('；');
        return `<li><b lang="en">${esc(words[id].word)}</b> · ${esc(setByWord[id].name)} · 错 ${r.misses} 次<br>${attempts}</li>`;
      }).join('')}</ul></details>` : ''}`);
  }

  function inventory() {
    const count = Object.fromEntries(Object.keys(materials).map(type => [type, 0]));
    for (const [id, type] of Object.entries(data.mined)) if (data.unlocked[id]) count[type]++;
    for (const type of Object.values(data.placements)) count[type]--;
    return count;
  }

  function buildView() {
    const count = inventory();
    if (!count[activeMaterial]) activeMaterial = Object.keys(count).find(type => count[type] > 0) || '';
    const total = Object.keys(data.placements).length;
    return panel(`<h1>我的小屋</h1><p>选一种材料，点虚线格放下。点已经放好的方块可以收回。</p>
      <div class="inventory">${Object.entries(materials).map(([type, title]) =>
        button('material', block(type) + title + ' × ' + count[type], 'material',
          `data-type="${type}" aria-pressed="${activeMaterial === type}" ${count[type] <= 0 ? 'disabled' : ''}`)).join('')}</div>
      <div class="build-grid" aria-label="小屋建造格">${Array.from({length:25}, (_, i) => {
        if (!homeSlots.includes(i)) return '<span aria-hidden="true"></span>';
        const type = data.placements[i];
        return button('place', type ? '▦' : '+', 'pad' + (type ? ' filled ' + type : ''),
          `data-index="${i}" aria-label="${type ? '收回' + materials[type] : '放置方块'}，第 ${i + 1} 格"`);
      }).join('')}</div>
      <p role="status" class="muted">${esc(roundMessage || (total === homeSlots.length ? '小屋盖好啦！'
        : activeMaterial ? `已放 ${total} / ${homeSlots.length} 个方块。`
        : '在同一个词上完成挖矿和听写，就能使用挖到的方块。'))}</p>
      <div class="actions">${button('home', '回地图')}</div>`);
  }

  function drawLandscape() {
    const canvas = document.querySelector('#land');
    const ctx = canvas.getContext('2d');
    const rect = (x, y, w, h, color) => { ctx.fillStyle = color; ctx.fillRect(x,y,w,h); };
    rect(0,0,256,92,'#75b5ac');
    rect(201,11,21,21,'#f8d98b');
    rect(198,15,27,13,'#f8d98b');
    for (const [x,y] of [[24,10],[75,18],[145,12],[221,26]]) {
      rect(x,y+3,23,4,'#b8d8c5'); rect(x+5,y,13,8,'#b8d8c5');
    }
    for (let i = 0; i < 32; i++) {
      const x = i*8, hills = 44 + Math.round(Math.sin(i*.34)*3)*4;
      rect(x,hills,8,92-hills,'#508173');
      const floor = 64 + Math.round(Math.sin(i*.41+1)*2)*4;
      rect(x,floor,8,92-floor,'#806148');
      rect(x,floor,8,5, i%3 === 0 ? '#94b962' : '#79a651');
      for (let y = floor+8; y < 92; y+=6) {
        rect(x+(i+y)%5,y,3,2,i%2 ? '#a38356' : '#664c3b');
      }
    }
    for (const [x,y] of [[132,57],[153,54],[237,59],[250,64]]) {
      rect(x,y-17,4,19,'#73593c');
      rect(x-6,y-26,16,12,'#397659'); rect(x-2,y-30,9,8,'#4f9165');
      rect(x-9,y-21,22,6,'#50885b');
    }
    rect(175,43,38,25,'#a77950'); rect(181,38,26,8,'#855338'); rect(187,32,14,7,'#855338');
    rect(171,43,46,5,'#855338'); rect(175,48,38,2,'#c3935c');
    for (const y of [53,59,65]) rect(175,y,38,1,'#745235');
    rect(180,53,8,8,'#d8c080'); rect(182,55,4,4,'#8fbab1');
    rect(198,52,9,16,'#684c34'); rect(204,59,2,2,'#e4ba70');
    rect(193,68,26,3,'#c9a479'); rect(204,71,29,4,'#c9a479');
  }

  function render() {
    const views = { home: mapView, coach: coachView, question: questionView, feedback: feedbackView,
      'round-end': roundEndView, review: reviewView, build: buildView };
    game.innerHTML = views[screen]();
    updateReviewCount();
    if (screen === 'home') drawLandscape();
  }

  document.addEventListener('click', event => {
    const target = event.target.closest('button[data-action]');
    if (!target || target.disabled) return;
    const action = target.dataset.action;
    const index = Number(target.dataset.index);
    if (action === 'home' || action === 'review' || action === 'build') {
      if (action === 'build') roundMessage = '';
      switchTo(action);
    } else if (action === 'set') openSet(index);
    else if (action === 'mine' && screen === 'coach' && coachStep === 3) loadQuestion();
    else if (action === 'write') {
      const ids = shuffle(round.ids);
      if (ids.every((id, i) => id === round.ids[i])) ids.push(ids.shift());
      startRound('write', ids, round.missed);
    }
    else if (action === 'due') {
      const ids = dueIds();
      if (ids.length) startRound('due', shuffle(ids));
      else render();
    }
    else if (action === 'retry') startRound('retry', shuffle(round.missed));
    else if (action === 'listen') playWhole();
    else if (action === 'phonics' || action === 'letters') playCoach(action);
    else if (action === 'feedback-phonics' || action === 'feedback-letters') {
      playCoach(action === 'feedback-letters' ? 'letters' : 'phonics');
    } else if (action === 'tile' && selected.length < words[currentId()].word.length) {
      selected.push(index);
      refreshAnswer();
    } else if (action === 'undo') {
      selected.pop();
      refreshAnswer();
    } else if (action === 'submit-mine') submit(selected.map(i => tiles[i]).join(''));
    else if (action === 'advance') advance();
    else if (action === 'material') {
      activeMaterial = target.dataset.type;
      roundMessage = '';
      render();
      game.querySelector(`[data-type="${activeMaterial}"]`)?.focus();
    } else if (action === 'place') {
      const placed = data.placements[index];
      if (placed) {
        delete data.placements[index];
        activeMaterial = placed;
        roundMessage = '方块已收回。';
      } else if (activeMaterial && inventory()[activeMaterial] > 0) {
        data.placements[index] = activeMaterial;
        roundMessage = '';
      } else {
        roundMessage = '先去闯关收集方块。';
      }
      save();
      render();
      game.querySelector(`[data-index="${index}"]`)?.focus();
    }
  });

  game.addEventListener('input', event => {
    if (event.target.id !== 'answer') return;
    typed = event.target.value;
    refreshAnswer();
  });
  game.addEventListener('submit', event => {
    if (event.target.id !== 'answer-form') return;
    event.preventDefault();
    submit(typed);
  });
  window.addEventListener('pagehide', stopAudio);
  window.addEventListener('focus', () => {
    updateReviewCount();
    if (screen === 'review') render();
  });
  setInterval(updateReviewCount, 60000);
  render();
})();

