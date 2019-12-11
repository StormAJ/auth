import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import LoginForm from "./loginForm";
import RegisterForm from "./registerForm";
import PWForm from "./pwForm";
import UserModal from "./userModal";
import http from "../services/httpService";

import { Navbar, NavDropdown, Nav, Form, FormControl } from "react-bootstrap";

class navBar extends Component {
  state = {
    user: null,
    showLogin: false,
    showRegister: false,
    showPW: false,
    showUser: false,
    apiKey: localStorage.getItem("apiKey")
  };

  componentDidMount() {
    console.log("navBar did mount");
    (async () => {
      try {
        const { data: user } = await http.getUser();
        this.setState({ user });
      } catch (ex) {}
    })();
  }

  handleClose = () => {
    const showLogin = false;
    const showRegister = false;
    const showPW = false;
    const showUser = false;
    this.setState({ showLogin, showRegister, showPW, showUser });
  };

  handleShowLogin = () => {
    const showLogin = true;
    this.setState({ showLogin });
  };

  handleShowRegister = () => {
    const showRegister = true;
    this.setState({ showRegister });
  };

  handleShowPW = () => {
    const showPW = true;
    this.setState({ showPW });
  };

  handleShowUser = () => {
    const showUser = true;
    this.setState({ showUser });
  };

  handleLogin = async () => {
    try {
      const { data: user } = await http.getUser();
      this.setState({ user });
    } catch (err) {}
  };

  handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("jwt");
    const user = null;
    this.setState({ user });
  };

  handleSetApiKey = e => {
    const apiKey = e.target.value;
    this.setState({ apiKey });
    localStorage.setItem("apiKey", apiKey);
  };

  render(props) {
    console.log("navBar rendered ..");
    const { apiKey, user } = this.state;
    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="/home">
            Home
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link" to="/users">
                  Users
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/app1"
                  disabled={user === null}
                >
                  Protected Tab
                </NavLink>
              </li>
              <li>
                <NavDropdown
                  title={user ? user.name : "login"}
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item
                    onClick={user ? this.handleLogout : this.handleShowLogin}
                  >
                    {user ? "logout" : "login"}
                  </NavDropdown.Item>
                  {!user ? (
                    <NavDropdown.Item onClick={this.handleShowRegister}>
                      Register
                    </NavDropdown.Item>
                  ) : (
                    <NavDropdown.Item onClick={this.handleShowPW}>
                      Change PW
                    </NavDropdown.Item>
                  )}

                  {user && (
                    <div>
                      <NavDropdown.Divider />
                      <NavDropdown.Item onClick={this.handleShowUser}>
                        {user.name}
                      </NavDropdown.Item>
                    </div>
                  )}
                </NavDropdown>
              </li>

              <Form inline>
                <FormControl
                  type="text"
                  placeholder="api-key"
                  className="mr-sm-2"
                  value={apiKey}
                  onChange={this.handleSetApiKey}
                />
              </Form>

              {/* 
              {!user && (
                <React.Fragment>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/login">
                      Login
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/register">
                      Register
                    </NavLink>
                  </li>
                </React.Fragment>
              )}
              {user && (
                <React.Fragment>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/logout">
                      Logout
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/profile">
                      {user.name}
                    </NavLink>
                  </li>
                </React.Fragment>
              )} */}
            </ul>
          </div>
        </nav>

        {/* <Navbar bg="light" expand="lg">
          <Navbar.Brand href="/home">Home</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="users">Users </Nav.Link>
              <Nav.Link href="app1" disabled={user === null}>
                Protected Tab
              </Nav.Link>
              <NavDropdown
                title={user ? user.name : "login"}
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item
                  onClick={user ? this.handleLogout : this.handleShowLogin}
                >
                  {user ? "logout" : "login"}
                </NavDropdown.Item>
                {!user ? (
                  <NavDropdown.Item onClick={this.handleShowRegister}>
                    Register
                  </NavDropdown.Item>
                ) : (
                  <NavDropdown.Item onClick={this.handleShowPW}>
                    Change PW
                  </NavDropdown.Item>
                )}

                {user && (
                  <div>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={this.handleShowUser}>
                      {user.name}
                    </NavDropdown.Item>
                  </div>
                )}
              </NavDropdown>
            </Nav>
            <Form inline>
              <FormControl
                type="text"
                placeholder="api-key"
                className="mr-sm-2"
                value={apiKey}
                onChange={this.handleSetApiKey}
              />
            </Form>
          </Navbar.Collapse>
        </Navbar> */}

        <LoginForm
          show={this.state.showLogin}
          onClose={this.handleClose}
          onLogin={this.handleLogin}
        />
        <RegisterForm
          show={this.state.showRegister}
          onClose={this.handleClose}
          // apiKey={this.apiKey}
        />
        <PWForm
          show={this.state.showPW}
          onClose={this.handleClose}
          // apiKey={this.apiKey}
        />
        <UserModal
          show={this.state.showUser}
          onClose={this.handleClose}
          user={user}
        />
      </>
    );
  }
}

export default navBar;
