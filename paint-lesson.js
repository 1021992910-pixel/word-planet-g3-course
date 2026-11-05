'use strict';
function paintLettersPractice(){
 return `<section class="startup-extra">
 <h3>第36页 · Hh—Nn，听名字、认大小写</h3>
 <div class="alphabet-pairs">${PAINT_LETTERS.map(letter=>`<button class="alphabet-pair" data-audio="${letter.id}" aria-label="听字母 ${letter.upper} 的名称"><b>${letter.upper}${letter.lower}</b><span>听字母名</span>${speaker}</button>`).join('')}</div>
 <p>听一个，指一个。再回自己的课本看笔顺箭头，在四线三格里写。</p>
 <h3>字母名和词里的声音，比较听</h3>
 <p>Ii 的名字是 /aɪ/。在 picture 里，i 发短音 /ɪ/。点三个按钮，分别听一听。</p>
 <div class="actions"><button class="secondary" data-audio="letter-i">听 Ii 的名字</button>
 <button class="secondary" data-audio="clear-ih">听词里的短音 /ɪ/</button>
 <button class="secondary" data-audio="picture">听 picture</button></div></section>`;
}
function paintListeningPractice(){
 return `<section class="startup-extra">
 <h3>第37页 · 听音排序</h3>
 <p>先看课本里的熊猫、花束、寿桃蛋糕和灯笼，用外研U学完成原题。</p>
 <h3>再试四段补充听力</h3>
 <p>下面是本站的画作介绍。先听一段，指一指对应的课本图片。想练完整排序，可以去趣味闯关第5站。</p>
 <div class="paint-listening">${PAINT_PICTURES.map((item,i)=>`<article>
 <button class="secondary" data-audio="${item.audio}">▶ 听第 ${i+1} 段</button>
 <details><summary>选完看线索</summary><p>${E(item.label)} · ${E(item.colours)}</p></details>
 </article>`).join('')}</div>
 <button class="secondary" data-audio="u34-order">▶ 连续听四幅画，试着排序</button>
 <details><summary>排完看参考</summary><p>灯笼画 → 熊猫画 → 寿桃蛋糕画 → 花束画。</p></details>
 </section>`;
}
function paintDrawingPractice(){
 return `<section class="startup-extra">
 <h3>第37页 · 画一画，和伙伴分享</h3>
 <ol><li>拿纸和画笔，选一个你想为国庆节画的内容。</li>
 <li>选两三种颜色画下来。可以画花、灯笼或你喜欢的事物。</li>
 <li>举起画，先说一句介绍，再说自己用到的颜色。</li></ol>
 ${objectLine(...PAINT_LINES.picture)}
 ${objectLine(...PAINT_LINES.red)}
 ${objectLine(...PAINT_LINES.green)}
 <p>可以把 red 或 green 换成自己画里的颜色。</p></section>`;
}
function renderPaintScene(body){
 const scene=SCENES[state.scene],next=state.scene<SCENES.length-1;
 const tabs=SCENES.map((item,i)=>`<button data-scene="${i}" class="${i===state.scene?'active':''}" aria-pressed="${i===state.scene}">${i+1} · ${E(item.name)}</button>`).join('');
 body.innerHTML=`<div class="scene-tabs">${tabs}</div>
 <section class="scene-panel poster-scene"><figure>${picture(scene.id,'',scene.alt)}<figcaption>原创情境示意</figcaption></figure>
 <div class="scene-copy"><span class="eyebrow">UNIT 3 · FUEL UP</span>
 <h2>${E(scene.name)}</h2><p>${E(scene.summary)}</p>
 ${scene.lines.map(line=>objectLine(...line)).join('')}
 <button class="secondary" data-speed>慢速 ${state.speed===.8?'开':'关'}</button></div></section>
 ${state.scene===0?'<section class="startup-extra"><h3>第36页 · 听韵律歌，找蓝色字母</h3><p>打开外研U学听本课韵律歌。边听边在自己的课本上指蓝色字母，再跟着节奏说。本站句子用来练开口。</p></section>':state.scene===1?paintLettersPractice():paintListeningPractice()+paintDrawingPractice()}
 <div class="lesson-bottom"><p>学完一小段可以休息，下次接着学。</p>
 <button class="primary gold" ${next?'data-scene="'+(state.scene+1)+'"':'data-stage="1"'}>${next?'下一个小活动':'去单词图鉴'} →</button></div>`;
}
function renderPaintAtlas(body,standalone=false){
 body.innerHTML=(standalone?pageHead('单词图鉴','画画时用到的三个词','先听慢拼读，再用一句话介绍画作。'):'')+
 `<div class="section-title"><h2>先听三个词，慢慢拼出来</h2></div>
 ${wordCards(PAINT_NEW_WORDS.filter(word=>word.id!=='national-day'))}
 <div class="section-title"><h2>放在画作里听懂节日</h2></div>
 ${wordCards(PAINT_NEW_WORDS.filter(word=>word.id==='national-day'))}
 <details class="startup-extra"><summary>复习颜色和熟悉的词</summary>${wordCards(PAINT_REVIEW)}</details>
 <div class="lesson-bottom"><p>词句听清楚了，去画画工坊练一练。</p><a class="primary gold" href="#practice">去趣味闯关 →</a></div>`;
}
