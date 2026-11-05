'use strict';
function renderLostScene(body){
 const scene = SCENES[state.scene];
 const tabs = SCENES.map((s,i)=>`<button data-scene="${i}" class="${i===state.scene?'active':''}">${i+1} · ${E(s.name)}</button>`).join('');
 const next = state.scene < SCENES.length-1;
 body.innerHTML = `<div class="scene-tabs">${tabs}</div>
 <section class="scene-panel poster-scene"><figure>${picture(scene.id,'',scene.alt)}<figcaption>原创海底情境示意</figcaption></figure>
 <div class="scene-copy"><span class="eyebrow">SPEED UP · ${state.scene+1} / ${SCENES.length}</span>
 <h2>${E(scene.name)}</h2><p>${E(scene.summary)}</p>
 ${scene.lines.map(line=>objectLine(...line)).join('')}
 <button class="secondary" data-speed>慢速 ${state.speed===.8?'开':'关'}</button></div></section>
 <details class="startup-extra"><summary>第23页 · 读一读，写一写，再演一演</summary>
 <p>用课本第23页的三张用品图做提示。先在句子桥里找对三个词，再在纸上独立写一遍。</p>
 <p>和伙伴分角色：老师拿起一件用品，用 <b>Is this your …?</b> 问。来认领的人用 <b>Yes, it is.</b> 或 <b>No, it isn’t.</b> 回答，认领后记得道谢。然后交换角色。</p>
 ${objectLine('u23-care','Take care of your school things!','演完别忘了把自己的学习用品收好。')}
 </details><div class="lesson-bottom"><p>这一段听完可以休息，下次接着学。</p>
 <button class="primary gold" ${next?'data-scene="'+(state.scene+1)+'"':'data-stage="1"'}>${next?'下一个小情境':'去单词图鉴'} →</button></div>`;
}
function renderLostAtlas(body,standalone=false){
 const cards=ids=>wordCards(WORDS.filter(w=>ids.includes(w.id)));
 body.innerHTML = (standalone?pageHead('单词图鉴','失物招领里的新词','三个词慢拼，两个短语放进句子听。'):'')+
 `<div class="section-title"><h2>三个词，听老师带我拼</h2><span>find · bye · kid</span></div>
 ${cards(COURSE.wordGroups[0].words)}
 <div class="section-title"><h2>两个短语，放进句子听</h2></div>${cards(COURSE.contextWords)}
 <details class="startup-extra"><summary>复习三件学习用品</summary>${cards(COURSE.reviewWords)}</details>
 <div class="lesson-bottom"><p>听懂词和短语，再去招领站试一试。</p><a class="primary gold" href="#practice">去趣味闯关 →</a></div>`;
}
