import styled, { css } from "styled-components";

export const Container = styled.div`
  padding: 2rem;
  @media (min-width: 768px) {
    padding: 4rem;
  }
  width: 100%;
  position: relative;
`;

export const QuestionInfo = styled.div`
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

const Button = styled.button`
  font-weight: 500;
  font-size: 1rem;
  border-radius: 4px;
  border-width: 1px;
  border-style: solid;
  cursor: pointer;
`;

export const ChoiceButton = styled(Button)`
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

export const NextQuestion = styled(Button)`
  padding: 0.5rem 1rem;
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
