'use strict';

const NUMBER_WRAP_DOT_SHAPES=[
 {name:'四叶草',points:[[50,38],[24,14],[13,33],[32,50],[12,70],[29,84],[50,66],[71,84],[88,70],[68,50],[86,25]]},
 {name:'海星',points:[[50,10],[57,37],[78,31],[92,39],[69,55],[79,84],[65,76],[50,66],[25,85],[32,55],[9,37],[41,38]]},
 {name:'蝴蝶',points:[[50,43],[79,15],[92,34],[70,50],[86,70],[69,84],[50,67],[31,84],[14,70],[30,50],[8,34],[21,15]]},
];
function numberWrapTokens(icon,count,label){
 return `<span class="number-wrap-tokens">${Array.from({length:count},()=>`<span role="img" aria-label="${label}">${icon}</span>`).join('')}</span>`;
}
const NUMBER_WRAP_PICTURES={
 friends:()=>numberWrapTokens('🧒',3,'一位朋友'),
 books:()=>numberWrapTokens('📕',6,'一本书'),
 pencils:()=>numberWrapTokens('✏️',5,'一支铅笔'),
 colours:()=>`<span class="number-wrap-colours"><b aria-label="蓝色 H">H</b><b aria-label="黄色 I">I</b><b aria-label="紫色 J">J</b><b aria-label="粉色 K">K</b></span>`,
 bus:()=>'<span class="number-wrap-bus" role="img" aria-label="公交车，车牌数字 4、7、3">🚌 <b>473</b></span>',
 balloons:()=>numberWrapTokens('🎈',5,'一个气球')+numberWrapTokens('🎈',5,'一个气球'),
};
function numberWrapAudioWords(words){
 return `<div class="actions">${words.map(word=>`<button class="secondary english" data-audio="${word}">${word}</button>`).join('')}</div>`;
}
function numberWrapBoard(){
 return `<section class="startup-extra"><h3>第52页 · 数字十格</h3>
 <div class="wrap-grid number-wrap-grid">${NUMBER_WRAP_BOARD.map((item,index)=>{
  const visual=item.picture?NUMBER_WRAP_PICTURES[item.picture]():item.print?`<p class="english">${item.answer.join(' · ')}</p>`:'';
  const reference=item.sequence?
   [['u41-sequence-1','1–4'],['u41-sequence-2','5–8'],['u41-sequence-3','9–12']].map(([id,label])=>`<button class="secondary" data-audio="${id}">听 ${label}</button>`).join(' '):
   item.reference?objectLine(item.reference,'Four, seven, three.','四、七、三。'):numberWrapAudioWords(item.answer);
  const choices=item.choose?`<div data-number-wrap-letter><div class="actions">${['two','four','six'].map(word=>`<button class="secondary english" data-number-wrap-letter-choice="${word}" aria-pressed="false">${word}</button>`).join('')}</div><p role="status">选一个词。</p></div>`:'';
  return `<article><h4>${index+1} · ${E(item.title)}</h4><p>${E(item.instruction)}</p>${visual}
   <button class="secondary" data-audio="${item.audio}">▶ 听这格要求</button>${choices}
   <details><summary>说完听参考</summary>${reference}</details></article>`;
 }).join('')}</div></section>`;
}
function numberWrapChecks(){
 return `<section class="startup-extra"><h3>第52页 · 四项自查</h3>
 <div class="wrap-checks">${NUMBER_WRAP_CHECKS.map(item=>{
  const checked=state.wrap.checks.includes(item.id);
  return `<div><button class="secondary" data-number-wrap-check="${item.id}" aria-pressed="${checked}">${checked?'✓':'○'} ${E(item.text)}</button>
  <a href="${lessonLink(item.lesson)}">回去练这一项 →</a></div>`;
 }).join('')}</div><p class="muted">勾选记录会保存在当前浏览器。</p></section>`;
}
function numberWrapDotBoard(index){
 const shape=NUMBER_WRAP_DOT_SHAPES[index];
 return `<div class="number-wrap-dot-board" data-dot-index="${index}" data-dot-progress="0">
 <canvas width="600" height="450" aria-hidden="true"></canvas>
 ${shape.points.map(([x,y],i)=>`<button type="button" data-number-wrap-dot="${i+1}" aria-label="点 ${i+1}" aria-pressed="false" style="left:${x}%;top:${y}%">${i+1}</button>`).join('')}</div>
 <p role="status" data-number-wrap-dot-status>从 1 开始，按顺序连。</p>`;
}
function numberWrapExplore(){
 return `<section class="startup-extra"><h3>第53页 · 看图，配上数字</h3>
 <p>看课本里的照片，先自己数，再点英文数字。下面的图标帮你找到要看的照片。</p>
 <div class="wrap-grid">${NUMBER_WRAP_NATURE.map(item=>`<article data-number-wrap-match="${item.id}">
  <h4><span aria-hidden="true">${item.icon}</span> ${item.name}</h4><p>${item.tip}</p>
  <button class="secondary" data-audio="${item.audio}">▶ 听问题</button>
  <div class="actions">${['six','seven','eight'].map(word=>`<button class="secondary english" data-number-wrap-match-choice="${word}" aria-pressed="false">${word}</button>`).join('')}</div>
  <p role="status">选好一个数字词。</p></article>`).join('')}</div>
 <h3>数着数字连一连</h3><p>课本上的三幅图可以用笔连。这里也可以点数字练习。</p>
 <div class="scene-tabs">${NUMBER_WRAP_DOT_SHAPES.map((shape,i)=>`<button data-number-wrap-shape="${i}" aria-pressed="${i===0}">图案 ${i+1}</button>`).join('')}</div>
 <div data-number-wrap-dot-area>${numberWrapDotBoard(0)}</div>
 <h3>再找一种动物或植物</h3>
 <p>可以看看猫的脚、鸟的翅膀，或者数一朵花的花瓣。指给伙伴看，用英语说你数到了多少。</p>
 ${objectLine('u46-nature','How many legs can you see?','你能看到几条腿？')}</section>`;
}
function renderNumberWrapScene(body){
 const index=state.scene,scene=SCENES[index],next=index<SCENES.length-1;
 const activity=[numberWrapBoard,numberWrapChecks,numberWrapExplore][index];
 body.innerHTML=`<div class="scene-tabs">${SCENES.map((item,i)=>`<button data-scene="${i}" class="${i===index?'active':''}" aria-pressed="${i===index}">${i+1} · ${E(item.name)}</button>`).join('')}</div>
 <section class="scene-panel poster-scene"><figure>${picture(scene.id,'',scene.alt)}<figcaption>原创活动示意</figcaption></figure>
 <div class="scene-copy"><span class="eyebrow">UNIT 4 · 回顾与拓展</span><h2>${E(scene.name)}</h2><p>${E(scene.summary)}</p>
 <div class="actions"><button class="primary" data-audio="${scene.audio}">▶ 听一句示范</button><button class="secondary" data-speed>慢速 ${state.speed===.8?'开':'关'}</button></div></div></section>
 ${activity()}<div class="lesson-bottom"><p>每次练一个小活动。</p><button class="primary gold" ${next?'data-scene="'+(index+1)+'"':'data-stage="1"'}>${next?'下一小步':'去复习数字词'} →</button></div>`;
}
function renderNumberWrapAtlas(body,standalone=false){
 const index=state.atlasGroup||0,group=COURSE.wordGroups[index];
 body.innerHTML=(standalone?pageHead('单词图鉴','复习数字词','选一组先听，再跟着拼。'):'')+
 `<div class="scene-tabs">${COURSE.wordGroups.map((item,i)=>`<button data-word-group="${i}" class="${i===index?'active':''}" aria-pressed="${i===index}">${E(item.title)}</button>`).join('')}</div>
 <div class="section-title"><h2>${E(group.title)}</h2><span>${group.words.length} 个数字词</span></div>
 ${wordCards(WORDS.filter(word=>group.words.includes(word.id)))}
 <details class="startup-extra"><summary>再复习其他六个数字</summary>${wordCards(WORDS.filter(word=>!NUMBER_WRAP_FOCUS.includes(word.id)))}</details>
 <div class="lesson-bottom"><p>先练自己容易忘的词。</p>${index===0?'<button class="primary gold" data-word-group="1">下一小组 →</button>':'<a class="primary gold" href="#practice">去趣味闯关 →</a>'}</div>`;
}
function selectNumberWrapAnswer(button,card,correct){
 for(const choice of card.querySelectorAll('.actions [aria-pressed]'))choice.setAttribute('aria-pressed',String(choice===button));
 card.querySelector('[role="status"]').textContent=correct?'选对了 ✓':'再数一数，试一次。';
}
function joinNumberWrapDot(button){
 const board=button.closest('[data-dot-index]');
 const shape=NUMBER_WRAP_DOT_SHAPES[Number(board.dataset.dotIndex)];
 const progress=Number(board.dataset.dotProgress);
 const status=board.parentElement.querySelector('[data-number-wrap-dot-status]');
 if(progress===shape.points.length)return;
 if(Number(button.dataset.numberWrapDot)!==progress+1){
  status.textContent=`请先点 ${progress+1}。`;
  return;
 }
 const canvas=board.querySelector('canvas'),ctx=canvas.getContext('2d');
 const next=progress+1,finished=next===shape.points.length;
 const draw=(from,to)=>{
  ctx.beginPath();
  ctx.moveTo(from[0]*canvas.width/100,from[1]*canvas.height/100);
  ctx.lineTo(to[0]*canvas.width/100,to[1]*canvas.height/100);
  ctx.stroke();
 };
 ctx.strokeStyle='#2a6c74';ctx.lineWidth=6;ctx.lineCap='round';
 if(progress)draw(shape.points[progress-1],shape.points[progress]);
 if(finished){
  board.dataset.dotFinished='';
  finishNumberWrapDrawing(ctx,shape,Number(board.dataset.dotIndex));
 }
 board.dataset.dotProgress=String(next);
 button.setAttribute('aria-pressed','true');
 status.textContent=finished?`连好了，是${shape.name}！`:`接下来点 ${next+1}。`;
}
function finishNumberWrapDrawing(ctx,shape,index){
 ctx.clearRect(0,0,600,450);
 ctx.save();
 ctx.scale(6,4.5);
 ctx.strokeStyle='#2a6c74';
 ctx.lineWidth=1.25;
 ctx.lineJoin='round';
 const points=shape.points;
 ctx.beginPath();
 ctx.moveTo(...points[0]);
 for(const point of points.slice(1))ctx.lineTo(...point);
 ctx.closePath();
 ctx.fillStyle=['#b8dba8','#f5d090','#c0d7f2'][index];
 ctx.fill();
 ctx.stroke();
 if(index===0){
  ctx.beginPath();
  ctx.moveTo(50,65);
  ctx.quadraticCurveTo(46,85,56,94);
  ctx.stroke();
 }else if(index===2){
  ctx.beginPath();
  ctx.ellipse(50,54,2.2,15,0,0,Math.PI*2);
  ctx.fillStyle='#2a6c74';
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(50,41);
  ctx.quadraticCurveTo(49,35,43,31);
  ctx.moveTo(50,41);
  ctx.quadraticCurveTo(51,35,57,31);
  ctx.stroke();
 }
 ctx.restore();
}
document.addEventListener('click',event=>{
 if(!COURSE.numberWrap)return;
 const button=event.target.closest('button');
 if(!button)return;
 const data=button.dataset;
 if(data.numberWrapCheck){
  const item=NUMBER_WRAP_CHECKS.find(entry=>entry.id===data.numberWrapCheck);
  if(!item||!WrapModel.toggle(state.wrap,item.id,NUMBER_WRAP_CHECKS))return;
  save();
  const checked=state.wrap.checks.includes(item.id);
  button.setAttribute('aria-pressed',String(checked));
  button.textContent=(checked?'✓':'○')+' '+item.text;
 }else if(data.numberWrapMatchChoice){
  const card=button.closest('[data-number-wrap-match]');
  const item=NUMBER_WRAP_NATURE.find(entry=>entry.id===card.dataset.numberWrapMatch);
  selectNumberWrapAnswer(button,card,item.count===data.numberWrapMatchChoice);
 }else if(data.numberWrapLetterChoice){
  const card=button.closest('[data-number-wrap-letter]');
  selectNumberWrapAnswer(button,card,data.numberWrapLetterChoice==='six');
  if(data.numberWrapLetterChoice!=='six')card.querySelector('[role="status"]').textContent='再看看词中有没有 i。';
 }else if(data.numberWrapShape!==undefined){
  const area=document.querySelector('[data-number-wrap-dot-area]');
  area.innerHTML=numberWrapDotBoard(Number(data.numberWrapShape));
  for(const tab of button.parentElement.querySelectorAll('[data-number-wrap-shape]'))tab.setAttribute('aria-pressed',String(tab===button));
 }else if(data.numberWrapDot){
  joinNumberWrapDot(button);
 }
});
