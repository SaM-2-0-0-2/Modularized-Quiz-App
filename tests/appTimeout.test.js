import { showResultBox } from "../src/quiz.js";

test("timeout hides quiz and shows result", () => {
  document.body.innerHTML = `
    <div class="quiz-box active"></div>
    <div class="result-box"></div>
    <span class="score-text"></span>
    <span class="progress-value"></span>
    <div class="circular-progress"></div>
  `;

  const quizBox = document.querySelector(".quiz-box");
  const resultBox = document.querySelector(".result-box");

  showResultBox(quizBox, resultBox);

  expect(quizBox.classList.contains("active")).toBe(false);
  expect(resultBox.classList.contains("active")).toBe(true);
});
