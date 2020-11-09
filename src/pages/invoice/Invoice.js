import React from "react";
import { useHistory } from "react-router-dom";
import "./Invoice.css";

function Invoice() {
  const history = useHistory();

  let activeStatusData = localStorage.getItem("activeStatusData")
    ? JSON.parse(localStorage.getItem("activeStatusData"))
    : {};

    // let getActiveStatus = localStorage.getItem("activeStatus")
    // ? JSON.parse(localStorage.getItem("activeStatus"))
    // : {};

    // if (getActiveStatus === "free" || getActiveStatus === "active") {
    //        history.push("*")
    // }

  let metaGetData = JSON.parse(localStorage.getItem("metaData"));

  function resultRoute() {
    window.localStorage.clear();
    history.push("./feedback");
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
              <button className="invoiceBtn" onClick={resultRoute}>
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
