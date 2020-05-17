import React from "react";
// import PropTypes from "prop-types";
import styled from "styled-components";
import { Input, FormGroup, Label } from "reactstrap";

const StyledFormGroup = styled(FormGroup)`
  &.errors.form-group {
    /* margin-bottom: 0px !important; */
  }
  input {
    width: 300px;
    max-width: 90vw;
  }
`;

function TextInput(props) {
  const { label, type } = props;
  return (
    <StyledFormGroup>
      {label && <Label>{label}</Label>}
      <Input type={type || "text"} {...props} />
    </StyledFormGroup>
  );
}

export default TextInput;
