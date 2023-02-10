export const getMaxScore = (wrongAnswers, totalQuestions) => {
  return Math.round(((totalQuestions - wrongAnswers) / totalQuestions) * 100);
};

export const getCurrentScore = (correctAnswers, wrongAnswers) => {
  return Math.round((correctAnswers / (correctAnswers + wrongAnswers)) * 100);
};

export const getLowestScore = (correctAnswers, totalQuestions) => {
  return Math.round((correctAnswers / totalQuestions) * 100);
};
