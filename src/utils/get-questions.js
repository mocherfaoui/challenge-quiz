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
