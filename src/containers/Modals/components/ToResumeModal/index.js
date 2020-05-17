import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Button } from "reactstrap";
import SharedModal from "components/SharedModal";
import themes from "utils/themes";
import * as actions from "containers/Modals/actions";
import history from "utils/history";

const Footer = styled.div`
  button {
    margin-left: 10px;
  }
  .btn--yes {
    background: ${themes.nnqduyChickenLuxury} !important;
  }
  .btn--no {
    background: ${themes.nnqduyChildhoodPastelRed} !important;
  }
`;

const ToResumeModal = (props) => {
  const { isOpen, dispatch } = props;
  const renderHeader = () => {
    return (
      <div>
        About me page is not ready. Do you want to look through my resume ?
      </div>
    );
  };

  const renderBody = () => {
    return (
      <div>
        Sorry for this inconvenience. You might be able to come back for about
        me page later.
      </div>
    );
  };
  const renderFooter = () => {
    return (
      <Footer>
        <Button
          className="btn--yes nnqduy-btn--primary"
          onClick={() => {
            dispatch(actions.toggleToResumeModalSuccess(false));
            history.push("/resume");
          }}
        >
          YES
        </Button>
        <Button
          className="btn--no nnqduy-btn--primary"
          onClick={() => {
            dispatch(actions.toggleToResumeModalSuccess(false));
          }}
        >
          NO
        </Button>
      </Footer>
    );
  };

  return (
    <SharedModal
      isOpen={isOpen}
      toggleFunc={(status) => {
        dispatch(actions.toggleToResumeModalSuccess(status));
      }}
      innerComponents={{
        header: renderHeader,
        body: renderBody,
        footer: renderFooter,
      }}
    />
  );
};

export default ToResumeModal;
