import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { ToastContainer, Flip } from "react-toastify";
import "bootstrap/dist/css/bootstrap.css";
import "react-toastify/dist/ReactToastify.css";
import "themes/css/App.css";
import "themes/scss/main.scss";
import "GlobalStyle.scss";
import { withMainLayout } from "components/Layouts";
// import Login from "containers/App/screens/Login";
import Modals from "containers/Modals/Injectable";
import Resume from "containers/App/screens/Resume";
import FaceDetection from "containers/App/screens/FaceDetection";

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={withMainLayout(FaceDetection)} />
        {/* <Route exact path="/login" component={withMainLayout(Login)} /> */}
        <Route exact path="/resume" component={withMainLayout(Resume)} />
        <Redirect to="/" />
      </Switch>
      <ToastContainer
        className="ncp-toast"
        transition={Flip}
        hideProgressBar
        autoClose={2000}
      />
      <Modals />
    </>
  );
}

export default App;
