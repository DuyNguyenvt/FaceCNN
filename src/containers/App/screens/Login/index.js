import React from "react";
import styled from "styled-components";
import TextInput from "components/Form/TextInput";
import { Button } from "reactstrap";
// import Header from "containers/App/components/header/injectable";
// import Footer from "containers/App/components/footer";
// import MyProfile from "containers/App/components/myProfile";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;

const LoginFormWrapper = styled.div`
  box-shadow: 2px 3px 3px 3px lightgrey;
  border-radius: 20px;
  padding: 20px;
`;

function Login() {
  return (
    <Wrapper>
      <LoginFormWrapper>
        <TextInput label="Email" />
        <TextInput label="Password" />

        <Button color="success">Login</Button>
        <Button color="success">Login ds</Button>
      </LoginFormWrapper>
    </Wrapper>
  );
}

export default Login;
