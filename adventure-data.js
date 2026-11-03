'use strict';
// The familiar adventure is retained. These original tasks practise Welcome p.2.
let ADVENTURE_MISSIONS=[
 {id:'signal',title:'接通信号港',skill:'听音认意',icon:'📡',story:'友谊星收到新朋友的问候！听清两条消息，帮米娅接通信号。',done:'问候信号接通啦！现在去修好拼读机。',tasks:[
  {id:'welcome-hear-hi',type:'picture',word:'hi',audio:'hi',prompt:'听到的词，适合哪幅画？',options:['hi','name','goodbye'],answer:'hi',hint:'见到小伙伴时，挥手说 hi。'},
  {id:'welcome-hear-hello',type:'choice',word:'hello',audio:'reply-hello',prompt:'新朋友发来的这条消息，是在做什么？',options:['打招呼','说再见','询问姓名'],answer:'打招呼',hint:'Hello! 是见面时的问候。'}]},
 {id:'sound',title:'修好拼读机',skill:'声音与拼读',icon:'🔧',story:'拼读机要先学会第一声问候。听老师把声音接起来，再装好声音零件。',done:'h 和 i 接起来，拼读机又能说 hi 啦！',tasks:[
  {id:'welcome-build-hi',type:'build',word:'hi',audio:'guided-hi',prompt:'听老师拼，把声音零件接起来',parts:['h','i'],answer:'hi',hint:'先听开头的声音，再把后面的声音接上。'}]},
 {id:'supply',title:'装满单词补给',skill:'独立拼写',icon:'🎒',story:'补给箱上缺少了姓名标签。把“名字”这个词拼出来，补给才能送到新朋友手里。',done:'name 标签贴好了，带着补给去句子桥。',tasks:[
  {id:'welcome-spell-name',type:'spell',word:'name',audio:'name',prompt:'为姓名标签拼出“名字”',answer:'name',extra:['i'],hint:'别漏掉末尾那个不单独发音的字母，再听一次试试。'}]},
 {id:'bridge',title:'走过句子桥',skill:'句子理解',icon:'🌉',story:'句子桥上的石头散开了。用课本里的自我介绍把桥接好，让新朋友走过来。',done:'My name is Amy. 句子桥接好啦！',tasks:[
  {id:'welcome-order-name',type:'order',word:'name',audio:'hello-amy',prompt:'把“我叫埃米”排成一句话',parts:['My','name','is','Amy.'],answer:'My name is Amy.',hint:'My name 开头，再接 is 和自己的名字。'}]},
 {id:'friends',title:'朋友广场见',skill:'情境对话',icon:'🤝',story:'广场上有人问你的名字。听懂课本中的问句，选一句合适的回答。',done:'新朋友记住名字啦！一起去迎新派对。',tasks:[
  {id:'welcome-reply-name',type:'dialogue',word:'name',audio:'ask-name',prompt:'对方问你的名字，可以怎样回答？',context:"新朋友：What's your name?",options:['My name is Amy.','Goodbye, Amy.','Have a nice day!'],answer:'My name is Amy.',hint:'My name is… 后面接自己的名字。'}]},
 {id:'party',title:'点亮欢迎派对',skill:'听懂 · 告别 · 开口',icon:'🎉',story:'欢迎派对结束了。听懂告别语，再像课本里那样介绍自己，为第一课收下一枚徽章。',done:'问候、介绍和告别都练过啦！欢迎营地等你来布置。',tasks:[
  {id:'welcome-hear-goodbye',type:'choice',word:'goodbye',audio:'reply-goodbye',prompt:'听一听，这句话适合什么时候说？',options:['离开时挥手告别','第一次询问姓名','告诉别人自己的名字'],answer:'离开时挥手告别',hint:'Goodbye! 是告别时说的“再见”。'},
  {id:'welcome-say-hello',type:'speak',audio:'hi-lingling',prompt:'像课本里那样，开口介绍自己',sentence:"Hi! I'm Lingling.",zh:'嗨！我是玲玲。也可以换成自己的名字。',hint:'先听一句，再用自己的名字试着介绍自己。'}]}
];
const ADVENTURE_DECORATIONS=[
 {id:'lamp',icon:'💡',name:'发光星灯',cost:15,description:'让营地亮起来'},
 {id:'flag',icon:'🌈',name:'彩虹欢迎旗',cost:30,description:'迎接每一位新朋友'},
 {id:'rocket',icon:'🚀',name:'友谊小火箭',cost:45,description:'为下一次冒险准备好'}
];
