//import React, { Component } from "react";
import React from "react";
const Like = props => {
  const fullHeard = "fa fa-heart";
  const emptyHeard = fullHeard + "-o";
  const heard = props.liked === true ? fullHeard : emptyHeard;
  return (
    <i
      onClick={props.onLike}
      style={{ cursor: "pointer" }}
      className={heard}
      aria-hidden="true"
    />
  );
};

export default Like;
