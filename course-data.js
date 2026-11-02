'use strict';
const COURSE={version:1,book:'外研版 · 孙有中主编 · 三年级上册',lessonId:'welcome-01',lessonTitle:'你好，你叫什么名字？',section:'Welcome to school',page:'课本第2页 · 活动1',estimated:'约8—12分钟',source:'https://fliphtml5.com/ecdke/unbt/',experience:'https://1021992910-pixel.github.io/little-word-atlas-g3/?v=sky1#learn',
 units:[
  {id:'welcome',number:'W',title:'Welcome to school',zh:'欢迎来到学校',pages:'2—5',ready:true},
  {id:'unit1',number:'01',title:"Let’s be friends!",zh:'交个朋友吧',pages:'6—17'},
  {id:'unit2',number:'02',title:'My school things',zh:'我的学习用品',pages:'18—29'},
  {id:'unit3',number:'03',title:"It’s a colourful world!",zh:'多彩的世界',pages:'30—41'},
  {id:'unit4',number:'04',title:'Fun with numbers',zh:'数字真有趣',pages:'42—53'},
  {id:'unit5',number:'05',title:"We’re family",zh:'我们是一家人',pages:'54—65'},
  {id:'unit6',number:'06',title:'My sweet home',zh:'温馨的家',pages:'66—78'}
 ],welcomeLessons:[
  {number:1,title:'你好，你叫什么名字？',page:2,activity:'Look and listen',ready:true},
  {number:2,title:'早上好，听懂课堂指令',page:3,activity:'Look and listen · Point and say'},
  {number:3,title:'认识课本里的新朋友',page:4,activity:'Meet your new friends'},
  {number:4,title:'听一听，找一找字母',page:5,activity:'Listen, point and say'}
 ]};
const WORDS=[
 {id:'hi',word:'hi',ipa:'/haɪ/',meaning:'嗨；你好',scene:'greeting',tip:'轻轻送气，再把声音滑到 /aɪ/。',parts:['h','i'],kind:'拼读小老师',hint:'i 在 hi 这个词里读 /aɪ/。',example:"Hi! I'm Lingling.",exampleAudio:'hi-lingling',translation:'嗨！我是玲玲。'},
 {id:'hello',word:'hello',ipa:'/həˈləʊ/',meaning:'你好',scene:'greeting',tip:'两小拍，前面轻，后面响。',parts:['hello'],kind:'跟着节奏读',hint:'听完整声音，第二拍更响亮。',example:'Hello. My name is Amy!',exampleAudio:'hello-amy',translation:'你好。我叫埃米！'},
 {id:'name',word:'name',ipa:'/neɪm/',meaning:'名字',scene:'name',tip:'a 和 e 隔着 m，一起发 /eɪ/；e 不单独读。',parts:['n','a_e','m'],kind:'拼读小老师',hint:'a_e 在 name 里读 /eɪ/，最后双唇轻合。',example:"What's your name?",exampleAudio:'ask-name',translation:'你叫什么名字？'},
 {id:'goodbye',word:'goodbye',ipa:'/ˌɡʊdˈbaɪ/',meaning:'再见',scene:'farewell',tip:'先听 good，再听 bye，接起来读。',parts:['good','bye'],kind:'词块连起来',hint:'good + bye，合起来就是告别。',example:'Goodbye, Bobo.',exampleAudio:'bye-bobo',translation:'再见，波波。'}
];
const SCENES=[
 {id:'greeting',name:'见面，打声招呼',audio:'book-greeting',alt:'两位小学生在简洁的学校门口相互微笑挥手。',lines:[
  {who:'玲玲',text:"Hi! I'm Lingling.",zh:'嗨！我是玲玲。',audio:'hi-lingling'},
  {who:'玲玲',text:"What's your name?",zh:'你叫什么名字？',audio:'ask-name'},
  {who:'埃米',text:'Hello. My name is Amy!',zh:'你好。我叫埃米！',audio:'hello-amy'}]},
 {id:'farewell',name:'离开时，挥手说再见',audio:'book-farewell',alt:'一位小学生向外走，回头向同学挥手告别，背景只有简洁的校门与天空。',lines:[
  {who:'小伙伴们',text:'Goodbye, Bobo.',zh:'再见，波波。',audio:'bye-bobo'},
  {who:'波波',text:'Have a nice day!',zh:'祝你们度过愉快的一天！',audio:'nice-day'}]}
];
const TASKS=[
 {id:'hear-hi',type:'listen',prompt:'听一听，这是在做什么？',audio:'hi',choices:['打招呼','说再见','询问姓名'],answer:'打招呼',targets:['hi'],hint:'见到朋友，挥挥手，说 hi。'},
 {id:'scene-hello',type:'choice',prompt:'第一次见到新同学，你可以说：',scene:'greeting',choices:['Hello!','Goodbye!','My name.'],answer:'Hello!',targets:['hello'],hint:'hello 是见面时的问候。'},
 {id:'spell-name',type:'spell',prompt:'听声音，试着拼出“名字”。',audio:'name',answer:'name',targets:['name'],hint:'开头是 n，a_e 在这里读 /eɪ/，中间还有 m。'},
 {id:'reply-name',type:'choice',prompt:'对方问你的名字，怎样回答？',quote:"What's your name?",audio:'ask-name',choices:['My name is Amy.','Goodbye, Amy.','Have a nice day!'],answer:'My name is Amy.',targets:['name'],hint:'My name is… 后面接自己的名字。'},
 {id:'build-name',type:'order',prompt:'把自我介绍排成一句话。',translation:'我叫埃米。',tiles:['Amy.','is','My','name'],answer:['My','name','is','Amy.'],targets:['name'],hint:'先说 My name，再接 is 和名字。'},
 {id:'farewell',type:'listen',prompt:'要离开了，听一听该说哪一句。',audio:'reply-goodbye',scene:'farewell',choices:['Goodbye!','Hello!','My name is Amy.'],answer:'Goodbye!',targets:['goodbye'],hint:'离开时挥挥手，用 goodbye 告别。'}
];
