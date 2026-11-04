'use strict';
// Textbook p8-9. Short standard teaching examples; source illustrations stay private.
const STARTUP_WORDS=[
 {id:'welcome',word:'welcome',ipa:'/ˈwelkəm/',meaning:'欢迎',scene:'friends-uk',example:'Welcome!',exampleAudio:'welcome',translation:'欢迎！'},
 {id:'new',word:'new',ipa:'/njuː/',meaning:'新的',scene:'friends-uk',example:'Hi, new friends!',exampleAudio:'u12-new-friends',translation:'嗨，新朋友们！'},
 {id:'nine',word:'nine',ipa:'/naɪn/',meaning:'九',scene:'friends-uk',example:"I'm nine.",exampleAudio:'u12-age',translation:'我九岁。'},
 {id:'he',word:'he',ipa:'/hiː/',meaning:'他',scene:'friends-uk',example:"He's Sam.",exampleAudio:'u12-hes-sam',translation:'他是萨姆。'},
 {id:'she',word:'she',ipa:'/ʃiː/',meaning:'她',scene:'friends-uk',example:"She's Amy.",exampleAudio:'u12-shes-amy',translation:'她是埃米。'},
 {id:'too',word:'too',ipa:'/tuː/',meaning:'也',scene:'friends-uk',example:"She's nine, too.",exampleAudio:'u12-same-age',translation:'她也九岁。'},
 {id:'twin',word:'twin',ipa:'/twɪn/',meaning:'双胞胎中的一个',scene:'friends-uk',example:"We're twins.",exampleAudio:'u12-twins',translation:'我们是双胞胎。'},
 {id:'we',word:'we',ipa:'/wiː/',meaning:'我们',scene:'u1-play',example:'We are friends.',exampleAudio:'u12-friends-full',translation:'我们是朋友。'},
 {id:'from',word:'from',ipa:'/frɒm/',meaning:'从；来自',scene:'friends-uk',example:"We're from the UK.",exampleAudio:'u12-origin',translation:'我们来自英国。'},
 {id:'come',word:'come',ipa:'/kʌm/',meaning:'来；来到',scene:'u1-play',example:'Come and play!',exampleAudio:'u12-come-play',translation:'来一起玩吧！'},
 {id:'and',word:'and',ipa:'/ænd/',meaning:'和；然后；接着',scene:'u1-play',example:'Come and play!',exampleAudio:'u12-come-play',translation:'来一起玩吧！'},
 {id:'everyone',word:'everyone',ipa:'/ˈevriwʌn/',meaning:'每个人；人人',scene:'friends-uk',example:'Hi, everyone!',exampleAudio:'u12-all',translation:'大家好！'},
 {id:'do',word:'do',ipa:'/duː/',meaning:'帮助组成疑问句；做',scene:'u1-play',example:'Do they have a good day?',exampleAudio:'u12-question',translation:'他们度过了愉快的一天吗？'},
 {id:'they',word:'they',ipa:'/ðeɪ/',meaning:'他们',scene:'u1-play',example:'Do they have a good day?',exampleAudio:'u12-question',translation:'他们度过了愉快的一天吗？'},
 {id:'the',word:'the',ipa:'/ðə; ðiː/',meaning:'表示特指；这里和UK一起表示英国',scene:'friends-uk',example:"We're from the UK.",exampleAudio:'u12-origin',translation:'我们来自英国。'}
].map(w=>({...w,parts:GUIDED_DATA[w.id].parts,kind:GUIDED_DATA[w.id].kind==='context-word'?'句中听懂':'拼读小老师',tip:GUIDED_DATA[w.id].hint,hint:GUIDED_DATA[w.id].hint}));
const STARTUP_SCENES=[
 {id:'friends-uk',name:'欢迎新朋友：我们九岁',audio:'u12-scene0',alt:'已认可的原创英国朋友插画，两位孩子微笑问好。',summary:'对照课本第8页：Sam和Amy来到新班级。他们都九岁。先听问候，再介绍年龄。',lines:[
  {text:'Welcome!',zh:'欢迎！',audio:'welcome'},{text:'Hi, everyone!',zh:'大家好！',audio:'u12-all'},{text:"I'm Sam.",zh:'我是萨姆。',audio:'im-sam'},{text:"I'm nine.",zh:'我九岁。',audio:'u12-age'},{text:"She's Amy.",zh:'她是埃米。',audio:'u12-shes-amy'},{text:"She's nine, too.",zh:'她也九岁。',audio:'u12-same-age'}]},
 {id:'startup-introduce',name:'介绍他和她：我们来自哪里',audio:'u12-scene1',alt:'已认可的原创英国朋友插画，两位孩子微笑介绍同伴。',summary:'对照课本第8—9页：用he、she介绍朋友。Sam和Amy来自英国，是双胞胎；不能把四位朋友都说成双胞胎或都来自英国。',lines:[
  {text:"He's Sam.",zh:'他是萨姆。',audio:'u12-hes-sam'},{text:"She's Amy.",zh:'她是埃米。',audio:'u12-shes-amy'},{text:"We're from the UK.",zh:'我们来自英国。',audio:'u12-origin'},{text:"We're twins.",zh:'我们是双胞胎。',audio:'u12-twins'}]},
 {id:'u1-play',name:'一起玩：我们成为朋友',audio:'u12-scene2',alt:'已认可的原创操场插画，小伙伴们一起玩球。',summary:'对照课本第8页后半段：伙伴们一起玩，成为朋友。第9页再试着把自己和同伴介绍给大家。',lines:[
  {text:'Wow!',zh:'哇！表达惊喜。',audio:'u12-wow'},{text:'Come and play!',zh:'来一起玩吧！',audio:'u12-come-play'},{text:'Good!',zh:'好！表达赞同。',audio:'good'},{text:'We are friends.',zh:'我们是朋友。',audio:'u12-friends-full'}]}
].map(s=>({...s,lines:s.lines.map(l=>({who:'重点句口语示范',...l}))}));
const STARTUP_MISSIONS=[
 {id:'signal',title:'接收新同伴消息',skill:'听懂问候 · 故事理解',icon:'📡',story:'新朋友街区传来同伴的消息。请对照课本故事，听清欢迎语、问题和朋友的介绍。',done:'消息收到了！去把新词的声音接起来。',tasks:[
  {id:'u12-welcome',type:'choice',word:'welcome',audio:'welcome',prompt:'听一听，老师在做什么？',options:['欢迎新朋友','请大家告别','让大家合书'],answer:'欢迎新朋友',hint:'新伙伴到来时，老师会友好地迎接。'},
  {id:'u12-do',type:'choice',word:'do',audio:'u12-question',prompt:'这是在提问，还是在叫大家去做一样东西？',options:['在问他们有没有度过愉快的一天','在叫大家做一个东西','在询问书的颜色'],answer:'在问他们有没有度过愉快的一天',hint:'句首的小词帮助组成问题，先听整句，不必逐字硬翻。'},
  {id:'u12-they',type:'choice',word:'they',audio:'u12-question',prompt:'问题里的“他们”，指的是谁？',options:['故事里的几位小朋友','一本书','教室里的桌子'],answer:'故事里的几位小朋友',hint:'对照第8页，想想是谁一起迎接朋友、一起玩。'},
  {id:'u12-origin',type:'choice',word:'the',audio:'u12-origin',prompt:'Sam和Amy说他们来自哪里？',options:['英国','美国','中国'],answer:'英国',hint:'UK是英国名称的缩写，跟前面的小词一起理解。'},
  {id:'u12-twins',type:'choice',word:'twin',audio:'u12-twins',prompt:'Sam和Amy在介绍两人的什么关系？',options:['他们是双胞胎','他们是老师','他们是书包'],answer:'他们是双胞胎',hint:'两位朋友同样九岁，在这里还介绍了双胞胎关系。'}]},
 {id:'sound',title:'接好介绍站的声音',skill:'听整词 · 拼合声音',icon:'🔧',story:'介绍站需要三组新的声音。先听完整词，再把零件接好，为介绍牌接通信号。',done:'声音接好了！把需要的标签装进介绍箱。',tasks:[
  {id:'u12-build-new',type:'build',word:'new',audio:'new',prompt:'听单词，再拼出来',parts:['n','ew'],answer:'new',hint:'有两个字母需要作为一块零件放在一起。'},
  {id:'u12-build-nine',type:'build',word:'nine',audio:'nine',prompt:'听单词，再拼出来',parts:['n','i','n','e'],answer:'nine',hint:'一个辅音字母要用两次，末尾还有一个不单独发音的字母。'},
  {id:'u12-build-come',type:'build',word:'come',audio:'come',prompt:'听单词，再拼出来',parts:['c','o','m','e'],answer:'come',hint:'这个词的元音是特别读法，末尾字母不单独发音。'}]},
 {id:'supply',title:'装好同伴介绍箱',skill:'独立拼写',icon:'🎒',story:'给介绍箱贴上三个小标签。先听声音，再独立拼写，随时可以重听。',done:'介绍箱准备好啦！带着标签过句子桥。',tasks:[
  {id:'u12-spell-she',type:'spell',word:'she',audio:'she',prompt:'听声音，拼出表示“她”的词',answer:'she',extra:['a'],hint:'开头有两个字母合读一组声音。'},
  {id:'u12-spell-twin',type:'spell',word:'twin',audio:'twin',prompt:'听声音，拼出“双胞胎中的一个”',answer:'twin',extra:['e'],hint:'开头两个辅音紧接着，中间的元音是短音。'},
  {id:'u12-spell-from',type:'spell',word:'from',audio:'from',prompt:'听声音，拼出“来自”',answer:'from',extra:['a'],hint:'开头两个辅音要依次接好，别漏掉其中一个。'}]},
 {id:'bridge',title:'走过人物介绍桥',skill:'补词 · 找词 · 排句',icon:'🌉',story:'把人物、年龄和来源放进句子，桥上的介绍牌就会亮起来。',done:'介绍牌连成句子啦！去广场介绍新同伴。',tasks:[
  {id:'u12-gap-he',type:'gap',word:'he',audio:'u12-he-full',prompt:'介绍男孩Sam，句首放哪个词？',sentence:'___ is Sam.',zh:'他是萨姆。',options:['He','She','We'],answer:'He',hint:'这里介绍一个男孩，不能用表示她或我们的词。'},
  {id:'u12-gap-too',type:'gap',word:'too',audio:'u12-same-age',prompt:'Sam九岁，Amy也九岁，把“也”补进去',sentence:"She's nine, ___.",zh:'她也九岁。',options:['too','from','new'],answer:'too',hint:'这个词听起来和之前的小词相近，但写法与意思不同。'},
  {id:'u12-find-from',type:'find',word:'from',audio:'u12-origin',prompt:'哪一个词表示“来自”？',parts:["We're",'from','the','UK.'],zh:'我们来自英国。',answer:'from',hint:'在表示我们的词后面，表示来源的那个词。'},
  {id:'u12-order-twins',type:'order',word:'twin',audio:'u12-twins',prompt:'把“我们是双胞胎”排成一句话',parts:["We're",'twins.'],answer:"We're twins.",hint:'先说我们是，再说明双胞胎关系；两个人要留意词尾。'}]},
 {id:'friends',title:'广场上的缩写名片',skill:'全句理解 · 缩写对应',icon:'🤝',story:'朋友们想用简短的话介绍自己。听示范，认出缩写的完整说法。',done:'介绍名片配好啦！最后一起发出邀请。',tasks:[
  {id:'u12-all',type:'dialogue',word:'everyone',audio:'u12-all',prompt:'向面前所有朋友问好，可以怎样说？',context:'面前不止一位朋友，你想对大家问好。',options:['Hi, everyone!','Goodbye!','Read!'],answer:'Hi, everyone!',hint:'这里的称呼表示每个人、大家。'},
  {id:'u12-im',type:'choice',audio:'im-sam',prompt:'介绍自己时，I’m的完整说法是哪一个？',options:['I am','I is','He is'],answer:'I am',hint:'我后面在这里搭配am，听起来会合在一起。'},
  {id:'u12-hes',type:'choice',word:'he',audio:'u12-hes-sam',prompt:'He’s的完整说法是哪一个？',options:['He is','She is','We are'],answer:'He is',hint:'缩写前面的词指他，后面是is。'},
  {id:'u12-shes',type:'choice',word:'she',audio:'u12-shes-amy',prompt:'She’s的完整说法是哪一个？',options:['She is','He is','I am'],answer:'She is',hint:'缩写前面的词指她，后面是is。'},
  {id:'u12-were',type:'choice',word:'we',audio:'we-friends',prompt:'We’re的完整说法是哪一个？',options:['We are','We is','They is'],answer:'We are',hint:'我们和are搭配，不能把is接在这里。'}]},
 {id:'party',title:'新同伴的介绍接龙',skill:'邀请 · 组句 · 自愿开口',icon:'🎉',story:'介绍站的伙伴都认识啦！把邀请说完整，再试着介绍自己和一位同伴。',done:'同伴介绍站完成啦！可以用金币把友谊观星镜放进营地。',tasks:[
  {id:'u12-order-play',type:'order',word:'and',audio:'u12-come-play',prompt:'把“来一起玩吧”排好',parts:['Come','and','play!'],answer:'Come and play!',hint:'先发出来的邀请，再用中间的小词连接玩耍。'},
  {id:'u12-gap-we',type:'gap',word:'we',audio:'u12-friends-full',prompt:'你和旁边的伙伴一起说，句首放什么？',sentence:'___ are friends.',zh:'我们是朋友。',options:['We','He','She'],answer:'We',hint:'要把自己也算进去，这里不只介绍一个人。'},
  {id:'u12-speak',type:'speak',audio:'u12-shes-amy',prompt:'试着介绍身边的一位朋友',sentence:"She's Amy.",zh:'她是埃米。可以换成朋友的名字；也试着用He介绍男孩。',hint:'先听示范，再开口。还可以先介绍自己，再介绍前面的朋友，像课本第9页那样接龙。'}]}
];
LESSONS['unit1-02']={course:{...LESSONS['welcome-02'].course,number:2,unitId:'unit1',section:'Unit 1 · Let’s be friends!',lessonId:'unit1-02',lessonTitle:'介绍新朋友：他、她和我们',page:'课本第8—9页 · Start up',estimated:'三个短环节，可分次完成',description:'介绍人物 · 年龄与来源 · 缩写和接龙',heroScene:'friends-uk',startup:true,wordGroups:[{title:'认识新朋友',words:['welcome','new','nine']},{title:'他和她，也一样',words:['he','she','too','twin']},{title:'我们一起玩',words:['we','from','come','and']}],contextWords:['everyone','do','they','the'],adventure:{chapter:'第七章 · 同伴介绍站',title:'同伴介绍站',subtitle:'用新本领，把朋友介绍给大家。',intro:'听懂故事里的年龄和来源，练会介绍他、她和我们。',message:'从新朋友街区来到同伴介绍站，为每一位朋友配好介绍名片。熟悉的单词直接复用，新星光继续累计。',end:'第8—9页的介绍练习完成！营地里可以添一架友谊观星镜。'}},words:STARTUP_WORDS,scenes:STARTUP_SCENES,tasks:[],missions:STARTUP_MISSIONS};
useLesson(requestedLesson);
