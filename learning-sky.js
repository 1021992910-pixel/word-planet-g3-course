'use strict';
// Each new lesson registers its existing word objects here. Shared word IDs count once.
const COURSE_CATALOG=Object.values(LESSONS).map(l=>({id:l.course.lessonId,unitId:l.course.unitId||'welcome',title:l.course.lessonTitle,words:l.words}));
const LearningSky=(()=>{
 function catalog(){
  const entries=new Map();
  for(const lesson of COURSE_CATALOG)for(const w of lesson.words){
   if(!entries.has(w.id))entries.set(w.id,{...w,unitId:lesson.unitId,lessonIds:[]});
   const row=entries.get(w.id);if(!row.lessonIds.includes(lesson.id))row.lessonIds.push(lesson.id);
  }
  return [...entries.values()];
 }
 const blank=()=>({version:1,words:{},lessons:{}});
 function sanitize(raw,records={}){
  const out=blank();
  for(const w of catalog()){
   const item=raw?.version===1?raw.words?.[w.id]:null,r=records[w.id];
   const earned=item?.lit===true||!!r&&(r.level>0||r.known===true||r.practiced===true);
   if(!earned)continue;
   const time=Number.isFinite(item?.litAt)&&item.litAt>0?item.litAt:Number.isFinite(r?.last)&&r.last>0?r.last:1;
   out.words[w.id]={lit:true,litAt:time};
  }
  for(const l of COURSE_CATALOG){const r=raw?.lessons?.[l.id];if(r?.completed===true)out.lessons[l.id]={completed:true,completedAt:Number.isFinite(r.completedAt)?Math.max(0,r.completedAt):0};}
  return out;
 }
 function sync(s){
  s.sky=sanitize(s.sky,s.words);
  if(s.lesson?.completed)s.sky.lessons[COURSE.lessonId]={completed:true,completedAt:s.lesson.completedAt||0};
  return s.sky;
 }
 function earned(s,id){return s.sky?.words?.[id]?.lit===true;}
 function needsReview(s,id,now=Date.now()){const r=s.words[id];return !!r&&(r.weak===true||Number.isFinite(r.due)&&r.due<=now);}
 function summary(s,ids=WORDS.map(w=>w.id)){
  const all=catalog(),lit=all.filter(w=>earned(s,w.id));
  return {wordTotal:lit.filter(w=>w.entryType!=='letter').length,letterTotal:lit.filter(w=>w.entryType==='letter').length,total:lit.length,current:ids.filter(id=>earned(s,id)).length,review:all.filter(w=>needsReview(s,w.id)).length,lessons:Object.keys(s.sky?.lessons||{}).length};
 }
 // Fixed slots keep existing stars still when a lesson adds another word.
 function slots(index){return [[24,31],[72,27],[30,66],[75,63],[47,16],[47,42],[11,49],[88,44],[12,79],[53,79],[89,80],[9,16]][index%12];}
 return {blank,catalog,sanitize,sync,earned,needsReview,summary,slots};
})();

let skyFocus='all',skyExpanded=false,skyReturnFocus=null,skyPage=0;
const skyRay='<svg viewBox="0 0 80 80"><path class="star-ray" d="M40 3C43 31 49 37 77 40C49 43 43 49 40 77C37 49 31 43 3 40C31 37 37 31 40 3Z"/><circle class="star-core" cx="40" cy="40" r="5"/></svg>';
const skyRegions=[[35,47],[64,23],[82,45],[69,72],[43,81],[16,69],[15,21]];
function skyDust(){
 let seed=1487;const rand=()=>{seed=(seed*16807)%2147483647;return seed/2147483647;};
 return Array.from({length:260},(_,i)=>{const x=rand()*100,y=rand()*100,size=i%19===0?2.7:i%5===0?1.7:.8;return `<i class="${i%19===0?'near':''}" style="left:${x.toFixed(2)}%;top:${y.toFixed(2)}%;--dust-size:${size}px;--twinkle-duration:${(3+rand()*5).toFixed(2)}s;--twinkle-delay:-${(rand()*8).toFixed(2)}s"></i>`;}).join('');
}
function skyStar(w,x,y,small=false){
 const earned=LearningSky.earned(state,w.id),review=LearningSky.needsReview(state,w.id),recent=earned&&Date.now()-state.sky.words[w.id].litAt<45000;
 return `<button class="star-word ${earned?'lit':''} ${review?'needs-review':''} ${recent?'just-lit':''} ${small?'sky-far-star':''} ${w.entryType==='letter'?'letter-star':''}" data-word="${E(w.id)}" style="left:${x}%;top:${y}%;--star-delay:-${(x*.17).toFixed(2)}s;--star-duration:${(3.5+y*.02).toFixed(2)}s" aria-label="${E(w.word)}：${review?(earned?'已点亮，需要复习':'需要复习，尚未点亮'):earned?'已点亮':'等待认识'}"><span class="star-light" aria-hidden="true">${skyRay}</span><span class="star-word-label">${E(w.word)}</span><small class="star-word-state">${review?'再练一练':earned?'已点亮':'等待点亮'}</small></button>`;
}
function renderLearningSky(){
 LearningSky.sync(state);const summary=LearningSky.summary(state),all=LearningSky.catalog(),unit=skyFocus==='alphabet'?{id:'alphabet',zh:'字母'}:COURSE.units.find(u=>u.id===skyFocus),focusWords=skyFocus==='alphabet'?all.filter(w=>w.entryType==='letter'):unit?all.filter(w=>w.unitId===unit.id):all;
 const groups=COURSE.units.map((u,i)=>({unit:u,spot:skyRegions[i],words:all.filter(w=>w.unitId===u.id)}));
 root.innerHTML=`<header class="sky-page-head"><div><span class="eyebrow">MY GROWING UNIVERSE</span><h1>把学过的词和字母，变成满天星光</h1><p>今天点亮一点，明天再添一点。这片星空会陪你一直长大。</p></div><a class="secondary" href="#words">去认识新伙伴 ↗</a></header><section class="learning-sky ${unit?'is-focused':''}" aria-label="全册累计学习星空" tabindex="-1"><div class="sky-toolbar"><div><small>我的学习宇宙</small><h2>${unit?E(unit.zh)+' · 星群':'每一颗，都是你走过的一小步'}</h2></div><button data-sky-expand aria-expanded="${skyExpanded}" aria-label="${skyExpanded?'收起星空':'放大星空'}">${skyExpanded?'收起 ↙':'放大星空 ⛶'}</button></div><div class="sky-view-tabs" role="group" aria-label="星空查看范围"><button data-sky-focus="all" aria-pressed="${!unit}" class="${!unit?'active':''}">全册星空</button><button data-sky-focus="welcome" aria-pressed="${skyFocus==='welcome'}" class="${skyFocus==='welcome'?'active':''}">Welcome 星群</button>${COURSE_CATALOG.some(l=>l.unitId==='unit1')?`<button data-sky-focus="unit1" aria-pressed="${skyFocus==='unit1'}" class="${skyFocus==='unit1'?'active':''}">Unit 1 星群</button>`:''}<button data-sky-focus="alphabet" aria-pressed="${skyFocus==='alphabet'}" class="${skyFocus==='alphabet'?'active':''}">字母星群</button></div><div class="sky-space"><div class="sky-nebula" aria-hidden="true"></div><div class="star-dust" aria-hidden="true">${skyDust()}</div><svg class="sky-orbit" viewBox="0 0 1000 650" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="sky-band" x1="0" x2="1" y1="1" y2="0"><stop stop-color="#3b70cb" stop-opacity="0"/><stop offset=".5" stop-color="#a7afff" stop-opacity=".22"/><stop offset="1" stop-color="#9ccafa" stop-opacity="0"/></linearGradient></defs><path class="galaxy-band" d="M-100 620C180 650 130 340 470 350S720 40 1130 80"/><path class="journey-orbit" d="M140 125C690-100 1150 330 740 510S-100 520 140 125Z"/></svg>${unit?skyFocusedWords(focusWords):groups.map(g=>skyGroup(g)).join('')}<div class="sky-bottom-message"><span class="sky-message-star" aria-hidden="true">✦</span><p>${summary.total?'你已经点亮了 '+summary.wordTotal+' 颗单词星、'+summary.letterTotal+' 颗字母星。':'第一颗学习星，正等着你来点亮。'}<small>新课程会带来新星群，已经点亮的星会一直留在这里。</small></p></div></div><div class="sky-progress-bar" aria-label="学习星空统计"><div><strong>${summary.total}</strong><span>累计学习星<small class="sky-type-breakdown">单词 ${summary.wordTotal} · 字母 ${summary.letterTotal}</small></span></div><div><strong>${summary.current}<small> / ${WORDS.length}</small></strong><span>本课已点亮</span></div><div><strong>${summary.review}</strong><span>等你再练</span></div><div><strong>${summary.lessons}</strong><span>完成的课</span></div></div></section><p class="sky-footnote">点开学习星，可以听单词带读或字母名。单词星和字母星分开计数。亮星记录学习历程；需要复习时，星光会保留。<span>当前开放 Welcome 五课和 Unit 1 前三课，后续按课加入。</span></p>`;
 if(skyExpanded)applySkyExpanded(true);
}
function skyFocusedWords(words){
 const pages=Math.max(1,Math.ceil(words.length/12));skyPage=Math.min(skyPage,pages-1);const visible=words.slice(skyPage*12,skyPage*12+12);
 const edges=visible.slice(0,4).map((w,i,a)=>{if(i===a.length-1)return '';const p=LearningSky.slots(i),q=LearningSky.slots(i+1);return `<line x1="${p[0]}%" y1="${p[1]}%" x2="${q[0]}%" y2="${q[1]}%" class="${LearningSky.earned(state,w.id)&&LearningSky.earned(state,a[i+1].id)?'connected':''}"/>`;}).join('');
 return `${pages>1?`<div class="sky-pages"><button data-sky-page="${skyPage-1}" ${skyPage===0?'disabled':''}>← 上一片</button><span>第 ${skyPage+1} / ${pages} 片星域</span><button data-sky-page="${skyPage+1}" ${skyPage===pages-1?'disabled':''}>下一片 →</button></div>`:''}<svg class="sky-constellation-lines" aria-hidden="true">${edges}</svg>${visible.length<=4?'<div class="sky-home-planet" aria-hidden="true"><span></span><small>从一句 Hello 开始</small></div>':''}${visible.map((w,i)=>{const p=LearningSky.slots(i);return skyStar(w,p[0],p[1]);}).join('')}`;
}
function skyGroup(g){
 const [x,y]=g.spot,u=g.unit;
 if(!g.words.length)return `<div class="sky-undiscovered" style="left:${x}%;top:${y}%"><span aria-hidden="true">✧</span><b>${E(u.zh)}</b><small>未来的旅程</small></div>`;
 const count=g.words.filter(w=>LearningSky.earned(state,w.id)).length;
 const offsets=[[-14,-10],[11,-16],[-7,12],[19,9]];
 return `<div class="sky-group-halo" style="left:${x}%;top:${y}%" aria-hidden="true"></div><svg class="sky-constellation-lines" aria-hidden="true">${g.words.slice(0,4).map((w,i,a)=>{if(i===a.length-1)return '';const p=offsets[i],q=offsets[i+1];return `<line x1="${x+p[0]}%" y1="${y+p[1]}%" x2="${x+q[0]}%" y2="${y+q[1]}%" class="${LearningSky.earned(state,w.id)&&LearningSky.earned(state,a[i+1].id)?'connected':''}"/>`;}).join('')}</svg><button class="sky-group-label" data-sky-focus="${u.id}" style="left:${x}%;top:${y}%" aria-label="查看${E(u.zh)}星群，已点亮${count}颗学习星"><small>${u.id==='welcome'?'WELCOME':E(u.number)}</small><b>${u.id==='welcome'?'初见星群':E(u.zh)}</b><span>${count} 颗已点亮 · 进入 ↗</span></button>${g.words.map((w,i)=>{const offset=offsets[i]||[(Math.sin(i*2.4)*17),(Math.cos(i*2.4)*15)];return i<4?skyStar(w,x+offset[0],y+offset[1],true):skySpeck(w,i,x+offset[0],y+offset[1]);}).join('')}`;
}
function skySpeck(w,index,x,y){return `<button class="sky-cluster-speck ${LearningSky.earned(state,w.id)?'lit':''}" style="left:${x}%;top:${y}%" data-sky-focus="${w.unitId}" data-sky-word-index="${index}" aria-label="查看星群中的 ${E(w.word)}"><span aria-hidden="true"></span></button>`;}
function applySkyExpanded(value){
 const panel=document.querySelector('.learning-sky');if(!panel)return;
 skyExpanded=value;panel.classList.toggle('sky-expanded',value);document.body.classList.toggle('sky-is-open',value);
 if(value){panel.setAttribute('role','dialog');panel.setAttribute('aria-modal','true');}else{panel.removeAttribute('role');panel.removeAttribute('aria-modal');}
 const b=panel.querySelector('[data-sky-expand]');b.textContent=value?'收起 ↙':'放大星空 ⛶';b.setAttribute('aria-expanded',String(value));b.setAttribute('aria-label',value?'收起星空':'放大星空');
}
function closeSkyExpanded(){if(!skyExpanded)return;applySkyExpanded(false);(skyReturnFocus?.isConnected?skyReturnFocus:document.querySelector('[data-sky-expand]'))?.focus();}
document.addEventListener('click',event=>{
 const page=event.target.closest('[data-sky-page]');if(page){skyPage=Math.max(0,Number(page.dataset.skyPage)||0);renderStars();document.querySelector('.learning-sky').focus();return;}
 const focus=event.target.closest('[data-sky-focus]');if(focus){skyFocus=focus.dataset.skyFocus;skyPage=Math.floor((Number(focus.dataset.skyWordIndex)||0)/12);renderStars();document.querySelector(`[data-sky-focus="${skyFocus}"]`)?.focus();return;}
 if(event.target.closest('[data-sky-expand]')){if(skyExpanded)closeSkyExpanded();else{skyReturnFocus=event.target.closest('button');applySkyExpanded(true);document.querySelector('.learning-sky').focus();}}
});
document.addEventListener('keydown',event=>{
 if(!skyExpanded||document.querySelector('dialog[open]'))return;
 if(event.key==='Escape'){event.preventDefault();closeSkyExpanded();}
 if(event.key==='Tab'){const buttons=[...document.querySelectorAll('.learning-sky button:not(:disabled),.learning-sky a')];const first=buttons[0],last=buttons.at(-1);if(event.shiftKey&&(document.activeElement===first||document.activeElement===document.querySelector('.learning-sky'))){event.preventDefault();last.focus();}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}}
});
