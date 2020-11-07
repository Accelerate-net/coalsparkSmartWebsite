import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/imgs/logo_white.png";
import "./Header.css";
import { useToasts } from "react-toast-notifications";

function Header() {
 
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

  //Toast function
  const { addToast } = useToasts();
  let errorMessage = "Oh snap! There is some error. Try refreshing";
  function showToast() {
    addToast(errorMessage, {
      appearance: "error",
    });
  }

  return (
    <nav className="header">
      <img
        className="header__logo"
        src={logo}
        alt="Zaitoon Logo"
        onClick={showToast}
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
              <div className="stewardBtn">
                <ion-icon name="person-circle-outline"></ion-icon>
                <button>Call Steward</button>
              </div>
              <div className="billBtn">
                <ion-icon name="card-outline"></ion-icon>
                <button>Request Bill</button>
              </div>
              <div className="serveBtn">
                <ion-icon name="speedometer-outline"></ion-icon>
                <button>Serve Fast</button>
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
