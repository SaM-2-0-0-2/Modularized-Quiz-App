export const calculatePercentage = (score, total) =>
    Number(((score / total) * 100).toFixed(2));

export const isCorrectAnswer = (userAnswer, correctAnswer) =>
    userAnswer === correctAnswer;

export const formatScore = (score, total) =>
    `Score: ${score} / ${total}`;