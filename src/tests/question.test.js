import React from "react";
import "@testing-library/react/dont-cleanup-after-each";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { StyledProvider } from "../providers/styled-provider";
import Question from "../components/question";

const questions = [
  {
    id: 1,
    category: "Category 1",
    question: "Question 1",
    correct_answer: "Answer 1",
    incorrect_answers: ["Answer 2", "Answer 3", "Answer 4"],
    difficulty: "easy",
  },
  {
    id: 2,
    category: "Category 2",
    question: "Question 2",
    correct_answer: "Answer 1",
    incorrect_answers: ["Answer 2", "Answer 3", "Answer 4"],
    difficulty: "medium",
  },
  {
    id: 3,
    category: "Category 3",
    question: "Question 3",
    correct_answer: "Answer 1",
    incorrect_answers: ["Answer 2", "Answer 3", "Answer 4"],
    difficulty: "hard",
  },
];

const progress = {
  currentQuestion: 1,
  correctAnswers: 1,
  wrongAnswers: 0,
};

afterAll(cleanup);

describe("should show the correct question with the correct details", () => {
  render(
    <StyledProvider>
      <Question
        question={questions[1]}
        progress={progress}
        totalQuestions={questions.length}
      />
    </StyledProvider>
  );

  test("should show correct progress bar value", async () => {});

  test("should show correct question number and total questions number", async () => {
    const currentQuestionNumber = await screen.findByTestId(
      "current-question-number"
    );
    const totalQuestions = await screen.findByTestId("total-questions");
    expect(currentQuestionNumber.textContent).toEqual("2");
    expect(Number(totalQuestions.textContent)).toEqual(questions.length);
  });

  test("should show correct question with choices", async () => {
    const questionChoices = [
      questions[1].correct_answer,
      ...questions[1].incorrect_answers,
    ];

    const description = await screen.findByTestId("question-description");
    expect(description.textContent).toEqual(questions[1].question);

    const choices = await screen.findAllByTestId("question-choice");
    expect(
      choices.every((choice) => questionChoices.includes(choice.textContent))
    ).toBe(true);
  });

  test("should reflect correct score(current, low, max) / progress bar values", async () => {
    const progressBarValue = await screen.findByTestId("progress-bar");
    expect(progressBarValue.getAttribute("value")).toEqual("67");

    const current = await screen.findByTestId("current-score-bar");
    const lowest = await screen.findByTestId("lowest-score-bar");
    const max = await screen.findByTestId("max-score-bar");

    expect(current.getAttribute("width")).toEqual("100");
    expect(lowest.getAttribute("width")).toEqual("33");
    expect(max.getAttribute("width")).toEqual("100");
  });

  test("should show correct/sorry based on user choice", async () => {
    const questionChoices = [
      questions[1].correct_answer,
      ...questions[1].incorrect_answers,
    ];
    const correctAnswer = questions[1].correct_answer;
    const randomIndex = Math.floor(Math.random() * questionChoices.length);
    const selectedOption = screen.getByText(questionChoices[randomIndex]);
    const isCorrectAnswer = selectedOption === correctAnswer;

    fireEvent.click(selectedOption);
    const response = screen.queryByTestId("response");
    if (isCorrectAnswer) {
      expect(response).toHaveTextContent("Correct!");
    } else {
      expect(response).toHaveTextContent("Sorry!");
    }
  });
});
