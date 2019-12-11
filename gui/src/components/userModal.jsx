import React, { Component } from "react";
import { Toast, Popover, Modal } from "react-bootstrap";
import UserTable from "./userTable";

class UserModal extends Component {
  render() {
    const { user } = this.props;
    return (
      <Modal
        show={this.props.show}
        onHide={this.props.onClose}
        animation={true}
        scrollable={true}
        size={"sm"}
      >
        <Modal.Header closeButton>
          <Modal.Title>User data </Modal.Title>
        </Modal.Header>
        <UserTable user={user} />
      </Modal>
    );
  }
}

export default UserModal;
