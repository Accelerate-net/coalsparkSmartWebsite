import React from "react";
import { useHistory } from "react-router-dom";
import "./Invoice.css";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const axios = require('axios');

const RAZORPAY_PAYMENT_KEY = "";

function Invoice() {
  const history = useHistory();

  let activeStatusData = localStorage.getItem("activeStatusData")
    ? JSON.parse(localStorage.getItem("activeStatusData"))
    : {};

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

  function resultRoute() {
    window.localStorage.clear();
    history.push("./feedback");
  }


  const makePaymentNow = async (e) => {

    e.preventDefault();

    let paymentData = activeStatusData ? activeStatusData.paymentData : {};
    let userData = localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData")) : {};

    if(!paymentData.isOnlinePaymentAllowed){
      showToast("Please pay by Cash", "info");
      return;
    }

    const options = {
      key: paymentData.razorpayKey,
      name: paymentData.razorpayLabel,
      description: paymentData.razorpayDescription,
      // order_id: paymentData.paymentOrderId,
      handler: async (response) => {
        try {
           const payment_api_url = "https://accelerateengine.app/smart-menu/apis/capturepayment.php";
           const payment_api_options = {
              paymentId : response.razorpay_payment_id
           }
           const captureResponse = await axios.post(payment_api_url, payment_api_options)
           console.log(captureResponse.data);
        } catch (err) {
           console.log(err);
        }
      },
      theme: {
        color: "#e21439",
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();


return;
    // if(cartData.length < 1){
    //   showToast("Add some items before placing the order", "warning");
    //   return;
    // }

    // const orderData = {
    //   cart: cartData,
    //   mode: metaData.mode,
    //   branchCode: metaData.branchCode,
    //   comments: cartComm,
    //   qrCodeReference: metaData.qrCodeReference,
    //   tableNumber: metaData.tableNumber,
    //   userMobile: userData.mobile
    // }
    
    // const payment_api_options = {
    //   method : "post",
    //   url : "https://accelerateengine.app/smart-menu/apis/makepayment.php",
    //   data: orderData,
    //   timeout: 10000
    // }

    // showLoadingScreenFreeze();
    // axios(payment_api_options)
    //   .then(function (response) {
    //     hideLoadingScreenFreeze();
    //     if(response.data.status){
    //       let timeLeft = response.data.servingTime;
    //       const redirect_url = "./success?timeleft=" + timeLeft + "&branchCode=" + metaData.branchCode + "&tableNumber=" + metaData.tableNumber + "&qrCodeReference=" + metaData.qrCodeReference + "&mode=" + metaData.mode + "&userName=" + userData.name + "&userMobile=" + userData.mobile;
    //       forceClearLocalStorate();
    //       history.push(redirect_url);
    //     }
    //     else {
    //       showToast("Order Failed " + response.data.error, "error");
    //     }
    //   })
    //   .catch(function (error) {
    //     hideLoadingScreenFreeze();
    //     showToast("Error while placing the order", "error");
    //   })
  }

  return (
    <div className="invoice__Wrapper">
      <nav>
        <h1>Your Invoice</h1>
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
                    </span>
                  </>
                ) : null}
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
          <h3 style={{ color: "#e2133a", marginBottom: "20px" }}>
            Invoice Summary
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
                  metaGetData.mode === activeStatusData.metaData.mode ? (
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
                  metaGetData.mode === activeStatusData.metaData.mode ? (
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
              <button className="invoiceBtn" onClick={makePaymentNow}>
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
