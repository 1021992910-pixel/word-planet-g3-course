'use strict';
const OBJECT_DEFINITIONS=[
 ['this','/ðɪs/','这个','u2-guess','u22-this',"What's this?",'这是什么？'],
 ['that','/ðæt/','那个','u2-portrait','u22-that',"What's that, Tom?",'那是什么，Tom？'],
 ['schoolbag','/ˈskuːlbæɡ/','书包','u2-packing','u22-schoolbag',"It's my schoolbag.",'这是我的书包。'],
 ['it','/ɪt/','它','u2-packing','u22-book',"It's a book.",'这是一本书。'],
 ['in','/ɪn/','在……里面','u2-packing','u22-bag-question',"What's in Amy's schoolbag?",'Amy 的书包里有什么？'],
 ['not','/nɒt/','不；不是','u2-guess','u22-it-not','It is not a pen.','它不是一支钢笔。（依据课本缩写展开的巩固句）'],
 ['yes','/jes/','是的','u2-guess','u22-yes','Yes, it is.','是的，它是。'],
 ['guess','/ɡes/','猜','u2-portrait','u22-guess',"What's this? Guess!",'这是什么？猜一猜！']
];
const OBJECT_WORDS=OBJECT_DEFINITIONS.map(([id,ipa,meaning,scene,exampleAudio,example,translation])=>({id,word:id,ipa,meaning,scene,exampleAudio,example,translation,parts:GUIDED_DATA[id].parts,kind:'拼读小老师',tip:GUIDED_DATA[id].hint,hint:GUIDED_DATA[id].hint}));
for(const [id,scene,audio,text,zh] of [
 ['book','u2-packing','u22-book',"It's a book.",'这是一本书。'],
 ['pen','u2-guess','u22-pen',"It's a pen.",'这是一支钢笔。'],
 ['pencil','u2-guess','u22-not-pencil',"No, it isn't. It's a pencil.",'不，它不是。这是一支铅笔。'],
 ['ruler','u2-measure','u22-ruler',"It's a ruler.",'这是一把尺子。'],
 ['no','u2-guess','u22-no',"No, it isn't.",'不，它不是。']
]){const old=Object.values(LESSONS).flatMap(l=>l.words).find(w=>w.id===id);OBJECT_WORDS.push({...old,scene,exampleAudio:audio,example:text,translation:zh});}
const OBJECT_SCENES=[
 {id:'u2-packing',name:'书包里有什么？',audio:'u22-schoolbag-pair',summary:'先看课本第20页第1—2格。Tom 好奇地问 Amy：这是什么？再看书包里的书。',alt:'男孩把书放进书包，桌面简洁。',lines:[['u22-bag-question',"What's in Amy's schoolbag?",'先带着问题看故事：Amy 的书包里有什么？'],['u22-amy-this',"Amy! What's this?",'Tom：Amy！这是什么？'],['u22-schoolbag',"It's my schoolbag.",'Amy：这是我的书包。'],['u22-this',"What's this?",'Tom：这是什么？'],['u22-book',"It's a book.",'Amy：这是一本书。']]},
 {id:'u2-guess',name:'钢笔，还是铅笔？',audio:'u22-pencil-pair',summary:'对照第20页第3—5格。先问名称，再问“它也是钢笔吗？”注意否定回答后，还会告诉你它到底是什么。',alt:'男孩指着女孩手中的黄色铅笔，桌上另有一支蓝色钢笔。',lines:[['u22-this',"What's this?",'Tom：这是什么？'],['u22-pen',"It's a pen.",'Amy：这是一支钢笔。'],['u22-pen-too','Is it a pen, too?','Tom：它也是一支钢笔吗？'],['u22-not-pencil',"No, it isn't. It's a pencil.",'Amy：不，它不是。这是一支铅笔。'],['u22-this',"What's this?",'Tom：这是什么？'],['u22-ruler',"It's a ruler.",'Amy：这是一把尺子。']]},
 {id:'u2-portrait',name:'你画的是谁？',audio:'u22-portrait-pair',summary:'第20页最后一格，Tom 画的是 Amy。读懂这个小转折，再到第21页和伙伴画一画、猜一猜。',alt:'男孩展示一幅女孩的简单画像，女孩笑着指向自己。',lines:[['u22-that',"What's that, Tom?",'Amy：那是什么，Tom？'],['u22-you',"It's you, Amy!",'Tom：是你呀，Amy！']]}
];
const OBJECT_MISSIONS=[
 {id:'signal',title:'接收猜物站消息',skill:'听问答 · 找用品',icon:'📡',story:'用品补给完成，飞船来到猜物小站。先听伙伴的消息，认清书包里的物品。',done:'消息听懂了，去接好新声音。',tasks:[
  {id:'u22-hear-bag',type:'choice',word:'schoolbag',audio:'u22-schoolbag',prompt:'她说的是什么？',options:['我的书包','我的朋友','我的尺子'],answer:'我的书包',hint:'留意后面的复合词。'},
  {id:'u22-hear-book',type:'choice',word:'book',audio:'u22-book',prompt:'听到的是哪样用品？',options:['书','铅笔','橡皮'],answer:'书',hint:'再听句尾。'},
  {id:'u22-hear-pen',type:'choice',word:'pen',audio:'u22-pen',prompt:'这句话说的是什么？',options:['钢笔','铅笔','笔袋'],answer:'钢笔',hint:'听清这个短词的结尾。'}]},
 {id:'sound',title:'接好猜物拼读机',skill:'听整词 · 接声音',icon:'🔧',story:'先听完整词，再将打乱的声音零件排好。',done:'声音接好啦，去写好猜物标签。',tasks:[
  {id:'u22-build-this',type:'build',word:'this',audio:'this',prompt:'听单词，再拼出来',parts:['th','i','s'],answer:'this',hint:'开头两字母合成一组声音。'},
  {id:'u22-build-in',type:'build',word:'in',audio:'in',prompt:'听单词，再拼出来',parts:['i','n'],answer:'in',hint:'先短元音，再鼻音。'}]},
 {id:'supply',title:'准备猜物标签',skill:'听音 · 独立拼写',icon:'🎒',story:'两张新标签需要你自己听词拼好。',done:'标签做好了，去把词放进句子。',tasks:[
  {id:'u22-spell-yes',type:'spell',word:'yes',audio:'yes',prompt:'听单词，自己拼一拼',answer:'yes',extra:['i'],hint:'留意开头的辅音和结尾的清音。'},
  {id:'u22-spell-guess',type:'spell',word:'guess',audio:'guess',prompt:'听单词，自己拼一拼',answer:'guess',extra:['a'],hint:'开头的辅音后有一个不另发音的字母，末尾有双字母。'}]},
 {id:'bridge',title:'走过问答句子桥',skill:'找词 · 补词 · 排序',icon:'🌉',story:'认出名字以后，还要知道句子是在问什么、回答什么。',done:'句子桥接好了，去和伙伴对话。',tasks:[
  {id:'u22-it',type:'gap',word:'it',audio:'u22-yes',prompt:'听回答，补上表示“它”的小词',sentence:'Yes, ___ is.',zh:'是的，它是。',options:['it','in','my'],answer:'it',hint:'找表示“它”的词。'},
  {id:'u22-not',type:'find',word:'not',audio:'u22-it-not',prompt:'哪个词让这句话变成“不是”？',parts:['It','is','not','a','pen.'],zh:'它不是一支钢笔。',answer:'not',hint:'这个词表示否定。'},
  {id:'u22-that',type:'order',word:'that',audio:'u22-that',prompt:'把“那是什么，Tom？”排成一句话',parts:["What's",'that,','Tom?'],answer:"What's that, Tom?",hint:'先问“是什么”，再说“那个”，最后叫对方名字。'}]},
 {id:'friends',title:'猜一猜，接好问答',skill:'故事配对 · 肯定与否定',icon:'🤝',story:'回想 Amy 和 Tom 的故事，用合适的一句接住伙伴的问题。',done:'问答接好了，试着自己画一个谜题。',tasks:[
  {id:'u22-match-bag',type:'dialogue',word:'schoolbag',audio:'u22-this',prompt:'指着 Amy 的书包问这句，怎样回答？',options:["It's my schoolbag.","It's you, Amy!",'Yes, it is.'],answer:"It's my schoolbag.",hint:'这句在问物品的名称。'},
  {id:'u22-match-pencil',type:'dialogue',word:'pencil',audio:'u22-pen-too',prompt:'Tom 拿着铅笔问这句，怎样回答？',options:["No, it isn't. It's a pencil.",'Yes, it is.',"It's a ruler."],answer:"No, it isn't. It's a pencil.",hint:'他拿着的是铅笔，先否定，再说名称。'},
  {id:'u22-match-portrait',type:'dialogue',word:'that',audio:'u22-that',prompt:'Tom 画了 Amy，听到这个问题怎样回答？',options:["It's you, Amy!",'Yes, it is.',"It's a book."],answer:"It's you, Amy!",hint:'最后一格的画像画的是谁？'},
  {id:'u22-match-yes',type:'dialogue',word:'yes',audio:'u22-is-pencil',prompt:'你画的确实是铅笔，怎样回答？',options:['Yes, it is.',"No, it isn't.","What's this?"],answer:'Yes, it is.',hint:'对方猜对了，用肯定回答。'}]},
 {id:'party',title:'把自己的谜题带回营地',skill:'综合理解 · 画猜 · 自愿开口',icon:'🎉',story:'先听最后两条线索，再画一样用品，让伙伴来猜。',done:'猜物小站完成！可把猜物纪念画带回共同营地。',tasks:[
  {id:'u22-ruler',type:'choice',word:'ruler',audio:'u22-ruler',prompt:'这条线索说的是什么？',options:['尺子','笔袋','书包'],answer:'尺子',hint:'再听句尾的用品词。'},
  {id:'u22-no',type:'choice',word:'no',audio:'u22-no',prompt:'这个回答表示什么？',options:['不，它不是','是的，它是','这是什么'],answer:'不，它不是',hint:'听开头的词和句尾的否定形式。'},
  {id:'u22-speak',type:'speak',word:'guess',audio:'u22-guess',prompt:'纸上画一样学习用品，请伙伴猜一猜',sentence:"What's this? Guess!",zh:'这是什么？猜一猜！伙伴可以问 Is it a pen / pencil? 你用 Yes, it is. 或 No, it isn’t. 回答。',hint:'先画在纸上，再听一句、跟读一句，不必录音。'}]}
];
LESSONS['unit2-02']={course:{...LESSONS['unit2-01'].course,lessonId:'unit2-02',number:2,pack:false,objects:true,lessonTitle:'这是什么？画一画，猜一猜',page:'课本第20—21页 · Start up',description:'看懂书包故事 · 慢拼读 · 问名称和猜物品',estimated:'三个短环节，可分次完成',heroScene:'u2-guess',wordGroups:[{title:'这个、那个和书包',words:['this','that','schoolbag']},{title:'句子里的小词',words:['it','in','not']},{title:'猜一猜，再回答',words:['yes','guess']}],reviewWords:['book','pen','pencil','ruler','no'],contextWords:[],adventure:{chapter:'第十三章 · 猜物小站',title:'猜物小站',subtitle:'用问题找线索，用回答说清楚。',intro:'补给准备好了，伙伴带来新的猜物挑战。',message:'先听清单词，再把它放进问答，最后画一个自己的小谜题。',end:'第20—21页练过啦，下一次再去失物招领站。'}},words:OBJECT_WORDS,scenes:OBJECT_SCENES,tasks:[],missions:OBJECT_MISSIONS};
useLesson(requestedLesson);
