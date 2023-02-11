import React from "react";
import styled, { ThemeProvider } from "styled-components";
import Question from "./components/question";

import questions from "./questions.json";
import { getQuestions } from "./utils/get-questions";

const theme = {
  colors: {
    gray1: "hsl(0, 0%, 99.0%)",
    gray2: "hsl(0, 0%, 97.3%)",
    gray3: "hsl(0, 0%, 95.1%)",
    gray4: "hsl(0, 0%, 93.0%)",
    gray5: "hsl(0, 0%, 90.9%)",
    gray6: "hsl(0, 0%, 88.7%)",
    gray7: "hsl(0, 0%, 85.8%)",
    gray8: "hsl(0, 0%, 78.0%)",
    gray9: "hsl(0, 0%, 56.1%)",
    gray10: "hsl(0, 0%, 52.3%)",
    gray11: "hsl(0, 0%, 43.5%)",
    gray12: "hsl(0, 0%, 9.0%)",
  },
};

function App() {
  const parsedQuestions = getQuestions(questions);

  return (
    <ThemeProvider theme={theme}>
      <Background>
        <Wrapper>
          <Question questions={parsedQuestions} />
        </Wrapper>
      </Background>
    </ThemeProvider>
  );
}

export default App;

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  max-width: 38em;
  margin: 0 auto;
  background: #fff;
  border: 1px solid ${(props) => props.theme.colors.gray7};
`;

const Background = styled.div`
  height: calc(100vh - 2rem);
  padding: 1rem 0;
  background: ${(props) => props.theme.colors.gray2};
`;
