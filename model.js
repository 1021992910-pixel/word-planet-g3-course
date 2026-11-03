'use strict';
const CourseModel=(()=>{
 const lessonBlank=()=>({scene:0,coach:0,stage:0,atlasGroup:0,heard:[],guided:[],run:null,adventure:AdventureModel.blank(),lesson:{completed:false,best:0,completedAt:0}});
 const blank=()=>({version:1,activeLessonId:COURSE.lessonId,speed:1,words:{},sky:LearningSky.blank(),lessons:{},campDecorations:[],...lessonBlank()});
 function localSanitize(raw){
  const s=lessonBlank();if(!raw||typeof raw!=='object')return s;
  for(const key of ['scene','coach','stage','atlasGroup']){const max=key==='scene'?SCENES.length-1:key==='coach'?LearningSky.catalog().length-1:key==='atlasGroup'?(COURSE.wordGroups?.length||1)-1:3;s[key]=Number.isInteger(raw[key])?Math.max(0,Math.min(max,raw[key])):0;}
  s.heard=Array.isArray(raw.heard)?[...new Set(raw.heard.filter(x=>SCENES.some(t=>t.audio===x)))]:[];
  s.guided=Array.isArray(raw.guided)?[...new Set(raw.guided.filter(x=>WORDS.some(w=>w.id===x)))]:[];
  s.adventure=AdventureModel.sanitize(raw.adventure);
  if(raw.run&&typeof raw.run==='object'){
   const valid=new Set(TASKS.map(t=>t.id));s.run={index:0,records:{},heard:Array.isArray(raw.run.heard)?[...new Set(raw.run.heard.filter(x=>valid.has(x)))]:[]};
   for(const t of TASKS){const r=raw.run.records?.[t.id];if(!r||!Number.isInteger(r.attempts)||r.attempts<1)break;s.run.records[t.id]={attempts:Math.min(100,r.attempts),passed:r.passed===true,firstCorrect:r.passed===true&&r.firstCorrect===true};if(!r.passed)break;}
   s.run.index=TASKS.findIndex(t=>!s.run.records[t.id]?.passed);if(s.run.index<0)s.run.index=TASKS.length;
  }
  if(Object.keys(s.adventure.completed).length===ADVENTURE_MISSIONS.length||raw.lesson?.completed===true&&TASKS.every(t=>s.run?.records[t.id]?.passed))s.lesson={completed:true,best:Math.max(0,Math.min(TASKS.length,Math.trunc(raw.lesson?.best)||0)),completedAt:Number.isFinite(raw.lesson?.completedAt)?Math.max(0,raw.lesson.completedAt):0};
  // W01 backups used successful word records as the completion evidence.
  if(COURSE.lessonId==='welcome-01'&&raw.lesson?.completed===true&&WORDS.every(w=>raw.words?.[w.id]?.practiced))s.lesson={completed:true,best:Math.max(0,Math.min(TASKS.length,Math.trunc(raw.lesson.best)||0)),completedAt:Number.isFinite(raw.lesson.completedAt)?Math.max(0,raw.lesson.completedAt):0};
  return s;
 }
 function sanitize(raw){
  const s=blank();if(!raw||raw.version!==1)return s;
  s.speed=raw.speed===.8?.8:1;
  for(const {id} of LearningSky.catalog()){const w=raw.words?.[id];if(w&&typeof w==='object'){const last=Number.isFinite(w.last)?Math.max(0,w.last):0,level=Number.isInteger(w.level)?Math.max(0,Math.min(5,w.level)):w.weak?0:w.known||w.practiced?1:0;s.words[id]={practiced:w.practiced===true,weak:w.weak===true,known:level>0,level,last,due:Number.isFinite(w.due)&&w.due>=0?w.due:level?last+86400000:last};}}
  const active=COURSE.lessonId;
  for(const id of Object.keys(LESSONS)){useLesson(id);s.lessons[id]=localSanitize(raw.lessons?.[id]||((raw.activeLessonId||'welcome-01')===id?raw:null));}
  useLesson(active);Object.assign(s,s.lessons[active]);
  const total=Object.values(s.lessons).reduce((sum,l)=>sum+Object.keys(l.adventure.completed).length*15,0);
  const requested=Array.isArray(raw.campDecorations)?raw.campDecorations:raw.adventure?.decorations||[];
  for(const item of ADVENTURE_DECORATIONS)if(requested.includes(item.id)&&CampGrowth.unlocked(item,s.lessons)&&total-s.campDecorations.reduce((sum,id)=>sum+ADVENTURE_DECORATIONS.find(x=>x.id===id).cost,0)>=item.cost)s.campDecorations.push(item.id);
  s.adventure.decorations=[...s.campDecorations];s.sky=LearningSky.sanitize(raw.sky,s.words);sync(s);return s;
 }
 function sync(s){
  s.lessons[COURSE.lessonId]={scene:s.scene,coach:s.coach,stage:s.stage,atlasGroup:s.atlasGroup,heard:s.heard,guided:s.guided,run:s.run,adventure:s.adventure,lesson:s.lesson};s.activeLessonId=COURSE.lessonId;
  const total=Object.values(s.lessons).reduce((sum,l)=>sum+Object.keys(l.adventure.completed).length*15,0);
  const eligible=CampGrowth.eligible(s.lessons);
  s.campDecorations=[...s.adventure.decorations];
  for(const l of Object.values(s.lessons)){l.adventure.credit=total-Object.keys(l.adventure.completed).length*15;l.adventure.decorations=[...s.campDecorations];l.adventure.unlockedDecorations=[...eligible];}
  LearningSky.sync(s);for(const [id,l] of Object.entries(s.lessons))if(l.lesson.completed)s.sky.lessons[id]={completed:true,completedAt:l.lesson.completedAt||0};
  return s;
 }
 function start(s){if(!s.run)s.run={index:0,records:{},heard:[]};s.stage=2;return s.run;}
 function answer(s,value){
  if(!s.run||s.run.index>=TASKS.length)return {accepted:false};const task=TASKS[s.run.index],previous=s.run.records[task.id];
  if(['listen','spell'].includes(task.type)&&!s.run.heard.includes(task.id))return {accepted:false,reason:'listen-first'};if(previous?.passed)return {accepted:false};
  const normalize=x=>String(x).trim().replace(/\s+/g,' ').toLowerCase();
  const correct=Array.isArray(task.answer)?Array.isArray(value)&&task.answer.length===value.length&&task.answer.every((x,i)=>x===value[i]):typeof value==='string'&&(task.type==='spell'||task.choices.includes(value))&&normalize(value)===normalize(task.answer);
  const attempts=(previous?.attempts||0)+1;s.run.records[task.id]={attempts,passed:correct,firstCorrect:correct&&attempts===1};
  for(const id of task.targets)s.words[id]={...s.words[id],practiced:correct||s.words[id]?.practiced===true,weak:!correct,last:Date.now()};sync(s);return {accepted:true,correct,task};
 }
 function next(s){if(!s.run)return false;const t=TASKS[s.run.index];if(!t||!s.run.records[t.id]?.passed)return false;s.run.index++;return true;}
 function finish(s){if(!s.run||!TASKS.every(t=>s.run.records[t.id]?.passed))return false;const score=TASKS.filter(t=>s.run.records[t.id].firstCorrect).length;s.lesson={completed:true,best:Math.max(s.lesson.best,score),completedAt:Date.now()};s.stage=3;sync(s);return score;}
 function merge(current,raw){
  const left=sanitize(current),right=sanitize(raw),active=COURSE.lessonId;
  for(const [id,l] of Object.entries(left.lessons)){
   useLesson(id);const r=right.lessons[id];r.adventure=AdventureModel.merge(l.adventure,r.adventure);
   if(l.lesson.completed&&!r.lesson.completed||l.lesson.best>r.lesson.best)r.lesson={...l.lesson};
   if((l.run?.index||0)>(r.run?.index||0))r.run=l.run;
   r.heard=[...new Set([...l.heard,...r.heard])];r.guided=[...new Set([...l.guided,...r.guided])];
  }
  useLesson(active);
  for(const [id,w] of Object.entries(left.words))if(!right.words[id]||w.last>right.words[id].last)right.words[id]=w;
  for(const [id,w] of Object.entries(left.sky.words))if(!right.sky.words[id]||w.litAt<right.sky.words[id].litAt)right.sky.words[id]=w;
  right.campDecorations=[...new Set([...left.campDecorations,...right.campDecorations])];
  Object.assign(right,right.lessons[active]);right.adventure.decorations=[...right.campDecorations];
  return sanitize(right);
 }
 return {blank,sanitize,sync,merge,start,answer,next,finish};
})();
