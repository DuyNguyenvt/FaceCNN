import { compose } from "redux";
import { connect } from "react-redux";
import injectReducer from "utils/injectReducer";
import injectSaga from "utils/injectSaga";
import reducer from "./reducer";

import saga from "./saga";
import App from ".";

const mapStateToProps = (state) => {
  const globalDomain = state.global;
  return {
    accessToken: globalDomain.accessToken,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  };
};

const withReducer = injectReducer({ key: "global", reducer });
const withSaga = injectSaga({ key: "global", saga });

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, withSaga, withReducer)(App);
