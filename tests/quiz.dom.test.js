import {
    showQuestions,
    optionSelected,
    showResultBox,
    quizState,
    escapeHTML
} from "../src/quiz.js";

import { questions } from "../src/data/questions.js";

describe("Quiz functionality tests", () => {

    // ---------- showQuestions ----------
    test("showQuestions displays question and options", () => {
        document.body.innerHTML = `
      <h2 class="question-text"></h2>
      <div class="option-list"></div>
    `;

        const questionText = document.querySelector(".question-text");
        const optionList = document.querySelector(".option-list");

        showQuestions(0, optionList, questionText);

        expect(questionText.textContent)
            .toContain(questions[0].question);

        expect(optionList.children.length).toBe(4);
    });

    // ---------- optionSelected ----------
    test("optionSelected marks wrong and correct answers", () => {
        quizState.questionCount = 0;
        quizState.userScore = 0;

        const correctAnswer = questions[quizState.questionCount].answer;

        document.body.innerHTML = `
            <div class="option-list">
            <div class="option">WRONG</div>
            <div class="option">${escapeHTML(correctAnswer)}</div>
            <div class="option">ALSO WRONG</div>
            <div class="option">WRONG AGAIN</div>
            </div>
            <span class="header-score"></span>
            <button class="next-btn"></button>
        `;

        const optionList = document.querySelector(".option-list");
        const wrongOption = optionList.children[0];
        const correctOption = optionList.children[1];

        optionSelected(wrongOption, optionList);

        // wrong option marked
        expect(wrongOption.classList.contains("incorrect")).toBe(true);

        // correct option highlighted
        expect(correctOption.classList.contains("correct")).toBe(true);
    });


    // ---------- showResultBox ----------
    test("showResultBox shows result screen", () => {
        document.body.innerHTML = `
      <div class="quiz-box active"></div>
      <div class="result-box"></div>
      <span class="score-text"></span>
      <div class="circular-progress"></div>
      <span class="progress-value"></span>
    `;

        quizState.userScore = 1;

        const quizBox = document.querySelector(".quiz-box");
        const resultBox = document.querySelector(".result-box");

        showResultBox(quizBox, resultBox);

        expect(quizBox.classList.contains("active")).toBe(false);
        expect(resultBox.classList.contains("active")).toBe(true);
    });

});
