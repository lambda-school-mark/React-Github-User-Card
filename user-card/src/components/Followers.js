import React from "react";

const Followers = (props) => {
  return (
    <div className="followerContainer">
      <p className="follower">{props.follower.login}</p>
    </div>
  );
};

export default Followers;
