import {
  calculatePercentage,
  isCorrectAnswer,
  formatScore
} from "../src/utils/scoreUtils.js";

describe("scoreUtils", () => {
  test("calculates percentage correctly", () => {
    expect(calculatePercentage(15, 30)).toBe(50);
    expect(calculatePercentage(3, 10)).toBe(30);
  });

  test("checks correct answer", () => {
    expect(isCorrectAnswer("A", "A")).toBe(true);
    expect(isCorrectAnswer("A", "B")).toBe(false);
  });

  test("formats score text", () => {
    expect(formatScore(5, 10)).toBe("Score: 5 / 10");
  });
});
