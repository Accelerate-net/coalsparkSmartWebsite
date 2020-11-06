import React from "react";
import Lottie from "react-lottie";
import animationData from "../../assets/lottie/success-animation.json";
import "./Success.css";

function Success() {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  //   CSS is in App.css file
  return (
    <div className="success__Wrapper">
      <Lottie options={defaultOptions} height={300} width={300} />
      <p>Yay! your order is placed</p>
      <p className="servingTimeTtile">Serving in <b>15 mins</b></p>
    </div>
  );
}

export default Success;