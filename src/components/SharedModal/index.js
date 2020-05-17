import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import * as _ from "lodash";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import ElaboratedDivider from "components/Decorations/ElaboratedDivider";

const CenterContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const SharedModal = (props) => {
  const { isOpen, toggleFunc, styles, innerComponents } = props;

  const toggle = () => {
    if (toggleFunc) toggleFunc(!isOpen);
  };
  return (
    <Modal style={_.get(styles, "modal") || {}} isOpen={isOpen} toggle={toggle}>
      <ModalHeader style={_.get(styles, "header") || {}} toggle={toggle}>
        {_.get(innerComponents, "header") && <innerComponents.header />}
        <CenterContainer>
          <ElaboratedDivider />
        </CenterContainer>
      </ModalHeader>
      <ModalBody style={_.get(styles, "body")}>
        {_.get(innerComponents, "body") && <innerComponents.body />}
      </ModalBody>
      <ModalFooter style={_.get(styles, "footer")}>
        {_.get(innerComponents, "footer") && <innerComponents.footer />}
      </ModalFooter>
    </Modal>
  );
};

export default SharedModal;

{
  /* <Button color="danger" onClick={toggle}>
        {buttonLabel}
      </Button> */
}
