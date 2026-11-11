'use strict';
function numberPosterPicture(kind,count,cls='',alt=''){
 const icon=kind==='book'?'📘':'👩‍🏫';
 const label=alt||count+(kind==='book'?'本书':'位老师');
 return `<div class="number-picture number-poster-count ${cls}" role="img" aria-label="${E(label)}" style="--bird-cols:4">
 ${Array.from({length:count},()=>`<span aria-hidden="true">${icon}</span>`).join('')}</div>`;
}
function numberPosterPreview(){
 const selected=NUMBER_POSTER_ITEMS.filter(item=>state.numberPoster.counts[item.id]);
 return `<section class="number-poster-preview" aria-label="我的数字海报预览"><h3 lang="en">Me in numbers</h3>
 ${selected.length?`<div class="number-poster-preview-grid">${selected.map(item=>{
  const count=state.numberPoster.counts[item.id],noun=count===1?item.id:item.plural,word=NUMBER_POSTER_NUMBERS[count-1];
  return `<article><span class="number-poster-quantity">${count}</span><b class="english">${E(noun)}</b><p>${E(item.label)}</p>
  <div class="actions"><button class="secondary" data-audio="${item.audio}">听问句</button><button class="secondary" data-audio="${word}">听数量 ${count}</button></div></article>`;
 }).join('')}</div>`:'<p>先在上面选几项，填入自己数到的数量。</p>'}</section>`;
}
function numberPosterForm(){
 return `<section class="startup-extra"><h3>第51页 · 先填自己的数字卡</h3>
 <p>选你想介绍的几项，填 1–12。还没数过的先空着，可以下次接着填。</p>
 <form id="number-poster-plan" class="number-poster-form">
 ${NUMBER_POSTER_ITEMS.map(item=>`<label>${E(item.label)}<span class="english">${E(item.plural)}</span>
 <select name="${item.id}" aria-label="${E(item.label)}的数量"><option value="">先不填</option>
 ${NUMBER_POSTER_NUMBERS.map((word,index)=>`<option value="${index+1}" ${state.numberPoster.counts[item.id]===index+1?'selected':''}>${index+1} · ${word}</option>`).join('')}
 </select></label>`).join('')}
 <button class="primary" type="submit">保存数字卡</button></form>
 <p role="status" data-number-poster-status>数字卡保存在当前浏览器。</p>
 <div data-number-poster-preview>${numberPosterPreview()}</div>
 <h3>再画到纸上</h3><ol><li>在纸上写标题 <b>Me in numbers</b>。</li><li>画出想介绍的用品和人物。</li><li>把自己数到的数量写在旁边。</li></ol>
 ${numberPosterCheck('drawn','我画好纸上海报了','纸上海报已画好 ✓')}</section>`;
}
function numberPosterCheck(key,label,done){
 const hasCounts=Object.keys(state.numberPoster.counts).length>0;
 return `<button class="secondary" data-number-poster-check="${key}" aria-pressed="${state.numberPoster[key]}" ${hasCounts?'':'disabled'}>${state.numberPoster[key]?done:label}</button>`;
}
function renderNumberPosterScene(body){
 const scene=SCENES[state.scene],next=state.scene<SCENES.length-1;
 const tabs=SCENES.map((item,i)=>`<button data-scene="${i}" class="${i===state.scene?'active':''}" aria-pressed="${i===state.scene}">${i+1} · ${E(item.name)}</button>`).join('');
 let activity;
 if(state.scene===0){
  activity=`<section class="startup-extra"><h3>第50页 · 先想一想，再数一数</h3>
  <p>可以先从书、书包、铅笔、尺子、橡皮里选几样，再想想给你上课的老师。</p>
  <div class="number-poster-items">${NUMBER_POSTER_ITEMS.map(item=>`<button class="secondary" data-audio="${item.audio}">${E(item.label)} · 听怎么问</button>`).join('')}</div>
  <p>问几位老师时说 teachers，结尾还有 /z/。books 的结尾是 /s/，可以在下面的例句里听清。</p></section>`;
 }else if(state.scene===1){
  activity=numberPosterForm();
 }else{
  activity=`<section class="startup-extra"><h3>第51页 · 和伙伴轮流问答</h3>
  <p>刚才上面的十二本书、五位老师是教材示例。下面显示你保存的数量。换一个项目问，再交换角色。</p>
  <div class="actions"><button class="secondary" data-audio="u45-demo">▶ 连起来听两组问答</button></div>
  ${numberPosterPreview()}
  <ol><li>一人指着海报，点「听问句」后跟着问。</li><li>另一人看数量，用英语回答。</li><li>交换角色，再问一个项目。</li></ol>
  ${numberPosterCheck('shared','我和伙伴开口问答过了','已经开口问答 ✓')}</section>`;
 }
 body.innerHTML=`<div class="scene-tabs">${tabs}</div>
 <section class="scene-panel poster-scene"><figure>${picture(scene.id,'',scene.alt)}<figcaption>本站原创海报活动示意</figcaption></figure>
 <div class="scene-copy"><span class="eyebrow">UNIT 4 · HIT IT BIG</span><h2>${E(scene.name)}</h2><p>${E(scene.summary)}</p>
 ${scene.lines.map(line=>objectLine(...line)).join('')}<button class="secondary" data-speed>慢速 ${state.speed===.8?'开':'关'}</button></div></section>
 ${activity}<div class="lesson-bottom"><p>数数量、做海报、问答，可以分开完成。</p>
 <button class="primary gold" ${next?'data-scene="'+(state.scene+1)+'"':'data-stage="1"'}>${next?'下一步':'去单词图鉴'} →</button></div>`;
}
function renderNumberPosterAtlas(body,standalone=false){
 const group=COURSE.wordGroups[state.atlasGroup||0],active=state.atlasGroup||0;
 body.innerHTML=(standalone?pageHead('单词图鉴','海报里要用的词','用品和数字再拼一次，teacher 也有慢拼带读。'):'')+
 `<div class="scene-tabs">${COURSE.wordGroups.map((item,i)=>`<button data-word-group="${i}" class="${i===active?'active':''}" aria-pressed="${i===active}">${E(item.title)}</button>`).join('')}</div>
 <div class="section-title"><h2>${E(group.title)}</h2><span>${group.words.length}张词卡</span></div>
 ${wordCards(WORDS.filter(word=>group.words.includes(word.id)))}
 <div class="lesson-bottom"><p>学完一组可以停一停。</p>${active===0?'<button class="primary gold" data-word-group="1">下一小组 →</button>':'<a class="primary gold" href="#practice">去趣味闯关 →</a>'}</div>`;
}
document.addEventListener('submit',event=>{
 if(!COURSE.numberPoster||event.target.id!=='number-poster-plan')return;
 event.preventDefault();
 const counts={};
 for(const {id} of NUMBER_POSTER_ITEMS){
  const value=event.target.elements.namedItem(id).value;
  if(value)counts[id]=Number(value);
 }
 state.numberPoster=NumberPosterModel.plan(state.numberPoster,counts);
 save();
 renderNumberPosterScene(document.querySelector('#lesson-body'));
 document.querySelector('[data-number-poster-status]').textContent='已保存。可以继续在纸上画海报。';
});
document.addEventListener('click',event=>{
 const button=event.target.closest('[data-number-poster-check]');
 if(!COURSE.numberPoster||!button||!Object.keys(state.numberPoster.counts).length)return;
 const key=button.dataset.numberPosterCheck;
 if(!['drawn','shared'].includes(key))return;
 state.numberPoster[key]=!state.numberPoster[key];
 state.numberPoster.updated=Date.now();
 save();
 renderNumberPosterScene(document.querySelector('#lesson-body'));
 document.querySelector('[data-number-poster-check="'+key+'"]')?.focus({preventScroll:true});
});
