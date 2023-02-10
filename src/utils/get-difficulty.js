export const getDifficulty = (difficulty) => {
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
