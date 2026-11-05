'use strict';
const PAINT_LINES={
 picture:['u34-picture','Look at my colourful picture.','看看我这幅多彩的画。'],
 today:['u34-today',"Let's paint today.",'今天我们来画画吧。'],
 paint:['u34-paint',"Let's paint a picture for National Day.",'我们来为国庆节画一幅画吧。'],
 national:['u34-national','This picture is for National Day.','这幅画是为国庆节画的。'],
 everyone:['u34-everyone','Everyone can paint.','每个人都可以画画。'],
 red:['u34-red','I paint with red.','我用红色来画。'],
 yellow:['u34-yellow','I paint with yellow.','我用黄色来画。'],
 green:['u34-green','I paint with green.','我用绿色来画。'],
};
const PAINT_NEW_WORDS=[
 ['picture','/ˈpɪktʃə/','画；图画','picture'],
 ['today','/təˈdeɪ/','今天','today'],
 ['paint','/peɪnt/','画；作画','paint'],
 ['national-day','/ˌnæʃənəl ˈdeɪ/','国庆节','national','National Day'],
].map(([id,ipa,meaning,line,word=id])=>{
 const [exampleAudio,example,translation]=PAINT_LINES[line];
 const {parts,hint,kind}=GUIDED_DATA[id];
 return {id,word,ipa,meaning,scene:'u3-painting',exampleAudio,example,translation,parts,hint,tip:hint,
  kind:kind==='phonics'?'拼读小老师':'句中带读'};
});
const PAINT_REVIEW=['everyone','colourful','happy','red','yellow','green','orange','purple','pink'].map(id=>{
 const original=Object.values(LESSONS).flatMap(lesson=>lesson.words).find(word=>word.id===id);
 if(!original)throw Error('Missing review word '+id);
 const line=id==='everyone'?'everyone':id==='colourful'?'picture':id==='red'?'red':id==='yellow'?'yellow':id==='green'?'green':null;
 if(!line)return {...original};
 const [exampleAudio,example,translation]=PAINT_LINES[line];
 return {...original,scene:'u3-painting',exampleAudio,example,translation};
});
const PAINT_LETTERS=LETTERS5.slice(7,14).map(letter=>({...letter,scene:'u3-painting'}));
const PAINT_PICTURES=[
 {id:'panda',label:'熊猫画',colours:'黑色',audio:'u34-listen-panda'},
 {id:'flowers',label:'花束画',colours:'橙色、紫色',audio:'u34-listen-flowers'},
 {id:'cake',label:'寿桃蛋糕画',colours:'粉色',audio:'u34-listen-cake'},
 {id:'lantern',label:'灯笼画',colours:'红色、黄色',audio:'u34-listen-lantern'},
];
const PAINT_SCENES=[
 {id:'u3-painting',name:'为国庆节画一幅画',alt:'两个孩子在桌前画一朵红花和绿叶，旁边放着红、黄、绿三罐颜料。',
  summary:'从颜色蹦床来到画画工坊。翻到第36页，听外研U学的原韵律歌，指一指课本里标成蓝色的字母。再用下面的句子练开口。',
  lines:[PAINT_LINES.today,PAINT_LINES.paint,PAINT_LINES.everyone]},
 {id:'u3-painting',name:'听 Hh 到 Nn，再写一写',alt:'两个孩子在画画工坊一起学习。',
  summary:'第36页还有 Hh—Nn 的大小写和笔顺。先听字母名，再回自己的课本对照箭头，在四线三格里写。',
  lines:[]},
 {id:'u3-painting',name:'听画面，画出自己的作品',alt:'两个孩子一起画一幅红花绿叶的画。',
  summary:'第37页先听音排序，再为国庆节画一幅图，和伙伴分享。先用外研U学完成课本原题，再试试本站的补充练习。',
  lines:[PAINT_LINES.picture,PAINT_LINES.red,PAINT_LINES.green,PAINT_LINES.national]},
];
const PAINT_MISSIONS=[
 {id:'signal',title:'听画画工坊的邀请',skill:'听音认意',icon:'📡',story:'离开颜色蹦床，伙伴们收到画画工坊的邀请。听清今天要做什么。',done:'听清邀请啦，接好声音。',tasks:[
  {id:'u34-hear-today',type:'choice',word:'today',audio:'u34-today',prompt:'这句话邀请我们什么时候画画？',options:['今天','明天','昨天'],answer:'今天',hint:'听句尾表示时间的词。'},
  {id:'u34-hear-picture',type:'choice',word:'picture',audio:'u34-picture',prompt:'伙伴请我们看什么？',options:['一幅多彩的画','一只书包','一本书'],answer:'一幅多彩的画',hint:'听 my 后面介绍的东西。'},
 ]},
 {id:'sound',title:'接好画画的声音',skill:'听整词 · 拼合',icon:'🔧',story:'听完整单词，再把声音零件排成一个词。',done:'声音接好了，给作品写标签。',tasks:[
  {id:'u34-build-paint',type:'build',word:'paint',audio:'paint',prompt:'听单词，再拼出来',parts:['p','ai','n','t'],answer:'paint',hint:'中间两个字母一起读一个音。'},
  {id:'u34-build-picture',type:'build',word:'picture',audio:'picture',prompt:'听单词，再拼出来',parts:['p','i','c','t','ure'],answer:'picture',hint:'有两拍，前一拍更响亮，最后一组轻读。'},
 ]},
 {id:'supply',title:'收好画作和字母标签',skill:'拼写 · 大小写',icon:'🎒',story:'先拼一个动作词，再给字母找出另一种写法。',done:'标签准备好了，去句子桥。',tasks:[
  {id:'u34-spell-paint',type:'spell',word:'paint',audio:'paint',prompt:'听单词，再独立拼写',extra:['e'],answer:'paint',hint:'听清中间的元音，再想想对应的组合。'},
  {id:'u34-letter-m',type:'choice',word:'letter-m',audio:'letter-m',prompt:'听字母名，找出它的小写',options:['n','m','h'],answer:'m',hint:'回想第36页的大小写配对。'},
 ]},
 {id:'bridge',title:'把画作介绍接成句子',skill:'填词 · 排句',icon:'🌉',story:'告诉伙伴今天要做什么，也说说这幅画是送给哪个节日的。',done:'句子接好了，听听其他人的画。',tasks:[
  {id:'u34-gap-today',type:'gap',word:'today',audio:'u34-today',prompt:'补上表示“今天”的词',sentence:"Let's paint ___.",zh:'今天我们来画画吧。',options:['today','picture','paint'],answer:'today',hint:'这里需要表示时间的词。'},
  {id:'u34-order-national',type:'order',word:'national-day',audio:'u34-national',prompt:'把“这幅画是为国庆节画的”排成一句',parts:['This picture','is for','National Day.'],answer:'This picture is for National Day.',hint:'先介绍这幅画，再说它是为哪个节日画的。'},
 ]},
 {id:'friends',title:'听听画作的顺序',skill:'听颜色线索 · 排序',icon:'🤝',story:'伙伴们把作品带来工坊。下面是本站补充听力，听颜色和画面线索，再排出介绍顺序。',done:'作品介绍顺序听清啦，轮到你来画。',tasks:[
  {id:'u34-listen-panda',type:'choice',word:'picture',audio:'u34-listen-panda',prompt:'伙伴介绍的是哪幅画？',options:PAINT_PICTURES.map(item=>item.label),answer:'熊猫画',hint:'听到了黑色，再留意画的名字。'},
  {id:'u34-listen-flowers',type:'choice',word:'orange',audio:'u34-listen-flowers',prompt:'伙伴用了橙色、紫色来画什么？',options:PAINT_PICTURES.map(item=>item.label),answer:'花束画',hint:'最后听到的是 flowers。'},
  {id:'u34-listen-order',type:'order',word:'picture',audio:'u34-order',prompt:'听完整段，按介绍顺序排列四幅画',parts:['灯笼画','熊猫画','寿桃蛋糕画','花束画'],answer:'灯笼画 熊猫画 寿桃蛋糕画 花束画',hint:'先听红和黄，再听黑，接着粉，最后橙和紫。'},
 ]},
 {id:'party',title:'把自己的画说给伙伴听',skill:'理解 · 自愿开口',icon:'🎉',story:'用纸和笔画一幅国庆节的画，选一两种颜色介绍给伙伴。',done:'画画工坊任务完成！可以把红花画作纪念画带回营地。',tasks:[
  {id:'u34-everyone',type:'choice',word:'everyone',audio:'u34-everyone',prompt:'这句话邀请谁来画画？',options:['每个人','只有一个人','只有老师'],answer:'每个人',hint:'听开头的词，它指大家。'},
  {id:'u34-share',type:'speak',audio:'u34-picture',prompt:'举起自己的画，介绍给伙伴听',sentence:'Look at my colourful picture.',zh:'看看我这幅多彩的画。也可以接着用 I paint with… 说说自己用的颜色。',hint:'先跟读一句，再指自己的画说。'},
 ]},
];
LESSONS['unit3-04']={
 course:{...LESSONS['unit3-03'].course,lessonId:'unit3-04',number:4,mixStory:false,paintWorkshop:true,
  lessonTitle:'画一幅多彩的国庆画',page:'课本第36—37页 · Fuel up',
  description:'听韵律歌 · 写 Hh—Nn · 听画面、画作品',estimated:'三个短环节，可分次完成',heroScene:'u3-painting',
  wordGroups:[{title:'画画时用到的三个词',words:['picture','today','paint']}],
  contextWords:['national-day'],reviewWords:PAINT_REVIEW.map(word=>word.id),
  adventure:{chapter:'第二十一章 · 画画工坊',title:'画画工坊',subtitle:'把喜欢的颜色画下来，再说给伙伴听。',
   intro:'从颜色蹦床往前走，伙伴们来到了画画工坊。',message:'听单词、写字母，再听懂画面、介绍自己的作品。',end:'画画工坊任务完成！'}},
 words:[...PAINT_NEW_WORDS,...PAINT_REVIEW,...PAINT_LETTERS],scenes:PAINT_SCENES,tasks:[],missions:PAINT_MISSIONS,
};
useLesson(requestedLesson);
