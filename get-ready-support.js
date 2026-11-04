'use strict';
Object.assign(AUDIO_DATA,{"u1-happy-day":{"text":"Let's have a happy day!","file":"u1-happy-day.mp3","voice":"en-GB-SoniaNeural","locale":"en-GB","rate":"-10%","words":[{"text":"Let's","start":0.1055,"end":0.425},{"text":"have","start":0.4389,"end":0.6194},{"text":"a","start":0.6333,"end":0.6889},{"text":"happy","start":0.7028,"end":1.1056},{"text":"day!","start":1.1195,"end":1.5083}],"rawBoundaries":[{"text":"Let's","offset":1055410,"duration":3194580},{"text":"have","offset":4388750,"duration":1805410},{"text":"a","offset":6333330,"duration":555410},{"text":"happy","offset":7027910,"duration":4027910},{"text":"day","offset":11194580,"duration":3888750}],"purpose":"Short spoken expression practice associated with textbook Get ready; not a song performance or official recording."}});
// Supplement the existing lesson, without rewriting six-station IDs or awarding coins again.
const GET_READY_NAMES=['daming','lingling','amy','sam'];
const GET_READY_PHRASES=[
 {audio:'meet-sentence',text:'Nice to meet you.',zh:'很高兴认识你。',tip:'见到新朋友，微笑打招呼。'},
 {audio:'lets-sentence',text:"Let's be friends.",zh:'让我们成为朋友吧。',tip:"let’s 是 let us 的缩写，表示“让我们”；朋友不止一个时用 friends。"},
 {audio:'play-sentence',text:"Let's play.",zh:'让我们一起玩吧。',tip:'用动作发出一起玩的邀请。'},
 {audio:'u1-happy-day',text:"Let's have a happy day!",zh:'让我们度过快乐的一天吧！',tip:'happy 表示快乐；day 是一天，前面在 Welcome 的祝福里听过。'}
];
const GetReadyModel={
 blank:()=>({heard:[],found:[],songPracticed:false}),
 sanitize(raw){const clean=this.blank(),valid=[...GET_READY_PHRASES.map(p=>p.audio),...GET_READY_NAMES.map(id=>'person-'+id)];clean.heard=Array.isArray(raw?.heard)?[...new Set(raw.heard.filter(id=>valid.includes(id)))]:[];clean.found=Array.isArray(raw?.found)?GET_READY_NAMES.filter(id=>raw.found.includes(id)&&clean.heard.includes('person-'+id)):[];clean.songPracticed=raw?.songPracticed===true;return clean;},
 hear(data,name){if([...GET_READY_PHRASES.map(p=>p.audio),...GET_READY_NAMES.map(id=>'person-'+id)].includes(name)&&!data.heard.includes(name))data.heard.push(name);},
 answer(data,id){const expected=GET_READY_NAMES.find(id=>!data.found.includes(id));if(!expected||!data.heard.includes('person-'+expected))return 'listen';if(id!==expected)return 'retry';data.found.push(id);return 'correct';},
 merge(a,b){return this.sanitize({heard:[...a.heard,...b.heard],found:[...a.found,...b.found],songPracticed:a.songPracticed||b.songPracticed});}
};
function getReadySupport(){
 const data=state.getReady||GetReadyModel.blank(),next=GET_READY_NAMES.find(id=>!data.found.includes(id));
 return `<section class="ready-support" aria-labelledby="ready-support-title"><h2 id="ready-support-title">课本里，还有这两个小任务</h2><p>翻到课本第6—7页。七个重点词学过后，再用表达做动作、在书上认朋友。</p><details class="ready-activity"><summary>① 歌曲里的重点表达 <span data-ready-phrase-count>${GET_READY_PHRASES.filter(p=>data.heard.includes(p.audio)).length} / 4 已听</span></summary><p>先在外研优学听课本歌曲，再回来一句一句慢慢说。下面是口语示范，不是歌曲录音。</p><div class="ready-phrases">${GET_READY_PHRASES.map(p=>`<article><b>${timedText(p.audio,p.text)}</b><p>${E(p.zh)}</p><small>${E(p.tip)}</small><div class="actions"><button class="secondary" data-audio="${p.audio}" data-transport="${p.audio}" data-play-label="▶ 听这一句">▶ 听这一句</button><span data-ready-heard="${p.audio}">${data.heard.includes(p.audio)?'已听过 ✓':''}</span></div></article>`).join('')}</div><p class="ready-reminder">小提醒：nice 是“令人愉快的”，have 是“度过／拥有”，a 是“一（个）”；be 在这里表示“成为”。这些跟着句子理解，不一下增加很多拼写任务。</p><button class="secondary" data-ready-song ${data.songPracticed?'disabled':''}>${data.songPracticed?'我跟着课本唱过了 ✓':'我跟着课本唱过了'}</button><small>由孩子自己确认练习，不判断唱得是否正确。</small></details><details class="ready-activity"><summary>② 听名字，在课本上找朋友 <span>${data.found.length} / 4 已认</span></summary><p>这里先听名字、选姓名卡，再去课本原图里指出这个人。本站不自动判断你在书上指的位置。</p>${next?`<p class="ready-name-progress">第 ${data.found.length+1} / 4 位朋友</p><button class="primary" data-audio="person-${next}">▶ 听这位朋友的名字</button><div class="ready-name-options">${GET_READY_NAMES.map(id=>{const p=PEOPLE4.find(p=>p.id===id);return `<button class="secondary" data-ready-answer="${id}">${p.name}</button>`;}).join('')}</div>`:'<p class="ready-names-done">四位朋友都认过啦！再在课本里分别指一指、说一说。</p>'}<p class="ready-feedback" data-ready-feedback role="status"></p><p class="ready-found">${data.found.map(id=>{const p=PEOPLE4.find(p=>p.id===id);return E(p.name)+' ✓';}).join('　')}</p><small>人名只听认、跟读，不当成新词拼写，也不增加词星或金币。</small></details></section>`;
}
function recordGetReadyHeard(name){
 if(COURSE.lessonId!=='unit1-01')return;
 if(!state.getReady)state.getReady=GetReadyModel.blank();GetReadyModel.hear(state.getReady,name);
 const counter=document.querySelector('[data-ready-phrase-count]');if(counter)counter.textContent=GET_READY_PHRASES.filter(p=>state.getReady.heard.includes(p.audio)).length+' / 4 已听';
 document.querySelectorAll('[data-ready-heard]').forEach(el=>{if(state.getReady.heard.includes(el.dataset.readyHeard))el.textContent='已听过 ✓';});
}
document.addEventListener('click',event=>{
 const answer=event.target.closest('[data-ready-answer]');
 if(answer&&COURSE.lessonId==='unit1-01'){
  const result=GetReadyModel.answer(state.getReady,answer.dataset.readyAnswer),feedback=document.querySelector('[data-ready-feedback]');
  if(result!=='correct'){feedback.textContent=result==='listen'?'先把名字完整听一遍，再选姓名卡。':'再听一次，想想是哪位朋友。';return;}
  const open=[...document.querySelectorAll('.ready-activity')].map(d=>d.open);save();renderScene(document.querySelector('#lesson-body'));document.querySelectorAll('.ready-activity').forEach((d,i)=>{d.open=open[i];});document.querySelector('[data-ready-feedback]').textContent='找对了！现在去课本原图里指一指这位朋友，再听下一位。';return;
 }
 if(event.target.closest('[data-ready-song]')&&COURSE.lessonId==='unit1-01'){state.getReady.songPracticed=true;save();const button=event.target.closest('button');button.textContent='我跟着课本唱过了 ✓';button.disabled=true;}
});
