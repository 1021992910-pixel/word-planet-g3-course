'use strict';
const CHICK_COUNT=['u43-count','Let me count.','让我数一数。'];
const CHICK_ASK=['u43-ask','How many babies?','有几只小鸡？'];
const CHICK_ANSWER=['u43-answer','Twelve babies!','十二只小鸡！'];
const CHICK_WORDS=[
 ['egg','/eɡ/','蛋','u4-hen-nest',['u43-egg','Here is an egg.','这里有一枚蛋。']],
 ['hungry','/ˈhʌŋɡri/','饿的','u4-hen-nest',['u43-hungry',"I'm hungry.",'我饿了。']],
 ['baby','/ˈbeɪbi/','幼崽。这里指小鸡。','u4-hatch',['u43-baby','Look at the baby chick.','看这只小鸡。']],
 ['cheep','/tʃiːp/','小鸡的唧唧声','u4-hatch',['u43-cheep','The chick says cheep.','小鸡唧唧叫。']],
].map(([id,ipa,meaning,scene,[exampleAudio,example,translation]])=>({
 id,word:id,ipa,meaning,scene,exampleAudio,example,translation,parts:GUIDED_DATA[id].parts,
 tip:GUIDED_DATA[id].hint,hint:GUIDED_DATA[id].hint,kind:'拼读小老师',
}));
const CHICK_REVIEW=[
 ['eleven','u4-count-egg-11',['u43-eleven','Only eleven eggs.','只剩十一枚蛋。']],
 ['twelve','u4-count-chick-12',CHICK_ANSWER],['count','u4-hatch',CHICK_COUNT],
 ['how','u4-hatch',CHICK_ASK],['many','u4-hatch',CHICK_ASK],
].map(([id,scene,[exampleAudio,example,translation]])=>({
 ...Object.values(LESSONS).flatMap(lesson=>lesson.words).find(word=>word.id===id),
 scene,exampleAudio,example,translation,
}));
const CHICK_SCENES=[
 {id:'u4-hen-nest',name:'鸡妈妈数鸡蛋',alt:'原创插图。鸡妈妈低头看着草窝里的几枚蛋。',
  summary:'看课本第46页第1到3格。鸡妈妈数完蛋，想到了将要出生的小鸡。后来她饿了，出去找吃的。',
  lines:[['u43-eggs','I can see twelve eggs.','我看见十二枚蛋。'],['u43-hungry',"I'm hungry.",'我饿了。']]},
 {id:'u4-hatch',name:'少了一枚蛋？',alt:'原创插图。鸡妈妈看着一只刚破壳的小鸡。',
  summary:'读第46页第4到5格，再看第47页第6到7格。回来时鸡妈妈只数到十一枚蛋。听到叫声后，她在草里找到了什么？',
  lines:[['u43-eleven','Only eleven eggs.','只剩十一枚蛋。'],['u43-call','Cheep! Cheep!','唧唧！唧唧！']]},
 {id:'u4-count-chick-12',name:'数数有几只小鸡',alt:'十二只小鸡的数量示意图。',
  summary:'看第47页最后一格。鸡妈妈这次要数的是小鸡。数完以后，用英语问答，再和伙伴分角色演故事。',
  lines:[CHICK_COUNT,CHICK_ASK]},
];
function chickSpell(id,extra){
 return {id:'u43-spell-'+id,type:'spell',word:id,audio:id,tilesOnly:true,extra:[extra],
  prompt:'听单词，点字母拼出来',answer:id,hint:id==='egg'?'末尾有两个一样的字母。':'可以再听一遍，从左往右拼。'};
}
const CHICK_MISSIONS=[
 {id:'signal',title:'听懂鸡妈妈的话',skill:'听音 · 认意思',icon:'📡',
  story:'伙伴们来到草地上的鸡窝。听一听鸡妈妈在说什么。',done:'听懂啦，给鸡窝里的新词拼好字母。',tasks:[
   {id:'u43-hear-eggs',type:'choice',word:'egg',audio:'u43-eggs',prompt:'一开始有几枚蛋？',options:['十枚','十一枚','十二枚'],answer:'十二枚',hint:'听 eggs 前面的数字。'},
   {id:'u43-hear-hungry',type:'choice',word:'hungry',audio:'u43-hungry',prompt:'鸡妈妈这时候怎么了？',options:['她饿了','她累了','她找到小鸡了'],answer:'她饿了',hint:'想想她为什么离开鸡窝。'},
 ]},
 {id:'sound',title:'给鸡窝里的词拼字母',skill:'听完整词 · 点字母',icon:'🔧',
  story:'先听完整的单词，再把字母排好。',done:'两个词拼好了，继续听小鸡的消息。',tasks:[chickSpell('egg','a'),chickSpell('hungry','o')]},
 {id:'supply',title:'拼好小鸡的词卡',skill:'听完整词 · 点字母',icon:'🎒',
  story:'草里传来了声音，听一听，再选字母拼词。',done:'词卡拼好了，去把数数的话排一排。',tasks:[chickSpell('baby','e'),chickSpell('cheep','a')]},
 {id:'bridge',title:'排好数数的话',skill:'听句子 · 排顺序',icon:'🌉',
  story:'鸡妈妈先说想数一数，然后数完告诉伙伴。',done:'句子排好了，可以帮鸡妈妈数数。',tasks:[
   {id:'u43-order-count',type:'order',word:'count',audio:'u43-count',prompt:'听一听，排成“让我数一数。”',parts:['Let','me','count.'],answer:'Let me count.',hint:'先找 Let，再把后面的两个词排好。'},
   {id:'u43-order-ask',type:'order',word:'how',audio:'u43-ask',prompt:'听一听，排成“有几只小鸡？”',parts:['How','many','babies?'],answer:'How many babies?',hint:'先排询问数量的两个词，再接要数的东西。'},
   {id:'u43-order-numbers',type:'order',word:'twelve',audio:'u41-sequence-3',prompt:'把最后四个数字按从小到大排好',parts:['Nine.','Ten.','Eleven.','Twelve.'],answer:'Nine. Ten. Eleven. Twelve.',hint:'想想 9 后面是什么数。'},
 ]},
 {id:'friends',title:'分清蛋和小鸡',skill:'看图 · 数量 · 故事理解',icon:'🤝',
  story:'先数图里还没破壳的蛋，再数小鸡。',done:'两次数清啦，一起把故事演出来。',tasks:[
   {id:'u43-count-eggs',type:'dialogue',word:'eleven',audio:'u43-egg-ask',scene:'u4-count-egg-11',sceneAlt:'请数图中完整的蛋。',
    prompt:'鸡妈妈回来时，窝里还有几枚完整的蛋？',options:['Ten.','Eleven.','Twelve.'],answer:'Eleven.',hint:'从左到右数，每枚只数一次。'},
   {id:'u43-count-babies',type:'dialogue',word:'twelve',audio:'u43-ask',scene:'u4-count-chick-12',sceneAlt:'请数图中的小鸡。',
    prompt:'故事最后有几只小鸡？',options:['Ten.','Eleven.','Twelve.'],answer:'Twelve.',hint:'先数完一行，再数下一行。'},
 ]},
 {id:'party',title:'在鸡窝边演故事',skill:'听辨 · 复述 · 开口',icon:'🎉',
  story:'从鸡妈妈数蛋演到小鸡破壳。轮到伙伴时，听听他们怎么说。',done:'故事演完啦！可以兑换破壳小鸡纪念画。',tasks:[
   {id:'u43-sound-cheep',type:'choice',word:'cheep',audio:'u43-call',prompt:'这是故事里谁的叫声？',options:['小鸡','小猫','小狗'],answer:'小鸡',hint:'它刚从蛋壳里出来。'},
   {id:'u43-story-sequence',type:'gap',word:'baby',audio:'u43-answer',prompt:'鸡妈妈后来为什么只数到十一枚完整的蛋？',options:['一只小鸡先破壳了','少数了一行','她拿走了一枚蛋'],answer:'一只小鸡先破壳了',hint:'回想蛋滚出窝以后发生了什么。'},
   {id:'u43-speak',type:'speak',audio:'u43-ask',scene:'u4-count-chick-12',sceneAlt:'草地上有一群小鸡。',
    prompt:'一人问小鸡的数量，一人数完回答',sentence:'How many babies?',zh:'有几只小鸡？数一数，用英文回答。',hint:'听完示范可以跟读，也可以录音。'},
 ]},
];
LESSONS['unit4-03']={
 course:{...LESSONS['unit4-02'].course,lessonId:'unit4-03',number:3,knotStory:false,chickStory:true,
  lessonTitle:'小鸡破壳啦！',page:'课本第46—47页 · Speed up',
  description:'读故事 · 拼写四个新词 · 数小鸡',estimated:'三个小情境，两组词卡，可分次完成',heroScene:'u4-hatch',
  wordGroups:[{title:'鸡妈妈和蛋',words:['egg','hungry']},{title:'破壳的小鸡',words:['baby','cheep']}],
  contextWords:[],reviewWords:CHICK_REVIEW.map(word=>word.id),
  adventure:{chapter:'第二十六章 · 破壳小鸡',title:'小鸡破壳啦',subtitle:'帮鸡妈妈数一数，从鸡蛋数到小鸡。',
   intro:'走过中国结工坊，伙伴们听见草地上的鸡窝里传来唧唧声。',message:'听懂故事，再点字母拼词、排句子、说数量。',end:'小鸡破壳故事完成啦！'}},
 words:[...CHICK_WORDS,...CHICK_REVIEW],scenes:CHICK_SCENES,tasks:[],missions:CHICK_MISSIONS,
};
useLesson(requestedLesson);
