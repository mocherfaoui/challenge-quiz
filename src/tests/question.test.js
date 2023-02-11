import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { StyledProvider } from "../providers/styled-provider";
import Question from "../components/question";

import { getQuestions, getRandomEvenNumber } from "../utils";

import questions from "../questions.json";

const parsedQuestions = getQuestions(questions);
const randomNumber = getRandomEvenNumber(0, parsedQuestions.length);
const progress = {
  currentQuestion: randomNumber,
  correctAnswers: randomNumber / 2,
  wrongAnswers: randomNumber / 2,
};
const randomQuestion = parsedQuestions[randomNumber];
const randomQuestionChoices = [
  randomQuestion.correct_answer,
  ...randomQuestion.incorrect_answers,
];

afterAll(cleanup);

test("should show the correct question with choices", async () => {
  render(
    <StyledProvider>
      <Question
        question={randomQuestion}
        progress={progress}
        totalQuestions={parsedQuestions.length}
      />
    </StyledProvider>
  );

  const currentQuestionNumber = await screen.findByTestId(
    "current-question-number"
  );
  const totalQuestions = await screen.findByTestId("total-questions");
  const description = await screen.findByTestId("question-description");
  const choices = await screen.findAllByTestId("question-choice");

  expect(Number(currentQuestionNumber.textContent)).toEqual(randomNumber + 1);
  expect(Number(totalQuestions.textContent)).toEqual(parsedQuestions.length);
  expect(description).toBeInTheDocument();
  expect(description.textContent).toEqual(randomQuestion.question);
  expect(
    choices.every((choice) =>
      randomQuestionChoices.includes(choice.textContent)
    )
  ).toBe(true);
});
