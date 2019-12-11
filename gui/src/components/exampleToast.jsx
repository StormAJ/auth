import React, { Component, useState } from "react";
import { Button, Toast } from "react-bootstrap";

class ExampleToast extends Component {
  state = { show: this.props.show };

  toggleShow = () => {
    const show = !this.state.show;
    this.setState({ show });
  };

  render() {
    return (
      <>
        {!this.state.show && (
          <Button onClick={this.toggleShow}>Show Toast</Button>
        )}
        <Toast show={this.state.show} onClose={this.toggleShow}>
          <Toast.Header>
            <strong className="mr-auto">React-Bootstrap</strong>
          </Toast.Header>
          <Toast.Body>
            We now have Toasts
            <span role="img" aria-label="tada">
              🎉
            </span>
            Body
          </Toast.Body>
        </Toast>
      </>
    );
  }
}

export default ExampleToast;
