import React from "react";
import styled from "styled-components";
import { getScore } from "../utils";

export default function Result({
  correctAnswers,
  wrongAnswers,
  totalQuestions,
}) {
  const { currentScore } = getScore(
    correctAnswers,
    wrongAnswers,
    totalQuestions
  );
  return (
    <ResultContainer>
      <h2>Result</h2>
      <Table>
        <thead>
          <tr>
            <th>Total</th>
            <th>Correct</th>
            <th>Wrong</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{totalQuestions}</td>
            <td>{correctAnswers}</td>
            <td>{wrongAnswers}</td>
          </tr>
        </tbody>
      </Table>
      <Paragraph>
        Final Score: <b>{currentScore}%</b>
      </Paragraph>
    </ResultContainer>
  );
}

const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  & > h2 {
    text-align: center;
  }
  & > div {
    margin: 3rem 0;
  }
`;

const Table = styled.table`
  margin: 2rem 0;
  color: #000;
  width: 100%;
  & th {
    text-align: left;
  }
  & > :not(caption) > * > * {
    padding: 0.5rem 0.5rem;
    border-bottom-width: 1px;
  }
  border-color: ${(props) => props.theme.colors.gray6};
  border-collapse: collapse;
  & > :not(:first-child) {
    border-top: 2px solid currentColor;
  }
`;

const Paragraph = styled.p`
  font-size: 1.2rem;
  text-align: center;
  margin-top: 3rem;
`;
