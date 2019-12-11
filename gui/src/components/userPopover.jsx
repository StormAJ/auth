import React, { Component } from "react";
import { OverlayTrigger, Popover } from "react-bootstrap";
import UserTable from "./userTable";

class UserPopover extends Component {
  render() {
    const { user } = this.props;
    return (
      <OverlayTrigger
        placement="right"
        delay={{ show: 250, hide: 100 }}
        overlay={
          <Popover>
            <Popover.Title as="h3">User Data</Popover.Title>
            <Popover.Content>
              <UserTable user={user} />
            </Popover.Content>
          </Popover>
        }
      >
        <h5> {user.name} </h5>
      </OverlayTrigger>
    );
  }
}

export default UserPopover;
