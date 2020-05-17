import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { ToastContainer, Flip } from "react-toastify";
import { Modal } from "reactstrap";

// import Portfolio from "containers/App/screens/Portfolio";
// import { withMainLayout } from "components/Layouts";
import ToResumeModal from "./components/ToResumeModal";

function Modals(props) {
  const { dispatch, isToResumeModalOpen } = props;
  return (
    <>
      <ToResumeModal isOpen={isToResumeModalOpen} dispatch={dispatch} />
    </>
  );
}

export default Modals;
