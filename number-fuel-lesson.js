'use strict';
function numberFuelLetters(){
 return `<section class="startup-extra">
 <h3>第48页 · 听 Oo 到 Tt</h3>
 <div class="alphabet-pairs">${NUMBER_FUEL_LETTERS.map(letter=>`<button class="alphabet-pair" data-audio="${letter.id}" aria-label="听字母 ${letter.upper} 的名称"><b>${letter.upper}${letter.lower}</b><span>听字母名</span>${speaker}</button>`).join('')}</div>
 <p>认一认大小写，再看课本里的箭头，在四线三格里按笔顺写。</p>
 <h3>短音 /ɪ/，听一听有什么相同</h3>
 <p>字母 Ii 的名字读 /aɪ/。在下面三个词里，i 读短音 /ɪ/。</p>
 <div class="actions">
 <button class="secondary" data-audio="letter-i">听 Ii 的名字</button>
 <button class="secondary" data-audio="clear-ih">听短音 /ɪ/</button>
 ${[['big','b','g'],['little','l','ttle'],['six','s','x']].map(([word,before,after])=>`<button class="secondary english" data-audio="${word}" aria-label="听 ${word}">${before}<mark>i</mark>${after}</button>`).join('')}
 </div></section>`;
}

function numberFuelMatch(){
 const buttons=NUMBER_FUEL_MATCH.map(([symbol,id])=>`<button type="button" class="secondary" aria-pressed="false" data-fuel-symbol="${id}">${E(symbol)}</button>`).join('');
 const options=['five','nine','six','seven','one','eight','three','four','ten','two'];
 return `<section class="startup-extra" data-fuel-match>
 <h3>第49页 · 给数字找英文</h3>
 <p>先点一个数字，再点意思相同的英文。答对后两张卡会一起标记。</p>
 <div class="number-fuel-match-buttons" role="group" aria-label="数字">${buttons}</div>
 <div class="number-fuel-match-buttons" role="group" aria-label="英文数字">
 ${options.map(id=>`<button type="button" class="secondary english" data-fuel-option="${id}">${id}</button>`).join('')}</div>
 <p class="number-fuel-match-feedback" role="status">选一个数字开始。<span data-fuel-count>0 / 10</span></p>
 </section>`;
}

document.addEventListener('click',event=>{
 const button=event.target.closest('[data-fuel-symbol],[data-fuel-option]');
 if(!button)return;
 const section=button.closest('[data-fuel-match]');
 if(!section)return;
 const feedback=section.querySelector('[role="status"]');
 const total=NUMBER_FUEL_MATCH.length;
 const announce=message=>{
  const count=section.querySelectorAll('[data-fuel-symbol]:disabled').length;
  feedback.textContent=`${message} ${count} / ${total}`;
 };
 const selected=section.querySelector('[data-fuel-symbol][aria-pressed="true"]');
 if(button.hasAttribute('data-fuel-symbol')){
  selected?.setAttribute('aria-pressed','false');
  button.setAttribute('aria-pressed','true');
  announce(`为 ${button.textContent} 选一个英文数字。`);
  return;
 }
 if(!selected){announce('先点上面的一张数字卡。');return;}
 if(selected.dataset.fuelSymbol!==button.dataset.fuelOption){
  announce('这两张卡表示不同的数，再找一找。');
  return;
 }
 const pair=`${selected.textContent} 和 ${button.textContent}`;
 selected.setAttribute('aria-pressed','false');
 for(const card of [selected,button]){
  card.disabled=true;
  card.classList.add('matched');
  card.textContent+=' ✓';
 }
 const next=section.querySelector('[data-fuel-symbol]:not(:disabled)');
 announce(next?`${pair} 配对成功！`:'十组都配对成功！');
 if(next)next.focus();
});

function numberFuelListening(){
 return `<section class="startup-extra">
 <h3>第49页 · 听音排序，再指一指</h3>
 <p>在课本上找到诗页、钟面和车牌。先用外研U学听原题，再试下面本站录制的补充练习。</p>
 <div class="balloon-patterns">${['poem','clock','plate'].map(key=>`<article>${objectLine(...NUMBER_FUEL_LINES[key])}</article>`).join('')}</div>
 <div class="actions"><button class="secondary" data-audio="u44-listen-order">▶ 听完三句，排先后</button></div>
 <details><summary>排完看参考</summary><p>钟面 → 诗页 → 车牌。可以去第5关点词块排一次。</p></details>
 </section>`;
}
function renderNumberFuelScene(body){
 const index=state.scene,scene=SCENES[index],next=index<SCENES.length-1;
 const tabs=SCENES.map((item,i)=>`<button data-scene="${i}" class="${i===index?'active':''}" aria-pressed="${i===index}">${i+1} · ${E(item.name)}</button>`).join('');
 const first=`<section class="scene-panel poster-scene">
 <figure>${picture(scene.id,'',scene.alt)}<figcaption>校园里的数字 · 原创插画</figcaption></figure>
 <div class="scene-copy"><span class="eyebrow">UNIT 4 · FUEL UP</span><h2>${E(scene.name)}</h2><p>${E(scene.summary)}</p>
 ${scene.lines.map(line=>objectLine(...line)).join('')}<button class="secondary" data-speed>慢速 ${state.speed===.8?'开':'关'}</button></div></section>
 <section class="startup-extra"><h3>第48页 · 跟着节奏数一数</h3>
 <div class="balloon-patterns">${[
 ['u41-sequence-1','One. Two. Three. Four.','一到四'],
 ['u41-sequence-2','Five. Six. Seven. Eight.','五到八'],
 ['u41-sequence-3','Nine. Ten. Eleven. Twelve.','九到十二'],
 ].map(line=>`<article>${objectLine(...line)}</article>`).join('')}</div>
 <p>想一想，时钟、日历上还有哪些数字？指一个给伙伴看，再试着用英语说出来。</p></section>`;
 body.innerHTML=`<div class="scene-tabs">${tabs}</div>
 ${index===0?first:index===1?numberFuelLetters():numberFuelMatch()+numberFuelListening()}
 <div class="lesson-bottom"><p>每做完一小段都可以停一停。</p><button class="primary gold" ${next?'data-scene="'+(index+1)+'"':'data-stage="1"'}>${next?'下一小步':'去单词图鉴'} →</button></div>`;
}

function renderNumberFuelAtlas(body,standalone=false){
 const active=state.atlasGroup||0,group=NUMBER_FUEL_GROUPS[active];
 const tabs=NUMBER_FUEL_GROUPS.map((item,i)=>`<button data-word-group="${i}" class="${i===active?'active':''}" aria-pressed="${i===active}">${E(item.title)}</button>`).join('');
 body.innerHTML=(standalone?pageHead('单词图鉴','认识身边的数字词','五个新词分两组，先跟着老师慢慢拼。'):'')+
 `<div class="scene-tabs">${tabs}</div><div class="section-title"><h2>${E(group.title)}</h2><span>${group.words.length} 张词卡</span></div>
 ${wordCards(NUMBER_FUEL_WORDS.filter(word=>group.words.includes(word.id)))}
 ${active===1?`<details class="startup-extra"><summary>把两个词连起来说</summary>${wordCards(NUMBER_FUEL_WORDS.filter(word=>word.id==='all-around'))}</details>`:''}
 <details class="startup-extra"><summary>复习一到十二</summary>${wordCards(NUMBER_FUEL_REVIEW)}</details>
 <div class="lesson-bottom"><p>点开词卡，听一听，再跟着老师拼。</p>
 ${active===0?'<button class="primary gold" data-word-group="1">下一小组 →</button>':'<a class="primary gold" href="#practice">去趣味闯关 →</a>'}</div>`;
}
