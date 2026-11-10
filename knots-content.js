'use strict';
const KNOT_ASK=['u42-knots','How many Chinese knots?','有几个中国结？'];
const KNOT_ROPES=['u42-ropes','How many ropes?','有几根绳？'];
const KNOT_ONE=['u42-one-rope','Only one rope!','只有一根绳！'];
const KNOT_WHO=['u42-who','Who can make a Chinese knot?','谁会编中国结？'];
const KNOT_COUNTS=[
 [4,'u42-four-knots','Four Chinese knots.','四个中国结。'],
 [3,'u42-three-knots','Three Chinese knots.','三个中国结。'],
 [2,'u42-two-knots','Two Chinese knots.','两个中国结。'],
];
const KNOT_NEW=[
 ['rope','rope','/rəʊp/','绳','u4-knot-rope',KNOT_ROPES],
 ['make','make','/meɪk/','制作；编做','u4-knot-show',['u42-make','I can make a Chinese knot.','我会编中国结。']],
 ['only','only','/ˈəʊnli/','只；仅仅','u4-knot-rope',KNOT_ONE],
 ['show','show','/ʃəʊ/','给……看','u4-knot-show',['u42-show','Let me show you.','让我做给你看。']],
 ['beautiful','beautiful','/ˈbjuːtɪfəl/','美丽的','u4-knot-show',['u42-beautiful','What a beautiful knot!','多漂亮的结呀！']],
 ['amazing','amazing','/əˈmeɪzɪŋ/','令人惊讶的','u4-knot-rope',['u42-amazing','One rope? Amazing!','一根绳？太神奇了！']],
 ['who','who','/huː/','谁','u4-knot-show',KNOT_WHO],
 ['chinese-knot','Chinese knot','/ˌtʃaɪˈniːz nɒt/','中国结','u4-knot-show',['u42-knot','This is a Chinese knot.','这是一个中国结。']],
].map(([id,word,ipa,meaning,scene,[exampleAudio,example,translation]])=>({
 id,word,ipa,meaning,scene,exampleAudio,example,translation,
 parts:GUIDED_DATA[id].parts,tip:GUIDED_DATA[id].hint,hint:GUIDED_DATA[id].hint,
 kind:GUIDED_DATA[id].kind==='phonics'?'拼读小老师':'放进句子听一听',
}));
const KNOT_REVIEW=[
 ['how','u4-knot-show',KNOT_ROPES],['one','u4-knot-rope',KNOT_ONE],
 ['six','u4-knot-show',['six','Six.','六。']],['twelve','u4-knot-show',['twelve','Twelve.','十二。']],
 ['pencil','u2-writing',['u42-pencils','How many pencils?','有几支铅笔？']],
 ['eraser','u2-writing',['u42-erasers','How many erasers?','有几块橡皮？']],
].map(([id,scene,[exampleAudio,example,translation]])=>({
 ...Object.values(LESSONS).flatMap(lesson=>lesson.words).find(word=>word.id===id),
 scene,exampleAudio,example,translation,
}));
const KNOT_SCENES=[
 {id:'u4-knot-show',name:'先看，再猜',alt:'一位同学举起红色中国结给同伴看。',
  summary:'对照第44页的第1—3格。看一看谁在展示中国结，伙伴们猜了几个数字？',
  lines:[['u42-knot','This is a Chinese knot.','这是一个中国结。'],KNOT_WHO,KNOT_ROPES]},
 {id:'u4-knot-rope',name:'一根绳的秘密',alt:'一位同学拉起一根连续的红绳，让伙伴看清它的两端。',
  summary:'读第44页的第4—5格。找出绳子的数量，再看看同学们怎样跟着学。',
  lines:[KNOT_ONE,['u42-show','Let me show you.','让我做给你看。']]},
 {id:'knot-count-3',name:'数一数，问伙伴',alt:'分开放着三个红色中国结。',
  summary:'到第45页，换成数中国结。每个结数一次，再换成桌上的文具问一问。',
  lines:[KNOT_ASK]},
];
const KNOT_MISSIONS=[
 {id:'signal',title:'听懂工坊的消息',skill:'听音 · 认意思',icon:'📡',story:'伙伴们从数鸟竹林来到手工桌，先听听桌上有什么。',done:'消息听清啦，再接好新词的声音。',tasks:[
  {id:'u42-hear-knot',type:'choice',word:'chinese-knot',audio:'chinese-knot',prompt:'听到的是哪样物品？',options:['中国结','气球','书包'],answer:'中国结',hint:'想想同学举起来的手工作品。'},
  {id:'u42-hear-one',type:'choice',word:'only',audio:'u42-one-rope',prompt:'这个结用了几根绳？',options:['六根','一根','十二根'],answer:'一根',hint:'再听一遍数量词。'},
 ]},
 {id:'sound',title:'接好工坊的拼读机',skill:'听整词 · 拼合',icon:'🔧',story:'先听老师读完整单词，再自己排列字母组合。',done:'声音接好了，可以写标签啦。',tasks:[
  {id:'u42-build-show',type:'build',word:'show',audio:'show',prompt:'听完整词，再拼出来',parts:['sh','ow'],answer:'show',hint:'两组字母分别对应开头的辅音和后面的元音。'},
  {id:'u42-build-only',type:'build',word:'only',audio:'only',prompt:'听完整词，再拼出来',parts:['o','n','l','y'],answer:'only',hint:'先听重读的第一拍，结尾是轻短的声音。'},
 ]},
 {id:'supply',title:'写好手工材料标签',skill:'听整词 · 独立拼写',icon:'🎒',story:'听完整词，再给手工材料和动作写标签。',done:'标签写好了，去接句子。',tasks:[
  {id:'u42-spell-rope',type:'spell',word:'rope',audio:'rope',prompt:'听单词，再用字母拼写',extra:['a'],answer:'rope',hint:'注意长元音的拼写，最后有一个不单独发音的 e。'},
  {id:'u42-write-make',type:'write',word:'make',audio:'make',prompt:'听单词，再自己拼写',zh:'制作；编做',answer:'make',hint:'听中间的长元音，想想词尾有没有一个静音字母。'},
 ]},
 {id:'bridge',title:'把工坊里的话连成句',skill:'排序 · 写句子 · 找词',icon:'🌉',story:'先问数量，再把看到的东西说给伙伴听。',done:'句子接好了，拿上数数卡。',tasks:[
  {id:'u42-gap-who',type:'gap',word:'who',audio:'u42-who',prompt:'问“谁会编中国结？”，句首填什么？',sentence:'___ can make a Chinese knot?',zh:'谁会编中国结？',options:['Who','How','One'],answer:'Who',hint:'问题想知道的是一个人。'},
  {id:'u42-order-knot',type:'order',word:'chinese-knot',audio:'u42-knot',prompt:'排成一句“这是一个中国结。”',parts:['This','is','a','Chinese knot.'],answer:'This is a Chinese knot.',hint:'先从 This 开始介绍。'},
  {id:'u42-write-one-rope',type:'write',audio:'u42-one-rope',prompt:'听一听，把整句话写出来',zh:'只有一根绳！',answer:'Only one rope!',hint:'先写“只有”，再写数量，最后写材料。'},
  {id:'u42-find-beautiful',type:'find',word:'beautiful',audio:'u42-beautiful',prompt:'句子里哪个词表示“美丽的”？',parts:['What','a','beautiful','knot!'],answer:'beautiful',zh:'多漂亮的结呀！',hint:'它在 knot 前面，描述这个结好看。'},
 ]},
 {id:'friends',title:'数清中国结，再回答',skill:'看图 · 听问句 · 说数量',icon:'🤝',story:'一张卡上有几个中国结？先看图数，再回答。',done:'三张卡数清啦，去和伙伴交换角色。',tasks:KNOT_COUNTS.map(([count,,answer])=>({
  id:'u42-count-'+count,type:'dialogue',word:'chinese-knot',audio:'u42-knots',scene:'knot-count-'+count,
  sceneAlt:'一组分开的中国结，请逐个点数。',prompt:'看图数中国结，选一个回答。',
  options:[answer,count===2?'One Chinese knot.':'Two Chinese knots.',count===4?'Three Chinese knots.':'Five Chinese knots.'],
  answer,hint:'从左往右数，每个中国结只数一次。',
 }))},
 {id:'party',title:'当一回工坊小讲解员',skill:'听懂 · 迁移 · 自愿开口',icon:'🎉',story:'数完中国结，换成文具问伙伴，再说一说你的发现。',done:'手工桌上的数字任务完成！可以兑换中国结纪念画。',tasks:[
  {id:'u42-amazing',type:'choice',word:'amazing',audio:'u42-amazing',prompt:'听到的最后一个词表示什么？',options:['令人惊讶的','仅仅','制作'],answer:'令人惊讶的',hint:'伙伴听到一根绳，觉得很神奇。'},
  {id:'u42-write-pencils',type:'write',audio:'u42-pencils',prompt:'把这句问话写出来',zh:'有几支铅笔？',answer:'How many pencils?',hint:'先想询问数量的两个词，最后写要数的东西。'},
  {id:'u42-contrast-show',type:'gap',word:'show',audio:'u42-show',prompt:'哪个词能放进这句话？',sentence:'Let me ___ you.',zh:'让我做给你看。',options:['show','how'],answer:'show',hint:'这里要填“给……看”。留意开头的字母和听到的元音。'},
  {id:'u42-speak',type:'speak',audio:'u42-knots',scene:'knot-count-3',sceneAlt:'一组分开的中国结。',
   prompt:'先问有几个中国结，再自己回答',sentence:'How many Chinese knots?',zh:'有几个中国结？数完说出英文数字。也可以把 Chinese knots 换成 pencils，和伙伴互相问。',hint:'可以先听示范，自愿录音。'},
 ]},
];
LESSONS['unit4-02']={
 course:{...LESSONS['unit4-01'].course,lessonId:'unit4-02',number:2,numbers:false,knotStory:true,
  lessonTitle:'中国结工坊：一根绳的秘密',page:'课本第44—45页 · Start up',
  description:'看中国结 · 听音拼读 · 用 How many 问数量',estimated:'三段情境，两组词卡，可分次完成',heroScene:'u4-knot-show',
  wordGroups:[{title:'工坊里的四个词',words:['rope','make','only','show']},
   {title:'故事里的声音与表达',words:['beautiful','amazing','who','chinese-knot']}],
  contextWords:['who','chinese-knot'],reviewWords:KNOT_REVIEW.map(w=>w.id),
  adventure:{chapter:'第二十五章 · 中国结工坊',title:'中国结工坊',subtitle:'找出一根绳的秘密，数一数手工作品。',
   intro:'离开数鸟竹林，伙伴们到了手工桌。红绳绕了好几圈，到底用了几根？',
   message:'先听故事，再拼新词，最后用英语问一问数量。',end:'中国结工坊的任务完成啦！'}},
 words:[...KNOT_NEW,...KNOT_REVIEW],scenes:KNOT_SCENES,tasks:[],missions:KNOT_MISSIONS,
};
useLesson(requestedLesson);
