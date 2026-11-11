'use strict';

const NUMBER_WRAP_CHECKS=[
 {id:'say-numbers',text:'我会用英语从 1 数到 12。',lesson:'unit4-01'},
 {id:'ask-quantity',text:'我会用 How many…? 问数量，并用数字回答。',lesson:'unit4-05'},
 {id:'act-number-story',text:'我会和伙伴演一个数字故事。',lesson:'unit4-03'},
 {id:'find-numbers',text:'我能找到身边的数字。',lesson:'unit4-04'},
];
const NUMBER_WRAP_FOCUS=['three','six','seven','eight','nine','eleven'];
const NUMBER_WRAP_WORDS=NUMBER_POSTER_NUMBERS.map(id=>{
 const word=LESSONS['unit4-01'].words.find(entry=>entry.id===id);
 if(!word)throw Error('Missing number word '+id);
 return {...word};
});
const NUMBER_WRAP_BOARD=[
 {title:'数朋友',instruction:'数一数有几位朋友。',audio:'u46-friends',answer:['three'],picture:'friends'},
 {title:'数书',instruction:'数一数有几本书。',audio:'u45-books',answer:['six'],picture:'books'},
 {title:'读数字词',instruction:'先自己读，再听示范。',audio:'u36-say-it',answer:['seven','eleven'],print:true},
 {title:'问伙伴',instruction:'问问伙伴，图中有几支铅笔？',audio:'u45-pencils',answer:['five'],picture:'pencils'},
 {title:'数颜色',instruction:'这些字母用了几种颜色？',audio:'u46-colours',answer:['four'],picture:'colours'},
 {title:'读公交车上的数字',instruction:'从左到右，一个一个读。',audio:'u46-bus',answer:['four','seven','three'],reference:'u46-bus-answer',picture:'bus'},
 {title:'接着往下数',instruction:'用英语从 1 数到 12。',audio:'u46-count',answer:NUMBER_POSTER_NUMBERS,sequence:true},
 {title:'再读两个数字词',instruction:'先自己读，再听示范。',audio:'u36-say-it',answer:['three','nine'],print:true},
 {title:'数气球',instruction:'先数一束，再数另一束。',audio:'u46-balloons',answer:['ten'],picture:'balloons'},
 {title:'找字母 i',instruction:'选出含有字母 i 的数字词。',audio:'u46-find-i',answer:['six'],choose:true},
];
const NUMBER_WRAP_NATURE=[
 {id:'snowflake',icon:'❄️',name:'雪花',count:'six',audio:'u46-points',tip:'数课本图中从中心伸出的主枝。'},
 {id:'ladybird',icon:'🐞',name:'瓢虫',count:'seven',audio:'u46-spots',tip:'它背上的黑点叫 spots。'},
 {id:'octopus',icon:'🐙',name:'章鱼',count:'eight',audio:'u46-arms',tip:'数伸出来的腕。'},
];
const NUMBER_WRAP_SCENES=[
 {id:'u4-number-poster',name:'数字十格复习',alt:'两个孩子在桌前数书，准备做数字海报。',
  summary:'打开第52页，对照课本玩数字十格。两人轮流选一格，先说，再听参考。',audio:'u46-friends'},
 {id:'u4-numbers-around',name:'我会了吗？',alt:'两个孩子在校园里看到墙上的钟。',
  summary:'选一项先试一试，能自己完成了再勾选。还不熟的可以回到对应课。',audio:'u46-count'},
 {id:'u4-numbers-nature',name:'找自然里的数字',alt:'两个孩子用放大镜观察叶片上的瓢虫。',
  summary:'对照第53页，数雪花的主枝、瓢虫的黑点和章鱼的腕。再按数字顺序连一连。',audio:'u46-spots'},
];
function numberWrapSpelling(word,extra){
 return {id:'u46-spell-'+word,type:'spell',word,audio:word,tilesOnly:true,extra:[extra],
  prompt:'听数字词，点字母拼出来',answer:word,hint:'先听完整的词，再从第一个字母开始。'};
}
const NUMBER_WRAP_MISSIONS=[
 {id:'signal',title:'接收数字复习信号',skill:'听数字 · 选意思',icon:'📡',
  story:'海报展结束了，伙伴们来到数字复习站。先听两个熟悉的数字。',done:'数字听清啦，去补齐词卡。',tasks:[
   {id:'u46-hear-nine',type:'choice',word:'nine',audio:'nine',prompt:'你听到了哪个数字？',options:['7','9','11'],answer:'9',hint:'可以慢一点再听。'},
   {id:'u46-hear-eleven',type:'choice',word:'eleven',audio:'eleven',prompt:'第二个数字是什么？',options:['7','10','11'],answer:'11',hint:'注意它有三拍。'},
  ]},
 {id:'sound',title:'拼好第一组数字词',skill:'听整词 · 点字母',icon:'🔧',
  story:'给三张数字词卡补上字母。',done:'第一组拼好啦。',tasks:[
   numberWrapSpelling('three','a'),numberWrapSpelling('six','e'),numberWrapSpelling('seven','a'),
  ]},
 {id:'supply',title:'拼好第二组数字词',skill:'听整词 · 点字母',icon:'🎒',
  story:'再拼三个数字。每次都多给了一个字母。',done:'数字词卡齐了，去练问答。',tasks:[
   numberWrapSpelling('eight','a'),numberWrapSpelling('nine','a'),numberWrapSpelling('eleven','i'),
  ]},
 {id:'bridge',title:'把问答排成句子',skill:'听句子 · 排词',icon:'🌉',
  story:'把听到的问句和介绍排好。',done:'可以去自然观察站了。',tasks:[
   {id:'u46-order-question',type:'order',word:'six',audio:'u45-books',prompt:'排出“有几本书？”',parts:['How','many','books?'],answer:'How many books?',hint:'先排表示“多少”的两个词。'},
   {id:'u46-order-balloons',type:'order',word:'three',audio:'u46-three-balloons',prompt:'排出“我能看到三个气球。”',parts:['I','can','see','three','balloons.'],answer:'I can see three balloons.',hint:'先说“我能看到”，再说数量和物品。'},
  ]},
 {id:'friends',title:'给自然里的朋友配数字',skill:'听问题 · 找数字',icon:'🤝',
  story:'看第53页三张图，听问题并找相同的数字。',done:'三组数字都配对啦。',tasks:NUMBER_WRAP_NATURE.map(item=>({
   id:'u46-match-'+item.id,type:'dialogue',word:item.count,audio:item.audio,
   prompt:'看课本第53页的'+item.name+'，选一个数字词。',options:['Six.','Seven.','Eight.'],
   answer:item.count[0].toUpperCase()+item.count.slice(1)+'.',hint:item.tip,
  }))},
 {id:'party',title:'把自然观察说给伙伴听',skill:'读数字 · 自愿开口',icon:'🎉',
  story:'再找一种动物或植物，说说你数到了什么。',done:'第四单元复习完成，可以兑换自然观察纪念画。',tasks:[
   {id:'u46-letter-i',type:'choice',word:'six',audio:'u46-find-i',prompt:'这三个数字词中，哪一个含字母 i？',options:['two','four','six'],answer:'six',hint:'看看三个数字词中间的字母。'},
   {id:'u46-speak',type:'speak',word:'four',audio:'u46-nature',prompt:'找一种动物，问伙伴它有几条腿',sentence:'How many legs can you see?',zh:'你能看到几条腿？可以选猫、小鸟，或你想到的其他动物。',hint:'先听示范，再指着图片或自己的画问。'},
  ]},
];
LESSONS['unit4-06']={
 course:{...LESSONS['unit4-05'].course,lessonId:'unit4-06',number:6,numberPoster:false,numberWrap:true,
  lessonTitle:'数字复习站：找找自然里的数字',page:'课本第52—53页 · Wrap up / Check it / Let’s explore',
  description:'十格复习 · 四项自查 · 数数连点',estimated:'三个短活动，可分次完成',heroScene:'u4-numbers-nature',
  wordGroups:[{title:'第一组数字词',words:NUMBER_WRAP_FOCUS.slice(0,3)},{title:'第二组数字词',words:NUMBER_WRAP_FOCUS.slice(3)}],
  contextWords:[],reviewWords:NUMBER_POSTER_NUMBERS,
  adventure:{chapter:'第二十九章 · 数字复习站',title:'自然里的数字',subtitle:'数一数，找出自然里的数字。',
   intro:'离开数字海报展，伙伴们来到花园，看看还能在哪里发现数字。',message:'听数字、拼词、练问答，再观察自然。',end:'第四单元复习完成！'}},
 words:NUMBER_WRAP_WORDS,scenes:NUMBER_WRAP_SCENES,tasks:[],missions:NUMBER_WRAP_MISSIONS,
};
useLesson(requestedLesson);
