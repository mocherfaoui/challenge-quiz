import React, { useMemo, useState } from "react";

import Question from "./question";

import questions from "../questions.json";
import { getQuestions } from "../utils";

export default function Quiz() {
  const parsedQuestions = useMemo(() => getQuestions(questions), []);

  const [progress, setProgress] = useState({
    currentQuestion: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });

  return (
    <Question
      progress={progress}
      setProgress={setProgress}
      question={parsedQuestions[progress.currentQuestion]}
      totalQuestions={parsedQuestions.length}
    />
  );
}
