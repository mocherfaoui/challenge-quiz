import styled, { css } from "styled-components";
import { Button } from "../shared";

export const Info = styled.div`
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

export const QuestionDescription = styled.p`
  overflow-wrap: anywhere;
  margin: 3rem 0;
  font-weight: 500;
  font-size: 1.1rem;
`;

export const Choices = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 2rem;
`;

export const ChoiceButton = styled(Button)`
  padding: 0.8rem 0.5rem;
  ${(props) => {
    //this needs to be refactored/changed
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

export const NextQuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1.5rem;
  align-items: center;
  gap: 1rem;
`;

export const Star = styled.div`
  display: inline-block;
`;

export const ProgressBar = styled.progress`
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

export const Paragraph = styled.p`
  font-size: ${(props) => props.size || "1rem"};
  margin: 1rem 0;
`;
