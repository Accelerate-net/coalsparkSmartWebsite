import React from "react";
import "./Error.css";
import errorImg from "../../assets/imgs/error.svg";

function Error() {
  return (
    <div className="errorWrapper">
      <img src={errorImg} alt="error 404 | Page not Found" />
      <h3>Oops! Something is wrong.</h3>
      <a href = "https://smart.zaitoon.restaurant" className = "click">Go Back</a>
    </div>
  );
}

export default Error;
