import React, { Component } from "react";
import { Link } from "react-router-dom";
import UserPopover from "./userPopover";
import Table from "../common/table";

class UsersTable extends Component {
  state = {
    showUser: false
  };

  columns = [
    {
      path: "name",
      label: "Name",
      content: user => <UserPopover user={user} />
    },
    { path: "email", label: "Email" },
    { path: "created", label: "Created" },
    {
      key: "delete",
      content: user =>
        user.name && (
          <button
            onClick={() => {
              this.props.onDelete(user);
            }}
            className="btn btn-danger btn-sm"
          >
            Delete
          </button>
        )
    }
  ];

  // deleteColumn = {
  //   key: "delete",
  //   content: user => (
  //     <button
  //       onClick={() => {
  //         this.props.onDelete(user);
  //       }}
  //       className="btn btn-danger btn-sm"
  //     >
  //       Delete
  //     </button>
  //   )
  // };

  constructor() {
    super();
    // this.columns.push(this.deleteColumn);
  }

  render() {
    const { users, sortColumn, onSort } = this.props;

    return (
      <Table
        data={users}
        columns={this.columns}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default UsersTable;
