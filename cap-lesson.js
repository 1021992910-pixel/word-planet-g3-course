 'use strict';
const CapPhotoExercise={answers:{grandpa:'grandpa',dad:'dad',mum:'mum',grandma:'grandma',sister:'sister',lucky:'Lucky'},check(values){const keys=Object.keys(this.answers);return {complete:keys.every(k=>values[k]),right:keys.filter(k=>values[k]===this.answers[k]).length};}};
function capBookActivity(){
 if(state.scene===0)return `<section class="startup-extra"><h3>第58页 · 读故事，数人数</h3><p>回课本第1—6格找佳佳、妹妹、爸爸、妈妈、爷爷、奶奶。people 数的是人，不把小狗 Lucky 算进去。原故事音频在外研U学听。</p>${objectLine('u53-how-many','How many people are in the story?','故事里有多少个人？')}<div class="actions">${[4,6,7].map(n=>`<button class="secondary" data-cap-count="${n}">${n} 个人</button>`).join('')}</div><p role="status" data-cap-count-result></p><details><summary>数完再听参考</summary>${objectLine('u53-people','There are six people.','有六个人。')}</details></section>`;
 if(state.scene===1)return `<section class="startup-extra"><h3>按顺序读完六格</h3><p>先介绍家人，再看帽子被 Lucky 叼走。家人一起追上去帮忙，最后又聚在一起。本站插画只画“帽子找回”这一刻；完整六格仍看自己的课本。</p><details><summary>想一想，听一个呼唤</summary>${objectLine('u53-come-on','Come on, Dad!','爸爸，快来！')}<p>come on 在这里用来催促、招呼大家，也可以表示加油。不要把整句话按 on 单独的意思硬翻。</p></details><h3>第59页 · 小组复述</h3><p>一人当佳佳，伙伴们分饰家人。按“介绍家人→帽子出状况→一起帮忙→再次合影”讲一遍；也可以一人指图，一人说。小狗这个角色可以用玩偶代替。</p></section>`;
 const items=[['grandpa','爷爷','He is my'],['dad','爸爸','He is my'],['mum','妈妈','She is my'],['grandma','奶奶','She is my'],['sister','妹妹','She is my'],['lucky','小狗 Lucky','This is']];
 return `<section class="startup-extra"><h3>第59页 · 看图，选称呼，再描写</h3><p>对照课本全家福，把六个称呼补全，再在自己的课本四线格里描写。本站先提供词库，选词练一句，不用整句默写。</p><div class="balloon-patterns">${items.map(([id,zh,start])=>`<article><h4>${zh}</h4><p>${start} <label><select data-cap-label="${id}" aria-label="${zh}的称呼"><option value="">选一个称呼</option>${['mum','grandpa','Lucky','sister','dad','grandma'].map(x=>`<option value="${x}">${x}</option>`).join('')}</select></label>.</p></article>`).join('')}</div><button class="primary gold" data-cap-check>检查六个称呼</button><p role="status" data-cap-photo-result></p><details><summary>选完听完整句</summary>${['grandpa','dad','mum','grandma','sister'].map(id=>{const w=CAP_REVIEW.find(w=>w.id===id);return objectLine(w.exampleAudio,w.example,w.translation)}).join('')}${objectLine('u53-lucky','This is Lucky.','这是 Lucky。')}</details><p>最后指一指佳佳，说“这是我”，再读一句爱家人的话。</p>${objectLine('u53-me','This is me.','这是我。')}${objectLine('u53-love','I love my family.','我爱我的家人。')}</section>`;
}
function renderCapScene(body){
 const s=SCENES[state.scene],next=state.scene<SCENES.length-1;
 body.innerHTML=`<div class="scene-tabs">${SCENES.map((s,i)=>`<button data-scene="${i}" class="${state.scene===i?'active':''}" aria-pressed="${state.scene===i}">${i+1} · ${E(s.name)}</button>`).join('')}</div><section class="scene-panel"><figure>${picture(s.id,'',s.alt)}<figcaption>原创巩固情境，非课本原图</figcaption></figure><div class="scene-copy"><span class="eyebrow">UNIT 5 · SPEED UP</span><h2>${E(s.name)}</h2><p>${E(s.summary)}</p>${s.lines.map(line=>objectLine(...line)).join('')}<button class="secondary" data-speed>慢速 ${state.speed===.8?'开':'关'}</button></div></section>${capBookActivity()}<div class="lesson-bottom"><p>每次听一小段，读完可以休息。</p><button class="primary gold" ${next?'data-scene="'+(state.scene+1)+'"':'data-stage="1"'}>${next?'下一小步':'去单词图鉴'} →</button></div>`;
}
function renderCapAtlas(body,standalone=false){
 const active=Math.min(state.atlasGroup||0,2),g=COURSE.wordGroups[active];
 body.innerHTML=(standalone?pageHead('单词图鉴','家人一起帮忙','七个新词分三组，先拆音，再慢慢拼起来。'):'')+`<div class="scene-tabs">${COURSE.wordGroups.map((g,i)=>`<button data-word-group="${i}" class="${active===i?'active':''}">${E(g.title)}</button>`).join('')}</div><h2>${E(g.title)}</h2>${wordCards(CAP_NEW.filter(w=>g.words.includes(w.id)))}<details class="startup-extra"><summary>故事里的呼唤：come on</summary><p>两个词先分别听，再接起来；这里表示快来或加油。</p>${wordCards(CAP_NEW.filter(w=>w.id==='come-on'))}</details><details class="startup-extra"><summary>复习家人称呼和介绍用词</summary>${wordCards(CAP_REVIEW)}</details><div class="lesson-bottom">${active<2?`<button class="primary gold" data-word-group="${active+1}">下一小组 →</button>`:'<a class="primary gold" href="#practice">去趣味闯关 →</a>'}</div>`;
}
document.addEventListener('click',event=>{
 const count=event.target.closest('[data-cap-count]');
 if(count){document.querySelector('[data-cap-count-result]').textContent=count.dataset.capCount==='6'?'数对了，六个人！Lucky 是小狗，不计入人数。':'再回故事里找一找，别漏掉家人，也不要把小狗算进去。';return;}
 if(!event.target.closest('[data-cap-check]'))return;
 const fields=[...document.querySelectorAll('[data-cap-label]')],values=Object.fromEntries(fields.map(x=>[x.dataset.capLabel,x.value]));
 const {complete,right}=CapPhotoExercise.check(values);
 for(const f of fields)f.setAttribute('aria-invalid',String(complete&&f.value!==CapPhotoExercise.answers[f.dataset.capLabel]));
 document.querySelector('[data-cap-photo-result]').textContent=!complete?'先给六句话都选一个称呼。':right===6?'六个称呼都配对了！再听一遍，把句子读出来。':'已经配对 '+right+' 个称呼。对照照片，再改一改。';
});
