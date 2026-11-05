'use strict';
const SCHOOL_WRAP_CHECKS=[
 {id:'name-supplies',text:'我会说出学习用品的英语名字。',lesson:'unit2-01'},
 {id:'ask-supplies',text:'我会问「这是什么？」和「它是不是……？」，也会回答。',lesson:'unit2-02'},
 {id:'act-story',text:'我能和伙伴演一段失物招领故事。',lesson:'unit2-03'},
 {id:'care-supplies',text:'我会收好并爱护自己的学习用品。',lesson:'unit2-01'},
];
const SCHOOL_WRAP_SCENES=[
 {id:'u2-guess',name:'走一走文具棋盘',audio:'u22-this',alt:'两个孩子用学习用品练习猜物问答。',
  summary:'第28页 Round and round! 两个人对着课本轮流走格子。走到问答格，看图回答。遇到跳过一轮，就换伙伴。'},
 {id:'u2-packing',name:'我会了吗？',audio:'u23-care',alt:'孩子把书收进书包。',
  summary:'第28页 Check it。先做给自己或伙伴看，再勾选。遇到还不熟的一项，可以直接回到对应课。'},
 {id:'u2-writing-tools',name:'以前的人用什么写字？',audio:'u26-use',alt:'三种书写工具从左到右是钢笔、羽毛笔和毛笔。',
  summary:'第29页 Writing through time。看看不同时期和不同地方用过的书写工具。听名字，和课本上的人物连一连。'},
];
const SCHOOL_WRAP_BOARD=[
 {title:'看图问答',prompt:"What's this?",question:'u22-this',reply:"It's an eraser.",answer:'u23-eraser'},
 {title:'读一读',prompt:'pencil',question:'pencil'},
 {title:'看图问答',prompt:"What's this?",question:'u22-this',reply:"It's a schoolbag.",answer:'u26-schoolbag'},
 {title:'猜物问答',prompt:'Is it a pen?',question:'u22-is-pen',reply:"No, it isn't.",answer:'u22-no'},
 {title:'看图问答',prompt:"What's this?",question:'u22-this',reply:"It's a book.",answer:'u22-book'},
 {title:'猜物问答',prompt:'Is it a ruler?',question:'u24-is-ruler',reply:"No, it isn't.",answer:'u22-no'},
 {title:'读一读',prompt:'ruler',question:'ruler'},
 {title:'看图问答',prompt:"What's this?",question:'u22-this',reply:"It's a pen.",answer:'u22-pen'},
 {title:'猜物问答',prompt:'Is it a book?',question:'u26-is-book',reply:"No, it isn't.",answer:'u22-no'},
 {title:'换人',prompt:'跳过一轮，请伙伴走。'},
 {title:'说一说',prompt:'用英语说出你有的学习用品。',reply:'I have a pen, a ruler and an eraser.',answer:'u26-list'},
];
const SCHOOL_WRAP_TOOLS=[
 {id:'pen',word:'pen',ipa:'/pen/',zh:'钢笔',hint:'看金属笔尖。',audio:'u22-pen',sentence:"It's a pen."},
 {id:'quill',word:'quill',ipa:'/kwɪl/',zh:'羽毛笔',hint:'看长长的羽毛和尖尖的羽管。',audio:'u26-quill',sentence:"It's a quill."},
 {id:'brush',word:'brush',ipa:'/brʌʃ/',zh:'毛笔',hint:'看聚在一起的软笔毛。',audio:'u26-brush',sentence:"It's a brush."},
];
const SCHOOL_WRAP_WORDS=['pen','pencil','eraser','ruler','book','schoolbag','pencil-case'].map(id=>{
 const word=Object.values(LESSONS).flatMap(lesson=>lesson.words).find(entry=>entry.id===id);
 return {...word};
});
for(const item of SCHOOL_WRAP_TOOLS.filter(tool=>tool.id!=='pen')){
 const guide=GUIDED_DATA[item.id];
 SCHOOL_WRAP_WORDS.push({id:item.id,word:item.word,ipa:item.ipa,meaning:item.zh,scene:'u2-writing-tools',
  exampleAudio:item.audio,example:item.sentence,translation:'这是一支'+item.zh+'。',
  parts:guide.parts,kind:guide.kind==='phonics'?'拼读小老师':'拓展带读',tip:guide.hint,hint:guide.hint});
}
const SCHOOL_WRAP_MISSIONS=[
 {id:'signal',title:'听一听文具的名字',skill:'听音认物',icon:'📡',story:'设计展结束了，伙伴们来到文具复习站。先听两条用品线索。',done:'听清啦，去拼出熟悉的词。',tasks:[
  {id:'u26-hear-pencil',type:'choice',word:'pencil',audio:'pencil',prompt:'听到的是哪件用品？',options:['钢笔','铅笔','尺子'],answer:'铅笔',hint:'听一听是不是有两拍。'},
  {id:'u26-hear-case',type:'choice',word:'pencil-case',audio:'pencil-case',prompt:'听到的是哪件用品？',options:['笔袋','书包','橡皮'],answer:'笔袋',hint:'这个名称有两个词。'},
 ]},
 {id:'sound',title:'接好两件用品的声音',skill:'听整词 · 拼合',icon:'🔧',story:'听完整词，自己把声音零件排好。',done:'声音接好，来写词。',tasks:[
  {id:'u26-build-pen',type:'build',word:'pen',audio:'pen',prompt:'听单词，再拼出来',parts:['p','e','n'],answer:'pen',hint:'留意中间的短元音。'},
  {id:'u26-build-book',type:'build',word:'book',audio:'book',prompt:'听单词，再拼出来',parts:['b','oo','k'],answer:'book',hint:'中间两个相同的字母一起发短音。'},
 ]},
 {id:'supply',title:'补齐复习词卡',skill:'听整词 · 独立拼写',icon:'🎒',story:'听清用品名字，再写在词卡上。',done:'标签准备好了，来问一问。',tasks:[
  {id:'u26-spell-ruler',type:'spell',word:'ruler',audio:'ruler',prompt:'听用品词，再拼写',extra:['a'],answer:'ruler',hint:'两拍，后面一拍轻。'},
  {id:'u26-spell-eraser',type:'spell',word:'eraser',audio:'eraser',prompt:'听用品词，再拼写',extra:['i'],answer:'eraser',hint:'三拍，中间一拍最重。'},
 ]},
 {id:'bridge',title:'走过文具问答桥',skill:'填词 · 排序 · 肯定回答',icon:'🌉',story:'把认识的用品放回问题和回答里。',done:'问答清楚了，去书写工具展台。',tasks:[
  {id:'u26-an',type:'gap',word:'eraser',audio:'u23-eraser',prompt:'要说“它是一块橡皮”，填上哪一个？',sentence:"It's ___ eraser.",zh:'这是一块橡皮。',options:['a','an'],answer:'an',hint:'听 eraser 开头的声音。'},
  {id:'u26-order-schoolbag',type:'order',word:'schoolbag',audio:'u26-schoolbag',prompt:'把“这是一个书包”排成一句话',parts:["It's",'a','schoolbag.'],answer:"It's a schoolbag.",hint:'先说 It’s。'},
  {id:'u26-is-book',type:'dialogue',word:'book',audio:'u26-is-book',prompt:'伙伴指着一本书问这句话，怎么答？',options:['Yes, it is.',"No, it isn't."],answer:'Yes, it is.',hint:'看看伙伴猜对了没有。'},
 ]},
 {id:'friends',title:'认一认三种书写工具',skill:'听名字 · 辨工具',icon:'🤝',story:'沿着第29页的书写工具展台，听清三种名字，再对照课本连一连。',done:'三种工具都认过啦，介绍你的笔。',tasks:SCHOOL_WRAP_TOOLS.map(item=>({
  id:'u26-tool-'+item.id,type:'choice',word:item.id,audio:item.id,prompt:'听一听，这是什么书写工具？',
  options:SCHOOL_WRAP_TOOLS.map(tool=>tool.zh),answer:item.zh,hint:item.hint,
 }))},
 {id:'party',title:'介绍我的笔，收好文具',skill:'开口 · 用到生活里',icon:'🎉',story:'和伙伴轮流介绍各自的笔。说完，看看怎样爱护它们。',done:'第二单元复习完成！可以把书写工具纪念画带回营地。',tasks:[
  {id:'u26-care',type:'choice',audio:'u23-care',prompt:'听提醒，选一件你可以马上做的事',options:['用完盖上笔帽并放回笔袋','把笔丢在地上','把尺子掰弯'],answer:'用完盖上笔帽并放回笔袋',hint:'想一想什么做法能爱护用品。'},
  {id:'u26-speak',type:'speak',audio:'u26-my-pen',prompt:'拿起自己的笔，介绍给伙伴',sentence:'This is my pen.',zh:'这是我的笔。再请伙伴介绍自己的笔，看看你们的笔有什么不同。',hint:'可以当面说，也可以跟读。'},
 ]},
];
LESSONS['unit2-06']={
 course:{...LESSONS['unit2-05'].course,lessonId:'unit2-06',number:6,design:false,schoolWrap:true,
  lessonTitle:'文具复习站：从羽毛笔到今天',page:'课本第28—29页 · Wrap up / Check it / Let’s explore',
  description:'文具棋盘 · 四项自查 · 认识书写工具',estimated:'三个短环节，可分次完成',heroScene:'u2-writing-tools',
  wordGroups:[{title:'回顾学习用品',words:SCHOOL_WRAP_WORDS.slice(0,7).map(word=>word.id)}],contextWords:['quill'],reviewWords:SCHOOL_WRAP_WORDS.slice(0,7).map(word=>word.id),
  adventure:{chapter:'第十七章 · 文具复习站',title:'文具复习站',subtitle:'把熟悉的文具读出来，再看看不同的笔。',
   intro:'离开文具设计工坊，和伙伴回顾第二单元的旅程。',message:'先认用品、练问答，再介绍自己的笔。',
   end:'第二单元复盘与拓展完成！'}},
 words:SCHOOL_WRAP_WORDS,scenes:SCHOOL_WRAP_SCENES,tasks:[],missions:SCHOOL_WRAP_MISSIONS,
};
useLesson(requestedLesson);
