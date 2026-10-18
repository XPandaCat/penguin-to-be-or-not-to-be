const questions = [
  {
    title: "The Token Question",
    location: "ICEBOUND OUTPOST",
    kicker: "ROUND 01 / 03",
    question: "What is the most precious matter in the universe that must be spent and not spent at the same time?",
    answers: [
      "Zareen’s patience",
      "One token to rule them all, one token to find them, one token to bring them all and in the Harness bind them",
      "Hours spent in AI4IT Board 1, Board 2, Board 3 .."
    ],
    correct: 1,
    success: "A disturbing grasp of token economics. The gate is open.",
    failureTitle: "The token has been wasted.",
    failureCopy: "The answer was B. Somewhere, a usage dashboard just refreshed in disappointment.",
    failBoard: "LOSER"
  },
  {
    title: "The Wizard’s Interrogation",
    location: "THE WIZARD'S CHECKPOINT",
    kicker: "ROUND 02 / 03",
    question: "What is the difference between GItHub Copilot, Copilot Premium and Copilot",
    answers: [
      "Le Pere, Le Fils et le St Esprit",
      "Ask Copilot",
      "If you don’t know this by now, you will never never never know this .."
    ],
    correct: 1,
    success: "The wizard accepts your answer. Thou shalt not merge!",
    failureTitle: "Thou shalt not merge!",
    failureCopy: "The wizard has spoken. The iceberg has room for two, and you are not invited.",
    failBoard: "OH NO"
  },
  {
    title: "The Final Boss",
    location: "THE BOSS'S ICE FORTRESS",
    kicker: "FINAL ROUND / 03",
    question: "FINAL ROUND - Pick the most legendary battle :",
    answers: [
      "Lio vs Xavier",
      "Jean CLAUDE Van Damme vs Chuck GPT Norris",
      "Ageas Portugal vs AG"
    ],
    correct: 0,
    success: "Legendary choice. The boss has been defeated by the sheer force of your judgement.",
    failureTitle: "A legendary miscalculation.",
    failureCopy: "Wrong battle. Three penguins have been issued party hats and an emergency meeting has been scheduled.",
    failBoard: "OOPS"
  }
];

const $ = id => document.getElementById(id);
const titleScreen = $("title-screen"), gameScreen = $("game-screen"), resultScreen = $("result-screen");
let current = 0, locked = false;

function showScreen(screen) {
  [titleScreen, gameScreen, resultScreen].forEach(s => s.classList.add("hidden"));
  screen.classList.remove("hidden");
  window.scrollTo({top:0,behavior:"smooth"});
}
function startGame() {
  current = 0;
  locked = false;
  resultScreen.classList.remove("success");
  showScreen(gameScreen);
  renderQuestion();
}
function renderQuestion() {
  locked = false;
  const q = questions[current];
  $("round-kicker").textContent = q.kicker;
  $("scene-title").textContent = q.title;
  $("progress-label").textContent = `QUESTION ${current + 1} OF 3`;
  $("progress-fill").style.width = `${((current + 1) / 3) * 100}%`;
  $("challenge-number").textContent = String(current + 1).padStart(2,"0");
  $("question-text").textContent = q.question;
  $("scene-location").textContent = q.location;
  $("feedback").className = "feedback hidden";
  $("feedback").textContent = "";
  $("continue-button").classList.add("hidden");
  $("answers").innerHTML = "";
  renderCharacter(current);
  q.answers.forEach((answer, i) => {
    const button = document.createElement("button");
    button.className = "answer";
    button.innerHTML = `<span class="answer-letter">${String.fromCharCode(65+i)}</span><span></span>`;
    button.lastElementChild.textContent = answer;
    button.addEventListener("click", () => chooseAnswer(i, button));
    $("answers").appendChild(button);
  });
}
function renderCharacter(index) {
  const scene = $("character-scene");
  scene.innerHTML = "";
  scene.style.left = index === 2 ? "50%" : index === 1 ? "48%" : "50%";
  if (index === 0) {
    scene.innerHTML = `<div class="penguin character"><div class="p-head"><i></i><i></i><b></b></div><div class="p-body"><span></span></div><div class="p-foot one"></div><div class="p-foot two"></div></div><div class="character-caption">THE CANDIDATE</div>`;
  } else if (index === 1) {
    scene.innerHTML = `<div class="wizard"><div class="wiz-head"></div><div class="wiz-hair"></div><div class="wiz-glasses"></div><div class="wiz-beard"></div><div class="wiz-robe"></div><div class="staff"></div></div><div class="character-caption" style="color:#fff">THE WIZARD</div>`;
  } else {
    scene.innerHTML = `<div class="boss"><div class="boss-head"></div><div class="boss-hair"></div><div class="boss-eyes"></div><div class="boss-stubble"></div><div class="boss-shirt"></div><div class="boss-tie"></div><div class="boss-arms"></div><div class="boss-legs"></div></div><div class="character-caption" style="color:#fff">THE BOSS</div>`;
  }
}
function chooseAnswer(index, button) {
  if (locked) return;
  locked = true;
  const q = questions[current];
  [...$("answers").querySelectorAll("button")].forEach((b,i) => {
    b.disabled = true;
    if (i === q.correct) b.classList.add("correct");
  });
  const feedback = $("feedback");
  feedback.classList.remove("hidden");
  if (index === q.correct) {
    button.classList.add("correct");
    feedback.classList.add("success");
    feedback.textContent = q.success;
    $("continue-button").classList.remove("hidden");
    $("continue-button").innerHTML = current === 2 ? 'CLAIM YOUR LEGEND <span aria-hidden="true">→</span>' : 'ADVANCE <span aria-hidden="true">→</span>';
  } else {
    button.classList.add("wrong");
    feedback.classList.add("failure");
    feedback.textContent = "Incorrect. The correct answer is " + String.fromCharCode(65+q.correct) + ". " + q.failureCopy;
    setTimeout(() => endGame(false), 1500);
  }
}
function endGame(won) {
  showScreen(resultScreen);
  resultScreen.classList.toggle("success", won);
  $("result-emblem").textContent = won ? "✓" : "×";
  $("result-kicker").textContent = won ? "QUEST COMPLETE" : "QUEST TERMINATED";
  $("result-title").textContent = won ? "You have survived the frozen enterprise." : questions[current].failureTitle;
  $("result-copy").textContent = won ? "You have answered all three questions correctly. Your token survives another day. The harness trembles." : questions[current].failureCopy;
  $("retry-button").innerHTML = won ? 'PLAY AGAIN <span aria-hidden="true">↻</span>' : 'RETRY FROM THE BEGINNING <span aria-hidden="true">↻</span>';
  drawResultScene(won);
}
function drawResultScene(won) {
  const scene = $("result-scene");
  scene.innerHTML = "";
  const add = (cls, left, bottom, hat=false) => {
    const p = document.createElement("div");
    p.className = "penguin-mini";
    p.style.left = left;
    p.style.bottom = bottom;
    if (hat) { const h = document.createElement("span"); h.className = "hat"; p.appendChild(h); }
    scene.appendChild(p);
  };
  if (won) {
    scene.innerHTML = `<div style="position:absolute;left:50%;top:25px;transform:translateX(-50%);font:900 22px 'Barlow Condensed',sans-serif;letter-spacing:.12em;color:#e7ffff;text-shadow:0 0 18px #7af0ed">THE TOKEN ENDURES</div><div style="position:absolute;left:50%;top:65px;transform:translateX(-50%);color:#f5c76a;font-size:30px">♛</div>`;
    add("penguin-mini","calc(50% - 23px)","22px");
  } else if (current === 0) {
    scene.innerHTML = `<div class="board" style="left:50%;top:20px;transform:translateX(-50%) rotate(-4deg)">LOSER</div>`;
    add("penguin-mini","calc(50% - 22px)","22px");
  } else if (current === 1) {
    scene.innerHTML = `<div class="board" style="left:50%;top:20px;transform:translateX(-50%) rotate(3deg)">OH NO</div><div class="iceberg-mini"></div>`;
    add("penguin-mini","36%","34px"); add("penguin-mini","57%","30px");
  } else {
    scene.innerHTML = `<div class="board" style="left:50%;top:12px;transform:translateX(-50%) rotate(-2deg)">TEAM-BUILDING</div>`;
    add("penguin-mini","23%","24px",true); add("penguin-mini","47%","24px",true); add("penguin-mini","70%","24px",true);
  }
}
$("start-button").addEventListener("click", startGame);
$("retry-button").addEventListener("click", startGame);
$("continue-button").addEventListener("click", () => {
  if (current < questions.length - 1) { current++; renderQuestion(); }
  else endGame(true);
});
if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
  window.addEventListener("load", () => navigator.serviceWorker.register("./service-worker.js").catch(() => {}));
}
