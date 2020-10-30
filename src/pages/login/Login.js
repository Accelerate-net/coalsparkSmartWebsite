import React, { useState} from "react";
import "./Login.css";
import logo from "../../assets/imgs/logo_white.png";
import man from "../../assets/imgs/man.png";
import lady from "../../assets/imgs/lady.png";
import table from "../../assets/imgs/table.png";
import flower from "../../assets/imgs/flower.png";
import bbq from "../../assets/imgs/bbq.svg";
import { withRouter, useHistory } from "react-router-dom";

function Login() {
  const [name, handleName] = useState("");
  const [mobile, handleMobile] = useState("");
  const history = useHistory();

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const branchCode = urlParams.get("branchCode");
  const tableNumber = urlParams.get("tableNumber");
  const qrCodeReference = urlParams.get("qrCodeReference");
  const mode = urlParams.get("mode");

  if (!branchCode || !tableNumber || !qrCodeReference || !mode) {
    history.push("*");
  }

  let metaData = {
    branchCode: branchCode,
    tableNumber: tableNumber,
    qrCodeReference: qrCodeReference,
    mode: mode,
  };
  localStorage.setItem("metaData", JSON.stringify(metaData));

  const handleNameInput = (e) => {
    let userName = e.target.value;
    handleName(userName);
  };

  const handleNumInput = (e) => {
    let userNum = e.target.value;
    handleMobile(userNum);
  };

  function slideIn() {
    let ele = document.getElementsByClassName("login_Form")[0];
    ele.classList.add("open");
  }

  function slideOut() {
    let ele = document.getElementsByClassName("login_Form")[0];
    ele.classList.remove("open");
  }

  let userData = {
    name: name,
    mobile: mobile,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, mobile);
    localStorage.setItem("userData", JSON.stringify(userData));
    history.push("/menu");
  };

  return (
    <div className="login">
      <div className="login__Bg">
        <div className="touchNone" onClick={slideOut}></div>
        <div className="login__LogoWrapper animate__animated animate__fadeInDownBig">
          <img src={logo} alt="Zaitoon Logo" />
        </div>
        <div className="desktop_Msg">
          <img src={bbq} alt="" />
          <h3>
            Visit this website on your mobile <br /> to order a variety of
            delicious dishes
          </h3>
        </div>
        <div className="login__bgWrapper">
          <div className="lady_Wrapper">
            <img src={lady} alt="" />
          </div>
          <div className="table_Wrapper">
            <img src={table} alt="" />
          </div>
          <div className="flower_Wrapper">
            <img src={flower} alt="" />
          </div>
          <div className="man_Wrapper">
            <img src={man} alt="" />
          </div>
        </div>
        <div className="start_btn animate__animated animate__fadeInUp">
          <button onClick={slideIn}>Start Ordering</button>
        </div>
      </div>
      <div className="login_Form">
        <div className="login_Title">
          <h3>Your Details</h3>
        </div>
        <form action="" onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            minLength="3"
            value={name}
            placeholder="Your Name"
            onChange={(e) => handleNameInput(e)}
            required
          />
          <input
            type="tel"
            value={mobile}
            placeholder="Mobile Number"
            minLength="10"
            maxLength="10"
            pattern="^[6-9]\d{9}$"
            onChange={(e) => handleNumInput(e)}
            required
          />
          <button type="submit">CONTINUE</button>
        </form>
      </div>
    </div>
  );
}

export default withRouter(Login);
