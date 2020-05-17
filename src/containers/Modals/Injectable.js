import { compose } from "redux";
import { connect } from "react-redux";
import injectReducer from "utils/injectReducer";
import injectSaga from "utils/injectSaga";
import reducer from "./reducer";
// import {
//   // configureStore,
//   injectReducer,
//   injectSaga,
// } from "redux-inject-reducer-and-saga";

import saga from "./saga";
import Modals from ".";

//! I recommed you to use createSelector for better performance
//! i just leave it here without createSelector for my own reselect in future
const mapStateToProps = (state) => {
  const modalsDomain = state.modal;
  return {
    isToResumeModalOpen: modalsDomain.isToResumeModalOpen,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  };
};

const withReducer = injectReducer({ key: "modals", reducer });
const withSaga = injectSaga({ key: "modals", saga });

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, withSaga, withReducer)(Modals);
