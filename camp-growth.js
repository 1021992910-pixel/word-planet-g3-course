'use strict';
// Shared camp growth: one new optional reward after each completed lesson.
const CAMP_GROWTH=[
 {id:'morning-sign',name:'晨光路牌',icon:'☀',cost:60,unlockLesson:'welcome-02',lessonNumber:2,description:'把早上好的问候带到营地入口',x:17.1,y:76.2,width:15,anchorX:49,anchorY:96.5},
 {id:'study-desk',name:'学习桌',icon:'▦',cost:60,unlockLesson:'welcome-03',lessonNumber:3,description:'课堂指令练过啦，给营地添一张学习桌',x:39.1,y:76.2,width:19,anchorX:48,anchorY:94},
 {id:'friend-board',name:'朋友留言板',icon:'♡',cost:60,unlockLesson:'welcome-04',lessonNumber:4,description:'认识新朋友，把友谊留在营地',x:61.1,y:76.2,width:17,anchorX:49,anchorY:97},
 {id:'alphabet-console',name:'字母导航台',icon:'✦',cost:60,unlockLesson:'welcome-05',lessonNumber:5,description:'字母任务完成，为下一段旅程准备导航',x:83.1,y:76.2,width:17,anchorX:48,anchorY:98}
];
const CAMP_SOUVENIRS=[{id:'friend-telescope',name:'友谊观星镜',icon:'✦',cost:60,unlockLesson:'unit1-02',description:'把新朋友带到星空下，一起寻找学习星',asset:'./assets/adventure/telescope-w24.webp',lessonLabel:'Unit 1 第2课',object:true},{id:'friend-memory',name:'友谊纪念画',icon:'♡',cost:60,unlockLesson:'unit1-01',description:'把新朋友的故事挂进共同营地',scene:'u1-friend'},{id:'friend-kite',name:'友谊风筝摆件',icon:'✦',cost:60,unlockLesson:'unit1-03',description:'把三位朋友一起放飞的火箭风筝带回营地',asset:'./assets/adventure/friend-kite-w26.webp',lessonLabel:'Unit 1 第3课',object:true,buyLabel:'60 金币布置风筝'},{id:'melody-lantern',name:'旋律星灯',icon:'♪',cost:60,unlockLesson:'unit1-04',description:'把字母音乐站的歌声带回共同营地',asset:'./assets/adventure/melody-lantern-w27.webp',lessonLabel:'Unit 1 第4课',object:true,buyLabel:'60 金币布置旋律星灯'}];
CAMP_SOUVENIRS.push({id:'friend-poster',name:'海报展纪念画',icon:'♡',cost:60,unlockLesson:'unit1-05',description:'把一起展示朋友海报的时刻挂进营地',scene:'poster-w28',lessonLabel:'Unit 1 第5课'});
CAMP_SOUVENIRS.push({id:'friendship-star',name:'友谊星徽章',icon:'✦',cost:60,unlockLesson:'unit1-06',description:'把倾听、分享和帮助朋友的心意留在营地',asset:'./assets/adventure/friendship-star-w29.webp',lessonLabel:'Unit 1 第6课',object:true,buyLabel:'60 金币布置友谊星徽章'});
CAMP_SOUVENIRS.push({id:'school-supply-memory',name:'收纳纪念画',icon:'▣',cost:60,unlockLesson:'unit2-01',description:'把认真收好学习用品的时刻挂进营地',scene:'u2-packing',lessonLabel:'Unit 2 第1课'});
CAMP_SOUVENIRS.push({id:'guessing-memory',name:'猜物纪念画',icon:'?',cost:60,unlockLesson:'unit2-02',description:'把画一画、猜一猜的快乐时刻留在共同营地',scene:'u2-portrait',lessonLabel:'Unit 2 第2课'});
CAMP_SOUVENIRS.push({id:'lost-return-memory',name:'归还纪念画',icon:'✦',cost:60,unlockLesson:'unit2-03',description:'把海底招领站归还学习用品的时刻挂进共同营地',scene:'u2-lost-return',lessonLabel:'Unit 2 第3课'});
CAMP_SOUVENIRS.push({id:'schoolbag-memory',name:'书包纪念画',icon:'✦',cost:60,unlockLesson:'unit2-04',description:'记下和伙伴找回用品的校园小路',scene:'u2-bag-fuel',lessonLabel:'Unit 2 第4课'});
CAMP_SOUVENIRS.push({id:'design-studio-memory',name:'文具设计纪念画',icon:'✦',cost:60,unlockLesson:'unit2-05',description:'记下和伙伴展示设计的时刻',scene:'u2-design-studio',lessonLabel:'Unit 2 第5课'});
CAMP_SOUVENIRS.push({id:'writing-tools-memory',name:'书写工具纪念画',icon:'✦',cost:60,unlockLesson:'unit2-06',description:'把三种书写工具的对照图挂到营地',scene:'u2-writing-tools',lessonLabel:'Unit 2 第6课'});
CAMP_SOUVENIRS.push({id:"rainbow-window-memory",name:"彩虹窗景纪念画",icon:"✦",cost:60,unlockLesson:"unit3-01",description:"把雨后窗外的彩虹挂进营地",scene:"u3-clothes",lessonLabel:"Unit 3 第1课"});
CAMP_SOUVENIRS.push({id:"red-balloon-memory",name:"红气球纪念画",icon:"✦",cost:60,unlockLesson:"unit3-02",description:"把波波猜中的第一只气球挂进营地",scene:"u3-red-balloon",lessonLabel:"Unit 3 第2课"});
CAMP_SOUVENIRS.push({id:"colour-trampoline-memory",name:"颜色蹦床纪念画",icon:"✦",cost:60,unlockLesson:"unit3-03",description:"把颜色朋友一起跳的故事挂进营地",scene:"u3-mix-green",lessonLabel:"Unit 3 第3课"});
CAMP_SOUVENIRS.push({id:"flower-painting-memory",name:"红花画作纪念画",icon:"✦",cost:60,unlockLesson:"unit3-04",description:"把和伙伴一起画红花的时刻挂进营地",scene:"u3-painting",lessonLabel:"Unit 3 第4课"});
CAMP_SOUVENIRS.push({id:"colour-discovery-memory",name:"找色分享纪念画",icon:"✦",cost:60,unlockLesson:"unit3-05",description:"把和伙伴问答画中颜色的时刻挂进营地",scene:"u3-colour-share",lessonLabel:"Unit 3 第5课"});
CAMP_SOUVENIRS.push({id:'chameleon-memory',name:'变色龙观察纪念画',icon:'✦',cost:60,unlockLesson:'unit3-06',description:'把自然观察站的绿色朋友挂进共同营地',scene:'u3-chameleon',lessonLabel:'Unit 3 第6课'});
ADVENTURE_DECORATIONS.push(...CAMP_GROWTH,...CAMP_SOUVENIRS);
const CampGrowth={
 unlocked(item,lessons){return !item.unlockLesson||lessons?.[item.unlockLesson]?.lesson?.completed===true||Object.keys(lessons?.[item.unlockLesson]?.adventure?.completed||{}).length===6;},
 eligible(lessons){return ADVENTURE_DECORATIONS.filter(item=>this.unlocked(item,lessons)).map(item=>item.id);}
};
function campGrowthMarkup(data){
 const owned=CAMP_GROWTH.filter(item=>data.decorations.includes(item.id));
 return `<section class="camp-growth" aria-labelledby="camp-growth-title"><div class="adv-section-head"><div><span class="adv-kicker">每完成一课，营地多一点变化</span><h3 id="camp-growth-title">营地成长小院</h3></div><span>${owned.length} / 4 件已布置</span></div><p class="camp-growth-intro">通关对应课程后，可以用60金币添一件礼物。已经完成的课也算数，不用重学。</p><div class="camp-growth-stage" role="group" aria-label="成长小院，已布置${owned.length}件新装饰"><img class="camp-growth-base" src="./assets/adventure/camp-garden-w21.webp" alt="营地旁的简洁山间草坪，四座石台留给课程奖励。" width="1600" height="800" loading="lazy">${CAMP_GROWTH.map(item=>`<span class="camp-growth-object" data-growth-object="${item.id}" style="left:${item.x}%;top:${item.y}%;width:${item.width}%;transform:translate(-${item.anchorX}%,-${item.anchorY}%)" ${data.decorations.includes(item.id)?'':'hidden'}><img src="./assets/adventure/${item.id}-w21.webp" alt="${E(item.name)}已摆进成长小院" loading="lazy"></span>`).join('')}</div><div class="camp-growth-shop">${CAMP_GROWTH.map(item=>{const has=data.decorations.includes(item.id),unlocked=CampGrowth.unlocked(item,state.lessons),enough=AdventureModel.balance(data)>=item.cost;return `<article class="camp-growth-card ${has?'owned':unlocked?'available':'locked'}"><div class="camp-growth-art"><img src="./assets/adventure/${item.id}-w21.webp" alt="${E(item.name)}" loading="lazy" width="360" height="360"></div><div class="camp-growth-copy"><small>Welcome 第${item.lessonNumber}课的营地礼物</small><h4>${E(item.name)}</h4><p>${E(item.description)}</p><button class="secondary" data-adv-buy="${item.id}" ${has||!unlocked||!enough?'disabled':''}>${has?'已摆进小院 ✓':!unlocked?'通关第'+item.lessonNumber+'课后开放':enough?'60 金币布置':'还差 '+(item.cost-AdventureModel.balance(data))+' 金币'}</button>${!has&&!unlocked?'<a href="'+lessonLink(item.unlockLesson,'practice')+'">去这一课 →</a>':''}</div></article>`;}).join('')}</div><p class="adv-note">每件只兑换一次，放好后各课都能看到。金币仍按每站首次通关15枚累计，重玩不重复发放。</p>${campSouvenirMarkup(data)}</section>`;
}

function campSouvenirMarkup(data){
 return '<section class="camp-souvenirs" aria-label="营地旅行收获"><h3>营地旅行收获</h3><p class="camp-growth-intro">新旅程带回新的故事，欢迎营地和成长小院也会一直保留。</p>'+CAMP_SOUVENIRS.map(item=>{
 const owned=data.decorations.includes(item.id),unlocked=CampGrowth.unlocked(item,state.lessons),balance=AdventureModel.balance(data);
 return `<article class="camp-souvenir ${owned?'owned':''}"><div class="${item.object?'camp-object-stage':'camp-memory-frame'} ${owned?'hung':'waiting'}">${owned?(item.object?'<img src="'+item.asset+'" alt="'+E(item.name)+'已摆进营地" loading="lazy">':picture(item.scene,'',item.name)):'<span>✧<small>等你把新故事带回来</small></span>'}</div><div><small>${item.lessonLabel||'Unit 1 第1课'} · 营地礼物</small><h4>${E(item.name)}</h4><p>${E(item.description)}</p><button class="secondary" data-adv-buy="${item.id}" ${owned||!unlocked||balance<item.cost?'disabled':''}>${owned?(item.object?'已摆进营地 ✓':'已挂进营地 ✓'):!unlocked?'通关本课后开放':balance>=item.cost?(item.object?(item.buyLabel||'60 金币布置观星镜'):'60 金币挂上纪念画'):'还差 '+(item.cost-balance)+' 金币'}</button>${!unlocked?'<a href="'+lessonLink(item.unlockLesson,'practice')+'">去这一课 →</a>':''}</div></article>`;
 }).join('')+'</section>';
}
