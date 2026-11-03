'use strict';
// Printed p5 activity5 is the complete alphabet, not 26 new vocabulary words.
const LETTER_IPA=['eɪ','biː','siː','diː','iː','ef','dʒiː','eɪtʃ','aɪ','dʒeɪ','keɪ','el','em','en','əʊ','piː','kjuː','ɑː','es','tiː','juː','viː','ˈdʌbəl.juː','eks','waɪ','zed'];
const LETTER_EXAMPLES={a:{word:'stand',sound:'clear-a'},b:{word:'book',sound:'clear-b'},c:{word:'close',sound:'clear-k'},i:{word:'sit',sound:'clear-ih'},m:{word:'morning',sound:'clear-m'},o:{word:'open',sound:'clear-oh'}};
const LETTERS5=Array.from('abcdefghijklmnopqrstuvwxyz',(letter,i)=>({id:'letter-'+letter,entryType:'letter',letter,upper:letter.toUpperCase(),lower:letter,word:letter.toUpperCase()+letter,ipa:'/'+LETTER_IPA[i]+'/',meaning:'大写 '+letter.toUpperCase()+' · 小写 '+letter,scene:'alphabet-workshop',tip:'大写和小写是同一个字母。先听字母名；字母放进单词里的声音可能不同。',parts:[letter.toUpperCase()+letter],kind:'字母小老师',hint:'这里听的是字母名，不是单词里的拼读音。',example:letter.toUpperCase()+' '+letter,exampleAudio:'letter-'+letter,translation:'同一个字母的两种写法',exampleWord:LETTER_EXAMPLES[letter]?.word}));
const alphabetGroups=Array.from({length:7},(_,i)=>{const letters=LETTERS5.slice(i*4,i*4+4);return {id:'alphabet-row-'+(i+1),name:letters[0].upper+'—'+letters.at(-1).upper,title:letters[0].upper+'—'+letters.at(-1).upper,words:letters.map(l=>l.id),audio:'alphabet-row-'+(i+1),alt:'简洁字母工坊里，两位小朋友和机器人一起摆字母卡。',lines:letters.map(l=>({who:'字母名',text:l.word,zh:l.meaning,audio:l.id}))};});
function letterChoices(letter,lower=false){const i=LETTERS5.findIndex(l=>l.letter===letter),indices=[i,(i+3)%26,(i+7)%26];return indices.map(n=>lower?LETTERS5[n].lower:LETTERS5[n].upper);}
function letterTask(letter,mode='upper'){
 const l=LETTERS5.find(l=>l.letter===letter),lower=mode==='lower';
 return {id:'w5-'+mode+'-'+letter,type:'choice',word:l.id,audio:l.id,prompt:lower?'听字母名，找出它的小写':'听字母名，找出它的大写',options:letterChoices(letter,lower),answer:lower?l.lower:l.upper,hint:'可以回字母图鉴再看一看大小写，再听一次名字。'};
}
const alphabetMissions=[
 {id:'signal',title:'接收字母讯号',skill:'听名称 · 认大写',icon:'📡',story:'收好朋友名片后，学习舱收到一串新讯号。先听名字，接好最前面的四张字母卡。',done:'第一组讯号接好啦！可以休息一下，再到配对工坊。',tasks:Array.from('abcd',l=>letterTask(l))},
 {id:'sound',title:'修好大小写配对机',skill:'同一字母 · 两种写法',icon:'🔧',story:'字母也有大写和小写两张名片。听听名字，把它的小写卡找出来。',done:'大小写配对机恢复工作啦！再去整理下一组卡片。',tasks:Array.from('efgh',l=>letterTask(l,'lower'))},
 {id:'supply',title:'装好字母卡补给',skill:'听名字 · 认小写',icon:'🎒',story:'给学习舱装好字母卡。每次找一张，不用着急，想重听就点喇叭。',done:'卡片收好了！去顺序桥看看字母怎样排队。',tasks:Array.from('ijkl',l=>letterTask(l,'lower'))},
 {id:'bridge',title:'走过字母顺序桥',skill:'听认 · 按顺序排队',icon:'🌉',story:'桥上的伙伴要按课本顺序站好。先听认这一组，再把四张卡片接起来。',done:'顺序桥接好了！继续把后面的字母讯号送到广场。',tasks:[...Array.from('mnop',l=>letterTask(l)),{id:'w5-order-mnop',type:'order',letterOrder:true,audio:'alphabet-row-4',prompt:'听这一组字母，按课本顺序排好',parts:['M','N','O','P'],answer:'M N O P',hint:'跟着声音依次排，不用猜，可以再听。'}]},
 {id:'friends',title:'在字母广场找伙伴',skill:'听名称 · 大小写辨认',icon:'🤝',story:'新的字母伙伴来到广场。留意每张卡的样子，听清名字后再选。',done:'广场的字母名片找齐啦！最后一站还有两小组。',tasks:Array.from('qrst',(l,i)=>letterTask(l,i%2?'lower':'upper'))},
 {id:'party',title:'点亮字母导航台',skill:'两小组 · 听认 · 自愿开口',icon:'🎉',story:'先练最后的两小组：U—X，再到Y—Z。听完可以跟着说，把字母星留在学习星空。',done:'26个字母都练过啦！认得的字母会成为独立的字母星；还不熟的，下次再练。',tasks:[...Array.from('uvwxyz',(l,i)=>letterTask(l,i%2?'lower':'upper')),{id:'w5-echo-yz',type:'speak',audio:'alphabet-row-7',prompt:'最后两个字母，听一听，再跟着说',sentence:'Y Z',zh:'跟读两个字母名，不是把它们拼成一个词。',hint:'听完整段示范，再试着说字母名。不录音也可以跟读。'}]}
];
const alphabetTasks=LETTERS5.map(l=>({id:'w5-core-'+l.letter,type:'listen',audio:l.id,prompt:'听字母名，选择小写字母',choices:letterChoices(l.letter,true),answer:l.lower,targets:[l.id],hint:'再对照大小写，听听这个字母的名字。'}));
LESSONS['welcome-05']={course:{...LESSONS['welcome-02'].course,number:5,lessonId:'welcome-05',lessonTitle:'听一听，找一找字母',page:'课本第5页 · 活动5',estimated:'7个小组，每组2—4个字母，可分次完成',description:'听字母名 · 认大小写 · 把字母星连起来',heroScene:'alphabet-workshop',alphabet:true,wordGroups:alphabetGroups,adventure:{chapter:'第五章 · 字母导航台',title:'字母导航小任务',subtitle:'让每一张字母卡，找到自己的位置。',intro:'跟着课本认26个字母。分组听、对照大小写，再走原来的六站冒险。',message:'收好朋友名片后，跟伙伴一起修好字母导航台。每次练一小组，走到哪就记到哪。',end:'Welcome字母任务练过啦！下一课再进入Unit 1。'}},words:LETTERS5,scenes:alphabetGroups,tasks:alphabetTasks,missions:alphabetMissions};
welcomeMenu.splice(4,1,{number:5,id:'welcome-05',title:'听一听，找一找字母',page:5,activity:'活动5 · Listen, point and say',ready:true});
for(const l of Object.values(LESSONS))l.course.welcomeLessons=welcomeMenu;
useLesson(requestedLesson);
