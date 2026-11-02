'use strict';
const CourseModel=(()=>{
 const blank=()=>({version:1,speed:1,scene:0,coach:0,stage:0,heard:[],guided:[],words:{},run:null,lesson:{completed:false,best:0,completedAt:0}});
 const validIds=new Set(WORDS.map(w=>w.id)),validTasks=new Set(TASKS.map(t=>t.id));
 function sanitize(raw){
  const s=blank();if(!raw||raw.version!==1)return s;
  s.speed=raw.speed===.8?.8:1;
  for(const key of ['scene','coach','stage'])s[key]=Number.isInteger(raw[key])?Math.max(0,Math.min(key==='scene'?1:3,raw[key])):0;
  s.heard=Array.isArray(raw.heard)?[...new Set(raw.heard.filter(x=>SCENES.some(t=>t.audio===x)))]:[];
  s.guided=Array.isArray(raw.guided)?[...new Set(raw.guided.filter(x=>validIds.has(x)))]:[];
  for(const id of validIds){const w=raw.words?.[id];if(w&&typeof w==='object')s.words[id]={practiced:w.practiced===true,weak:w.weak===true,last:Number.isFinite(w.last)?Math.max(0,w.last):0};}
  if(raw.run&&typeof raw.run==='object'){
   s.run={index:0,records:{},heard:Array.isArray(raw.run.heard)?[...new Set(raw.run.heard.filter(x=>validTasks.has(x)))]:[]};
   for(const t of TASKS){const r=raw.run.records?.[t.id];if(!r)break;if(!Number.isInteger(r.attempts)||r.attempts<1)break;s.run.records[t.id]={attempts:Math.min(100,r.attempts),passed:r.passed===true,firstCorrect:r.passed===true&&r.firstCorrect===true};if(!r.passed)break;}
   s.run.index=TASKS.findIndex(t=>!s.run.records[t.id]?.passed);if(s.run.index<0)s.run.index=TASKS.length;
  }
  if(raw.lesson?.completed===true&&validIds.size===Object.keys(s.words).filter(id=>s.words[id].practiced).length){s.lesson={completed:true,best:Math.max(0,Math.min(TASKS.length,Math.trunc(raw.lesson.best)||0)),completedAt:Number.isFinite(raw.lesson.completedAt)?raw.lesson.completedAt:0};}
  return s;
 }
 function start(s){if(!s.run)s.run={index:0,records:{},heard:[]};s.stage=2;return s.run;}
 function answer(s,value){
  if(!s.run||s.run.index>=TASKS.length)return {accepted:false};
  const task=TASKS[s.run.index],previous=s.run.records[task.id];
  if(['listen','spell'].includes(task.type)&&!s.run.heard.includes(task.id))return {accepted:false,reason:'listen-first'};
  if(previous?.passed)return {accepted:false};
  const normalize=x=>String(x).trim().replace(/\s+/g,' ').toLowerCase();
  const correct=Array.isArray(task.answer)?Array.isArray(value)&&task.answer.length===value.length&&task.answer.every((x,i)=>x===value[i]):typeof value==='string'&&(task.type==='spell'||task.choices.includes(value))&&normalize(value)===normalize(task.answer);
  const attempts=(previous?.attempts||0)+1;
  s.run.records[task.id]={attempts,passed:correct,firstCorrect:correct&&attempts===1};
  for(const id of task.targets)s.words[id]={practiced:correct||s.words[id]?.practiced===true,weak:!correct,last:Date.now()};
  return {accepted:true,correct,task};
 }
 function next(s){if(!s.run)return false;const t=TASKS[s.run.index];if(!t||!s.run.records[t.id]?.passed)return false;s.run.index++;return true;}
 function finish(s){if(!s.run||!TASKS.every(t=>s.run.records[t.id]?.passed))return false;const score=TASKS.filter(t=>s.run.records[t.id].firstCorrect).length;s.lesson={completed:true,best:Math.max(s.lesson.best,score),completedAt:Date.now()};s.stage=3;return score;}
 return {blank,sanitize,start,answer,next,finish};
})();
