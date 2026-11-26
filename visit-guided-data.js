const VISIT_GUIDED_HINTS = {"but": "u 在 but 里读 /ʌ/。把 b、u、t 的声音慢慢接起来，别漏掉末尾 /t/。"};
Object.assign(GUIDED_DATA, {"but": {"audio": "guided-but", "kind": "phonics", "parts": ["b", "u", "t"], "sounds": ["clear-b", "startup-uh", "clear-t"], "hint": "u 在 but 里读 /ʌ/。把 b、u、t 的声音慢慢接起来，别漏掉末尾 /t/。", "steps": [{"start": 0.0, "end": 0.022, "phase": "phoneme", "index": 0, "clip": "clear-b"}, {"start": 0.022, "end": 0.177, "phase": "phoneme", "index": 1, "clip": "startup-uh"}, {"start": 0.177, "end": 0.257, "phase": "phoneme", "index": 2, "clip": "clear-t"}, {"start": 0.257, "end": 0.977, "phase": "connected", "phones": [{"index": 0, "start": 0.257, "end": 0.401}, {"index": 1, "start": 0.401, "end": 0.833}, {"index": 2, "start": 0.833, "end": 0.977}]}, {"start": 0.977, "end": 1.467, "phase": "word"}], "duration": 1.467, "focus": 0}});
Object.assign(PACED_PHONICS, {"but": {"word": "but", "split": false, "stageTwo": 0.87, "blendStart": 4.667, "finalStart": 5.567, "duration": 7.357, "grid": [["b", "/b/"], ["u", "/ʌ/"], ["t", "/t/"]], "cues": [{"start": 0.02, "end": 0.51, "letters": [0, 1, 2], "cells": []}, {"start": 0.87, "end": 1.072, "letters": [0], "cells": [0]}, {"start": 2.072, "end": 2.407, "letters": [1], "cells": [1]}, {"start": 3.407, "end": 3.667, "letters": [2], "cells": [2]}, {"start": 4.667, "end": 4.811, "letters": [0], "cells": [0]}, {"start": 4.811, "end": 5.243, "letters": [1], "cells": [1]}, {"start": 5.243, "end": 5.387, "letters": [2], "cells": [2]}, {"start": 5.567, "end": 6.057, "letters": [0, 1, 2], "cells": []}]}});

// Shared word IDs keep the lesson, review and learning-sky entries consistent.
for (const lesson of Object.values(LESSONS)) {
 for (const word of lesson.words) {
  if (!Object.prototype.hasOwnProperty.call(VISIT_GUIDED_HINTS, word.id)) continue;
  const guide = GUIDED_DATA[word.id];
  word.parts = guide.parts;
  word.tip = word.hint = guide.hint;
  word.kind = '拼读小老师';
 }
}
