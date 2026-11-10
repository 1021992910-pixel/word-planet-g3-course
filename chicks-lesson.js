'use strict';
function chickPicture(kind,count,cls='',alt=''){
 const label=alt||(count+(kind==='egg'?'枚蛋':'只小鸡'));
 const icon=kind==='egg'?'🥚':'🐤';
 return `<div class="number-picture chick-picture ${cls}" role="img" aria-label="${E(label)}" style="--bird-cols:4">
 ${Array.from({length:count},()=>`<span aria-hidden="true">${icon}</span>`).join('')}</div>`;
}
function renderChickScene(body){
 const scene=SCENES[state.scene],next=state.scene<SCENES.length-1;
 const tabs=SCENES.map((item,i)=>`<button data-scene="${i}" class="${i===state.scene?'active':''}" aria-pressed="${i===state.scene}">${i+1} · ${E(item.name)}</button>`).join('');
 const activity=[
  `<h3>第46页 · 读一读，先数蛋</h3><p>打开课本第46页，跟着鸡妈妈指着蛋数，从一数到十二。原故事音频可以在外研优学听。</p>
  <details open><summary>看一组数量示意</summary>${chickPicture('egg',12,'','十二枚蛋，分三行摆放。')}${objectLine('u43-eggs','I can see twelve eggs.','我看见十二枚蛋。')}</details>`,
  `<h3>第46—47页 · 一枚蛋去了哪里？</h3><p>看课本第4到7格，指一指滚出窝的蛋和后来出现的小鸡。</p>
  <details><summary>说完看参考</summary><p>有一枚蛋先破壳了，所以窝里还剩十一枚完整的蛋。图中的蛋壳碎片不算一枚完整的蛋。</p></details>`,
  `<h3>第47页 · 看一看，写数字词</h3><p>回到课本 Look and write，照着书上的示范描写数字词。站内可以先听一组数字，再开口接着数。</p>
  <div class="balloon-patterns"><article>${objectLine('u41-sequence-1','One. Two. Three. Four.','一到四')}</article>
  <article>${objectLine('u41-sequence-2','Five. Six. Seven. Eight.','五到八')}</article>
  <article>${objectLine('u41-sequence-3','Nine. Ten. Eleven. Twelve.','九到十二')}</article></div>
  <details><summary>数完听最后的回答</summary>${objectLine(...CHICK_ANSWER)}<p>一只小鸡用 baby，多只用 babies。鸡蛋一个用 egg，多个用 eggs。</p></details>
  <h3>第47页 · 和伙伴演一演</h3><p>一人演鸡妈妈，其他人演破壳的小鸡。先数蛋，再学小鸡叫，最后交换角色问答小鸡的数量。</p>`,
 ][state.scene];
 body.innerHTML=`<div class="scene-tabs">${tabs}</div>
 <section class="scene-panel poster-scene"><figure>${picture(scene.id,'',scene.alt)}<figcaption>${state.scene===0?'鸡窝局部 · 请用下方数量图数蛋':state.scene===2?'小鸡数量图':'本站原创情境示意'}</figcaption></figure>
 <div class="scene-copy"><span class="eyebrow">UNIT 4 · SPEED UP</span><h2>${E(scene.name)}</h2><p>${E(scene.summary)}</p>
 ${scene.lines.map(line=>objectLine(...line)).join('')}
 <button class="secondary" data-speed>慢速 ${state.speed===.8?'开':'关'}</button></div></section>
 <section class="startup-extra">${activity}</section>
 <div class="lesson-bottom"><p>先听一听，再说一说。</p><button class="primary gold" ${next?'data-scene="'+(state.scene+1)+'"':'data-stage="1"'}>${next?'下一小步':'去单词图鉴'} →</button></div>`;
}
function renderChickAtlas(body,standalone=false){
 const active=state.atlasGroup||0,group=COURSE.wordGroups[active];
 const tabs=COURSE.wordGroups.map((item,i)=>`<button data-word-group="${i}" class="${i===active?'active':''}" aria-pressed="${i===active}">${E(item.title)}</button>`).join('');
 body.innerHTML=(standalone?pageHead('单词图鉴','在鸡窝边学新词','四个重点单词分成两组，可以分次练。'):'')+
 `<div class="scene-tabs">${tabs}</div><div class="section-title"><h2>${E(group.title)}</h2><span>${group.words.length} 张词卡</span></div>
 ${wordCards(CHICK_WORDS.filter(word=>group.words.includes(word.id)))}
 <details class="startup-extra"><summary>复习数数和问数量的词</summary>${wordCards(CHICK_REVIEW)}</details>
 <div class="lesson-bottom"><p>点开词卡，跟着老师把声音接起来。</p>
 ${active===0?'<button class="primary gold" data-word-group="1">下一小组 →</button>':'<a class="primary gold" href="#practice">去趣味闯关 →</a>'}</div>`;
}
