const getMaxScore = (wrongAnswers, totalQuestions) => {
  return (
    Math.round(((totalQuestions - wrongAnswers) / totalQuestions) * 100) || 0
  );
};

const getCurrentScore = (correctAnswers, wrongAnswers) => {
  return Math.round((correctAnswers / (correctAnswers + wrongAnswers)) * 100);
};

const getLowestScore = (correctAnswers, totalQuestions) => {
  return Math.round((correctAnswers / totalQuestions) * 100);
};

export const getScore = (correctAnswers, wrongAnswers, totalQuestions) => {
  const maxScore = getMaxScore(wrongAnswers, totalQuestions);
  const currentScore = getCurrentScore(correctAnswers, wrongAnswers);
  const lowestScore = getLowestScore(correctAnswers, totalQuestions);

  return { maxScore, currentScore, lowestScore };
};
