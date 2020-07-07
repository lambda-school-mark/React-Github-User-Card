import React from "react";

const User = (props) => {
  return (
    <div className="userContainer">
      <h2>{props.user.login}</h2>
      <p> {props.user.bio}</p>
    </div>
  );
};

export default User;
