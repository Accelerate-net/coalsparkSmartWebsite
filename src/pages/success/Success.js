import React, { useState, useEffect } from "react";
import Lottie from "react-lottie";
import animationData from "../../assets/lottie/success-animation.json";
import "./Success.css";
import { withRouter, useHistory } from "react-router-dom";
import { useStateValue } from "../../contexts/StateProvider";
import successAudio from "../../assets/audio/success.wav";

function Success() {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const [seconds, setSeconds] = useState(10);
  const history = useHistory();
  const [{ basket }, dispatch] = useStateValue();
  const [audio] = useState(new Audio(successAudio));
  audio.muted = true;


  const queryString = window.location.search;
  const queryParamsInUrl = new URLSearchParams(queryString);
  const timeleft = queryParamsInUrl.get("timeleft") ? parseInt(queryParamsInUrl.get("timeleft")) : 15;
  if(!timeleft){
    timeleft = 15;
  }


  const redirect_branchCode = queryParamsInUrl.get("branchCode");
  const redirect_tableNumber = queryParamsInUrl.get("tableNumber");
  const redirect_qrCodeReference = queryParamsInUrl.get("qrCodeReference");
  const redirect_mode = queryParamsInUrl.get("mode");
  const redirect_userName = queryParamsInUrl.get("userName");
  const redirect_userMobile = queryParamsInUrl.get("userMobile");

  const redirect_url = "/?branchCode=" + redirect_branchCode + "&tableNumber=" + redirect_tableNumber + "&qrCodeReference=" + redirect_qrCodeReference + "&mode=" + redirect_mode + "&userName=" + redirect_userName + "&userMobile=" + redirect_userMobile;

  if (window.location.pathname === "/success") {
    window.addEventListener("popstate", function (event) {
      history.push(redirect_url);
    });
  }

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        clearInterval(myInterval);
      }
    }, 1000);
    if (seconds === 10) {
      audio.muted = false;
      audio.play();
    }
    if (seconds === 0) {
      history.push(redirect_url);
    }
    return () => {
      clearInterval(myInterval);
    };
  }, [dispatch, seconds, audio]);


  return (
    <div className="success__Wrapper">
      <Lottie options={defaultOptions} height={300} width={300} />
      <p>Yay! your order is placed</p>
      <p className="servingTimeTtile">
        Serving in <b>{timeleft} mins</b>
      </p>
      <p className="redirectingSeconds">{seconds}s</p>
    </div>
  );
}

export default withRouter(Success);
