import React from "react";

import { NextQuestionContainer, Paragraph } from "./styles";
import { Button } from "../shared";

export default function ViewNextQuestion({
  isCorrectAnswer,
  isLastQuestion,
  viewResult,
  handleNextQuestion,
}) {
  return (
    <NextQuestionContainer>
      {isCorrectAnswer ? (
        <Paragraph size="2rem" data-testid="response">
          Correct!
        </Paragraph>
      ) : (
        <Paragraph size="2rem" data-testid="response">
          Sorry!
        </Paragraph>
      )}
      {isLastQuestion ? (
        <Button onClick={viewResult}>View Result</Button>
      ) : (
        <Button onClick={handleNextQuestion} data-testid="next-question">
          Next Question
        </Button>
      )}
    </NextQuestionContainer>
  );
}
