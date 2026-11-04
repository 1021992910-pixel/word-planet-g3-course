'use strict';
function wrapActivities(){
 if(state.scene===0){
  const cards=[['打招呼','Hello!','hello'],['说年龄',"I’m nine.",'u12-age'],['认读词','friend','friend'],['介绍自己','课本 Lily 这一格，用自己的名字练 I’m…','im-sam'],['字母歌','先分组跟读，再用外研优学唱字母歌','alphabet-row-1'],['介绍她','课本 Nana 这一格，试着用 She’s… 介绍','u12-shes-amy'],['认读词','play','play'],['介绍他','课本 Ruirui 这一格，试着用 He’s… 介绍','u12-hes-sam'],['见面问好','Nice to meet you!','meet-sentence']];
  return `<section class="startup-extra"><h3>第16页 · 九个小任务</h3><p>对着自己的课本图完成。下面的姓名示范沿用 Sam 和 Amy，听完再换成课本人物或自己的名字。</p><div class="wrap-grid">${cards.map(([title,text,audio])=>`<article><small>${E(title)}</small><p>${E(text)}</p><button class="secondary" data-audio="${audio}">▶ 听示范</button></article>`).join('')}</div><p>字母可以按小组复习，也可以配着外研优学唱完整歌曲。</p><a class="secondary" href="${lessonLink('unit1-04')}">回到字母音乐站 →</a></section>`;
 }
 if(state.scene===1)return `<section class="startup-extra"><h3>第16页 · Now I can</h3><p>先自己试一试，会做了再勾。每一项都可以取消或回去再练。</p><div class="wrap-checks">${WRAP_CHECKS.map(item=>`<div><button class="secondary" data-wrap-check="${item.id}" aria-pressed="${state.wrap.checks.includes(item.id)}">${state.wrap.checks.includes(item.id)?'✓':'○'} ${E(item.text)}</button><a href="${lessonLink(item.lesson)}">再练这一项 →</a></div>`).join('')}</div><p class="muted">这些是自己的学习回顾，由你确认。</p></section>`;
 return `<section class="startup-extra"><h3>第17页 · 好朋友会做什么？</h3><div class="wrap-actions">${WRAP_ACTIONS.map(item=>`<article><b class="english">${timedText(item.audio,item.text)}</b><p>${E(item.zh)}</p><p>${E(item.example)}</p><button class="secondary" data-audio="${item.audio}">▶ 听这句</button></article>`).join('')}</div><p>这些句子里的 listens、shares、helps、plays 都带着词尾 s。先听整句里的声音，再跟着说。</p><div class="dialogue-line"><b class="english">${timedText('u16-question','Are you a good friend?')}</b><button class="secondary" data-audio="u16-question">▶ 听提问</button></div><div class="dialogue-line"><b class="english">${timedText('u16-answer','Yes. I help my friends.')}</b><button class="secondary" data-audio="u16-answer">▶ 听回答</button></div><p>和家人或同学轮流问答。再讲一件你倾听、分享、帮忙或邀请朋友一起玩的事。</p></section>`;
}
function renderWrapScene(body){
 const scene=SCENES[state.scene];
 body.innerHTML=`<div class="scene-tabs">${SCENES.map((s,i)=>`<button data-scene="${i}" class="${i===state.scene?'active':''}">${i+1} · ${E(s.name)}</button>`).join('')}</div><section class="scene-panel poster-scene"><figure>${picture(scene.id)}<figcaption>已有原创情境</figcaption></figure><div class="scene-copy"><span class="eyebrow">UNIT 1 · 回顾与拓展</span><h2>${E(scene.name)}</h2><p>${E(scene.summary)}</p><button class="primary" data-audio="${scene.audio}">▶ 听一句示范</button></div></section>${wrapActivities()}<div class="lesson-bottom"><p>一项一项练，随时可以休息。</p><button class="primary gold" ${state.scene<2?'data-scene="'+(state.scene+1)+'"':'data-stage="1"'}>${state.scene<2?'下一小步':'去复习单词'} →</button></div>`;
}
function renderWrapAtlas(body,standalone=false){
 const group=COURSE.wordGroups[state.atlasGroup||0];
 body.innerHTML=(standalone?pageHead('单词图鉴','复习八个熟悉的词','分三小组，沿用慢节奏拼读。'):'')+`<div class="scene-tabs">${COURSE.wordGroups.map((g,i)=>`<button data-word-group="${i}" class="${i===state.atlasGroup?'active':''}">${E(g.title)}</button>`).join('')}</div><div class="section-title"><h2>${E(group.title)}</h2><span>${group.words.length}个复习词</span></div>`+wordCards(WORDS.filter(word=>group.words.includes(word.id)))+'<div class="lesson-bottom"><p>第17页的四个行动句在课本情境里听和说。</p><a class="primary gold" href="#practice">去趣味闯关 →</a></div>';
}
document.addEventListener('click',event=>{
 const button=event.target.closest('[data-wrap-check]');if(!button||!COURSE.wrap)return;
 if(!WrapModel.toggle(state.wrap,button.dataset.wrapCheck))return;
 stopAudio();save();renderWrapScene(document.querySelector('#lesson-body'));
 document.querySelector('[data-wrap-check="'+button.dataset.wrapCheck+'"]')?.focus({preventScroll:true});
});
