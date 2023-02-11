import React from "react";
import styled from "styled-components";
import Quiz from "./components/quiz";
import { StyledProvider } from "./providers/styled-provider";

function App() {
  return (
    <StyledProvider>
      <Background>
        <Wrapper>
          <Quiz />
        </Wrapper>
      </Background>
    </StyledProvider>
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
