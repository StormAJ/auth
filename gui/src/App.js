import React, { Component } from "react";
import {
  Route,
  BrowserRouter as Router,
  Link,
  Switch,
  Redirect
} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import NavBar from "./components/navBar";
import Home from "./components/home";
import Otherpage from "./components/OtherPage";
import Users from "./components/users";
import App1 from "./common/reactTableEx4";
import NotFound from "./components/notFound";
import { getCookies } from "./util/cookie";

import "./App.css";
// toast.configure(); //

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <ToastContainer enableMultiContainer containerId={"err"} />
        <ToastContainer
          enableMultiContainer
          containerId={"msg"}
          autoClose={false}
          position={toast.POSITION.TOP_CENTER}
        />
        <NavBar />

        <main className="container">
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/not-found" component={NotFound} />
            <Route path="/users" component={Users} />
            <Route path="/app1" component={App1} />
            {/* <Route path="/" exact component={Home} /> */}
            {/* <Redirect to="/not-found" /> */}
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
