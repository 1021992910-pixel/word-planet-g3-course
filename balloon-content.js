'use strict';
const BALLOON_LINES={
 want:['u32-want','I want a balloon!','我想要一个气球！'],
 ask:['u32-ask','What colour is it?','它是什么颜色？'],
 see:['u32-see','What colours can you see?','你能看见哪些颜色？'],
 can:['u32-can','Can you see a red balloon?','你能看见一个红色气球吗？'],
 point:['u32-point','I can see blue and red.','我能看见蓝色和红色。'],
 right:['u32-right',"You're right!",'你说对了！'],
 first:['u32-first','My first balloon is red.','我的第一个气球是红色的。'],
 here:['u32-here','Here is your blue balloon.','这是你的蓝色气球。'],
 back:['u32-back','Come back, Bobo!','波波，回来！'],
};
const BALLOON_WORDS=[
 ['want','/wɒnt/','想要','u3-blue-balloon','want'],
 ['balloon','/bəˈluːn/','气球','u3-blue-balloon','want'],
 ['colour','/ˈkʌlə/','颜色','u3-red-balloon','ask'],
 ['right','/raɪt/','正确的；对的','u3-red-balloon','right'],
 ['can','/kæn/','能；会','u3-red-balloon','can'],
 ['see','/siː/','看见','u3-red-balloon','point'],
 ['first','/fɜːst/','第一的','u3-red-balloon','first'],
].map(([id,ipa,meaning,scene,line])=>{
 const [exampleAudio,example,translation]=BALLOON_LINES[line];
 const {parts,hint}=GUIDED_DATA[id];
 return {id,word:id,ipa,meaning,scene,exampleAudio,example,translation,parts,hint,tip:hint,kind:'拼读小老师'};
});
const BALLOON_COLOURS=COLOUR_NAMES.map(word=>({...word,scene:word.id==='blue'?'u3-blue-balloon':word.id==='red'?'u3-red-balloon':word.scene,
 exampleAudio:'u32-'+word.id,example:"It's "+word.id+'.',translation:'它是'+word.meaning+'的。',
}));
const BALLOON_STORY=[
 {id:'u3-blue-balloon',name:'魔术师变出蓝气球',alt:'魔术师把一只蓝气球递给孩子，旁边的白色机器人正看着。',
  summary:'看课本第1、2格。一个孩子想要气球。魔术师请他猜颜色，然后递给他一只蓝气球。',
  lines:[BALLOON_LINES.want,BALLOON_LINES.ask,['u32-blue',"It's blue.",'它是蓝色的。'],BALLOON_LINES.here]},
 {id:'u3-red-balloon',name:'波波猜中了红气球',alt:'魔术师举起一只红色气球，白色机器人高兴地指着它。',
  summary:'看第3格。波波也想要气球。魔术师又问颜色，波波猜对了。',
  lines:[BALLOON_LINES.ask,['u32-red',"It's red.",'它是红色的。'],BALLOON_LINES.right]},
 {id:'u3-red-balloon',name:'波波去哪儿了？',alt:'魔术师和白色机器人看着一只红气球。',
  summary:'回课本看第4、5格。波波猜出更多颜色。后来，许多气球把波波带到了半空中。指一指课本里你能看到的颜色。',
  lines:[BALLOON_LINES.see,BALLOON_LINES.point,BALLOON_LINES.back]},
];
const BALLOON_PATTERNS=[
 {label:'书',colours:['red','yellow','blue','red','yellow'],answer:'blue'},
 {label:'书包',colours:['orange','blue','orange','blue','orange'],answer:'blue'},
 {label:'铅笔',colours:['green','green','pink','green','green'],answer:'pink'},
 {label:'苹果',colours:['orange','red','red','orange','red'],answer:'red'},
];
const BALLOON_LETTERS=['red','pink','green','yellow','blue','red','green','orange','purple'].map((colour,i)=>({
 letter:String.fromCharCode(65+i),colour,
}));
const BALLOON_MISSIONS=[
 {id:'signal',title:'接收气球摊的消息',skill:'听音认意 · 故事理解',icon:'📡',story:'离开彩虹找色站，伙伴们来到魔术气球摊。听一听，找出气球的线索。',done:'听到了气球的线索，接好拼读机。',tasks:[
  {id:'u32-hear-want',type:'choice',word:'want',audio:'u32-want',prompt:'孩子想要什么？',options:['一个气球','一把雨伞','一本书'],answer:'一个气球',hint:'听 want 后面提到的东西。'},
  {id:'u32-first-balloon',type:'choice',word:'first',audio:'u32-bobo-first',prompt:'回想课本第3格，波波的第一只气球是什么颜色？',options:['红色','蓝色','黄色'],answer:'红色',hint:'蓝色那只是另一个孩子先拿到的。'},
  {id:'u32-can-meaning',type:'choice',word:'can',audio:'u32-can',prompt:'这句话是在问什么？',options:['你能看见一个红气球吗？','你想要一只蓝气球吗？','这是第一只气球吗？'],answer:'你能看见一个红气球吗？',hint:'听 Can you 后面的动作和颜色。'},
 ]},
 {id:'sound',title:'接好气球摊的声音',skill:'听整词 · 拼合',icon:'🔧',story:'先听完整单词，再排好每块声音零件。',done:'拼读机接好了，给气球做标签。',tasks:[
  {id:'u32-build-balloon',type:'build',word:'balloon',audio:'balloon',prompt:'听单词，再拼出来',parts:['b','a','ll','oo','n'],answer:'balloon',hint:'这个词有两拍，后一拍更重。'},
  {id:'u32-build-see',type:'build',word:'see',audio:'see',prompt:'听单词，再拼出来',parts:['s','ee'],answer:'see',hint:'结尾有两个相同的字母，共同发一个长音。'},
 ]},
 {id:'supply',title:'补上两张词卡',skill:'听整词 · 独立拼写',icon:'🎒',story:'给故事做两张词卡。听完再写，可以随时重听。',done:'词卡做好了，去句子桥问颜色。',tasks:[
  {id:'u32-spell-want',type:'spell',word:'want',audio:'want',prompt:'听单词，再独立拼写',extra:['e'],answer:'want',hint:'听清开头，再听最后两个辅音。'},
  {id:'u32-spell-right',type:'spell',word:'right',audio:'right',prompt:'听单词，再独立拼写',extra:['e'],answer:'right',hint:'中间三个字母一起读一个音。'},
 ]},
 {id:'bridge',title:'走过颜色句子桥',skill:'填词 · 找词 · 组句',icon:'🌉',story:'用一句话问颜色，再把气球的颜色说清楚。',done:'句子桥接好了，和伙伴问答。',tasks:[
  {id:'u32-gap-colour',type:'gap',word:'colour',audio:'u32-ask',prompt:'想问“它是什么颜色？”，这里填什么？',sentence:'What ___ is it?',zh:'它是什么颜色？',options:['colour','balloon','first'],answer:'colour',hint:'空格里要放表示“颜色”的词。'},
  {id:'u32-find-blue',type:'find',word:'blue',audio:'u32-here',prompt:'点出表示颜色的词',parts:['Here','is','your','blue','balloon.'],answer:'blue',zh:'这是你的蓝气球。',hint:'听气球前面的那个词。'},
  {id:'u32-order-ask',type:'order',word:'colour',audio:'u32-ask',prompt:'把问颜色的话排成一句',parts:['What','colour','is','it?'],answer:'What colour is it?',hint:'先问 What，再说想知道的是哪一类信息。'},
 ]},
 {id:'friends',title:'和伙伴说颜色',skill:'情境问答 · 找规律',icon:'🤝',story:'先猜波波的气球颜色，再看课本里字母和涂色的规律。',done:'问答都接上啦，最后开口说给伙伴听。',tasks:[
  {id:'u32-reply-red',type:'dialogue',word:'red',audio:'u32-ask',prompt:'波波指着他拿到的第一只气球，怎么回答？',options:["It's yellow.","It's red.","It's orange."],answer:"It's red.",hint:'想想课本第3格。'},
  {id:'u32-pencil-pattern',type:'choice',word:'pink',audio:'u32-pencil-colour',prompt:'铅笔按“绿、绿、粉”重复，第六支涂什么颜色？',options:['粉色','绿色','蓝色'],answer:'粉色',hint:'每三支一组，找第二组的最后一支。'},
  {id:'u32-letter-f',type:'dialogue',word:'red',audio:'u32-f',prompt:'看课本第33页或本站字母颜色栏，怎么回答？',options:["It's red.","It's green.","It's blue."],answer:"It's red.",hint:'找到字母 F 看一看。'},
 ]},
 {id:'party',title:'试着自己问一次',skill:'听懂 · 开口运用',icon:'🎉',story:'从气球摊带走一句问颜色的话，在身边找一个物品练一练。',done:'气球摊任务完成！可以把红气球纪念画带回营地。',tasks:[
  {id:'u32-colours-listen',type:'choice',word:'see',audio:'u32-point',prompt:'听到了哪两种颜色？',options:['蓝色和红色','黄色和绿色','红色和粉色'],answer:'蓝色和红色',hint:'and 把两种颜色连在一起。'},
  {id:'u32-speak',type:'speak',audio:'u32-ask',prompt:'指一样物品，问伙伴它是什么颜色',sentence:'What colour is it?',zh:'它是什么颜色？请伙伴用 It’s… 回答，然后交换。',hint:'先听示范，再轮流问答。'},
 ]},
];
LESSONS['unit3-02']={
 course:{...LESSONS['unit3-01'].course,lessonId:'unit3-02',number:2,colours:false,balloonStory:true,
  lessonTitle:'波波的第一只气球',page:'课本第32—33页 · Start up',
  description:'猜气球颜色 · 找规律涂色 · 问答颜色',estimated:'两组新词，可分次完成',heroScene:'u3-blue-balloon',
  wordGroups:[{title:'第一组 · 气球摊上听到的四个词',words:BALLOON_WORDS.slice(0,4).map(w=>w.id)},
   {title:'第二组 · 看图问答的三个词',words:BALLOON_WORDS.slice(4).map(w=>w.id)}],
  contextWords:[],reviewWords:BALLOON_COLOURS.map(w=>w.id),
  adventure:{chapter:'第十九章 · 魔术气球摊',title:'魔术气球摊',subtitle:'波波会拿到什么颜色的气球？',
   intro:'从彩虹找色站往前走，伙伴们来到了魔术气球摊。',message:'听颜色线索、拼词、排句，再问伙伴身边的颜色。',end:'魔术气球摊任务完成！'}},
 words:[...BALLOON_WORDS,...BALLOON_COLOURS],scenes:BALLOON_STORY,tasks:[],missions:BALLOON_MISSIONS,
};
useLesson(requestedLesson);
