'use strict';
const PACK_DEFINITIONS=[
 ['pen','pen','/pen/','钢笔','u2-writing','u21-pen','Pack my pen.','收拾好我的钢笔。'],
 ['pencil','pencil','/ˈpensəl/','铅笔','u2-writing','u21-pencil','Pack my pencil.','收拾好我的铅笔。'],
 ['pencil-case','pencil case','/ˈpensəl keɪs/','笔袋；铅笔盒','u2-writing','u21-pencil-case','Pack my pencil case.','收拾好我的笔袋。'],
 ['bag','bag','/bæɡ/','袋；包','u2-packing','u21-bag','Pack my bag for school.','收拾好书包，准备上学。'],
 ['ruler','ruler','/ˈruːlə/','尺子；直尺','u2-measure','u21-ruler','Pack my ruler.','收拾好我的尺子。'],
 ['eraser','eraser','/ɪˈreɪzə/','橡皮','u2-measure','u21-eraser','Pack my eraser.','收拾好我的橡皮。'],
 ['pack','pack','/pæk/','收拾好','u2-packing','u21-bag','Pack my bag for school.','收拾好书包，准备上学。'],
 ['school','school','/skuːl/','学校','u2-packing','u21-school','My school things.','我的学习用品。'],
 ['thing','thing','/θɪŋ/','东西','u2-writing','u21-school','My school things.','我的学习用品。'],
 ['for','for','/fɔː/','为了','u2-packing','u21-bag','Pack my bag for school.','收拾好书包，准备上学。']
];
const PACK_WORDS=PACK_DEFINITIONS.map(([id,word,ipa,meaning,scene,exampleAudio,example,translation])=>({id,word,ipa,meaning,scene,exampleAudio,example,translation,parts:GUIDED_DATA[id].parts,kind:GUIDED_DATA[id].kind==='phonics'?'拼读小老师':'句中听懂',tip:GUIDED_DATA[id].hint,hint:GUIDED_DATA[id].hint}));
PACK_WORDS.splice(3,0,{...LESSONS['welcome-03'].words.find(word=>word.id==='book'),scene:'u2-packing',example:'Pack my book.',exampleAudio:'u21-book',translation:'收拾好我的书。'});
const PACK_SCENES=[
 {id:'u2-writing',name:'笔和笔袋，先收好',audio:'u21-pencil-case',summary:'先找钢笔、铅笔和笔袋。对照课本第18页，再到第19页大图中找这三样用品。',lines:[['u21-pen','Pack my pen.','收拾好我的钢笔。'],['u21-pencil','Pack my pencil.','收拾好我的铅笔。'],['u21-pencil-case','Pack my pencil case.','收拾好我的笔袋。']]},
 {id:'u2-packing',name:'把书装进包',audio:'u21-bag',summary:'找出 bag 和 book。pack 表示收拾好，for school 在这里表示为上学做准备。',lines:[['u21-book','Pack my book.','收拾好我的书。'],['u21-bag','Pack my bag for school.','收拾好书包，准备上学。']]},
 {id:'u2-measure',name:'尺子和橡皮，也别忘',audio:'u21-eraser',summary:'最后找到尺子和橡皮。七样用品都认识了吗？拿自己的学习用品，边说边收拾。',lines:[['u21-ruler','Pack my ruler.','收拾好我的尺子。'],['u21-eraser','Pack my eraser.','收拾好我的橡皮。']]}
];
const PACK_MISSIONS=[
 {id:'signal',title:'接收用品站清单',skill:'听词认意',icon:'📡',story:'离开友谊复习站，来到学习用品补给站。听清第一批要带的用品。',done:'清单听清啦，去接好声音。',tasks:[
  {id:'u21-pen-hear',type:'choice',word:'pen',audio:'pen',prompt:'听到的是哪样用品？',options:['钢笔','铅笔','尺子'],answer:'钢笔',hint:'留意结尾，听到的是一个短词。'},
  {id:'u21-case-hear',type:'choice',word:'pencil-case',audio:'pencil-case',prompt:'听到的短语是哪样用品？',options:['笔袋','橡皮','书'],answer:'笔袋',hint:'这是装铅笔的小袋子或盒子。'}]},
 {id:'sound',title:'修好用品拼读机',skill:'听整词 · 拼合',icon:'🔧',story:'声音零件送到了，先听词再把零件排好。',done:'拼读机工作啦，去准备文字标签。',tasks:[
  {id:'u21-build-pen',type:'build',word:'pen',audio:'pen',prompt:'听单词，再拼出来',parts:['p','e','n'],answer:'pen',hint:'听清开头、短元音和结尾。'},
  {id:'u21-build-pack',type:'build',word:'pack',audio:'pack',prompt:'听单词，再拼出来',parts:['p','a','ck'],answer:'pack',hint:'结尾两字母是一组声音。'}]},
 {id:'supply',title:'贴好用品标签',skill:'听音拼写',icon:'🎒',story:'把两张标签写好，免得漏带东西。',done:'标签准备好了，去看清单句子。',tasks:[
  {id:'u21-spell-bag',type:'spell',word:'bag',audio:'bag',prompt:'听单词，自己拼一拼',answer:'bag',extra:['e'],hint:'中间是短元音，结尾是浊辅音。'},
  {id:'u21-spell-book',type:'spell',word:'book',audio:'book',prompt:'听熟悉的词，自己拼一拼',answer:'book',extra:['u'],hint:'中间两个相同的字母合读短音。'}]},
 {id:'bridge',title:'走过收纳句子桥',skill:'句中找词 · 补词 · 排序',icon:'🌉',story:'把用品放回句子里，读懂要收拾什么。',done:'清单句子接好了，继续检查用品。',tasks:[
  {id:'u21-find-pencil',type:'find',word:'pencil',audio:'u21-pencil',prompt:'哪个词表示“铅笔”？',parts:['Pack','my','pencil.'],answer:'pencil.',zh:'收拾好我的铅笔。',hint:'找句子里用品的名称。'},
  {id:'u21-gap-for',type:'gap',word:'for',audio:'u21-bag',prompt:'听句子，补上缺少的小词',sentence:'Pack my bag ___ school.',zh:'收拾好书包，准备上学。',options:['for','my','pen'],answer:'for',hint:'这个小词把收拾书包和上学的用途连起来。'},
  {id:'u21-order-ruler',type:'order',word:'ruler',audio:'u21-ruler',prompt:'把“收拾好我的尺子”排成一句话',parts:['Pack','my','ruler.'],answer:'Pack my ruler.',hint:'先说动作，再说“我的尺子”。'}]},
 {id:'friends',title:'互查收纳清单',skill:'听懂物品 · 理解主题',icon:'🤝',story:'和伙伴互相检查，听清名字，不把不同用品混在一起。',done:'用品找齐啦，准备出发上学。',tasks:[
  {id:'u21-eraser',type:'choice',word:'eraser',audio:'u21-eraser',prompt:'这句话要收拾什么？',options:['橡皮','尺子','书包'],answer:'橡皮',hint:'再听句尾的用品名称。'},
  {id:'u21-school',type:'choice',word:'school',audio:'u21-bag',prompt:'收拾书包，是为做什么准备？',options:['上学','睡觉','放风筝'],answer:'上学',hint:'听 for 后面的词。'},
  {id:'u21-things',type:'choice',word:'thing',audio:'u21-school',prompt:'这个短语说的是哪一类东西？',options:['学习用品','朋友名字','家庭成员'],answer:'学习用品',hint:'school 和 things 在这里连在一起理解。'}]},
 {id:'party',title:'背好书包出发',skill:'用词 · 自愿开口',icon:'🎉',story:'先看清单，再拿自己的用品练一句。每次说一件，就收好一件。',done:'用品补给完成！可以把收纳纪念画带回营地。',tasks:[
  {id:'u21-gap-pack',type:'gap',word:'pack',audio:'u21-book',prompt:'表示“收拾好”的词放在哪里？',sentence:'___ my book.',zh:'收拾好我的书。',options:['Pack','Book','Pen'],answer:'Pack',hint:'开头需要一个动作词。'},
  {id:'u21-speak',type:'speak',audio:'u21-bag',prompt:'拿自己的用品，边说边收拾',sentence:'Pack my bag for school.',zh:'收拾好书包，准备上学。也可以换成 Pack my pen / pencil / book。',hint:'先跟读，再试着自己说。'}]}
];
LESSONS['unit2-01']={course:{...LESSONS['unit1-06'].course,lessonId:'unit2-01',unitId:'unit2',number:1,section:'Unit 2 · My school things',lessonTitle:'收拾学习用品，准备上学',page:'课本第18—19页 · Get ready',description:'认学习用品 · 听音拼读 · 说一句收好一件',estimated:'三个短环节，可分次完成',wrap:false,pack:true,heroScene:'u2-packing',wordGroups:[{title:'笔和笔袋',words:['pen','pencil','pencil-case']},{title:'书包里的用品',words:['bag','book','ruler','eraser']},{title:'边说边收拾',words:['pack']},{title:'上学用到的词',words:['school','thing','for']}],contextWords:[],
 adventure:{chapter:'第十二章 · 用品补给站',title:'用品补给站',subtitle:'和伙伴一起收拾，带齐上学的用品。',intro:'带着友谊星徽章，来到新的学习用品星群。',message:'听清用品名称，接好声音，把书包清单一项项准备好。',end:'第18—19页的用品补给练过啦，下一课再学怎样问这是什么。'}},words:PACK_WORDS,scenes:PACK_SCENES,tasks:[],missions:PACK_MISSIONS};
useLesson(requestedLesson);
