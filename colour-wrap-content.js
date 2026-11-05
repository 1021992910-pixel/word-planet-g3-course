'use strict';
const COLOUR_WRAP_CHECKS=[
 {id:'name-colours',text:'我会说出颜色的英语名字。',lesson:'unit3-01'},
 {id:'ask-colours',text:'我会用 What colour is it? 和 It’s… 问答颜色。',lesson:'unit3-02'},
 {id:'act-colours',text:'我能和伙伴演一段颜色故事。',lesson:'unit3-03'},
 {id:'find-colours',text:'我能在身边找到不同颜色。',lesson:'unit3-05'},
];
const COLOUR_WRAP_BOARD=[
 {title:'行人信号灯',prompt:'What colour is it?',question:'u32-ask',note:'看课本箭头指向的小人。',colour:'green'},
 {title:'颜料色块',prompt:'Say the colour.',question:'u36-say-colour',colour:'purple'},
 {title:'花朵',prompt:'What colour is it?',question:'u32-ask',note:'说花瓣的颜色。',colour:'red'},
 {title:'读一读',prompt:'Say it.',question:'u36-say-it',printed:'orange',colour:'orange',wordOnly:true},
 {title:'字母 D',prompt:'What colour is it?',question:'u32-ask',note:'说字母的颜色，不是字母名。',colour:'yellow'},
 {title:'颜色朋友',prompt:'What colour is it?',question:'u32-ask',note:'黄和蓝一起变成什么颜色？',colour:'green'},
 {title:'小鸟',prompt:'What colour is it?',question:'u32-ask',colour:'blue'},
 {title:'颜料色块',prompt:'Say the colour.',question:'u36-say-colour',colour:'pink'},
 {title:'熊猫',prompt:'What colour is it?',question:'u32-ask',note:'可以指着黑色部分说；整只熊猫还有白色。',
  reply:"It's black and white.",answer:'u36-panda',zh:'它是黑白相间的。white 表示白色，这里只需听懂。'},
];
const COLOUR_WRAP_PHOTOS=[
 {letter:'A',colour:'green',zh:'绿色'},
 {letter:'B',colour:'blue',zh:'蓝色'},
 {letter:'C',colour:'red',zh:'红色'},
 {letter:'D',colour:'yellow',zh:'黄色'},
];
const COLOUR_WRAP_COLOURS=DISCOVER_COLOURS.map(word=>({...word}));
const COLOUR_WRAP_WORDS=[...COLOUR_WRAP_COLOURS,{...DISCOVER_OTHER_WORDS.find(word=>word.id==='colour')},
 {id:'chameleon',word:'chameleon',ipa:'/kəˈmiː.li.ən/',meaning:'变色龙',scene:'u3-chameleon',
  exampleAudio:'u36-chameleon',example:'Look at the chameleon.',translation:'看看这只变色龙。',
  parts:['chameleon'],kind:'拓展带读',hint:GUIDED_DATA.chameleon.hint,tip:GUIDED_DATA.chameleon.hint},
];
const COLOUR_WRAP_SCENES=[
 {id:'u3-colour-share',name:'玩颜色九宫格',audio:'u32-ask',alt:'两个伙伴举着画，准备互相问答颜色。',
  summary:'第40页 I love colours! 对照自己的课本，看图问答、说颜色、读单词。每次选几格，轮流说。'},
 {id:'u3-mix-green',name:'我会了吗？',audio:'u32-green',alt:'黄和蓝的颜色朋友一起变成了绿色朋友。',
  summary:'第40页 Check it。说颜色、问答、演故事、在身边找颜色。先试一试，再勾选自己会做的。'},
 {id:'u3-chameleon',name:'观察变色龙，涂一涂',audio:'u36-chameleon',alt:'一只绿色变色龙抓着树枝，长尾巴卷起，背景简洁。',
  summary:'第41页 Nature: The chameleon。看课本四张照片，说颜色；再给下面的变色龙涂色，和伙伴聊一聊。'},
];
const COLOUR_WRAP_MISSIONS=[
 {id:'signal',title:'接通颜色复习站',skill:'听音认色',icon:'📡',story:'离开色彩小街，伙伴们来到自然观察站。先听清两条颜色消息。',done:'消息收到，接好拼读机。',tasks:[
  {id:'u36-hear-red',type:'choice',word:'red',audio:'red',prompt:'听到的是哪种颜色？',options:['红色','蓝色','橙色'],answer:'红色',hint:'注意中间的短元音。'},
  {id:'u36-hear-pink',type:'choice',word:'pink',audio:'pink',prompt:'第二条消息是什么颜色？',options:['黄色','粉色','紫色'],answer:'粉色',hint:'听清开头和结尾。'},
 ]},
 {id:'sound',title:'接上熟悉的颜色声音',skill:'听整词 · 拼合',icon:'🔧',story:'先听完整单词，再把声音零件排好。',done:'声音接好了，给观察卡写标签。',tasks:[
  {id:'u36-build-green',type:'build',word:'green',audio:'green',prompt:'听单词，再拼出来',parts:['g','r','ee','n'],answer:'green',hint:'中间两个相同的字母一起发长音。'},
  {id:'u36-build-black',type:'build',word:'black',audio:'black',prompt:'听单词，再拼出来',parts:['b','l','a','ck'],answer:'black',hint:'末尾两个字母合成一个声音。'},
 ]},
 {id:'supply',title:'补齐观察卡标签',skill:'听整词 · 独立拼写',icon:'🎒',story:'听颜色名字，独立拼好两张标签。',done:'标签准备好了，走过句子桥。',tasks:[
  {id:'u36-spell-yellow',type:'spell',word:'yellow',audio:'yellow',prompt:'听颜色词，再拼写',extra:['a'],answer:'yellow',hint:'前一拍重，留意中间重复的字母。'},
  {id:'u36-spell-orange',type:'spell',word:'orange',audio:'orange',prompt:'听颜色词，再拼写',extra:['u'],answer:'orange',hint:'先听两拍的顺序，最后的静音字母也要写。'},
 ]},
 {id:'bridge',title:'走过颜色问答桥',skill:'填词 · 组句 · 句中找词',icon:'🌉',story:'把颜色放回问题和回答里。',done:'问答准备好了，去观察照片。',tasks:[
  {id:'u36-gap-colour',type:'gap',word:'colour',audio:'u32-ask',prompt:'问“它是什么颜色？”，填哪个词？',sentence:'What ___ is it?',zh:'它是什么颜色？',options:['colour','picture','green'],answer:'colour',hint:'这里要填“颜色”。'},
  {id:'u36-order-purple',type:'order',word:'purple',audio:'u32-purple',prompt:'把“它是紫色的”排成一句',parts:["It's",'purple.'],answer:"It's purple.",hint:'先说 It’s，再说颜色。'},
  {id:'u36-find-blue',type:'find',word:'blue',audio:'u32-blue',prompt:'句子里哪个词表示“蓝色的”？',parts:["It's",'blue.'],answer:'blue.',zh:'它是蓝色的。',hint:'听句子里的颜色词。'},
 ]},
 {id:'friends',title:'看看四张变色龙照片',skill:'看课本 · 听问句 · 选回答',icon:'🤝',story:'打开第41页，看字母对应的照片。每次只看指定的一张，再听问题。',done:'照片里的颜色都观察过啦。',tasks:COLOUR_WRAP_PHOTOS.map(item=>({
  id:'u36-photo-'+item.letter.toLowerCase(),type:'dialogue',word:item.colour,audio:'u32-ask',
  prompt:'看自己课本第41页的照片 '+item.letter+'，选一句回答。',
  options:["It's green.","It's blue.","It's red.","It's yellow."],answer:"It's "+item.colour+'.',
  hint:'请看照片里的身体颜色，别只看树枝和背景。',
 }))},
 {id:'party',title:'把自然观察带回营地',skill:'听懂 · 开口运用',icon:'🎉',story:'认识观察站的新朋友，再选一样身边的东西问伙伴颜色。',done:'第三单元复习与拓展完成！可以兑换变色龙观察纪念画。',tasks:[
  {id:'u36-chameleon',type:'choice',word:'chameleon',audio:'chameleon',prompt:'听到的是哪位自然朋友？',options:['变色龙','熊猫','小鸟'],answer:'变色龙',hint:'先听完整名字，不要求背写。'},
  {id:'u36-panda',type:'choice',word:'black',audio:'u36-panda',prompt:'这句话说熊猫是什么颜色？',options:['黑白相间','全身黑色','红色和蓝色'],answer:'黑白相间',hint:'and 把两种颜色连起来，white 表示白色。'},
  {id:'u36-speak',type:'speak',audio:'u32-ask',prompt:'指着自己的涂色或身边物品，问伙伴颜色',sentence:'What colour is it?',zh:'它是什么颜色？请伙伴用 It’s… 回答，再换你来答。',hint:'一次指一处，颜色可以按自己的涂色回答。不必录音。'},
 ]},
];
LESSONS['unit3-06']={
 course:{...LESSONS['unit3-05'].course,lessonId:'unit3-06',number:6,discoverColours:false,colourWrap:true,
  lessonTitle:'颜色复习站：遇见变色龙',page:'课本第40—41页 · Wrap up / Check it / Let’s explore',
  description:'颜色九宫格 · 四项自查 · 变色龙观察涂色',estimated:'三个短环节，可以分次完成',heroScene:'u3-chameleon',
  wordGroups:[{title:'第一组 · 红、粉、绿、黄',words:COLOUR_WRAP_COLOURS.slice(0,4).map(word=>word.id)},
   {title:'第二组 · 橙、蓝、紫、黑',words:COLOUR_WRAP_COLOURS.slice(4).map(word=>word.id)}],
  contextWords:['colour','chameleon'],reviewWords:[...COLOUR_WRAP_COLOURS.map(word=>word.id),'colour'],
  adventure:{chapter:'第二十三章 · 自然观察站',title:'自然观察站',subtitle:'把熟悉的颜色说出来，和自然里的朋友打个招呼。',
   intro:'从色彩小街来到自然观察站，回顾第三单元的颜色旅程。',message:'听颜色、拼词、练问答，再观察变色龙。',end:'第三单元复习与拓展练过啦！'}},
 words:COLOUR_WRAP_WORDS,scenes:COLOUR_WRAP_SCENES,tasks:[],missions:COLOUR_WRAP_MISSIONS,
};
useLesson(requestedLesson);
