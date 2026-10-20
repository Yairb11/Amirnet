const $ = (id) => document.getElementById(id);
const LETTERS = ["A", "B", "C", "D"];
const DIRECTIONS = {
  words: "Word Completions – For each question, choose the word that best completes the sentence.",
  sentences: "Sentence Completions – For each question, choose the answer which best completes the sentence.",
  reading: "Reading Comprehension – For each question, choose the most appropriate answer based on the text.",
  restatements: "Restatements – Choose the one restatement which best expresses the meaning of the original sentence.",
};
const TITLES = { words: "Word Completions", sentences: "Sentence Completions", reading: "Reading Comprehension", restatements: "Restatements" };

// Estimated Amirnet score (50-150) from the share of correct answers. The real conversion is not public,
// so this is a linear approximation, not an official score.
function estimateScore(right, total) {
  return Math.round(50 + 100 * (right / total));
}
function levelNote(score) {
  if (score >= 134) return "בטווח הפטור מאנגלית באוניברסיטאות רבות (134+)";
  if (score >= 120) return "רמה טובה – קרוב לסף הפטור";
  if (score >= 100) return "רמה בינונית – כדאי להמשיך לתרגל אוצר מילים";
  return "רמה בסיסית – התמקד בלימוד מילים וקריאה";
}

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
const pick = (arr, n) => shuffle(arr).slice(0, n);

// Keeps the answer index correct after shuffling the options.
function prepare(q) {
  const order = shuffle(q.o.map((text, i) => ({ text, ok: i === q.a, he: q.h && q.h[i + 1] })));
  return { q: q.q, o: order.map((x) => x.text), a: order.findIndex((x) => x.ok), e: q.e,
    hs: q.h && q.h[0], ho: q.h && order.map((x) => x.he) };
}

let steps = [];   // each step: { section, passage?, questions[] }
let stepIdx = 0;
let stats = {};   // section -> { right, total }
let answered = 0, totalQ = 0, pending = 0;

function buildSteps(mode) {
  if (mode.startsWith("test:")) {
    const t = TESTS[+mode.slice(5)];
    return [
      { section: "words", questions: t.w1.map(prepare) },
      { section: "words", questions: t.w2.map(prepare) },
      { section: "reading", passage: t.p, questions: t.p.qs.map(prepare) },
      { section: "restatements", questions: t.r4.map(prepare) },
      { section: "restatements", questions: t.r5.map(prepare) },
      { section: "sentences", questions: t.s.map(prepare) },
    ];
  }
  if (mode === "full") {
    const words = pick(TESTS.flatMap((t) => [...t.w1, ...t.w2]), 8);
    const p = pick(READING, 1)[0];
    const shortR = [...RESTATEMENTS, ...TESTS.flatMap((t) => [...t.r, ...t.r2])];
    const longR = TESTS.flatMap((t, i) => LONG[i]);
    const [s1, s2, s3] = pick(shortR, 3);
    const [l1, l2, l3] = pick(longR, 3);
    const rest = [s1, s2, l1, l2, l3, s3];
    const sent = pick(SENTENCES_ALL, 4);
    return [
      { section: "words", questions: words.slice(0, 4).map(prepare) },
      { section: "words", questions: words.slice(4).map(prepare) },
      { section: "reading", passage: p, questions: shuffle(p.qs).map(prepare) },
      { section: "restatements", questions: rest.slice(0, 3).map(prepare) },
      { section: "restatements", questions: rest.slice(3).map(prepare) },
      { section: "sentences", questions: sent.map(prepare) },
    ];
  }
  const s = [];
  if (mode === "sentences")
    s.push({ section: "sentences", questions: pick(SENTENCES_ALL, 4).map(prepare) });
  if (mode === "full" || mode === "reading") {
    const p = pick(READING, 1)[0];
    s.push({ section: "reading", passage: p, questions: shuffle(p.qs).map(prepare) });
  }
  if (mode === "full" || mode === "restatements")
    s.push({ section: "restatements", questions: [
      ...pick([...RESTATEMENTS, ...TESTS.flatMap((t) => [...t.r, ...t.r2])], 2),
      ...pick(TESTS.flatMap((t, i) => LONG[i]), 1),
    ].map(prepare) });
  return s;
}

let currentMode = "";
function start(mode) {
  if (mode.startsWith("endless")) return startEndless(mode);
  currentMode = mode;
  steps = buildSteps(mode);
  stepIdx = 0;
  stats = {};
  answered = 0;
  totalQ = steps.reduce((n, st) => n + st.questions.length, 0);
  $("menu").classList.add("hidden");
  $("result").classList.add("hidden");
  $("quiz").classList.remove("hidden");
  $("progress").classList.remove("hidden");
  renderStep();
}

function updateProgress() {
  $("progress").innerHTML = `ענית על ${answered} מתוך ${totalQ}<div class="bar"><div style="width:${(answered / totalQ) * 100}%"></div></div>`;
}

function renderStep() {
  const st = steps[stepIdx];
  const root = $("quiz");
  root.innerHTML = "";
  updateProgress();
  pending = st.questions.length;

  const title = document.createElement("div");
  title.className = "section-title";
  title.textContent = `Part ${stepIdx + 1}: ${TITLES[st.section]}`;
  const dir = document.createElement("div");
  dir.className = "directions";
  dir.textContent = DIRECTIONS[st.section];
  root.append(title, dir);

  if (st.passage) {
    const { box, lineOf } = layoutPassage(st.passage.text);
    root.append(box);
    st.questions.forEach((q) => (q.q = q.q.replace(/\{L:([^}]+)\}/g, (_, w) => lineOf(w))));
  }

  st.questions.forEach((q, qi) => root.append(renderQuestion(st, q, qi)));

  const actions = document.createElement("div");
  actions.className = "actions";
  const next = document.createElement("button");
  next.className = "btn";
  next.id = "nextBtn";
  next.disabled = true;
  next.textContent = stepIdx === steps.length - 1 ? "Finish" : "Next Part";
  next.onclick = () => {
    if (stepIdx === steps.length - 1) return showResult();
    stepIdx++;
    renderStep();
    window.scrollTo(0, 0);
  };
  const quit = document.createElement("button");
  quit.className = "btn secondary";
  quit.textContent = "Menu";
  quit.onclick = backToMenu;
  actions.append(next, quit);
  root.append(actions);
}

// Hebrew translation of every answer choice (word / sentence completion sections only).
function translationList(q) {
  const ul = document.createElement("ul");
  ul.className = "vocab";
  q.o.forEach((opt, i) => {
    const li = document.createElement("li");
    if (i === q.a) li.className = "right";
    const parts = opt.split(" ... ").map((w) => (VOCAB[w] ? `${w} = ${VOCAB[w]}` : w));
    li.textContent = `${LETTERS[i]}. ${parts.join("  ...  ")}`;
    ul.append(li);
  });
  return ul;
}

// Wraps the passage into numbered lines (a number every 5 lines), like the printed exam.
const LINE_WIDTH = 64;
function layoutPassage(paragraphs) {
  const box = document.createElement("div");
  box.className = "passage";
  const lines = [];
  paragraphs.forEach((para, pi) => {
    const block = document.createElement("div");
    block.className = "para";
    let cur = "";
    const flush = () => {
      lines.push(cur);
      const n = lines.length;
      const row = document.createElement("div");
      row.className = "line";
      row.innerHTML = `<span class="num">${n % 5 === 0 ? n : ""}</span>`;
      const t = document.createElement("span");
      t.className = "txt";
      t.textContent = cur;
      row.append(t);
      block.append(row);
      cur = "";
    };
    para.split(" ").forEach((w) => {
      if (cur && (cur + " " + w).length > LINE_WIDTH) flush();
      cur = cur ? cur + " " + w : w;
    });
    if (cur) flush();
    box.append(block);
  });
  const lineOf = (word) => {
    const i = lines.findIndex((l) => l.toLowerCase().includes(word.toLowerCase()));
    return i < 0 ? "?" : i + 1;
  };
  return { box, lineOf };
}

// Full Hebrew translation of a restatement question: the sentence and each option. English key words are
// shown in parentheses inside the Hebrew so it is clear which translation belongs to which word.
function restatementTranslation(q) {
  const box = document.createElement("div");
  box.className = "he-box";
  const h = document.createElement("div");
  h.className = "he-head";
  h.textContent = "תרגום המשפט המקורי:";
  const s = document.createElement("div");
  s.className = "he-orig";
  s.textContent = q.hs;
  box.append(h, s);
  const ul = document.createElement("ul");
  ul.className = "he-opts";
  q.ho.forEach((t, i) => {
    const li = document.createElement("li");
    if (i === q.a) li.className = "right";
    li.textContent = `${LETTERS[i]}. ${t}`;
    ul.append(li);
  });
  box.append(ul);
  return box;
}

// onAnswer(ok, explanationEl) replaces the per-part bookkeeping (used by the endless game).
function renderQuestion(st, q, qi, onAnswer) {
  const box = document.createElement("div");
  box.className = "question";
  const txt = document.createElement("p");
  txt.className = "qtext";
  txt.innerHTML = `<span class="qnum">${qi + 1}.</span>`;
  txt.append(document.createTextNode(q.q));
  box.append(txt);

  const buttons = q.o.map((text, i) => {
    const b = document.createElement("button");
    b.className = "opt";
    b.innerHTML = `<span class="letter">${LETTERS[i]}.</span>`;
    b.append(document.createTextNode(text));
    return b;
  });

  buttons.forEach((b, i) => {
    b.onclick = () => {
      buttons.forEach((x) => (x.disabled = true));
      const ok = i === q.a;
      b.classList.add(ok ? "correct" : "wrong");
      buttons[q.a].classList.add("correct");
      const ex = document.createElement("div");
      ex.className = "explain " + (ok ? "ok" : "no");
      ex.innerHTML = `<b>${ok ? "✔ נכון!" : "✘ לא נכון – התשובה הנכונה: " + LETTERS[q.a]}</b>`;
      if (q.e) ex.append(document.createTextNode(q.e));
      if (st.section === "words" || st.section === "sentences") ex.append(translationList(q));
      if (st.section === "restatements" && q.hs) ex.append(restatementTranslation(q));
      box.append(ex);
      if (onAnswer) return onAnswer(ok, ex);

      const s =(stats[st.section] ||= { right: 0, total: 0 });
      s.total++;
      if (ok) s.right++;
      answered++;
      updateProgress();
      if (--pending === 0) $("nextBtn").disabled = false;
    };
    box.append(b);
  });
  return box;
}

function showResult() {
  $("quiz").classList.add("hidden");
  $("progress").classList.add("hidden");
  const r = $("result");
  r.classList.remove("hidden");
  const right = Object.values(stats).reduce((n, s) => n + s.right, 0);
  const est = estimateScore(right, totalQ);
  const rows = Object.entries(stats)
    .map(([k, s]) => `<div><span>${TITLES[k]}</span><b>${s.right}/${s.total}</b></div>`)
    .join("");
  r.innerHTML = `<h2>סיימת!</h2><div class="score">${est}</div>
    <div class="score-sub">ציון אמירנט משוער (50–150) · ${right} מתוך ${totalQ} תשובות נכונות</div>
    <div class="level">${levelNote(est)}</div>
    <div class="breakdown">${rows}</div>
    <p class="note">ההערכה היא קירוב ליניארי בלבד. ההמרה הרשמית של המרכז הארצי לבחינות אינה פומבית, וכל אוניברסיטה קובעת סף פטור משלה.</p>
    <div class="actions"><button class="btn" id="again">תרגול נוסף</button></div>`;
  $("again").onclick = backToMenu;
  if (currentMode.startsWith("test:")) saveScore(currentMode, right);
  window.scrollTo(0, 0);
}

// ---- Endless game: one random question at a time, running SCORE, never ends until the player quits ----
let game = null;   // { mode, pool, deck, last, score, streak, bestStreak, right, total }
const BASE_POINTS = 10, STREAK_BONUS = 2, MAX_BONUS_STEPS = 5;

function endlessPool(mode) {
  const pool = [];
  if (mode !== "endless:r")
    SENTENCES_ALL.forEach((q) => pool.push({ section: "sentences", q }));
  if (mode !== "endless:s")
    [...RESTATEMENTS, ...TESTS.flatMap((t, i) => [...t.r, ...t.r2, ...LONG[i]])]
      .forEach((q) => pool.push({ section: "restatements", q }));
  return pool;
}

function loadEndlessBest(mode) {
  try { return (JSON.parse(localStorage.getItem("amirnetEndlessBest") || "{}"))[mode] || 0; } catch (e) { return 0; }
}
function saveEndlessBest(mode, score) {
  try {
    const all = JSON.parse(localStorage.getItem("amirnetEndlessBest") || "{}");
    if (score > (all[mode] || 0)) { all[mode] = score; localStorage.setItem("amirnetEndlessBest", JSON.stringify(all)); }
  } catch (e) {}
}

function startEndless(mode) {
  game = { mode, pool: endlessPool(mode), deck: [], last: null, score: 0, streak: 0, bestStreak: 0, right: 0, total: 0,
    best: loadEndlessBest(mode) };
  currentMode = mode;
  $("menu").classList.add("hidden");
  $("result").classList.add("hidden");
  $("progress").classList.add("hidden");
  $("quiz").classList.remove("hidden");
  $("hud").classList.remove("hidden");
  renderHud();
  renderEndlessQuestion();
}

function renderHud(bump) {
  const g = game;
  const acc = g.total ? Math.round((100 * g.right) / g.total) + "%" : "–";
  $("hud").innerHTML = `
    <div class="hud-main"><span class="hud-label">SCORE</span><span class="hud-score${bump ? " bump" : ""}">${g.score}</span></div>
    <div class="hud-item"><span class="hud-label">STREAK</span><b>${g.streak ? "🔥 " + g.streak : "0"}</b></div>
    <div class="hud-item"><span class="hud-label">CORRECT</span><b>${g.right}/${g.total}${g.total ? " · " + acc : ""}</b></div>
    <div class="hud-item"><span class="hud-label">BEST</span><b>${Math.max(g.best, g.score)}</b></div>`;
}

// Shuffled deck: no question repeats until the whole pool has been seen, then it reshuffles.
function drawEndless() {
  if (!game.deck.length) {
    game.deck = shuffle(game.pool);
    const n = game.deck.length;
    if (n > 1 && game.deck[n - 1] === game.last) [game.deck[0], game.deck[n - 1]] = [game.deck[n - 1], game.deck[0]];
  }
  game.last = game.deck.pop();
  return game.last;
}

function renderEndlessQuestion() {
  const item = drawEndless();
  const root = $("quiz");
  root.innerHTML = "";
  const title = document.createElement("div");
  title.className = "section-title";
  title.textContent = TITLES[item.section];
  const dir = document.createElement("div");
  dir.className = "directions";
  dir.textContent = DIRECTIONS[item.section];
  root.append(title, dir);

  const st = { section: item.section };
  root.append(renderQuestion(st, prepare(item.q), game.total, (ok, ex) => {
    let pts = 0;
    game.total++;
    if (ok) {
      pts = BASE_POINTS + STREAK_BONUS * Math.min(game.streak, MAX_BONUS_STEPS);
      game.streak++;
      game.right++;
      game.score += pts;
      game.bestStreak = Math.max(game.bestStreak, game.streak);
      saveEndlessBest(game.mode, game.score);
      ex.querySelector("b").textContent += `  (+${pts})`;
    } else {
      game.streak = 0;
    }
    renderHud(ok);
    const next = $("nextBtn");
    next.disabled = false;
    next.focus({ preventScroll: true });
    next.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }));

  const actions = document.createElement("div");
  actions.className = "actions";
  const next = document.createElement("button");
  next.className = "btn";
  next.id = "nextBtn";
  next.disabled = true;
  next.textContent = "Continue ▶";
  next.onclick = () => { renderEndlessQuestion(); window.scrollTo(0, 0); };
  const quit = document.createElement("button");
  quit.className = "btn secondary";
  quit.textContent = "סיים משחק";
  quit.onclick = showEndlessResult;
  actions.append(next, quit);
  root.append(actions);
}

function showEndlessResult() {
  const g = game;
  saveEndlessBest(g.mode, g.score);
  const record = g.score > 0 && g.score > g.best;
  $("quiz").classList.add("hidden");
  $("hud").classList.add("hidden");
  const r = $("result");
  r.classList.remove("hidden");
  const acc = g.total ? Math.round((100 * g.right) / g.total) : 0;
  r.innerHTML = `<h2>${record ? "🏆 שיא חדש!" : "סוף המשחק"}</h2><div class="score">${g.score}</div>
    <div class="score-sub">SCORE · ${g.right} מתוך ${g.total} תשובות נכונות (${acc}%)</div>
    <div class="level">רצף נכון ארוך ביותר: ${g.bestStreak} · שיא קודם: ${g.best}</div>
    <div class="actions"><button class="btn" id="again">שחק שוב</button><button class="btn secondary" id="toMenu">תפריט</button></div>`;
  const mode = g.mode;
  $("again").onclick = () => startEndless(mode);
  $("toMenu").onclick = backToMenu;
  game = null;
  window.scrollTo(0, 0);
}

// Keyboard: A–D / 1–4 pick an answer, Enter or Space continues.
document.addEventListener("keydown", (e) => {
  if (!game || $("quiz").classList.contains("hidden") || e.ctrlKey || e.metaKey || e.altKey) return;
  const k = e.key.toLowerCase();
  const idx = "abcd".indexOf(k) >= 0 && k.length === 1 ? "abcd".indexOf(k) : "1234".indexOf(k) >= 0 && k.length === 1 ? "1234".indexOf(k) : -1;
  const opts = document.querySelectorAll("#quiz .opt");
  if (idx >= 0) {
    if (opts[idx] && !opts[idx].disabled) opts[idx].click();
  } else if ((k === "enter" || k === " ") && !(e.target.closest && e.target.closest("button"))) {
    const next = $("nextBtn");
    if (next && !next.disabled) { e.preventDefault(); next.click(); }
  }
});

// Best score per test, remembered in the browser (optional – ignored if storage is blocked).
function saveScore(mode, right) {
  try {
    const all = JSON.parse(localStorage.getItem("amirnetScores2") || "{}");
    all[mode] = Math.max(all[mode] || 0, right);
    localStorage.setItem("amirnetScores2", JSON.stringify(all));
  } catch (e) {}
}
function loadScores() {
  try { return JSON.parse(localStorage.getItem("amirnetScores2") || "{}"); } catch (e) { return {}; }
}

function renderTestButtons() {
  const scores = loadScores();
  $("testsGrid").innerHTML = "";
  TESTS.forEach((t, i) => {
    const b = document.createElement("button");
    const best = scores["test:" + i];
    b.className = "test-btn" + (best !== undefined ? " done" : "");
    b.innerHTML = `<b>${t.name}</b><small>${best !== undefined ? "הציון הטוב ביותר: " + estimateScore(best, 23) : "6 פרקים · 23 שאלות"}</small>`;
    b.onclick = () => start("test:" + i);
    $("testsGrid").append(b);
  });
}

function backToMenu() {
  game = null;
  $("hud").classList.add("hidden");
  $("quiz").classList.add("hidden");
  $("result").classList.add("hidden");
  $("progress").classList.add("hidden");
  $("menu").classList.remove("hidden");
  renderTestButtons();
  window.scrollTo(0, 0);
}

document.querySelectorAll(".card").forEach((c) => (c.onclick = () => start(c.dataset.mode)));
renderTestButtons();
