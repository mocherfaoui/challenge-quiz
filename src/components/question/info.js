import React from "react";
import { Info, Star } from "./styles";

import { getRating } from "../../utils";

export default function QuestionInfo({
  currentQuestion,
  totalQuestions,
  question,
}) {
  return (
    <Info>
      <h2>
        Question{" "}
        <span data-testid="current-question-number">{currentQuestion}</span> of
        <span data-testid="total-questions"> {totalQuestions}</span>
      </h2>
      <small data-testid="question-category">{question.category}</small>
      <div>
        {[...Array(3)].map((_, index) => (
          <Star key={index}>
            {getRating(question.difficulty) <= index ? (
              <span>&#9734;</span>
            ) : (
              <span data-testid="question-difficulty">&#9733;</span>
            )}
          </Star>
        ))}
      </div>
    </Info>
  );
}
