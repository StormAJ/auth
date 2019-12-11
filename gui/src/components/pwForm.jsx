import React from "react";
import { Modal, Col } from "react-bootstrap";
import Joi from "joi-browser";
import Form from "../common/form";
import http from "../services/httpService";

class PWForm extends Form {
  // state = {
  //   data: { password: "" },
  //   errors: {}
  // };

  schema = {
    password: Joi.string()
      .required()
      .label("Password")
  };

  doSubmit = async props => {
    try {
      const { data } = this.state;
      http.setJwt();
      const { data: token } = await http.changePW(data.password);
      http.saveJwt(token);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
      }
    }
    let data = this.state.data;
    data.password = "";
    this.setState({ data });
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
          <Modal.Header closeButton onClose={this.close}>
            <Modal.Title>Change PW </Modal.Title>
          </Modal.Header>
          <form onSubmit={this.handleSubmit}>
            <Col xs={"auto"}>
              {this.renderInput("password", "Password", "password")}
              {this.renderButton("Submit")}
              <h5></h5>
            </Col>
          </form>
        </Modal>
      </div>
    );
  }
}

export default PWForm;
