import React from "react";

import "./header.css";

const Header = ({ questionID, NUM_QUESTIONS }) => {
  return (
    <div className="header">
      {questionID === -1 ? (
        <h4>Welcome!</h4>
      ) : questionID === 0 ? (
        <h4>Practice 1/2</h4>
      ) : questionID === 1 ? (
        <h4>Practice 2/2</h4>
      ) : (
        <h4>{`Question ${questionID - 1} / ${NUM_QUESTIONS - 2}`}</h4>
      )}
    </div>
  );
};

export default Header;
