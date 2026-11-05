'use strict';
function colourWrapBoard(){
 return `<section class="startup-extra"><h3>第40页 · I love colours!</h3>
 <p>打开自己的课本，按行找到下面九格。本站玩法：两个人轮流选一格，先自己说，再听参考；一次玩几格就可以。</p>
 <div class="wrap-grid">${COLOUR_WRAP_BOARD.map((tile,i)=>{
  const answer=tile.answer||(tile.wordOnly?tile.colour:'u32-'+tile.colour);
  const text=tile.reply||(tile.wordOnly?tile.colour:"It's "+tile.colour+'.');
  return `<article><small>第 ${i+1} 格 · ${E(tile.title)}</small>
  <p>${timedText(tile.question,tile.prompt)}</p>${tile.printed?'<strong class="english">'+E(tile.printed)+'</strong>':''}
  ${tile.note?'<p>'+E(tile.note)+'</p>':''}
  <button class="secondary" data-audio="${tile.question}">▶ 听这格要求</button>
  <details><summary>说完听参考</summary>${objectLine(answer,text,tile.zh||'参考说法')}</details></article>`;
 }).join('')}</div><p class="muted">熊猫可指着黑色或白色部分回答；整只熊猫用 black and white。这里不要求背写 white。</p></section>`;
}
function colourWrapChecks(){
 return `<section class="startup-extra"><h3>第40页 · 我会了吗？</h3><p>每项先试一次，再决定是否勾选。还不熟的，可以回到对应课。</p>
 <div class="wrap-checks">${COLOUR_WRAP_CHECKS.map(item=>{
  const checked=state.wrap.checks.includes(item.id);
  return `<div><button type="button" class="secondary" data-colour-check="${item.id}" aria-pressed="${checked}">${checked?'✓':'○'} ${E(item.text)}</button>
  <a href="${lessonLink(item.lesson)}">再练这一项 →</a></div>`;
 }).join('')}</div><p class="muted">自己确认、自己勾选，记录保存在当前浏览器。</p></section>`;
}
function colourWrapExplore(){
 return `<section class="startup-extra"><h3>第41页 · 看课本照片，说颜色</h3>
 <p>先听听新朋友的名字。chameleon 是变色龙，先会听、试着跟读，不要求一下记住拼写。</p>
 <div class="actions"><button class="secondary" data-audio="chameleon">▶ 听名字</button><button class="secondary" data-word="chameleon">打开拓展词卡</button></div>
 <p>看课本 A、B、C、D 四张照片，轮流指着变色龙问。说完再展开对应的参考。</p>
 ${objectLine(...BALLOON_LINES.ask)}
 <div class="wrap-grid">${COLOUR_WRAP_PHOTOS.map(item=>`<article><h4>课本照片 ${item.letter}</h4>
 <p>它的身体是什么颜色？</p><details><summary>说完听参考</summary>${objectLine('u32-'+item.colour,"It's "+item.colour+'.','它是'+item.zh+'的。')}</details></article>`).join('')}</div>
 <h3>Look and colour. Then say.</h3>
 <ol><li>看课本下方四只变色龙周围的树枝、石头或叶子。</li>
 <li>在自己的课本上给它们涂色，选你观察到或喜欢的颜色。</li>
 <li>指着自己涂的那一只，和伙伴用 What colour is it? / It’s… 问答，再交换。</li></ol>
 ${colourListeningButtons(COLOUR_WRAP_COLOURS)}
 <p class="muted">涂色没有唯一配色答案，按自己的画回答。本站绿色插画是原创示意，不代替课本的四张照片。</p></section>`;
}
function renderColourWrapScene(body){
 const scene=SCENES[state.scene],next=state.scene<SCENES.length-1;
 const activity=[colourWrapBoard,colourWrapChecks,colourWrapExplore][state.scene];
 body.innerHTML=`<div class="scene-tabs">${SCENES.map((item,i)=>`<button data-scene="${i}" class="${i===state.scene?'active':''}" aria-pressed="${i===state.scene}">${i+1} · ${E(item.name)}</button>`).join('')}</div>
 <section class="scene-panel poster-scene"><figure>${picture(scene.id,'',scene.alt)}<figcaption>原创情境示意</figcaption></figure>
 <div class="scene-copy"><span class="eyebrow">UNIT 3 · 回顾与拓展</span><h2>${E(scene.name)}</h2><p>${E(scene.summary)}</p>
 <div class="actions"><button class="primary" data-audio="${scene.audio}">▶ 听一句示范</button><button class="secondary" data-speed>慢速 ${state.speed===.8?'开':'关'}</button></div></div></section>
 ${activity()}<div class="lesson-bottom"><p>三个短环节可以分开完成。</p><button class="primary gold" ${next?'data-scene="'+(state.scene+1)+'"':'data-stage="1"'}>${next?'下一小步':'去复习颜色词'} →</button></div>`;
}
function renderColourWrapAtlas(body,standalone=false){
 const active=state.atlasGroup||0,group=COURSE.wordGroups[active];
 body.innerHTML=(standalone?pageHead('单词图鉴','复习颜色，认识变色龙','颜色词继续听老师慢拼，动物名字在句子里跟读。'):'')+
 `<div class="scene-tabs">${COURSE.wordGroups.map((item,i)=>`<button data-word-group="${i}" class="${active===i?'active':''}" aria-pressed="${active===i}">${E(item.title)}</button>`).join('')}</div>
 <div class="section-title"><h2>${E(group.title)}</h2><span>${group.words.length} 个复习词</span></div>
 ${wordCards(COLOUR_WRAP_COLOURS.filter(word=>group.words.includes(word.id)))}
 <details class="startup-extra"><summary>问答词与自然小拓展</summary>${wordCards(WORDS.filter(word=>COURSE.contextWords.includes(word.id)))}</details>
 <div class="lesson-bottom"><p>旧词不用从头学完，选还不熟的练一练。</p>${active===0?'<button class="primary gold" data-word-group="1">下一小组 →</button>':'<a class="primary gold" href="#practice">去趣味闯关 →</a>'}</div>`;
}
document.addEventListener('click',event=>{
 const button=event.target.closest('[data-colour-check]');
 if(!COURSE.colourWrap||!button)return;
 const item=COLOUR_WRAP_CHECKS.find(entry=>entry.id===button.dataset.colourCheck);
 if(!item||!WrapModel.toggle(state.wrap,item.id,COLOUR_WRAP_CHECKS))return;
 save();const checked=state.wrap.checks.includes(item.id);
 button.setAttribute('aria-pressed',String(checked));button.textContent=(checked?'✓':'○')+' '+item.text;
});
