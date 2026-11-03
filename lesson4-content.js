'use strict';
// Textbook p4 activity4 names; only hi/name are review words, not five new spelling targets.
const PEOPLE4=[
 {id:'lingling',name:'Lingling',zh:'玲玲',group:'cn',audio:'person-lingling',identity:'中国朋友',voiceLabel:'听中文姓名'},
 {id:'daming',name:'Daming',zh:'大明',group:'cn',audio:'person-daming',identity:'中国朋友',voiceLabel:'听中文姓名'},
 {id:'bobo',name:'Bobo',zh:'波波',group:'robot',audio:'person-bobo',identity:'机器人朋友',voiceLabel:'听名字'},
 {id:'sam',name:'Sam',zh:'萨姆',group:'uk',audio:'person-sam',identity:'英国朋友',voiceLabel:'听名字'},
 {id:'amy',name:'Amy',zh:'埃米',group:'uk',audio:'person-amy',identity:'英国朋友',voiceLabel:'听名字'}
];
const peopleScenes=[
 {id:'friends-cn',name:'先认识玲玲和大明',audio:'book-people-cn',alt:'简洁教室里，黑色高马尾女孩和黑色短发男孩微笑挥手，原创情境示意。',lines:['lingling','daming'].map(id=>{const p=PEOPLE4.find(p=>p.id===id);return {who:p.identity,text:p.name,zh:p.zh,audio:p.audio,voiceLabel:p.voiceLabel};})},
 {id:'friends-uk',name:'再认识萨姆和埃米',audio:'book-people-uk',alt:'简洁教室里，红色卷发男孩与金色发髻女孩微笑问好，原创情境示意。',lines:['sam','amy'].map(id=>{const p=PEOPLE4.find(p=>p.id===id);return {who:p.identity,text:p.name,zh:p.zh,audio:p.audio,voiceLabel:p.voiceLabel};})},
 {id:'friends-robot',name:'还有机器人朋友波波',audio:'book-people-robot',alt:'一位白色与青绿色的友好机器人挥手，原创情境示意。',lines:[{who:'机器人朋友',text:'Bobo',zh:'波波',audio:'person-bobo',voiceLabel:'听名字'}]}
];
const peopleQuestion=(id,options)=>({id:'w4-hear-'+id,type:'choice',audio:'person-'+id,prompt:'听名字，选出对应的姓名卡',options,answer:PEOPLE4.find(p=>p.id===id).name,hint:'再听一次名字，对照课本第4页想一想。'});
const peopleMissions=[
 {id:'signal',title:'接收朋友的名片',skill:'听名字 · 认姓名卡',icon:'📡',story:'课堂指令练过啦，学习舱收到新朋友的名片。听清名字，把消息送对地方。',done:'三张名片都送到啦！继续把熟悉的问候带给朋友。',tasks:[peopleQuestion('lingling',['Lingling','Daming','Amy']),peopleQuestion('daming',['Sam','Daming','Bobo']),peopleQuestion('bobo',['Amy','Bobo','Lingling'])]},
 {id:'sound',title:'接通问候的声音',skill:'听整词 · 声音拼合',icon:'🔧',story:'修好的拼读机要向朋友问声好。先听完整单词，再把声音零件排好。',done:'问候的声音准备好啦！去给名片箱贴标签。',tasks:[{id:'w4-build-hi',type:'build',word:'hi',audio:'hi',prompt:'听单词，再拼出来',parts:['h','i'],answer:'hi',hint:'先听开头，再把后面的声音接上。'}]},
 {id:'supply',title:'贴好名片箱标签',skill:'听整词 · 独立拼写',icon:'🎒',story:'朋友们的名片需要一个“名字”标签。复习前面学过的词，给名片箱贴好标签。',done:'标签准备好了！带着名片去问候桥。',tasks:[{id:'w4-spell-name',type:'spell',word:'name',audio:'name',prompt:'听单词，为“名字”标签拼写',answer:'name',extra:['i'],hint:'别漏掉末尾那个不单独发音的字母，再听一次。'}]},
 {id:'bridge',title:'搭起自我介绍桥',skill:'复习句子 · 找词',icon:'🌉',story:'用第一课学过的问候和自我介绍搭好桥，把名字介绍给朋友听。',done:'姓名问答的桥接好啦！更多朋友正在广场等你。',tasks:[
 {id:'w4-order-amy',type:'order',word:'name',audio:'hello-amy',prompt:'把“你好，我叫埃米”排成一句话',parts:['Hello.','My','name','is','Amy!'],answer:'Hello. My name is Amy!',hint:'先问好，再用前面学过的“我叫……”介绍名字。'},
 {id:'w4-find-name',type:'find',word:'name',audio:'ask-name',prompt:'问句里，哪个词表示“名字”？',parts:["What's",'your','name?'],answer:'name?',zh:'你叫什么名字？',hint:'听完整个问句，找出表示“名字”的那个词。'}]},
 {id:'friends',title:'在朋友广场认名片',skill:'听名字 · 选名片',icon:'🤝',story:'两位英国朋友也来到广场。听他们的名字，找出各自的姓名卡。',done:'五位课本朋友的名字都练过啦！再听一次完整介绍。',tasks:[peopleQuestion('sam',['Amy','Sam','Daming']),peopleQuestion('amy',['Bobo','Lingling','Amy'])]},
 {id:'party',title:'点亮朋友留言板',skill:'听句辨人 · 自愿开口',icon:'🎉',story:'朋友们把自我介绍留在留言板上。听懂是谁，再用前面学过的话介绍自己。',done:'朋友留言板点亮啦！今天练过的名字，可以回课本再指一指、说一说。',tasks:[
 {id:'w4-who-bobo',type:'choice',audio:'im-bobo',prompt:'听这句自我介绍，是哪位朋友？',options:['Sam','Bobo','Amy'],answer:'Bobo',hint:'这句话先说“我是”，后面就是朋友的名字。'},
 {id:'w4-say-myname',type:'speak',audio:'hello-amy',prompt:'像第一课那样，试着介绍自己',sentence:'Hello. My name is Amy!',zh:'你好，我叫埃米。也可以换成自己的名字。',hint:'先听示范，再用自己的名字开口说一句。'}]}
];
const peopleTasks=[
 {id:'w4-core-greeting',type:'listen',audio:'hi',prompt:'听声音，选择意思',choices:['嗨，你好','合上书','坐下'],answer:'嗨，你好',targets:['hi'],hint:'见到朋友时可以挥手问好。'},
 {id:'w4-core-name',type:'spell',audio:'name',prompt:'听声音，拼出“名字”',answer:'name',targets:['name'],hint:'想想前面学过的词，别漏掉末尾的字母。'}
];
LESSONS['welcome-04']={course:{...LESSONS['welcome-02'].course,number:4,lessonId:'welcome-04',lessonTitle:'认识课本里的新朋友',page:'课本第4页 · 活动4',estimated:'三个短环节，可分次完成',description:'认识五个名字 · 复习问候与自我介绍',heroScene:'friends-cn',people:true,reviewOnly:true,adventure:{chapter:'第四章 · 朋友名片到站啦',title:'朋友名片小任务',subtitle:'把名字和问候，送给课本里的新朋友。',intro:'听名字、认名片，再用熟悉的话介绍自己。',message:'从学习舱来到朋友广场，收好五位朋友的姓名卡。人名只需听懂认读，拼词关卡复习学过的词。',end:'五位朋友的名字练过啦，下一课再继续探索字母。'}},words:LESSONS['welcome-01'].words.filter(w=>['hi','name'].includes(w.id)).map(w=>({...w})),scenes:peopleScenes,tasks:peopleTasks,missions:peopleMissions};
welcomeMenu.splice(3,1,{number:4,id:'welcome-04',title:'认识课本里的新朋友',page:4,activity:'活动4 · Meet your new friends',ready:true});
for(const l of Object.values(LESSONS))l.course.welcomeLessons=welcomeMenu;
useLesson(requestedLesson);
