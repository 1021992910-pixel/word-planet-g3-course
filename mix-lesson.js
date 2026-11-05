'use strict';
function mixWritePractice(){
 return `<section class="startup-extra">
 <h3>第35页 · 再读一遍，写出四种颜色</h3>
 <p>先在课本上写出故事里的混色结果，再展开听参考。自己动手调颜料时，颜色会随颜料和比例变化。</p>
 <div class="mix-grid">${MIX_RECIPES.map(({inputs,line},i)=>`<article>
 <h4>第 ${i+1} 题</h4>
 <p class="mix-equation">${inputs.map(id=>`<span>${colourSwatch(balloonColour(id))} ${E(id)}</span>`).join('<span aria-hidden="true">＋</span>')} <span>＝ ?</span></p>
 <details><summary>写完听参考</summary>${objectLine(...line)}</details></article>`).join('')}
 </div></section>`;
}
function mixActPractice(){
 return `<section class="startup-extra">
 <h3>第35页 · 选角色，一起演故事</h3>
 <p>三个人分演红、黄、蓝，另一个人当讲故事的人。手里拿色卡，说完自己的颜色，再按故事两两或三人靠拢，让讲故事的人亮出新色卡。</p>
 <ol class="mix-act">
 <li><strong>出场打招呼。</strong>三位伙伴依次说自己的颜色。示范用蓝色，另外两人换成 red 和 yellow。
 ${objectLine(...MIX_LINES.blue)}</li>
 <li><strong>问一问，猜一猜。</strong>两位伙伴走到一起。一个人问，其他人答。
 ${objectLine(...BALLOON_LINES.ask)}</li>
 <li><strong>谢幕。</strong>举起新颜色，一起说一句。
 ${objectLine(...MIX_LINES.many)}</li>
 </ol></section>`;
}
function renderMixScene(body){
 const scene=SCENES[state.scene], next=state.scene<SCENES.length-1;
 const tabs=SCENES.map((item,i)=>`<button data-scene="${i}" class="${i===state.scene?'active':''}" aria-pressed="${i===state.scene}">${i+1} · ${E(item.name)}</button>`).join('');
 body.innerHTML=`<div class="scene-tabs">${tabs}</div>
 <section class="scene-panel poster-scene"><figure>${picture(scene.id,'',scene.alt)}<figcaption>原创情境示意</figcaption></figure>
 <div class="scene-copy"><span class="eyebrow">UNIT 3 · SPEED UP</span>
 <h2>${E(scene.name)}</h2><p>${E(scene.summary)}</p>
 <p class="muted">下面是本站口语示范。原故事听力可在外研优学听。</p>
 ${scene.lines.map(line=>objectLine(...line)).join('')}
 ${next?'':colourListeningButtons(MIX_WORD_LIST.filter(word=>['orange','purple','black'].includes(word.id)))}
 <button class="secondary" data-speed>慢速 ${state.speed===.8?'开':'关'}</button></div></section>
 ${next?'':mixWritePractice()+mixActPractice()}
 <div class="lesson-bottom"><p>学完一小段可以休息，下次接着学。</p>
 <button class="primary gold" ${next?'data-scene="'+(state.scene+1)+'"':'data-stage="1"'}>${next?'下一个小情境':'去单词图鉴'} →</button></div>`;
}
function renderMixAtlas(body,standalone=false){
 const active=state.atlasGroup||0, group=COURSE.wordGroups[active];
 const tabs=COURSE.wordGroups.map((item,i)=>`<button data-word-group="${i}" class="${i===active?'active':''}" aria-pressed="${i===active}">${E(item.title)}</button>`).join('');
 body.innerHTML=(standalone?pageHead('单词图鉴','听懂颜色故事里的五个新词','短词和多音节词分两组学。'):'')+
 `<div class="scene-tabs">${tabs}</div>
 <div class="section-title"><h2>${E(group.title)}</h2><span>${group.words.length} 个拼读词</span></div>
 ${wordCards(MIX_WORDS.filter(word=>group.words.includes(word.id)))}
 <details class="startup-extra"><summary>复习故事里的六个颜色词</summary>${wordCards(MIX_REVIEW)}</details>
 <div class="lesson-bottom"><p>这一组听清楚了，再接着学。</p>
 ${active===0?'<button class="primary gold" data-word-group="1">下一小组 →</button>':'<a class="primary gold" href="#practice">去趣味闯关 →</a>'}</div>`;
}
