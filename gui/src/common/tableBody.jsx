import React, { Component } from "react";
import _ from "lodash";

class TableBody extends Component {
  renderCell = (item, column) => {
    if (column.content) return column.content(item);
    return _.get(item, column.path);
  };

  createKey = (item, column) => {
    return item._id + (column.path || column.key);
  };

  render() {
    const { data, columns } = this.props;
    return (
      // <div style={{ "overflow-y": "scroll", height: 500 }}>
      <tbody styles={{ "overflow-y": "scroll", height: 500 }}>
        {data.map(item => (
          <tr key={item._id}>
            {columns.map(c => (
              <td key={this.createKey(item, c)}>{this.renderCell(item, c)}</td>
            ))}
          </tr>
        ))}
      </tbody>
      // </div>
    );
  }
}

export default TableBody;
