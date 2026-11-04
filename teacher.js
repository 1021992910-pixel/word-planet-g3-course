/* One button: hear each grapheme, blend the word, then try it yourself. */
function teacherPanel(w){
 const lesson=GUIDED_DATA[w.id];
 if(PACED_PHONICS[w.id])return pacedPanel(w,lesson.audio,`data-guide="${escapeHTML(w.id)}"`,w.id==='together'?'中间一拍读重一点。':lesson.hint);
 if(lesson.kind==='context-word')return contextTeacherPanel(w,lesson);
 return `<section class="blend-panel" data-teacher-lesson="${w.id}" aria-label="${escapeHTML(w.word)} 拼读"><p class="blend-lead">先分开听，再听老师连起来。</p><div class="blend-row" aria-label="${escapeHTML(w.word)} 的声音分组">${lesson.parts.map((part,i)=>`<span class="blend-part ${i===lesson.focus?'special-part':''}" data-blend-part="${i}"><b>${escapeHTML(part)}</b><i aria-hidden="true"></i></span>`).join('')}<span class="blend-arrow" aria-hidden="true">→</span><strong class="blend-word" data-blend-word>${escapeHTML(w.word)}</strong></div><p class="blend-hint" data-blend-hint><span aria-hidden="true">♪</span> ${escapeHTML(lesson.hint)}</p><p class="blend-status" data-blend-status role="status">听老师拼一遍，再轮到你。</p><div class="blend-controls"><button class="primary" data-transport="${lesson.audio}" data-teacher-control data-guide="${w.id}">▶ 带我拼读</button><small>约 ${Math.round(lesson.duration)} 秒</small></div></section>`;
}
function teacherText(el,text){if(el&&el.textContent!==text)el.textContent=text;}
function syncTeacherLesson(){
 const panel=document.querySelector('[data-teacher-lesson]');if(!panel)return;
 const lesson=GUIDED_DATA[panel.dataset.teacherLesson],a=audio;
 const matched=!!(a&&playing===lesson.audio),preparing=matched&&loading;
 const isPlaying=matched&&!a.paused&&!a.ended&&!preparing,finished=matched&&a.ended;
 const step=matched&&!preparing?lesson.steps.find(s=>a.currentTime>=s.start&&a.currentTime<s.end):null;
 const paced=PACED_PHONICS[panel.dataset.teacherLesson];
 const isLetter=lesson.kind==='letter-name',isContext=!paced&&lesson.kind==='context-word';
 const button=panel.querySelector('[data-teacher-control]');
 const label=preparing?'正在准备声音…':isPlaying?(isLetter?'Ⅱ 暂停带读':'Ⅱ 暂停拼读'):finished?(isLetter?'↻ 再读一次':'↻ 再拼一遍'):matched&&a.currentTime>0?(isLetter?'▶ 继续带读':'▶ 继续拼读'):(isLetter?'▶ 跟老师学字母':'▶ 带我拼读');
 const shownLabel=isContext?(preparing?'正在准备声音…':isPlaying?'Ⅱ 暂停带读':finished?'↻ 再听一次':matched&&a.currentTime>0?'▶ 继续带读':'▶ 听老师讲这句'):label;
 teacherText(button,shownLabel);button.disabled=preparing;button.setAttribute('aria-label',preparing?shownLabel:shownLabel.slice(2));
 if(paced){syncPacedPanel(panel,paced,a,matched,preparing);return;}
 teacherText(panel.querySelector('[data-blend-status]'),preparing?'正在准备声音…':finished?(isContext?'现在把这个词放进句子，再跟着说一遍。':isLetter?'现在试着自己说字母名，也可以再听一次。':'现在试着自己拼一遍，也可以再听一次。'):matched&&a.paused?'已暂停，点按钮继续。':step?.phase==='reminder'?(isContext?step.text:'留意亮起来的部分，听老师的小提醒。'):step?.text||(isContext?'先听完整词和整句，再轮到你。':isLetter?'听老师读字母名，再轮到你。':'听老师拼一遍，再轮到你。'));
 const linked=step?.phase==='connected';
 const index=linked?step.phones?.find(p=>a.currentTime>=p.start&&a.currentTime<p.end)?.index:step?.index;
 panel.querySelectorAll('[data-blend-part]').forEach(part=>{
  const current=matched&&Number.isInteger(index)&&Number(part.dataset.blendPart)===index;
  part.classList.toggle('reading-now',!!current);
  part.classList.toggle('blending-done',!!(linked&&Number.isInteger(index)&&Number(part.dataset.blendPart)<index));
  if(current)part.setAttribute('aria-current','true');else part.removeAttribute('aria-current');
 });
 panel.querySelector('[data-blend-word]').classList.toggle('reading-now',!!(step&&['blend','connected','word','echo'].includes(step.phase)));
 panel.querySelector('[data-blend-hint]').classList.toggle('reminder-now',step?.phase==='reminder');
}
