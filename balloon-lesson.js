'use strict';
function balloonColour(id){return COLOUR_NAMES.find(word=>word.id===id);}
function balloonPatterns(){
 return `<section class="startup-extra">
 <h3>第33页 · 找规律，涂一涂</h3>
 <p>从左往右看每一行的颜色。先在课本上给最后一个物品涂色，再说一句 It’s…</p>
 <div class="balloon-patterns">${BALLOON_PATTERNS.map((row,i)=>{
  const answer=balloonColour(row.answer);
  return `<article><h4>${i+1} · ${E(row.label)}</h4><ol class="balloon-pattern-row">
  ${row.colours.map(id=>{const word=balloonColour(id);return `<li aria-label="${E(word.meaning)}">${colourSwatch(word)}</li>`;}).join('')}
  <li class="balloon-pattern-missing" aria-label="待涂色">?</li></ol>
  <details><summary>涂完听参考</summary>${objectLine('u32-'+answer.id,"It's "+answer.id+'.','它是'+answer.meaning+'的。')}</details></article>`;
 }).join('')}</div></section>`;
}
function balloonLetterPractice(){
 return `<section class="startup-extra">
 <h3>第33页 · 和伙伴问答字母颜色</h3>
 <p>先指字母问，伙伴用 It’s… 回答。答完交换角色。也可以点下面的问题，自己先答一遍。</p>
 <ul class="balloon-letters" aria-label="第33页字母的颜色">
 ${BALLOON_LETTERS.map(({letter,colour})=>{const word=balloonColour(colour);return `<li aria-label="${letter}，${E(word.meaning)}" style="--letter-colour:${E(word.swatch)}"><b>${letter}</b></li>`;}).join('')}
 </ul>
 <div class="balloon-patterns">${BALLOON_LETTERS.filter(({letter})=>['C','F','H','I'].includes(letter)).map(({letter,colour})=>{
  const word=balloonColour(colour);
  return `<article>${objectLine('u32-'+letter.toLowerCase(),'What colour is '+letter+'?',letter+' 是什么颜色？')}
  <details><summary>答完听参考</summary>${objectLine('u32-'+word.id,"It's "+word.id+'.','它是'+word.meaning+'的。')}</details></article>`;
 }).join('')}</div></section>`;
}
function renderBalloonScene(body){
 const scene=SCENES[state.scene], next=state.scene<SCENES.length-1;
 const tabs=SCENES.map((item,i)=>`<button data-scene="${i}" class="${i===state.scene?'active':''}" aria-pressed="${i===state.scene}">${i+1} · ${E(item.name)}</button>`).join('');
 body.innerHTML=`<div class="scene-tabs">${tabs}</div>
 <section class="scene-panel poster-scene"><figure>${picture(scene.id,'',scene.alt)}<figcaption>原创情境示意</figcaption></figure>
 <div class="scene-copy"><span class="eyebrow">UNIT 3 · START UP</span>
 <h2>${E(scene.name)}</h2><p>${E(scene.summary)}</p>
 <p class="muted">下面是本站口语示范。原故事听力可在外研优学听。</p>
 ${scene.lines.map(line=>objectLine(...line)).join('')}
 <button class="secondary" data-speed>慢速 ${state.speed===.8?'开':'关'}</button></div></section>
 ${state.scene===1?`<section class="startup-extra">
 <h3>第32页 · 看图圈选</h3><p>在课本上圈出波波的第一只气球。先看第3格，再对比第2格。</p>
 <details><summary>圈完看看参考</summary><p>波波拿到的是红色气球。蓝色气球先给了另一个孩子。</p></details>
 <h3>第33页 · 听一句问，再听一句答</h3>${objectLine(...BALLOON_LINES.ask)}
 ${objectLine('u32-red',"It's red.",'它是红色的。')}<p>It’s 是 It is 的简写。换一种颜色，再和伙伴问答。</p>
 </section>`:''}
 ${next?'':balloonPatterns()+balloonLetterPractice()}
 <div class="lesson-bottom"><p>学完一小段可以休息，下次接着学。</p>
 <button class="primary gold" ${next?'data-scene="'+(state.scene+1)+'"':'data-stage="1"'}>${next?'下一个小情境':'去单词图鉴'} →</button></div>`;
}
function renderBalloonAtlas(body,standalone=false){
 const active=state.atlasGroup||0, group=COURSE.wordGroups[active];
 const tabs=COURSE.wordGroups.map((item,i)=>`<button data-word-group="${i}" class="${i===active?'active':''}" aria-pressed="${i===active}">${E(item.title)}</button>`).join('');
 body.innerHTML=(standalone?pageHead('单词图鉴','在气球摊学拼读','七个新词分成两组，可以分开学。'):'')+
 `<div class="scene-tabs">${tabs}</div>
 <div class="section-title"><h2>${E(group.title)}</h2><span>${group.words.length} 个拼读词</span></div>
 ${wordCards(BALLOON_WORDS.filter(word=>group.words.includes(word.id)))}
 <details class="startup-extra"><summary>用新句子复习七个颜色词</summary>
 <p>颜色词可以跟着读，再用来回答 What colour is it?</p>${wordCards(BALLOON_COLOURS)}</details>
 <div class="lesson-bottom"><p>这一组听清楚了，再接着学。</p>
 ${active===0?'<button class="primary gold" data-word-group="1">下一小组 →</button>':'<a class="primary gold" href="#practice">去趣味闯关 →</a>'}</div>`;
}
