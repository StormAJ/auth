import React from "react";
import { Modal, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Joi from "joi-browser";
import Form from "../common/form";
import http from "../services/httpService";

class LoginForm extends Form {
  schema = {
    email: Joi.string()
      .required()
      .label("Email"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  doSubmit = async props => {
    console.log("doSubmit");
    try {
      const { data } = this.state;
      const { data: token } = await http.login(data.email, data.password);
      localStorage.setItem("jwt", token);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
      }
      if (ex.response && ex.response.status === 403) {
        toast.error("Wrong email or password", { containerId: "err" });
      }
    }
    const data = this.state.data;
    data.password = "";
    this.setState({ data });

    console.log("onLogin called ..");
    this.props.onLogin();
    this.props.onClose();
  };

  render() {
    // if (auth.getCurrentUser()) return <Redirect to="/" />;
    return (
      <div>
        <Modal
          show={this.props.show}
          onHide={this.props.onClose}
          animation={true}
          size="sm"
        >
          <Modal.Header closeButton>
            <Modal.Title>User login </Modal.Title>
          </Modal.Header>

          {/* <h1>Login</h1> */}
          <form onSubmit={this.handleSubmit}>
            <Col xs={"auto"}>
              {this.renderInput("email", "Email")}
              {this.renderInput("password", "Password", "password")}
              {this.renderButton("Login")}
              <h5></h5>
            </Col>
          </form>
        </Modal>
      </div>
    );
  }
}

export default LoginForm;
