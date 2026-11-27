'use strict';
const FAMILY_WRAP_CHECKS=[
 {id:'family-names',text:'我会说家人的称呼。',lesson:'unit5-01'},
 {id:'family-questions',text:'我会用 This / That is… 和 Who is this / that? 谈论家人。',lesson:'unit5-02'},
 {id:'family-story',text:'我能和伙伴讲一个家庭故事。',lesson:'unit5-03'},
 {id:'different-families',text:'我能说说不同的家庭。',lesson:'unit5-04'},
];
const FAMILY_WRAP_CORE=['family','dad','mum','brother','sister','grandpa','grandma','but','people','story','cap','worry','on','photo','love','daddy','mummy','where','dog','box'];
const FAMILY_WRAP_FOCUS=['family','brother','sister','grandpa','grandma','baby'];
const FAMILY_WRAP_WORDS=[...FAMILY_WRAP_CORE,'father','mother','grandfather','grandmother','come-on','baby','orange'].map(id=>{
 const source=Object.values(LESSONS).flatMap(l=>l.words).find(w=>w.id===id);if(!source)throw Error('Missing family review word '+id);
 const current={family:['u56-family','This is my family.','这是我的家人。'],dad:['u56-dad','This is my dad.','这是我的爸爸。'],mum:['u56-mum','This is my mum.','这是我的妈妈。'],grandma:['u56-grandma','This is my grandma.','这是我的奶奶／外婆。'],grandpa:['u56-grandpa','This is my grandpa.','这是我的爷爷／外公。'],father:['u56-father','This is the father.','这是爸爸。'],mother:['u56-mother','This is the mother.','这是妈妈。'],baby:['u56-baby','This is the baby.','这是宝宝。']}[id];
 return current?{...source,exampleAudio:current[0],example:current[1],translation:current[2]}:{...source};
});
const FAMILY_WRAP_BOARD=[
 {title:'爸爸是谁',instruction:'指课本起点后绿色格的爸爸，试着回答。',question:'u56-who-this',answer:[['u56-dad','This is my dad.','这是我的爸爸。']]},
 {title:'读两个词',instruction:'先读课本蓝色格里的两个词，再听一听。',words:['orange','box']},
 {title:'说说这一家人',instruction:'看课本橙色格的一家人，接着说 The family is…；不止一种说法。',answer:[['u56-happy','The family is happy.','这一家人很快乐。'],['u56-big','The family is big.','这是一个大家庭。']]},
 {title:'读爷爷的称呼',instruction:'课本紫色格里的词，先自己试着读。',words:['grandpa']},
 {title:'认一认奶奶',instruction:'指课本黄色格端饮料的奶奶，问一问、答一答。',question:'u56-who-this',answer:[['u56-grandma','This is my grandma.','这是我的奶奶／外婆。']]},
 {title:'读哥哥或弟弟',instruction:'同一个词可以指哥哥，也可以指弟弟。',words:['brother']},
 {title:'休息一小步',instruction:'课本有 Lose a turn。这里可以停一停、换伙伴，不扣金币。',pause:true},
 {title:'介绍自己的家人',instruction:'选你想说的家人，用一句话介绍；不需要上传照片。',answer:[['u56-family','This is my family.','这是我的家人。']]},
 {title:'再认一位爷爷',instruction:'指课本紫色格中的爷爷，再试着回答。',question:'u56-who-this',answer:[['u56-grandpa','This is my grandpa.','这是我的爷爷／外公。']]},
 {title:'读妈妈的称呼',instruction:'读课本终点前蓝色格的词，再听示范。',words:['mum']},
];
const FAMILY_WRAP_SCENES=[
 {id:'u5-family',name:'家庭十格复习',alt:'原创家庭合影，帮助回顾家人的称呼。',summary:'打开第64页，从起点顺着棋盘走。每次选一格，先自己说，再听参考；也可以和伙伴轮流。',lines:[['u56-who-this','Who’s this?','这是谁？'],['u56-dad','This is my dad.','这是我的爸爸。']]},
 {id:'u5-family-card',name:'我会了吗',alt:'孩子展示手工家人贺卡，回顾本单元的学习。',summary:'第64页四项目标。先试着说、问或讲一次，能自己完成再勾选；还不熟的可以回到对应课练习。',lines:[['u56-who-that','Who’s that?','那是谁？'],['u56-that-grandma','That is my grandma.','那是我的奶奶／外婆。']]},
 {id:'u5-family-nature',name:'动物也有一家人',alt:'原创狮子一家示意：雄狮、母狮和一只幼狮。',summary:'第65页有大象、孔雀和狮子家庭的照片。先观察小宝宝，再比较 father、mother 和 baby；这里用原创狮子一家练指认。',lines:[['u56-father','This is the father.','这是爸爸。'],['u56-mother','This is the mother.','这是妈妈。'],['u56-baby','This is the baby.','这是宝宝。']]},
];
const familyWrapSpell=id=>({id:'u56-spell-'+id,type:'spell',word:id,audio:id,tilesOnly:true,extra:['x'],prompt:'听单词，点字母拼出来',answer:id,hint:'听清完整词，从左往右点选，多余字母留在外面。'});
const FAMILY_WRAP_MISSIONS=[
 {id:'signal',title:'接收家庭复习站的消息',skill:'听称呼 · 找意思',icon:'✦',story:'把贺卡送出后，小伙伴来到家庭观察站。先听清两位家人的称呼。',done:'消息收到，去接好熟悉的声音。',tasks:[
  {id:'u56-hear-grandpa',type:'choice',word:'grandpa',audio:'grandpa',prompt:'你听到的称呼指谁？',options:['爷爷／外公','奶奶／外婆','姐姐／妹妹'],answer:'爷爷／外公',hint:'两个祖辈称呼开头相同，留意后半段。'},
  {id:'u56-hear-grandma',type:'choice',word:'grandma',audio:'grandma',prompt:'这次的称呼指谁？',options:['爸爸','奶奶／外婆','哥哥／弟弟'],answer:'奶奶／外婆',hint:'可以重听，也可以回图鉴慢拼。'},
 ]},
 {id:'sound',title:'接好两位小伙伴的声音',skill:'听完整词 · 拼词块',icon:'✦',story:'两张家人标签的词块散开了。听清整词，再把它们接起来。',done:'词块接好了，再把字母一个个拼完整。',tasks:[
  {id:'u56-build-brother',type:'build',word:'brother',audio:'brother',prompt:'听单词，把声音零件排好',parts:['bro','ther'],extra:['sis'],answer:'brother',hint:'先听清开头，再接上后半段。'},
  {id:'u56-build-sister',type:'build',word:'sister',audio:'sister',prompt:'听单词，把声音零件排好',parts:['sis','ter'],extra:['bro'],answer:'sister',hint:'先听清开头，再接上后半段。'},
 ]},
 {id:'supply',title:'补齐六张家庭词卡',skill:'听词 · 点字母拼写',icon:'✦',story:'给六张复习词卡补齐字母。每张都有一个多余字母。',done:'标签齐了，去搭家庭句子桥。',tasks:FAMILY_WRAP_FOCUS.map(familyWrapSpell)},
 {id:'bridge',title:'把家庭问答排完整',skill:'中文支架 · 句子排序',icon:'✦',story:'先问是谁，再介绍家人，最后介绍动物宝宝。',done:'问答接好了，去看看动物的一家人。',tasks:[
  {id:'u56-order-question',type:'order',word:'family',audio:'u56-who-this',prompt:'听一听，把词卡排成一句话',parts:['Who’s','this?'],answer:'Who’s this?',zh:'这是谁？',showMeaning:true,hint:'先问“谁”，再说“这个人”。'},
  {id:'u56-order-grandma',type:'order',word:'grandma',audio:'u56-grandma',prompt:'听一听，把词卡排成一句话',parts:['This','is','my','grandma.'],answer:'This is my grandma.',zh:'这是我的奶奶／外婆。',showMeaning:true,hint:'This is 后面说 my 和家人称呼。'},
  {id:'u56-order-baby',type:'order',word:'baby',audio:'u56-baby',prompt:'听一听，把词卡排成一句话',parts:['This','is','the','baby.'],answer:'This is the baby.',zh:'这是宝宝。',showMeaning:true,hint:'This is 后接 the 和你介绍的成员。'},
 ]},
 {id:'friends',title:'认识动物家庭的成员',skill:'听懂称呼 · 英汉对应',icon:'✦',story:'课本上的三种动物都有小宝宝。把熟悉的称呼放到新情境里听懂。',done:'小宝宝找到了，把一家人的介绍说出来。',tasks:[
  {id:'u56-nature-father',type:'dialogue',word:'father',audio:'u56-father',prompt:'这句介绍说的是哪位成员？',options:['爸爸','妈妈','宝宝'],answer:'爸爸',hint:'听句尾的家人称呼。'},
  {id:'u56-nature-baby',type:'dialogue',word:'baby',audio:'u56-baby',prompt:'这句介绍说的是哪位成员？',options:['爷爷','宝宝','妈妈'],answer:'宝宝',hint:'小动物幼崽也可以叫这个词。'},
 ]},
 {id:'party',title:'把一家人的故事带回营地',skill:'观察 · 自愿开口',icon:'✦',story:'指着小狮子，试着介绍它。再和伙伴找一种别的动物家庭。',done:'第五单元复习完成！可以兑换狮子一家纪念画。',tasks:[
  {id:'u56-speak',type:'speak',word:'baby',audio:'u56-baby',prompt:'指着图中的宝宝，开口介绍',sentence:'This is the baby.',zh:'这是宝宝。先听、跟读，再指着图中的成年狮子说 father 或 mother。',scene:'u5-family-nature',sceneAlt:'原创狮子一家，父母和一只幼狮在一起。',hint:'这是练习开口，不自动判断发音。'},
 ]},
];
LESSONS['unit5-06']={
 course:{...LESSONS['unit5-05'].course,lessonId:'unit5-06',number:6,familyCard:false,familyWrap:true,
 lessonTitle:'家庭复习站：动物也有一家人',page:'课本第64—65页 · Wrap up / Check it / Let’s explore',description:'十格复习 · 四项自查 · 动物家庭',estimated:'三个短活动，可分次完成',heroScene:'u5-family-nature',
 wordGroups:[{title:'家人与兄弟姐妹',words:FAMILY_WRAP_FOCUS.slice(0,3)},{title:'祖辈与小宝宝',words:FAMILY_WRAP_FOCUS.slice(3)}],contextWords:[],reviewWords:FAMILY_WRAP_WORDS.map(w=>w.id),
 adventure:{chapter:'第三十五章 · 家庭观察站',title:'一家人的复习小旅行',subtitle:'复习称呼和问答，认识动物家庭。',intro:'从心意贺卡工坊出发，小伙伴来到家庭观察站，把本单元的收获带在身边。',message:'听称呼、拼词卡、接句子，再介绍小动物。',end:'第五单元的复习旅程完成！'}},
 words:FAMILY_WRAP_WORDS,scenes:FAMILY_WRAP_SCENES,tasks:[],missions:FAMILY_WRAP_MISSIONS,
};
useLesson(requestedLesson);
