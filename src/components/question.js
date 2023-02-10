import React, { useState } from "react";
import styled, { css } from "styled-components";
import questions from "../questions.json";
import { getDifficulty } from "../utils/get-difficulty";
import {
  getCurrentScore,
  getLowestScore,
  getMaxScore,
} from "../utils/score-calculation";
import ScoreBar from "./scorebar";

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
              {getDifficulty(questions[progress.currentQuestion].difficulty) <=
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
        {choices.map((choice, index) => {
          return (
            <ChoiceButton
              key={index}
              type="button"
              chosenAnswer={didAnswer && choice === chosenAnswer}
              isCorrect={didAnswer && choice === correctAnswer}
              didAnswer={didAnswer}
              onClick={(e) => {
                if (didAnswer) return;
                setChosenAnswer(choice);
                if (e.target.innerText === decodeURIComponent(correctAnswer)) {
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
              }}
            >
              {decodeURIComponent(choice)}
            </ChoiceButton>
          );
        })}
      </Choices>
      {didAnswer && (
        <NextQuestionContainer>
          {isCorrectAnswer ? (
            <Paragraph size="2rem">Correct!</Paragraph>
          ) : (
            <Paragraph size="2rem">Sorry!</Paragraph>
          )}
          {progress.currentQuestion + 1 !== questions.length && (
            <NextQuestion
              onClick={() => {
                setProgress({
                  ...progress,
                  currentQuestion: progress.currentQuestion + 1,
                });
                setChosenAnswer("");
              }}
            >
              Next Question
            </NextQuestion>
          )}
        </NextQuestionContainer>
      )}
      <ScoreBar
        currentQuestion={progress.currentQuestion}
        getCurrentScore={() =>
          getCurrentScore(progress.correctAnswers, progress.wrongAnswers)
        }
        getLowestScore={() =>
          getLowestScore(progress.correctAnswers, questions.length)
        }
        getMaxScore={() => getMaxScore(progress.wrongAnswers, questions.length)}
      />
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

const QuestionInfo = styled.div`
  display: flex;
  flex-direction: column;
  & > h2 {
    margin: 0 0 0.3rem 0;
    color: ${(props) => props.theme.colors.gray11};
  }
  & > small {
    margin: 0 0 0.2rem 0;
    font-weight: 600;
    font-size: 0.8rem;
    color: ${(props) => props.theme.colors.gray9};
  }
`;

const QuestionDescription = styled.p`
  overflow-wrap: anywhere;
  margin: 3rem 0;
  font-weight: 500;
  font-size: 1.1rem;
`;

const Choices = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 2rem;
`;

const ChoiceButton = styled.button`
  font-weight: 500;
  font-size: 1rem;
  border-radius: 4px;
  border-width: 1px;
  border-style: solid;
  cursor: pointer;
  ${(props) => {
    let styles;
    if (props.didAnswer) {
      switch (true) {
        case props.chosenAnswer:
          styles = css`
            background: #000;
            color: #fff;
          `;
          break;
        case props.isCorrect && !props.chosenAnswer:
          styles = css`
            background: #fff;
            color: #000;
          `;
          break;
        case !props.chosenAnswer && !props.isCorrect:
          styles = css`
            background: ${props.theme.colors.gray3};
            color: ${props.theme.colors.gray8};
            border-color: ${props.theme.colors.gray8};
          `;
          break;
        default:
          styles = css`
            background: #fff;
            color: #000;
            border-color: #000;
          `;
          break;
      }
    }
    return styles;
  }};
`;

const NextQuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1.5rem;
  align-items: center;
  gap: 1rem;
`;

const NextQuestion = styled.button`
  padding: 0.5rem 1rem;
  cursor: pointer;
`;

const Star = styled.div`
  display: inline-block;
`;

const ProgressBar = styled.progress`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  border-radius: 0;
  &::-webkit-progress-value {
    background: ${(props) => props.theme.colors.gray8};
  }
  &::-moz-progress-bar {
    background: ${(props) => props.theme.colors.gray8};
  }
  &::-webkit-progress-bar {
    background: #fff;
  }
`;

const Paragraph = styled.p`
  font-size: ${(props) => props.size || "1rem"};
  margin: 1rem 0;
`;
