import React from "react";
import "./Error.css";
import errorImg from "../../assets/imgs/error.svg";

function Error() {

	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	const message = urlParams.get("message");

  return (
    <div className="errorWrapper">
      <img src={errorImg} alt="error 404 | Page not Found" />
      <h3>Oops! Something went wrong.</h3>
      {message ? (<p><b>Error</b> {message}</p>) : null}
      <a href = "https://smart.coalspark.com" className = "click">Scan Again</a>
    </div>
  );
}

export default Error;
