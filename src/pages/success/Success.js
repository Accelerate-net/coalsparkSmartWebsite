import React, { useState, useEffect } from "react";
import Lottie from "react-lottie";
import animationData from "../../assets/lottie/success-animation.json";
import "./Success.css";
import { withRouter, useHistory } from "react-router-dom";
import { useStateValue } from "../../contexts/StateProvider";
import successAudio from "../../assets/audio/success.mp3";

function Success() {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const [seconds, setSeconds] = useState(5);
  const history = useHistory();
  const [{ basket }, dispatch] = useStateValue();
  const [audio] = useState(new Audio(successAudio));
  audio.muted = true;

  let urlParams = localStorage.getItem("metaData")
    ? JSON.parse(localStorage.getItem("metaData"))
    : {};
  let userData = localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData"))
    : {};

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        clearInterval(myInterval);
      }
    }, 1000);
    if (seconds === 4) {
      audio.muted = false;
      audio.play();
    }
    if (seconds === 0) {
      dispatch({
        type: "CLEAN_BASKET",
      });

      localStorage.removeItem("cartItem");

      history.push(
        "/?branchCode=" +
          urlParams.branchCode +
          "&tableNumber=" +
          urlParams.tableNumber +
          "&qrCodeReference=" +
          urlParams.qrCodeReference +
          "&mode=" +
          urlParams.mode +
          "&userName=" +
          userData.name +
          "&userMobile=" +
          userData.mobile
      );
    }
    return () => {
      clearInterval(myInterval);
    };
  }, [dispatch, seconds, audio]);

  //   CSS is in App.css file
  return (
    <div className="success__Wrapper">
      <Lottie options={defaultOptions} height={300} width={300} />
      <p>Yay! your order is placed</p>
      <p className="servingTimeTtile">
        Serving in <b>15 mins</b>
      </p>
      <p className="redirecting">Redirecting in {seconds}</p>
    </div>
  );
}

export default withRouter(Success);
