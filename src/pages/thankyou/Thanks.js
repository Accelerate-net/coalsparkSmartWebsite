import React from "react";
import Lottie from "react-lottie";
import thankyouAnimation from "../../assets/lottie/thankyou-animation.json";
import "./Thanks.css";
import { useHistory } from "react-router-dom";

function Thanks() {
  const history = useHistory();

  if (window.location.pathname === "/thankyou") {
    window.addEventListener("popstate", function (event) {
      history.push("./thankyou");
    });
  }

  const defaultOption = {
    loop: true,
    autoplay: true,
    animationData: thankyouAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="thanks__Wrapper">
      <div className="thanks__innerWrapper">
        <Lottie options={defaultOption} width={200} />
        <h3>Thank you for dining with us today!</h3>
        <p>Write to us at <b>hello@zaitoon.restaurant</b></p>
      </div>
    </div>
  );
}

export default Thanks;
