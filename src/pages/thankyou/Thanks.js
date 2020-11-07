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

  // let getActiveStatus = localStorage.getItem("activeStatus")
  //   ? JSON.parse(localStorage.getItem("activeStatus"))
  //   : {};

  //   if (getActiveStatus === "free" || getActiveStatus === "active") {
  //          history.push("/*")
  //   }

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
        <Lottie options={defaultOption} height={250} width={250} />
        <h3>Thank you for dining with us!</h3>
        <p>Hope to see you soon</p>
      </div>
    </div>
  );
}

export default Thanks;
