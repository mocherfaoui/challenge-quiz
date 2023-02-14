import React, { useMemo } from "react";

import {
  ChoiceButton,
  Choices,
  ProgressBar,
  QuestionDescription,
} from "./styles";
import ScoreBar from "./scorebar";
import QuestionInfo from "./info";
import ViewNextQuestion from "./view-next-question";

import { getProgressBarValue, shuffleArray } from "../../utils";

export default function Question({
  question,
  progress,
  setProgress,
  totalQuestions,
  viewResult,
}) {
  const choices = useMemo(
    () =>
      shuffleArray([question.correct_answer, ...question.incorrect_answers]),
    [question]
  );
  const chosenAnswer = progress.chosenAnswer;
  const isLastQuestion = progress.currentQuestion === totalQuestions - 1;
  const didAnswer = chosenAnswer !== "";
  const correctAnswer = question.correct_answer;
  const isCorrectAnswer = chosenAnswer === correctAnswer;

  const onAnswerClick = (buttonValue, choice) => {
    if (didAnswer) return;

    if (buttonValue === correctAnswer) {
      setProgress({
        ...progress,
        correctAnswers: progress.correctAnswers + 1,
        chosenAnswer: choice,
      });
    } else {
      setProgress({
        ...progress,
        wrongAnswers: progress.wrongAnswers + 1,
        chosenAnswer: choice,
      });
    }
  };

  const onNextQuestion = () => {
    setProgress({
      ...progress,
      currentQuestion: progress.currentQuestion + 1,
      chosenAnswer: "",
    });
  };

  return (
    <>
      <ProgressBar
        value={getProgressBarValue(progress.currentQuestion, totalQuestions)}
        max="100"
        data-testid="progress-bar"
      />
      <QuestionInfo
        currentQuestion={progress.currentQuestion + 1}
        totalQuestions={totalQuestions}
        question={{
          difficulty: question.difficulty,
          category: question.category,
        }}
      />
      <QuestionDescription data-testid="question-description">
        {question.question}
      </QuestionDescription>
      <Choices>
        {choices.map((choice, index) => (
          <ChoiceButton
            key={index}
            type="button"
            chosenAnswer={didAnswer && choice === chosenAnswer}
            isCorrect={didAnswer && choice === correctAnswer}
            didAnswer={didAnswer}
            onClick={(e) => onAnswerClick(e.target.innerText, choice)}
            data-testid="question-choice"
          >
            {choice}
          </ChoiceButton>
        ))}
      </Choices>
      {didAnswer && (
        <ViewNextQuestion
          isCorrectAnswer={isCorrectAnswer}
          isLastQuestion={isLastQuestion}
          viewResult={viewResult}
          onNextQuestion={onNextQuestion}
        />
      )}
      <ScoreBar
        correctAnswers={progress.correctAnswers}
        wrongAnswers={progress.wrongAnswers}
        totalQuestions={totalQuestions}
      />
    </>
  );
}
