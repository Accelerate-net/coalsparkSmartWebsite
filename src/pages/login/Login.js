import React, { useState } from "react";
import "./Login.css";
import logo from "../../assets/imgs/logo_white.png";
import man from "../../assets/imgs/man.png";
import lady from "../../assets/imgs/lady.png";
import table from "../../assets/imgs/table.png";
import flower from "../../assets/imgs/flower.png";
import bbq from "../../assets/imgs/bbq.svg";
import spinner from "../../assets/imgs/spinner.svg";
import { withRouter, useHistory } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const axios = require('axios');

const DEFAULT_SUCCESS_REDIRECT_TIME = 500;

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
  const userNameRedirect = urlParams.get("userName");
  const userMobileRedirect = urlParams.get("userMobile");

  if (!branchCode || !tableNumber || !qrCodeReference || !mode) {
    history.push("*");
  }

  /******************** 
    COMMON FUNCTIONS 
  *********************/

  const showToast = (message, type) => {
      switch(type){
        case "error":{
          toast.error(message);
          break;
        }
        case "warning":{
          toast.warning(message);
          break;
        }
        default:{
          toast.info(message);
          break;
        }
      }
  };

  const showDefaultErrorPage = (message) => {
    history.push("/*");
  }




  const handleNameInput = (e) => {
    let userName = e.target.value;
    handleName(userName);
  };

  const handleNumInput = (e) => {
    let userNum = e.target.value;
    if (userNum.length === 10) {
      document.getElementById("usernameField").focus();
      fetch(
        "https://accelerateengine.app/smart-menu/apis/checkuserdetails.php?mobile=" +
          userNum
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.status) {
            document.getElementById("usernameField").value = data.data.name;
            handleName(data.data.name);
          }
        });
    }

    handleMobile(userNum);
  };

  function slideIn() {
    let ele = document.getElementsByClassName("login_Form")[0];
    ele.classList.remove("close");
    ele.classList.add("open");
    if (userNameRedirect !== null && userMobileRedirect !== null) {
      setTimeout(function(){
        document.getElementById("usernameField").value = userNameRedirect;
        document.getElementById("usermobileField").value = userMobileRedirect;
        handleName(userNameRedirect);
        handleMobile(userMobileRedirect);
        document.getElementById("usermobileField").focus();
      }, 1500);
    }
    else{
      document.getElementById("usermobileField").focus();
    }
  }

  function slideOut() {
    let ele = document.getElementsByClassName("login_Form")[0];
    ele.classList.remove("open");
    ele.classList.add("close");
  }

  function checkActiveStatus(userData, metaData) {

    /******************************
            CHECK ACTIVE 
    ******************************/
    const status_api_url = "https://accelerateengine.app/smart-menu/apis/checkstatus.php";
    const status_api_options = {
      params : {
        branchCode: metaData.branchCode,
        qrCodeReference: metaData.qrCodeReference,
        userMobile: userData.mobile,
        tableNumber: metaData.tableNumber
      },
      timeout: 10000
    }

    showLoading();
    axios.get(status_api_url, status_api_options)
    .then(function (apiResponse) {
        let response = apiResponse.data;
        if (response.status) {
          let data = response.data;
          
          if(!data){
            showDefaultErrorPage();
          }

          let getActiveStatus = data.status;
          localStorage.setItem("activeStatus", JSON.stringify(getActiveStatus));
          localStorage.setItem("activeStatusData", JSON.stringify(data));

          switch(getActiveStatus){
            case "free":{
              setTimeout(() => { history.push("/menu"); }, DEFAULT_SUCCESS_REDIRECT_TIME);
              break;
            }
            case "active":{
              localStorage.setItem("oldCart", JSON.stringify(data.cart));
              setTimeout(() => { history.push("/menu"); }, DEFAULT_SUCCESS_REDIRECT_TIME);
              break;
            }
            case "billed":{
              setTimeout(() => { history.push("/invoice"); }, DEFAULT_SUCCESS_REDIRECT_TIME);
              break;
            }
            default:{
              setTimeout(() => { history.push("/*"); }, DEFAULT_SUCCESS_REDIRECT_TIME);
              break;
            }
          }
        }
        else{
          showDefaultErrorPage();
          showToast("Something went wrong, please try again.", "error");
        }
    })
    .catch(function (error) {
      showDefaultErrorPage();
      showToast("Unexpected error occured, please try again.", "error");
    })
  }

  function showLoading(){
    document.getElementById("loadingSpinnerSection").classList.remove("hidden");
  }

  function hideLoading(){
    document.getElementById("loadingSpinnerSection").classList.add("hidden");
  }


  const initialiseEverything = async (e) => {
    e.preventDefault();

    //Validate Mobile and Name
    if(mobile.length != 10){
      showToast("Enter your 10 digit mobile number", "info");
      return;
    }

    if(name.length < 3){
      showToast("Please enter your name", "info");
      return;
    }

    slideOut();
    document.getElementById("startOrderButton").style.visibility = 'hidden';

    let userData = {
      name: name,
      mobile: mobile,
    };

    let metaData = {
      branchCode: branchCode,
      tableNumber: tableNumber,
      qrCodeReference: qrCodeReference,
      mode: mode
    };

    localStorage.setItem("userData", JSON.stringify(userData));

    /******************************
              LOAD MENU 
    ******************************/
    const menu_api_url = "https://accelerateengine.app/smart-menu/apis/menu.php";
    const menu_api_options = {
      params : {
        branchCode: metaData.branchCode
      },
      timeout: 10000
    }

    showLoading();
    axios.get(menu_api_url, menu_api_options)
    .then(function (response) {
        hideLoading();
        if (response.status) {
          let data = response.data;
          localStorage.setItem("outletData", JSON.stringify(data.outletData));

          let menuData = data.menuData;
          menuData.sort((a, b) => a.rank - b.rank);
          localStorage.setItem("menuData", JSON.stringify(menuData));

          //Check active status on the table
          checkActiveStatus(userData, metaData);

        } else {
          showToast("Failed to fetch the menu", "warning");
          slideIn();
        }
    })
    .catch(function (error) {
      hideLoading();
      showToast("Error in loading the menu", "error");
      slideIn();
    })    

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
            Oho! This service is available on Mobile only.
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
        <div className="loadingSpinner hidden" id="loadingSpinnerSection">
          <span><img src={spinner}/></span>
        </div>
        <div className="start_btn animate__animated animate__fadeInUp" id="startOrderButton">
          {userNameRedirect === null || userMobileRedirect === null ? (
            <button onClick={slideIn}>Start Ordering</button>
          ) : (
            <button onClick={slideIn}>Continue Ordering</button>
          )}
        </div>
      </div>
      <div className="login_Form">
        <div className="login_Title">
          <h3 id="yourDetailsTitle">Your Details</h3>
        </div>
        <form action="" onSubmit={(e) => initialiseEverything(e)}>
          <input
            type="tel"
            className="userMobile"
            id="usermobileField"
            value={mobile}
            placeholder="Mobile Number"
            maxLength="10"
            onChange={(e) => handleNumInput(e)}
          />
          <input
            type="text"
            id="usernameField"
            minLength="3"
            className="userName"
            value={name}
            placeholder="Your Name"
            onChange={(e) => handleNameInput(e)}
          />
          <button type="submit">CONTINUE</button>
        </form>
      </div>
    </div>
  );
}

export default withRouter(Login);
