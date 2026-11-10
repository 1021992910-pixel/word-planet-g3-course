'use strict';
const NUMBER_FUEL_ART='u4-numbers-around';
const NUMBER_FUEL_LINES={
 around:['u44-around','There are numbers all around us.','我们的身边到处都有数字。'],
 all:['u44-all','Look at all the numbers.','看看所有这些数字。'],
 big:['u44-big','I see a big number.','我看到一个大数字。'],
 little:['u44-little','I see a little number.','我看到一个小数字。'],
 everywhere:['u44-everywhere','There are numbers everywhere.','到处都有数字。'],
 clock:['u44-clock','I see numbers on a clock.','我在钟面上看到了数字。'],
 poem:['u44-poem','I see numbers in a poem.','我在一首诗里看到了数字。'],
 plate:['u44-plate','I see numbers on a number plate.','我在车牌上看到了数字。'],
 own:['u44-my-number','I can see the number six.','我能看到数字六。'],
};

const NUMBER_FUEL_GROUPS=[
 {title:'数字有大有小',words:['big','little']},
 {title:'数字就在身边',words:['all','around','everywhere']},
];
const NUMBER_FUEL_WORDS=[
 ['big','/bɪɡ/','大的','big'],
 ['little','/ˈlɪt.əl/','小的','little'],
 ['all','/ɔːl/','全部；所有','all'],
 ['around','/əˈraʊnd/','在……周围','around'],
 ['everywhere','/ˈev.ri.weə/','到处；各个地方','everywhere'],
 ['all-around','/ɔːl əˈraʊnd/','到处；在四周','around','all around'],
].map(([id,ipa,meaning,line,word=id])=>{
 const [exampleAudio,example,translation]=NUMBER_FUEL_LINES[line];
 const {parts,hint,kind}=GUIDED_DATA[id];
 return {id,word,ipa,meaning,scene:NUMBER_FUEL_ART,exampleAudio,example,translation,
  parts,hint,tip:hint,kind:kind==='phonics'?'拼读小老师':'句中带读'};
});
const NUMBER_FUEL_REVIEW=['number','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve']
 .map(id=>{
  const word=Object.values(LESSONS).flatMap(lesson=>lesson.words).find(entry=>entry.id===id);
  if(!word)throw Error('Missing review word '+id);
  return {...word};
 });
const NUMBER_FUEL_LETTERS=LETTERS5.slice(14,20).map(letter=>({...letter,scene:NUMBER_FUEL_ART}));
const NUMBER_FUEL_MATCH=[
 ['4','four'],['一','one'],['五','five'],['9','nine'],['三','three'],
 ['八','eight'],['六','six'],['Ⅱ','two'],['七','seven'],['10','ten'],
];
const NUMBER_FUEL_SCENES=[
 {id:NUMBER_FUEL_ART,name:'到处找数字',alt:'在校园里，两个孩子注意到墙上的圆钟。',
  summary:'翻到第48页，用外研U学听课本的数字歌谣。听到数字时，在课本图上找一找，再指读蓝色字母。',lines:[NUMBER_FUEL_LINES.around]},
 {id:NUMBER_FUEL_ART,name:'听短音，写字母',summary:'比较 Ii 的字母名和词里的短音，然后练 Oo 到 Tt。',lines:[]},
 {id:NUMBER_FUEL_ART,name:'配数字，听顺序',summary:'同一个数可以有不同写法。先连一连，再听数字出现在哪里。',lines:[]},
];
function numberFuelSpell(word,extra){
 return {id:'u44-spell-'+word,type:'spell',word,audio:word,tilesOnly:true,extra:[extra],
  prompt:'听单词，点字母拼出来',answer:word,hint:'听一遍，再从左往右找字母。'};
}
const NUMBER_FUEL_MISSIONS=[
 {id:'signal',title:'听懂数字探险的暗号',skill:'听短音 · 认字母',icon:'📡',
  story:'离开鸡窝，伙伴们在校园里找数字。先把声音听清楚。',done:'暗号听清了，去拼好词卡。',tasks:[
   {id:'u44-short-i',type:'choice',word:'big',audio:'big',prompt:'听单词。它中间的元音和哪个词一样？',options:['six','five','three'],answer:'six',hint:'听短促的 /ɪ/。选项可以先自己轻声读。'},
   {id:'u44-letter-q',type:'choice',word:'letter-q',audio:'letter-q',prompt:'听字母名，找出对应的小写',options:['p','q','r'],answer:'q',hint:'想想 Oo–Tt 的字母卡。'},
 ]},
 {id:'sound',title:'拼好大小标签',skill:'听整词 · 点字母',icon:'🔧',
  story:'给两张大小不同的数字卡补上单词。',done:'大小标签贴好了。',tasks:[numberFuelSpell('big','e'),numberFuelSpell('little','a')]},
 {id:'supply',title:'收集身边的数字词卡',skill:'听整词 · 点字母',icon:'🎒',
  story:'接着听三个词，每个词都用打乱的字母拼。',done:'三张词卡收好了，去把话排成句。',tasks:[
   numberFuelSpell('all','o'),numberFuelSpell('around','e'),numberFuelSpell('everywhere','a'),
 ]},
 {id:'bridge',title:'排好两句数字发现',skill:'听句子 · 排顺序',icon:'🌉',
  story:'把看到的数字说给伙伴听。',done:'句子排好了，再找找其他数字。',tasks:[
   {id:'u44-order-big',type:'order',word:'big',audio:'u44-big',prompt:'听一听，排成“我看到一个大数字。”',parts:['I','see','a','big','number.'],answer:'I see a big number.',hint:'先找表示“我看到”的两个词。'},
   {id:'u44-order-everywhere',type:'order',word:'everywhere',audio:'u44-everywhere',prompt:'听一听，排成“到处都有数字。”',parts:['There','are','numbers','everywhere.'],answer:'There are numbers everywhere.',hint:'最后是表示“到处”的词。'},
 ]},
 {id:'friends',title:'认数字，听清先后',skill:'数字配对 · 听音排序',icon:'🤝',
  story:'数字可以写在钟面、诗页和车牌上。先听两个数字，再做本站补充排序。',done:'三处数字都找到了。',tasks:[
   {id:'u44-match-two',type:'choice',word:'two',audio:'two',prompt:'哪张卡和听到的数字一样？',options:['Ⅲ','Ⅱ','Ⅳ'],answer:'Ⅱ',hint:'这是罗马数字，数一数有几条竖线。'},
   {id:'u44-match-eight',type:'choice',word:'eight',audio:'eight',prompt:'找到意思一样的汉字数字',options:['七','八','九'],answer:'八',hint:'注意和前后两个数区别开。'},
   {id:'u44-order-places',type:'order',word:'number',audio:'u44-listen-order',prompt:'听完三句话，把数字出现的地方排好',parts:['钟面','诗页','车牌'],answer:'钟面 诗页 车牌',hint:'听每句话最后的地方。词义可以在课本情境里先听。'},
 ]},
 {id:'party',title:'把数字发现说给伙伴听',skill:'听句子 · 自愿开口',icon:'🎉',
  story:'回头找一找身边的数字，选一个介绍给伙伴。',done:'数字探险完成！可以把数字钟面纪念画带回营地。',tasks:[
   {id:'u44-hear-around',type:'choice',word:'all-around',audio:'u44-around',prompt:'这句话告诉我们在哪里能找到数字？',options:['我们身边到处都有','只有钟面上','只在课本里'],answer:'我们身边到处都有',hint:'想想表示“四周”的两个词。'},
   {id:'u44-speak',type:'speak',word:'six',audio:'u44-my-number',prompt:'找一个身边的数字，说给伙伴听',sentence:'I can see the number six.',zh:'我能看到数字六。把 six 换成你看到的数字。',hint:'先听示范，再指着你找到的数字说。'},
 ]},
];
LESSONS['unit4-04']={
 course:{...LESSONS['unit4-03'].course,lessonId:'unit4-04',number:4,chickStory:false,numberFuel:true,
  lessonTitle:'身边的数字',page:'课本第48—49页 · Fuel up',
  description:'数字歌谣 · 短音 /ɪ/ · Oo–Tt · 数字配对与排序',estimated:'三个短环节，可分次完成',heroScene:NUMBER_FUEL_ART,
  wordGroups:NUMBER_FUEL_GROUPS,contextWords:['all-around'],reviewWords:NUMBER_FUEL_REVIEW.map(word=>word.id),
  adventure:{chapter:'第二十七章 · 数字探险',title:'身边的数字',subtitle:'在钟面、诗页和车牌上发现数字。',
   intro:'离开鸡窝，伙伴们沿着小路来到校园，发现数字藏在熟悉的地方。',message:'听声音，拼好词卡，再排出数字出现的顺序。',end:'数字探险完成啦！'}},
 words:[...NUMBER_FUEL_WORDS,...NUMBER_FUEL_REVIEW,...NUMBER_FUEL_LETTERS],
 scenes:NUMBER_FUEL_SCENES,tasks:[],missions:NUMBER_FUEL_MISSIONS,
};
useLesson(requestedLesson);
