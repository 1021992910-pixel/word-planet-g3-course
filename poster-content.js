'use strict';
const POSTER_PEOPLE = [
 {id:'amy',name:'Amy',pronoun:"She's",nameAudio:'u12-shes-amy',friendAudio:'u15-amy-friend',ageAudio:'u15-she-nine',shareAudio:'u15-amy-share'},
 {id:'sam',name:'Sam',pronoun:"He's",nameAudio:'u12-hes-sam',friendAudio:'u15-sam-friend',ageAudio:'u15-he-nine',shareAudio:'u15-sam-share'},
 {id:'mia',name:'Mia',pronoun:"She's",nameAudio:'u15-shes-mia',friendAudio:'u15-mia-friend',ageAudio:'u15-she-nine',shareAudio:'u15-mia-share'},
 {id:'ben',name:'Ben',pronoun:"He's",nameAudio:'u15-hes-ben',friendAudio:'u15-ben-friend',ageAudio:'u15-he-nine',shareAudio:'u15-ben-share'}
];
const PosterModel = {
 blank:()=>({friends:[],paper:false,shared:false,updated:0}),
 sanitize(raw){
  return {friends:[...new Set((Array.isArray(raw?.friends)?raw.friends:[]).filter(id=>POSTER_PEOPLE.some(p=>p.id===id)))].slice(0,2),paper:raw?.paper===true,shared:raw?.shared===true,updated:Number.isFinite(raw?.updated)?Math.max(0,raw.updated):0};
 },
 toggle(data,id){
  if(!POSTER_PEOPLE.some(p=>p.id===id))return false;
  if(data.friends.includes(id))data.friends=data.friends.filter(value=>value!==id);
  else if(data.friends.length<2)data.friends.push(id);
  else return false;
  data.shared=false;data.updated=Date.now();return true;
 },
 merge(left,right){return this.sanitize((left?.updated||0)>(right?.updated||0)?left:right);}
};

const POSTER_SCENES=[
 {id:'friends-uk',name:'想一想，我想介绍谁',audio:'u15-amy-friend',alt:'两位小伙伴在校园里互相介绍。',summary:'对照课本第14页，先想一想自己的朋友。书上的 Yueyue、Danny、Dudu 是例子，也可以想到玩具或动物伙伴。在这里先用故事人物练习。',lines:[
  {text:'Amy is my friend.',zh:'埃米是我的朋友。',audio:'u15-amy-friend'}]},
 {id:'poster-w28',name:'做一张朋友海报',audio:'u15-title',alt:'两位孩子展示画有朋友头像的海报。',summary:'对照课本第15页，写上 My friends，画出朋友，再在旁边写名字。会写年龄的话也可以加上。',lines:[
  {text:'My friends',zh:'我的朋友们',audio:'u15-title'}]},
 {id:'poster-w28',name:'指着海报，介绍朋友',audio:'u15-amy-share',alt:'小伙伴指着海报里的朋友，准备开口介绍。',summary:'课本第15页用 She’s Yueyue. She’s my friend. She’s… 提示介绍。先跟着 Amy 的示范，再换成你海报中的朋友。',lines:[
  {text:"She's Amy. She's my friend. She's nine.",zh:'她是埃米。她是我的朋友。她九岁。',audio:'u15-amy-share'}]}
];

const POSTER_MISSIONS=[
 {id:'signal',title:'接收海报展邀请',skill:'听懂介绍',icon:'📡',story:'字母音乐站的伙伴来到海报工坊。听清一位朋友是谁，帮展览准备名字卡。',done:'名字卡找到啦，去给拼读机接好声音。',tasks:[
  {id:'u15-hear-amy',type:'choice',word:'friend',audio:'u15-amy-friend',prompt:'听一听，谁是“我的朋友”？',options:['Amy','Sam','Ben'],answer:'Amy',hint:'听句子开头的名字。'},
  {id:'u15-hear-age',type:'choice',word:'nine',audio:'u15-he-nine',prompt:'听一听，这位男孩几岁？',options:['九岁','没有说年龄','八岁'],answer:'九岁',hint:'留意 He’s 后面表示年龄的词。'}]},
 {id:'sound',title:'修好介绍拼读机',skill:'听整词 · 拼声音',icon:'🔧',story:'先听完整单词，再把声音零件排好。遇到不熟的音，可以回图鉴慢慢听。',done:'声音接好了，去准备展览的词卡。',tasks:[
  {id:'u15-build-friend',type:'build',word:'friend',audio:'friend',prompt:'听单词，再拼出来',parts:['f','r','ie','n','d'],answer:'friend',hint:'有一块由两个字母组成的元音零件。'},
  {id:'u15-build-nine',type:'build',word:'nine',audio:'nine',prompt:'听单词，再拼出来',parts:['n','i','n','e'],answer:'nine',hint:'末尾有一个静音字母。'}]},
 {id:'supply',title:'给海报备好词卡',skill:'听音拼写',icon:'🎒',story:'给介绍句准备两张人物词卡。仔细听清开头的声音。',done:'人物词卡齐了，去搭介绍句子桥。',tasks:[
  {id:'u15-spell-she',type:'spell',word:'she',audio:'she',prompt:'听单词，拼出人物词',answer:'she',extra:['a'],hint:'开头是两个字母合起来的一组声音。'},
  {id:'u15-spell-he',type:'spell',word:'he',audio:'he',prompt:'听单词，拼出另一个人物词',answer:'he',extra:['a'],hint:'听清轻轻送气的开头和后面的长音。'}]},
 {id:'bridge',title:'把介绍句接完整',skill:'句中找词 · 补词 · 组句',icon:'🌉',story:'名字、关系、年龄各说一句，把朋友介绍清楚。',done:'句子桥搭好啦，去帮展览选介绍词。',tasks:[
  {id:'u15-find-friend',type:'find',word:'friend',audio:'u15-sam-friend',prompt:'哪个词表示“朋友”？',parts:['Sam','is','my','friend.'],answer:'friend.',zh:'萨姆是我的朋友。',hint:'找说明两个人关系的词。'},
  {id:'u15-gap-she',type:'gap',word:'she',audio:'u12-shes-amy',prompt:'介绍女孩 Amy，开头用哪个词？',sentence:'___ is Amy.',zh:'她是埃米。',options:['She','He','We'],answer:'She',hint:'这里说的是一个女孩。'},
  {id:'u15-order-friend',type:'order',word:'friend',audio:'u15-amy-friend',prompt:'把“埃米是我的朋友”排成一句话',parts:['Amy','is','my','friend.'],answer:'Amy is my friend.',hint:'先说名字，再说 is my friend。'}]},
 {id:'friends',title:'检查海报介绍卡',skill:'看信息 · 选介绍',icon:'🤝',story:'展览里每张图都有自己的名字和年龄，介绍时要和图上的信息对得上。',done:'介绍卡检查好了，可以开海报展啦！',tasks:[
  {id:'u15-card-sam',type:'choice',word:'he',audio:'u15-sam-share',prompt:'Sam 的卡片写着“男孩，9岁”，哪句介绍合适？',options:["He's Sam. He's nine.","She's Sam. She's nine.","I'm Amy."],answer:"He's Sam. He's nine.",hint:'介绍男孩用 He’s，再核对名字和年龄。'},
  {id:'u15-caption',type:'gap',word:'nine',prompt:'哪组内容适合放在朋友画像旁边？',sentence:'朋友画像旁可以写 ___。',zh:'选一组能帮助别人认识朋友的信息。',options:['朋友名字和年龄','只写自己的名字','把书上所有词都抄一遍'],answer:'朋友名字和年龄',hint:'让看海报的人知道画的是谁。'}]},
 {id:'party',title:'开一场朋友海报展',skill:'完整表达 · 自愿开口',icon:'🎉',story:'选好一句欢迎大家的话，再指着自己的海报介绍朋友。',done:'海报展完成！可以把友谊海报展台带回营地。',tasks:[
  {id:'u15-order-we',type:'order',word:'we',audio:'u12-friends-full',prompt:'把“我们是朋友”排好',parts:['We','are','friends.'],answer:'We are friends.',hint:'把自己也包括进来，用 We 开头。'},
  {id:'u15-next-step',type:'gap',prompt:'海报画好、名字写好后，接下来做什么？',sentence:'画写完成后，我可以 ___。',zh:'选一项课本里的下一步活动。',options:['指着海报介绍朋友','只把海报收起来','把朋友的名字擦掉'],answer:'指着海报介绍朋友',hint:'想想课本里 Tell the class 要我们做什么。'},
  {id:'u15-share',type:'speak',audio:'u15-amy-share',prompt:'指着海报，介绍一位朋友',sentence:"She's Amy. She's my friend. She's nine.",zh:'可以用练习海报，也可以用自己的纸上海报。先说名字，再说朋友关系，最后试着补年龄。',hint:'看一眼、听一遍，再自己说。也可以直接跟读完成。'}]}
];

const POSTER_WORDS=['friend','he','she','nine','we'].map(id=>{
 const original=Object.values(LESSONS).flatMap(l=>l.words).find(w=>w.id===id);
 return {...original};
});
LESSONS['unit1-05']={course:{...LESSONS['unit1-04'].course,number:5,lessonId:'unit1-05',lessonTitle:'做一张我的朋友海报',page:'课本第14—15页 · Hit it big',description:'选朋友 · 画写海报 · 开口介绍',estimated:'三个短环节，画海报可以单独完成',heroScene:'poster-w28',startup:false,fuelup:false,poster:true,
 adventure:{chapter:'第十章 · 友谊海报工坊',title:'友谊海报工坊',subtitle:'把朋友画下来，把介绍说出来。',intro:'带着音乐站的邀请，来到海报工坊，为朋友办一场小展览。',message:'先选一位朋友，准备好名字和年龄，把前面学过的介绍句放到作品里。',end:'朋友海报展完成啦！把这段友谊带回营地。'}},words:POSTER_WORDS,scenes:POSTER_SCENES,tasks:[],missions:POSTER_MISSIONS};
useLesson(requestedLesson);
