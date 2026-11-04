'use strict';
// W22: accepted experience clear2 content, reused rather than synthesized again.
Object.assign(AUDIO_DATA,{
  "friend": {
    "text": "friend",
    "words": [
      {
        "text": "friend",
        "start": 0.1333,
        "end": 0.8278
      }
    ]
  },
  "meet": {
    "text": "meet",
    "words": [
      {
        "text": "meet",
        "start": 0.1195,
        "end": 0.7028
      }
    ]
  },
  "play": {
    "text": "play",
    "words": [
      {
        "text": "play",
        "start": 0.1028,
        "end": 0.6861
      }
    ]
  },
  "you": {
    "text": "you",
    "words": [
      {
        "text": "you",
        "start": 0.1333,
        "end": 0.5917
      }
    ]
  },
  "happy": {
    "text": "happy",
    "words": [
      {
        "text": "happy",
        "start": 0.1195,
        "end": 0.7028
      }
    ]
  },
  "lets": {
    "text": "let's",
    "words": [
      {
        "text": "let's",
        "start": 0.1014,
        "end": 0.7958
      }
    ]
  },
  "to": {
    "text": "to",
    "words": [
      {
        "text": "to",
        "start": 0.1472,
        "end": 0.5639
      }
    ]
  },
  "meet-sentence": {
    "text": "Nice to meet you.",
    "words": [
      {
        "text": "Nice",
        "start": 0.1195,
        "end": 0.4945
      },
      {
        "text": "to",
        "start": 0.5083,
        "end": 0.6472
      },
      {
        "text": "meet",
        "start": 0.6611,
        "end": 0.9667
      },
      {
        "text": "you.",
        "start": 0.9805,
        "end": 1.3277
      }
    ]
  },
  "friend-sentence": {
    "text": "This is my friend.",
    "words": [
      {
        "text": "This",
        "start": 0.1472,
        "end": 0.425
      },
      {
        "text": "is",
        "start": 0.4389,
        "end": 0.5917
      },
      {
        "text": "my",
        "start": 0.6055,
        "end": 0.8
      },
      {
        "text": "friend.",
        "start": 0.8139,
        "end": 1.4667
      }
    ]
  },
  "play-sentence": {
    "text": "Let's play.",
    "words": [
      {
        "text": "Let's",
        "start": 0.1055,
        "end": 0.4805
      },
      {
        "text": "play.",
        "start": 0.4945,
        "end": 1.0083
      }
    ]
  },
  "happy-sentence": {
    "text": "I'm happy.",
    "words": [
      {
        "text": "I'm",
        "start": 0.1472,
        "end": 0.3555
      },
      {
        "text": "happy.",
        "start": 0.3695,
        "end": 0.9667
      }
    ]
  },
  "you-sentence": {
    "text": "You are my friend.",
    "words": [
      {
        "text": "You",
        "start": 0.1472,
        "end": 0.3417
      },
      {
        "text": "are",
        "start": 0.3555,
        "end": 0.4527
      },
      {
        "text": "my",
        "start": 0.4667,
        "end": 0.675
      },
      {
        "text": "friend.",
        "start": 0.6889,
        "end": 1.3555
      }
    ]
  },
  "introduce-self": {
    "text": "I'm Mia.",
    "words": [
      {
        "text": "I'm",
        "start": 0.1195,
        "end": 0.3833
      },
      {
        "text": "Mia.",
        "start": 0.3972,
        "end": 0.9111
      }
    ]
  },
  "lets-sentence": {
    "text": "Let's be friends.",
    "words": [
      {
        "text": "Let's",
        "start": 0.1055,
        "end": 0.4667
      },
      {
        "text": "be",
        "start": 0.4805,
        "end": 0.6333
      },
      {
        "text": "friends.",
        "start": 0.6472,
        "end": 1.4111
      }
    ]
  },
  "introduce-friend": {
    "text": "She is my friend.",
    "words": [
      {
        "text": "She",
        "start": 0.1333,
        "end": 0.3695
      },
      {
        "text": "is",
        "start": 0.3833,
        "end": 0.55
      },
      {
        "text": "my",
        "start": 0.5639,
        "end": 0.7583
      },
      {
        "text": "friend.",
        "start": 0.7722,
        "end": 1.4389
      }
    ]
  },
  "we-friends": {
    "text": "We're friends.",
    "words": [
      {
        "text": "We're",
        "start": 0.1014,
        "end": 0.4069
      },
      {
        "text": "friends.",
        "start": 0.4208,
        "end": 1.1847
      }
    ]
  }
});
Object.assign(GUIDED_DATA,{
  "friend": {
    "audio": "guided-friend",
    "parts": [
      "f",
      "r",
      "ie",
      "n",
      "d"
    ],
    "sounds": [
      "clear-f",
      "clear-r",
      "clear-e",
      "clear-n",
      "clear-d"
    ],
    "focus": 2,
    "hint": "ie 在 friend 里读 /e/，这里特别记。",
    "duration": 25.01392,
    "steps": [
      {
        "start": 0,
        "end": 1.968,
        "phase": "cue",
        "index": 0,
        "clip": null,
        "text": "f 对应这个声音。"
      },
      {
        "start": 1.968,
        "end": 2.113,
        "phase": "phoneme",
        "index": 0,
        "clip": "clear-f",
        "text": "听这个音，再把声音接起来。",
        "voice": "en-GB-LibbyNeural"
      },
      {
        "start": 2.113,
        "end": 2.293,
        "phase": "gap",
        "index": 0,
        "clip": null,
        "text": ""
      },
      {
        "start": 2.293,
        "end": 4.189,
        "phase": "cue",
        "index": 1,
        "clip": null,
        "text": "r 对应这个声音。"
      },
      {
        "start": 4.189,
        "end": 4.274,
        "phase": "phoneme",
        "index": 1,
        "clip": "clear-r",
        "text": "听这个音，再把声音接起来。",
        "voice": "en-GB-LibbyNeural"
      },
      {
        "start": 4.274,
        "end": 4.454,
        "phase": "gap",
        "index": 1,
        "clip": null,
        "text": ""
      },
      {
        "start": 4.454,
        "end": 8.462,
        "phase": "reminder",
        "index": 2,
        "clip": null,
        "text": "ie 在 friend 里读 /e/，这里特别记。"
      },
      {
        "start": 8.462,
        "end": 8.652,
        "phase": "phoneme",
        "index": 2,
        "clip": "clear-e",
        "text": "听这个音，再把声音接起来。",
        "voice": "en-GB-LibbyNeural"
      },
      {
        "start": 8.652,
        "end": 8.832,
        "phase": "gap",
        "index": 2,
        "clip": null,
        "text": ""
      },
      {
        "start": 8.832,
        "end": 10.728,
        "phase": "cue",
        "index": 3,
        "clip": null,
        "text": "n 对应这个声音。"
      },
      {
        "start": 10.728,
        "end": 10.833,
        "phase": "phoneme",
        "index": 3,
        "clip": "clear-n",
        "text": "听这个音，再把声音接起来。",
        "voice": "en-GB-LibbyNeural"
      },
      {
        "start": 10.833,
        "end": 11.013,
        "phase": "gap",
        "index": 3,
        "clip": null,
        "text": ""
      },
      {
        "start": 11.013,
        "end": 12.909,
        "phase": "cue",
        "index": 4,
        "clip": null,
        "text": "d 对应这个声音。"
      },
      {
        "start": 12.909,
        "end": 12.934,
        "phase": "phoneme",
        "index": 4,
        "clip": "clear-d",
        "text": "听这个音，再把声音接起来。",
        "voice": "en-GB-LibbyNeural"
      },
      {
        "start": 12.934,
        "end": 13.114,
        "phase": "gap",
        "index": 4,
        "clip": null,
        "text": ""
      },
      {
        "start": 13.114,
        "end": 15.418,
        "phase": "cue",
        "index": null,
        "clip": null,
        "text": "声音接起来，慢慢读。"
      },
      {
        "start": 15.418,
        "end": 16.80442,
        "phase": "connected",
        "index": null,
        "clip": null,
        "text": "慢慢接起来。",
        "phones": [
          {
            "index": 0,
            "start": 15.418,
            "end": 15.57282
          },
          {
            "index": 1,
            "start": 15.57282,
            "end": 15.88245
          },
          {
            "index": 2,
            "start": 15.88245,
            "end": 16.3469
          },
          {
            "index": 3,
            "start": 16.3469,
            "end": 16.63442
          },
          {
            "index": 4,
            "start": 16.63442,
            "end": 16.80442
          }
        ]
      },
      {
        "start": 16.80442,
        "end": 17.15442,
        "phase": "gap",
        "index": null,
        "clip": null,
        "text": ""
      },
      {
        "start": 17.15442,
        "end": 18.11192,
        "phase": "connected",
        "index": null,
        "clip": null,
        "text": "再连快一点。",
        "phones": [
          {
            "index": 0,
            "start": 17.15442,
            "end": 17.25464
          },
          {
            "index": 1,
            "start": 17.25464,
            "end": 17.4551
          },
          {
            "index": 2,
            "start": 17.4551,
            "end": 17.75578
          },
          {
            "index": 3,
            "start": 17.75578,
            "end": 17.94192
          },
          {
            "index": 4,
            "start": 17.94192,
            "end": 18.11192
          }
        ]
      },
      {
        "start": 18.11192,
        "end": 18.46192,
        "phase": "gap",
        "index": null,
        "clip": null,
        "text": ""
      },
      {
        "start": 18.46192,
        "end": 19.18192,
        "phase": "word",
        "index": null,
        "clip": "friend",
        "text": "完整地读一遍。"
      },
      {
        "start": 19.18192,
        "end": 21.29392,
        "phase": "cue",
        "index": null,
        "clip": null,
        "text": "跟老师读一遍，再轮到你。"
      },
      {
        "start": 21.29392,
        "end": 22.01392,
        "phase": "word",
        "index": null,
        "clip": "friend",
        "text": "跟着读。"
      },
      {
        "start": 22.01392,
        "end": 25.01392,
        "phase": "echo",
        "index": null,
        "clip": null,
        "text": "轮到你，开口读一遍。"
      }
    ],
    "isolatedPhonemeVoice": "en-GB-LibbyNeural",
    "isolatedPhonemeRevision": "clear-all-w19",
    "isolatedPhonemeMethod": "Only isolated phoneme PCM replaced; original cues, continuous blends, whole words and response gap retained. Highlight windows shifted by actual new sample lengths."
  },
  "meet": {
    "audio": "guided-meet",
    "parts": [
      "m",
      "ee",
      "t"
    ],
    "sounds": [
      "clear-m",
      "sound-ee",
      "clear-t"
    ],
    "focus": 1,
    "hint": "ee 合起来读 /iː/。",
    "duration": 19.737,
    "steps": [
      {
        "start": 0,
        "end": 1.92,
        "phase": "cue",
        "index": 0,
        "clip": null,
        "text": "m 对应这个声音。"
      },
      {
        "start": 1.92,
        "end": 2.005,
        "phase": "phoneme",
        "index": 0,
        "clip": "clear-m",
        "text": "听这个音，再把声音接起来。",
        "voice": "en-GB-LibbyNeural"
      },
      {
        "start": 2.005,
        "end": 2.185,
        "phase": "gap",
        "index": 0,
        "clip": null,
        "text": ""
      },
      {
        "start": 2.185,
        "end": 5.113,
        "phase": "reminder",
        "index": 1,
        "clip": null,
        "text": "ee 合起来读 /iː/。"
      },
      {
        "start": 5.113,
        "end": 5.443,
        "phase": "phoneme",
        "index": 1,
        "clip": "sound-ee",
        "text": "听这个音，再把声音接起来。",
        "voice": "en-GB-LibbyNeural"
      },
      {
        "start": 5.443,
        "end": 5.623,
        "phase": "gap",
        "index": 1,
        "clip": null,
        "text": ""
      },
      {
        "start": 5.623,
        "end": 7.591,
        "phase": "cue",
        "index": 2,
        "clip": null,
        "text": "t 对应这个声音。"
      },
      {
        "start": 7.591,
        "end": 7.671,
        "phase": "phoneme",
        "index": 2,
        "clip": "clear-t",
        "text": "听这个音，再把声音接起来。",
        "voice": "en-GB-LibbyNeural"
      },
      {
        "start": 7.671,
        "end": 7.851,
        "phase": "gap",
        "index": 2,
        "clip": null,
        "text": ""
      },
      {
        "start": 7.851,
        "end": 10.155,
        "phase": "cue",
        "index": null,
        "clip": null,
        "text": "声音接起来，慢慢读。"
      },
      {
        "start": 10.155,
        "end": 11.59579,
        "phase": "connected",
        "index": null,
        "clip": null,
        "text": "慢慢接起来。",
        "phones": [
          {
            "index": 0,
            "start": 10.155,
            "end": 10.61816
          },
          {
            "index": 1,
            "start": 10.61816,
            "end": 11.37079
          },
          {
            "index": 2,
            "start": 11.37079,
            "end": 11.59579
          }
        ]
      },
      {
        "start": 11.59579,
        "end": 11.94579,
        "phase": "gap",
        "index": null,
        "clip": null,
        "text": ""
      },
      {
        "start": 11.94579,
        "end": 12.955,
        "phase": "connected",
        "index": null,
        "clip": null,
        "text": "再连快一点。",
        "phones": [
          {
            "index": 0,
            "start": 11.94579,
            "end": 12.24454
          },
          {
            "index": 1,
            "start": 12.24454,
            "end": 12.73
          },
          {
            "index": 2,
            "start": 12.73,
            "end": 12.955
          }
        ]
      },
      {
        "start": 12.955,
        "end": 13.305,
        "phase": "gap",
        "index": null,
        "clip": null,
        "text": ""
      },
      {
        "start": 13.305,
        "end": 13.965,
        "phase": "word",
        "index": null,
        "clip": "meet",
        "text": "完整地读一遍。"
      },
      {
        "start": 13.965,
        "end": 16.077,
        "phase": "cue",
        "index": null,
        "clip": null,
        "text": "跟老师读一遍，再轮到你。"
      },
      {
        "start": 16.077,
        "end": 16.737,
        "phase": "word",
        "index": null,
        "clip": "meet",
        "text": "跟着读。"
      },
      {
        "start": 16.737,
        "end": 19.737,
        "phase": "echo",
        "index": null,
        "clip": null,
        "text": "轮到你，开口读一遍。"
      }
    ],
    "isolatedVowelSample": "clear-vowel-w18",
    "isolatedPhonemeVoice": "en-GB-LibbyNeural",
    "isolatedPhonemeRevision": "clear-all-w19",
    "isolatedPhonemeMethod": "Only isolated phoneme PCM replaced; original cues, continuous blends, whole words and response gap retained. Highlight windows shifted by actual new sample lengths."
  },
  "play": {
    "audio": "guided-play",
    "parts": [
      "p",
      "l",
      "ay"
    ],
    "sounds": [
      "clear-p",
      "clear-l",
      "clear-ay"
    ],
    "focus": 2,
    "hint": "ay 在这里合起来读 /eɪ/。",
    "duration": 18.76983,
    "steps": [
      {
        "start": 0,
        "end": 1.968,
        "phase": "cue",
        "index": 0,
        "clip": null,
        "text": "p 对应这个声音。"
      },
      {
        "start": 1.968,
        "end": 2.008,
        "phase": "phoneme",
        "index": 0,
        "clip": "clear-p",
        "text": "听这个音，再把声音接起来。",
        "voice": "en-GB-LibbyNeural"
      },
      {
        "start": 2.008,
        "end": 2.188,
        "phase": "gap",
        "index": 0,
        "clip": null,
        "text": ""
      },
      {
        "start": 2.188,
        "end": 4.132,
        "phase": "cue",
        "index": 1,
        "clip": null,
        "text": "l 对应这个声音。"
      },
      {
        "start": 4.132,
        "end": 4.217,
        "phase": "phoneme",
        "index": 1,
        "clip": "clear-l",
        "text": "听这个音，再把声音接起来。",
        "voice": "en-GB-LibbyNeural"
      },
      {
        "start": 4.217,
        "end": 4.397,
        "phase": "gap",
        "index": 1,
        "clip": null,
        "text": ""
      },
      {
        "start": 4.397,
        "end": 6.893,
        "phase": "reminder",
        "index": 2,
        "clip": null,
        "text": "ay 在这里合起来读 /eɪ/。"
      },
      {
        "start": 6.893,
        "end": 7.243,
        "phase": "phoneme",
        "index": 2,
        "clip": "clear-ay",
        "text": "听这个音，再把声音接起来。",
        "voice": "en-GB-LibbyNeural"
      },
      {
        "start": 7.243,
        "end": 7.423,
        "phase": "gap",
        "index": 2,
        "clip": null,
        "text": ""
      },
      {
        "start": 7.423,
        "end": 9.727,
        "phase": "cue",
        "index": null,
        "clip": null,
        "text": "声音接起来，慢慢读。"
      },
      {
        "start": 9.727,
        "end": 10.93875,
        "phase": "connected",
        "index": null,
        "clip": null,
        "text": "慢慢接起来。",
        "phones": [
          {
            "index": 0,
            "start": 9.727,
            "end": 9.817
          },
          {
            "index": 1,
            "start": 9.817,
            "end": 9.99296
          },
          {
            "index": 2,
            "start": 9.99296,
            "end": 10.93875
          }
        ]
      },
      {
        "start": 10.93875,
        "end": 11.28875,
        "phase": "gap",
        "index": null,
        "clip": null,
        "text": ""
      },
      {
        "start": 11.28875,
        "end": 12.10783,
        "phase": "connected",
        "index": null,
        "clip": null,
        "text": "再连快一点。",
        "phones": [
          {
            "index": 0,
            "start": 11.28875,
            "end": 11.37875
          },
          {
            "index": 1,
            "start": 11.37875,
            "end": 11.49312
          },
          {
            "index": 2,
            "start": 11.49312,
            "end": 12.10783
          }
        ]
      },
      {
        "start": 12.10783,
        "end": 12.45783,
        "phase": "gap",
        "index": null,
        "clip": null,
        "text": ""
      },
      {
        "start": 12.45783,
        "end": 13.05783,
        "phase": "word",
        "index": null,
        "clip": "play",
        "text": "完整地读一遍。"
      },
      {
        "start": 13.05783,
        "end": 15.16983,
        "phase": "cue",
        "index": null,
        "clip": null,
        "text": "跟老师读一遍，再轮到你。"
      },
      {
        "start": 15.16983,
        "end": 15.76983,
        "phase": "word",
        "index": null,
        "clip": "play",
        "text": "跟着读。"
      },
      {
        "start": 15.76983,
        "end": 18.76983,
        "phase": "echo",
        "index": null,
        "clip": null,
        "text": "轮到你，开口读一遍。"
      }
    ],
    "isolatedPhonemeVoice": "en-GB-LibbyNeural",
    "isolatedPhonemeRevision": "clear-all-w19",
    "isolatedPhonemeMethod": "Only isolated phoneme PCM replaced; original cues, continuous blends, whole words and response gap retained. Highlight windows shifted by actual new sample lengths."
  },
  "happy": {
    "audio": "guided-happy",
    "parts": [
      "h",
      "a",
      "pp",
      "y"
    ],
    "sounds": [
      "clear-h",
      "clear-a",
      "clear-p",
      "clear-i-short"
    ],
    "focus": 3,
    "hint": "pp 只发一个音；happy 有两小拍，词尾 y 轻轻收住。",
    "duration": 21.72896,
    "steps": [
      {
        "start": 0,
        "end": 2.04,
        "phase": "cue",
        "index": 0,
        "clip": null,
        "text": "h 对应这个声音。"
      },
      {
        "start": 2.04,
        "end": 2.12,
        "phase": "phoneme",
        "index": 0,
        "clip": "clear-h",
        "text": "听这个音，再把声音接起来。",
        "voice": "en-GB-LibbyNeural"
      },
      {
        "start": 2.12,
        "end": 2.3,
        "phase": "gap",
        "index": 0,
        "clip": null,
        "text": ""
      },
      {
        "start": 2.3,
        "end": 4.196,
        "phase": "cue",
        "index": 1,
        "clip": null,
        "text": "a 对应这个声音。"
      },
      {
        "start": 4.196,
        "end": 4.351,
        "phase": "phoneme",
        "index": 1,
        "clip": "clear-a",
        "text": "听这个音，再把声音接起来。",
        "voice": "en-GB-LibbyNeural"
      },
      {
        "start": 4.351,
        "end": 4.531,
        "phase": "gap",
        "index": 1,
        "clip": null,
        "text": ""
      },
      {
        "start": 4.531,
        "end": 7.435,
        "phase": "cue",
        "index": 2,
        "clip": null,
        "text": "pp 对应这个声音。"
      },
      {
        "start": 7.435,
        "end": 7.475,
        "phase": "phoneme",
        "index": 2,
        "clip": "clear-p",
        "text": "听这个音，再把声音接起来。",
        "voice": "en-GB-LibbyNeural"
      },
      {
        "start": 7.475,
        "end": 7.655,
        "phase": "gap",
        "index": 2,
        "clip": null,
        "text": ""
      },
      {
        "start": 7.655,
        "end": 10.223,
        "phase": "reminder",
        "index": 3,
        "clip": null,
        "text": "pp 只发一个音；happy 有两小拍，词尾 y 轻轻收住。"
      },
      {
        "start": 10.223,
        "end": 10.388,
        "phase": "phoneme",
        "index": 3,
        "clip": "clear-i-short",
        "text": "听这个音，再把声音接起来。",
        "voice": "en-GB-LibbyNeural"
      },
      {
        "start": 10.388,
        "end": 10.568,
        "phase": "gap",
        "index": 3,
        "clip": null,
        "text": ""
      },
      {
        "start": 10.568,
        "end": 12.872,
        "phase": "cue",
        "index": null,
        "clip": null,
        "text": "声音接起来，慢慢读。"
      },
      {
        "start": 12.872,
        "end": 13.88196,
        "phase": "connected",
        "index": null,
        "clip": null,
        "text": "慢慢接起来。",
        "phones": [
          {
            "index": 0,
            "start": 12.872,
            "end": 13.14733
          },
          {
            "index": 1,
            "start": 13.14733,
            "end": 13.49775
          },
          {
            "index": 2,
            "start": 13.49775,
            "end": 13.59775
          },
          {
            "index": 3,
            "start": 13.59775,
            "end": 13.88196
          }
        ]
      },
      {
        "start": 13.88196,
        "end": 14.23196,
        "phase": "gap",
        "index": null,
        "clip": null,
        "text": ""
      },
      {
        "start": 14.23196,
        "end": 15.02696,
        "phase": "connected",
        "index": null,
        "clip": null,
        "text": "再连快一点。",
        "phones": [
          {
            "index": 0,
            "start": 14.23196,
            "end": 14.41896
          },
          {
            "index": 1,
            "start": 14.41896,
            "end": 14.65696
          },
          {
            "index": 2,
            "start": 14.65696,
            "end": 14.75696
          },
          {
            "index": 3,
            "start": 14.75696,
            "end": 15.02696
          }
        ]
      },
      {
        "start": 15.02696,
        "end": 15.37696,
        "phase": "gap",
        "index": null,
        "clip": null,
        "text": ""
      },
      {
        "start": 15.37696,
        "end": 15.99696,
        "phase": "word",
        "index": null,
        "clip": "happy",
        "text": "完整地读一遍。"
      },
      {
        "start": 15.99696,
        "end": 18.10896,
        "phase": "cue",
        "index": null,
        "clip": null,
        "text": "跟老师读一遍，再轮到你。"
      },
      {
        "start": 18.10896,
        "end": 18.72896,
        "phase": "word",
        "index": null,
        "clip": "happy",
        "text": "跟着读。"
      },
      {
        "start": 18.72896,
        "end": 21.72896,
        "phase": "echo",
        "index": null,
        "clip": null,
        "text": "轮到你，开口读一遍。"
      }
    ],
    "isolatedPhonemeVoice": "en-GB-LibbyNeural",
    "isolatedPhonemeRevision": "clear-all-w19",
    "isolatedPhonemeMethod": "Only isolated phoneme PCM replaced; original cues, continuous blends, whole words and response gap retained. Highlight windows shifted by actual new sample lengths."
  },
  "you": {
    "audio": "guided-you",
    "parts": [
      "y",
      "ou"
    ],
    "sounds": [
      "clear-j",
      "clear-u"
    ],
    "focus": 1,
    "hint": "ou 在 you 里读 /uː/，这里特别记。",
    "duration": 17.1845,
    "steps": [
      {
        "start": 0,
        "end": 2.4,
        "phase": "cue",
        "index": 0,
        "clip": null,
        "text": "y 对应这个声音。"
      },
      {
        "start": 2.4,
        "end": 2.48,
        "phase": "phoneme",
        "index": 0,
        "clip": "clear-j",
        "text": "听这个音，再把声音接起来。",
        "voice": "en-GB-LibbyNeural"
      },
      {
        "start": 2.48,
        "end": 2.66,
        "phase": "gap",
        "index": 0,
        "clip": null,
        "text": ""
      },
      {
        "start": 2.66,
        "end": 5.396,
        "phase": "reminder",
        "index": 1,
        "clip": null,
        "text": "ou 在 you 里读 /uː/，这里特别记。"
      },
      {
        "start": 5.396,
        "end": 5.746,
        "phase": "phoneme",
        "index": 1,
        "clip": "clear-u",
        "text": "听这个音，再把声音接起来。",
        "voice": "en-GB-LibbyNeural"
      },
      {
        "start": 5.746,
        "end": 5.926,
        "phase": "gap",
        "index": 1,
        "clip": null,
        "text": ""
      },
      {
        "start": 5.926,
        "end": 8.23,
        "phase": "cue",
        "index": null,
        "clip": null,
        "text": "声音接起来，慢慢读。"
      },
      {
        "start": 8.23,
        "end": 9.48667,
        "phase": "connected",
        "index": null,
        "clip": null,
        "text": "慢慢接起来。",
        "phones": [
          {
            "index": 0,
            "start": 8.23,
            "end": 8.50926
          },
          {
            "index": 1,
            "start": 8.50926,
            "end": 9.48667
          }
        ]
      },
      {
        "start": 9.48667,
        "end": 9.83667,
        "phase": "gap",
        "index": null,
        "clip": null,
        "text": ""
      },
      {
        "start": 9.83667,
        "end": 10.6425,
        "phase": "connected",
        "index": null,
        "clip": null,
        "text": "再连快一点。",
        "phones": [
          {
            "index": 0,
            "start": 9.83667,
            "end": 10.01574
          },
          {
            "index": 1,
            "start": 10.01574,
            "end": 10.6425
          }
        ]
      },
      {
        "start": 10.6425,
        "end": 10.9925,
        "phase": "gap",
        "index": null,
        "clip": null,
        "text": ""
      },
      {
        "start": 10.9925,
        "end": 11.5325,
        "phase": "word",
        "index": null,
        "clip": "you",
        "text": "完整地读一遍。"
      },
      {
        "start": 11.5325,
        "end": 13.6445,
        "phase": "cue",
        "index": null,
        "clip": null,
        "text": "跟老师读一遍，再轮到你。"
      },
      {
        "start": 13.6445,
        "end": 14.1845,
        "phase": "word",
        "index": null,
        "clip": "you",
        "text": "跟着读。"
      },
      {
        "start": 14.1845,
        "end": 17.1845,
        "phase": "echo",
        "index": null,
        "clip": null,
        "text": "轮到你，开口读一遍。"
      }
    ],
    "isolatedPhonemeVoice": "en-GB-LibbyNeural",
    "isolatedPhonemeRevision": "clear-all-w19",
    "isolatedPhonemeMethod": "Only isolated phoneme PCM replaced; original cues, continuous blends, whole words and response gap retained. Highlight windows shifted by actual new sample lengths."
  },
  "to": {
    "audio": "guided-to",
    "parts": [
      "t",
      "o"
    ],
    "sounds": [
      "clear-t",
      "clear-u"
    ],
    "focus": 1,
    "hint": "to 单独读时，o 读 /uː/，这里特别记。",
    "duration": 16.00729,
    "steps": [
      {
        "start": 0,
        "end": 1.968,
        "phase": "cue",
        "index": 0,
        "clip": null,
        "text": "t 对应这个声音。"
      },
      {
        "start": 1.968,
        "end": 2.048,
        "phase": "phoneme",
        "index": 0,
        "clip": "clear-t",
        "text": "听这个音，再把声音接起来。",
        "voice": "en-GB-LibbyNeural"
      },
      {
        "start": 2.048,
        "end": 2.228,
        "phase": "gap",
        "index": 0,
        "clip": null,
        "text": ""
      },
      {
        "start": 2.228,
        "end": 4.58,
        "phase": "reminder",
        "index": 1,
        "clip": null,
        "text": "to 单独读时，o 读 /uː/，这里特别记。"
      },
      {
        "start": 4.58,
        "end": 4.93,
        "phase": "phoneme",
        "index": 1,
        "clip": "clear-u",
        "text": "听这个音，再把声音接起来。",
        "voice": "en-GB-LibbyNeural"
      },
      {
        "start": 4.93,
        "end": 5.11,
        "phase": "gap",
        "index": 1,
        "clip": null,
        "text": ""
      },
      {
        "start": 5.11,
        "end": 7.414,
        "phase": "cue",
        "index": null,
        "clip": null,
        "text": "声音接起来，慢慢读。"
      },
      {
        "start": 7.414,
        "end": 8.46279,
        "phase": "connected",
        "index": null,
        "clip": null,
        "text": "慢慢接起来。",
        "phones": [
          {
            "index": 0,
            "start": 7.414,
            "end": 7.534
          },
          {
            "index": 1,
            "start": 7.534,
            "end": 8.46279
          }
        ]
      },
      {
        "start": 8.46279,
        "end": 8.81279,
        "phase": "gap",
        "index": null,
        "clip": null,
        "text": ""
      },
      {
        "start": 8.81279,
        "end": 9.54529,
        "phase": "connected",
        "index": null,
        "clip": null,
        "text": "再连快一点。",
        "phones": [
          {
            "index": 0,
            "start": 8.81279,
            "end": 8.93279
          },
          {
            "index": 1,
            "start": 8.93279,
            "end": 9.54529
          }
        ]
      },
      {
        "start": 9.54529,
        "end": 9.89529,
        "phase": "gap",
        "index": null,
        "clip": null,
        "text": ""
      },
      {
        "start": 9.89529,
        "end": 10.39529,
        "phase": "word",
        "index": null,
        "clip": "to",
        "text": "完整地读一遍。"
      },
      {
        "start": 10.39529,
        "end": 12.50729,
        "phase": "cue",
        "index": null,
        "clip": null,
        "text": "跟老师读一遍，再轮到你。"
      },
      {
        "start": 12.50729,
        "end": 13.00729,
        "phase": "word",
        "index": null,
        "clip": "to",
        "text": "跟着读。"
      },
      {
        "start": 13.00729,
        "end": 16.00729,
        "phase": "echo",
        "index": null,
        "clip": null,
        "text": "轮到你，开口读一遍。"
      }
    ],
    "isolatedPhonemeVoice": "en-GB-LibbyNeural",
    "isolatedPhonemeRevision": "clear-all-w19",
    "isolatedPhonemeMethod": "Only isolated phoneme PCM replaced; original cues, continuous blends, whole words and response gap retained. Highlight windows shifted by actual new sample lengths."
  },
  "lets": {
    "audio": "guided-lets",
    "parts": [
      "l",
      "e",
      "t",
      "'s"
    ],
    "sounds": [
      "clear-l",
      "clear-e",
      "clear-t",
      "clear-s"
    ],
    "focus": 3,
    "hint": "小撇号不发音，这里的 s 读 /s/。",
    "duration": 21.79467,
    "steps": [
      {
        "start": 0,
        "end": 1.944,
        "phase": "cue",
        "index": 0,
        "clip": null,
        "text": "l 对应这个声音。"
      },
      {
        "start": 1.944,
        "end": 2.029,
        "phase": "phoneme",
        "index": 0,
        "clip": "clear-l",
        "text": "听这个音，再把声音接起来。",
        "voice": "en-GB-LibbyNeural"
      },
      {
        "start": 2.029,
        "end": 2.209,
        "phase": "gap",
        "index": 0,
        "clip": null,
        "text": ""
      },
      {
        "start": 2.209,
        "end": 4.129,
        "phase": "cue",
        "index": 1,
        "clip": null,
        "text": "e 对应这个声音。"
      },
      {
        "start": 4.129,
        "end": 4.319,
        "phase": "phoneme",
        "index": 1,
        "clip": "clear-e",
        "text": "听这个音，再把声音接起来。",
        "voice": "en-GB-LibbyNeural"
      },
      {
        "start": 4.319,
        "end": 4.499,
        "phase": "gap",
        "index": 1,
        "clip": null,
        "text": ""
      },
      {
        "start": 4.499,
        "end": 6.467,
        "phase": "cue",
        "index": 2,
        "clip": null,
        "text": "t 对应这个声音。"
      },
      {
        "start": 6.467,
        "end": 6.547,
        "phase": "phoneme",
        "index": 2,
        "clip": "clear-t",
        "text": "听这个音，再把声音接起来。",
        "voice": "en-GB-LibbyNeural"
      },
      {
        "start": 6.547,
        "end": 6.727,
        "phase": "gap",
        "index": 2,
        "clip": null,
        "text": ""
      },
      {
        "start": 6.727,
        "end": 9.943,
        "phase": "reminder",
        "index": 3,
        "clip": null,
        "text": "小撇号不发音，这里的 s 读 /s/。"
      },
      {
        "start": 9.943,
        "end": 10.108,
        "phase": "phoneme",
        "index": 3,
        "clip": "clear-s",
        "text": "听这个音，再把声音接起来。",
        "voice": "en-GB-LibbyNeural"
      },
      {
        "start": 10.108,
        "end": 10.288,
        "phase": "gap",
        "index": 3,
        "clip": null,
        "text": ""
      },
      {
        "start": 10.288,
        "end": 12.592,
        "phase": "cue",
        "index": null,
        "clip": null,
        "text": "声音接起来，慢慢读。"
      },
      {
        "start": 12.592,
        "end": 13.77304,
        "phase": "connected",
        "index": null,
        "clip": null,
        "text": "慢慢接起来。",
        "phones": [
          {
            "index": 0,
            "start": 12.592,
            "end": 12.91623
          },
          {
            "index": 1,
            "start": 12.91623,
            "end": 13.26208
          },
          {
            "index": 2,
            "start": 13.26208,
            "end": 13.40208
          },
          {
            "index": 3,
            "start": 13.40208,
            "end": 13.77304
          }
        ]
      },
      {
        "start": 13.77304,
        "end": 14.12304,
        "phase": "gap",
        "index": null,
        "clip": null,
        "text": ""
      },
      {
        "start": 14.12304,
        "end": 14.97267,
        "phase": "connected",
        "index": null,
        "clip": null,
        "text": "再连快一点。",
        "phones": [
          {
            "index": 0,
            "start": 14.12304,
            "end": 14.34189
          },
          {
            "index": 1,
            "start": 14.34189,
            "end": 14.57533
          },
          {
            "index": 2,
            "start": 14.57533,
            "end": 14.71533
          },
          {
            "index": 3,
            "start": 14.71533,
            "end": 14.97267
          }
        ]
      },
      {
        "start": 14.97267,
        "end": 15.32267,
        "phase": "gap",
        "index": null,
        "clip": null,
        "text": ""
      },
      {
        "start": 15.32267,
        "end": 16.00267,
        "phase": "word",
        "index": null,
        "clip": "lets",
        "text": "完整地读一遍。"
      },
      {
        "start": 16.00267,
        "end": 18.11467,
        "phase": "cue",
        "index": null,
        "clip": null,
        "text": "跟老师读一遍，再轮到你。"
      },
      {
        "start": 18.11467,
        "end": 18.79467,
        "phase": "word",
        "index": null,
        "clip": "lets",
        "text": "跟着读。"
      },
      {
        "start": 18.79467,
        "end": 21.79467,
        "phase": "echo",
        "index": null,
        "clip": null,
        "text": "轮到你，开口读一遍。"
      }
    ],
    "isolatedPhonemeVoice": "en-GB-LibbyNeural",
    "isolatedPhonemeRevision": "clear-all-w19",
    "isolatedPhonemeMethod": "Only isolated phoneme PCM replaced; original cues, continuous blends, whole words and response gap retained. Highlight windows shifted by actual new sample lengths."
  }
});
LESSONS['unit1-01']={course:{...LESSONS['welcome-02'].course,number:1,unitId:'unit1',section:'Unit 1 · Let’s be friends!',lessonId:'unit1-01',lessonTitle:'认识朋友，一起玩',page:'课本第6—7页 · Get ready 巩固',estimated:'情境、认词、课本小任务可分次完成',description:'见面问好 · 邀请玩耍 · 表达快乐',heroScene:'u1-meet',source:'https://www.yeyulingfeng.com/wendang/91243522.html',reusedExperience:true,adventure:{chapter:'第六章 · 新朋友街区',title:'新朋友街区',subtitle:'把学过的问候，带到新的街区。',intro:'听清七个词的声音，再用句子认识朋友、邀请玩耍。',message:'Welcome 的导航任务完成，新的朋友发来了消息。沿着熟悉的六站路线继续出发，旧星光和营地都留着。',end:'本课新朋友任务完成啦！回营地可以兑换友谊纪念画，其他 Unit 1 内容继续按课加入。'}},words:[
  {
    "id": "friend",
    "word": "friend",
    "ipa": "/frend/",
    "pos": "n.",
    "meaning": "朋友",
    "tone": "#edf0df",
    "tip": "特别记住 friend 中间的 ie；这个词不能直接照搬其他 ie 的读法。",
    "example": "This is my friend.",
    "translation": "这是我的朋友。",
    "audio": "friend",
    "sentence": "friend-sentence",
    "scene": "u1-friend",
    "exampleAudio": "friend-sentence",
    "parts": [
      "f",
      "r",
      "ie",
      "n",
      "d"
    ],
    "kind": "特别记一记",
    "hint": "ie 在 friend 里读 /e/，这里特别记。"
  },
  {
    "id": "meet",
    "word": "meet",
    "ipa": "/miːt/",
    "pos": "v.",
    "meaning": "认识；结识",
    "tone": "#f6e9dd",
    "tip": "找到中间的 ee：两个字母，合起来发一个音。",
    "example": "Nice to meet you.",
    "translation": "很高兴认识你。",
    "audio": "meet",
    "sentence": "meet-sentence",
    "scene": "u1-meet",
    "exampleAudio": "meet-sentence",
    "parts": [
      "m",
      "ee",
      "t"
    ],
    "kind": "组合小规律",
    "hint": "ee 合起来读 /iː/。"
  },
  {
    "id": "play",
    "word": "play",
    "ipa": "/pleɪ/",
    "pos": "v.",
    "meaning": "玩；玩耍",
    "tone": "#e3ece7",
    "tip": "留意结尾的 ay：两个字母一起读。",
    "example": "Let's play.",
    "translation": "让我们一起玩吧。",
    "audio": "play",
    "sentence": "play-sentence",
    "scene": "u1-play",
    "exampleAudio": "play-sentence",
    "parts": [
      "p",
      "l",
      "ay"
    ],
    "kind": "组合小规律",
    "hint": "ay 在这里合起来读 /eɪ/。"
  },
  {
    "id": "happy",
    "word": "happy",
    "ipa": "/ˈhæpi/",
    "pos": "adj.",
    "meaning": "高兴的；快乐的",
    "tone": "#fbefce",
    "tip": "听听词尾的 y；再看看 pp，两个 p 在这里只发一个音。",
    "example": "I'm happy.",
    "translation": "我很高兴。",
    "audio": "happy",
    "sentence": "happy-sentence",
    "scene": "u1-happy",
    "exampleAudio": "happy-sentence",
    "parts": [
      "h",
      "a",
      "pp",
      "y"
    ],
    "kind": "词尾小规律",
    "hint": "pp 只发一个音；happy 有两小拍，词尾 y 轻轻收住。"
  },
  {
    "id": "you",
    "word": "you",
    "ipa": "/juː/",
    "pos": "pron.",
    "meaning": "你；你们",
    "tone": "#eee6e9",
    "tip": "you 很常用。开头的 y 和后面的 ou 连在一起，听一听。",
    "example": "You are my friend.",
    "translation": "你是我的朋友。",
    "audio": "you",
    "sentence": "you-sentence",
    "scene": "u1-you",
    "exampleAudio": "you-sentence",
    "parts": [
      "y",
      "ou"
    ],
    "kind": "特别记一记",
    "hint": "ou 在 you 里读 /uː/，这里特别记。"
  },
  {
    "id": "lets",
    "word": "let's",
    "ipa": "/lets/",
    "pos": "let us 的缩写",
    "meaning": "让我们",
    "tone": "#e8ebda",
    "tip": "先认识 let，再留意 's。小撇号本身不用读出一个音。",
    "example": "Let's be friends.",
    "translation": "让我们成为朋友吧。",
    "audio": "lets",
    "sentence": "lets-sentence",
    "scene": "u1-lets",
    "exampleAudio": "lets-sentence",
    "parts": [
      "l",
      "e",
      "t",
      "'s"
    ],
    "kind": "缩写小提醒",
    "hint": "小撇号不发音，这里的 s 读 /s/。"
  },
  {
    "id": "to",
    "word": "to",
    "ipa": "/tuː/",
    "pos": "prep. / 与动词等连用",
    "meaning": "向；到；与动词等连用",
    "tone": "#f2e8d8",
    "tip": "先听清 to 单独读的声音；句子里它还可能读得轻一些。",
    "example": "Nice to meet you.",
    "translation": "很高兴认识你。",
    "audio": "to",
    "sentence": "meet-sentence",
    "scene": "u1-to",
    "exampleAudio": "meet-sentence",
    "parts": [
      "t",
      "o"
    ],
    "kind": "特别记一记",
    "hint": "to 单独读时，o 读 /uː/，这里特别记。"
  }
],scenes:[
  {
    "id": "u1-meet",
    "name": "新同学第一次见面，挥手问好。",
    "audio": "meet-sentence",
    "alt": "明亮的教室门口，两位新同学在老师介绍下挥手打招呼。",
    "lines": [
      {
        "who": "情境示范",
        "text": "Nice to meet you.",
        "zh": "很高兴认识你。",
        "audio": "meet-sentence"
      }
    ]
  },
  {
    "id": "u1-play",
    "name": "放学后，和朋友一起踢球。",
    "audio": "play-sentence",
    "alt": "学校操场上，三个孩子开心地追逐、传递足球。",
    "lines": [
      {
        "who": "情境示范",
        "text": "Let's play.",
        "zh": "让我们一起玩吧。",
        "audio": "play-sentence"
      }
    ]
  },
  {
    "id": "u1-happy",
    "name": "风筝飞起来了，她开心地笑了。",
    "audio": "happy-sentence",
    "alt": "女孩成功放起风筝，露出开心笑容，男孩在旁鼓励。",
    "lines": [
      {
        "who": "情境示范",
        "text": "I'm happy.",
        "zh": "我很高兴。",
        "audio": "happy-sentence"
      }
    ]
  }
],tasks:[],missions:[
  {
    "id": "signal",
    "title": "接通信号港",
    "skill": "听音认意",
    "icon": "📡",
    "scene": "meet",
    "story": "字母导航台准备好了，伙伴们飞向友谊星的新朋友街区。听清四条消息，帮米娅接通联络器。",
    "done": "信号接通！新朋友正在向星球靠近。",
    "tasks": [
      {
        "id": "hear-friend",
        "type": "picture",
        "word": "friend",
        "audio": "friend",
        "prompt": "听到的单词，对应哪幅画？",
        "options": [
          "friend",
          "play",
          "happy"
        ],
        "answer": "friend",
        "hint": "friend 是能一起玩、互相帮助的朋友。"
      },
      {
        "id": "hear-play",
        "type": "picture",
        "word": "play",
        "audio": "play",
        "prompt": "听消息，选择正在做这件事的画面",
        "options": [
          "happy",
          "play",
          "meet"
        ],
        "answer": "play",
        "hint": "想想操场上一起踢球的画面。"
      },
      {
        "id": "hear-happy",
        "type": "picture",
        "word": "happy",
        "audio": "happy",
        "prompt": "听一听，哪幅画能表示这个心情？",
        "options": [
          "meet",
          "friend",
          "happy"
        ],
        "answer": "happy",
        "hint": "happy 表示高兴、快乐。"
      },
      {
        "id": "hear-meet",
        "type": "choice",
        "word": "meet",
        "audio": "meet-sentence",
        "prompt": "听完整句话。小朋友正在做什么？",
        "options": [
          "第一次见面，友好地问候",
          "邀请朋友踢球",
          "说自己很开心"
        ],
        "answer": "第一次见面，友好地问候",
        "hint": "Nice to meet you. 是认识新朋友时的问候。"
      }
    ]
  },
  {
    "id": "sound",
    "title": "修好拼读机",
    "skill": "声音与拼读",
    "icon": "🔧",
    "scene": "lets",
    "story": "飞船的拼读机缺了零件。先听清完整单词，再把声音零件排好。",
    "done": "拼读机运转啦！下一个目的地：补给站。",
    "tasks": [
      {
        "id": "blend-meet",
        "type": "build",
        "word": "meet",
        "audio": "meet",
        "prompt": "听单词，再拼出来",
        "parts": [
          "m",
          "ee",
          "t"
        ],
        "answer": "meet",
        "hint": "中间的字母组合是一块声音零件，别把它拆开。"
      },
      {
        "id": "blend-play",
        "type": "build",
        "word": "play",
        "audio": "play",
        "prompt": "听单词，再拼出来",
        "parts": [
          "p",
          "l",
          "ay"
        ],
        "answer": "play",
        "hint": "开头有两个辅音，听清后依次接上。"
      },
      {
        "id": "blend-friend",
        "type": "build",
        "word": "friend",
        "audio": "friend",
        "prompt": "听单词，再拼出来",
        "parts": [
          "f",
          "r",
          "ie",
          "n",
          "d"
        ],
        "answer": "friend",
        "hint": "中间有一组需要特别记住的字母组合，再听一次，想想顺序。"
      }
    ]
  },
  {
    "id": "supply",
    "title": "装满单词补给",
    "skill": "独立拼写",
    "icon": "🎒",
    "scene": "friend",
    "story": "带着新朋友的消息继续出发。把物资上的单词拼对，补给箱就能装上飞船。",
    "done": "补给箱装满了！带着它们去修复句子桥。",
    "tasks": [
      {
        "id": "spell-friend",
        "type": "spell",
        "word": "friend",
        "audio": "friend",
        "prompt": "为“朋友”补给箱拼出单词",
        "answer": "friend",
        "extra": [
          "a"
        ],
        "hint": "中间两个元音字母的次序别颠倒。"
      },
      {
        "id": "spell-happy",
        "type": "spell",
        "word": "happy",
        "audio": "happy",
        "prompt": "拼出“高兴的；快乐的”",
        "answer": "happy",
        "extra": [
          "i"
        ],
        "hint": "有一个辅音字母需要用两次，别漏掉。"
      },
      {
        "id": "spell-you",
        "type": "spell",
        "word": "you",
        "audio": "you",
        "prompt": "拼出“你；你们”",
        "answer": "you",
        "extra": [
          "a"
        ],
        "hint": "先听开头，再听后面的声音，慢慢想。"
      },
      {
        "id": "spell-lets",
        "type": "spell",
        "word": "lets",
        "audio": "lets",
        "prompt": "拼出“让我们”，记得带上小撇号",
        "answer": "let's",
        "extra": [
          "a"
        ],
        "hint": "别漏掉中间的小撇号。"
      }
    ]
  },
  {
    "id": "bridge",
    "title": "走过句子桥",
    "skill": "句子理解",
    "icon": "🌉",
    "scene": "to",
    "story": "桥上的句子少了几块石头。读懂整句话，找回关键词，让飞船安全通过。",
    "done": "句子桥亮起来了！朋友广场就在前面。",
    "tasks": [
      {
        "id": "gap-meet",
        "type": "gap",
        "word": "meet",
        "audio": "meet-sentence",
        "prompt": "第一次见到新朋友，补全问候语",
        "sentence": "Nice to ___ you.",
        "zh": "很高兴认识你。",
        "options": [
          "meet",
          "play",
          "happy"
        ],
        "answer": "meet",
        "hint": "“认识你”用 meet you。"
      },
      {
        "id": "gap-to",
        "type": "gap",
        "word": "to",
        "audio": "meet-sentence",
        "prompt": "再检查一次，这句话少了哪个小词？",
        "sentence": "Nice ___ meet you.",
        "zh": "很高兴认识你。",
        "options": [
          "you",
          "to",
          "friend"
        ],
        "answer": "to",
        "hint": "记住整句 Nice to meet you.，to 在这里和 meet 连用。"
      },
      {
        "id": "find-friend",
        "type": "find",
        "word": "friend",
        "audio": "friend-sentence",
        "prompt": "在整句话里，点出表示“朋友”的词",
        "parts": [
          "This",
          "is",
          "my",
          "friend."
        ],
        "zh": "这是我的朋友。",
        "answer": "friend.",
        "hint": "“我的朋友”是 my friend，点 friend。"
      },
      {
        "id": "order-greeting",
        "type": "order",
        "word": "meet",
        "audio": "meet-sentence",
        "prompt": "把石头排成“很高兴认识你”",
        "parts": [
          "Nice",
          "to",
          "meet",
          "you."
        ],
        "answer": "Nice to meet you.",
        "hint": "Nice 开头，接着 to meet，最后 you。"
      }
    ]
  },
  {
    "id": "friends",
    "title": "朋友广场见",
    "skill": "情境对话",
    "icon": "🤝",
    "scene": "you",
    "story": "广场上来了几位新朋友。选一句适合当下的话，让大家一起加入派对。",
    "done": "新朋友加入队伍啦！一起去准备最后的欢迎派对。",
    "tasks": [
      {
        "id": "invite",
        "type": "dialogue",
        "word": "lets",
        "audio": "lets-sentence",
        "prompt": "你想邀请大家交朋友，可以说什么？",
        "context": "米娅：我们还不认识呢，先交个朋友吧！",
        "options": [
          "Let's be friends.",
          "I'm happy.",
          "This is my friend."
        ],
        "answer": "Let's be friends.",
        "hint": "Let's be friends. 是“让我们成为朋友吧”。"
      },
      {
        "id": "say-you",
        "type": "gap",
        "word": "you",
        "audio": "you-sentence",
        "prompt": "对着面前的新朋友，把话说完整",
        "sentence": "___ are my friend.",
        "zh": "你是我的朋友。",
        "options": [
          "You",
          "I",
          "to"
        ],
        "answer": "You",
        "hint": "对着别人说“你”，用 you；句首写 You。"
      },
      {
        "id": "invite-play",
        "type": "dialogue",
        "word": "play",
        "audio": "play-sentence",
        "prompt": "球已经准备好了，怎么邀请朋友一起玩？",
        "context": "新朋友站在球场边，你想让他一起加入。",
        "options": [
          "Nice to meet you.",
          "Let's play.",
          "This is my friend."
        ],
        "answer": "Let's play.",
        "hint": "Let's play. 表示“让我们一起玩吧”。"
      }
    ]
  },
  {
    "id": "party",
    "title": "点亮欢迎派对",
    "skill": "听懂 · 组句 · 开口",
    "icon": "🎉",
    "scene": "happy",
    "story": "所有朋友都到齐了！听懂最后一条消息，拼好欢迎语，再亲口说一句，就能点亮友谊星。",
    "done": "新朋友聚会开始啦！回营地可以用金币添一幅友谊纪念画。",
    "tasks": [
      {
        "id": "party-listen",
        "type": "choice",
        "word": "happy",
        "audio": "happy-sentence",
        "prompt": "听一听，米娅现在的心情是什么？",
        "options": [
          "很开心",
          "在介绍朋友",
          "在邀请大家玩"
        ],
        "answer": "很开心",
        "hint": "I'm happy. 表示“我很开心”。"
      },
      {
        "id": "party-order",
        "type": "order",
        "word": "you",
        "audio": "you-sentence",
        "prompt": "把“你是我的朋友”排成一句话",
        "parts": [
          "You",
          "are",
          "my",
          "friend."
        ],
        "answer": "You are my friend.",
        "hint": "You are 开头，再接 my friend。"
      },
      {
        "id": "party-say",
        "type": "speak",
        "audio": "lets-sentence",
        "prompt": "用你的声音邀请大家交朋友",
        "sentence": "Let's be friends.",
        "zh": "让我们成为朋友吧。",
        "hint": "先听老师，再读出整句话。let’s 最后的 /s/ 也要读到。"
      }
    ]
  }
]};
useLesson(requestedLesson);
