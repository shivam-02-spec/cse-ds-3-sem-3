const questions = [
  {
    question: "What does HTML stand for?",
    options: [
      "HyperText Markup Language",
      "HighText Machine Language",
      "Hyperlink and Text Management Language",
      "Home Tool Markup Language"
    ],
    answer: 0
  },
  {
    question: "Which HTML element is used for the largest heading?",
    options: ["<heading>", "<h6>", "<h1>", "<head>"],
    answer: 2
  },
  {
    question: "Which attribute provides alternative text for an image?",
    options: ["title", "alt", "src", "description"],
    answer: 1
  },
  {
    question: "Which CSS property changes the text color?",
    options: ["font-style", "text-color", "color", "foreground"],
    answer: 2
  },
  {
    question: "Which selector targets an element with id=\"menu\"?",
    options: [".menu", "#menu", "*menu", "menu"],
    answer: 1
  },
  {
    question: "Which CSS layout system is designed for arranging items in one dimension?",
    options: ["Flexbox", "Float", "Position", "Table"],
    answer: 0
  },
  {
    question: "Which keyword declares a block-scoped variable that can be reassigned?",
    options: ["const", "let", "static", "varblock"],
    answer: 1
  },
  {
    question: "Which method adds an item to the end of a JavaScript array?",
    options: ["append()", "add()", "push()", "insert()"],
    answer: 2
  },
  {
    question: "Which operator checks both value and type equality?",
    options: ["=", "==", "===", "!="],
    answer: 2
  }
];

const loginPage = document.getElementById("loginPage");
const quizPage = document.getElementById("quizPage");
const resultPage = document.getElementById("resultPage");
const loginForm = document.getElementById("loginForm");
const questionBox = document.getElementById("questionBox");
const questionCount = document.getElementById("questionCount");
const timer = document.getElementById("timer");
const progressTrack = document.querySelector(".progress-track");
const progressBar = document.getElementById("progressBar");
const nextButton = document.getElementById("nextBtn");

let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;
let timeLeft = 60;
let timerInterval;
let quizFinished = false;

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  startQuiz();
});
nextButton.addEventListener("click", nextQuestion);
document.getElementById("playAgainBtn").addEventListener("click", () => {
  clearInterval(timerInterval);
  loginForm.reset();
  resultPage.classList.add("hidden");
  loginPage.classList.remove("hidden");
  document.getElementById("name").focus();
});

function startQuiz() {
  currentQuestion = 0;
  score = 0;
  selectedAnswer = null;
  timeLeft = 60;
  quizFinished = false;
  loginPage.classList.add("hidden");
  quizPage.classList.remove("hidden");
  renderQuestion();
  updateTimer();
  timerInterval = window.setInterval(() => {
    timeLeft -= 1;
    updateTimer();
    if (timeLeft <= 0) {
      finishQuiz();
    }
  }, 1000);
}

function renderQuestion() {
  const question = questions[currentQuestion];
  selectedAnswer = null;
  questionCount.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
  progressTrack.setAttribute("aria-valuenow", String(currentQuestion));
  progressBar.style.width = `${(currentQuestion / questions.length) * 100}%`;
  nextButton.disabled = true;
  nextButton.textContent = currentQuestion === questions.length - 1 ? "See results" : "Next question";

  const prompt = document.createElement("h2");
  prompt.className = "question-text";
  prompt.textContent = question.question;

  const options = document.createElement("div");
  options.className = "options";
  question.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "option";
    button.textContent = option;
    button.setAttribute("aria-pressed", "false");
    button.addEventListener("click", () => selectOption(index, options));
    options.appendChild(button);
  });

  questionBox.replaceChildren(prompt, options);
}

function selectOption(index, options) {
  selectedAnswer = index;
  options.querySelectorAll(".option").forEach((option, optionIndex) => {
    option.setAttribute("aria-pressed", String(optionIndex === index));
  });
  nextButton.disabled = false;
}

function nextQuestion() {
  if (selectedAnswer === null || quizFinished) {
    return;
  }

  if (selectedAnswer === questions[currentQuestion].answer) {
    score += 1;
  }

  currentQuestion += 1;
  if (currentQuestion === questions.length) {
    finishQuiz();
    return;
  }
  renderQuestion();
}

function updateTimer() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timer.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  timer.classList.toggle("urgent", timeLeft <= 10);
}

function finishQuiz() {
  if (quizFinished) {
    return;
  }

  quizFinished = true;
  clearInterval(timerInterval);
  quizPage.classList.add("hidden");
  resultPage.classList.remove("hidden");
  progressTrack.setAttribute("aria-valuenow", String(questions.length));
  progressBar.style.width = "100%";

  const name = document.getElementById("name").value.trim();
  const roll = document.getElementById("rollno").value.trim();
  document.getElementById("studentName").textContent = `${name} · Roll number: ${roll}`;
  document.getElementById("score").textContent = `${score} / ${questions.length}`;
  document.getElementById("resultMessage").textContent = score === questions.length
    ? "Perfect score! Excellent work."
    : "Thanks for playing. Give it another try to improve your score.";
}
