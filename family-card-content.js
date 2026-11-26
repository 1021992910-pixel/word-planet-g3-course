'use strict';
const FAMILY_CARD_RECIPIENTS=[
 {id:'mum',label:'妈妈',name:'Mum'}, {id:'dad',label:'爸爸',name:'Dad'},
 {id:'grandma',label:'奶奶／外婆',name:'Grandma'}, {id:'grandpa',label:'爷爷／外公',name:'Grandpa'},
 {id:'sister',label:'姐姐／妹妹',name:'Sister'}, {id:'brother',label:'哥哥／弟弟',name:'Brother'},
];
const FamilyCardModel={
 blank:()=>({recipient:'',drawn:false,shared:false,updated:0}),
 sanitize(raw){const recipient=FAMILY_CARD_RECIPIENTS.some(r=>r.id===raw?.recipient)?raw.recipient:'';return {recipient,drawn:!!recipient&&raw?.drawn===true,shared:!!recipient&&raw?.shared===true,updated:Number.isFinite(raw?.updated)?Math.max(0,raw.updated):0};},
 plan(previous,recipient,now=Date.now()){if(previous.recipient===recipient)return this.sanitize(previous);return this.sanitize({recipient,updated:now});},
 mark(previous,key,now=Date.now()){const next=this.sanitize(previous);if(next.recipient&&['drawn','shared'].includes(key)){next[key]=!next[key];next.updated=now;}return next;},
 merge(left,right){return this.sanitize((left?.updated||0)>(right?.updated||0)?left:right);},
};
const FAMILY_CARD_NEW=[
 ['card','/kɑːd/','贺卡；卡片','u55-question','Who’s the card for?','这张卡是送给谁的？'],
 ['care','/keə/','关爱；照顾','u55-thanks','Thank you for your love and care.','谢谢你的爱与关怀。'],
 ['her','/hɜː/','她（在这里表示“给她”）','u55-for-her','This is for her.','这是送给她的。'],
].map(([id,ipa,meaning,exampleAudio,example,translation])=>({id,word:id,ipa,meaning,scene:'u5-family-card',exampleAudio,example,translation,parts:GUIDED_DATA[id].parts,hint:GUIDED_DATA[id].hint,tip:GUIDED_DATA[id].hint,kind:'拼读小老师'}));
const FAMILY_CARD_REVIEW=['love','thank','mum','dad','grandma','for','picture','from'].map(id=>{
 const old=Object.values(LESSONS).flatMap(l=>l.words).find(w=>w.id===id);if(!old)throw Error('Missing card review '+id);
 const current={love:['u55-love','I love you.','我爱你。'],thank:['u55-thanks','Thank you for your love and care.','谢谢你的爱与关怀。'],mum:['u55-mum','This is my mum.','这是我的妈妈。'],dad:['u55-dad','This is my dad.','这是我的爸爸。'],grandma:['u55-grandma','This is my grandma.','这是我的奶奶／外婆。'],for:['u55-for-her','This is for her.','这是送给她的。']}[id];
 return current?{...old,exampleAudio:current[0],example:current[1],translation:current[2]}:{...old};
});
const FAMILY_CARD_SCENES=[
 {id:'u5-family-card',name:'这张卡送给谁',alt:'原创场景：孩子展示画着奶奶和爱心的手工贺卡。',summary:'第62页先看贺卡上的 To Grandma，再判断它送给谁。画的是一位家人，心意送给她。',lines:[['u55-question','Who’s the card for?','这张卡是送给谁的？'],['u55-to-grandma','To Grandma.','送给奶奶／外婆。']]},
 {id:'u5-family-card',name:'画家人，写心意',alt:'原创手工贺卡制作场景，文字在页面中清楚呈现。',summary:'第62—63页先画一位家人，再写收件人、祝福语和自己的署名。先在这里选一选，再拿纸完成。',lines:[['u55-thanks','Thank you for your love and care.','谢谢你的爱与关怀。'],['u55-love','I love you.','我爱你。']]},
 {id:'u5-family-card',name:'举起贺卡，介绍给伙伴',alt:'孩子举起一张手工贺卡，准备向伙伴介绍。',summary:'第63页介绍贺卡上画的是谁、卡片要送给谁。教材示例是妈妈；你可以换成自己想感谢的家人。',lines:[['u55-mum','This is my mum.','这是我的妈妈。'],['u55-for-her','This is for her.','这是送给她的。']]},
];
const familyCardSpell=id=>({id:'u55-spell-'+id,type:'spell',word:id,audio:id,tilesOnly:true,extra:[id.includes('x')?'z':'x'],prompt:'听单词，点字母拼出来',answer:id,hint:'听完整词，从左往右选字母，多余的留在外面。'});
const FAMILY_CARD_MISSIONS=[
 {id:'signal',title:'接收贺卡工坊的消息',skill:'听词 · 理解心意',icon:'📡',story:'合影准备站的小伙伴来到心意贺卡工坊。听清词，准备把感谢送给家人。',done:'心意听清了，去拼好贺卡的声音。',tasks:[
  {id:'u55-hear-card',type:'choice',word:'card',audio:'card',prompt:'听一听，这个词是什么意思？',options:['贺卡；卡片','帽子','小狗'],answer:'贺卡；卡片',hint:'这是可以画画、写祝福送给人的东西。'},
  {id:'u55-hear-care',type:'choice',word:'care',audio:'care',prompt:'听一听，这个词是什么意思？',options:['照片','关爱；照顾','书包'],answer:'关爱；照顾',hint:'贺卡里感谢家人给予的爱与关怀。'},
 ]},
 {id:'sound',title:'接好两个相近词的声音',skill:'听整词 · 选音组',icon:'🔧',story:'两个词开头相同，结尾不同。听完整词，再排声音零件。',done:'结尾分清了，去拼写心意词卡。',tasks:[
  {id:'u55-build-card',type:'build',word:'card',audio:'card',prompt:'听单词，把声音零件排好',parts:['c','ar','d'],extra:['are'],answer:'card',hint:'听清结尾还有一个轻轻的辅音。'},
  {id:'u55-build-care',type:'build',word:'care',audio:'care',prompt:'听单词，把声音零件排好',parts:['c','are'],extra:['ar'],answer:'care',hint:'这一次结尾是一整组元音，不要再加上一个 d。'},
 ]},
 {id:'supply',title:'拼齐五张心意词卡',skill:'听完整词 · 点字母',icon:'🎒',story:'五张词卡都缺了字母。听清单词，再把词形拼完整。',done:'心意词卡齐了，去把祝福排成句子。',tasks:['card','care','her','love','thank'].map(familyCardSpell)},
 {id:'bridge',title:'把心意连成句子',skill:'中文提示 · 词卡排序',icon:'🌉',story:'先介绍家人，再说卡片送给谁，最后表达自己的心意。',done:'介绍句排好了，去检查收件人。',tasks:[
  {id:'u55-order-mum',type:'order',word:'mum',audio:'u55-mum',prompt:'听一听，把词卡排成一句话',parts:['This','is','my','mum.'],answer:'This is my mum.',zh:'这是我的妈妈。',showMeaning:true,hint:'先说 This is，再说 my 和家人称呼。'},
  {id:'u55-order-her',type:'order',word:'her',audio:'u55-for-her',prompt:'听一听，把词卡排成一句话',parts:['This','is','for','her.'],answer:'This is for her.',zh:'这是送给她的。',showMeaning:true,hint:'This is 后接 for，再说送给谁。'},
  {id:'u55-order-love',type:'order',word:'love',audio:'u55-love',prompt:'听一听，把词卡排成一句话',parts:['I','love','you.'],answer:'I love you.',zh:'我爱你。',showMeaning:true,hint:'从“我”开始，再说爱与对方。'},
 ]},
 {id:'friends',title:'把贺卡送对人',skill:'看收件人 · 理解句子',icon:'🤝',story:'收件人和落款要分清。仔细看卡片，再帮伙伴检查。',done:'送卡的准备完成了，轮到你开口介绍。',tasks:[
  {id:'u55-recipient',type:'choice',word:'grandma',audio:'u55-to-grandma',prompt:'卡片上写着 To Grandma，这张卡送给谁？',options:['奶奶／外婆','自己','妹妹'],answer:'奶奶／外婆',hint:'To 后面写收件人，From 后面写送卡的人。'},
  {id:'u55-care-gap',type:'gap',word:'care',audio:'u55-thanks',prompt:'听祝福，把表示“关怀”的词补进去',sentence:'Thank you for your love and ___.',zh:'谢谢你的爱与关怀。',options:['care','card','cap'],answer:'care',hint:'care 是关怀，card 是卡片；留意结尾。'},
 ]},
 {id:'party',title:'把感谢说给家人听',skill:'自愿开口 · 作品介绍',icon:'🎉',story:'举起贺卡，说说画的是谁、这份心意送给谁。也可以先用妈妈的例子练一遍。',done:'心意贺卡工坊完成！把贺卡纪念画带回共同营地。',tasks:[
  {id:'u55-speak',type:'speak',word:'her',audio:'u55-demo',prompt:'举起贺卡，介绍一位家人',sentence:'This is my mum. This is for her.',zh:'这是我的妈妈。这是送给她的。也可以在课本情境里听自己选的家人示范。',scene:'u5-family-card',sceneAlt:'原创贺卡制作场景。',hint:'先听，再自己读；不录音也能练习。'},
 ]},
];
LESSONS['unit5-05']={
 course:{...LESSONS['unit5-04'].course,lessonId:'unit5-05',number:5,familyFuel:false,familyCard:true,
  lessonTitle:'给家人做一张贺卡',page:'课本第62—63页 · Hit it big',description:'选家人 · 画贺卡 · 写心意 · 开口介绍',estimated:'三个小活动，纸上制作可以单独完成',heroScene:'u5-family-card',
  wordGroups:[{title:'贺卡里的三个新词',words:['card','care','her']},{title:'把心意说出来',words:['love','thank']}],contextWords:[],reviewWords:FAMILY_CARD_REVIEW.map(w=>w.id),
  adventure:{chapter:'第三十四章 · 心意贺卡工坊',title:'心意贺卡工坊',subtitle:'把感谢画下来，再说给家人听。',intro:'合影准备好了，小伙伴来到贺卡工坊，把一句感谢变成一份小礼物。',message:'听清词，拼词卡，排句子，再举起自己的贺卡。',end:'心意贺卡完成！把温暖带回营地。'}},
 words:[...FAMILY_CARD_NEW,...FAMILY_CARD_REVIEW],scenes:FAMILY_CARD_SCENES,tasks:[],missions:FAMILY_CARD_MISSIONS,
};
useLesson(requestedLesson);
