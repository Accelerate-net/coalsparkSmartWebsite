import React from "react";
import { useHistory } from "react-router-dom";
import "./Invoice.css";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const axios = require('axios');

const RAZORPAY_PAYMENT_KEY = "";

const DEFAULT_SUCCESS_REDIRECT_TIME = 500;

function Invoice() {
  const history = useHistory();

  let activeStatusData = localStorage.getItem("activeStatusData")
    ? JSON.parse(localStorage.getItem("activeStatusData"))
    : {};

  //Sort by ordered people
  activeStatusData.cart.sort((a, b) => a.orderPersonMobile - b.orderPersonMobile);

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

  function forceClearLocalStorate(){
    localStorage.clear();
  }

  function showLoadingScreenFreeze(){
    document.getElementById("apiLoaderModalWidget").classList.remove("hidden");
  }

  function hideLoadingScreenFreeze(){
    document.getElementById("apiLoaderModalWidget").classList.add("hidden");
  }


  let metaGetData = JSON.parse(localStorage.getItem("metaData"));

  function resultRouteToFeedback() {
    let activeStatusData = localStorage.getItem("activeStatusData")
      ? JSON.parse(localStorage.getItem("activeStatusData"))
      : {};
    let userData = localStorage.getItem("userValidatedData")
      ? JSON.parse(localStorage.getItem("userValidatedData"))
      : {};  
    const redirect_url = "/?token=" + userData.token + "&orderId=" + activeStatusData.masterOrderId;
    window.localStorage.clear();
    history.push("./feedback" + redirect_url);
  }


  const checkActiveStatusAndProceedToPayment = async (e) => {

    e.preventDefault();

    let metaData = localStorage.getItem("metaData") ? JSON.parse(localStorage.getItem("metaData")) : {};
    let userData = localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData")) : {};

    if(metaData == {} || userData == {}){
      showDefaultErrorPage("Order details not found");
      return;
    }


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
        peerCode: 0
      },
      timeout: 10000
    }

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
          if(getActiveStatus != "billed"){
            localStorage.setItem("oldCart", JSON.stringify([]));
            localStorage.setItem("cancelledCart", JSON.stringify([]));
            showToast("Yay! Seems like the bill has been paid already.", "");
            setTimeout(() => { history.push("/*"); }, DEFAULT_SUCCESS_REDIRECT_TIME);
          } else {
            makePaymentNow();
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



  const makePaymentNow = async () => {

    let paymentData = activeStatusData ? activeStatusData.paymentData : {};
    let userData = localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData")) : {};

    if(!paymentData.isOnlinePaymentAllowed){
      showToast("Please pay by Cash or Card", "info");
      return;
    }

    const options = {
      key: paymentData.razorpayKey,
      name: paymentData.razorpayLabel,
      description: paymentData.razorpayDescription,
      order_id: paymentData.paymentOrderId,
      handler: async (response) => {
        try {
           const payment_api_url = "https://accelerateengine.app/smart-menu/apis/capturepayment.php";
           const payment_api_options = {
            paymentOrder: paymentData.paymentOrderId,
            transactionId: response.razorpay_payment_id,
            orderId: activeStatusData.masterOrderId
           }
           const captureResponse = await axios.post(payment_api_url, payment_api_options);
           resultRouteToFeedback();
        } catch (err) {
           showToast("Something is wrong with online payment, please pay by Cash or Card", "error");
           return;
        }
      },
      theme: {
        color: "#e21439",
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  }

  const getOrderedPerson = (orderPersonLabel, orderPersonMobile) => {
    let userData = localStorage.getItem("userValidatedData")
      ? JSON.parse(localStorage.getItem("userValidatedData"))
      : {};
    if(userData.mobile == orderPersonMobile){
      return "You ("+orderPersonLabel+")";
    } 
    return orderPersonLabel;
  }

  return (
    <div className="invoice__Wrapper">
      <nav>
        <h1>
          Your Invoice
          <span className="invoiceNumber">
            <span>Table {activeStatusData.metaData.tableNumber}</span>
            <i class="fa fa-circle"></i>
            <span>#{activeStatusData.masterOrderId}</span>
          </span>
        </h1>
      </nav>
      {activeStatusData.cart !== undefined ? (
        <div className="invoice__detailsWrapper">
        <div className="inoviceProduct">
          {activeStatusData.cart.map((activeCart, k) => (
            <div className="invoiceProduct__info" key={k}>
              <p className="invoiceProduct__title">
                {activeCart.itemName}
                {activeCart.isCustom ? (
                  <>
                    <span
                      className="variantName"
                      style={{ fontSize: "12px", color: "#000" }}
                    >
                      {activeCart.customVariant}
                      {activeCart.orderPersonMobile != '9043960876' ? (<span className="itemDot"><i class="fa fa-circle"></i>{getOrderedPerson(activeCart.orderPersonLabel, activeCart.orderPersonMobile)}</span>) : (<i></i>)}
                      
                    </span>
                  </>
                ) : null}
                {activeCart.isCustom ? null : (
                  <span className="itemDot self">{getOrderedPerson(activeCart.orderPersonLabel, activeCart.orderPersonMobile)}</span>
                )}
              </p>

              <div className="invoice__itemCount">
                <p>x {activeCart.itemCount}</p>
              </div>
              <p className="invoiceProduct__price">
                <span>{activeCart.itemOriginalPrice}</span>
              </p>
            </div>
          ))}
        </div>
        <hr style={{ marginBottom: "1rem" }} />
        <div className="invoiceBillDetailsWrapper">
          <h3 style={{ color: "#e2133a", marginBottom: "20px", fontWeight: 400 }}>
            Invoice Summary / <span style={{fontWeight: 900 }}>#{activeStatusData.paymentData.systemBillNumber}</span>
          </h3>
          <div className="invoiceBillDet">
            <div className="invoicesubTotal">
              <p>Sub Total</p>
              <p className="cartItemPrice">
                {activeStatusData.invoiceDetails.subTotal}
              </p>
            </div>

            <div className="invoiceAdditionalCharges">
              {activeStatusData.invoiceDetails.additionalCharges.taxSlabs.map(
                (modeCheck) =>
                  modeCheck ? (
                    <div className="taxPrice">
                      <p>{modeCheck.label} <span style = {{fontFamily: "roboto", color: "#6e6e6e", fontSize: "11px"}}>({modeCheck.type === "PERCENTAGE" ? <span>{(modeCheck.value*100).toFixed(2)}%</span> : <span className="orderSubTotalAmount">{modeCheck.value}</span>})</span></p>
                      {modeCheck.type === "PERCENTAGE" ? (
                        <p className="tax">{modeCheck.amount}</p>
                      ) : (
                        <p className="tax">{modeCheck.amount}</p>
                      )}
                    </div>
                  ) : null
              )}
              <span></span>
              {activeStatusData.invoiceDetails.additionalCharges.otherCharges.map(
                (modeCheck) =>
                  modeCheck ? (
                    <div className="taxPrice">
                      <p>{modeCheck.label} <span style = {{fontFamily: "roboto", color: "#6e6e6e", fontSize: "11px"}}>({modeCheck.type === "PERCENTAGE" ? <span>{(modeCheck.value*100).toFixed(2)}%</span> : <span className="orderSubTotalAmount">{modeCheck.value}</span>})</span></p>
                      {modeCheck.type === "PERCENTAGE" ? (
                        <p className="tax">{modeCheck.amount}</p>
                      ) : (
                        <p className="tax">{modeCheck.amount}</p>
                      )}
                    </div>
                  ) : null
              )}
              <div className="invoiceDiscount">
                {activeStatusData.invoiceDetails.discounts ? (
                  <div className="taxPrice">
                    <p>{activeStatusData.invoiceDetails.discounts.label}</p>
                    <p className="tax" style={{ color: "#009688" }}>
                      -
                      <span>
                        {activeStatusData.invoiceDetails.discounts.amount}
                      </span>
                    </p>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="invoiceTotal">
              <p>Total</p>
              <p className="toPayTotal">
                <b>{activeStatusData.invoiceDetails.grandTotal}</b>
              </p>
            </div>

            <div className="invoiceBtnWrapper">
              <button className="invoiceBtn" onClick={checkActiveStatusAndProceedToPayment}>
                PROCEED TO PAY <b className="finalAmountToPay">{activeStatusData.invoiceDetails.grandTotal}</b>
              </button>
            </div>
          </div>
        </div>
      </div>
      ):null}
      
    </div>
  );
}

export default Invoice;
