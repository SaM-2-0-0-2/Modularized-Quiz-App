import {
  quizState,
  escapeHTML,
  startTimer
} from "../src/quiz.js";

import { jest } from "@jest/globals";




beforeEach(() => {
  document.body.innerHTML = `
    <span class="quiz-timer"></span>
    <div class="quiz-box active"></div>
    <div class="result-box"></div>
  `;
});

test("escapeHTML prevents XSS", () => {
  expect(escapeHTML("<script>")).toBe("&lt;script&gt;");
});

jest.useFakeTimers();

test("timer triggers timeout callback", () => {
  document.body.innerHTML = `<div class="quiz-timer"></div>`;

  const timeoutFn = jest.fn();

  startTimer(timeoutFn, 1); // 1 second for test
  jest.advanceTimersByTime(1000);

  expect(timeoutFn).toHaveBeenCalledTimes(1);
});