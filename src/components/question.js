import React, { useMemo, useState } from "react";

import {
  ChoiceButton,
  Choices,
  NextQuestion,
  NextQuestionContainer,
  Paragraph,
  ProgressBar,
  QuestionDescription,
  QuestionInfo,
  Star,
} from "./question.styles";
import ScoreBar from "./scorebar";

import { getProgressBarValue, getRating, shuffleArray } from "../utils";

export default function Question({
  question,
  progress,
  setProgress,
  totalQuestions,
  viewResult,
}) {
  const [chosenAnswer, setChosenAnswer] = useState("");

  const choices = useMemo(
    () =>
      shuffleArray([question.correct_answer, ...question.incorrect_answers]),
    [question]
  );

  const isLastQuestion = progress.currentQuestion === totalQuestions - 1;
  const didAnswer = chosenAnswer !== "";
  const correctAnswer = question.correct_answer;
  const isCorrectAnswer = chosenAnswer === correctAnswer;

  const onAnswerClick = (buttonValue, choice) => {
    if (didAnswer) return;
    setChosenAnswer(choice);
    if (buttonValue === correctAnswer) {
      setProgress({
        ...progress,
        correctAnswers: progress.correctAnswers + 1,
      });
    } else {
      setProgress({
        ...progress,
        wrongAnswers: progress.wrongAnswers + 1,
      });
    }
  };

  const onNextQuestion = () => {
    setProgress({
      ...progress,
      currentQuestion: progress.currentQuestion + 1,
    });
    setChosenAnswer("");
  };

  return (
    <>
      <ProgressBar
        value={getProgressBarValue(progress.currentQuestion, totalQuestions)}
        max="100"
        data-testid="progress-bar"
      />
      <QuestionInfo>
        <h2>
          Question{" "}
          <span data-testid="current-question-number">
            {progress.currentQuestion + 1}
          </span>{" "}
          of
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
      </QuestionInfo>
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
            <NextQuestion onClick={viewResult}>View Result</NextQuestion>
          ) : (
            <NextQuestion onClick={onNextQuestion} data-testid="next-question">
              Next Question
            </NextQuestion>
          )}
        </NextQuestionContainer>
      )}
      <ScoreBar
        correctAnswers={progress.correctAnswers}
        wrongAnswers={progress.wrongAnswers}
        totalQuestions={totalQuestions}
      />
    </>
  );
}
