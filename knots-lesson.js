'use strict';
function knotPicture(count,cls='',alt=''){
 const columns=count===4?2:count;
 return `<div class="number-picture knot-picture ${E(cls)}" role="img" aria-label="${E(alt||count+'个分开放置的中国结')}" style="--bird-cols:${columns}">${Array.from({length:count},()=>'<img src="./assets/scenes/u4-knot-count.webp" alt="" width="200" height="300" loading="lazy">').join('')}</div>`;
}
function knotBookActivity(){
 if(state.scene===0)return `<section class="startup-extra"><h3>第44页 · 读一读，找答案</h3>
 <p>翻到故事第1格和第5格。听原故事可以打开外研优学。</p>
 <details><summary>读完看参考</summary><p>拿着中国结的男孩会编，他在最后一格做给伙伴们看。</p></details></section>`;
 if(state.scene===1)return `<section class="startup-extra"><h3>第44页 · 再读一次，选数量</h3>
 <p>伙伴猜了6和12。到第4格找依据，在课本上从1、6、12中勾一个。</p>
 <details><summary>选完听参考</summary>${objectLine(...KNOT_ONE)}</details>
 <h3>第45页 · 听一问，再听一答</h3>${objectLine(...KNOT_ROPES)}
 <p>问几根绳用 ropes。回答一根时说 one rope，两根时说 two ropes。</p>
 ${objectLine('u42-two-ropes','Two ropes.','两根绳。')}</section>`;
 return `<section class="startup-extra"><h3>第45页 · 数中国结</h3>
 <p>这是本站重画的三张数量卡，按课本顺序摆放。数完一张再听参考。</p>
 <div class="balloon-patterns">${KNOT_COUNTS.map(([count,id,en,zh],i)=>`<article>
 <h4>第 ${i+1} 张卡</h4>${knotPicture(count,'','请数一数这张卡上的中国结')}
 <details><summary>数完听参考</summary>${objectLine(id,en,zh)}</details></article>`).join('')}</div>
 <h3>第45页 · 和伙伴数文具</h3><p>在桌上放几支铅笔和几块橡皮。一个人提问，一个人数完后用英语回答，然后交换。</p>
 <div class="balloon-patterns"><article>${objectLine('u42-pencils','How many pencils?','有几支铅笔？')}
 <details><summary>听一个回答示范</summary>${objectLine('u42-three-pencils','Three pencils.','三支铅笔。')}</details></article>
 <article>${objectLine('u42-erasers','How many erasers?','有几块橡皮？')}
 <details><summary>听一个回答示范</summary>${objectLine('u42-one-eraser','One eraser.','一块橡皮。')}</details></article></div>
 </section>`;
}
function renderKnotScene(body){
 const scene=SCENES[state.scene],next=state.scene<SCENES.length-1;
 const tabs=SCENES.map((item,i)=>`<button data-scene="${i}" class="${i===state.scene?'active':''}" aria-pressed="${i===state.scene}">${i+1} · ${E(item.name)}</button>`).join('');
 body.innerHTML=`<div class="scene-tabs">${tabs}</div>
 <section class="scene-panel poster-scene"><figure>${picture(scene.id,'',scene.alt)}<figcaption>原创情境示意</figcaption></figure>
 <div class="scene-copy"><span class="eyebrow">UNIT 4 · START UP</span>
 <h2>${E(scene.name)}</h2><p>${E(scene.summary)}</p>
 ${scene.lines.map(line=>objectLine(...line)).join('')}
 <button class="secondary" data-speed>慢速 ${state.speed===.8?'开':'关'}</button></div></section>
 ${knotBookActivity()}<div class="lesson-bottom"><p>一小段听清楚了，再往下走。</p>
 <button class="primary gold" ${next?'data-scene="'+(state.scene+1)+'"':'data-stage="1"'}>${next?'下一小步':'去单词图鉴'} →</button></div>`;
}
function renderKnotAtlas(body,standalone=false){
 const active=state.atlasGroup||0, group=COURSE.wordGroups[active];
 const tabs=COURSE.wordGroups.map((item,i)=>`<button data-word-group="${i}" class="${i===active?'active':''}" aria-pressed="${i===active}">${E(item.title)}</button>`).join('');
 body.innerHTML=(standalone?pageHead('单词图鉴','在中国结工坊学新词','八个词和短语分两组，可以分次听和练。'):'')+
 `<div class="scene-tabs">${tabs}</div>
 <div class="section-title"><h2>${E(group.title)}</h2><span>${group.words.length} 张词卡</span></div>
 ${wordCards(KNOT_NEW.filter(word=>group.words.includes(word.id)))}
 <details class="startup-extra"><summary>复习数数和问文具的词</summary>${wordCards(KNOT_REVIEW)}</details>
 <div class="lesson-bottom"><p>点开词卡，先听，再跟着老师读。</p>
 ${active===0?'<button class="primary gold" data-word-group="1">下一小组 →</button>':'<a class="primary gold" href="#practice">去趣味闯关 →</a>'}</div>`;
}
