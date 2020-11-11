import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/imgs/logo_white.png";
import "./Header.css";

import service_call_steward from "../assets/imgs/services/service-call-steward.svg";
import service_request_bill from "../assets/imgs/services/service-request-bill.svg";
import service_serve_fast from "../assets/imgs/services/service-serve-fast.svg";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const axios = require('axios');

function Header() {
 
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
        case "success":{
          toast.success(message);
          break;
        }
        default:{
          toast.info(message);
          break;
        }
      }
  };

  let getoutletData = localStorage.getItem("outletData")
            ? JSON.parse(localStorage.getItem("outletData"))
            : {};

  function handleRingerPopup() {
    let ele = document.getElementsByClassName("ringerPopup_wrapper")[0];
    ele.classList.remove("close");
    ele.classList.add("open");
    ele.firstChild.classList.remove("close");
    ele.firstChild.classList.add("open");
  }

  function closeRingerPopup() {
    let ele = document.getElementsByClassName("ringerPopup_wrapper")[0];
    ele.firstChild.classList.add("close");
    ele.firstChild.classList.remove("open");
    ele.classList.add("close");
    ele.classList.remove("open");
  }

  function handleOutletPopup() {
    let ele = document.getElementsByClassName("outletPopup_wrapper")[0];
    ele.classList.remove("close");
    ele.classList.add("open");
  }

  function closeOutletPopup() {
    let ele = document.getElementsByClassName("outletPopup_wrapper")[0];
    ele.classList.add("close");
    ele.classList.remove("open");
  }

  function serviceCall(requestType){

    let userData = localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData")) : {};
    let metaData = localStorage.getItem("metaData") ? JSON.parse(localStorage.getItem("metaData")) : {};
    
    const service_api_options = {
      method : "post",
      url : "https://accelerateengine.app/smart-menu/apis/createservicerequest.php",
      data: {
        qrCodeReference: metaData.qrCodeReference,
        userMobile: userData.mobile,
        serviceType: requestType
      },
      timeout: 10000
    }

    axios(service_api_options)
      .then(function (response) {
        if(response.data.status){
          showToast("Your request will be addressed soon.", "success");
        }
        else {
          showToast("Unable to create a request, try again.", "error");
        }
      })
      .catch(function (error) {
        showToast("Unable to create a request, try again.", "error");
      })
  }

  return (
    <nav className="header">
      <img
        className="header__logo"
        src={logo}
        alt="Zaitoon Logo"
      />
      <div className="header__rightSection">
        {/* Search Icon */}
        <Link to="/search">
          <div className="header__search">
            <ion-icon name="search-outline"></ion-icon>
          </div>
        </Link>
        <div className="ringerBell" onClick={handleRingerPopup}>
          <ion-icon name="notifications-outline"></ion-icon>
        </div>
        <div className="homeIcon" onClick={handleOutletPopup}>
          <ion-icon name="home-outline"></ion-icon>
        </div>
        
          <div className="ringerPopup_wrapper" onClick={closeRingerPopup}>
            <div className="ringerPopup_innerWrapper">
              <div className="stewardBtn" onClick={() => serviceCall('CALL_CALL_STEWARD')}>
                <img src={service_call_steward}/>
                <button>Call Steward</button>
              </div>
              <div className="serveBtn" onClick={() => serviceCall('CALL_SERVE_FAST')}>
                <img src={service_serve_fast}/>
                <button>Serve Fast</button>
              </div>
              <div className="billBtn" onClick={() => serviceCall('CALL_REQUEST_BILL')}>
                <img src={service_request_bill}/>
                <button>Request Bill</button>
              </div>
            </div>
          </div>
       
          <div className="outletPopup_wrapper">
            <div className="outletPopup_innerWrapper">
              <nav>
                <div
                  className="outletPopup_closeBtn"
                  onClick={closeOutletPopup}
                >
                  <ion-icon name="close-outline"></ion-icon>
                </div>
                <h1>Zaitoon {getoutletData.name}</h1>
              </nav>

              <div className="outletPopup_imgWrapper">
                <img
                  src={getoutletData.pictures}
                  alt={getoutletData.name + " Branch Restaurant Image"}
                />
              </div>
              <div className="outletPopup_details">
                <div className="outlet__Address">
                  <h3>Address</h3>
                  <div className="address__Lines">
                    <p>{getoutletData.line1}</p>
                    <p>{getoutletData.line2}</p>
                  </div>
                </div>
                <div className="outlet__Mobile">
                  <h3>Manager Number</h3>
                  <p><a href="tel:0{getoutletData.managerContact}">{getoutletData.managerContact}</a><span className="tagName">{getoutletData.managerName}</span></p>
                </div>
                <div className="outlet__openHours">
                  <h3>Operational Hours</h3>
                  <p>{getoutletData.openHours}</p>
                </div>
                <div className="outlet__email">
                  <h3>Guest Relations</h3>
                  <p><a href="mailto:{getoutletData.guestRelationsEmail}">{getoutletData.guestRelationsEmail}</a></p>
                </div>
              </div>
            </div>
          </div>
      </div>
    </nav>
  );
}

export default Header;
