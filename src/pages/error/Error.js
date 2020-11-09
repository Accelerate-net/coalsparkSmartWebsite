import React from "react";
import "./Error.css";
import errorImg from "../../assets/imgs/error.svg";

function Error() {
  return (
    <div className="errorWrapper">
      <img src={errorImg} alt="error 404 | Page not Found" />
      <h3>Oops! The page you are looking for is still being cooked</h3>
      <p>Try scanning the QR Code again!</p>
      <a href = "https://smart.zaitoon.restaurant" className = "click">Click to go back!</a>
    </div>
  );
}

export default Error;
