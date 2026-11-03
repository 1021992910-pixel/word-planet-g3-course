'use strict';
// Complete textbook activity3, in three short within-lesson sections.
const actionDescriptions={stand:['stand','站；站立','/stænd/','cmd-stand','Stand up!','站起来！'],sit:['sit','坐','/sɪt/','cmd-sit','Sit down!','坐下！'],open:['open-book','打开','/ˈəʊ.pən/','cmd-open','Open your book!','打开你的书！'],close:['close-book','合上；关闭','/kləʊz/','cmd-close','Close your book!','合上你的书！'],book:['open-book','书','/bʊk/','cmd-open','Open your book!','打开你的书！'],point:['point','指','/pɔɪnt/','cmd-point','Point!','指一指！'],say:['say','说','/seɪ/','cmd-say','Say!','说一说！'],read:['open-book','读；阅读','/riːd/','cmd-read','Read!','读一读！'],listen:['listen','听','/ˈlɪs.ən/','cmd-listen','Listen!','听一听！'],write:['write','写','/raɪt/','cmd-write','Write!','写一写！']};
const actionGroups=[{title:'起立坐下 · 开合书',words:['stand','sit','open','close','book']},{title:'指一指 · 说一说 · 读一读',words:['point','say','read']},{title:'听一听 · 写一写',words:['listen','write']}];
const actionWords=Object.entries(actionDescriptions).map(([id,[scene,meaning,ipa,exampleAudio,example,translation]])=>({id,word:id,scene,meaning,ipa,exampleAudio,example,translation,parts:GUIDED_DATA[id].parts,kind:'拼读小老师',hint:GUIDED_DATA[id].hint,tip:GUIDED_DATA[id].hint}));
function actionLine(key){const d=actionDescriptions[key];return {who:'老师的指令',text:d[4],zh:d[5],audio:d[3],scene:d[0]};}
const actionScenes=[
 {id:'stand',name:'起立、坐下，准备好书',audio:'book-actions1',alt:'简洁教室中小男孩站在椅子旁，准备听老师指令。',lines:['stand','sit','open','close'].map(actionLine)},
 {id:'point',name:'指一指，说一说，读一读',audio:'book-actions2',alt:'小男孩用食指指着桌上的书。',lines:['point','say','read'].map(actionLine)},
 {id:'listen',name:'听一听，写一写',audio:'book-actions3',alt:'小女孩侧耳认真听老师说话。',lines:['listen','write'].map(actionLine)}
];
const actionMissions=[
 {id:'signal',title:'接通课堂信号',skill:'听指令认动作',icon:'📡',story:'友谊星的晨间问候结束，学习舱开课啦！听清指令，帮伙伴做对动作。',done:'课堂信号接通啦！去拼读工坊准备新词。',tasks:[
 {id:'w3-hear-stand',type:'picture',word:'stand',audio:'cmd-stand',prompt:'听指令，选出要做的动作',options:['stand','sit','open'],answer:'stand',hint:'stand up 是站起来。'},
 {id:'w3-hear-sit',type:'picture',word:'sit',audio:'cmd-sit',prompt:'再听一条，伙伴该做哪个动作？',options:['stand','sit','close'],answer:'sit',hint:'sit down 是坐下。'},
 {id:'w3-hear-close',type:'picture',word:'close',audio:'cmd-close',prompt:'听一听，这时书应该是什么样？',options:['open','close','write'],answer:'close',hint:'close your book 是合上书。'}]},
 {id:'sound',title:'拼好课堂声音',skill:'声音组装',icon:'🔧',story:'拼读机需要新的课堂声音。先听清完整单词，再把声音零件排好。',done:'sit 和 book 都拼出来啦！',tasks:[
 {id:'w3-build-sit',type:'build',word:'sit',audio:'sit',prompt:'听单词，再拼出来',parts:['s','i','t'],answer:'sit',hint:'先听开头，再接中间的短音，最后别漏掉尾音。'},
 {id:'w3-build-book',type:'build',word:'book',audio:'book',prompt:'听单词，再拼出来',parts:['b','oo','k'],answer:'book',hint:'中间的字母组合是一块声音零件，别把它拆开。'}]},
 {id:'supply',title:'给书箱贴标签',skill:'独立拼写',icon:'🎒',story:'课堂书箱缺少了标签，把书和动作的词拼好，帮伙伴准备学习用品。',done:'书箱和动作标签都准备好了！',tasks:[
 {id:'w3-spell-book',type:'spell',word:'book',audio:'book',prompt:'听声音，为书箱拼出“书”',answer:'book',extra:['u'],hint:'中间需要两个相同字母，开头和结尾也要听清。'},
 {id:'w3-spell-open',type:'spell',word:'open',audio:'open',prompt:'听声音，拼出“打开”',answer:'open',extra:['a'],hint:'从开头的声音想起，别漏掉后面的声音。'}]},
 {id:'bridge',title:'接起指令句子桥',skill:'组句 · 找词',icon:'🌉',story:'句子桥通向学习舱。先排好完整指令，再找出句子里的“书”。',done:'Open your book! 指令句子桥连好啦！',tasks:[
 {id:'w3-order-open',type:'order',word:'open',audio:'cmd-open',prompt:'把“打开你的书”排成一句话',parts:['Open','your','book!'],answer:'Open your book!',hint:'动作 Open 在前面，接 your book!。'},
 {id:'w3-find-book',type:'find',word:'book',audio:'cmd-close',prompt:'句子中，哪个词表示“书”？',parts:['Close','your','book!'],answer:'book!',zh:'合上你的书！',hint:'book 是书，后面有感叹号。'},
 {id:'w3-gap-close',type:'gap',word:'close',audio:'cmd-close',prompt:'合上书，该用哪个动作词？',sentence:'___ your book!',zh:'合上你的书！',options:['Close','Open','Read'],answer:'Close',hint:'Close 表示合上。'}]},
 {id:'friends',title:'听懂学习舱老师',skill:'听辨 · 情境运用',icon:'🤝',story:'伙伴们来到学习舱。听老师说的是指、说、读，还是听、写，再做相应动作。',done:'五个课堂小动作都听懂、练过啦！',tasks:[
 ...['point','say','read','listen','write'].map(id=>({id:'w3-understand-'+id,type:'picture',word:id,audio:actionDescriptions[id][3],prompt:'听清指令，选出相应动作',options:id==='point'?['point','say','read']:id==='say'?['say','listen','write']:id==='read'?['read','point','close']:id==='listen'?['listen','say','write']:['write','read','point'],answer:id,hint:actionDescriptions[id][5]}))]},
 {id:'party',title:'点亮课堂练习台',skill:'综合听辨 · 开口',icon:'🎉',story:'学习舱准备好啦。再听一次关键指令，开口说完整一句，把今天的课堂星光收好。',done:'第三部分的课堂指令练过啦！星空和营地保留着这次旅程。',tasks:[
 {id:'w3-final-open',type:'choice',word:'open',audio:'cmd-open',prompt:'听到这句话，应该做什么？',options:['打开书','合上书','站起来'],answer:'打开书',hint:'Open your book! 是打开你的书。'},
 {id:'w3-say-command',type:'speak',audio:'cmd-open',prompt:'试着当小老师，说一句完整指令',sentence:'Open your book!',zh:'打开你的书！读完可以自己做一做。',hint:'先听示范，再把 Open your book 连起来说。'}]}
];
const actionTasks=['stand','sit','open','close','point','say','read','listen','write'].map(id=>({id:'w3-core-'+id,type:'listen',prompt:'听清指令，选择意思',audio:actionDescriptions[id][3],choices:[...new Set([actionDescriptions[id][5],'问候老师','询问名字'])],answer:actionDescriptions[id][5],targets:id==='open'?['open','book']:[id],hint:actionDescriptions[id][5]}));
LESSONS['welcome-03']={course:{...LESSONS['welcome-02'].course,number:3,lessonId:'welcome-03',lessonTitle:'听懂指令，动起来！',page:'课本第3页 · 活动3（完整）',estimated:'三个短环节，可分次完成',description:'九条课堂指令 · 看图做动作 · 拼读与巩固',heroScene:'open-book',actions:true,wordGroups:actionGroups,adventure:{chapter:'第三章 · 学习舱开课啦',title:'课堂小任务',subtitle:'跟着老师的指令，开启学习舱！',intro:'九条课堂指令分组学，六个小关卡慢慢练。',message:'从星球的早晨走进学习舱，先听清动作，再把词和句子接起来。',end:'完整课堂指令练过啦，下一次再认识课本里的小伙伴。'}},words:actionWords,scenes:actionScenes,tasks:actionTasks,missions:actionMissions};
welcomeMenu.splice(2,1,{number:3,id:'welcome-03',title:'听懂指令，动起来！',page:3,activity:'活动3 · Point and say（完整）',ready:true});
for(const l of Object.values(LESSONS))l.course.welcomeLessons=welcomeMenu;
useLesson(requestedLesson);
