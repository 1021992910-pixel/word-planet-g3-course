'use strict';
const COLOUR_NAMES=[
 ['red','/red/','红色','#d63235','u3-umbrellas','This umbrella is red.','这把伞是红色的。'],
 ['pink','/pɪŋk/','粉色','#ef6ba3','u3-umbrellas','This umbrella is pink.','这把伞是粉色的。'],
 ['green','/ɡriːn/','绿色','#448b3d','u3-umbrellas','This umbrella is green.','这把伞是绿色的。'],
 ['yellow','/ˈjeləʊ/','黄色','#f2ca2b','u3-umbrellas','This umbrella is yellow.','这把伞是黄色的。'],
 ['orange','/ˈɒrɪndʒ/','橙色','#ef791a','u3-clothes','The raincoat is orange.','这件雨衣是橙色的。'],
 ['blue','/bluː/','蓝色','#2368b3','u3-clothes','The jumper is blue.','这件套头衫是蓝色的。'],
 ['purple','/ˈpɜːpəl/','紫色','#7a429c','u3-clothes','The scarf is purple.','这条围巾是紫色的。'],
].map(([id,ipa,meaning,swatch,scene,example,translation])=>({
 id,word:id,ipa,meaning,swatch,scene,example,translation,exampleAudio:'u31-'+id,
 parts:GUIDED_DATA[id].parts,tip:GUIDED_DATA[id].hint,hint:GUIDED_DATA[id].hint,kind:'拼读小老师',
}));
const COLOUR_CONTEXT=[
 ['colourful','/ˈkʌləfəl/','色彩丰富的','u3-clothes','u31-title',"It's a colourful world!",'这是个多彩的世界！'],
 ['world','/wɜːld/','世界','u3-clothes','u31-title',"It's a colourful world!",'这是个多彩的世界！'],
 ['hooray','/həˈreɪ/','好哇！','u3-umbrellas','u31-hooray','Hooray! The rain has stopped!','好哇！雨停了！'],
 ['umbrella','/ʌmˈbrelə/','雨伞','u3-umbrellas','u31-umbrellas','I can see four umbrellas.','我看见四把雨伞。'],
 ['clothes','/kləʊðz/','衣服','u3-clothes','u31-clothes','Our clothes are colourful.','我们的衣服五颜六色。'],
 ['rainbow','/ˈreɪnbəʊ/','彩虹','u3-clothes','u31-rainbow','There is a rainbow in the sky.','天上有一道彩虹。'],
].map(([id,ipa,meaning,scene,exampleAudio,example,translation])=>({
 id,word:id,ipa,meaning,scene,exampleAudio,example,translation,
 parts:GUIDED_DATA[id].parts,tip:GUIDED_DATA[id].hint,hint:GUIDED_DATA[id].hint,kind:'情境带读',
}));
const COLOUR_SCENES=[
 {id:'u3-umbrellas',name:'先看四把雨伞',alt:'四把撑开的雨伞从左到右是红色、粉色、绿色、黄色。',
  summary:'雨停啦！听一句，指一把伞。再听听四把伞的颜色。',
  lines:[['u31-hooray','Hooray! The rain has stopped!','好哇！雨停了！'],['u31-umbrellas','I can see four umbrellas.','我看见四把雨伞。']],
  colours:COLOUR_NAMES.slice(0,4)},
 {id:'u3-clothes',name:'再看三件衣服',alt:'一件橙色雨衣、一件蓝色套头衫和一条紫色围巾挂在窗前，窗外有彩虹。',
  summary:'从左往右看一看雨衣、套头衫和围巾，再听它们的颜色。',
  lines:[['u31-clothes','Our clothes are colourful.','我们的衣服五颜六色。']],
  colours:COLOUR_NAMES.slice(4)},
 {id:'u3-clothes',name:'回到课本找颜色',alt:'窗外有彩虹，窗前挂着三件不同颜色的衣物。',
  summary:'听听彩虹的英语怎么说。翻开第30—31页，再去课本的大图里找颜色。',
  lines:[['u31-rainbow','There is a rainbow in the sky.','天上有一道彩虹。'],['u31-point','Look! I can see green.','看！我看见绿色。']],
  colours:[]},
];
const COLOUR_MISSIONS=[
 {id:'signal',title:'听清雨伞的颜色',skill:'听音认色',icon:'📡',story:'雨停以后，彩虹找色站发来四条消息。听一听，每条说的是哪种颜色？',done:'四条消息听清啦，给拼读机接好声音。',tasks:COLOUR_NAMES.slice(0,4).map((item,i)=>({
  id:'u31-hear-'+item.id,type:'choice',word:item.id,audio:item.id,prompt:'听到的是哪种颜色？',
  options:[0,1,3].map(offset=>COLOUR_NAMES[(i+offset)%4].meaning),answer:item.meaning,
  hint:'再听一次，想想雨后那四把伞。',
 }))},
 {id:'sound',title:'接好两组声音',skill:'听整词 · 拼合',icon:'🔧',story:'先听完整颜色词，再把声音零件排好。',done:'接好了，试着自己拼写。',tasks:[
  {id:'u31-build-green',type:'build',word:'green',audio:'green',prompt:'听单词，再拼出来',parts:['g','r','ee','n'],answer:'green',hint:'中间有一个长音，由两个相同字母表示。'},
  {id:'u31-build-blue',type:'build',word:'blue',audio:'blue',prompt:'听单词，再拼出来',parts:['b','l','ue'],answer:'blue',hint:'开头两个声音靠紧，最后是一个长音。'},
 ]},
 {id:'supply',title:'写两张颜色标签',skill:'听整词 · 独立拼写',icon:'🎒',story:'给伞架做两张标签。先听整词，再选字母拼写。',done:'颜色标签写好了，去走句子桥。',tasks:[
  {id:'u31-spell-red',type:'spell',word:'red',audio:'red',prompt:'听颜色词，再拼写',extra:['i'],answer:'red',hint:'仔细听中间短短的元音。'},
  {id:'u31-spell-pink',type:'spell',word:'pink',audio:'pink',prompt:'听颜色词，再拼写',extra:['e'],answer:'pink',hint:'留意最后两个字母表示的声音。'},
 ]},
 {id:'bridge',title:'把颜色放进句子',skill:'填词 · 句中找词 · 组句',icon:'🌉',story:'衣服上还有两个颜色。填一填、找一找，再拼一句彩虹的话。',done:'句子桥接好了，去找伙伴。',tasks:[
  {id:'u31-gap-orange',type:'gap',word:'orange',audio:'u31-orange',prompt:'要说“雨衣是橙色的”，填哪个词？',sentence:'The raincoat is ___.',zh:'这件雨衣是橙色的。',options:['orange','purple','green'],answer:'orange',hint:'想一想图片左边雨衣的颜色。'},
  {id:'u31-find-purple',type:'find',word:'purple',audio:'u31-purple',prompt:'哪一个词告诉我们围巾是什么颜色？',parts:['The','scarf','is','purple.'],answer:'purple.',zh:'这条围巾是紫色的。',hint:'听一听句子最后的词。'},
  {id:'u31-order-rainbow',type:'order',word:'rainbow',audio:'u31-rainbow',prompt:'把“天上有一道彩虹”排成一句话',parts:['There is','a rainbow','in the sky.'],answer:'There is a rainbow in the sky.',hint:'先说 There is，再告诉伙伴你看到了什么。'},
 ]},
 {id:'friends',title:'和伙伴一起找',skill:'听词 · 场景理解',icon:'🤝',story:'伙伴来到窗边。听一听，选出他们说的东西或看到的景象。',done:'找到啦！准备给伙伴介绍窗外的颜色。',tasks:[
  {id:'u31-hear-umbrella',type:'choice',word:'umbrella',audio:'umbrella',prompt:'伙伴说的是哪样东西？',options:['衣服','雨伞','彩虹'],answer:'雨伞',hint:'下雨时可以撑着它。'},
  {id:'u31-hear-clothes',type:'choice',word:'clothes',audio:'clothes',prompt:'这个词说的是哪一类东西？',options:['彩虹','衣服','雨伞'],answer:'衣服',hint:'雨衣、套头衫和围巾都可以归到这一类。'},
  {id:'u31-hear-colourful',type:'choice',word:'colourful',audio:'colourful',prompt:'听这个词，哪种景象最合适？',options:['好多种颜色','只有一种颜色','没有任何颜色'],answer:'好多种颜色',hint:'想一想窗外的彩虹。'},
 ]},
 {id:'party',title:'介绍我看到的颜色',skill:'听懂 · 联系场景 · 开口',icon:'🎉',story:'从彩虹找色站带走一句话，指给伙伴看你身边的颜色。',done:'彩虹找色站完成啦！可以把彩虹窗景纪念画带回营地。',tasks:[
  {id:'u31-hear-world',type:'choice',word:'world',audio:'world',prompt:'这个词是什么意思？',options:['世界','颜色','雨伞'],answer:'世界',hint:'想一想本单元的题目。'},
  {id:'u31-hear-hooray',type:'choice',word:'hooray',audio:'u31-hooray',prompt:'雨停了，伙伴开头喊了一声。这一声表达什么？',options:['开心、庆祝','请别人安静','想和别人告别'],answer:'开心、庆祝',hint:'留意第一声的语气。'},
  {id:'u31-say-colour',type:'speak',audio:'u31-point',prompt:'指一指身边的颜色，说给伙伴听',sentence:'Look! I can see green.',zh:'看！我看见绿色。试着换成你找到的颜色。',hint:'先听示范，再指着一样东西说。'},
 ]},
];
LESSONS['unit3-01']={
 course:{...LESSONS['unit2-06'].course,lessonId:'unit3-01',unitId:'unit3',number:1,schoolWrap:false,colours:true,
  section:'Unit 3 · It’s a colourful world!',lessonTitle:'雨过天晴，找找七种颜色',page:'课本第30—31页 · Get ready',
  description:'颜色歌 · 看图找色 · 把颜色放进句子',estimated:'两组颜色，可分次完成',heroScene:'u3-clothes',
  wordGroups:[{title:'第一组 · 伞上的四种颜色',words:COLOUR_NAMES.slice(0,4).map(w=>w.id)},
   {title:'第二组 · 衣服上的三种颜色',words:COLOUR_NAMES.slice(4).map(w=>w.id)}],
  contextWords:COLOUR_CONTEXT.map(w=>w.id),reviewWords:[],
  adventure:{chapter:'第十八章 · 彩虹找色站',title:'彩虹找色站',subtitle:'雨停了，窗外出现了一道彩虹。',
   intro:'离开文具复习站后，伙伴们来到了雨后的彩虹找色站。',message:'听颜色、拼单词，再把看到的颜色说给伙伴听。',
   end:'彩虹找色任务完成！'}},
 words:[...COLOUR_NAMES,...COLOUR_CONTEXT],scenes:COLOUR_SCENES,tasks:[],missions:COLOUR_MISSIONS,
};
useLesson(requestedLesson);
