'use strict';
function renderPackScene(body){
 const scene=SCENES[state.scene];
 body.innerHTML=`<div class="scene-tabs">${SCENES.map((s,i)=>`<button data-scene="${i}" class="${i===state.scene?'active':''}">${i+1} · ${E(s.name)}</button>`).join('')}</div><section class="scene-panel poster-scene"><figure>${picture(scene.id)}<figcaption>原创收纳情境</figcaption></figure><div class="scene-copy"><span class="eyebrow">GET READY · ${state.scene+1} / 3</span><h2>${E(scene.name)}</h2><p>${E(scene.summary)}</p>${scene.lines.map(([audio,text,zh])=>`<div class="dialogue-line"><b class="english">${timedText(audio,text)}</b><p>${E(zh)}</p><button class="secondary" data-audio="${audio}" data-transport="${audio}" data-play-label="▶ 听这句">▶ 听这句</button></div>`).join('')}</div></section><section class="startup-extra"><h3>第18—19页 · 听唱、找物品、自己收一收</h3><p>先用外研优学听唱本课配套歌曲，再在课本第19页找到刚才的用品。上面的声音是英式口语慢示范，可以一句一句跟着说。</p><p>这一组找完，再看看自己的桌面。拿起一样用品，说一句，再把它收好。</p><div class="actions"><button class="secondary" data-speed>慢速 ${state.speed===.8?'开':'关'}</button></div></section><div class="lesson-bottom"><p>这一组学完可以休息，下次从这里接着学。</p><button class="primary gold" ${state.scene<2?'data-scene="'+(state.scene+1)+'"':'data-stage="1"'}>${state.scene<2?'下一小组':'去单词图鉴'} →</button></div>`;
}
function renderPackAtlas(body,standalone=false){
 const active=state.atlasGroup||0;
 const group=COURSE.wordGroups[active];
 const tabs=COURSE.wordGroups.map((item,i)=>`<button data-word-group="${i}" class="${i===active?'active':''}" aria-pressed="${i===active}">${E(item.title)}</button>`).join('');
 const header=standalone?pageHead('单词图鉴','学习用品，一组一组认识','选一组词，先跟着声音拼，再放进句子里读。'):'';
 body.innerHTML=header+`<div class="scene-tabs">${tabs}</div>
 <div class="section-title"><h2>${E(group.title)}</h2><span>${group.words.length}个词</span></div>
 ${wordCards(WORDS.filter(word=>group.words.includes(word.id)))}
 <div class="lesson-bottom"><p>先听老师慢慢拼，再听整词和课本情境里的句子。</p><a class="primary gold" href="#practice">去趣味闯关 →</a></div>`;
}
