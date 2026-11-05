'use strict';
function bagFuelSoundPractice(){
 const examples=[['th','a','t','that'],['S','a','m','u24-sam'],['b','a','ck','back'],['','a','t','u24-at'],['schoolb','a','g','schoolbag']];
 return `<section class="startup-extra"><h3>先听单词里的短音 /æ/</h3>
 <p>点五个词，听标出的 a。它们都发短音 /æ/。再听字母 A 的名字，比较这两个声音。</p>
 <div class="actions"><button class="secondary" data-audio="clear-a">听短音 /æ/</button>
 ${examples.map(([start,letter,end,audio])=>`<button class="secondary" data-audio="${audio}">${start}<strong class="bag-fuel-vowel">${letter}</strong>${end}</button>`).join('')}</div>
 <h3>再听 Aa 到 Gg 的字母名</h3>
 <div class="alphabet-pairs">${LETTERS5.slice(0,7).map(letter=>`<button class="alphabet-pair" data-audio="${letter.id}" aria-label="听字母 ${letter.upper} 的名称"><b>${letter.upper}${letter.lower}</b><span>听字母名</span>${speaker}</button>`).join('')}</div>
 <p>听一个、指一个。课本第24页有箭头和笔顺，请对照在四线三格里写。</p></section>`;
}
function renderBagFuelScene(body){
 const scene=SCENES[state.scene];
 const tabs=SCENES.map((item,i)=>`<button data-scene="${i}" class="${i===state.scene?'active':''}">${i+1} · ${E(item.name)}</button>`).join('');
 const next=state.scene<SCENES.length-1;
 body.innerHTML=`<div class="scene-tabs">${tabs}</div>
 <section class="scene-panel poster-scene"><figure>${picture(scene.id,'',scene.alt)}<figcaption>原创情境示意</figcaption></figure>
 <div class="scene-copy"><span class="eyebrow">FUEL UP · ${state.scene+1} / ${SCENES.length}</span>
 <h2>${E(scene.name)}</h2><p>${E(scene.summary)}</p>
 ${state.scene===0?'<p>下面四句是本站口语练习。听完可以回到原韵律歌，找出发短音的 a。</p><p><b>come back</b> 是“回来”，<b>look at</b> 是“看向”。</p>':''}
 ${scene.lines.map(line=>objectLine(...line)).join('')}
 <button class="secondary" data-speed>慢速 ${state.speed===.8?'开':'关'}</button></div></section>
 ${state.scene===1?bagFuelSoundPractice():''}
 <div class="lesson-bottom"><p>这一段学完可以休息，下次接着学。</p>
 <button class="primary gold" ${next?'data-scene="'+(state.scene+1)+'"':'data-stage="1"'}>${next?'下一个小活动':'去单词图鉴'} →</button></div>`;
}
function renderBagFuelAtlas(body,standalone=false){
 const cards=ids=>wordCards(WORDS.filter(word=>ids.includes(word.id)));
 body.innerHTML=(standalone?pageHead('单词图鉴','找回书包里的用品','三个词慢拼，there 放在句子里和 here 一起听。'):'')+
 `<div class="section-title"><h2>三个词，听老师带我拼</h2></div>${cards(COURSE.wordGroups[0].words)}
 <div class="section-title"><h2>这儿和那儿，对照听</h2></div>${cards(['here','there'])}
 <details class="startup-extra"><summary>复习故事里的旧词</summary>${cards(COURSE.reviewWords.filter(id=>id!=='here'))}</details>
 <div class="lesson-bottom"><p>从图鉴听慢拼，再去听音找物。</p><a class="primary gold" href="#practice">去趣味闯关 →</a></div>`;
}
