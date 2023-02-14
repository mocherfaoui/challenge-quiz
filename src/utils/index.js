export const getQuestions = (questions) => {
  const parsedQuestions = questions.map((item) => ({
    category: decodeURIComponent(item.category),
    difficulty: item.difficulty,
    question: decodeURIComponent(item.question),
    correct_answer: decodeURIComponent(item.correct_answer),
    incorrect_answers: item.incorrect_answers.map((answer) =>
      decodeURIComponent(answer)
    ),
  }));
  return parsedQuestions;
};

export const getRandomEvenNumber = (low, high) => {
  const randomNumber = Math.floor(Math.random() * (high - low + 1) + low);
  return low + 2 * Math.floor((randomNumber - low) / 2);
};

export const getRating = (difficulty) => {
  if (!["easy", "medium", "hard"].includes(difficulty)) {
    throw new Error(
      "Couldn't find this type of diffulty, try a value from: easy - medium - hard"
    );
  }

  let difficultyNumber;
  switch (difficulty) {
    case "easy":
      difficultyNumber = 1;
      break;
    case "medium":
      difficultyNumber = 2;
      break;
    case "hard":
      difficultyNumber = 3;
      break;
    default:
      difficultyNumber = 0;
      break;
  }
  return difficultyNumber;
};

export const getProgressBarValue = (currentQuestionNumber, totalQuestions) => {
  return (currentQuestionNumber + 1) * (100 / totalQuestions);
};

export const getScore = (correctAnswers, wrongAnswers, totalQuestions) => {
  const maxScore = Math.round(
    ((totalQuestions - wrongAnswers) / totalQuestions) * 100
  );
  const currentScore =
    Math.round((correctAnswers / (correctAnswers + wrongAnswers)) * 100) || 0;
  const lowestScore = Math.round((correctAnswers / totalQuestions) * 100);

  return { maxScore, currentScore, lowestScore };
};

export const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
