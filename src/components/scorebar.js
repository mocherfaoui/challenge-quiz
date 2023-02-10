import React from "react";
import styled from "styled-components";

export default function ScoreBar({
  currentQuestion,
  getCurrentScore,
  getLowestScore,
  getMaxScore,
}) {
  return (
    <ScoreContainer>
      <ScoreDetails>
        <span>Score: {getCurrentScore() || 0}%</span>
        <span>Max Score: {getMaxScore()}%</span>
      </ScoreDetails>
      <ScoreBarContainer>
        <Bar width={getLowestScore} color="gray12" zIndex="3" />
        <Bar width={getCurrentScore} color="gray10" zIndex="2"/>
        <Bar width={getMaxScore} color="gray8" zIndex="1"/>
      </ScoreBarContainer>
    </ScoreContainer>
  );
}

const ScoreContainer = styled.div`
  position: absolute;
  bottom: 10px;
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
