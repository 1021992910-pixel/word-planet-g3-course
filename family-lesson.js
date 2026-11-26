function renderFamilyScene(body){
 const s=SCENES[state.scene],groups=[['family','dad','mum'],['brother','sister','grandpa','grandma'],['father','mother','grandfather','grandmother']];
 const activity=[
  '<h3>回到课本第54页听歌</h3><p>在外研U学听本课歌曲。听到一种家人称呼，就在自己的课本上指一指。下面是本站另编的介绍示范。</p>',
  '<h3>第54—55页 · 指一指，找一找</h3><p>打开课本原图，找到玲玲，再找到她的家人。说出你认识的家庭称呼。本站合影是原创学习示意，不替代课本的找人活动。</p>',
  '<h3>同一位家人的另一种称呼</h3><p>dad = father，mum = mother，grandpa = grandfather，grandma = grandmother。先听熟悉的短称呼，再听另一种说法。不要求一次记住所有长词。</p>'
 ][state.scene];
 body.innerHTML=`<div class="scene-tabs">${SCENES.map((s,i)=>`<button data-scene="${i}" class="${state.scene===i?'active':''}">${i+1} · ${E(s.name)}</button>`).join('')}</div><section class="scene-panel"><figure>${picture(s.id,'',s.alt)}<figcaption>原创家庭情境示意</figcaption></figure><div class="scene-copy"><h2>${E(s.name)}</h2>${groups[state.scene].map(id=>{const w=FAMILY_WORDS.find(w=>w.id===id);return objectLine(w.exampleAudio,w.example,w.translation)}).join('')}<button class="secondary" data-speed>慢速 ${state.speed===.8?'开':'关'}</button></div></section><section class="startup-extra">${activity}</section><div class="lesson-bottom"><p>家人的称呼可以分几次学。</p>${state.scene<2?`<button class="primary gold" data-scene="${state.scene+1}">下一小步 →</button>`:'<button class="primary gold" data-stage="1">去单词图鉴 →</button>'}</div>`;
}
function renderFamilyAtlas(body,standalone=false){
 const active=Math.min(state.atlasGroup||0,2),group=COURSE.wordGroups[active];
 body.innerHTML=(standalone?pageHead('单词图鉴','给家人配上称呼','七个核心词分三组，先听老师慢拼。'):'')+`<div class="scene-tabs">${COURSE.wordGroups.map((g,i)=>`<button data-word-group="${i}" class="${active===i?'active':''}">${E(g.title)}</button>`).join('')}</div><h2>${E(group.title)}</h2>${wordCards(FAMILY_WORDS.filter(w=>group.words.includes(w.id)))}<details class="startup-extra"><summary>称呼小补充：四种完整说法</summary><p>它们和短称呼指同一位家人，也可以点开听拼读。</p>${wordCards(FAMILY_WORDS.filter(w=>COURSE.contextWords.includes(w.id)))}</details><div class="lesson-bottom">${active<2?`<button class="primary gold" data-word-group="${active+1}">下一小组 →</button>`:'<a class="primary gold" href="#practice">去趣味闯关 →</a>'}</div>`;
}
