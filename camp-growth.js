'use strict';
// Shared camp growth: one new optional reward after each completed lesson.
const CAMP_GROWTH=[
 {id:'morning-sign',name:'晨光路牌',icon:'☀',cost:60,unlockLesson:'welcome-02',lessonNumber:2,description:'把早上好的问候带到营地入口',x:17.1,y:76.2,width:15,anchorX:49,anchorY:96.5},
 {id:'study-desk',name:'学习桌',icon:'▦',cost:60,unlockLesson:'welcome-03',lessonNumber:3,description:'课堂指令练过啦，给营地添一张学习桌',x:39.1,y:76.2,width:19,anchorX:48,anchorY:94},
 {id:'friend-board',name:'朋友留言板',icon:'♡',cost:60,unlockLesson:'welcome-04',lessonNumber:4,description:'认识新朋友，把友谊留在营地',x:61.1,y:76.2,width:17,anchorX:49,anchorY:97},
 {id:'alphabet-console',name:'字母导航台',icon:'✦',cost:60,unlockLesson:'welcome-05',lessonNumber:5,description:'字母任务完成，为下一段旅程准备导航',x:83.1,y:76.2,width:17,anchorX:48,anchorY:98}
];
ADVENTURE_DECORATIONS.push(...CAMP_GROWTH);
const CampGrowth={
 unlocked(item,lessons){return !item.unlockLesson||lessons?.[item.unlockLesson]?.lesson?.completed===true||Object.keys(lessons?.[item.unlockLesson]?.adventure?.completed||{}).length===6;},
 eligible(lessons){return ADVENTURE_DECORATIONS.filter(item=>this.unlocked(item,lessons)).map(item=>item.id);}
};
function campGrowthMarkup(data){
 const owned=CAMP_GROWTH.filter(item=>data.decorations.includes(item.id));
 return `<section class="camp-growth" aria-labelledby="camp-growth-title"><div class="adv-section-head"><div><span class="adv-kicker">每完成一课，营地多一点变化</span><h3 id="camp-growth-title">营地成长小院</h3></div><span>${owned.length} / 4 件已布置</span></div><p class="camp-growth-intro">通关对应课程后，可以用60金币添一件礼物。已经完成的课也算数，不用重学。</p><div class="camp-growth-stage" role="group" aria-label="成长小院，已布置${owned.length}件新装饰"><img class="camp-growth-base" src="./assets/adventure/camp-garden-w21.webp" alt="营地旁的简洁山间草坪，四座石台留给课程奖励。" width="1600" height="800" loading="lazy">${CAMP_GROWTH.map(item=>`<span class="camp-growth-object" data-growth-object="${item.id}" style="left:${item.x}%;top:${item.y}%;width:${item.width}%;transform:translate(-${item.anchorX}%,-${item.anchorY}%)" ${data.decorations.includes(item.id)?'':'hidden'}><img src="./assets/adventure/${item.id}-w21.webp" alt="${E(item.name)}已摆进成长小院" loading="lazy"></span>`).join('')}</div><div class="camp-growth-shop">${CAMP_GROWTH.map(item=>{const has=data.decorations.includes(item.id),unlocked=CampGrowth.unlocked(item,state.lessons),enough=AdventureModel.balance(data)>=item.cost;return `<article class="camp-growth-card ${has?'owned':unlocked?'available':'locked'}"><div class="camp-growth-art"><img src="./assets/adventure/${item.id}-w21.webp" alt="${E(item.name)}" loading="lazy" width="360" height="360"></div><div class="camp-growth-copy"><small>Welcome 第${item.lessonNumber}课的营地礼物</small><h4>${E(item.name)}</h4><p>${E(item.description)}</p><button class="secondary" data-adv-buy="${item.id}" ${has||!unlocked||!enough?'disabled':''}>${has?'已摆进小院 ✓':!unlocked?'通关第'+item.lessonNumber+'课后开放':enough?'60 金币布置':'还差 '+(item.cost-AdventureModel.balance(data))+' 金币'}</button>${!has&&!unlocked?'<a href="'+lessonLink(item.unlockLesson,'practice')+'">去这一课 →</a>':''}</div></article>`;}).join('')}</div><p class="adv-note">每件只兑换一次，放好后各课都能看到。金币仍按每站首次通关15枚累计，重玩不重复发放。</p></section>`;
}
