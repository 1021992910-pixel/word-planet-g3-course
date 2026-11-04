'use strict';
function posterPreview(){
 const selected=POSTER_PEOPLE.filter(person=>state.poster.friends.includes(person.id));
 return `<section class="friend-poster" aria-labelledby="poster-preview-title"><h3 id="poster-preview-title">My friends</h3>${selected.length?`<div class="poster-person-grid">${selected.map(person=>`<article><b class="poster-name">${E(person.name)}</b><span class="poster-age">9</span><p class="english">${timedText(person.nameAudio,person.pronoun+' '+person.name+'.',person.shareAudio,0)}</p><p class="english">${timedText(person.pronoun==="She's"?'u15-she-friend':'u15-he-friend',person.pronoun+' my friend.',person.shareAudio,2)}</p><p class="english">${timedText(person.ageAudio,person.pronoun+' nine.',person.shareAudio,5)}</p><button class="secondary" data-audio="${person.shareAudio}">▶ 听${E(person.name)}的介绍</button></article>`).join('')}</div>`:'<p class="poster-empty">先点选一位朋友，就能看到介绍卡。</p>'}</section>`;
}

function posterActivity(){
 if(state.scene===0)return `<section class="startup-extra"><h3>第14页 · 先想一个朋友</h3><p>可以是同学，也可以是你喜欢的玩具、动物伙伴。先说出名字，试试用“名字 + is my friend”介绍。</p><p class="poster-task">这一课先复习 <b>friend、he、she、nine、we</b> 五个旧词。点进图鉴，还能按刚才的慢节奏再拼一遍。</p><button class="secondary" data-audio="u15-sam-friend">▶ 再听一个例子</button></section>`;
 if(state.scene===1)return `<section class="startup-extra"><h3>第15页 · 试做一张介绍卡</h3><p>先用故事里的朋友练习。选一位或两位，这里的角色都是九岁。</p><div class="poster-picks" role="group" aria-label="选择练习海报里的朋友">${POSTER_PEOPLE.map(person=>`<button class="secondary" data-poster-person="${person.id}" aria-pressed="${state.poster.friends.includes(person.id)}">${E(person.name)} <span>${state.poster.friends.includes(person.id)?'✓':'＋'}</span></button>`).join('')}</div>${posterPreview()}<h4>再拿一张纸，画自己的海报</h4><ol><li>写上 <b>My friends</b>。</li><li>画一位或几位朋友，在旁边写名字。</li><li>会写的话，再加上年龄。</li></ol><button class="secondary" data-poster-check="paper" aria-pressed="${state.poster.paper}">${state.poster.paper?'已完成纸上海报 ✓':'我画好自己的海报了'}</button><p class="muted">练习选择和完成标记会保存在当前浏览器。</p></section>`;
 return `<section class="startup-extra"><h3>第15页 · 指着海报说给家人听</h3>${posterPreview()}<ol><li>先说名字，用 <b>He’s…</b> 或 <b>She’s…</b>。</li><li>说朋友关系，用 <b>He’s / She’s my friend.</b>。</li><li>试着补年龄，最后可以说 <b>We’re friends.</b>。</li></ol><p>可以看着上面的提示说，也可以举起自己的纸上海报，试着自己介绍。</p><button class="secondary" data-audio="u12-friends-full">▶ 听“我们是朋友”</button> <button class="secondary" data-poster-check="shared" aria-pressed="${state.poster.shared}">${state.poster.shared?'我已经开口介绍过了 ✓':'我已经开口介绍过了'}</button><p class="muted">完成标记由孩子自己确认。</p></section>`;
}

function renderPosterScene(body){
 const scene=SCENES[state.scene];
 body.innerHTML=`<div class="scene-tabs">${SCENES.map((s,i)=>`<button data-scene="${i}" class="${i===state.scene?'active':''}">${i+1} · ${E(s.name)}</button>`).join('')}</div><section class="scene-panel poster-scene"><figure>${picture(scene.id,'',scene.alt)}<figcaption>原创活动示意</figcaption></figure><div class="scene-copy"><span class="eyebrow">HIT IT BIG · ${state.scene+1} / 3</span><h2>${E(scene.name)}</h2><p>${E(scene.summary)}</p>${scene.lines.map(line=>`<div class="dialogue-line"><b class="english">${timedText(line.audio,line.text)}</b><p>${E(line.zh)}</p><button class="secondary" data-audio="${line.audio}" data-transport="${line.audio}" data-play-label="▶ 听这段介绍">▶ 听这段介绍</button></div>`).join('')}</div></section>${posterActivity()}<div class="lesson-bottom"><p>想朋友、做海报、介绍朋友，可以分开完成。</p><button class="primary gold" ${state.scene<2?'data-scene="'+(state.scene+1)+'"':'data-stage="1"'}>${state.scene<2?'下一步':'复习本课用到的词'} →</button></div>`;
}

function renderPosterAtlas(body,standalone=false){
 body.innerHTML=(standalone?pageHead('单词图鉴','海报里用到的五个旧词','点开词卡，慢慢听声音，再连起来读。'):'')+'<div class="section-title"><div><small>旧词放进海报里用一用</small><h2>介绍朋友，先把这些词读熟</h2></div><span>5个复习词</span></div>'+wordCards()+'<div class="lesson-bottom"><p>每个音听完留一点时间，再试着自己读。</p><a class="primary gold" href="#practice">去趣味闯关 →</a></div>';
}

document.addEventListener('click',event=>{
 const button=event.target.closest('[data-poster-person],[data-poster-check]');
 if(!button||!COURSE.poster)return;
 stopAudio();
 if(button.dataset.posterPerson){
  if(!PosterModel.toggle(state.poster,button.dataset.posterPerson)){toast('这张练习海报先选两位，取消一位后可以换人。');return;}
 }else{
  const key=button.dataset.posterCheck;
  if(!['paper','shared'].includes(key))return;
  state.poster[key]=!state.poster[key];state.poster.updated=Date.now();
 }
 save();renderPosterScene(document.querySelector('#lesson-body'));
 const selector=button.dataset.posterPerson?'[data-poster-person="'+button.dataset.posterPerson+'"]':'[data-poster-check="'+button.dataset.posterCheck+'"]';
 document.querySelector(selector)?.focus({preventScroll:true});
});
