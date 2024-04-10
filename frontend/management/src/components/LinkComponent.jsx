import React from "react";
import { Link } from "react-router-dom";

const LinkComponent = ({ label, to }) => {
  return (
    <Link to={to} className="bg-indigo-500 hover:bg-indigo-600 text-white btn">
      {label}
    </Link>
  );
};

export default LinkComponent;
