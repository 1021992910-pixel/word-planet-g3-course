'use strict';
const DISCOVER_COLOURS=[...COLOUR_NAMES,MIX_WORDS.find(word=>word.id==='black')].map(word=>({
 ...word,scene:word.id==='yellow'||word.id==='blue'?'u3-colour-street':'u3-colour-share',
 exampleAudio:word.id==='black'?'u33-black':'u32-'+word.id,
 example:"It's "+word.id+'.',translation:'它是'+word.meaning+'的。',
}));
const DISCOVER_OTHER_WORDS=['colour','picture'].map(id=>{
 const source=Object.values(LESSONS).flatMap(lesson=>lesson.words).find(word=>word.id===id);
 return {...source,scene:'u3-colour-share'};
});
const DISCOVER_WORDS=[...DISCOVER_COLOURS,...DISCOVER_OTHER_WORDS];
const DISCOVER_SCENES=[
 {id:'u3-colour-street',name:'看房屋，问颜色',alt:'男孩指向左边黄色房屋，女孩看着右边蓝色房屋。',
  summary:'打开第38页，看台州和威尼斯的照片。先指着箭头指向的房屋问，再用颜色词回答。下面是本站的简洁情境示意。',
  lines:[BALLOON_LINES.ask,['u32-yellow',"It's yellow.",'它是黄色的。'],['u32-blue',"It's blue.",'它是蓝色的。']]},
 {id:'u3-colour-share',name:'在身边找颜色，画下来',alt:'男孩举着画，图里有绿树、黄色太阳和蓝色云朵，女孩指着树冠。',
  summary:'第39页活动2。看看身边的物品和景色，挑两三种颜色，画一幅自己的图。可以画树、花、房屋，也可以画你发现的别的东西。',
  lines:[['u31-point','Look! I can see green.','看！我看见绿色。'],PAINT_LINES.picture]},
 {id:'u3-colour-share',name:'举起图，和伙伴轮流问',alt:'女孩指着画里的绿色树冠，男孩正准备回答。',
  summary:'第39页活动3。一个人指着画里的某个部分问，另一个人看清后回答，再交换角色。图里女孩指着绿色树冠，你会怎样答？',
  lines:[BALLOON_LINES.ask,['u32-green',"It's green.",'它是绿色的。']]},
];
const DISCOVER_MISSIONS=[
 {id:'signal',title:'听听色彩小街的消息',skill:'听音认色',icon:'📡',story:'离开画画工坊，伙伴们来到色彩小街。听清两种颜色，准备一起找一找。',done:'颜色听清啦，给拼读机接好声音。',tasks:[
  {id:'u35-hear-red',type:'choice',word:'red',audio:'u32-red',prompt:'伙伴说的是什么颜色？',options:['红色','蓝色','黑色'],answer:'红色',hint:'听 It’s 后面的颜色词。'},
  {id:'u35-hear-orange',type:'choice',word:'orange',audio:'u32-orange',prompt:'第二条消息说的是什么颜色？',options:['紫色','橙色','绿色'],answer:'橙色',hint:'这是一个有两拍的颜色词。'},
 ]},
 {id:'sound',title:'接好两种颜色的声音',skill:'听整词 · 拼合',icon:'🔧',story:'先听完整单词，再自己把声音零件排好。',done:'声音接好了，给色卡写名字。',tasks:[
  {id:'u35-build-blue',type:'build',word:'blue',audio:'blue',prompt:'听单词，再拼出来',parts:['b','l','ue'],answer:'blue',hint:'开头两个声音靠紧，最后是长音。'},
  {id:'u35-build-green',type:'build',word:'green',audio:'green',prompt:'听单词，再拼出来',parts:['g','r','ee','n'],answer:'green',hint:'中间两个相同字母一起发一个长音。'},
 ]},
 {id:'supply',title:'给找色卡写标签',skill:'听整词 · 独立拼写',icon:'🎒',story:'给找到的颜色做标签。听清声音，再选字母拼写。',done:'色卡标签写好了，去句子桥。',tasks:[
  {id:'u35-spell-yellow',type:'spell',word:'yellow',audio:'yellow',prompt:'听颜色词，再独立拼写',extra:['a'],answer:'yellow',hint:'两拍，前一拍重。留意中间相同的两个字母。'},
  {id:'u35-spell-pink',type:'spell',word:'pink',audio:'pink',prompt:'听颜色词，再独立拼写',extra:['e'],answer:'pink',hint:'听清短元音和最后的辅音。'},
 ]},
 {id:'bridge',title:'接上问颜色的句子',skill:'填词 · 组句 · 句中找词',icon:'🌉',story:'把颜色放进问答，再说说你画的是什么。',done:'问答准备好了，去和伙伴看图说。',tasks:[
  {id:'u35-gap-colour',type:'gap',word:'colour',audio:'u32-ask',prompt:'问“它是什么颜色？”，填哪个词？',sentence:'What ___ is it?',zh:'它是什么颜色？',options:['colour','picture','blue'],answer:'colour',hint:'这里需要表示“颜色”的词。'},
  {id:'u35-order-purple',type:'order',word:'purple',audio:'u32-purple',prompt:'把“它是紫色的”排成一句',parts:["It's",'purple.'],answer:"It's purple.",hint:'先说 It’s，再说颜色。'},
  {id:'u35-find-picture',type:'find',word:'picture',audio:'u34-picture',prompt:'句子里哪个词表示“图画”？',parts:['Look','at','my','colourful','picture.'],answer:'picture.',zh:'看看我这幅多彩的画。',hint:'听句子最后的词。'},
 ]},
 {id:'friends',title:'指着图，和伙伴问答',skill:'看图 · 情境问答',icon:'🤝',story:'先看清伙伴指的是哪一部分，再听问题，选一句回答。',done:'图中的颜色说清楚了，去分享你自己的发现。',tasks:[
  {id:'u35-house-yellow',type:'dialogue',word:'yellow',audio:'u32-ask',scene:'u3-colour-street',sceneAlt:'男孩指着左边黄色房屋的外墙。',
   prompt:'男孩指着左边房屋的外墙，怎么回答？',options:["It's yellow.","It's blue.","It's pink."],answer:"It's yellow.",hint:'看他手指指向的那面墙。'},
  {id:'u35-tree-green',type:'dialogue',word:'green',audio:'u32-ask',scene:'u3-colour-share',sceneAlt:'女孩指着画里的绿色树冠。',
   prompt:'女孩指着画里的树冠，怎么回答？',options:["It's blue.","It's orange.","It's green."],answer:"It's green.",hint:'看树冠的颜色，云朵和太阳是另外两种颜色。'},
 ]},
 {id:'party',title:'把找到的颜色说出来',skill:'听懂 · 开口运用',icon:'🎉',story:'把自己身边的颜色带到小街分享。听完最后一条消息，再选一样东西和伙伴问答。',done:'色彩小街任务完成！可以把找色分享纪念画带回营地。',tasks:[
  {id:'u35-hear-black',type:'choice',word:'black',audio:'u33-black',prompt:'最后这条消息说的是什么颜色？',options:['黑色','黄色','粉色'],answer:'黑色',hint:'听开头两个连在一起的辅音。'},
  {id:'u35-share',type:'speak',audio:'u32-ask',prompt:'指着自己的画或身边物品，问伙伴颜色',sentence:'What colour is it?',zh:'它是什么颜色？请伙伴用 It’s… 回答，再交换角色。',hint:'一次只指一个部分，让伙伴看清楚再问。'},
 ]},
];
LESSONS['unit3-05']={
 course:{...LESSONS['unit3-04'].course,lessonId:'unit3-05',number:5,paintWorkshop:false,discoverColours:true,
  lessonTitle:'发现身边的颜色',page:'课本第38—39页 · Hit it big',
  description:'看照片问颜色 · 找色画图 · 同伴问答',estimated:'三个小活动，可分次完成',heroScene:'u3-colour-street',
  wordGroups:[{title:'第一组 · 红、粉、绿、黄',words:DISCOVER_COLOURS.slice(0,4).map(word=>word.id)},
   {title:'第二组 · 橙、蓝、紫、黑',words:DISCOVER_COLOURS.slice(4).map(word=>word.id)}],
  contextWords:['colour','picture'],reviewWords:DISCOVER_WORDS.map(word=>word.id),
  adventure:{chapter:'第二十二章 · 色彩小街',title:'色彩小街',subtitle:'身边的每一种颜色，都可以成为一句问答。',
   intro:'从画画工坊往前走，伙伴们来到色彩小街。',message:'听颜色、拼词、看图，再分享自己的发现。',end:'色彩小街任务完成！'}},
 words:DISCOVER_WORDS,scenes:DISCOVER_SCENES,tasks:[],missions:DISCOVER_MISSIONS,
};
useLesson(requestedLesson);
