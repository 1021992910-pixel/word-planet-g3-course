'use strict';

// Key single words for the earlier formal lessons. Phrases stay in context and sentence practice.
const EARLIER_SPELLING_WORDS = {
 'welcome-01': 'hi hello name goodbye',
 'welcome-02': 'good morning',
 'welcome-03': 'stand sit open close book point say read listen write',
 'welcome-04': 'hi name',
 'unit1-01': 'friend meet play happy you lets to',
 'unit1-02': 'welcome new nine he she too twin we from come and',
 'unit1-03': 'no help here thank great',
 'unit1-04': 'song dear sing now know me',
 'unit1-05': 'friend he she nine we',
 'unit1-06': 'hello friend nine he she play help listen',
 'unit2-01': 'pen pencil bag book ruler eraser pack',
 'unit2-02': 'this that schoolbag it in not yes guess',
 'unit2-03': 'find bye kid',
 'unit2-04': 'back look please',
 'unit2-05': 'eraser pen pencil ruler guess',
 'unit2-06': 'pen pencil eraser ruler book schoolbag',
 'unit3-01': 'red pink green yellow orange blue purple',
 'unit3-02': 'want balloon colour right can see first',
 'unit3-03': 'black fun so many magical',
 'unit3-04': 'picture today paint',
 'unit3-05': 'red pink green yellow orange blue purple black',
 'unit3-06': 'red pink green yellow orange blue purple black',
 'unit4-01': 'one two three four five six seven eight nine ten eleven twelve',
};

function spellingDistractor(answer, preferred = []) {
 return [...preferred, ...'aeiouybdmn'].find(letter => /^[a-z]$/.test(letter) && !answer.toLowerCase().includes(letter));
}

for (const [lessonId, focus] of Object.entries(EARLIER_SPELLING_WORDS)) {
 const {words, missions} = LESSONS[lessonId];
 const spellingStations = ['sound','supply'].map(id => missions.find(mission => mission.id === id));
 const keyWords = focus.split(' ');
 const covered = new Set(missions.flatMap(mission => mission.tasks.filter(task => task.type === 'spell').map(task => task.word)));

 for (const mission of missions) {
  mission.tasks = mission.tasks.map(task => {
   if (task.type !== 'spell' && task.type !== 'build') return task;

   const extra = [spellingDistractor(task.answer, task.extra)];
   if (task.type === 'build' && (!keyWords.includes(task.word) || covered.has(task.word))) {
    return {...task, extra};
   }

   covered.add(task.word);
   return {...task, type:'spell', parts:undefined, tilesOnly:true, extra};
  });
 }

 for (const id of keyWords) {
  if (covered.has(id)) continue;
  const word = words.find(entry => entry.id === id);
  const [sound, supply] = spellingStations;
  const mission = sound.tasks.length <= supply.tasks.length ? sound : supply;
  mission.previousTotal ??= mission.tasks.filter(task => task.type !== 'speak').length;
  mission.tasks.push({
   id: lessonId + '-spell-' + id, type:'spell', word:id, audio:id,
   prompt:'听单词，点字母拼出来', answer:word.word, tilesOnly:true,
   extra:[spellingDistractor(word.word)], hint:'再听一遍，从第一个字母开始。',
  });
 }
}
