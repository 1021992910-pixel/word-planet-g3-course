'use strict';
function designProgress(key,label,doneLabel,item){
 return item?`<button type="button" class="secondary" data-design-check="${key}" aria-pressed="${state.design[key]}">${state.design[key]?doneLabel:label}</button>`:
  '<p class="muted">想保存完成记录，可以先到第2步选一种用品。</p>';
}
function designActivity(){
 const item=DESIGN_ITEMS.find(option=>option.id===state.design.item);
 if(state.scene===0)return `<details class="startup-extra"><summary>猜完了，打开听问答</summary>
 ${objectLine('u25-is-eraser','Is it an eraser?','它是一块橡皮吗？')}
 ${objectLine('u22-yes','Yes, it is.','是的，它是。')}</details>`;
 if(state.scene===1)return `<section class="startup-extra"><h3>我的文具设计卡</h3>
 <p>跟伙伴定下来：设计什么？想给它加一个什么特点？写中文也可以。</p>
 <form id="design-plan" class="design-plan">
 <label>我想设计<select name="designItem" required><option value="">请选择一种用品</option>
 ${DESIGN_ITEMS.map(option=>`<option value="${option.id}" ${item?.id===option.id?'selected':''}>${E(option.label)} · ${E(option.noun)}</option>`).join('')}</select></label>
 <label>我的点子（选填）<input name="designIdea" maxlength="60" value="${E(state.design.idea)}" placeholder="例如：星形橡皮，侧边留一个好捏的地方"></label>
 <div class="actions"><button class="primary" type="submit">保存设计卡</button></div>
 </form><p role="status" class="muted" data-design-status>${item?'已保存。你可以去第3步画设计图。':'设计卡保存在当前浏览器。'}</p></section>`;
 if(state.scene===2)return `<section class="startup-extra"><h3>在纸上画一画</h3>
 ${item?`<p>我想设计 <b>${E(item.label)}</b>（${E(item.noun)}）。${state.design.idea?`点子：${E(state.design.idea)}`:'先决定一个好用的细节。'}</p>`:''}
 <ol><li>画出用品的整体形状。</li><li>把你改的地方画清楚。</li><li>先把英文名写在背面，留给伙伴猜。</li></ol>
 ${designProgress('drawn','我画好设计图了','设计图已画好 ✓',item)}</section>`;
 const example=item||DESIGN_ITEMS[0];
 return `<section class="startup-extra"><h3>${item?'拿着你的图练习':'先用橡皮设计试一遍'}</h3>
 <p>先出示图，伙伴来问。猜对说 <b>Yes, it is.</b>，猜错说 <b>No, it isn’t.</b>。最后再揭晓用品名。</p>
 ${objectLine(example.questionAudio,'Is it '+example.noun+'?','它是你选的用品吗？')}
 ${objectLine(example.answerAudio,"It's "+example.noun+'.','揭晓：这是你设计的用品。')}
 <p class="muted">听到元音开头的 eraser，要用 an eraser。其余示范里的用品用 a。</p>
 ${designProgress('shared','我开口展示过了','已经开口展示 ✓',item)}</section>`;
}
function renderDesignScene(body){
 const scene=SCENES[state.scene];
 const tabs=SCENES.map((entry,i)=>`<button type="button" data-scene="${i}" class="${i===state.scene?'active':''}" aria-pressed="${i===state.scene}">${i+1} · ${E(entry.name)}</button>`).join('');
 const next=state.scene<SCENES.length-1;
 body.innerHTML=`<div class="scene-tabs">${tabs}</div>
 <section class="scene-panel poster-scene"><figure>${picture(scene.id,'',scene.alt)}<figcaption>原创活动示意</figcaption></figure>
 <div class="scene-copy"><span class="eyebrow">HIT IT BIG · ${state.scene+1} / ${SCENES.length}</span>
 <h2>${E(scene.name)}</h2><p>${E(scene.summary)}</p>${scene.lines.map(line=>objectLine(...line)).join('')}
 <button class="secondary" data-speed>慢速 ${state.speed===.8?'开':'关'}</button></div></section>
 ${designActivity()}<div class="lesson-bottom"><p>四小步可以分开完成。</p>
 <button class="primary gold" ${next?'data-scene="'+(state.scene+1)+'"':'data-stage="1"'}>${next?'下一步':'复习本课用到的词'} →</button></div>`;
}
function renderDesignAtlas(body,standalone=false){
 const supplies=WORDS.filter(word=>DESIGN_ITEMS.some(item=>item.id===word.id));
 const otherWords=WORDS.filter(word=>!supplies.includes(word));
 body.innerHTML=(standalone?pageHead('单词图鉴','设计展里要用的旧词','把学过的用品词和猜物问句带进自己的设计。'):'')+
 `<div class="section-title"><h2>给设计图配一个用品名</h2><span>5 个复习词</span></div>${wordCards(supplies)}
 <details class="startup-extra"><summary>再听两张活动词卡</summary>${wordCards(otherWords)}</details>
 <div class="lesson-bottom"><p>听清用品名，再去练习问答。</p><a class="primary gold" href="#practice">去趣味闯关 →</a></div>`;
}
document.addEventListener('submit',event=>{
 const form=event.target;
 if(!COURSE.design||form.id!=='design-plan')return;
 event.preventDefault();
 const next=DesignModel.plan(state.design,form.elements.designItem.value,form.elements.designIdea.value);
 if(!next.item)return;
 state.design=next;
 save();
 const status=document.querySelector('[data-design-status]');
 if(status)status.textContent='已保存。你可以去第3步画设计图。';
});
document.addEventListener('click',event=>{
 const button=event.target.closest('[data-design-check]');
 if(!COURSE.design||!button||!state.design.item)return;
 const key=button.dataset.designCheck;
 if(!['drawn','shared'].includes(key))return;
 state.design[key]=!state.design[key];
 state.design.updated=Date.now();
 save();
 button.setAttribute('aria-pressed',String(state.design[key]));
 button.textContent=key==='drawn'?(state.design.drawn?'设计图已画好 ✓':'我画好设计图了'):(state.design.shared?'已经开口展示 ✓':'我开口展示过了');
});
