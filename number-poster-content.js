'use strict';
const NUMBER_POSTER_ITEMS=[
 {id:'book',label:'书',plural:'books',audio:'u45-books'},
 {id:'schoolbag',label:'书包',plural:'schoolbags',audio:'u45-schoolbags'},
 {id:'pencil',label:'铅笔',plural:'pencils',audio:'u45-pencils'},
 {id:'ruler',label:'尺子',plural:'rulers',audio:'u45-rulers'},
 {id:'eraser',label:'橡皮',plural:'erasers',audio:'u45-erasers'},
 {id:'teacher',label:'老师',plural:'teachers',audio:'u45-teachers'},
];
const NUMBER_POSTER_NUMBERS=['one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve'];
const NumberPosterModel={
 blank:()=>({counts:{},drawn:false,shared:false,updated:0}),
 sanitize(raw){
  const next=this.blank();
  for(const {id} of NUMBER_POSTER_ITEMS){
   const count=raw?.counts?.[id];
   if(Number.isInteger(count)&&count>=1&&count<=12)next.counts[id]=count;
  }
  next.drawn=raw?.drawn===true&&Object.keys(next.counts).length>0;
  next.shared=raw?.shared===true&&Object.keys(next.counts).length>0;
  next.updated=Number.isFinite(raw?.updated)?Math.max(0,raw.updated):0;
  return next;
 },
 plan(previous,counts,now=Date.now()){
  const next=this.sanitize({counts,updated:now});
  if(JSON.stringify(next.counts)===JSON.stringify(previous.counts))return previous;
  return next;
 },
 merge(left,right){
  return this.sanitize((left?.updated||0)>(right?.updated||0)?left:right);
 },
};
const NUMBER_POSTER_TEACHER={
 id:'teacher',word:'teacher',ipa:'/ˈtiːtʃə/',meaning:'老师',scene:'morning',
 exampleAudio:'u45-teacher',example:'This is my teacher.',translation:'这是我的老师。',
 parts:GUIDED_DATA.teacher.parts,hint:GUIDED_DATA.teacher.hint,tip:GUIDED_DATA.teacher.hint,kind:'拼读小老师',
};
const NUMBER_POSTER_WORDS=[
 ...['book','schoolbag','pencil','ruler','eraser','how','one','three','five','twelve'].map(id=>{
  const original=Object.values(LESSONS).flatMap(lesson=>lesson.words).find(word=>word.id===id);
  if(!original)throw Error('Missing poster word '+id);
  const item=NUMBER_POSTER_ITEMS.find(item=>item.id===id);
  return item?{...original,exampleAudio:item.audio,example:'How many '+item.plural+'?',translation:'有几'+(id==='book'?'本':id==='pencil'?'支':id==='ruler'?'把':id==='eraser'?'块':'个')+item.label+'？'}:{...original};
 }),
 NUMBER_POSTER_TEACHER,
];
const NUMBER_POSTER_SCENES=[
 {id:'u4-number-poster',name:'数身边的东西',alt:'两个孩子在桌前数书和铅笔，准备做数字海报。',
  summary:'第50页先想一想，身边有多少书、书包、铅笔、尺子、橡皮和老师。教材里的数只是示例，自己的海报要先数再填。',
  lines:[['u45-books','How many books?','有几本书？'],['u45-teachers','How many teachers?','有几位老师？']]},
 {id:'u4-number-poster',name:'做我的数字海报',alt:'孩子在桌前用纸制作数字海报。',
  summary:'第51页 Make your poster。先选你想介绍的几项，在数字卡里填数量，再拿纸画一张 Me in numbers 海报。',
  lines:[['u45-choose','I have three pencils.','我有三支铅笔。'],['u45-one-bag','I have one schoolbag.','我有一个书包。']]},
 {id:'u4-number-poster',name:'拿着海报轮流问答',alt:'两个孩子在桌前交流自己的海报。',
  summary:'第51页和伙伴问答。一人指着海报问，另一人看清自己的数量再答，然后交换角色。',
  lines:[['u45-books','How many books?','有几本书？'],['u45-book-answer','Twelve books.','十二本书。'],['u45-teachers','How many teachers?','有几位老师？'],['u45-teacher-answer','Five teachers.','五位老师。']]},
];
function posterSpelling(id,extra){
 return {id:'u45-spell-'+id,type:'spell',word:id,audio:id,tilesOnly:true,extra:[extra],
  prompt:'听单词，点字母拼出来',answer:id,hint:'听清整个词，再从第一个字母开始。'};
}
const NUMBER_POSTER_MISSIONS=[
 {id:'signal',title:'听懂海报展的邀请',skill:'听数量 · 听懂物品',icon:'📡',story:'从数字探险来到海报小展厅。听伙伴介绍准备好的用品。',done:'听清楚了，给海报准备标签。',tasks:[
  {id:'u45-hear-pencils',type:'choice',word:'pencil',audio:'u45-choose',prompt:'伙伴介绍自己有几支铅笔？',options:['两支','三支','五支'],answer:'三支',hint:'听数量词和 pencils。'},
  {id:'u45-hear-teachers',type:'choice',word:'teacher',audio:'u45-teachers',prompt:'这句话在问什么的数量？',options:['书','老师','书包'],answer:'老师',hint:'句尾的词以 /t/ 开头。'},
 ]},
 {id:'sound',title:'拼好海报用品标签',skill:'听完整词 · 点字母',icon:'🔧',story:'先听三样用品，把每个标签拼好。',done:'第一组标签准备好啦。',tasks:[posterSpelling('book','a'),posterSpelling('pencil','a'),posterSpelling('ruler','a')]},
 {id:'supply',title:'补齐书包和老师的词卡',skill:'听完整词 · 点字母',icon:'🎒',story:'再拼三张词卡，每张都有一个多余字母。',done:'标签齐了，去把介绍排成句子。',tasks:[posterSpelling('schoolbag','e'),posterSpelling('eraser','o'),posterSpelling('teacher','o')]},
 {id:'bridge',title:'把数字放进句子',skill:'听句子 · 排词',icon:'🌉',story:'用短句介绍自己的用品，再试着问伙伴。',done:'介绍和提问都排好了，去看海报。',tasks:[
  {id:'u45-order-have',type:'order',word:'three',audio:'u45-choose',prompt:'听一听，排成“我有三支铅笔。”',parts:['I','have','three','pencils.'],answer:'I have three pencils.',hint:'先说 I have，再说数量和物品。'},
  {id:'u45-order-ask',type:'order',word:'teacher',audio:'u45-teachers',prompt:'听一听，排成“有几位老师？”',parts:['How','many','teachers?'],answer:'How many teachers?',hint:'先把询问数量的两个词排在前面。'},
 ]},
 {id:'friends',title:'看海报，答数量',skill:'看图 · 听问句 · 回答',icon:'🤝',story:'这是展厅里的练习海报。先数图，再听伙伴问。',done:'数量答对了，轮到自己的海报。',tasks:[
  {id:'u45-count-books',type:'dialogue',word:'twelve',audio:'u45-books',scene:'np-count-book-12',sceneAlt:'请数图中的书。',
   prompt:'数一数，图里有几本书？',options:['Ten.','Eleven.','Twelve.'],answer:'Twelve.',hint:'一行一行数，每本只数一次。'},
  {id:'u45-count-teachers',type:'dialogue',word:'five',audio:'u45-teachers',scene:'np-count-teacher-5',sceneAlt:'请数图中的老师。',
   prompt:'图中有几位老师？',options:['Four.','Five.','Six.'],answer:'Five.',hint:'先数完上面一行，再数下一行。'},
 ]},
 {id:'party',title:'把自己的海报带来',skill:'整理数量 · 自愿开口',icon:'🎉',story:'填自己的数字，画海报，再和伙伴问答。',done:'数字海报展完成！可以把数字海报纪念画带回营地。',tasks:[
  {id:'u45-poster-choice',type:'gap',word:'book',prompt:'怎样做自己的数字海报？',sentence:'我可以 ___。',options:['先数身边的东西，再填数量','每一项都抄示例的十二','随便选数字，不用数'],answer:'先数身边的东西，再填数量',hint:'海报介绍的是你自己的发现。'},
  {id:'u45-speak',type:'speak',word:'book',audio:'u45-books',prompt:'拿着自己的海报，和伙伴轮流问',sentence:'How many books?',zh:'有几本书？再用你自己的数量回答。',hint:'先跟读问题，再看海报回答。'},
 ]},
];
LESSONS['unit4-05']={
 course:{...LESSONS['unit4-04'].course,lessonId:'unit4-05',number:5,numberFuel:false,numberPoster:true,
  lessonTitle:'我的数字海报',page:'课本第50—51页 · Hit it big',
  description:'数一数 · 做数字海报 · 和伙伴问答',estimated:'三个小活动，可分次完成',heroScene:'u4-number-poster',
  wordGroups:[{title:'海报里的用品',words:['book','schoolbag','pencil','ruler','eraser']},{title:'老师和数字',words:['teacher','how','one','three','five','twelve']}],
  contextWords:[],reviewWords:NUMBER_POSTER_WORDS.filter(w=>w.id!=='teacher').map(w=>w.id),
  adventure:{chapter:'第二十八章 · 数字海报展',title:'我的数字海报',subtitle:'把身边的数量画成一张海报。',
   intro:'沿着校园的数字走，伙伴们来到了数字海报展厅。',message:'听清词，拼标签，再用数字介绍自己。',end:'数字海报展完成啦！'}},
 words:NUMBER_POSTER_WORDS,scenes:NUMBER_POSTER_SCENES,tasks:[],missions:NUMBER_POSTER_MISSIONS,
};
useLesson(requestedLesson);
