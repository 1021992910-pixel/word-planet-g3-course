'use strict';
const BAG_FUEL_DEFINITIONS = [
 ['back','/bæk/','回到原处','u24-back','Sam, come back, please!','Sam，请回来！'],
 ['look','/lʊk/','看；瞧','u24-look','Look at the schoolbag!','看看书包！'],
 ['please','/pliːz/','请','u24-back','Sam, come back, please!','Sam，请回来！'],
 ['there','/ðeə/','在那里','u24-pencil-there','The pencil is there.','铅笔在那里。'],
];
const BAG_FUEL_WORDS = BAG_FUEL_DEFINITIONS.map(([id,ipa,meaning,exampleAudio,example,translation])=>{
 const guide=GUIDED_DATA[id];
 return {id,word:id,ipa,meaning,scene:'u2-bag-fuel',exampleAudio,example,translation,
  parts:guide.parts,kind:guide.kind==='phonics'?'拼读小老师':'句中带读',tip:guide.hint,hint:guide.hint};
});
for(const [id,exampleAudio,example,translation] of [
 ['that','u22-that',"What's that, Tom?",'那是什么，Tom？'],
 ['schoolbag','u24-look','Look at the schoolbag!','看看书包！'],
 ['here','u24-ruler-here','The ruler is here.','尺子在这儿。'],
 ['come','u24-back','Sam, come back, please!','Sam，请回来！'],
 ['ruler','u24-found-ruler','I found a ruler.','我找到了一把尺子。'],
 ['pencil','u24-found-pencil','I found a pencil.','我找到了一支铅笔。'],
 ['eraser','u24-found-eraser','I found an eraser.','我找到了一块橡皮。'],
]){
 const old=Object.values(LESSONS).flatMap(l=>l.words).find(w=>w.id===id);
 BAG_FUEL_WORDS.push({...old,exampleAudio,example,translation});
}
const BAG_FUEL_SCENES = [
 {id:'u2-bag-fuel',name:'书包漏了，快回头',audio:'u24-back',alt:'男孩背着黄色书包回头，地上掉了一支铅笔和一把尺子。',
  summary:'Sam 的书包底下有个洞。路上的尺子和铅笔从哪儿来的？先听这几句，再去外研优学听第24页原韵律歌。',
  lines:[
   ['u24-ruler-here','The ruler is here.','尺子在这儿。'],
   ['u24-pencil-there','The pencil is there.','铅笔在那儿。'],
   ['u24-back','Sam, come back, please!','Sam，请回来！'],
   ['u24-look','Look at the schoolbag!','看看书包！'],
  ]},
 {id:'alphabet-workshop',name:'听短音，写七个字母',audio:'letter-a',alt:'字母工坊的原创情境示意。',
  summary:'先听 a 在具体单词里的声音，再读 Aa 到 Gg 的字母名。打开课本第24页，对照箭头在四线三格里写。',lines:[]},
 {id:'u2-guess',name:'听见物品，再猜一猜',audio:'u24-guess',alt:'两个孩子用铅笔和钢笔练习问答。',
  summary:'先用外研优学听第25页原题，在课本里把 Amy、Daming、Lingling 和物品连起来。本站闯关另有三道同类听辨。再拿一个不透明的袋子，和伙伴轮流藏一件用品，让对方猜。',
  lines:[
   ['u24-guess','What is it? Guess!','这是什么？猜一猜！'],
   ['u22-is-pencil','Is it a pencil?','它是一支铅笔吗？'],
   ['u22-no',"No, it isn't.",'不，它不是。'],
   ['u24-is-ruler','Is it a ruler?','它是一把尺子吗？'],
   ['u22-yes','Yes, it is.','是的，它是。'],
  ]},
];
const BAG_FUEL_MISSIONS = [
 {id:'signal',title:'听声找回三件用品',skill:'听音 · 物品配对',icon:'📡',
  story:'离开海底招领站，回到校园小路。三位伙伴各发来一条新消息，听听他们各找到了什么。',done:'三件用品配对完成！去接好声音。',tasks:[
   {id:'u24-hear-ruler',type:'choice',word:'ruler',audio:'u24-found-ruler',prompt:'第一位伙伴找到了什么？',options:['尺子','铅笔','橡皮'],answer:'尺子',hint:'听句尾的用品名。'},
   {id:'u24-hear-pencil',type:'choice',word:'pencil',audio:'u24-found-pencil',prompt:'第二位伙伴找到了什么？',options:['橡皮','尺子','铅笔'],answer:'铅笔',hint:'留意这个词有两拍。'},
   {id:'u24-hear-eraser',type:'choice',word:'eraser',audio:'u24-found-eraser',prompt:'第三位伙伴找到了什么？',options:['铅笔','橡皮','尺子'],answer:'橡皮',hint:'听 an 后面的用品名。'},
  ]},
 {id:'sound',title:'接好书包发来的声音',skill:'听整词 · 拼声音 · 辨短音',icon:'🔧',
  story:'从小路上收到两个词的声音线索，先听，再拼。',done:'声音接好了，去准备文字标签。',tasks:[
   {id:'u24-build-back',type:'build',word:'back',audio:'back',prompt:'听单词，再拼出来',parts:['b','a','ck'],answer:'back',hint:'中间是 /æ/，最后两个字母合成一组。'},
   {id:'u24-build-look',type:'build',word:'look',audio:'look',prompt:'听单词，再拼出来',parts:['l','oo','k'],answer:'look',hint:'中间的两个相同字母一起发一个短音。'},
   {id:'u24-short-a',type:'choice',word:'that',audio:'that',prompt:'中间的 a 在这个词里听起来像哪一个？',options:['back 里的短音','字母 A 的名字'],answer:'back 里的短音',hint:'再听完整词，留意中间的声音。'},
  ]},
 {id:'supply',title:'写词贴签，排好字母',skill:'独立拼写 · 字母顺序',icon:'🎒',
  story:'写好礼貌用语，再整理今天练写的七张字母卡。',done:'标签和字母排好了，去把词放回句子。',tasks:[
   {id:'u24-spell-please',type:'spell',word:'please',audio:'please',prompt:'听完整词，自己拼一拼',extra:['i'],answer:'please',hint:'中间是长音 /iː/，最后还有一个不另发音的字母。'},
   {id:'u24-letter-order',type:'order',letterOrder:true,prompt:'把七张字母卡按字母表顺序排好',parts:['A','B','C','D','E','F','G'],answer:'A B C D E F G',hint:'从 A 开始，按课本第24页的顺序排。'},
  ]},
 {id:'bridge',title:'走过这儿和那儿的句子桥',skill:'句中辨义 · 补词',icon:'🌉',
  story:'这儿一把尺子，那儿一支铅笔。用句子告诉 Sam 它们在哪儿。',done:'位置说清楚了，可以请 Sam 回来。',tasks:[
   {id:'u24-gap-here',type:'gap',word:'here',audio:'u24-ruler-here',prompt:'填上表示“在这儿”的词',sentence:'The ruler is ___.',zh:'尺子在这儿。',options:['there','here','back'],answer:'here',hint:'说的是离自己较近的位置。'},
   {id:'u24-gap-there',type:'gap',word:'there',audio:'u24-pencil-there',prompt:'填上表示“在那儿”的词',sentence:'The pencil is ___.',zh:'铅笔在那儿。',options:['here','there','back'],answer:'there',hint:'说的是较远的位置。'},
   {id:'u24-come-back',type:'choice',word:'come',audio:'u24-back',prompt:'伙伴请 Sam 做什么？',options:['回来','坐下','看书'],answer:'回来',hint:'留意 come 后面的词。'},
  ]},
 {id:'friends',title:'用问题猜袋里的用品',skill:'问答 · 听懂肯定与否定',icon:'🤝',
  story:'小伙伴把一把尺子藏进袋子。先听问题，再选合适的回答。',done:'猜物成功！轮到你出题。',tasks:[
   {id:'u24-guess-no',type:'dialogue',word:'pencil',audio:'u22-is-pencil',prompt:'袋里是尺子，听到这个问题怎么答？',options:["No, it isn't.",'Yes, it is.'],answer:"No, it isn't.",hint:'对方猜的是铅笔。'},
   {id:'u24-guess-yes',type:'dialogue',word:'ruler',audio:'u24-is-ruler',prompt:'袋里是尺子，这次怎么答？',options:['Yes, it is.',"No, it isn't."],answer:'Yes, it is.',hint:'这次猜对了。'},
  ]},
 {id:'party',title:'找齐物品，轮到你出题',skill:'综合理解 · 自愿开口',icon:'🎉',
  story:'学习用品找回来了。藏一件用品，让伙伴来猜，再换角色。',done:'校园找物站完成！可以把书包纪念画带回营地。',tasks:[
   {id:'u24-look-bag',type:'choice',word:'schoolbag',audio:'u24-look',prompt:'听这句话，伙伴让你看什么？',options:['书包','笔袋','橡皮'],answer:'书包',hint:'听 look at 后面的用品名。'},
   {id:'u24-speak',type:'speak',audio:'u24-guess',prompt:'藏好一样用品，开口请伙伴猜',sentence:'What is it? Guess!',zh:'先跟读，再让伙伴问。可以回答 Yes, it is. 或 No, it isn’t.，然后交换角色。',hint:'可以面对面说，也可以只跟读，不必录音。'},
  ]},
];
LESSONS['unit2-04']={
 course:{...LESSONS['unit2-03'].course,lessonId:'unit2-04',number:4,lost:false,bagFuel:true,
  lessonTitle:'Sam 的书包，少了什么？',page:'课本第24—25页 · Fuel up',
  description:'听辨短音 /æ/ · 练写 Aa—Gg · 听音猜物',estimated:'三段活动，可分次完成',heroScene:'u2-bag-fuel',
  wordGroups:[{title:'这次学会拼的词',words:['back','look','please']}],contextWords:['there'],
  reviewWords:['that','schoolbag','here','come','ruler','pencil','eraser'],
  adventure:{chapter:'第十五章 · 校园找物站',title:'校园找物站',subtitle:'沿着校园小路，帮 Sam 找回掉落的用品。',
   intro:'招领任务完成，伙伴又收到了校园小路的消息。',message:'听线索、接声音，最后和伙伴一起猜物。',
   end:'第24—25页练过啦。'}},
 words:BAG_FUEL_WORDS,scenes:BAG_FUEL_SCENES,tasks:[],missions:BAG_FUEL_MISSIONS,
};
useLesson(requestedLesson);
