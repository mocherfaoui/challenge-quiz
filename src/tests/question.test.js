import React from "react";
import "@testing-library/react/dont-cleanup-after-each";
import { cleanup, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { StyledProvider } from "../providers/styled-provider";
import Question from "../components/question";

import {
  getProgressBarValue,
  getQuestions,
  getRandomEvenNumber,
  getRating,
  getScore,
} from "../utils";

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

describe("should show the correct question with the correct details", () => {
  render(
    <StyledProvider>
      <Question
        question={randomQuestion}
        progress={progress}
        totalQuestions={parsedQuestions.length}
      />
    </StyledProvider>
  );

  test("should show correct progress bar value", async () => {
    const progressBarValue = await screen.findByTestId("progress-bar");
    expect(Number(progressBarValue.getAttribute("value"))).toEqual(
      getProgressBarValue(progress.currentQuestion, parsedQuestions.length)
    );
  });

  test("should show correct question number and total questions number", async () => {
    const currentQuestionNumber = await screen.findByTestId(
      "current-question-number"
    );
    const totalQuestions = await screen.findByTestId("total-questions");
    expect(Number(currentQuestionNumber.textContent)).toEqual(
      progress.currentQuestion + 1
    );
    expect(Number(totalQuestions.textContent)).toEqual(parsedQuestions.length);
  });

  test("should show correct category", async () => {
    const category = await screen.findByTestId("question-category");
    expect(category.textContent).toEqual(randomQuestion.category);
  });

  test("should show correct difficulty", async () => {
    const difficulty = await screen.findAllByTestId("question-difficulty");
    expect(difficulty.map((el) => el.textContent).length).toEqual(
      getRating(randomQuestion.difficulty)
    );
  });

  test("should show correct description", async () => {
    const description = await screen.findByTestId("question-description");
    expect(description.textContent).toEqual(randomQuestion.question);
  });

  test("should show correct choices", async () => {
    const choices = await screen.findAllByTestId("question-choice");
    expect(
      choices.every((choice) =>
        randomQuestionChoices.includes(choice.textContent)
      )
    ).toBe(true);
  });

  test("should show correct score(current, low, max)", async () => {
    const { currentScore, lowestScore, maxScore } = getScore(
      progress.correctAnswers,
      progress.wrongAnswers,
      parsedQuestions.length
    );

    const current = await screen.findByTestId("current-score-bar");
    const lowest = await screen.findByTestId("lowest-score-bar");
    const max = await screen.findByTestId("max-score-bar");

    expect(Number(current.getAttribute("width"))).toEqual(currentScore);
    expect(Number(lowest.getAttribute("width"))).toEqual(lowestScore);
    expect(Number(max.getAttribute("width"))).toEqual(maxScore);
  });
});
