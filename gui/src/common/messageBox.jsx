import React, { Component } from "react";
import { Modal } from "react-bootstrap";

class ModalMessageBox extends Component {
  constructor() {
    super();
  }
  onClose() {
    const show = false;
  }

  render(props) {
    return (
      <div>
        <Modal show={this.props.show} onHide={this.onClose}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>{this.props.message}</h4>
            <p>Test error message.</p>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default ModalMessageBox;
