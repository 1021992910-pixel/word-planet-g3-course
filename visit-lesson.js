 'use strict';
function visitBookActivity(){
 if(state.scene===0)return `<section class="startup-extra"><h3>第56页 · 读故事，找奶奶</h3><p>打开自己的课本，读第1—5格，指一指大明的奶奶。原故事录音可以在外研U学听。</p><details><summary>找到后看参考</summary><p>大明的奶奶是后来走到孩子身边、端着饮料的那一位；远处戴眼镜、端着点心的是另一位奶奶。本站合影为原创示意，不当作原图答案。</p></details><h3>再读一次，判断三句话</h3><p>在课本的三幅头像旁打勾或画叉。判断时留意：是谁在介绍自己的家人？</p><details><summary>做完看参考</summary><p>第1题 ✓，第2题 ✓，第3题 ×。第3题的头像是另一位奶奶，不是大明的奶奶。</p></details></section>`;
 if(state.scene===1)return `<section class="startup-extra"><h3>第57页 · 先问，再介绍</h3><p>this 指身边较近的人，that 可以指远一些的人；都要结合实际指向。who 是在问“谁”。but 表示话里有个转折。</p>${objectLine('u52-question','Who is that?','那是谁？')}${objectLine('u52-that-grandma','That is my grandma.','那是我的奶奶。')}<p>翻到课本 In focus，对比奶奶在远处和走近后的介绍。</p></section>`;
 return `<section class="startup-extra"><h3>第57页 · 听音排序</h3><p>课本原听力请配合外研U学完成。下面是本站另编的一组练习，听到哪位家人，就选他或她出现的次序。</p><button class="secondary" data-audio="u52-listen-order">▶ 听本站补充录音</button><div class="balloon-patterns">${[['grandpa','爷爷'],['brother','弟弟'],['sister','姐姐'],['dad','爸爸'],['mum','妈妈']].map(([id,zh])=>`<article><h4>${zh} · ${id}</h4><label>第几位出现？<select data-visit-rank="${id}" aria-label="${zh}出现的次序"><option value="">请选择</option>${[1,2,3,4,5].map(n=>`<option value="${n}">${n}</option>`).join('')}</select></label></article>`).join('')}</div><button class="primary gold" data-visit-check>检查这一组</button><p role="status" data-visit-result></p><h3>和伙伴问萨姆的家人</h3><p>回到课本野餐图：分别找到爷爷、弟弟、姐姐、爸爸、妈妈。一个人指图提问，一个人用萨姆的口吻介绍，再交换角色。爷爷在长椅上，弟弟坐在垫子上。</p><p>练自己的家人时也可以用本课短句，不需要上传照片。</p></section>`;
}
function renderVisitScene(body){
 const s=SCENES[state.scene],next=state.scene<SCENES.length-1;
 body.innerHTML=`<div class="scene-tabs">${SCENES.map((s,i)=>`<button data-scene="${i}" class="${state.scene===i?'active':''}" aria-pressed="${state.scene===i}">${i+1} · ${E(s.name)}</button>`).join('')}</div><section class="scene-panel"><figure>${picture(s.id,'',s.alt)}<figcaption>原创巩固情境</figcaption></figure><div class="scene-copy"><span class="eyebrow">UNIT 5 · START UP</span><h2>${E(s.name)}</h2><p>${E(s.summary)}</p>${s.lines.map(line=>objectLine(...line)).join('')}<button class="secondary" data-speed>慢速 ${state.speed===.8?'开':'关'}</button></div></section>${visitBookActivity()}<div class="lesson-bottom"><p>听一小段，练一小步。</p><button class="primary gold" ${next?'data-scene="'+(state.scene+1)+'"':'data-stage="1"'}>${next?'下一小步':'去单词图鉴'} →</button></div>`;
}
function renderVisitAtlas(body,standalone=false){
 const active=Math.min(state.atlasGroup||0,1),g=COURSE.wordGroups[active];
 body.innerHTML=(standalone?pageHead('单词图鉴','把家人介绍给朋友','先学一个新词，再复习提问和家人的称呼。'):'')+`<div class="scene-tabs">${COURSE.wordGroups.map((g,i)=>`<button data-word-group="${i}" class="${active===i?'active':''}">${E(g.title)}</button>`).join('')}</div><h2>${E(g.title)}</h2>${wordCards(VISIT_WORDS.filter(w=>g.words.includes(w.id)))}<details class="startup-extra"><summary>萨姆一家还用到这些称呼</summary>${wordCards(VISIT_WORDS.filter(w=>COURSE.contextWords.includes(w.id)))}</details><div class="lesson-bottom">${active===0?'<button class="primary gold" data-word-group="1">下一小组 →</button>':'<a class="primary gold" href="#practice">去趣味闯关 →</a>'}</div>`;
}
const VisitListening={expected:{grandpa:'2',brother:'5',sister:'3',dad:'4',mum:'1'},check(values){const ids=Object.keys(this.expected);return {complete:ids.every(id=>values[id]),right:ids.filter(id=>values[id]===this.expected[id]).length};}};
document.addEventListener('click',event=>{
 if(!event.target.closest('[data-visit-check]'))return;
 const expected=VisitListening.expected;
 const fields=[...document.querySelectorAll('[data-visit-rank]')];
 const {complete,right}=VisitListening.check(Object.fromEntries(fields.map(x=>[x.dataset.visitRank,x.value])));
 for(const x of fields)x.setAttribute('aria-invalid',String(complete&&x.value!==expected[x.dataset.visitRank]));
 document.querySelector('[data-visit-result]').textContent=!complete?'先给每位家人选一个次序。':right===5?'五位家人的次序都排对了！':'已经排对 '+right+' 位。再听一次，改一改其他次序。';
});
