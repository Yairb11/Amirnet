# Amirnet Helper

## About the project

I was in a rush: I had only 2 days left before the exam and I wanted something fast to practice with, so I built this simple site for practicing the Amirnet exam (academic English level).

The entire project was written by Claude.

## Structure tree

```
Amirnet/
├── index.html
├── style.css
├── app.js
├── questions.js
├── sentences2.js
├── sentences3.js
├── tests1.js
├── tests2.js
├── tests3.js
├── tests4.js
├── reading.js
├── vocab.js
├── vocab2.js
├── he.js
├── CLAUDE.md
├── README.md
└── .claude/
    └── launch.json
```

### Explanation for each file

| File | What it does |
|---|---|
| `index.html` | The page skeleton: main menu (10 fixed exams + random practice cards + endless game), the questions area and the results area. Loads all the scripts in the right order. |
| `style.css` | All the design: light/dark mode, numbered reading passage, translations, RTL/LTR handling. |
| `app.js` | All the logic: building exams, shuffling, showing questions, revealing answers, scoring, saving best scores, and the endless game. |
| `questions.js` | Old question pool used for random practice (`SENTENCES`, `RESTATEMENTS`). |
| `sentences2.js` | 130 additional Sentence Completions questions (`SENTENCES2`). |
| `sentences3.js` | More Sentence Completions questions, and `SENTENCES_ALL` - the full combined pool (195 questions) used for random practice and the endless game. |
| `tests1.js` | Defines the `Q()` helper and `TESTS`; exams 1-5 (sentence completions + short restatements). |
| `tests2.js` | Exams 6-10 (same structure as `tests1.js`). |
| `tests3.js` | `EXTRA`: the two Word Completions chapters and additional short restatements for every exam. |
| `tests4.js` | `LONG`: long restatement questions for every exam, and the build of the two Restatements chapters. |
| `reading.js` | `READING`: 12 reading comprehension passages with 5 questions each. |
| `vocab.js` | `VOCAB`: English -> Hebrew dictionary for all the answer options in the completion chapters. |
| `vocab2.js` | Extra vocabulary words for the newer questions. |
| `he.js` | `HE`: full Hebrew translations for the Restatements questions. |
| `CLAUDE.md` | Project notes/instructions for Claude. |
| `README.md` | This file. |
| `.claude/launch.json` | Preview server config (`python -m http.server 8123`). |

## How to install

No installation needed. There are no dependencies, no build step and no server - just download/copy the project folder to your computer.

## How to run

Just open the `index.html` file in your browser (double click on it).

## What inside

### Fixed exams
- **10 fixed exams**, each with 6 chapters in a fixed order (23 questions):
  1. Word Completions - 4 questions
  2. Word Completions - 4 questions
  3. Reading Comprehension - one passage + 5 questions
  4. Restatements - 3 questions (2 short + 1 long)
  5. Restatements - 3 questions (2 long + 1 short)
  6. Sentence Completions - 4 questions (some with two blanks)
- The correct answer is **not revealed until you click an answer**. After clicking you see right/wrong marking and an explanation in Hebrew.
- In the completion chapters, a **Hebrew translation of all four options** is shown after you answer.
- In the Restatements chapters, a **full Hebrew translation of the original sentence and every option** is shown, with the English word/phrase in parentheses.
- At the end you get an **estimated Amirnet score (50-150)**, the number of correct answers and a level note. Your best score for each exam is saved in the browser.

### Random practice
- **Random full exam** - 6 chapters built randomly from the entire question pool.
- **Single chapter** - random Sentence Completions, Reading Comprehension or Restatements.

### Endless game
Three modes: mixed, Sentence Completions only, and Restatements only.
- One random question at a time, with explanation/translation, then `Continue`.
- No repeats until the whole pool was seen.
- Sticky bar with SCORE, STREAK, CORRECT and BEST. 10 points per correct answer + 2 for each correct answer in a row (up to +10). A mistake resets the streak.
- Keyboard: `A-D` / `1-4` to choose an answer, `Enter` / `Space` to continue.
- Best score for each mode is saved in the browser.

### More
- Hebrew (RTL) interface with English (LTR) exam content.
- Light and dark mode (follows your system).
- Works fully offline.

## For The Future

All the content is plain JavaScript data files, so everything can be changed by editing them in any text editor.

### Question format
A question is written as `Q(question, explanation, correct, wrong1, wrong2, wrong3)`. **The correct answer is always first** - the site shuffles the order every time it is shown.

### Add / remove / change questions
- **Completion question (words / sentences):** add a `Q(...)` to the matching array (`tests1.js`, `tests2.js`, `tests3.js`, or `sentences2.js` / `sentences3.js` for the random pool). Every new word (including the wrong options) must also be added to `vocab.js` (or `vocab2.js`), otherwise it is shown without a translation. For two blanks write the option as `"word1 ... word2"`.
- **Restatement question:** add the `Q(...)` and also its Hebrew translation in `he.js` - 5 strings in the original order: `[original sentence, A, B, C, D]`.
- **Reading passage:** add it to `reading.js` - 3-4 paragraphs, no title, 5 questions. To ask about a word, use `{L:word}` in the question, and the line number is filled in automatically.
- **Remove:** delete the `Q(...)` line (and keep the matching entries in `he.js` in sync for restatements).
- **New exam (11):** add an object to `TESTS`, matching entries in `EXTRA`, `LONG`, `HE`, and a passage in `READING` - they are connected by index, so keep the same order.
- **Changing the number of questions in an exam:** change the key `amirnetScores2` in `app.js`, so old saved scores will not get mixed up.

### Vocabulary
`vocab.js` / `vocab2.js` hold a string of Hebrew translations per English word, separated by `|`. Add or edit a word there to change its translation.

### Difficulty
- Difficulty is determined by the questions and the wrong options: use harder words and closer distractors to make it harder, simpler ones to make it easier.
- Make sure the wrong options are really wrong (no second correct answer).
- In Restatements, vary the length of the correct answer - it should not always be the longest.
- The score formula is `estimateScore` in `app.js` (`round(50 + 100 * right / total)`) and the level notes are in `levelNote()`.
- Endless game scoring (10 points + streak bonus) is in the "Endless game" block in `app.js`.