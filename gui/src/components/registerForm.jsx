import React from "react";
import { Modal, Col } from "react-bootstrap";
import Joi from "joi-browser";
import Form from "../common/form";
import http from "../services/httpService";

class RegisterForm extends Form {
  componentDidMount() {
    (async () => {
      try {
        http.clearApiKey();
        const { data: users } = await http.getUsers();
        this.state.data = users[0];
      } catch (ex) {}
    })();
  }

  schema = {
    email: Joi.string()
      .required()
      .label("Email"),
    name: Joi.string()
      .required()
      .label("Name")
  };

  doSubmit = async props => {
    try {
      const { data } = this.state;
      await http.registerUser(data);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
      }
    }
    this.props.onClose();
  };

  render() {
    const user = this.state.data;
    return (
      <div>
        <Modal
          show={this.props.show}
          onHide={this.props.onClose}
          animation={true}
          scrollable={true}
          size="sm"
        >
          <Modal.Header closeButton>
            <Modal.Title>User registration </Modal.Title>
          </Modal.Header>

          <form onSubmit={this.handleSubmit}>
            <Col xs={"auto"}>
              {Object.keys(user).map(k => this.renderInput(k, k))}
              {this.renderButton("Submit")}
              <h5></h5>
            </Col>
          </form>
        </Modal>
      </div>
    );
  }
}

export default RegisterForm;
