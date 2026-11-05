'use strict';
const DESIGN_ITEMS = [
 {id:'eraser',label:'橡皮',noun:'an eraser',questionAudio:'u25-is-eraser',answerAudio:'u23-eraser'},
 {id:'pen',label:'钢笔',noun:'a pen',questionAudio:'u22-is-pen',answerAudio:'u22-pen'},
 {id:'pencil',label:'铅笔',noun:'a pencil',questionAudio:'u22-is-pencil',answerAudio:'u25-pencil'},
 {id:'ruler',label:'尺子',noun:'a ruler',questionAudio:'u24-is-ruler',answerAudio:'u22-ruler'},
 {id:'pencil-case',label:'笔袋',noun:'a pencil case',questionAudio:'u25-is-case',answerAudio:'u25-case'},
];
const DesignModel = {
 blank:()=>({item:'',idea:'',drawn:false,shared:false,updated:0}),
 sanitize(raw){
  const item=DESIGN_ITEMS.some(option=>option.id===raw?.item)?raw.item:'';
  if(!item)return this.blank();
  return {item,idea:typeof raw.idea==='string'?raw.idea.trim().slice(0,60):'',
   drawn:raw.drawn===true,shared:raw.shared===true,
   updated:Number.isFinite(raw.updated)?Math.max(0,raw.updated):0};
 },
 plan(previous,item,idea,now=Date.now()){
  const next=this.sanitize({item,idea,updated:now});
  if(next.item===previous.item&&next.idea===previous.idea)return previous;
  return next;
 },
 merge(left,right){return this.sanitize((left?.updated||0)>(right?.updated||0)?left:right);},
};
const DESIGN_SCENES = [
 {id:'u2-design-studio',name:'看一看，猜一猜',audio:'u24-guess',alt:'女孩举着一张星形文具设计图，男孩正在猜。',
  summary:'第26页活动1。想想设计图上的东西是用来做什么的。看图先猜一猜，再听伙伴怎么问。',
  lines:[['u24-guess','What is it? Guess!','这是什么？猜一猜！']]},
 {id:'u2-writing',name:'和伙伴商量点子',audio:'u25-school-thing',alt:'孩子桌上摆着钢笔、铅笔和笔袋。',
  summary:'第26页活动2。选一种学习用品。和伙伴商量一个新点子：想改它的形状，还是让它用起来更方便？',
  lines:[['u25-school-thing','What school thing is it?','它是哪种学习用品？（讨论示范）']]},
 {id:'u2-design-studio',name:'画出你的设计',audio:'u23-eraser',alt:'女孩展示一张星形橡皮的设计图。',
  summary:'第27页活动3。把设计画在纸上，加一个能看出用途的细节。比如给橡皮画出好捏的小凸边，再给图写上物品名称。',
  lines:[]},
 {id:'u2-design-studio',name:'展示作品，请大家猜',audio:'u22-this',alt:'两位孩子用自己的文具设计图做问答。',
  summary:'第27页活动4。举起设计图，先让对方看图猜。猜对或猜错都用完整句回答，再告诉对方你设计了什么。',
  lines:[['u22-this',"What's this?",'这是什么？'],['u22-yes','Yes, it is.','是的，它是。'],['u22-no',"No, it isn't.",'不，它不是。']]},
];
const DESIGN_WORDS = [...DESIGN_ITEMS.map(item=>item.id),'guess','thing'].map(id=>{
 const word=Object.values(LESSONS).flatMap(lesson=>lesson.words).find(entry=>entry.id===id);
 const item=DESIGN_ITEMS.find(option=>option.id===id);
 if(item)return {...word,exampleAudio:item.answerAudio,example:"It's "+item.noun+'.',translation:'这是'+({eraser:'一块',pen:'一支',pencil:'一支',ruler:'一把','pencil-case':'一个'}[id])+item.label+'。'};
 if(id==='guess')return {...word,exampleAudio:'u24-guess',example:'What is it? Guess!',translation:'这是什么？猜一猜！'};
 return {...word,exampleAudio:'u25-school-thing',example:'What school thing is it?',translation:'它是哪种学习用品？'};
});
const DESIGN_MISSIONS=[
 {id:'signal',title:'听听展品是什么',skill:'听音认物',icon:'📡',story:'离开校园找物站，来到文具设计工坊。听听展台上的两条介绍。',done:'认出展品啦，去接好声音。',tasks:[
  {id:'u25-hear-eraser',type:'choice',word:'eraser',audio:'u23-eraser',prompt:'听到的是哪件用品？',options:['橡皮','尺子','钢笔'],answer:'橡皮',hint:'听 an 后面的词。'},
  {id:'u25-hear-case',type:'choice',word:'pencil-case',audio:'u25-case',prompt:'另一件展品是什么？',options:['笔袋','铅笔','书包'],answer:'笔袋',hint:'仔细听，是两个词连在一起。'},
 ]},
 {id:'sound',title:'接好展品名字的声音',skill:'听整词 · 拼合',icon:'🔧',story:'先听完整词，再把声音零件排好。',done:'声音接好了，去写展品标签。',tasks:[
  {id:'u25-build-pen',type:'build',word:'pen',audio:'pen',prompt:'听单词，再拼出来',parts:['p','e','n'],answer:'pen',hint:'听开头、短元音和结尾。'},
  {id:'u25-build-guess',type:'build',word:'guess',audio:'guess',prompt:'听单词，再拼出来',parts:['gu','e','ss'],answer:'guess',hint:'听短元音，结尾两个相同字母发一个音。'},
 ]},
 {id:'supply',title:'给文具写上标签',skill:'独立拼写',icon:'🎒',story:'画好设计后，试着写下用品名，方便伙伴认出来。',done:'标签写好了，放进问句里试试。',tasks:[
  {id:'u25-spell-ruler',type:'spell',word:'ruler',audio:'ruler',prompt:'听用品词，再拼写',extra:['a'],answer:'ruler',hint:'听两拍，后面一拍轻。'},
  {id:'u25-spell-pencil',type:'spell',word:'pencil',audio:'pencil',prompt:'听用品词，再拼写',extra:['a'],answer:'pencil',hint:'第二拍开头的字母在这个词里读 /s/。'},
 ]},
 {id:'bridge',title:'把问句和介绍句排好',skill:'句中填词 · 排序',icon:'🌉',story:'先把问句排好，再练习说出展品的名称。',done:'问句准备好了，请伙伴来猜。',tasks:[
  {id:'u25-an',type:'gap',word:'eraser',audio:'u25-is-eraser',prompt:'要问“它是橡皮吗？”，空格里填什么？',sentence:'Is it ___ eraser?',zh:'它是一块橡皮吗？',options:['a','an'],answer:'an',hint:'听 eraser 开头的元音。'},
  {id:'u25-a',type:'gap',word:'ruler',audio:'u24-is-ruler',prompt:'要问“它是尺子吗？”，空格里填什么？',sentence:'Is it ___ ruler?',zh:'它是一把尺子吗？',options:['a','an'],answer:'a',hint:'ruler 开头是辅音。'},
  {id:'u25-order',type:'order',word:'pencil',audio:'u25-pencil',prompt:'把“它是一支铅笔”排成一句话',parts:["It's",'a','pencil.'],answer:"It's a pencil.",hint:'先说 It’s，再说物品是什么。'},
 ]},
 {id:'friends',title:'让伙伴猜你的设计',skill:'问答 · 肯定与否定',icon:'🤝',story:'这次的展品是一块橡皮。听伙伴猜的是什么。',done:'问答接好啦，轮到你展示。',tasks:[
  {id:'u25-guess-no',type:'dialogue',word:'pen',audio:'u22-is-pen',prompt:'你设计的是橡皮，听到这个问题怎么答？',options:['Yes, it is.',"No, it isn't."],answer:"No, it isn't.",hint:'听听伙伴猜的是不是橡皮。'},
  {id:'u25-guess-yes',type:'dialogue',word:'eraser',audio:'u25-is-eraser',prompt:'你设计的是橡皮，这次怎么答？',options:["No, it isn't.",'Yes, it is.'],answer:'Yes, it is.',hint:'伙伴猜对了就用肯定回答。'},
 ]},
 {id:'party',title:'办一场小小设计展',skill:'展示作品 · 自愿开口',icon:'🎉',story:'拿起你的设计图，让大家猜，再说出设计的用品名。',done:'设计展完成！可以把文具设计纪念画带回营地。',tasks:[
  {id:'u25-show-step',type:'gap',word:'thing',prompt:'设计图画好后，怎样让伙伴参与？',sentence:'我可以 ___。',zh:'选一种适合小小设计展的做法。',options:['先让伙伴猜，再说出用品名','把画收起来，不展示','只让伙伴抄单词'],answer:'先让伙伴猜，再说出用品名',hint:'想想本课的最后一步是什么。'},
  {id:'u25-present',type:'speak',audio:'u25-my-eraser',prompt:'举起设计图，介绍你的文具',sentence:'This is my eraser.',zh:'这是我的橡皮。换成你自己画的用品，再请伙伴用 Is it…? 猜。',hint:'可以当面说，也可以只跟读，不必录音。'},
 ]},
];
LESSONS['unit2-05']={
 course:{...LESSONS['unit2-04'].course,lessonId:'unit2-05',number:5,bagFuel:false,design:true,
  lessonTitle:'设计一件自己的学习用品',page:'课本第26—27页 · Hit it big',
  description:'看图猜 · 商量点子 · 画设计 · 开口展示',estimated:'四小步，画图可单独完成',heroScene:'u2-design-studio',
  wordGroups:[{title:'设计展里要用的词',words:DESIGN_WORDS.map(word=>word.id)}],contextWords:[],reviewWords:DESIGN_WORDS.map(word=>word.id),
  adventure:{chapter:'第十六章 · 文具设计工坊',title:'文具设计工坊',subtitle:'给熟悉的文具想一个新点子。',
   intro:'从校园找物站出发，把找回的用品变成设计灵感。',message:'先认展品、写标签，再请伙伴猜自己的设计。',
   end:'设计展完成！把这次的创意带回营地。'}},
 words:DESIGN_WORDS,scenes:DESIGN_SCENES,tasks:[],missions:DESIGN_MISSIONS,
};
useLesson(requestedLesson);
