import {
  quizState,
  showQuestions,
  showResultBox,
  startTimer,
  questionCounter,
  headerScore
} from "./quiz.js";

import { questions } from "./data/questions.js";

const $ = selector => document.querySelector(selector);

const startBtn = $(".start-btn");
const popupInfo = $(".popup-info");
const exitBtn = $(".exit-btn");
const main = $(".main");
const continueBtn = $(".continue-btn");
const quizSection = $(".quiz-section");
const nextBtn = document.querySelector(".next-btn");
const optionList = document.querySelector(".option-list");
const questionText = document.querySelector(".question-text");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");
const tryAgainBtn = document.querySelector(".tryAgain-btn");
const goHomeBtn = document.querySelector(".goHome-btn");

startBtn.onclick = () => {
  popupInfo.classList.add("active");
  main.classList.add("active");
};

exitBtn.onclick = () => {
  popupInfo.classList.remove("active");
  main.classList.remove("active");
};

continueBtn.onclick = () => {
  quizSection.classList.add("active");
  popupInfo.classList.remove("active");
  main.classList.remove("active");
  quizBox.classList.add("active");

  quizState.questionCount = 0;
  quizState.userScore = 0;

  showQuestions(0, optionList, questionText);
  questionCounter();
  headerScore();

  startTimer(() => {
    quizBox.classList.remove("active");
    showResultBox(quizBox, resultBox);
  });

  startTimer(submitQuizDueToTimeout);
};


nextBtn.onclick = () => {
  if (quizState.questionCount < questions.length - 1) {
    quizState.questionCount++;
    showQuestions(quizState.questionCount, optionList, questionText);
    questionCounter();

    if (quizState.questionCount === questions.length - 1) {
      nextBtn.textContent = "Finish";
    }
  } else {
    showResultBox(quizBox, resultBox);
  }

  nextBtn.classList.remove("active");
};

function submitQuizDueToTimeout() {
  quizBox.classList.remove("active");
  showResultBox(quizBox, resultBox);
}

goHomeBtn.onclick = () => {
  clearInterval(quizState.timer);

  quizSection.classList.remove("active");
  quizBox.classList.remove("active");
  resultBox.classList.remove("active");

  quizState.questionCount = 0;
  quizState.userScore = 0;
  quizState.timeLeft = 60;

  document.querySelector(".next-btn").textContent = "Next";
};

tryAgainBtn.onclick = () => {
  clearInterval(quizState.timer);

  quizBox.classList.add("active");
  resultBox.classList.remove("active");

  quizState.questionCount = 0;
  quizState.userScore = 0;

  showQuestions(0, optionList, questionText);
  questionCounter();
  headerScore();

  startTimer(submitQuizDueToTimeout);
};


