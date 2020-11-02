import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/imgs/logo-red.png";
import "./Header.css";
import { useToasts } from "react-toast-notifications";
// import { useStateValue } from "../contexts/StateProvider";
// import { getItemCount } from "../contexts/reducer";

function Header({ outletData }) {
  // const [{ basket }] = useStateValue();
  // let itemc = getItemCount(basket);
  const [ringerPopup, setPopupRinger] = useState(false);
  const [outletPopupState, setOutletPopup] = useState(false);

  function handleOutletDetails() {
    setOutletPopup(!outletPopupState);
  }

  function handleRingerPopup() {
    setPopupRinger(!ringerPopup);
  }

  function closeRingerPopup() {
    setPopupRinger(!ringerPopup);
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
      {/* Zaitoon text on left*/}
      {/* <h1 className="header__logo">Zaitoon</h1> */}
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
        <div className="homeIcon" onClick={handleOutletDetails}>
          <ion-icon name="home-outline"></ion-icon>
        </div>
        {/* Cart icon with number*/}
        {/* <Link to="/checkout">
          <div className="header__cart">
            <ion-icon name="restaurant-outline"></ion-icon>
            <div className="header__dot"></div>
            <span className="header__cartValue">{itemc}</span>
          </div>
        </Link> */}
        {ringerPopup ? (
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
        ) : null}
        {outletPopupState ? (
          <div className="outletPopup_wrapper">
            <div className="outletPopup_innerWrapper">
              <nav>
                <div
                  className="outletPopup_closeBtn"
                  onClick={handleOutletDetails}
                >
                  <ion-icon name="close-outline"></ion-icon>
                </div>
                <h1>Branch Details</h1>
              </nav>

              <div className="outletPopup_imgWrapper">
                <img
                  src={outletData.pictures}
                  alt={outletData.name + " Branch Restaurant Image"}
                />
              </div>
              <div className="outletPopup_details">
                <div className="outlet__Name">
                  <h3>Branch Name: </h3>
                  <p>{outletData.name}</p>
                </div>
                <div className="outlet__Address">
                  <h3>Address: </h3>
                  <div className="address__Lines">
                    <p>{outletData.line1}</p>
                    <p>{outletData.line2}</p>
                  </div>
                </div>
                <div className="outlet__Mobile">
                  <h3>Mobile Number: </h3>
                  <p>{outletData.mobile}</p>
                </div>
                <div className="outlet__openHours">
                  <h3>Open Hours: </h3>
                  <p>{outletData.openHours}</p>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </nav>
  );
}

export default Header;
