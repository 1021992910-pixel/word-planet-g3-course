'use strict';
const WRAP_CHECKS=[
 {id:'greet',text:'我会用 Hello 和 Hi 向朋友问好。',lesson:'unit1-01'},
 {id:'introduce',text:'我会用 I’m、He / She is、We’re 介绍自己和朋友。',lesson:'unit1-02'},
 {id:'write',text:'我会画朋友，并写上介绍信息。',lesson:'unit1-03'},
 {id:'poster',text:'我会做朋友海报，并向别人介绍。',lesson:'unit1-05'}
];
const WrapModel={
 blank:()=>({checks:[],updated:0}),
 sanitize(raw){return {checks:[...new Set((Array.isArray(raw?.checks)?raw.checks:[]).filter(id=>WRAP_CHECKS.some(item=>item.id===id)))],updated:Number.isFinite(raw?.updated)?Math.max(0,raw.updated):0};},
 toggle(data,id){if(!WRAP_CHECKS.some(item=>item.id===id))return false;data.checks=data.checks.includes(id)?data.checks.filter(value=>value!==id):[...data.checks,id];data.updated=Date.now();return true;},
 merge(left,right){return this.sanitize((left?.updated||0)>(right?.updated||0)?left:right);}
};
const WRAP_ACTIONS=[
 {audio:'u16-listens',text:'A good friend listens.',zh:'好朋友会倾听。',example:'朋友讲话时，先认真听完。'},
 {audio:'u16-shares',text:'A good friend shares.',zh:'好朋友会分享。',example:'愿意把玩具和朋友一起玩。'},
 {audio:'u16-helps',text:'A good friend helps.',zh:'好朋友会帮忙。',example:'朋友遇到困难时，问问能不能帮上忙。'},
 {audio:'u16-plays',text:'A good friend plays with you.',zh:'好朋友会和你一起玩。',example:'邀请朋友加入游戏。'}
];
const WRAP_SCENES=[
 {id:'friends-uk',name:'第16页 · 复习表达',audio:'u12-age',summary:'问候、说年龄、介绍自己和朋友，再读 friend、play，唱字母歌。每次挑几项练，随时可以休息。'},
 {id:'poster-w28',name:'第16页 · 我会了吗',audio:'u15-amy-share',summary:'看课本 Check it 的四个目标。先试着自己完成，再勾选。还想练的项目可以直接回到对应课程。'},
 {id:'speed-play',name:'第17页 · 做一个好朋友',audio:'u16-plays',summary:'倾听、分享、帮忙、一起玩。先听四句，再想想你和朋友之间发生过的一件小事。'}
];
const WRAP_MISSIONS=[
 {id:'signal',title:'接通友谊复习站',skill:'听懂问候 · 年龄',icon:'📡',story:'海报展结束了，伙伴们在复习站集合。先听清问候和年龄。',done:'消息收到，去拼出熟悉的词。',tasks:[
  {id:'u16-hi',type:'choice',audio:'hello',prompt:'见面时听到这句话，可以怎样回应？',options:['Hello!','Goodbye!','Write!'],answer:'Hello!',hint:'见面时互相问好。'},
  {id:'u16-age',type:'choice',word:'nine',audio:'u12-age',prompt:'听一听，说话的人几岁？',options:['九岁','没提年龄','八岁'],answer:'九岁',hint:'听清 I’m 后面的年龄。'}]},
 {id:'sound',title:'重启友谊拼读机',skill:'听整词 · 拼合',icon:'🔧',story:'把听到的词拼出来，给复习站接上声音。',done:'声音接好了，去补齐词卡。',tasks:[
  {id:'u16-build-play',type:'build',word:'play',audio:'play',prompt:'听单词，再拼出来',parts:['p','l','ay'],answer:'play',hint:'结尾两个字母合成一组声音。'},
  {id:'u16-build-help',type:'build',word:'help',audio:'help',prompt:'听单词，再拼出来',parts:['h','e','l','p'],answer:'help',hint:'仔细听开头和结尾。'}]},
 {id:'supply',title:'装好复习词卡',skill:'听音拼写',icon:'🎒',story:'准备两张小词卡，把人物和年龄写清楚。',done:'词卡齐啦，去接介绍句。',tasks:[
  {id:'u16-spell-he',type:'spell',word:'he',audio:'he',prompt:'听人物词，自己拼一拼',answer:'he',extra:['a'],hint:'开头轻轻送气，结尾是长音。'},
  {id:'u16-spell-nine',type:'spell',word:'nine',audio:'nine',prompt:'听年龄词，自己拼一拼',answer:'nine',extra:['a'],hint:'末尾的静音字母也要写。'}]},
 {id:'bridge',title:'走过朋友句子桥',skill:'人物介绍 · 组句',icon:'🌉',story:'把介绍写完整，送给复习站的朋友。',done:'介绍清楚了，去看看怎样做一个好朋友。',tasks:[
  {id:'u16-gap-she',type:'gap',word:'she',audio:'u12-shes-amy',prompt:'介绍女孩 Amy，填哪个词？',sentence:'___ is Amy.',zh:'她是埃米。',options:['She','He','We'],answer:'She',hint:'这里介绍的是一个女孩。'},
  {id:'u16-order-we',type:'order',word:'friend',audio:'u12-friends-full',prompt:'把“我们是朋友”排成一句话',parts:['We','are','friends.'],answer:'We are friends.',hint:'从“我们”开始，再说朋友关系。'}]},
 {id:'friends',title:'找到好朋友的行动',skill:'听句理解',icon:'🤝',story:'听清四种行动，为每句话选一个生活里的例子。',done:'四种友谊行动都认识啦！',tasks:WRAP_ACTIONS.map((item,i)=>({id:'u16-action-'+i,type:'choice',audio:item.audio,prompt:'听这句话，选一个对应的行动',options:WRAP_ACTIONS.map(action=>action.example),answer:item.example,hint:'想想句子说的是倾听、分享、帮忙，还是一起玩。'}))},
 {id:'party',title:'点亮友谊复习站',skill:'问答 · 自愿开口',icon:'🎉',story:'把今天的友谊行动说出来，再回头看看自己的学习星空。',done:'第一单元的复习与拓展练过啦！可以把友谊星徽章带回营地。',tasks:[
  {id:'u16-reply',type:'dialogue',audio:'u16-question',prompt:'你想说自己会帮助朋友，可以怎样回答？',options:['Yes. I help my friends.','Goodbye!','I’m nine.'],answer:'Yes. I help my friends.',hint:'选择回答“会帮助朋友”的那句话。'},
  {id:'u16-speak',type:'speak',audio:'u16-answer',prompt:'说一说，你怎样做一个好朋友',sentence:'Yes. I help my friends.',zh:'是的。我帮助朋友。听完可以跟读，再用中文讲一件你帮助朋友的小事。',hint:'跟着说一遍，也可以不录音。'}]}
];
const WRAP_WORDS=['hello','friend','nine','he','she','play','help','listen'].map(id=>({...Object.values(LESSONS).flatMap(lesson=>lesson.words).find(word=>word.id===id)}));
LESSONS['unit1-06']={course:{...LESSONS['unit1-05'].course,lessonId:'unit1-06',number:6,lessonTitle:'友谊复习站：我会做个好朋友',page:'课本第16—17页 · Wrap up / Check it / Let’s explore',description:'复习表达 · 自我检查 · 友谊行动',estimated:'三个短环节，可分次完成',poster:false,wrap:true,heroScene:'speed-play',
 wordGroups:[{title:'问候和年龄',words:['hello','friend','nine']},{title:'介绍与玩耍',words:['he','she','play']},{title:'听一听，帮一帮',words:['help','listen']}],
 adventure:{chapter:'第十一章 · 友谊复习站',title:'友谊复习站',subtitle:'把学过的话说出来，把友谊用在生活里。',intro:'从海报工坊来到复习站，和伙伴回顾第一单元的旅程。',message:'先问好，再介绍朋友。认真倾听、乐于分享、互相帮忙，最后一起玩。',end:'第一单元复习与拓展练过啦，回望越来越亮的学习星空。'}},words:WRAP_WORDS,scenes:WRAP_SCENES,tasks:[],missions:WRAP_MISSIONS};
useLesson(requestedLesson);
