'use strict';
const NUMBER_NAMES=[
 ['one','/wʌn/','一'],['two','/tuː/','二'],['three','/θriː/','三'],['four','/fɔː/','四'],
 ['five','/faɪv/','五'],['six','/sɪks/','六'],['seven','/ˈsevən/','七'],['eight','/eɪt/','八'],
 ['nine','/naɪn/','九'],['ten','/ten/','十'],['eleven','/ɪˈlevən/','十一'],['twelve','/twelv/','十二'],
].map(([id,ipa,meaning],i)=>({id,word:id,ipa,meaning,value:i+1,scene:'number-count-'+(i+1),
 exampleAudio:'u41-'+id,example:'I can see '+id+(i===0?' bird.':' birds.'),translation:'我看见'+(i===1?'两':meaning)+'只鸟。',
 parts:GUIDED_DATA[id].parts,tip:GUIDED_DATA[id].hint,hint:GUIDED_DATA[id].hint,
 kind:GUIDED_DATA[id].kind==='context-word'?'特别记一记':'拼读小老师',
}));
const NUMBER_SUPPORT=[
 ['number','/ˈnʌmbə/','数；数字','u41-number','This is a number.','这是一个数字。'],
 ['count','/kaʊnt/','数数','u41-count',"Let's count.",'我们数一数。'],
 ['how','/haʊ/','多少；怎样','u41-how-many','How many birds?','多少只鸟？how many 连起来询问数量。'],
 ['bird','/bɜːd/','鸟','u41-bird','This is a bird.','这是一只鸟。'],
].map(([id,ipa,meaning,exampleAudio,example,translation])=>({id,word:id,ipa,meaning,scene:'u4-three-birds',
 exampleAudio,example,translation,parts:GUIDED_DATA[id].parts,tip:GUIDED_DATA[id].hint,hint:GUIDED_DATA[id].hint,kind:'拼读小老师'}));
const NUMBER_SCENES=[
 {id:'u4-three-birds',name:'先听歌，再认数字',alt:'一根树枝上分开站着三只小鸟，左黄、中蓝、右黄。',
  summary:'打开课本第42—43页，在外研优学听数字歌，边听边指1—12。下方把数字分为三组，今天可以先选一组。本站提供口语示范，不代替教材原歌曲。',
  lines:[['u41-count',"Let's count.",'我们数一数。']]},
 {id:'number-count-3',name:'点一只，数一个',alt:'三只分开的黄色小鸟，逐只点数。',
  summary:'先看本站的小鸟，点一只数一个英语数字。先自己数，再听参考；已经点过的小鸟会有标记，避免重复。',
  lines:[['u41-how-many','How many birds?','多少只鸟？']]},
 {id:'u4-three-birds',name:'回课本找鸟，和伙伴说',alt:'三只小鸟在简洁竹林树枝上，方便看清数目。',
  summary:'第42—43页 Look and find。对照自己的课本，从左到右找鸟，一只一只指着数，再和伙伴交换。本站原创小鸟不是教材原图的数量答案。',
  lines:[['u41-book-question','How many birds are in the picture?','图里有多少只鸟？']]},
];
const NUMBER_MISSIONS=[
 {id:'signal',title:'接收小鸟的数字消息',skill:'听数字 · 认数量',icon:'📡',story:'离开自然观察站，伙伴们来到数鸟竹林。先听四条数字消息。',done:'消息听清啦，给拼读机接好声音。',tasks:[1,2,5,8].map(n=>({
  id:'u41-hear-'+n,type:'choice',word:NUMBER_NAMES[n-1].id,audio:NUMBER_NAMES[n-1].id,
  prompt:'听到的是哪个数字？',options:[String(n),String(n%12+1),String((n+3)%12+1)],answer:String(n),hint:'再听一次，不用着急。',
 }))},
 {id:'sound',title:'接好数字的声音',skill:'听整词 · 拼合',icon:'🔧',story:'先听完整单词，再自己排好声音零件。',done:'声音接好了，来写标签。',tasks:[
  {id:'u41-build-three',type:'build',word:'three',audio:'three',prompt:'听单词，再拼出来',parts:['th','r','ee'],answer:'three',hint:'开头和结尾各有一组字母组合。'},
  {id:'u41-build-four',type:'build',word:'four',audio:'four',prompt:'听单词，再拼出来',parts:['f','our'],answer:'four',hint:'后面三个字母在这里合成一组声音。'},
  {id:'u41-build-six',type:'build',word:'six',audio:'six',prompt:'听单词，再拼出来',parts:['s','i','x'],answer:'six',hint:'最后一个字母连着发两个辅音。'},
 ]},
 {id:'supply',title:'写好三张数字标签',skill:'听整词 · 独立拼写',icon:'🎒',story:'竹林观察卡需要三张标签。听清数字词，再选字母拼写。',done:'标签准备好，走过句子桥。',tasks:[
  {id:'u41-spell-seven',type:'spell',word:'seven',audio:'seven',prompt:'听数字词，再拼写',extra:['a'],answer:'seven',hint:'先听两拍，前一拍重。'},
  {id:'u41-spell-ten',type:'spell',word:'ten',audio:'ten',prompt:'听数字词，再拼写',extra:['i'],answer:'ten',hint:'三个字母，中间是短元音。'},
  {id:'u41-spell-nine',type:'spell',word:'nine',audio:'nine',prompt:'听数字词，再拼写',extra:['a'],answer:'nine',hint:'这个词以前学过，最后的静音字母别漏。'},
 ]},
 {id:'bridge',title:'走过数鸟句子桥',skill:'填词 · 组句 · 句中找词',icon:'🌉',story:'把数量放进句子，再问一问伙伴。',done:'句子接好了，去看小鸟。',tasks:[
  {id:'u41-gap-how',type:'gap',word:'how',audio:'u41-how-many',prompt:'要问“多少只鸟？”，填哪个词？',sentence:'___ many birds?',zh:'多少只鸟？',options:['How','What','Hello'],answer:'How',hint:'和 many 连起来询问数量。'},
  {id:'u41-order-eleven',type:'order',word:'eleven',audio:'u41-eleven',prompt:'把“我看见十一只鸟”排成一句',parts:['I','can see','eleven','birds.'],answer:'I can see eleven birds.',hint:'先说谁看见，再说数量和小鸟。'},
  {id:'u41-find-bird',type:'find',word:'bird',audio:'u41-one',prompt:'哪个词表示“鸟”？',parts:['I','can','see','one','bird.'],answer:'bird.',zh:'我看见一只鸟。',hint:'一只用 bird，多只时常听到 birds。'},
 ]},
 {id:'friends',title:'看清小鸟，回答数量',skill:'看图 · 听问题 · 回答',icon:'🤝',story:'每题先数图里的小鸟，再听问题。这里是本站原创数量图。',done:'数量数清啦，再听最后几条消息。',tasks:[4,12].map(n=>({
  id:'u41-picture-'+n,type:'dialogue',word:NUMBER_NAMES[n-1].id,audio:'u41-how-many',
  scene:'number-count-'+n,sceneAlt:'一组分开排列的小鸟，请逐只点数。',prompt:'数数上图的小鸟，选一个回答。',
  options:n===4?['Three.','Four.','Five.']:['Ten.','Eleven.','Twelve.'],answer:n===4?'Four.':'Twelve.',hint:'每只只数一次，一行数完再数下一行。',
 }))},
 {id:'party',title:'分享竹林里的数字发现',skill:'听懂 · 开口运用',icon:'🎉',story:'认清两个数鸟小词，再把自己数到的鸟说给伙伴听。',done:'数鸟竹林任务完成！可以兑换三只小鸟纪念画。',tasks:[
  {id:'u41-number',type:'choice',word:'number',audio:'number',prompt:'这个词是什么意思？',options:['数字','颜色','小鸟'],answer:'数字',hint:'想想本单元要学习的内容。'},
  {id:'u41-count',type:'choice',word:'count',audio:'u41-count',prompt:'伙伴邀请你做什么？',options:['一起数数','一起告别','一起合上书'],answer:'一起数数',hint:'从一开始，按顺序说数字。'},
  {id:'u41-eight',type:'choice',word:'eight',audio:'u41-eight',prompt:'这句话说看见多少只鸟？',options:['8只','11只','12只'],answer:'8只',hint:'听 can see 后面的数字。'},
  {id:'u41-twelve',type:'choice',word:'twelve',audio:'u41-twelve',prompt:'最后这句话说看见多少只鸟？',options:['2只','10只','12只'],answer:'12只',hint:'留意结尾连在一起的辅音。'},
  {id:'u41-speak',type:'speak',audio:'u41-three',scene:'u4-three-birds',sceneAlt:'一根树枝上有三只分开的鸟。',prompt:'数清上图的小鸟，试着说一句',sentence:'I can see three birds.',zh:'我看见三只鸟。再数一数自己课本里的鸟，按实际数量说。',hint:'可以先跟读，也可以不录音。'},
 ]},
];
LESSONS['unit4-01']={
 course:{...LESSONS['unit3-06'].course,lessonId:'unit4-01',unitId:'unit4',number:1,colourWrap:false,numbers:true,
  section:'Unit 4 · Fun with numbers',lessonTitle:'数鸟竹林：认识1—12',page:'课本第42—43页 · Get ready',
  description:'听数字歌 · 三组慢拼读 · 看图数鸟',estimated:'三组数字，可分次完成',heroScene:'u4-three-birds',
  wordGroups:[{title:'第一组 · 1—4',words:NUMBER_NAMES.slice(0,4).map(w=>w.id)},
   {title:'第二组 · 5—8',words:NUMBER_NAMES.slice(4,8).map(w=>w.id)},
   {title:'第三组 · 9—12',words:NUMBER_NAMES.slice(8).map(w=>w.id)}],
  contextWords:NUMBER_SUPPORT.map(w=>w.id),reviewWords:['nine'],
  adventure:{chapter:'第二十四章 · 数鸟竹林',title:'数鸟竹林',subtitle:'点一只，数一个，把数量说给伙伴听。',
   intro:'告别自然观察站的变色龙，伙伴们来到小鸟停歇的竹林。',message:'分组学数字，听词拼读，最后看图说数量。',end:'数鸟竹林任务完成！'}},
 words:[...NUMBER_NAMES,...NUMBER_SUPPORT],scenes:NUMBER_SCENES,tasks:[],missions:NUMBER_MISSIONS,
};
useLesson(requestedLesson);
