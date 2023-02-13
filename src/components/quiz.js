import React, { useMemo, useState } from "react";
import styled from "styled-components";

import Question from "./question";
import Result from "./result";

import questions from "../questions.json";
import { getQuestions } from "../utils";

export default function Quiz() {
  const parsedQuestions = useMemo(() => getQuestions(questions), []);
  const [viewResult, setViewResult] = useState(false);

  const [progress, setProgress] = useState({
    currentQuestion: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });

  return (
    <Container>
      {viewResult ? (
        <Result
          correctAnswers={progress.correctAnswers}
          wrongAnswers={progress.wrongAnswers}
          totalQuestions={parsedQuestions.length}
        />
      ) : (
        <Question
          progress={progress}
          setProgress={setProgress}
          question={parsedQuestions[progress.currentQuestion]}
          totalQuestions={parsedQuestions.length}
          viewResult={() => setViewResult(true)}
        />
      )}
    </Container>
  );
}

const Container = styled.div`
  padding: 2rem;
  @media (min-width: 768px) {
    padding: 4rem;
  }
  width: 100%;
  position: relative;
`;
