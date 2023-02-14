import React from "react";

import { NextQuestionContainer, Paragraph } from "./styles";
import { Button } from "../shared";

export default function ViewNextQuestion({
  isCorrectAnswer,
  isLastQuestion,
  viewResult,
  onNextQuestion,
}) {
  return (
    <NextQuestionContainer>
      {isCorrectAnswer ? (
        <Paragraph size="2rem" data-testid="correct-answer">
          Correct!
        </Paragraph>
      ) : (
        <Paragraph size="2rem" data-testid="wrong-answer">
          Sorry!
        </Paragraph>
      )}
      {isLastQuestion ? (
        <Button onClick={viewResult}>View Result</Button>
      ) : (
        <Button onClick={onNextQuestion} data-testid="next-question">
          Next Question
        </Button>
      )}
    </NextQuestionContainer>
  );
}
