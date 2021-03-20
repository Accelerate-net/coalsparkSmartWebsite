import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/imgs/logo_white.png";
import "./Header.css";

import service_call_steward from "../assets/imgs/services/service-call-steward.svg";
import service_request_bill from "../assets/imgs/services/service-request-bill.svg";
import service_serve_fast from "../assets/imgs/services/service-serve-fast.svg";
import common_cover from "../assets/imgs/cover-common.jpg";

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

  function handlePeerCodePopup() {
    let ele = document.getElementsByClassName("peerCodePopup_wrapper")[0];
    ele.classList.remove("close");
    ele.classList.add("open");
    ele.firstChild.classList.remove("close");
    ele.firstChild.classList.add("open");
  }

  function closePeerCodePopup() {
    let ele = document.getElementsByClassName("peerCodePopup_wrapper")[0];
    ele.firstChild.classList.add("close");
    ele.firstChild.classList.remove("open");
    ele.classList.add("close");
    ele.classList.remove("open");
  }

  function serviceCall(requestType){

    let userData = localStorage.getItem("userValidatedData") ? JSON.parse(localStorage.getItem("userValidatedData")) : {};
    let metaData = localStorage.getItem("metaData") ? JSON.parse(localStorage.getItem("metaData")) : {};
    
    const service_api_options = {
      method : "post",
      url : "https://accelerateengine.app/smart-menu/apis/createservicerequest.php",
      data: {
        qrCodeReference: metaData.qrCodeReference,
        mobile: userData.mobile,
        serviceType: requestType,
        token: userData.token
      },
      timeout: 10000
    }

    axios(service_api_options)
      .then(function (response) {
        if(response.data.status){

          switch(requestType){
            case "CALL_SERVE_FAST":{
              showToast("We are informing the Captain to serve you fast", "info");
              break;
            }
            case "CALL_REQUEST_BILL":{
              showToast("The bill will be generated soon", "info");
              break;
            }
            case "CALL_CALL_STEWARD":{
              showToast("One of the stewards will be attending you soon", "info");
              break;
            }
            default:{
              showToast("Your request will be addressed soon.", "info");
            }
          }

        }
        else {
          showToast("Unable to create a request, try again.", "error");
        }
      })
      .catch(function (error) {
        showToast("Unable to create a request, try again.", "error");
      })
  }

  let coverImage = getoutletData.pictures ? JSON.parse(getoutletData.pictures) : [];
  coverImage = coverImage[0];
  let metaData = localStorage.getItem("metaData") ? JSON.parse(localStorage.getItem("metaData")) : {};
  let activeStatusData = localStorage.getItem("activeStatusData") ? JSON.parse(localStorage.getItem("activeStatusData")) : {};

  if(!coverImage){
    coverImage = common_cover;
  }

  let showPeerCodeButton = activeStatusData ? (activeStatusData.metaData.peerCode && activeStatusData.metaData.peerCode != null && activeStatusData.metaData.peerCode != "0000" ? true : false) : false;

  return (
    <nav className="header">
      <img
        className="header__logo"
        src={logo}
        alt="Zaitoon Logo"
      />

        {showPeerCodeButton ? (<div className="peerCodeIcon" onClick={handlePeerCodePopup}>
                      <ion-icon name="qr-code-outline"></ion-icon>
                      <span>{activeStatusData.metaData.peerCode}</span>
                    </div>) : (<span></span>)}
        

        <div className="header__rightSection">
        {/* Search Icon */}
        <Link to="/search">
          <div className="header__search">
            <ion-icon name="search-outline"></ion-icon>
          </div>
        </Link>
        <div className="ringerBell" onClick={handleRingerPopup}>
          <ion-icon name="hand-left-outline"></ion-icon>
        </div>
        <div className="homeIcon" onClick={handleOutletPopup}>
          <ion-icon name="information-circle-outline"></ion-icon>
        </div>
        
          <div className="ringerPopup_wrapper" onClick={closeRingerPopup}>
            <div className="ringerPopup_innerWrapper">
                <h2>Service Request</h2>
                <div className="serviceRequestButtons">
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
          </div>

          <div className="peerCodePopup_wrapper" onClick={closePeerCodePopup}>
            <div className="peerCodePopup_innerWrapper">
              <div class="peerCodePopup_innerWrapper_Content">
                <h2>Peer Code on Table <b>{metaData.tableNumber}</b></h2>
                <h1>{activeStatusData.metaData.peerCode}</h1>
                <p>Share this code with your peers<br></br>for them to modify the order on this table</p>
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
                  src={coverImage}
                  alt={"Zaitoon "+getoutletData.name}
                />
              </div>
              <div className="outletPopup_details">
                <div className="outlet__Address">
                  <h3>Address</h3>
                  <div className="address__Lines">
                    <p>{getoutletData.addressLine1}</p>
                    <p>{getoutletData.addressLine2}</p>
                    <p>{getoutletData.city}</p>
                  </div>
                </div>
                <div className="outlet__Mobile">
                  <h3>Manager Number</h3>
                  <p><a href="tel:0{getoutletData.managerContactNumber}">{getoutletData.managerContactNumber}</a><span className="tagName">{getoutletData.managerName}</span></p>
                </div>
                <div className="outlet__openHours">
                  <h3>Operational Hours</h3>
                  {
                    getoutletData.openHours.map((openSlot) => (
                      <div className="openSlot">
                        <p className="openSlotTime">{openSlot.from + " - " + openSlot.to}</p> <p className="openSlotLabel">{openSlot.label}</p>
                      </div>
                    ))
                  }
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
