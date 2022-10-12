import React from "react";

import "./header.css";

const Header = ({ content }) => {
  return (
    <div className="header">
      <h4>{content}</h4>
    </div>
  );
};

export default Header;
