import React, { Component } from "react";

class UserTable extends Component {
  render() {
    const user = this.props.user;
    return (
      <table className="table">
        <tbody>
          {user &&
            Object.keys(user).map(k => (
              <tr>
                <td>{k} </td>
                <td>{user[k]} </td>
              </tr>
            ))}
        </tbody>
      </table>
    );
  }
}

export default UserTable;
