'use strict';
const MIX_LINES={
 title:['u33-title','Magical colours.','有魔力的颜色。'],
 red:['u33-red',"Hello! I'm red.",'你好！我是红色。'],
 yellow:['u33-yellow',"Hello! I'm yellow.",'你好！我是黄色。'],
 blue:['u33-blue',"Hello! I'm blue.",'你好！我是蓝色。'],
 play:['u33-play','Come and play with me!','来和我一起玩吧！'],
 fun:['u33-fun','This is fun!','这真有趣！'],
 black:['u33-black',"It's black.",'它是黑色的。'],
 many:['u33-many','So many colours!','这么多颜色！'],
};
const MIX_WORDS=[
 ['black','/blæk/','黑色','u3-mix-green','black','#242535'],
 ['fun','/fʌn/','有趣的','u3-mix-green','fun'],
 ['so','/səʊ/','这么；如此','u3-mix-green','many'],
 ['many','/ˈmeni/','许多','u3-mix-green','many'],
 ['magical','/ˈmædʒɪkəl/','有魔力的；神奇的','u3-mix-friends','title'],
].map(([id,ipa,meaning,scene,line,swatch])=>{
 const [exampleAudio,example,translation]=MIX_LINES[line];
 const {parts,hint}=GUIDED_DATA[id];
 return {id,word:id,ipa,meaning,scene,exampleAudio,example,translation,parts,hint,tip:hint,kind:'拼读小老师',swatch};
});
const MIX_REVIEW=BALLOON_COLOURS.filter(word=>word.id!=='pink').map(word=>({
 ...word,scene:['red','yellow','blue'].includes(word.id)?'u3-mix-friends':'u3-mix-green',
}));
const MIX_WORD_LIST=[...MIX_WORDS,...MIX_REVIEW];
const MIX_RECIPES=[
 {inputs:['yellow','blue'],result:'green',line:['u33-green','Yellow and blue make green.','黄和蓝在故事里变成绿色。']},
 {inputs:['red','blue'],result:'purple',line:['u33-purple','Red and blue make purple.','红和蓝在故事里变成紫色。']},
 {inputs:['yellow','red'],result:'orange',line:['u33-orange','Yellow and red make orange.','黄和红在故事里变成橙色。']},
 {inputs:['red','yellow','blue'],result:'black',line:['u33-last','In the story, they make black.','在这个故事里，三种颜色混在一起变成黑色。']},
];
const MIX_SCENES=[
 {id:'u3-mix-friends',name:'三位颜色朋友见面',alt:'红、黄、蓝三个颜料小伙伴挥手，旁边有小蹦床。',
  summary:'翻到第34页第1、2格。指着红、黄、蓝，听它们打招呼，再找找哪两位先走向蹦床。',
  lines:[MIX_LINES.red,MIX_LINES.yellow,MIX_LINES.blue,MIX_LINES.play]},
 {id:'u3-mix-green',name:'黄和蓝遇见绿',alt:'黄色和蓝色颜料小伙伴在蹦床上跳，绿色小伙伴出现在它们中间。',
  summary:'看第3、4格。黄和蓝一起跳，绿色小伙伴出现了。先说你看见了什么颜色，再听回答。',
  lines:[BALLOON_LINES.ask,['u32-green',"It's green.",'它是绿色的。'],MIX_RECIPES[0].line]},
 {id:'u3-mix-green',name:'还有哪些颜色？',alt:'黄和蓝变出绿色的原创插图。',
  summary:'接着看第35页第5—7格。更多颜色也来一起跳。找出新出现的橙色、紫色和黑色，再把四道混色题填好。',
  lines:[MIX_LINES.fun,MIX_LINES.black,MIX_LINES.many]},
];
const MIX_QUESTION={audio:'u33-guess',prompt:'按故事，混在一起会出现哪种颜色？'};
const MIX_MISSIONS=[
 {id:'signal',title:'听听颜色们的消息',skill:'听音认色 · 理解故事',icon:'📡',story:'离开魔术气球摊，伙伴们听见蹦床边有声音。来听听谁在打招呼。',done:'认出了颜色朋友，接好声音。',tasks:[
  {id:'u33-hear-yellow',type:'choice',word:'yellow',audio:'u33-yellow',prompt:'哪一位颜色朋友在打招呼？',options:['黄色','绿色','蓝色'],answer:'黄色',hint:'听句尾的颜色词。'},
  {id:'u33-hear-magical',type:'choice',word:'magical',audio:'u33-title',prompt:'故事题目里，magical 是什么意思？',options:['神奇的','安静的','很小的'],answer:'神奇的',hint:'想想颜色一起跳后发生的变化。'},
 ]},
 {id:'sound',title:'接好蹦床旁的声音',skill:'听整词 · 拼合',icon:'🔧',story:'先听一个完整的词，把对应的声音零件排好。',done:'声音接好了，给故事添两张词卡。',tasks:[
  {id:'u33-build-black',type:'build',word:'black',audio:'black',prompt:'听单词，再拼出来',parts:['b','l','a','ck'],answer:'black',hint:'开头两个声音挨在一起，结尾两个字母共读一个音。'},
  {id:'u33-build-fun',type:'build',word:'fun',audio:'fun',prompt:'听单词，再拼出来',parts:['f','u','n'],answer:'fun',hint:'听中间短短的元音。'},
 ]},
 {id:'supply',title:'写两张故事词卡',skill:'听整词 · 独立拼写',icon:'🎒',story:'给最后一格做两张词卡。先听，再自己拼。',done:'词卡齐了，去混色桥。',tasks:[
  {id:'u33-spell-many',type:'spell',word:'many',audio:'many',prompt:'听单词，再独立拼写',extra:['e'],answer:'many',hint:'有两拍，开头的一拍更重。'},
  {id:'u33-spell-so',type:'spell',word:'so',audio:'so',prompt:'听单词，再独立拼写',extra:['a'],answer:'so',hint:'只有两个字母，最后听见一个滑动的元音。'},
 ]},
 {id:'bridge',title:'走过混色句子桥',skill:'读颜色 · 填词 · 组句',icon:'🌉',story:'按故事里发生的顺序找颜色。先想一想，再选词。',done:'三组颜色都接起来了。',tasks:[
  {id:'u33-mix-green',type:'gap',word:'green',...MIX_QUESTION,sentence:'yellow + blue = ___',zh:'黄和蓝混在一起。',options:['green','orange','purple'],answer:'green',hint:'回想第34页第4格。'},
  {id:'u33-mix-purple',type:'gap',word:'purple',...MIX_QUESTION,sentence:'red + blue = ___',zh:'红和蓝混在一起。',options:['black','purple','green'],answer:'purple',hint:'看看第35页第6格的右下方。'},
  {id:'u33-order-orange',type:'order',word:'orange',audio:'u33-orange',prompt:'把“黄和红变成橙色”排成一句',parts:['Yellow','and red','make','orange.'],answer:'Yellow and red make orange.',hint:'先说两种颜色，再说它们变成什么。'},
 ]},
 {id:'friends',title:'替颜色伙伴接上台词',skill:'看图理解 · 接一句',icon:'🤝',story:'蹦床上的朋友越来越多。听一听伙伴的问题，用故事里的线索回答。',done:'台词接得上了，和伙伴演一段。',tasks:[
  {id:'u33-mix-black',type:'gap',word:'black',...MIX_QUESTION,sentence:'red + yellow + blue = ___',zh:'按课本故事的结果填。',options:['orange','green','black'],answer:'black',hint:'回想第6格，三种颜色碰到一起时出现了谁。'},
  {id:'u33-reply-green',type:'dialogue',word:'green',audio:'u32-ask',prompt:'黄和蓝一起跳，冒出了新朋友。你怎么答？',options:["It's green.","It's red.","It's blue."],answer:"It's green.",hint:'想想故事中最先出现的新颜色。'},
 ]},
 {id:'party',title:'轮流当颜色小演员',skill:'理解感叹 · 开口表演',icon:'🎉',story:'挑一种颜色，轮流上场。你可以先听一句示范，再和伙伴读各自的台词。',done:'颜色故事演完啦！可以把颜色蹦床纪念画带回营地。',tasks:[
  {id:'u33-so-many',type:'choice',word:'many',audio:'u33-many',prompt:'最后一句感叹表达了什么？',options:['颜色真多','只有一种颜色','一种颜色也没有'],answer:'颜色真多',hint:'听一听 so many 连在一起的意思。'},
  {id:'u33-act',type:'speak',audio:'u33-blue',prompt:'选一种颜色，跟伙伴打声招呼',sentence:"Hello! I'm blue.",zh:'你好！我是蓝色。也可以换成红色或黄色，再和伙伴演一段。',hint:'轮到你的颜色时，举起对应的色卡再说。'},
 ]},
];
LESSONS['unit3-03']={
 course:{...LESSONS['unit3-02'].course,lessonId:'unit3-03',number:3,balloonStory:false,mixStory:true,
  lessonTitle:'神奇的颜色一起跳',page:'课本第34—35页 · Speed up',
  description:'读颜色故事 · 写混色结果 · 小组表演',estimated:'两组新词，可分次完成',heroScene:'u3-mix-friends',
  wordGroups:[{title:'第一组 · 故事里的三个短词',words:MIX_WORDS.slice(0,3).map(w=>w.id)},
   {title:'第二组 · 先听节奏的两个词',words:MIX_WORDS.slice(3).map(w=>w.id)}],
  contextWords:[],reviewWords:MIX_REVIEW.map(w=>w.id),
  adventure:{chapter:'第二十章 · 颜色蹦床',title:'颜色蹦床',subtitle:'三位颜色朋友一起跳，会发生什么？',
   intro:'从魔术气球摊往前走，伙伴们遇见了蹦床上的颜色朋友。',message:'听故事、拼新词，再给颜色朋友配上台词。',end:'颜色蹦床任务完成！'}},
 words:MIX_WORD_LIST,scenes:MIX_SCENES,tasks:[],missions:MIX_MISSIONS,
};
useLesson(requestedLesson);
