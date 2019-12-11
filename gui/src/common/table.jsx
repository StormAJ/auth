import React from "react";

import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

// const Table = props => {
//   const { data, columns, sortColumn, onSort } = props;

const Table = ({ data, columns, sortColumn, onSort }) => {
  return (
    <table className="table">
      <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />

      {/* <div> */}
      {/* <div style={{ overflowY: "scroll", height: 500 }}> */}
      <TableBody
        data={data}
        columns={columns}
        // overflowY={"scroll"}
        // styles={{ overflowY: "scroll" }}
      />
      {/* </div> */}
    </table>
  );
};

export default Table;
