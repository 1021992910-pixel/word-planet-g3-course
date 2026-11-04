'use strict';
const SPEEDUP_WORDS=[
 {id:'oh',word:'oh',ipa:'/əʊ/',meaning:'哦；表示惊讶',scene:'speed-help',example:'Oh, no!',exampleAudio:'u13-oh-no',translation:'哎呀，糟了！'},
 {id:'no',word:'no',ipa:'/nəʊ/',meaning:'不；不行',scene:'speed-help',example:'Oh, no!',exampleAudio:'u13-oh-no',translation:'哎呀，糟了！'},
 {id:'help',word:'help',ipa:'/help/',meaning:'帮助；帮忙',scene:'speed-help',example:"Let's help.",exampleAudio:'u13-lets-help',translation:'我们来帮忙吧。'},
 {id:'here',word:'here',ipa:'/hɪə/',meaning:'在这里',scene:'speed-thanks',example:'Here you are.',exampleAudio:'u13-here-you-are',translation:'给你。'},
 {id:'thank',word:'thank',ipa:'/θæŋk/',meaning:'感谢',scene:'speed-thanks',example:'Thank you.',exampleAudio:'u13-thank-you',translation:'谢谢你。'},
 {id:'together',word:'together',ipa:'/təˈɡeðə/',meaning:'一起',scene:'speed-play',example:"Let's play together!",exampleAudio:'u13-play-together',translation:'我们一起玩吧！'},
 {id:'ok',word:'OK',ipa:'/əʊˈkeɪ/',meaning:'好；可以',scene:'speed-play',example:'OK!',exampleAudio:'u13-ok-reply',translation:'好呀！'},
 {id:'great',word:'great',ipa:'/ɡreɪt/',meaning:'极棒的；太好了',scene:'speed-play',example:'Great!',exampleAudio:'u13-great',translation:'太好了！'}
].map(w=>{const guide=GUIDED_DATA[w.id];return {...w,parts:guide.parts,kind:guide.kind==='phonics'?'拼读小老师':'句中听懂',tip:guide.hint,hint:guide.hint};});

const speedLine=(who,text,zh,audio)=>({who,text,zh,audio});
const SPEEDUP_SCENES=[
 {id:'speed-help',name:'风筝卡住了',audio:'u13-scene0',alt:'Ben抬头看卡在树枝上的火箭风筝，Mia和David走来帮忙。',summary:'先看课本第10页第1—2格。Ben 的火箭风筝卡在树上，Mia 和 David 过来帮忙。读到最后再想，三人是不是朋友？',lines:[
  speedLine('Ben','Oh, no!','哎呀，糟了！','u13-oh-no'),
  speedLine('Mia 和 David',"Let's help.",'我们来帮忙吧。','u13-lets-help')]},
 {id:'speed-thanks',name:'还给朋友，说谢谢',audio:'u13-scene1',alt:'David把找回来的火箭风筝递给Ben，Mia在旁边微笑。',summary:'看第10页第3格和第11页第4格。David 把风筝还给 Ben。听完递东西和道谢的对话，再听他们介绍名字和年龄。',lines:[
  speedLine('David','Here you are.','给你。','u13-here-you-are'),
  speedLine('Ben','Thank you.','谢谢你。','u13-thank-you'),
  speedLine('Mia',"I'm Mia.",'我是米娅。','u13-mia'),
  speedLine('Mia',"He's David.",'他是戴维。','u13-david'),
  speedLine('Ben',"I'm Ben.",'我是本。','u13-ben'),
  speedLine('David',"We're nine.",'我们九岁。','u13-we-nine'),
  speedLine('Ben',"I'm nine, too.",'我也九岁。','u13-nine-too')]},
 {id:'speed-play',name:'我们一起玩',audio:'u13-scene2',alt:'三位小朋友一起放飞同一只火箭风筝。',summary:'看第11页第5—6格。Ben 邀请伙伴一起玩，Mia 和 David 答应了。回想他们怎么帮忙，最后做了什么。',lines:[
  speedLine('Ben',"Let's play together!",'我们一起玩吧！','u13-play-together'),
  speedLine('Mia 和 David','OK!','好呀！','u13-ok-reply'),
  speedLine('Ben','Great!','太好了！','u13-great')]}
];

const SPEEDUP_MISSIONS=[
 {id:'signal',title:'收到风筝求助',skill:'听音 · 理解故事',icon:'📡',story:'从同伴介绍站来到风筝草地。先听消息，看看小伙伴遇到了什么。',done:'找到需要帮忙的人了，去准备声音零件。',tasks:[
  {id:'u13-oh-choice',type:'choice',word:'oh',audio:'u13-oh-no',prompt:'Ben 的风筝卡住了，他听起来怎样？',options:['有点着急','在感谢朋友','在向大家道别'],answer:'有点着急',hint:'看看第10页第1格，风筝还在树上。'},
  {id:'u13-no-choice',type:'choice',word:'no',audio:'no',prompt:'听单词，选出它的意思',options:['不；不行','谢谢','一起'],answer:'不；不行',hint:'在故事里，Ben 遇到麻烦时用到了这个小词。'},
  {id:'u13-story-choice',type:'choice',audio:'u13-story-question',prompt:'读完故事，他们后来是朋友吗？',options:['是，他们帮忙后还一起玩','不是，他们各自回家了','不是，谁也没有帮忙'],answer:'是，他们帮忙后还一起玩',hint:'再看课本第11页最后一格。'}]},
 {id:'sound',title:'接好求助声音',skill:'听整词 · 拼声音',icon:'🔧',story:'听完整词，再把打乱的声音零件接起来。',done:'求助信号接通了！',tasks:[
  {id:'u13-build-help',type:'build',word:'help',audio:'help',prompt:'听单词，再拼出来',parts:['h','e','l','p'],answer:'help',hint:'中间是短元音，最后两个辅音接紧。'},
  {id:'u13-build-here',type:'build',word:'here',audio:'here',prompt:'听单词，再拼出来',parts:['h','ere'],answer:'here',hint:'后面三个字母是一块零件。'}]},
 {id:'supply',title:'备好感谢标签',skill:'独立拼写',icon:'🎒',story:'给风筝包添两张小标签。听清楚以后再拼。',done:'标签写好了，带着它们过桥。',tasks:[
  {id:'u13-spell-thank',type:'spell',word:'thank',audio:'thank',prompt:'听声音，拼出“感谢”',answer:'thank',extra:['e'],hint:'开头两个字母合读；最后留意鼻音和短促的收尾。'},
  {id:'u13-spell-great',type:'spell',word:'great',audio:'great',prompt:'听声音，拼出“极棒的”',answer:'great',extra:['i'],hint:'两个元音字母在中间，合读成一组。'}]},
 {id:'bridge',title:'把风筝递过桥',skill:'组句 · 找词 · 补词',icon:'🌉',story:'用一句话把风筝递回去，再听听伙伴怎么介绍自己。',done:'风筝物归原主，大家认识啦。',tasks:[
  {id:'u13-order-here',type:'order',word:'here',audio:'u13-here-you-are',prompt:'把“给你”排成一句话',parts:['Here','you','are.'],answer:'Here you are.',hint:'先用表示“这里”的小词开头。'},
  {id:'u13-find-together',type:'find',word:'together',audio:'u13-play-together',prompt:'邀请里哪个词表示“一起”？',parts:["Let's",'play','together!'],answer:'together!',zh:'我们一起玩吧！',hint:'它说明大家一块儿做这件事。'},
  {id:'u13-gap-nine',type:'gap',audio:'u13-we-nine',prompt:'David 说他和 Mia 都九岁，句首怎么写？',sentence:'___ nine.',zh:'我们九岁。',options:["We're","I'm","He's"],answer:"We're",hint:'这句话把说话的人和他的同伴都包括在内。'}]},
 {id:'friends',title:'说一声谢谢',skill:'情境对话 · 听懂回应',icon:'🤝',story:'风筝回来了，轮到你接上对话。',done:'礼貌的话说对啦，可以一起玩了。',tasks:[
  {id:'u13-dialogue-thank',type:'dialogue',word:'thank',audio:'u13-here-you-are',prompt:'朋友把风筝还给你，你怎么回答？',context:'你刚从朋友手中接到风筝。',options:['Thank you.','Oh, no!',"I'm Ben."],answer:'Thank you.',hint:'朋友帮了你，试着礼貌地道谢。'},
  {id:'u13-dialogue-ok',type:'dialogue',word:'ok',audio:'u13-play-together',prompt:'朋友邀请你玩，你想答应。怎么说？',context:'你愿意加入。',options:['OK!','Goodbye!','No.'],answer:'OK!',hint:'挑一句表示同意的话。'}]},
 {id:'party',title:'一起放飞风筝',skill:'邀请 · 朋友卡 · 开口',icon:'🎉',story:'一起放飞风筝，再为朋友画一张卡。',done:'草地任务完成，可以把风筝摆件带回营地啦。',tasks:[
  {id:'u13-order-play',type:'order',word:'together',audio:'u13-play-together',prompt:'把“一起玩吧”排成一句话',parts:["Let's",'play','together!'],answer:"Let's play together!",hint:'先发出邀请，再说玩，最后说一起。'},
  {id:'u13-card-age',type:'gap',audio:'u13-card-age',prompt:'朋友卡这一行写年龄，空格填什么？',sentence:'She is ___.',zh:'她九岁。',options:['nine','Mia','friends'],answer:'nine',hint:'找一找表示年龄的词。'},
  {id:'u13-roleplay',type:'speak',audio:'u13-thank-you',prompt:'轮到你演 Ben，接过风筝并道谢',sentence:'Thank you.',zh:'谢谢你。可以和伙伴用纸风筝或书本演递东西的动作。',hint:'先听一句，再用自己的声音说。'}]}
];

LESSONS['unit1-03']={
 course:{...LESSONS['unit1-02'].course,lessonId:'unit1-03',number:3,lessonTitle:'风筝找回来了：我们一起玩',page:'课本第10—11页 · Speed up',description:'读故事 · 学会道谢和邀请 · 画写朋友卡',estimated:'三个短环节，可分次完成',heroScene:'speed-help',speedup:true,
  wordGroups:[{title:'风筝卡住了',words:['no','help']},{title:'还给朋友',words:['here','thank']},{title:'我们一起玩',words:['great']}],contextWords:['oh','together','ok'],
  adventure:{chapter:'第八章 · 风筝草地',title:'风筝草地',subtitle:'帮新朋友找回风筝。',intro:'听清求助，接好对话，和新朋友一起放飞风筝。',message:'从同伴介绍站走到草地，Ben 正望着树上的火箭风筝。听听朋友们怎么帮忙。',end:'风筝回到 Ben 手上，三位朋友一起玩了。营地可以添一件友谊风筝摆件。'}},
 words:SPEEDUP_WORDS,scenes:SPEEDUP_SCENES,tasks:[],missions:SPEEDUP_MISSIONS
};
useLesson(requestedLesson);

function speedUpActivities(){
 if(state.scene===0)return '';
 return `<details class="startup-extra"><summary>第11页 · 分角色演故事</summary>
  <ol><li>选角色。Ben 是风筝的主人，David 和 Mia 来帮忙。两个人也可以轮流演三个角色。</li>
  <li>用纸风筝或书本做道具，演一演“发现风筝卡住 → 递回风筝 → 道谢”。
   <button class="secondary" data-audio="u13-here-you-are">▶ 听递东西的说法</button>
   <button class="secondary" data-audio="u13-thank-you">▶ 听道谢</button></li>
  <li>说出自己的名字和年龄，再发出一起玩的邀请。
   <button class="secondary" data-audio="u13-play-together">▶ 听邀请</button>
   <button class="secondary" data-audio="u13-ok-reply">▶ 听回答</button></li></ol>
  </details><details class="startup-extra"><summary>第11页 · 画写我的朋友卡</summary>
  <p>在课本第11页或一张纸上画一位朋友，照着示范写出名字、年龄和你们的关系。可以用故事人物练习。</p>
  <div class="startup-contractions"><article><b>She is Mia.</b><p>她是米娅。换成你画的朋友的名字。</p><button class="secondary" data-audio="u13-card-name">▶ 听名字示范</button></article>
  <article><b>She is nine.</b><p>她九岁。换成你画的朋友的年龄。</p><button class="secondary" data-audio="u13-card-age">▶ 听年龄示范</button></article></div>
  <p>写男孩时把 She is 换成 He is。最后读一句 We're friends.</p>
  <button class="secondary" data-audio="we-friends">▶ 听关系示范</button></details>`;
}
