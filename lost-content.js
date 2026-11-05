'use strict';
const LOST_DEFINITIONS = [
 ['find','/faɪnd/','找到；发现','u2-lost-find','u23-find','What does Ms Olivia find?','Olivia 老师找到了什么？'],
 ['bye','/baɪ/','再见','u2-lost-find','u23-bye-kids','Bye, kids.','再见，孩子们。'],
 ['kid','/kɪd/','小孩','u2-lost-find','u23-bye-kids','Bye, kids.','再见，孩子们。'],
 ['lost-and-found','/ˌlɒst ən ˈfaʊnd/','失物招领','u2-lost-return','u23-at-desk','This is the lost and found.','这里是失物招领处。（巩固例句）','lost and found'],
 ['take-care-of','/teɪk ˈkeər əv/','照看；爱护','u2-lost-return','u23-care','Take care of your school things!','爱护你的学习用品！','take care of'],
];
const LOST_WORDS = LOST_DEFINITIONS.map(([id,ipa,meaning,scene,exampleAudio,example,translation,word=id]) => {
 const guide = GUIDED_DATA[id];
 return {id,word,ipa,meaning,scene,exampleAudio,example,translation,parts:guide.parts,
  kind:guide.kind==='phonics'?'拼读小老师':'短语带读',tip:guide.hint,hint:guide.hint};
});
for(const [id,exampleAudio,example,translation] of [
 ['pen','u23-yoyo','Is this your pen, Yoyo?','Yoyo，这是你的钢笔吗？'],
 ['ruler','u23-lulu','Is this your ruler, Lulu?','Lulu，这是你的尺子吗？'],
 ['eraser','u23-eraser',"It's an eraser.",'这是一块橡皮。'],
]){
 const old=LESSONS['unit2-01'].words.find(w=>w.id===id);
 LOST_WORDS.push({...old,scene:'u2-lost-find',exampleAudio,example,translation});
}
const LOST_SCENES = [
 {id:'u2-lost-find',name:'下课啦，孩子们再见',audio:'u23-bye-kids',summary:'第22页第1格。海底教室下课了。Olivia 老师和小伙伴们互相道别。',alt:'粉色章鱼老师在海底教室发现遗落的文具。',lines:[
  ['u23-find','What does Ms Olivia find?','带着问题听故事：Olivia 老师找到了什么？'],
  ['u23-bye-kids','Bye, kids.','老师：再见，孩子们。'],
  ['u23-bye-teacher','Bye, Ms Olivia.','孩子们：再见，Olivia 老师。'],
 ]},
 {id:'u2-lost-find',name:'找到三件用品',audio:'u23-eraser',summary:'第22页第2—4格。跟着老师看三处线索，再试着说出物品。',alt:'章鱼老师指着石桌上分开摆放的钢笔、尺子和橡皮。',lines:[
  ['u22-this',"What's this?",'这是什么？'],
  ['u23-pen',"Oh, it's a pen.",'哦，这是一支钢笔。'],
  ['u22-this',"What's this?",'这是什么？'],
  ['u22-ruler',"It's a ruler.",'这是一把尺子。'],
  ['u23-that',"What's that?",'那是什么？'],
  ['u23-eraser',"It's an eraser.",'那是一块橡皮。'],
 ]},
 {id:'u2-lost-return',name:'把物品还给主人',audio:'u23-care',summary:'第23页第5—6格。老师问物品是谁的。Yoyo 认领钢笔，Lulu 说尺子不是自己的。听海马和螃蟹怎么认领。',alt:'章鱼老师把红色钢笔递给橙色小海星。',lines:[
  ['u23-yoyo','Is this your pen, Yoyo?','老师：Yoyo，这是你的钢笔吗？'],
  ['u23-yes','Yes, it is. Thank you.','Yoyo：是的。谢谢您。'],
  ['u23-lulu','Is this your ruler, Lulu?','老师：Lulu，这是你的尺子吗？'],
  ['u22-no',"No, it isn't.",'Lulu：不，不是。'],
  ['u23-my-ruler',"It's my ruler.",'小海马：这是我的尺子。'],
  ['u23-my-eraser',"It's my eraser.",'小螃蟹：这是我的橡皮。'],
  ['u23-care','Take care of your school things!','老师：爱护你们的学习用品！'],
 ]},
];
const LOST_MISSIONS = [
 {id:'signal',title:'听失物招领站的消息',skill:'听音 · 认物',icon:'📡',
  story:'从猜物小站出发，潜进海底教室。老师捡到了三件用品，先听消息认一认。',done:'物品认出来了，去接好两个新词。',tasks:[
   {id:'u23-hear-pen',type:'choice',word:'pen',audio:'u23-pen',prompt:'老师捡到了什么？',options:['钢笔','铅笔','笔袋'],answer:'钢笔',hint:'听句尾的用品名称。'},
   {id:'u23-hear-eraser',type:'choice',word:'eraser',audio:'u23-eraser',prompt:'老师还捡到了什么？',options:['橡皮','尺子','书包'],answer:'橡皮',hint:'注意 an 后的词。'},
  ]},
 {id:'sound',title:'接好寻找线索的声音',skill:'听整词 · 拼合',icon:'🔧',
  story:'两条声音线索到了。听完整词，把字母零件排好。',done:'声音接好了，来给用品写标签。',tasks:[
   {id:'u23-build-find',type:'build',word:'find',audio:'find',prompt:'听单词，再拼出来',parts:['f','i','n','d'],answer:'find',hint:'中间是 /aɪ/，结尾有两个辅音。'},
   {id:'u23-build-bye',type:'build',word:'bye',audio:'bye',prompt:'听单词，再拼出来',parts:['b','ye'],answer:'bye',hint:'尾部两个字母合成一个音。'},
  ]},
 {id:'supply',title:'给失物写好标签',skill:'听整词 · 独立拼写',icon:'🎒',
  story:'给海底招领处写两张小标签。听清整个词，再自己拼。',done:'标签写好啦，把它们放进句子。',tasks:[
   {id:'u23-spell-kid',type:'spell',word:'kid',audio:'kid',prompt:'听单词，自己拼一拼',extra:['e'],answer:'kid',hint:'中间是短元音，最后有一个 /d/。'},
   {id:'u23-spell-ruler',type:'spell',word:'ruler',audio:'ruler',prompt:'听熟悉的用品词，再拼写',extra:['a'],answer:'ruler',hint:'两拍，末尾两个字母在英式发音里读得轻。'},
  ]},
 {id:'bridge',title:'把用品名放进问答',skill:'句中填词 · 对应课本读写',icon:'🌉',
  story:'跟着课本第23页的读写练习，先在句子里填好三件用品，再在纸上写一遍。',done:'三句话都接好了，去找失物主人。',tasks:[
   {id:'u23-fill-eraser',type:'gap',word:'eraser',prompt:'图中的用品是橡皮，补全句子',sentence:"It's an ___.",zh:'这是一块橡皮。',options:['eraser','pen','ruler'],answer:'eraser',hint:'选表示橡皮的词。'},
   {id:'u23-fill-pen',type:'gap',word:'pen',prompt:'问 Yoyo 这是不是他的钢笔',sentence:'Is this your ___, Yoyo?',zh:'Yoyo，这是你的钢笔吗？',options:['ruler','pen','eraser'],answer:'pen',hint:'Yoyo 认领的是钢笔。'},
   {id:'u23-fill-ruler',type:'gap',word:'ruler',prompt:'问 Lulu 这是不是她的尺子',sentence:'Is this your ___, Lulu?',zh:'Lulu，这是你的尺子吗？',options:['pen','eraser','ruler'],answer:'ruler',hint:'留意这里问的是哪一件用品。'},
  ]},
 {id:'friends',title:'帮物品找到主人',skill:'故事理解 · 情境回答',icon:'🤝',
  story:'认领时要先问一问。用完整回答告诉老师，是不是你的。',done:'归还完成，来演一小段。',tasks:[
   {id:'u23-owner-pen',type:'dialogue',audio:'u23-yoyo',word:'pen',prompt:'你是 Yoyo，钢笔是你的。怎么回答？',options:['Yes, it is.',"No, it isn't.","It's a ruler."],answer:'Yes, it is.',hint:'先肯定，再试着对老师道谢。'},
   {id:'u23-not-owner',type:'dialogue',audio:'u23-lulu',word:'ruler',prompt:'你是 Lulu，尺子不是你的。怎么回答？',options:['Yes, it is.',"No, it isn't.","It's a pen."],answer:"No, it isn't.",hint:'听清问题，选择否定回答。'},
   {id:'u23-place',type:'choice',audio:'u23-at-desk',word:'lost-and-found',prompt:'这句话说的是哪里？',options:['失物招领处','学校大门','运动场'],answer:'失物招领处',hint:'把三个词放在一起理解。'},
  ]},
 {id:'party',title:'演一演海底失物招领',skill:'听懂提醒 · 自愿开口',icon:'🎉',
  story:'拿起手边的学习用品，和伙伴轮流扮演老师和来认领的人。',done:'海底招领站的任务完成啦！可以用金币把归还纪念画带回营地。',tasks:[
   {id:'u23-care-meaning',type:'choice',audio:'u23-care',word:'take-care-of',prompt:'最后老师在提醒大家什么？',options:['爱护学习用品','去操场玩','画一幅画'],answer:'爱护学习用品',hint:'听开头的固定搭配。'},
   {id:'u23-speak',type:'speak',audio:'u23-yoyo',prompt:'拿一支钢笔，问问伙伴是不是他的',sentence:'Is this your pen, Yoyo?',zh:'先跟读，再和伙伴用自己的名字分角色练。对方回答后，可以把 pen 换成 ruler 再试一次。',hint:'可以只跟读或面对面演，不必录音。'},
  ]},
];
LESSONS['unit2-03'] = {
 course:{...LESSONS['unit2-02'].course,lessonId:'unit2-03',number:3,objects:false,lost:true,
  lessonTitle:'海底失物招领',page:'课本第22—23页 · Speed up',
  description:'认领学习用品 · 慢拼读 · 分角色表演',estimated:'三段故事，可分次完成',heroScene:'u2-lost-return',
  wordGroups:[{title:'这次学会拼的词',words:['find','bye','kid']}],
  contextWords:['lost-and-found','take-care-of'],reviewWords:['pen','ruler','eraser'],
  adventure:{chapter:'第十四章 · 海底招领站',title:'海底招领站',
   subtitle:'找齐三件用品，把它们还给主人。',intro:'从猜物小站出发，来到海底教室。',
   message:'听清用品名称，用问答找主人，最后演一演。',end:'第22—23页练过啦。'}},
 words:LOST_WORDS,scenes:LOST_SCENES,tasks:[],missions:LOST_MISSIONS,
};
useLesson(requestedLesson);
