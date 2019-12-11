import React, { Component, useState } from "react";
import { toast } from "react-toastify";
import { Button, Modal, Form, Toast } from "react-bootstrap";
import UserTable from "./userPopover";
import ExampleToast from "./exampleToast";

// const ExampleToast = ({ children }) => {
//   const [show, toggleShow] = useState(true);

//   return (
//     <>
//       {!show && <Button onClick={() => toggleShow(true)}>Show Toast</Button>}
//       <Toast show={show} onClose={() => toggleShow(false)}>
//         <Toast.Header>
//           <strong className="mr-auto">React-Bootstrap</strong>
//         </Toast.Header>
//         <Toast.Body>{children}</Toast.Body>
//       </Toast>
//     </>
//   );
// };

class Home extends Component {
  state = {
    varHome: localStorage.getItem("varHome"),
    input: ""
  };

  // Msg = ({ closeToast }) => (
  //   <div>
  //     Lorem ipsum dolor
  //     <button>Retry</button>
  //     <button onClick={closeToast}>Close</button>
  //   </div>
  // );

  setVar = () => {
    if (localStorage.getItem("varHome") === "variable set") {
      localStorage.removeItem("varHome");
    } else localStorage.setItem("varHome", "variable set");

    const varHome = localStorage.getItem("varHome");
    this.setState({ varHome });
    // toast.error("Nachricht", {
    //   position: toast.POSITION.TOP_LEFT,
    //   autoClose: false
    // });
    // toast("info", { containerId: "standard" });
    const user = { name: "Storm", email: "test" };
    toast(<UserTable user={user} />, {
      containerId: "msg",
      delay: 0
    });
  };

  Msg = ({ closeToast }) => (
    <div>
      {/* <h4>Header</h4> */}
      <p>Text</p>

      <Button onClick={closeToast}>Close</Button>

      <Modal show={true} onHide={this.closeToast}>
        <Modal.Header closeButton>
          <Modal.Title>Titel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Header</h4>
          <p>PPP</p>
        </Modal.Body>
      </Modal>
      <Button onClick={closeToast}>Close</Button>
    </div>
  );
  // handleClick = input => {
  //   console.log("Input: ", input);
  // };
  handleChange = event => {
    event.persist();
    console.log("event: ", event);
    const input = event.target.value;
    this.setState({ input });
  };

  handleSubmit = event => {
    console.log("Submit event: ", this.state.input);
    event.preventDefault();

    // const email = event.target.value;
    // this.setState({ email });
  };

  render(props) {
    //console.log("Home - isAuthenticated: ", this.props.auth.isAuthenticated());
    return (
      <div>
        <h1> React Playground {this.state.varHome} </h1>
        {/* <Form> */}
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Label>Text Input</Form.Label>
            <Form.Control
              type="text"
              name="control-name"
              onChange={this.handleChange}
            />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            // onClick={this.handleClick}
          >
            Submit
          </Button>
        </Form>
        <ExampleToast className="toast" show={true}></ExampleToast>
        <button onClick={this.setVar}> Botton </button>
      </div>
    );
  }
}

export default Home;
