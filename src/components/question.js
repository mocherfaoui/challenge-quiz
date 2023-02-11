import React, { useState } from "react";

import {
  ChoiceButton,
  Choices,
  Container,
  NextQuestion,
  NextQuestionContainer,
  Paragraph,
  ProgressBar,
  QuestionDescription,
  QuestionInfo,
  Star,
} from "./question.styles";
import ScoreBar from "./scorebar";

import { getRating } from "../utils/get-rating";

import questions from "../questions.json";

export default function Question() {
  const [progress, setProgress] = useState({
    currentQuestion: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });
  const [chosenAnswer, setChosenAnswer] = useState("");

  const choices = [
    questions[progress.currentQuestion].correct_answer,
    ...questions[progress.currentQuestion].incorrect_answers,
  ];
  const didAnswer = chosenAnswer !== "";
  const correctAnswer = questions[progress.currentQuestion].correct_answer;
  const isCorrectAnswer = chosenAnswer === correctAnswer;

  const onAnswerClick = (buttonValue, choice) => {
    if (didAnswer) return;
    setChosenAnswer(choice);
    if (buttonValue === decodeURIComponent(correctAnswer)) {
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
    <Container>
      <ProgressBar
        value={(progress.currentQuestion + 1) * (100 / 20)}
        max="100"
      />
      <QuestionInfo>
        <h2>
          Question {progress.currentQuestion + 1} of {questions.length}
        </h2>
        <small>
          {decodeURIComponent(questions[progress.currentQuestion].category)}
        </small>
        <div>
          {[...Array(3)].map((_, index) => (
            <Star key={index}>
              {getRating(questions[progress.currentQuestion].difficulty) <=
              index ? (
                <span>&#9734;</span>
              ) : (
                <span>&#9733;</span>
              )}
            </Star>
          ))}
        </div>
      </QuestionInfo>
      <QuestionDescription>
        {decodeURIComponent(questions[progress.currentQuestion].question)}
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
          >
            {decodeURIComponent(choice)}
          </ChoiceButton>
        ))}
      </Choices>
      {didAnswer && (
        <NextQuestionContainer>
          {isCorrectAnswer ? (
            <Paragraph size="2rem">Correct!</Paragraph>
          ) : (
            <Paragraph size="2rem">Sorry!</Paragraph>
          )}
          {progress.currentQuestion + 1 !== questions.length && (
            <NextQuestion onClick={onNextQuestion}>Next Question</NextQuestion>
          )}
        </NextQuestionContainer>
      )}
      <ScoreBar
        correctAnswers={progress.correctAnswers}
        wrongAnswers={progress.wrongAnswers}
        totalQuestions={questions.length}
      />
    </Container>
  );
}
