 'use strict';
const FamilyFuelOrder={expected:{three:'2',six:'1',eight:'3'},check(values){const keys=Object.keys(this.expected);return {complete:keys.every(k=>values[k]),right:keys.filter(k=>values[k]===this.expected[k]).length};}};
function familyFuelLetters(){
 return `<section class="startup-extra"><h3>第60页 · Uu—Zz</h3><div class="alphabet-pairs">${FAMILY_FUEL_LETTERS.map(l=>`<button class="alphabet-pair" data-audio="${l.id}" aria-label="听字母 ${l.upper} 的名称"><b>${l.upper}${l.lower}</b><span>听字母名</span></button>`).join('')}</div><p>先听名字、找大小写，再对照课本箭头，在四线三格里按笔顺写。字母名字和它在单词中的声音要分开听。</p><h3>找一找同样的短音 /ɒ/</h3><p>Oo 的名字读 /əʊ/；在 dog、box、orange 里，这个 o 读英式短音 /ɒ/。跟着声音读，不用汉字标音。</p><div class="actions"><button class="secondary" data-audio="letter-o">听 Oo 的名字</button><button class="secondary" data-audio="startup-short-o">听短音 /ɒ/</button>${[['dog','d','g'],['box','b','x'],['orange','','range']].map(([word,before,after])=>`<button class="secondary english" data-audio="${word}">${before}<mark>o</mark>${after}</button>`).join('')}</div></section>`;
}
function familyFuelListening(){
 const rows=[['three','A · 爸爸妈妈和一个孩子','三个人'],['six','B · 祖辈、父母和两个孩子','六个人'],['eight','C · 父母和六个孩子','八个人']];
 return `<section class="startup-extra"><h3>第61页 · 听音排序</h3><p>对照课本三张家庭照片，用外研U学原录音完成书上的顺序。家庭可以有不同的人数和成员，不用和别人的家庭一样。</p><details><summary>再听一组本站补充练习</summary><p>下面的A/B/C是本站另编的人数卡，与课本三张照片对应的官方录音顺序分开记录。</p><button class="secondary" data-audio="u54-listen-order">▶ 听本站补充录音</button><div class="balloon-patterns">${rows.map(([id,title,label])=>`<article><h4>${title}</h4><p>${label}</p><label>第几段介绍？<select data-family-fuel-order="${id}" aria-label="${label}家庭出现的次序"><option value="">请选择</option>${[1,2,3].map(n=>`<option value="${n}">${n}</option>`).join('')}</select></label></article>`).join('')}</div><button class="primary gold" data-family-fuel-check>检查三个次序</button><p role="status" data-family-fuel-result></p></details><h3>说说自己的家人</h3><p>挑一位你想介绍的家人，用一句话说给伙伴听。可以画一张家人图，不需要上传家庭照片；也可以借本站合影练习。</p>${objectLine('u54-family','This is my family.','这是我的家人。')}${objectLine('u54-mum','This is my mum.','这是我的妈妈。')}</section>`;
}
function renderFamilyFuelScene(body){
 const s=SCENES[state.scene],next=state.scene<SCENES.length-1;
 const extra=state.scene===0?`<section class="startup-extra"><h3>第60页 · 听原歌谣，找粉色字母</h3><p>在外研U学听本课歌谣，边听边看课本里的粉色字母；听到家人的呼唤，就指一指对应的家人。下方短句是本站口语巩固示范。</p><p>Daddy 和 Mummy 是对爸爸、妈妈的亲切叫法。where’s 是 where is，问“在哪里”；take a photo 表示“拍照”。</p></section>`:state.scene===1?familyFuelLetters():familyFuelListening();
 body.innerHTML=`<div class="scene-tabs">${SCENES.map((s,i)=>`<button data-scene="${i}" class="${state.scene===i?'active':''}" aria-pressed="${state.scene===i}">${i+1} · ${E(s.name)}</button>`).join('')}</div><section class="scene-panel"><figure>${picture(s.id,'',s.alt)}<figcaption>原创巩固示意，非课本原图</figcaption></figure><div class="scene-copy"><span class="eyebrow">UNIT 5 · FUEL UP</span><h2>${E(s.name)}</h2><p>${E(s.summary)}</p>${s.lines.map(line=>objectLine(...line)).join('')}<button class="secondary" data-speed>慢速 ${state.speed===.8?'开':'关'}</button></div></section>${extra}<div class="lesson-bottom"><p>每次听清一小步，再继续。</p><button class="primary gold" ${next?'data-scene="'+(state.scene+1)+'"':'data-stage="1"'}>${next?'下一小步':'去单词图鉴'} →</button></div>`;
}
function renderFamilyFuelAtlas(body,standalone=false){
 const active=Math.min(state.atlasGroup||0,2),g=COURSE.wordGroups[active];
 body.innerHTML=(standalone?pageHead('单词图鉴','拍照前，听清这些词','五个新词分两组，六个字母单独听名字。'):'')+`<div class="scene-tabs">${COURSE.wordGroups.map((g,i)=>`<button data-word-group="${i}" class="${active===i?'active':''}">${E(g.title)}</button>`).join('')}</div><h2>${E(g.title)}</h2>${wordCards(active===2?FAMILY_FUEL_LETTERS:FAMILY_FUEL_NEW.filter(w=>g.words.includes(w.id)))}${active===2?'<p class="plain-note">这里读的是字母名字；拼单词时听字母对应的声音。</p>':''}<details class="startup-extra"><summary>复习拍照和家人介绍用词</summary>${wordCards(FAMILY_FUEL_REVIEW)}</details><div class="lesson-bottom">${active<2?`<button class="primary gold" data-word-group="${active+1}">下一小组 →</button>`:'<a class="primary gold" href="#practice">去趣味闯关 →</a>'}</div>`;
}
document.addEventListener('click',event=>{
 if(!event.target.closest('[data-family-fuel-check]'))return;
 const fields=[...document.querySelectorAll('[data-family-fuel-order]')];
 const values=Object.fromEntries(fields.map(f=>[f.dataset.familyFuelOrder,f.value])),{complete,right}=FamilyFuelOrder.check(values);
 for(const f of fields)f.setAttribute('aria-invalid',String(complete&&f.value!==FamilyFuelOrder.expected[f.dataset.familyFuelOrder]));
 document.querySelector('[data-family-fuel-result]').textContent=!complete?'先给三张卡都选一个次序。':right===3?'三段介绍都排对了！再选一位家人，自己介绍一句。':'已经排对 '+right+' 张卡。再听一遍，改一改其他次序。';
});
