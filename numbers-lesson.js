'use strict';
function numberPicture(count,cls='',alt=''){
 if(!Number.isInteger(count)||count<1||count>12)return '';
 const cols=count<=3?count:count===4?2:count<=6?3:4;
 return `<div class="number-picture ${E(cls)}" role="img" aria-label="${E(alt||count+'只分开排列的小鸟')}" style="--bird-cols:${cols}">${Array.from({length:count},()=>'<img src="./assets/scenes/u4-count-bird.webp" alt="" width="384" height="256" loading="lazy">').join('')}</div>`;
}
function numberButtons(list){
 return `<div class="number-listening">${list.map(w=>`<button class="secondary" data-audio="${w.id}"><b>${w.value}</b><span>${E(w.word)}</span><span aria-hidden="true">▶</span></button>`).join('')}</div>`;
}
function numbersListenActivity(){
 return `<section class="startup-extra"><h3>第42页 · 听原歌，分组指数字</h3>
 <p>在外研优学听原歌，边听边指课本上的数字。听不清可以停一停。下面是三组口语慢读，不是歌曲录音。</p>
 ${COURSE.wordGroups.map((group,i)=>`<article class="numbers-group"><h4>${E(group.title)}</h4>${numberButtons(NUMBER_NAMES.slice(i*4,i*4+4))}
 <button class="secondary" data-audio="u41-sequence-${i+1}" data-transport="u41-sequence-${i+1}">▶ 听这一组</button></article>`).join('')}
 <p>一次先听一组就好，想学拼法时再打开单词图鉴。</p></section>`;
}
function numbersCountActivity(){
 numberCountAmount=3;numberCountSeen.clear();
 return `<section class="startup-extra"><h3>点一只，数一个</h3><p>先选一个数量，再点小鸟。听英语数字，看看有没有重复数。</p>
 <div class="number-amounts" aria-label="选择练习数量">${NUMBER_NAMES.map(w=>`<button class="secondary ${w.value===3?'active':''}" data-number-amount="${w.value}" aria-pressed="${w.value===3}">${w.value}</button>`).join('')}</div>
 <div id="number-count-area">${numberCounter(3)}</div>
 <p class="muted">这是本站点数练习，不自动判断你的口头发音，也不因点过小鸟就自动点亮词星。</p></section>`;
}
function numberCounter(count){
 return `<div class="number-count-grid">${Array.from({length:count},(_,i)=>`<button type="button" class="count-bird" data-count-bird="${i}" aria-label="点这只小鸟数一数" aria-pressed="false"><img src="./assets/scenes/u4-count-bird.webp" alt="" width="384" height="256"><span class="count-mark" aria-hidden="true"></span></button>`).join('')}</div>
 <p id="number-count-status" role="status">先自己点一只，数一个。</p><div class="actions"><button class="secondary" data-number-reset>重新点数</button>
 <details><summary>数完听参考</summary>${objectLine('u41-'+NUMBER_NAMES[count-1].id,'I can see '+NUMBER_NAMES[count-1].id+(count===1?' bird.':' birds.'),'参考说法')}</details></div>`;
}
function numbersBookActivity(){
 return `<section class="startup-extra"><h3>第42—43页 · 回到课本找鸟</h3>
 <ol><li>把两页大图一起看，从左边开始，先找一只，用手指点住。</li><li>按顺序一只一只数，已经数过的位置不要重复。</li><li>用 I can see… birds. 说说自己的发现，再请伙伴数一遍。</li></ol>
 <p>课本图里有竹林、飞鸟和停着的小鸟，注意别漏掉边角。两个人数得不一样时，再一起找找哪里漏数或重复数了。</p>
 <details><summary>先用本站三只小鸟练一句</summary>${objectLine('u41-three','I can see three birds.','我看见三只鸟。')}</details>
 <p class="muted">只有一只时说 one bird，两只或更多时说 birds。课本原图数量请以自己的完整教材为准。</p></section>`;
}
function renderNumbersScene(body){
 const scene=SCENES[state.scene],next=state.scene<SCENES.length-1;
 const activity=[numbersListenActivity,numbersCountActivity,numbersBookActivity][state.scene];
 body.innerHTML=`<div class="scene-tabs">${SCENES.map((s,i)=>`<button data-scene="${i}" class="${state.scene===i?'active':''}" aria-pressed="${state.scene===i}">${i+1} · ${E(s.name)}</button>`).join('')}</div>
 <section class="scene-panel poster-scene"><figure>${picture(scene.id,'',scene.alt)}<figcaption>原创数鸟示意</figcaption></figure>
 <div class="scene-copy"><span class="eyebrow">UNIT 4 · GET READY</span><h2>${E(scene.name)}</h2><p>${E(scene.summary)}</p>
 ${scene.lines.map(line=>objectLine(...line)).join('')}<button class="secondary" data-speed>慢速 ${state.speed===.8?'开':'关'}</button></div></section>
 ${activity()}<div class="lesson-bottom"><p>今天先完成一小段也可以。</p><button class="primary gold" ${next?'data-scene="'+(state.scene+1)+'"':'data-stage="1"'}>${next?'下一小步':'去单词图鉴'} →</button></div>`;
}
function renderNumbersAtlas(body,standalone=false){
 const active=state.atlasGroup||0,group=COURSE.wordGroups[active];
 body.innerHTML=(standalone?pageHead('单词图鉴','三组数字，慢慢拼出来','先选1—4、5—8或9—12；会了再换组。'):'')+
 `<div class="scene-tabs">${COURSE.wordGroups.map((item,i)=>`<button data-word-group="${i}" class="${active===i?'active':''}" aria-pressed="${active===i}">${E(item.title)}</button>`).join('')}</div>
 <div class="section-title"><h2>${E(group.title)}</h2><span>4 个数字词</span></div>${wordCards(NUMBER_NAMES.filter(w=>group.words.includes(w.id)))}
 <details class="startup-extra"><summary>数鸟时用到的四个小词</summary>${wordCards(NUMBER_SUPPORT)}</details>
 <div class="lesson-bottom"><p>one 的特殊拼写先记声音；其他词跟老师把声音连起来。nine 复用之前学过的拼读。</p>${active<2?'<button class="primary gold" data-word-group="'+(active+1)+'">下一小组 →</button>':'<a class="primary gold" href="#practice">去趣味闯关 →</a>'}</div>`;
}
// Counting is a lightweight, repeatable activity, separate from mastery/reward records.
let numberCountAmount=3;
const numberCountSeen=new Set();
document.addEventListener('click',event=>{
 if(!COURSE.numbers)return;
 const amount=event.target.closest('[data-number-amount]');
 const reset=event.target.closest('[data-number-reset]');
 const bird=event.target.closest('[data-count-bird]');
 if(amount||reset){
  const n=amount?Number(amount.dataset.numberAmount):numberCountAmount;
  if(!Number.isInteger(n)||n<1||n>12)return;
  numberCountAmount=n;numberCountSeen.clear();
  const area=document.querySelector('#number-count-area');if(!area)return;
  area.innerHTML=numberCounter(n);
  document.querySelectorAll('[data-number-amount]').forEach(b=>{b.classList.toggle('active',Number(b.dataset.numberAmount)===n);b.setAttribute('aria-pressed',String(Number(b.dataset.numberAmount)===n));});
 }else if(bird){
  const i=Number(bird.dataset.countBird);if(!Number.isInteger(i)||i<0||i>=numberCountAmount)return;
  const status=document.querySelector('#number-count-status');
  if(numberCountSeen.has(i)){if(status)status.textContent='这只已经数过啦，找还没点过的。';return;}
  numberCountSeen.add(i);const count=numberCountSeen.size,word=NUMBER_NAMES[count-1];
  bird.setAttribute('aria-pressed','true');bird.classList.add('counted');bird.querySelector('.count-mark').textContent=String(count);
  if(status)status.textContent=count===numberCountAmount?'数完啦！你数到了 '+count+'。':'已经数到 '+count+'，再找下一只。';
  play(word.id);
 }
});
