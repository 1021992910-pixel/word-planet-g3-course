'use strict';
function colourSwatch(word){
 return word.swatch? `<span class="colour-swatch" aria-hidden="true" style="--lesson-colour:${E(word.swatch)}"></span>`:'';
}
function colourListeningButtons(words){
 return `<div class="colour-listening">${words.map(word=>`<button class="secondary" data-audio="${word.id}">
 ${colourSwatch(word)}<span><strong>${E(word.word)}</strong><small>${E(word.meaning)}</small></span>
 <span aria-hidden="true">▶</span></button>`).join('')}</div>`;
}
function colourBookActivity(){
 return `<section class="startup-extra">
 <h3>打开课本，听歌找颜色</h3>
 <p>第30页的颜色歌，可以在外研优学听原音。第一遍听，第二遍听到一种颜色就指一把伞。</p>
 <p>再看第30—31页的大图。先自己找找花和叶子的颜色，再点下面的按钮听名称。指着一样东西，试着把示范句里的 green 换成你找到的颜色。</p>
 ${colourListeningButtons(COLOUR_NAMES)}
 </section>`;
}
function renderColoursScene(body){
 const scene=SCENES[state.scene], next=state.scene<SCENES.length-1;
 const tabs=SCENES.map((item,i)=>`<button data-scene="${i}" class="${i===state.scene?'active':''}" aria-pressed="${i===state.scene}">${i+1} · ${E(item.name)}</button>`).join('');
 body.innerHTML=`<div class="scene-tabs">${tabs}</div>
 <section class="scene-panel poster-scene"><figure>${picture(scene.id,'',scene.alt)}<figcaption>原创情境示意</figcaption></figure>
 <div class="scene-copy"><span class="eyebrow">UNIT 3 · GET READY</span>
 <h2>${E(scene.name)}</h2><p>${E(scene.summary)}</p><p class="muted">下面是本站的口语示范。</p>
 ${scene.lines.map(line=>objectLine(...line)).join('')}
 ${colourListeningButtons(scene.colours)}
 <button class="secondary" data-speed>慢速 ${state.speed===.8?'开':'关'}</button></div></section>
 ${next?'':colourBookActivity()}
 <div class="lesson-bottom"><p>学完一小段可以休息，下次接着学。</p>
 <button class="primary gold" ${next?'data-scene="'+(state.scene+1)+'"':'data-stage="1"'}>${next?'下一个小活动':'去单词图鉴'} →</button></div>`;
}
function renderColoursAtlas(body,standalone=false){
 const cards=ids=>wordCards(WORDS.filter(word=>ids.includes(word.id)));
 const active=state.atlasGroup||0;
 const group=COURSE.wordGroups[active];
 const tabs=COURSE.wordGroups.map((item,i)=>`<button data-word-group="${i}" class="${i===active?'active':''}" aria-pressed="${i===active}">${E(item.title)}</button>`).join('');
 body.innerHTML=(standalone?pageHead('单词图鉴','认识七种颜色','先听四把伞，再听三件衣服。两组可以分开学。'):'')+
 `<div class="scene-tabs">${tabs}</div>
 <div class="section-title"><h2>${E(group.title)}</h2><span>${group.words.length} 个拼读词</span></div>${cards(group.words)}
 <details class="startup-extra"><summary>在歌和图里听到的六个词</summary>
 <p class="muted">听懂这些词，再放进一句话跟读。</p>${cards(COURSE.contextWords)}</details>
 <div class="lesson-bottom"><p>这一组听清楚了，再接着学。</p>
 ${active===0?'<button class="primary gold" data-word-group="1">下一小组 →</button>':'<a class="primary gold" href="#practice">去趣味闯关 →</a>'}</div>`;
}
