'use strict';
const LESSONS={};
COURSE.number=1;COURSE.description='打招呼 · 问姓名 · 自我介绍 · 道别';COURSE.heroScene='greeting';
COURSE.adventure={chapter:'第一章 · 初到友谊星',title:'友谊星',subtitle:'欢迎派对快开始啦！',intro:'走过 6 个小关卡，练习本课的问候、姓名和告别。',message:'先听清问候，再修好拼读机、装上姓名补给。用课本里的句子认识新朋友！',end:'第一课的问候任务完成啦！下一次冒险，我们一起迎接星球的早晨。'};
LESSONS['welcome-01']={course:{...COURSE},words:[...WORDS],scenes:[...SCENES],tasks:[...TASKS],missions:[...ADVENTURE_MISSIONS]};
const morningWords=[
 {id:'good',word:'good',ipa:'/ɡʊd/',meaning:'好的',scene:'morning',tip:'g、oo、d 各发什么音？听完后慢慢接起来。oo 在 good 里是短音 /ʊ/。',parts:['g','oo','d'],kind:'拼读小老师',hint:'oo 在 good 里是短音 /ʊ/。',example:'Good morning!',exampleAudio:'good-morning',translation:'早上好！'},
 {id:'morning',word:'morning',ipa:'/ˈmɔː.nɪŋ/',meaning:'早晨；上午',scene:'morning',tip:'听 m、or、n、i、ng 的声音，再连起来。前一拍更响亮；ng 合成一个鼻音。',parts:['m','or','n','i','ng'],kind:'拼读小老师',hint:'or 在这里读 /ɔː/；ng 合读 /ŋ/，不要添一个 g。',example:'Good morning, Ms Smart!',exampleAudio:'morning-children',translation:'早上好，斯玛特老师！'}
];
const morningScenes=[{id:'morning',name:'早晨，和老师打招呼',audio:'book-morning',alt:'早晨明亮简洁的教室门口，老师与两个孩子微笑挥手问好。',lines:[
 {who:'斯玛特老师',text:'Good morning!',zh:'早上好！',audio:'good-morning'},
 {who:'斯玛特老师',text:"I'm Ms Smart.",zh:'我是斯玛特老师。',audio:'im-ms-smart'},
 {who:'同学们',text:'Good morning, Ms Smart!',zh:'早上好，斯玛特老师！',audio:'morning-children'}]}];
const morningTasks=[
 {id:'w2-hear',type:'listen',prompt:'听一听，这句问候适合什么时候？',audio:'good-morning',choices:['早晨见面','放学告别','询问姓名'],answer:'早晨见面',targets:['good','morning'],hint:'morning 是早晨，Good morning! 是早上好。'},
 {id:'w2-good',type:'spell',prompt:'听声音，拼出“好的”。',audio:'good',answer:'good',targets:['good'],hint:'g、两个 o、d。'},
 {id:'w2-order',type:'order',prompt:'把早晨问候排成一句话。',tiles:['morning!','Good'],answer:['Good','morning!'],targets:['morning'],hint:'Good 在前，morning 在后。'},
 {id:'w2-reply',type:'choice',prompt:'老师说早上好，你怎样回应？',quote:'Good morning!',audio:'good-morning',choices:['Good morning, Ms Smart!','Goodbye, Bobo.','My name is Amy.'],answer:'Good morning, Ms Smart!',targets:['morning'],hint:'也用 Good morning 回应老师。'}
];
const morningMissions=[
 {id:'signal',title:'接收晨光信号',skill:'听音认意',icon:'📡',story:'欢迎派对后的清晨，米娅收到老师的问候。听清消息，为新一天接通信号。',done:'听懂晨光问候啦！去给拼读机添一个新词。',tasks:[{id:'w2-morning-hear',type:'choice',word:'morning',audio:'good-morning',prompt:'这句话适合什么时候说？',options:['早晨见面时','放学告别时','询问姓名时'],answer:'早晨见面时',hint:'morning 是早晨。'}]},
 {id:'sound',title:'启动晨间拼读机',skill:'声音与拼读',icon:'🔧',story:'拼读机收到了新的声音。先听清完整单词，再把声音零件排好。',done:'g、oo、d 接好啦，good 读出来了！',tasks:[{id:'w2-build-good',type:'build',word:'good',audio:'good',prompt:'听单词，再拼出来',parts:['g','oo','d'],answer:'good',hint:'中间的字母组合是一块声音零件，听清它的前面和后面。'}]},
 {id:'supply',title:'贴好晨间补给标签',skill:'独立拼写',icon:'🎒',story:'为早晨的补给箱贴上“好的”标签。先听声音，再自己拼。',done:'补给准备好啦，一起去晨光句子桥。',tasks:[{id:'w2-spell-good',type:'spell',word:'good',audio:'good',prompt:'先听声音，再自己拼出这个词',answer:'good',extra:['u'],hint:'中间有两个相同字母。听清开头，再想想结尾。'}]},
 {id:'bridge',title:'接起晨光句子桥',skill:'组句 · 句中找词',icon:'🌉',story:'把早上好的句子接起来，再找到表示“早晨”的那个词。',done:'Good morning! 句子桥接好了。',tasks:[
 {id:'w2-order-morning',type:'order',word:'morning',audio:'good-morning',prompt:'把“早上好”排成一句话',parts:['Good','morning!'],answer:'Good morning!',hint:'Good 开头，再接 morning!。'},
 {id:'w2-find-morning',type:'find',word:'morning',audio:'morning-children',prompt:'句子里，哪个词表示“早晨”？',parts:['Good','morning,','Ms','Smart!'],answer:'morning,',zh:'早上好，斯玛特老师！',hint:'是 morning，词后的逗号表示停顿。'}]},
 {id:'friends',title:'和老师互道早安',skill:'情境对话',icon:'🤝',story:'来到学习广场，老师向你说早上好。选一句合适的回应。',done:'晨间问候传到了广场，大家准备开始学习。',tasks:[{id:'w2-reply-morning',type:'dialogue',word:'morning',audio:'good-morning',prompt:'老师向你问好，你可以怎样回应？',context:'老师：Good morning!',options:['Good morning, Ms Smart!','Goodbye, Bobo.','My name is Amy.'],answer:'Good morning, Ms Smart!',hint:'对老师也说 Good morning，再加上称呼。'}]},
 {id:'party',title:'开启星球新一天',skill:'补词 · 开口问候',icon:'🎉',story:'用一句完整的早上好，开启星球新一天。说完后回营地看看已经收集的礼物。',done:'晨光任务完成啦！你的星空又多了两个新朋友。',tasks:[
 {id:'w2-gap-morning',type:'gap',word:'good',audio:'good-morning',prompt:'补全早晨问候',sentence:'___ morning!',zh:'早上好！',options:['Good','My','name'],answer:'Good',hint:'Good morning! 前面是 Good。'},
 {id:'w2-say-morning',type:'speak',audio:'morning-children',prompt:'开口向老师问声早上好',sentence:'Good morning, Ms Smart!',zh:'早上好，斯玛特老师！',hint:'先听一句，再跟着说，留意 morning 的前一拍更响。'}]}
];
LESSONS['welcome-02']={course:{...COURSE,number:2,lessonId:'welcome-02',lessonTitle:'早上好，老师！',page:'课本第3页 · 活动2',estimated:'约5—8分钟',description:'早晨问候 · 听清拼读 · 回应老师',heroScene:'morning',adventure:{chapter:'第二章 · 星球的早晨',title:'晨光小任务',subtitle:'友谊星的新一天开始啦！',intro:'跟随上一课的伙伴，用 Good morning 向老师问好。',message:'欢迎派对后的清晨，一起收好晨光消息，把问候送到学习广场。',end:'第二课晨光任务完成啦！下一部分再练课堂指令。'}},words:morningWords,scenes:morningScenes,tasks:morningTasks,missions:morningMissions};
const welcomeMenu=[
 {number:1,id:'welcome-01',title:'你好，你叫什么名字？',page:2,activity:'活动1 · Look and listen',ready:true},
 {number:2,id:'welcome-02',title:'早上好，老师！',page:3,activity:'活动2 · Look and listen',ready:true},
 {number:3,title:'听懂课堂指令',page:3,activity:'活动3 · Point and say'},
 {number:4,title:'认识课本里的新朋友',page:4,activity:'活动4 · Meet your new friends'},
 {number:5,title:'听一听，找一找字母',page:5,activity:'活动5 · Listen, point and say'}
];
for(const l of Object.values(LESSONS))l.course.welcomeLessons=welcomeMenu;
function useLesson(id){const l=LESSONS[id]||LESSONS['welcome-01'];COURSE=l.course;WORDS=l.words;SCENES=l.scenes;TASKS=l.tasks;ADVENTURE_MISSIONS=l.missions;}
const requestedLesson=new URLSearchParams(location.search).get('lesson');useLesson(requestedLesson);
