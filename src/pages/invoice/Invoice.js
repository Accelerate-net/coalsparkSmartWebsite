import React from "react";
import { useHistory } from "react-router-dom";
import "./Invoice.css";

function Invoice() {
  const history = useHistory();

  let activeStatusData = localStorage.getItem("activeStatusData")
    ? JSON.parse(localStorage.getItem("activeStatusData"))
    : {};

  let metaGetData = JSON.parse(localStorage.getItem("metaData"));

  function resultRoute() {
    history.push("./feedback");
  }

  return (
    <div className="invoice__Wrapper">
      <nav>
        <h1>Your Invoice</h1>
      </nav>
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
          <h3 style={{ color: "#e86565", marginBottom: "20px" }}>
            Bill details
          </h3>
          <div className="invoiceBillDet">
            <div className="invoicesubTotal">
              <p>Item total</p>
              <p className="cartItemPrice">
                {activeStatusData.invoiceDetails.subTotal}
              </p>
            </div>

            <div className="invoiceAdditionalCharges">
              {activeStatusData.invoiceDetails.additionalCharges.taxSlabs.map(
                (modeCheck) =>
                  metaGetData.mode === activeStatusData.metaData.mode ? (
                    <div className="taxPrice">
                      <p>{modeCheck.label}</p>
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
                      <p>{modeCheck.label}</p>
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
                    <p className="tax" style={{ color: "#e86565" }}>
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
                {activeStatusData.invoiceDetails.grandTotal}
              </p>
            </div>

            <div className="invoiceBtnWrapper">
              <button className="invoiceBtn" onClick={resultRoute}>
                PAY NOW
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Invoice;
