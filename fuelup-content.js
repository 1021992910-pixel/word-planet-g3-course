'use strict';
const FUELUP_WORDS=[
 {id:'song',word:'song',ipa:'/sɒŋ/',meaning:'歌曲',scene:'alphabet-workshop',example:"Let's sing a song.",exampleAudio:'u14-song',translation:'我们唱首歌吧。'},
 {id:'dear',word:'dear',ipa:'/dɪə/',meaning:'亲爱的',scene:'alphabet-workshop',example:'Dear friends!',exampleAudio:'u14-dear',translation:'亲爱的朋友们！'},
 {id:'sing',word:'sing',ipa:'/sɪŋ/',meaning:'唱；唱歌',scene:'alphabet-workshop',example:'Sing with me!',exampleAudio:'u14-with-me',translation:'跟我一起唱吧！'},
 {id:'now',word:'now',ipa:'/naʊ/',meaning:'现在',scene:'alphabet-workshop',example:'Everybody, sing now!',exampleAudio:'u14-everybody',translation:'大家现在开始唱吧！'},
 {id:'know',word:'know',ipa:'/nəʊ/',meaning:'知道；认识',scene:'alphabet-workshop',example:'We know our ABCs.',exampleAudio:'u14-abc',translation:'我们认识英语字母。'},
 {id:'our',word:'our',ipa:'/aʊə/',meaning:'我们的',scene:'alphabet-workshop',example:'We know our ABCs.',exampleAudio:'u14-abc',translation:'我们认识英语字母。'},
 {id:'everybody',word:'everybody',ipa:'/ˈevribɒdi/',meaning:'每个人；大家',scene:'alphabet-workshop',example:'Everybody, sing now!',exampleAudio:'u14-everybody',translation:'大家现在开始唱吧！'},
 {id:'with',word:'with',ipa:'/wɪð/ · /wɪθ/',meaning:'和……一起',scene:'speed-play',example:'Sing with me!',exampleAudio:'u14-with-me',translation:'跟我一起唱吧！'},
 {id:'me',word:'me',ipa:'/miː/',meaning:'我（放在动词或介词后）',scene:'speed-play',example:'Sing with me!',exampleAudio:'u14-with-me',translation:'跟我一起唱吧！'}
].map(w=>{const guide=GUIDED_DATA[w.id];return {...w,parts:guide.parts,kind:guide.kind==='phonics'?'拼读小老师':'句中听懂',tip:guide.hint,hint:guide.hint};});

const FUELUP_SCENES=[
 {id:'alphabet-workshop',name:'跟着节奏读字母',audio:'u14-scene0',alt:'孩子们在字母工坊认识英文字母。',summary:'课本第12页活动1。听一听邀请朋友唱歌的说法，再按下面的七组字母跟读，最后用外研优学的教材配套歌曲跟唱。',lines:[
  {text:'Dear friends!',zh:'亲爱的朋友们！',audio:'u14-dear'},
  {text:"Let's sing a song.",zh:'我们唱首歌吧。',audio:'u14-song'},
  {text:'Everybody, sing now!',zh:'大家现在开始唱吧！',audio:'u14-everybody'}]},
 {id:'alphabet-workshop',name:'找找身边的字母',audio:'u14-scene1',alt:'字母工坊里的孩子与机器人一起读字母。',summary:'课本第12页活动2。留意公交站牌、书和包装上的英文字母。试试指出一个字母，再说出它的名字。',lines:[
  {text:'We know our ABCs.',zh:'我们认识英语字母。',audio:'u14-abc'},
  {text:'Say the letters with me.',zh:'跟我说出这些字母。',audio:'u14-letter-tip'},
  {text:'Sing with me!',zh:'跟我一起唱吧！',audio:'u14-with-me'}]},
 {id:'speed-play',name:'听听他们是谁',audio:'u14-scene2',alt:'三位朋友一起放风筝，作为介绍朋友的情境示意。',summary:'课本第13页活动3–4。先在闯关里听四段同类练习，找出对应线索。然后听 Tara 的介绍，试着说一位朋友的名字、年龄和来自哪里。',lines:[
  {text:'Tara is my friend.',zh:'塔拉是我的朋友。',audio:'u14-tara'},
  {text:"She's nine.",zh:'她九岁。',audio:'u14-tara-age'},
  {text:"She's from the US.",zh:'她来自美国。',audio:'u14-tara-origin'}]}
];

const FUELUP_MATCH=[
 ['u14-pair-1','A · 会唱歌'],['u14-pair-2','B · 九岁'],['u14-pair-3','C · 来自英国'],['u14-pair-4','D · 来自美国']
];
const FUELUP_MISSIONS=[
 {id:'signal',title:'接收音乐信号',skill:'听词 · 认字母',icon:'📡',story:'风筝草地传来音乐。听清唱歌的邀请，再找出提示牌上的字母。',done:'信号接通了，准备把声音连起来。',tasks:[
  {id:'u14-song-meaning',type:'choice',word:'song',audio:'song',prompt:'听一听，老师说的是什么？',options:['歌曲','年龄','风筝'],answer:'歌曲',hint:'它是大家可以唱出来的东西。'},
  {id:'u14-dear-meaning',type:'choice',word:'dear',audio:'u14-dear',prompt:'唱歌前，怎样亲切地称呼朋友？',options:['亲爱的朋友们','九岁的朋友们','再见，朋友们'],answer:'亲爱的朋友们',hint:'留意问候开头的那个词。'},
  {id:'u14-letter-sign',type:'choice',audio:'letter-b',prompt:'听一个字母名，在哪块牌上找得到它？',options:['BUS','EXIT','STOP'],answer:'BUS',hint:'先说出听到的字母名，再看看每块牌。'}]},
 {id:'sound',title:'接上唱歌的声音',skill:'听整词 · 拼声音',icon:'🔧',story:'听完一个完整单词，把打乱的零件接起来。',done:'声音接好啦，去准备词卡。',tasks:[
  {id:'u14-build-sing',type:'build',word:'sing',audio:'sing',prompt:'听单词，再拼出来',parts:['s','i','ng'],answer:'sing',hint:'最后两个字母合读一个鼻音。'},
  {id:'u14-build-know',type:'build',word:'know',audio:'know',prompt:'听单词，再拼出来',parts:['kn','ow'],answer:'know',hint:'开头一组有一个不单独发音的字母。'}]},
 {id:'supply',title:'给合唱队备词卡',skill:'独立拼写',icon:'🎒',story:'听清两个短词，给小队装上词卡。',done:'两张词卡准备好了。',tasks:[
  {id:'u14-spell-now',type:'spell',word:'now',audio:'now',prompt:'听声音，拼出“现在”',answer:'now',extra:['e'],hint:'后两个字母合起来读，嘴形会滑动。'},
  {id:'u14-spell-me',type:'spell',word:'me',audio:'me',prompt:'听声音，拼出“和我一起”里的“我”',answer:'me',extra:['a'],hint:'结尾字母读的是长音。'}]},
 {id:'bridge',title:'搭好合唱邀请桥',skill:'找词 · 补词 · 组句',icon:'🌉',story:'从短句里找准“大家”“我们的”和“和谁一起”。',done:'邀请说清楚了。去听下一组朋友。',tasks:[
  {id:'u14-find-everybody',type:'find',word:'everybody',audio:'u14-everybody',prompt:'哪个词是在叫“大家”？',parts:['Everybody,','sing','now!'],answer:'Everybody,',zh:'大家现在开始唱吧！',hint:'找称呼大家的那个词。'},
  {id:'u14-gap-our',type:'gap',word:'our',audio:'u14-abc',prompt:'哪一个词表示“我们的”？',sentence:'We know ___ ABCs.',zh:'我们认识英语字母。',options:['our','me','now'],answer:'our',hint:'找一个能放在东西前面，说明是谁的词。'},
  {id:'u14-order-with',type:'order',word:'with',audio:'u14-with-me',prompt:'把“跟我一起唱吧”排成一句话',parts:['Sing','with','me!'],answer:'Sing with me!',hint:'先说动作，再接“和我一起”。'}]},
 {id:'friends',title:'给声音配上线索',skill:'听力配对',icon:'🤝',story:'四段新的听力，练课本第13页同样的配对方法。每听一段，选一张线索卡。',done:'四段声音都找到线索啦！',tasks:FUELUP_MATCH.map(([audio,answer],i)=>({id:'u14-match-'+(i+1),type:'choice',audio,prompt:'听第'+(i+1)+'段，选出听到的线索',options:FUELUP_MATCH.map(pair=>pair[1]),answer,hint:'再听一次，留心唱歌、年龄或来自哪里。'}))},
 {id:'party',title:'把朋友介绍给大家',skill:'人物介绍 · 开口',icon:'🎉',story:'介绍朋友时，可以从名字、年龄和来自哪里说起。',done:'合唱任务完成，可以把旋律星灯带回营地。',tasks:[
  {id:'u14-tara-age-check',type:'choice',audio:'u14-tara-age',prompt:'听一听，Tara 几岁？',options:['九岁','八岁','没提年龄'],answer:'九岁',hint:'留意表示年龄的数字。'},
  {id:'u14-tara-origin-check',type:'choice',audio:'u14-tara-origin',prompt:'听一听，Tara 来自哪里？',options:['美国','英国','中国'],answer:'美国',hint:'听 from 后面的地方。'},
  {id:'u14-speak',type:'speak',audio:'u14-tara',prompt:'先说名字，再试着加上年龄和来源',sentence:'Tara is my friend.',zh:'塔拉是我的朋友。可以把名字换成你的朋友，再补充一两句。',hint:'先照着读，再试试自己说。'}]}
];

const fuelupCourse={...LESSONS['unit1-02'].course,lessonId:'unit1-04',number:4,lessonTitle:'字母唱起来：介绍我的朋友',page:'课本第12—13页 · Fuel up',description:'A–Z 跟读 · 生活找字母 · 听力配对与介绍朋友',estimated:'三个短环节，可分次完成',heroScene:'alphabet-workshop',fuelup:true,
 wordGroups:[{title:'唱歌的词',words:['song','dear','sing']},{title:'对比两个 ow',words:['now','know']},{title:'和我一起',words:['me']}],contextWords:['our','everybody','with'],
 adventure:{chapter:'第九章 · 字母音乐站',title:'字母音乐站',subtitle:'听字母、找线索，再把朋友介绍给大家。',intro:'从风筝草地走到音乐站，和伙伴排练一段字母合唱。',message:'朋友们已经到齐了，听听他们的声音，把线索配好，准备唱起来。',end:'字母音乐站完成，旋律星灯可以带回营地。'}};
// Scene IDs can share the same illustration without sharing playback state.
LESSONS['unit1-04']={course:fuelupCourse,words:FUELUP_WORDS,scenes:FUELUP_SCENES,tasks:[],missions:FUELUP_MISSIONS};
useLesson(requestedLesson);

function fuelUpActivities(){
 if(state.scene===0){
  return `<section class="startup-extra" aria-labelledby="fuel-letters-title"><h3 id="fuel-letters-title">第12页 · 跟读 A–Z</h3><p>一组一组听。听完自己说一遍，留意最后的 Z 在这里按英式读作 zed。</p><div class="startup-contractions">${alphabetGroups.map(g=>`<article><b>${timedText(g.audio,g.words.map(id=>id.slice(-1).toUpperCase()).join(' '))}</b><div class="actions"><button class="secondary" data-audio="${g.audio}" data-transport="${g.audio}" data-play-label="▶ 听 ${g.name}">▶ 听 ${g.name}</button></div></article>`).join('')}</div><p>跟唱时请打开外研优学的本课配套歌曲，再看课本第12页指着字母唱。</p></section>`;
 }
 if(state.scene===1){
  return `<section class="startup-extra" aria-labelledby="fuel-signs-title"><h3 id="fuel-signs-title">第12页 · 在哪里见过这些字母？</h3><div class="startup-contractions"><article><b>BUS</b><p>公交站牌示意。找出字母 B。</p><button class="secondary" data-audio="letter-b">▶ 听 B 的名字</button></article><article><b>EXIT</b><p>出口标识示意。找出字母 X。</p><button class="secondary" data-audio="letter-x">▶ 听 X 的名字</button></article></div><p>再从家里的书或包装上找两个字母，说给家人听。</p></section>`;
 }
 return `<section class="startup-extra" aria-labelledby="fuel-friends-title"><h3 id="fuel-friends-title">第13页 · 先听，再介绍</h3><p>用外研优学配套音频完成课本里 Li Ming、Meimei、Chenchen、Sarah 的原题。本站第5站提供四段独立的听力配对练习。</p><ol><li>先说名字，可以从 <b>… is my friend.</b> 开始。</li><li>用 <b>He’s / She’s …</b> 说年龄。</li><li>再用 <b>He’s / She’s from …</b> 说来自哪里。</li></ol><p>可以用故事人物练习，也可以把三句话说给家人听。</p><a class="primary" href="#practice">去练听力配对 →</a></section>`;
}
