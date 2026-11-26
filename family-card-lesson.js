'use strict';
function familyCardPreview(){
 const r=FAMILY_CARD_RECIPIENTS.find(r=>r.id===state.familyCard.recipient);
 return `<section class="family-card-preview" aria-label="我的贺卡练习预览"><div class="family-card-drawing"><span aria-hidden="true">♡</span><p>在纸上画一位家人</p></div><div class="family-card-message"><p class="english">To ${r?E(r.name):'…'},</p>${objectLine('u55-thanks','Thank you for your love and care.','谢谢你的爱与关怀。')}${objectLine('u55-love','I love you.','我爱你。')}<p class="english">From …</p><small>在纸上写自己的署名</small></div></section>`;
}
function familyCardCheck(key,label,done){return `<button class="secondary" data-family-card-check="${key}" aria-pressed="${state.familyCard[key]}" ${state.familyCard.recipient?'':'disabled'}>${state.familyCard[key]?done:label}</button>`;}
function familyCardActivity(){
 if(state.scene===0)return `<section class="startup-extra"><h3>第62页 · 看卡片，找收件人</h3><p>课本的卡片写着 <b class="english">To Grandma</b>。和上面的两张照片对照，勾出收到卡的人。To 后面是收件人；From 后面是送卡的人。</p><p>卡片里的奶奶可以是奶奶或外婆，和自己家里的称呼对应就好。</p></section>`;
 if(state.scene===1)return `<section class="startup-extra"><h3>第62—63页 · 做自己的贺卡</h3><p>先选一位想感谢的家人。可以用下面的练习卡听祝福，再在纸上画写。不需要上传家人照片或填写真实姓名。</p><label class="family-card-select">这张卡想送给谁？<select data-family-card-recipient aria-label="选择贺卡收件人"><option value="">先选一位家人</option>${FAMILY_CARD_RECIPIENTS.map(r=>`<option value="${r.id}" ${state.familyCard.recipient===r.id?'selected':''}>${E(r.label)} · ${r.name}</option>`).join('')}</select></label><p role="status" data-family-card-status>选择会保存在当前浏览器。</p>${familyCardPreview()}<ol><li>画一位家人；画得像不像都没有关系。</li><li>在 To 后写家人称呼，照着祝福语写或描。</li><li>在 From 后写自己的署名，把卡片送给家人。</li></ol><p>这里 care 是关爱，your 是“你的”；先听懂整句，再跟读。</p>${familyCardCheck('drawn','我画写好纸上贺卡了','纸上贺卡已画写好 ✓')}</section>`;
 const r=FAMILY_CARD_RECIPIENTS.find(r=>r.id===state.familyCard.recipient);
 return `<section class="startup-extra"><h3>第63页 · 向伙伴介绍贺卡</h3><p>教材示例介绍妈妈，说 <b class="english">This is my mum. This is for her.</b> 说“她”时用 her；如果还不熟，也可以直接再说家人称呼。</p>${r?`<h4>你选的是${E(r.label)}</h4>${objectLine('u55-'+r.id,'This is my '+r.id+'.','这是我的'+r.label+'。')}${objectLine('u55-for-'+(r.id==='mum'?'her':r.id),r.id==='mum'?'This is for her.':'This is for my '+r.id+'.','这是送给'+r.label+'的。')}`:'<p>还没选收件人？回上一个小活动选一位，也可以先跟上面的妈妈示范练习。</p>'}<ol><li>举起纸上贺卡，指一指你画的家人。</li><li>说说画的是谁、卡片送给谁。</li><li>试着把感谢和“我爱你”也说出来。</li></ol>${familyCardCheck('shared','我介绍过自己的贺卡了','已经开口介绍 ✓')}<p class="plain-note">这是自己记录练习过程，不是自动发音评分。</p></section>`;
}
function renderFamilyCardScene(body){
 const s=SCENES[state.scene],next=state.scene<SCENES.length-1;
 body.innerHTML=`<div class="scene-tabs">${SCENES.map((s,i)=>`<button data-scene="${i}" class="${state.scene===i?'active':''}" aria-pressed="${state.scene===i}">${i+1} · ${E(s.name)}</button>`).join('')}</div><section class="scene-panel"><figure>${picture(s.id,'',s.alt)}<figcaption>本站原创贺卡活动示意</figcaption></figure><div class="scene-copy"><span class="eyebrow">UNIT 5 · HIT IT BIG</span><h2>${E(s.name)}</h2><p>${E(s.summary)}</p>${s.lines.map(line=>objectLine(...line)).join('')}<button class="secondary" data-speed>慢速 ${state.speed===.8?'开':'关'}</button></div></section>${familyCardActivity()}<div class="lesson-bottom"><p>选家人、画写、开口介绍，可以分开完成。</p><button class="primary gold" ${next?'data-scene="'+(state.scene+1)+'"':'data-stage="1"'}>${next?'下一小步':'去单词图鉴'} →</button></div>`;
}
function renderFamilyCardAtlas(body,standalone=false){
 const active=Math.min(state.atlasGroup||0,1),g=COURSE.wordGroups[active];
 body.innerHTML=(standalone?pageHead('单词图鉴','把感谢读清楚','先慢慢拼，再把词放进贺卡里的句子。'):'')+`<div class="scene-tabs">${COURSE.wordGroups.map((g,i)=>`<button data-word-group="${i}" class="${active===i?'active':''}">${E(g.title)}</button>`).join('')}</div><h2>${E(g.title)}</h2>${wordCards(WORDS.filter(w=>g.words.includes(w.id)))}<details class="startup-extra"><summary>复习家人和画写用词</summary>${wordCards(FAMILY_CARD_REVIEW.filter(w=>!['love','thank'].includes(w.id)))}</details><div class="lesson-bottom">${active===0?'<button class="primary gold" data-word-group="1">下一小组 →</button>':'<a class="primary gold" href="#practice">去趣味闯关 →</a>'}</div>`;
}
document.addEventListener('change',event=>{
 if(!COURSE.familyCard||!event.target.matches('[data-family-card-recipient]'))return;
 state.familyCard=FamilyCardModel.plan(state.familyCard,event.target.value);save();renderFamilyCardScene(document.querySelector('#lesson-body'));
 document.querySelector('[data-family-card-status]').textContent='已保存这位收件人。可以在纸上继续做贺卡。';
});
document.addEventListener('click',event=>{
 const b=event.target.closest('[data-family-card-check]');if(!b||!COURSE.familyCard)return;
 state.familyCard=FamilyCardModel.mark(state.familyCard,b.dataset.familyCardCheck);save();renderFamilyCardScene(document.querySelector('#lesson-body'));
 document.querySelector('[data-family-card-check="'+b.dataset.familyCardCheck+'"]')?.focus({preventScroll:true});
});
