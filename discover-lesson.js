'use strict';
function discoverBookPhotos(){
 return `<section class="startup-extra">
 <h3>第38页 · 先看自己的课本照片</h3>
 <p>上图是中国台州，下图是意大利威尼斯。先指箭头所指的房屋，问伙伴颜色。看清房屋后再听参考。</p>
 <div class="discover-grid"><article><h4>台州照片</h4>
 ${objectLine(...BALLOON_LINES.ask)}
 <details><summary>答完听参考</summary>${objectLine('u32-yellow',"It's yellow.",'它是黄色的。')}</details>
 </article><article><h4>威尼斯照片</h4>
 ${objectLine(...BALLOON_LINES.ask)}
 <details><summary>答完听参考</summary>${objectLine('u32-blue',"It's blue.",'它是蓝色的。')}</details>
 </article></div>
 <p>还可以指照片里另一处颜色，轮流问一问。</p></section>`;
}
function discoverDrawActivity(){
 return `<section class="startup-extra">
 <h3>第39页 · 找颜色，画一幅自己的图</h3>
 <ol><li>看看家里、教室或窗外，选两三样你看得见的东西。</li>
 <li>指着它们说说颜色，再用纸和画笔画下来。</li>
 <li>给图里的颜色留清楚的区域，方便伙伴指着问。</li></ol>
 <p>可以先用下面的词回想颜色，再找身边的实物。</p>
 ${colourListeningButtons(DISCOVER_COLOURS)}
 </section>`;
}
function discoverShareActivity(){
 return `<section class="startup-extra">
 <h3>第39页 · 指一处，问一句</h3>
 <p>拿出自己的画，一个人指着其中一部分问，另一个人回答，再交换。一次只指一处颜色。</p>
 ${objectLine(...BALLOON_LINES.ask)}
 <details><summary>先用示意图练一遍，再听回答</summary>
 <p>女孩指的是绿色树冠。</p>${objectLine('u32-green',"It's green.",'它是绿色的。')}</details>
 <p>可以再问黄色太阳和蓝色云朵。最后换成你自己的画或身边的物品。</p>
 </section>`;
}
function renderDiscoverScene(body){
 const scene=SCENES[state.scene],next=state.scene<SCENES.length-1;
 const tabs=SCENES.map((item,i)=>`<button data-scene="${i}" class="${i===state.scene?'active':''}" aria-pressed="${i===state.scene}">${i+1} · ${E(item.name)}</button>`).join('');
 const activity=[discoverBookPhotos,discoverDrawActivity,discoverShareActivity][state.scene];
 body.innerHTML=`<div class="scene-tabs">${tabs}</div>
 <section class="scene-panel poster-scene"><figure>${picture(scene.id,'',scene.alt)}<figcaption>原创活动示意</figcaption></figure>
 <div class="scene-copy"><span class="eyebrow">UNIT 3 · HIT IT BIG</span>
 <h2>${E(scene.name)}</h2><p>${E(scene.summary)}</p>
 ${scene.lines.map(line=>objectLine(...line)).join('')}
 <button class="secondary" data-speed>慢速 ${state.speed===.8?'开':'关'}</button></div></section>
 ${activity()}
 <div class="lesson-bottom"><p>三个小活动可以分开完成。</p>
 <button class="primary gold" ${next?'data-scene="'+(state.scene+1)+'"':'data-stage="1"'}>${next?'下一小步':'复习本课用到的词'} →</button></div>`;
}
function renderDiscoverAtlas(body,standalone=false){
 const active=state.atlasGroup||0,group=COURSE.wordGroups[active];
 const tabs=COURSE.wordGroups.map((item,i)=>`<button data-word-group="${i}" class="${i===active?'active':''}" aria-pressed="${i===active}">${E(item.title)}</button>`).join('');
 body.innerHTML=(standalone?pageHead('单词图鉴','把学过的颜色用起来','八个颜色词分两组复习，再放进自己的问答。'):'')+
 `<div class="scene-tabs">${tabs}</div>
 <div class="section-title"><h2>${E(group.title)}</h2><span>${group.words.length} 个复习词</span></div>
 ${wordCards(DISCOVER_COLOURS.filter(word=>group.words.includes(word.id)))}
 <details class="startup-extra"><summary>问答和画图时还会用到</summary>${wordCards(DISCOVER_OTHER_WORDS)}</details>
 <div class="lesson-bottom"><p>复习好这一组，再接着练。</p>
 ${active===0?'<button class="primary gold" data-word-group="1">下一小组 →</button>':'<a class="primary gold" href="#practice">去趣味闯关 →</a>'}</div>`;
}
