import { questions } from "./data/questions.js";
import { 
    calculatePercentage,
    isCorrectAnswer,
    formatScore
 } from "./utils/scoreUtils.js";

export const quizState = {
  questionCount: 0,
  questionNumb: 0,
  userScore: 0,
  timer: null,
  timeLeft: 15 * 60
};

export const escapeHTML = str =>
  String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

/*Alternate Approach
export const escapeHTML = (value) => {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(String(value)));
  return div.innerHTML;
};
*/

export function showQuestions(index, optionList, questionText) {
  const q = questions[index];
  if (!q) return;

  questionText.textContent = `${q.numb}. ${q.question}`;

  optionList.innerHTML = q.options
    .map(
      opt => `<div class="option"><span>${escapeHTML(opt)}</span></div>`
    )
    .join("");

  [...optionList.children].forEach(option =>
    option.addEventListener("click", () =>
      optionSelected(option, optionList)
    )
  );
}

export function optionSelected(answer, optionList) {
  const userAnswer = answer.textContent;
  const correctAnswer = questions[quizState.questionCount].answer;

  if (isCorrectAnswer(userAnswer, correctAnswer)) {
    answer.classList.add("correct");
    quizState.userScore++;
  } else {
    answer.classList.add("incorrect");
    [...optionList.children].forEach(opt => {
      if (opt.textContent === correctAnswer) {
        opt.classList.add("correct");
      }
    });
  }

  [...optionList.children].forEach(opt =>
    opt.classList.add("disabled")
  );

  document.querySelector(".header-score").textContent =
    formatScore(quizState.userScore, questions.length);

  document.querySelector(".next-btn").classList.add("active");
}

export function showResultBox(quizBox, resultBox) {
  clearInterval(quizState.timer);

  quizBox.classList.remove("active");
  resultBox.classList.add("active");

  const percent = calculatePercentage(
    quizState.userScore,
    questions.length
  );

  document.querySelector(".score-text").textContent =
    `Your Score ${quizState.userScore} out of ${questions.length}`;

  document.querySelector(".progress-value").textContent = `${percent}%`;
  document.querySelector(".circular-progress").style.background =
    `conic-gradient(#ff03c0 ${percent * 3.6}deg, rgba(255,255,255,.1) 0deg)`;
}

export function startTimer(onTimeout, durationSeconds = 15 * 60) {
  const timerElement = document.querySelector(".quiz-timer");

  clearInterval(quizState.timer);
  quizState.timeLeft = durationSeconds;

  quizState.timer = setInterval(() => {
    quizState.timeLeft--;

    if (quizState.timeLeft <= 0) {
      clearInterval(quizState.timer);
      onTimeout();
      return;
    }

    const minutes = Math.floor(quizState.timeLeft / 60);
    const seconds = quizState.timeLeft % 60;

    if (timerElement) {
      timerElement.textContent =
        `⏱️ ${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

      if (quizState.timeLeft <= 60) {
        timerElement.classList.add("warning");
      }
    }
  }, 1000);
}


export function questionCounter() {
  const questionTotal = document.querySelector(".question-total");
  questionTotal.textContent =
    `${questions[quizState.questionCount].numb} of ${questions.length}`;
}

export function headerScore() {
  document.querySelector(".header-score").textContent =
    formatScore(quizState.userScore, questions.length);
}