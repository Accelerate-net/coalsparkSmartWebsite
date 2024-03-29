import React, { useState } from "react";
import { useStateValue } from "../../contexts/StateProvider";
import { Link, useHistory } from "react-router-dom";
import "./Checkout.css";
import CheckoutProduct from "./CheckoutProduct";
import Subtotal from "./Subtotal";
import BilledItem from "./BilledItem";
import { getBasketTotal } from "../../contexts/reducer";
import emptyCart from "../../assets/imgs/emptycart.png";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const axios = require("axios");

function Checkout() {
  const [{ basket }, dispatch] = useStateValue();
  const history = useHistory();
  const [showP, setShowPrice] = useState(false);
  // const [orderPlaced, setOrder] = useState(false);
  const [cartComm, handleCartComments] = useState("");
  const [enteredPeerCode, handlePeerCode] = useState("");
  
  const initOldCartItems = () => {
    let oldCartDataTemp = localStorage.getItem("oldCart")
              ? JSON.parse(localStorage.getItem("oldCart"))
              : [];

    return oldCartDataTemp?.map((item, k) => (
      <BilledItem
        key={k}
        itemCode={item.itemCode}
        itemName={item.itemName}
        itemOriginalPrice={item.itemOriginalPrice}
        itemPrice={item.itemPrice}
        itemVeg={item.itemVeg}
        itemCount={item.itemCount}
        customOpt={item.itemOptions}
        customVariant={item.customVariant}
        isCustom={item.isCustom}
        orderPersonLabel={item.orderPersonLabel}
        orderPersonMobile={item.orderPersonMobile}
      />
    ));
  }

  const initCancelledCartItems = () => {
    let cancelledCartDataTemp = localStorage.getItem("cancelledCart")
              ? JSON.parse(localStorage.getItem("cancelledCart"))
              : [];

    return cancelledCartDataTemp?.map((item, k) => (
      <BilledItem
        key={k}
        itemCode={item.itemCode}
        itemName={item.itemName}
        itemOriginalPrice={item.itemOriginalPrice}
        itemPrice={item.itemPrice}
        itemVeg={item.itemVeg}
        itemCount={item.itemCount}
        customOpt={item.itemOptions}
        customVariant={item.customVariant}
        isCustom={item.isCustom}
        orderPersonLabel={item.orderPersonLabel}
        orderPersonMobile={item.orderPersonMobile}
      />
    ));
  }

  const [billedItem, handleOrderCartContents] = useState(() => {
      return initOldCartItems();
  });

  const [cancelledItem, handleCancelledCartContents] = useState(() => {
      return initCancelledCartItems();
  });

  const renderOldOrderItems = () => {
      let oldCartData = localStorage.getItem("oldCart")
                ? JSON.parse(localStorage.getItem("oldCart"))
                : [];
      let billedItemTemp = oldCartData?.map((item, k) => (
        <BilledItem
          key={k}
          itemCode={item.itemCode}
          itemName={item.itemName}
          itemOriginalPrice={item.itemOriginalPrice}
          itemPrice={item.itemPrice}
          itemVeg={item.itemVeg}
          itemCount={item.itemCount}
          customOpt={item.itemOptions}
          customVariant={item.customVariant}
          isCustom={item.isCustom}
          orderPersonLabel={item.orderPersonLabel}
          orderPersonMobile={item.orderPersonMobile}
        />
      ));
      handleOrderCartContents(billedItemTemp);
  }

  const renderCancelledOrderItems = () => {
      let cancelledCartData = localStorage.getItem("cancelledCart")
                ? JSON.parse(localStorage.getItem("cancelledCart"))
                : [];
      let cancelledItemTemp = cancelledCartData?.map((item, k) => (
        <BilledItem
          key={k}
          itemCode={item.itemCode}
          itemName={item.itemName}
          itemOriginalPrice={item.itemOriginalPrice}
          itemPrice={item.itemPrice}
          itemVeg={item.itemVeg}
          itemCount={item.itemCount}
          customOpt={item.itemOptions}
          customVariant={item.customVariant}
          isCustom={item.isCustom}
          orderPersonLabel={item.orderPersonLabel}
          orderPersonMobile={item.orderPersonMobile}
        />
      ));
      handleCancelledCartContents(cancelledItemTemp);
  }


  let oldTotal = 0;
  let getOldCart = [];
  getOldCart = localStorage.getItem("oldCart")
    ? JSON.parse(localStorage.getItem("oldCart"))
    : [];

  getOldCart.map((total) => {
    oldTotal = oldTotal + parseInt(total.itemPrice);
  });

  /******************** 
    COMMON FUNCTIONS 
  *********************/

  const showToast = (message, type) => {
    switch (type) {
      case "error": {
        toast.error(message);
        break;
      }
      case "warning": {
        toast.warning(message);
        break;
      }
      default: {
        toast.info(message);
        break;
      }
    }
  };

  const showDefaultErrorPage = (message) => {
    history.push("/*");
  };

  function forceClearLocalStorage() {
    let tempUser = localStorage.getItem("userValidatedData");
    let tempTimer = localStorage.getItem("loggedInSince");
    localStorage.clear();
    localStorage.setItem("userValidatedData", tempUser);
    localStorage.setItem("loggedInSince", tempTimer);
  }

  function showLoadingScreenFreeze() {
    document.getElementById("apiLoaderModalWidget").classList.remove("hidden");
  }

  function hideLoadingScreenFreeze() {
    document.getElementById("apiLoaderModalWidget").classList.add("hidden");
  }

  const handleCartComment = (e) => {
    let userFeed = e.target.value;
    handleCartComments(userFeed);
  };


  // Enter Peer Code
  function showPeerCode(peerCodeText) {
    let ele = document.getElementById("peerCodeFormSection");
    ele.classList.remove("close");
    ele.classList.add("open");
    document.getElementById("peerCodeBox1").value = "";
    document.getElementById("peerCodeBox2").value = "";
    document.getElementById("peerCodeBox3").value = "";
    document.getElementById("peerCodeBox4").value = "";
    document.getElementById("peerCodeBox1").focus();

    if(peerCodeText != null && peerCodeText != ""){
      document.getElementById("peerCodeLabel").innerHTML = peerCodeText;
    }
    else{
      document.getElementById("peerCodeLabel").innerHTML = 'An order is already in progress. Enter peer code.'
    }
  }

  function hidePeerCode() {
    let ele = document.getElementById("peerCodeFormSection");
    ele.classList.remove("open");
    ele.classList.add("close");
  }





  let overallCart = getOldCart && getOldCart != null && getOldCart != "" ? basket.concat(getOldCart) : basket;
  let itemsTotal = getBasketTotal(overallCart);
  let urlParams = localStorage.getItem("metaData")
    ? JSON.parse(localStorage.getItem("metaData"))
    : {};
  if (
    !urlParams.branchCode ||
    !urlParams.tableNumber ||
    !urlParams.qrCodeReference ||
    !urlParams.mode
  ) {
    history.push("*");
  }

  let getActiveStatus = localStorage.getItem("activeStatus")
    ? JSON.parse(localStorage.getItem("activeStatus"))
    : {};

  let oldCartData = localStorage.getItem("oldCart")
    ? JSON.parse(localStorage.getItem("oldCart"))
    : [];

  const newCart = basket?.map((item, k) => (
    <CheckoutProduct
      key={k}
      itemCode={item.itemCode}
      itemName={item.itemName}
      itemOriginalPrice={item.itemOriginalPrice}
      itemPrice={item.itemPrice}
      itemVeg={item.itemVeg}
      itemCount={item.itemCount}
      customOpt={item.itemOptions}
      customVariant={item.customVariant}
      isCustom={item.isCustom}
    />
  ));

  // var billedItem = oldCartData?.map((item, k) => (
  //   <BilledItem
  //     key={k}
  //     itemCode={item.itemCode}
  //     itemName={item.itemName}
  //     itemOriginalPrice={item.itemOriginalPrice}
  //     itemPrice={item.itemPrice}
  //     itemVeg={item.itemVeg}
  //     itemCount={item.itemCount}
  //     customOpt={item.itemOptions}
  //     customVariant={item.customVariant}
  //     isCustom={item.isCustom}
  //     orderPersonLabel={item.orderPersonLabel}
  //     orderPersonMobile={item.orderPersonMobile}
  //   />
  // ));




  function showPrice() {
    setShowPrice(!showP);
  }

  function formatCart(cartData) {
    let formattedCart = [];
    for (let i = 0; i < cartData.length; i++) {
      let formattedItem = {
        name: cartData[i].itemName,
        code: cartData[i].itemCode,
        price: cartData[i].itemOriginalPrice,
        qty: cartData[i].itemCount,
        variant: cartData[i].customVariant ? cartData[i].customVariant : "",
      };
      formattedCart.push(formattedItem);
    }

    return formattedCart;
  }

  function placeOrder(optionalPeerCode) {
    let userData = localStorage.getItem("userValidatedData")
      ? JSON.parse(localStorage.getItem("userValidatedData"))
      : {};
    let metaData = localStorage.getItem("metaData")
      ? JSON.parse(localStorage.getItem("metaData"))
      : {};
    let cartData = localStorage.getItem("cartItem")
      ? JSON.parse(localStorage.getItem("cartItem"))
      : [];

    if (cartData.length < 1) {
      showToast("Add some items before placing the order", "warning");
      return;
    }

    let activeStatusData = localStorage.getItem("activeStatusData")
      ? JSON.parse(localStorage.getItem("activeStatusData"))
      : {};
    let masterOrderId = "";
    if (activeStatusData.status == "active") {
      masterOrderId = activeStatusData.masterOrderId;
    }

    let peerData = localStorage.getItem("peerData")
      ? JSON.parse(localStorage.getItem("peerData"))
      : {};

    const orderData = {
      cart: formatCart(cartData),
      mode: metaData.mode,
      branchCode: metaData.branchCode,
      comments: cartComm,
      qrCodeReference: metaData.qrCodeReference,
      tableNumber: metaData.tableNumber,
      userMobile: userData.mobile,
      token: userData.token,
      masterOrderId: masterOrderId,
      peerCode: optionalPeerCode && optionalPeerCode != null && optionalPeerCode != undefined && optionalPeerCode != "0000" ? optionalPeerCode : peerData.peerCode
    };

    const order_api_options = {
      method: "post",
      url: "https://accelerateengine.app/smart-menu/apis/createorder.php",
      data: orderData,
      timeout: 10000,
    };

    showLoadingScreenFreeze();
    axios(order_api_options)
      .then(function (response) {
        hideLoadingScreenFreeze();
        if (response.data.status) {
          let timeLeft = response.data.servingTime;
          let optionalPeerCode = response.data.masterPeerCode && response.data.masterPeerCode != null && response.data.masterPeerCode != "" ? "&peerCode=" + response.data.masterPeerCode : "";

          const redirect_url =
            "./success?timeleft=" +
            timeLeft +
            "&branchCode=" +
            metaData.branchCode +
            "&tableNumber=" +
            metaData.tableNumber + optionalPeerCode +
            "&qrCodeReference=" +
            metaData.qrCodeReference +
            "&mode=" +
            metaData.mode +
            "&userName=" +
            userData.name +
            "&userMobile=" +
            userData.mobile;
          forceClearLocalStorage();
          dispatch({
            type: "CLEAN_BASKET",
          });
          history.push(redirect_url);
        } else {
          let errorString = response.data.error;
          let errorCheckFailed = errorString.startsWith("An order is already in progress on this table. Please enter the peer code from") || errorString.startsWith("Incorrect peer code, get the 4 digit code from") || errorString.startsWith("You can not modify this table, another order already in progress from");
          
          if(errorCheckFailed){
            //Order failed due to no peer code passed
            showPeerCode(errorString);
          } else {
            showToast("Order Failed - " + response.data.error, "error");
          }
        }
      })
      .catch(function (error) {
        hideLoadingScreenFreeze();
        showToast("Error while placing the order", "error");
      });
  }


  const verifyPeerCode = async (e) => {
    e.preventDefault();

    if(enteredPeerCode.length != 4){
      showToast("Enter valid Peer Code", "info");
      return;
    }

    placeOrder(enteredPeerCode);
    hidePeerCode();
  };

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


  //Format cart back to frontend standard
  function standardiseCart(cart){
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

  const reloadCheckStatus = () => {
    var ele = document.getElementById("refreshCartIconId");
    ele.classList.add("animate__rotateOut");

    let userData = localStorage.getItem("userValidatedData")
      ? JSON.parse(localStorage.getItem("userValidatedData"))
      : {};
    let metaData = localStorage.getItem("metaData")
      ? JSON.parse(localStorage.getItem("metaData"))
      : {};
    let peerData = localStorage.getItem("peerData")
      ? JSON.parse(localStorage.getItem("peerData"))
      : {};
    let optionalPeerCode = peerData.peerCode;

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

    axios.get(status_api_url, status_api_options)
    .then(function (apiResponse) {
        let response = apiResponse.data;
        if (response.status) {
          let activeStatusData = response.data;
          if(activeStatusData != null){
            activeStatusData.cart = standardiseCart(activeStatusData.cart);
            localStorage.setItem("activeStatusData", JSON.stringify(activeStatusData));
            if(activeStatusData.status == "active"){
              localStorage.setItem("oldCart", JSON.stringify(activeStatusData.cart));
              
              let cancelledCart = activeStatusData.cancelledCart && activeStatusData.cancelledCart != null && activeStatusData.cancelledCart != "" ? activeStatusData.cancelledCart : [];
              cancelledCart = cancelledCart != [] ? standardiseCart(cancelledCart) : [];
              localStorage.setItem("cancelledCart", JSON.stringify(cancelledCart));

              //Re-render cart
              renderOldOrderItems();
              renderCancelledOrderItems();
            }
            else{
              localStorage.setItem("oldCart", JSON.stringify([]));
              localStorage.setItem("cancelledCart", JSON.stringify([]));

              //Re-render cart
              renderOldOrderItems();
              renderCancelledOrderItems();
            }
          }
        }
        ele.classList.remove("animate__rotateOut");
    })
    .catch(function (error) {
      showToast("Failed to refresh the cart", "warning");
      ele.classList.remove("animate__rotateOut");
    })

  }

  return (
    <>
      <div className="checkout">
        <nav>
          <Link to="/menu" className="backCartIcon">
            <ion-icon name="arrow-back-outline"></ion-icon>
          </Link>
          <h2 className="checkout__title"> Your Cart</h2>
          <Link to="/checkout" onClick={reloadCheckStatus} className="refreshCartIcon">
            <ion-icon name="refresh-outline" id="refreshCartIconId"></ion-icon>
          </Link>
        </nav>
        {basket?.length === 0 && oldCartData?.length === 0 ? (
          <div className="checkout__Empty">
            <img className="emptyCartIcon" src={emptyCart} alt="Empty Cart" />
            <h2>Your Cart is empty</h2>
          </div>
        ) : (
          <>
            <div>
              {getActiveStatus === "free" ? (
                basket?.map((item, k) => (
                  <CheckoutProduct
                    key={k}
                    itemCode={item.itemCode}
                    itemName={item.itemName}
                    itemOriginalPrice={item.itemOriginalPrice}
                    itemPrice={item.itemPrice}
                    itemVeg={item.itemVeg}
                    itemCount={item.itemCount}
                    customOpt={item.itemOptions}
                    customVariant={item.customVariant}
                    isCustom={item.isCustom}
                  />
                ))
              ) : getActiveStatus === "active" ? (
                <div className="newOld">
                    
                    <div className="newOrderSection">
                      {basket?.length > 0 ? <h3>New Order</h3> : null}
                      {newCart}
                    </div>

                    <div className="activeOrderSection">
                      {billedItem.length > 0 ? (
                        <>
                          <h3>Active Order<span className="activeOrderCheck"> <ion-icon name="checkmark-done-outline"></ion-icon> </span></h3>
                          {billedItem}
                        </>) : null}
                    </div>

                    <div className="cancelledOrderSection">
                      {cancelledItem.length > 0 ? (
                        <>
                          <h3>Cancelled Items<span className="activeOrderCheck"> <ion-icon name="close-outline"></ion-icon></span></h3>
                          {cancelledItem}
                        </>) : null}
                    </div>
                </div>
              ) : null}
            </div>
            <hr />
            {basket?.length > 0 ? (
              <>
                <div className="noteToChef">Any notes to the Chef?</div>
                <div className="commentsWrapper">
                  <form>
                    <input
                      type="text"
                      name="cartComments"
                      placeholder="More sugar, less spice? Your preferences go here."
                      value={cartComm}
                      onChange={(e) => handleCartComment(e)}
                    />
                  </form>
                </div>
              </>
            ) : null}
          </>
        )}
        {basket.length > 0 && (
          <div className="checkout__Total">
            <div className="checkout__Title" onClick={() => showPrice()}>
              <h1>
                Order Summary
                <span style={{ marginLeft: "10px" }}>
                  {showP ? (
                    <ion-icon name="caret-up-outline"></ion-icon>
                  ) : (
                    <ion-icon name="caret-down-outline"></ion-icon>
                  )}
                </span>
              </h1>
              {showP ? null : (
                <p className="orderInfoTotal">
                  <span>{itemsTotal}</span>
                </p>
              )}
            </div>
            {showP ? <Subtotal /> : null}
            <div className="checkoutBtnWrapper">
              <button className="checkoutBtn" onClick={() => placeOrder()}>
                PLACE ORDER
              </button>
            </div>
          </div>
        )}

        <div className="peerCode_Form" id="peerCodeFormSection">
          <div className="login_Title">
            <h3 id="yourDetailsTitle" class="greenPeer">Enter Peer Code</h3>
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
            <span id="otpSubmitText">PLACE ORDER</span>
          </button>
          <p class="resendOTPLabel" id="peerCodeLabel"></p>
          <span id="peerCodeData"></span>
          </form>
        </div>

      </div>
    </>
  );
}

export default Checkout;
