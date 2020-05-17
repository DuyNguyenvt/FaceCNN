import React from "react";
import Header from "components/Header/Injectable";
import Footer from "components/Footer";
import styled from "styled-components";

const Container = styled.div`
  margin-top: 70px;
  flex-grow: 1;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const withMainLayout = (Component) => (props) => (
  <Wrapper>
    <Header {...props} />
    <Container>
      <Component {...props} />
    </Container>
    <Footer {...props} />
  </Wrapper>
);

export { withMainLayout };
