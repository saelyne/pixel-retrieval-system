import React from "react";

import "./home.css";

const End = ({ userID }) => {
  return (
    <>
      <div className="end-window">
        <h4>User ID: {userID}</h4>
        <h4>You've done all the tasks.</h4>
        <h4>Thank you for participating in our study.</h4>
      </div>
    </>
  );
};

export default End;
