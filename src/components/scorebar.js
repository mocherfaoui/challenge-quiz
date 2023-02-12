import React from "react";
import styled from "styled-components";
import { getScore } from "../utils";

export default function ScoreBar({
  correctAnswers,
  wrongAnswers,
  totalQuestions,
}) {
  const { currentScore, lowestScore, maxScore } = getScore(
    correctAnswers,
    wrongAnswers,
    totalQuestions
  );

  return (
    <ScoreContainer>
      <ScoreDetails>
        <span>Score: {currentScore}%</span>
        <span>Max Score: {maxScore}%</span>
      </ScoreDetails>
      <ScoreBarContainer>
        <Bar
          width={lowestScore}
          color="gray12"
          zIndex="3"
          data-testid="lowest-score-bar"
        />
        <Bar
          width={currentScore}
          color="gray10"
          zIndex="2"
          data-testid="current-score-bar"
        />
        <Bar
          width={maxScore}
          color="gray8"
          zIndex="1"
          data-testid="max-score-bar"
        />
      </ScoreBarContainer>
    </ScoreContainer>
  );
}

const ScoreContainer = styled.div`
  position: absolute;
  bottom: 20px;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  & > div {
    margin: 0 2rem;
    @media (min-width: 768px) {
      margin: 0 4rem;
    }
  }
`;

const ScoreDetails = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ScoreBarContainer = styled.div`
  border-radius: 4px;
  border: 1px solid #000;
  display: flex;
  min-height: 20px;
  position: relative;
`;

const Bar = styled.span`
  display: inline-flex;
  background: ${(props) => props.theme.colors[props.color]};
  width: ${(props) => props.width}%;
  position: absolute;
  height: 100%;
  z-index: ${(props) => props.zIndex};
`;
