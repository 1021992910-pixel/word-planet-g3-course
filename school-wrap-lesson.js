'use strict';
function schoolWrapBoard(){
 return `<section class="startup-extra"><h3>第28页 · 文具棋盘</h3>
 <p>打开第28页，从起点顺着路线走。看课本里的图，先自己说，再打开对应格的示范。</p>
 <div class="wrap-grid">${SCHOOL_WRAP_BOARD.map((tile,i)=>`<article><small>第 ${i+1} 格 · ${E(tile.title)}</small>
 <p>${tile.question?timedText(tile.question,tile.prompt):E(tile.prompt)}</p>
 ${tile.question?`<button class="secondary" data-audio="${tile.question}">▶ 听这格</button>`:''}
 ${tile.answer?`<details><summary>说完听示范</summary>${objectLine(tile.answer,tile.reply,'参考说法')}</details>`:''}
 </article>`).join('')}</div></section>`;
}
function schoolWrapChecks(){
 return `<section class="startup-extra"><h3>第28页 · 我会了吗？</h3>
 <p>每项先做一遍，再决定是否勾选。想多练一次，可以点旁边的课。</p>
 <div class="wrap-checks">${SCHOOL_WRAP_CHECKS.map(item=>{
  const checked=state.wrap.checks.includes(item.id);
  return `<div><button type="button" class="secondary" data-school-check="${item.id}" aria-pressed="${checked}">${checked?'✓':'○'} ${E(item.text)}</button>
  <a href="${lessonLink(item.lesson)}">再练这一项 →</a></div>`;
 }).join('')}</div>
 <p class="muted">自查由你自己确认，勾选记录保存在当前浏览器。</p></section>`;
}
function schoolWrapExplore(){
 return `<section class="startup-extra"><h3>第29页 · 认识三种书写工具</h3>
 <p>按图上从左到右的顺序，看看笔尖有什么不同。</p>
 <div class="wrap-grid">${SCHOOL_WRAP_TOOLS.map(item=>`<article><h4>${E(item.word)} · ${E(item.zh)}</h4>
 <p>${E(item.hint)}</p><div class="actions"><button class="secondary" data-audio="${item.id}">▶ 听名称</button>
 <button class="secondary" data-word="${item.id}">打开词卡</button></div></article>`).join('')}</div>
 <h3>回到课本连一连</h3><p>先看第29页的三个人物，把他们和英语名称、对应的笔连起来。</p>
 ${objectLine('u26-use','What do they use?','他们用什么写字？')}
 <details><summary>连完看看参考</summary><p>第1位用毛笔（brush），第2位用钢笔（pen），第3位用羽毛笔（quill）。</p></details>
 <h3>拿起自己的笔，和伙伴聊一聊</h3>
 ${objectLine('u26-my-pen','This is my pen.','这是我的笔。')}
 <p>轮流说一句，再看看你们的笔有什么不同。用完把笔放回笔袋。</p></section>`;
}
function renderSchoolWrapScene(body){
 const scene=SCENES[state.scene];
 const tabs=SCENES.map((item,i)=>`<button data-scene="${i}" class="${i===state.scene?'active':''}" aria-pressed="${i===state.scene}">${i+1} · ${E(item.name)}</button>`).join('');
 const next=state.scene<SCENES.length-1;
 const activity=[schoolWrapBoard,schoolWrapChecks,schoolWrapExplore][state.scene];
 body.innerHTML=`<div class="scene-tabs">${tabs}</div>
 <section class="scene-panel poster-scene"><figure>${picture(scene.id,'',scene.alt)}<figcaption>原创情境示意</figcaption></figure>
 <div class="scene-copy"><span class="eyebrow">UNIT 2 · 回顾与拓展</span>
 <h2>${E(scene.name)}</h2><p>${E(scene.summary)}</p>
 <div class="actions"><button class="primary" data-audio="${scene.audio}">▶ 听一句示范</button>
 <button class="secondary" data-speed>慢速 ${state.speed===.8?'开':'关'}</button></div></div></section>
 ${activity()}<div class="lesson-bottom"><p>三段可以分开完成。</p>
 <button class="primary gold" ${next?'data-scene="'+(state.scene+1)+'"':'data-stage="1"'}>${next?'下一小步':'去复习单词'} →</button></div>`;
}
function renderSchoolWrapAtlas(body,standalone=false){
 const review=WORDS.filter(word=>COURSE.reviewWords.includes(word.id));
 const extra=WORDS.filter(word=>!COURSE.reviewWords.includes(word.id));
 body.innerHTML=(standalone?pageHead('单词图鉴','复习学习用品，认识两种笔','旧词继续听慢拼，再听毛笔和羽毛笔。'):'')+
 `<div class="section-title"><h2>复习七个用品词</h2></div>${wordCards(review)}
 <div class="section-title"><h2>书写工具小拓展</h2></div>${wordCards(extra)}
 <div class="lesson-bottom"><p>把用品名放进问答试一试。</p><a class="primary gold" href="#practice">去趣味闯关 →</a></div>`;
}
document.addEventListener('click',event=>{
 const button=event.target.closest('[data-school-check]');
 if(!COURSE.schoolWrap||!button)return;
 const item=SCHOOL_WRAP_CHECKS.find(entry=>entry.id===button.dataset.schoolCheck);
 if(!item||!WrapModel.toggle(state.wrap,item.id,SCHOOL_WRAP_CHECKS))return;
 save();
 const checked=state.wrap.checks.includes(item.id);
 button.setAttribute('aria-pressed',String(checked));
 button.textContent=(checked?'✓':'○')+' '+item.text;
});
