import React, { useState } from "react";
import "./Login.css";
import logo from "../../assets/imgs/logo_white.png";
import man from "../../assets/imgs/man.png";
import lady from "../../assets/imgs/lady.png";
import table from "../../assets/imgs/table.png";
import flower from "../../assets/imgs/flower.png";
import bbq from "../../assets/imgs/bbq.svg";
import spinner from "../../assets/imgs/spinner.svg";
import spinnerRed from "../../assets/imgs/spinner-red.svg";
import { withRouter, useHistory } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const axios = require('axios');

const DEFAULT_SUCCESS_REDIRECT_TIME = 500;

function Login() {
  const [name, handleName] = useState("");
  const [mobile, handleMobile] = useState("");
  const [enteredOTP, handleOTP] = useState("");
  const [enteredPeerCode, handlePeerCode] = useState("");
  const history = useHistory();

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const branchCode = urlParams.get("branchCode");
  const tableNumber = urlParams.get("tableNumber");
  const peerCode = urlParams.get("peerCode") && urlParams.get("peerCode") != "" ? urlParams.get("peerCode") : "0000";
  const qrCodeReference = urlParams.get("qrCodeReference");
  const mode = urlParams.get("mode");
  const userNameRedirect = urlParams.get("userName");
  const userMobileRedirect = urlParams.get("userMobile");
  const showTableSummary = tableNumber != "" && peerCode != "" && peerCode != "0000";

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

  const handlePeerCodeBoxInput = (e, boxId) => {
    boxId = parseInt(boxId);

    let current_box = document.getElementById("peerCodeBox"+boxId);
    if(e.key === "Backspace"){
      if(boxId > 1){
        current_box.value = "";
        let previous_box = document.getElementById("peerCodeBox"+(boxId - 1));
        previous_box.focus();
        previous_box.select();
        return;
      }
    }

    let current_value = current_box.value;
    current_value = parseInt(current_value);
    if(current_value >= 0 && current_value <= 9) {
      if(boxId < 4){
        let next_box = document.getElementById("peerCodeBox"+(boxId + 1));
        next_box.select();
        next_box.focus();
      }
      else {
        let otpDigit1 = document.getElementById("peerCodeBox1").value;
        let otpDigit2 = document.getElementById("peerCodeBox2").value;
        let otpDigit3 = document.getElementById("peerCodeBox3").value;
        let otpDigit4 = document.getElementById("peerCodeBox4").value;

        otpDigit1 = parseInt(otpDigit1);
        otpDigit2 = parseInt(otpDigit2);
        otpDigit3 = parseInt(otpDigit3);
        otpDigit4 = parseInt(otpDigit4);

        var valid_digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        let formattedOTP;
        if(valid_digits.includes(otpDigit1) && valid_digits.includes(otpDigit2) && valid_digits.includes(otpDigit3) && valid_digits.includes(otpDigit4)){
          formattedOTP = otpDigit1 +''+ otpDigit2 +''+ otpDigit3 +''+ otpDigit4;
        }
        else {
          showToast("Something is wrong, please try again.");
          return;
        }
        
        handlePeerCode(formattedOTP);
        
        setTimeout(function(){
          document.getElementById("peerCodeSubmitButton").click();
        }, 200);
      }
    }
    else {
      current_box.select();
      current_box.focus();
    }
  }

  const handleOTPBoxInput = (e, boxId) => {
    boxId = parseInt(boxId);

    let current_box = document.getElementById("otpBox"+boxId);
    if(e.key === "Backspace"){
      if(boxId > 1){
        current_box.value = "";
        let previous_box = document.getElementById("otpBox"+(boxId - 1));
        previous_box.focus();
        previous_box.select();
        return;
      }
    }

    let current_value = current_box.value;
    current_value = parseInt(current_value);
    if(current_value >= 0 && current_value <= 9) {
      if(boxId < 4){
        let next_box = document.getElementById("otpBox"+(boxId + 1));
        next_box.select();
        next_box.focus();
      }
      else {
        let otpDigit1 = document.getElementById("otpBox1").value;
        let otpDigit2 = document.getElementById("otpBox2").value;
        let otpDigit3 = document.getElementById("otpBox3").value;
        let otpDigit4 = document.getElementById("otpBox4").value;

        otpDigit1 = parseInt(otpDigit1);
        otpDigit2 = parseInt(otpDigit2);
        otpDigit3 = parseInt(otpDigit3);
        otpDigit4 = parseInt(otpDigit4);

        var valid_digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        let formattedOTP;
        if(valid_digits.includes(otpDigit1) && valid_digits.includes(otpDigit2) && valid_digits.includes(otpDigit3) && valid_digits.includes(otpDigit4)){
          formattedOTP = otpDigit1 +''+ otpDigit2 +''+ otpDigit3 +''+ otpDigit4;
        }
        else {
          showToast("Something is wrong, please try again.");
          return;
        }
        
        handleOTP(formattedOTP);
        
        setTimeout(function(){
          document.getElementById("otpSubmitButton").click();
        }, 200);
      }
    }
    else {
      current_box.select();
      current_box.focus();
    }
  }

  const handleNameInput = (e) => {
    let userName = e.target.value;
    handleName(userName);
  };

  const handleNumInput = (e) => {
    let userNum = e.target.value;
    if (userNum.length === 10) {
      document.getElementById("usernameField").focus();
      
      const user_api_url = "https://accelerateengine.app/smart-menu/apis/checkuserdetails.php";
      const user_api_options = {
        params : {
          mobile: userNum
        },
        timeout: 10000
      }

      showNameLoading();
      axios.get(user_api_url, user_api_options)
      .then(function (response) {
          hideNameLoading();
          if (response.data.status) {
            let userData = response.data.data;
            document.getElementById("usernameField").value = userData.name;
            handleName(userData.name);
          }
      })
      .catch(function (error) {
        hideNameLoading();
      })
    }

    handleMobile(userNum);
  };

  function slideIn() {
    let ele = document.getElementById("loginFormSection");
    ele.classList.remove("close");
    ele.classList.add("open");
    if (userNameRedirect !== null && userMobileRedirect !== null) {
      setTimeout(function(){
        document.getElementById("usernameField").value = userNameRedirect;
        document.getElementById("usermobileField").value = userMobileRedirect;
        handleName(userNameRedirect);
        handleMobile(userMobileRedirect);
        document.getElementById("usermobileField").focus();
      }, 500);
    }
    else{
      document.getElementById("usermobileField").focus();
    }
  }

  function slideOut() {
    let ele = document.getElementById("loginFormSection");
    ele.classList.remove("open");
    ele.classList.add("close");
  }

  function showOTP() {
    let ele = document.getElementById("otpFormSection");
    ele.classList.remove("close");
    ele.classList.add("open");
    document.getElementById("otpBox1").value = "";
    document.getElementById("otpBox2").value = "";
    document.getElementById("otpBox3").value = "";
    document.getElementById("otpBox4").value = "";
    document.getElementById("otpBox1").focus();
  }

  function hideOTP() {
    let ele = document.getElementById("otpFormSection");
    ele.classList.remove("open");
    ele.classList.add("close");
  }


  function showPeerCode(userData, metaData, maskedNumber) {
    let ele = document.getElementById("peerCodeFormSection");
    ele.classList.remove("close");
    ele.classList.add("open");
    document.getElementById("peerCodeBox1").value = "";
    document.getElementById("peerCodeBox2").value = "";
    document.getElementById("peerCodeBox3").value = "";
    document.getElementById("peerCodeBox4").value = "";
    document.getElementById("peerCodeBox1").focus();

    if(maskedNumber != null && maskedNumber != ""){
      document.getElementById("peerCodeLabel").innerHTML = 'An order is already in progress<br>enter peer code from ' + maskedNumber;
    }
    else{
      document.getElementById("peerCodeLabel").innerHTML = 'Enter Peer Code'
    }

    let peerCodeData = {
      "userData" : userData,
      "metaData" : metaData
    }
    document.getElementById("peerCodeData").innerHTML = JSON.stringify(peerCodeData);
  }

  function hidePeerCode() {
    let ele = document.getElementById("peerCodeFormSection");
    ele.classList.remove("open");
    ele.classList.add("close");
  }

  //Format cart back to frontend standard
  function formatCart(cart){
    let original_menu = {};
    let menuData = localStorage.getItem('menuData') ? JSON.parse(localStorage.getItem('menuData')) : [];
    for(let n = 0; n < menuData.length; n++){
      for(let m = 0; m < menuData[n].menu.length; m++){
        for(let i = 0; i < menuData[n].menu[m].items.length; i++){
          let item = menuData[n].menu[m].items[i];
          original_menu[item.code] = item;
        }
      }
    }

    let formatted_cart = [];
    for(let i = 0; i < cart.length; i++){
      let serverItem = cart[i];
      let originalItem = original_menu[serverItem.code];
      if(!originalItem){
        showToast("System Error - Invalid menu data", "error");
        return [];
      }
      else {
        let formatted_item = {
          itemCode: originalItem.code,
          itemName: originalItem.name,
          customOpt: originalItem.customOptions,
          itemPrice: serverItem.price,
          itemVeg: originalItem.isVeg,
          isCustom: originalItem.isCustomisable,
          itemOptions: originalItem.customOptions,
          itemCount: serverItem.qty,
          orderPersonLabel: serverItem.orderPersonLabel,
          orderPersonMobile: serverItem.orderPersonMobile,
          customVariant: serverItem.variant,
          itemOriginalPrice: serverItem.qty * serverItem.price
        }

        formatted_cart.push(formatted_item);
      }
    }
    return formatted_cart;
  }

  function checkActiveStatus(userData, metaData, optionalPeerCode) {

    /******************************
            CHECK ACTIVE 
    ******************************/
    const status_api_url = "https://accelerateengine.app/smart-menu/apis/checkstatus.php";
    const status_api_options = {
      params : {
        branchCode: metaData.branchCode,
        qrCodeReference: metaData.qrCodeReference,
        userMobile: userData.mobile,
        tableNumber: metaData.tableNumber,
        peerCode: optionalPeerCode && optionalPeerCode != null && optionalPeerCode != "" ? optionalPeerCode : 0
      },
      timeout: 10000
    }

    showLoading();
    axios.get(status_api_url, status_api_options)
    .then(function (apiResponse) {
        let response = apiResponse.data;
        if (response.status) {
          let data = response.data;
          if(data == null){
            showDefaultErrorPage("Unable to fetch the current order status");
            return;
          }

          let getActiveStatus = data.status;
          localStorage.setItem("activeStatus", JSON.stringify(getActiveStatus));
          
          let activeStatusData = data;
          activeStatusData.cart = formatCart(activeStatusData.cart);
          localStorage.setItem("activeStatusData", JSON.stringify(activeStatusData));

          let peerData = response.metaData && response.metaData != null ? response.metaData : {};
          localStorage.setItem("peerData", JSON.stringify(peerData));

          switch(getActiveStatus){
            case "free":{
              setTimeout(() => { history.push("/menu"); }, DEFAULT_SUCCESS_REDIRECT_TIME);
              break;
            }
            case "active":{
              localStorage.setItem("oldCart", JSON.stringify(activeStatusData.cart));
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
          let errorString = response.error;
          let errorCheckFailed = errorString.startsWith("You can not order on this table. Another order already in progress") || errorString.startsWith("Incorrect peer code, get the 4 digit code from");
          if(!optionalPeerCode && errorString && errorString != null && errorCheckFailed){
            //Enter Peer Code to continue
            var results = errorString.split(" ");
            showPeerCode(userData, metaData, results[results.length - 1]);
            return;
          }
          showDefaultErrorPage();
          showToast(response.error != "" ? response.error : "Something went wrong, please try again.", "error");
        }
    })
    .catch(function (error) {
      showDefaultErrorPage();
      showToast("Unexpected error occured, please try again.", "error");
    })
  }

  //Main Loader
  function showLoading(){
    document.getElementById("loadingSpinnerSection").classList.remove("hidden");
  }
  function hideLoading(){
    document.getElementById("loadingSpinnerSection").classList.add("hidden");
  }

  //Check User Loader
  function showNameLoading(){
    document.getElementById("nameModalSection").classList.remove("hidden");
  }
  function hideNameLoading(){
    document.getElementById("nameModalSection").classList.add("hidden");
  }

  //OTP Loader
  function showOTPLoading(){
    document.getElementById("otpSubmitButton").disabled = true;
    document.getElementById("otpSubmitSpinner").classList.remove("hidden");
  }
  function hideOTPLoading(){
    document.getElementById("otpSubmitButton").disabled = false;
    document.getElementById("otpSubmitSpinner").classList.add("hidden");
  }


  let resendIntervalTimer;

  function resendOTP(){
    processMobileAndName();
  }

  const processMobileAndName = async (e) => {
    
    if(e){
      e.preventDefault();
    }

    //Validate Mobile and Name
    if(mobile.length != 10){
      showToast("Enter your 10 digit mobile number", "info");
      return;
    }

    if(name.length < 3){
      showToast("Please enter your name", "info");
      return;
    }


    function isLoginExpired(mobile){
      if(!mobile || mobile == ""){
        return true;
      }

      let userData = localStorage.getItem("userValidatedData") ? JSON.parse(localStorage.getItem("userValidatedData")) : {}
      if(userData.mobile != mobile){
        return true;
      }


      let lastStamp = localStorage.getItem("loggedInSince");
      let difference = (Date.now() - lastStamp) / 1000; //Seconds
      const EXPIRY_MINUTES = 3 * 60 * 60; //3 hours
      return difference > EXPIRY_MINUTES;
    }

    
    /******************************
              USER LOGIN
    ******************************/
    const login_api_data = {
      mobile: mobile,
      name: name,
      branch: branchCode
    }

    showNameLoading();
    axios({
      method: 'post',
      url: "https://accelerateengine.app/smart-menu/apis/userlogin.php",
      data: login_api_data,
      timeout: 10000
    })
    .then(function (response) {
        hideNameLoading();
        if (response.data.status) {
          slideOut();
          document.getElementById("startOrderButton").style.visibility = 'hidden';

          let userValidatedDataCache = localStorage.getItem("userValidatedData");
          if(userValidatedDataCache && userValidatedDataCache != "" && !isLoginExpired(mobile)){
            preloadDetails();
            return;
          }

          showOTP();

          //Resend OTP after 60 seconds
          setTimeout(function(){
            let resendOTPCounter = response.data.timeleft != null ? response.data.timeleft : 60;
            var x = document.getElementById("resendOTPLabel");

            resendIntervalTimer = setInterval(function(){
              resendOTPCounter--;
              if(resendOTPCounter < 1){
                x.innerHTML = 'Resend OTP Now';
                clearInterval(resendIntervalTimer);
              }
              else {
                x.innerHTML = 'Resend OTP in '+resendOTPCounter+'s';
              }
            }, 1000);

          }, 500);
          
        } else {
          showToast("Failed - " + response.data.error, "warning");
        }
    })
    .catch(function (error) {
      hideNameLoading();
      showToast("Error in fetching user details", "error");
    })   
  };


  //Move to cookies later
  function startUserMonitoring(){
    localStorage.setItem("loggedInSince", Date.now());
  }

  const verifyPeerCode = async (e) => {
    e.preventDefault();

    if(enteredPeerCode.length != 4){
      showToast("Enter valid Peer Code", "info");
      return;
    }

    var peerCodeData = document.getElementById("peerCodeData").innerHTML;
    var restoredData = peerCodeData ? JSON.parse(peerCodeData) : {};
    checkActiveStatus(restoredData.userData, restoredData.metaData, enteredPeerCode);
    hidePeerCode();
  };


  const verifyOTP = async (e) => {
    e.preventDefault();

    if(enteredOTP.length != 4){
      showToast("Enter valid OTP", "info");
      return;
    }

    /******************************
            VALIDATE LOGIN
    ******************************/
    const validation_api_data = {
      mobile: mobile,
      name: name,
      branch: branchCode,
      otp: enteredOTP
    }

    showOTPLoading();
    axios({
      method: 'post',
      url: "https://accelerateengine.app/smart-menu/apis/validatelogin.php",
      data: validation_api_data,
      timeout: 10000
    })
    .then(function (response) {
        hideOTPLoading();
        if (response.data.status) {
          clearInterval(resendIntervalTimer);
          hideOTP();

          localStorage.setItem("userValidatedData", JSON.stringify(response.data.response));
          startUserMonitoring();

          //Go to preloading data
          preloadDetails();
        } else {
          showToast("Validation Failed - " + response.data.error, "warning");
        }
    })
    .catch(function (error) {
      hideOTPLoading();
      showToast("Error in validating OTP", "error");
    })
  };


  function preloadDetails(){

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

    let userValidatedData = localStorage.getItem("userValidatedData") ? JSON.parse(localStorage.getItem("userValidatedData")) : {};

    /******************************
              LOAD MENU 
    ******************************/

    const menu_api_data = {
      branchCode: metaData.branchCode,
      token: userValidatedData.token,
    }

    showLoading();
    axios({
      method: 'post',
      url: "https://accelerateengine.app/smart-menu/apis/menu.php",
      data: menu_api_data,
      timeout: 10000
    })
    .then(function (response) {
        hideLoading();
        if (response.status) {
          let data = response.data;
          localStorage.setItem("outletData", JSON.stringify(data.outletData));

          let menuData = data.menuData;
          menuData.sort((a, b) => a.rank - b.rank);
          localStorage.setItem("menuData", JSON.stringify(menuData));

          localStorage.setItem("metaData", JSON.stringify(metaData));

          //Check active status on the table
          checkActiveStatus(userData, metaData, peerCode);

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

  }


  return (
    <div className="login">
      <div className="login__Bg">
        <div className="touchNone" onClick={slideOut}></div>
        <div className="login__LogoWrapper animate__animated animate__fadeInDownBig">
          <img src={logo} alt="Zaitoon Logo" />
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
        {showTableSummary ? (<div className="loadingPageTableSummary">Table <b>{tableNumber}</b><i class="fa fa-circle"></i>Peer Code <b>{peerCode}</b></div>) : (<span></span>)}
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
      <div className="login_Form" id="loginFormSection">
        <div className="login_Title">
          <h3 id="yourDetailsTitle">Your Details<span id="nameModalSection" className="modalLoadingSection hidden"><img src={spinnerRed}/></span></h3>
        </div>
        <form action="" onSubmit={(e) => processMobileAndName(e)}>
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
            className="userName"
            value={name}
            placeholder="Your Name"
            onChange={(e) => handleNameInput(e)}
          />
          <button type="submit">CONTINUE</button>
        </form>
      </div>

      <div className="login_Form" id="otpFormSection">
        <div className="login_Title">
          <h3 id="yourDetailsTitle">One Time Password</h3>
        </div>
        <form action="" onSubmit={(e) => verifyOTP(e)}>
          <div className="otpBoxContainer">
            <input
              type="tel"
              className="otpBox"
              id="otpBox1"
              placeholder="•"
              maxLength="1"
              onKeyUp={(e) => handleOTPBoxInput(e, '1')}
              required
            />
            <input
              type="tel"
              className="otpBox"
              id="otpBox2"
              placeholder="•"
              maxLength="1"
              onKeyUp={(e) => handleOTPBoxInput(e, '2')}
              required
            />
            <input
              type="tel"
              className="otpBox"
              id="otpBox3"
              placeholder="•"
              maxLength="1"
              onKeyUp={(e) => handleOTPBoxInput(e, '3')}
              required
            />
            <input
              type="tel"
              className="otpBox"
              id="otpBox4"
              placeholder="•"
              maxLength="1"
              onKeyUp={(e) => handleOTPBoxInput(e, '4')}
              required
            />
          </div>
          <button type="submit" id="otpSubmitButton">
            <span id="otpSubmitText">PROCEED</span>
            <span id="otpSubmitSpinner" className="hidden"><img src={spinner} alt="Loader"/></span>
          </button>
          <p id="resendOTPLabel" onClick={resendOTP}>Resend OTP</p>
        </form>
      </div>


      <div className="login_Form" id="peerCodeFormSection">
        <div className="login_Title">
          <h3 id="yourDetailsTitle" class="greenPeer">Peer Code</h3>
        </div>
        <form action="" onSubmit={(e) => verifyPeerCode(e)}>
          <div className="otpBoxContainer green">
            <input
              type="tel"
              className="otpBox green"
              id="peerCodeBox1"
              placeholder="•"
              maxLength="1"
              onKeyUp={(e) => handlePeerCodeBoxInput(e, '1')}
              required
            />
            <input
              type="tel"
              className="otpBox green"
              id="peerCodeBox2"
              placeholder="•"
              maxLength="1"
              onKeyUp={(e) => handlePeerCodeBoxInput(e, '2')}
              required
            />
            <input
              type="tel"
              className="otpBox green"
              id="peerCodeBox3"
              placeholder="•"
              maxLength="1"
              onKeyUp={(e) => handlePeerCodeBoxInput(e, '3')}
              required
            />
            <input
              type="tel"
              className="otpBox green"
              id="peerCodeBox4"
              placeholder="•"
              maxLength="1"
              onKeyUp={(e) => handlePeerCodeBoxInput(e, '4')}
              required
            />
          </div>
          <button type="submit" id="peerCodeSubmitButton" class="greenPeerBg">
            <span id="otpSubmitText">CONFIRM</span>
          </button>
          <p class="resendOTPLabel" id="peerCodeLabel"></p>
          <span id="peerCodeData"></span>
        </form>
      </div>

    </div>
  );
}

export default withRouter(Login);
