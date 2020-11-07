import React from "react";
import "./Subtotal.css";
import { useStateValue } from "../../contexts/StateProvider";
import { getBasketTotal } from "../../contexts/reducer";

function Subtotal() {
  let outletD = localStorage.getItem("outletData")
            ? JSON.parse(localStorage.getItem("outletData"))
            : {};
  const [{ basket }] = useStateValue();
  let itemsTotal = getBasketTotal(basket);
  let taxPrice = 0;
  let otherCharg = 0;

  let metaGetData = JSON.parse(localStorage.getItem("metaData"));
  let userGetData = JSON.parse(localStorage.getItem("userData"));
  let cartGetData = JSON.parse(localStorage.getItem("cartItem"));

  let fullDetails = {
    metaData: metaGetData,
    userData: userGetData,
    cartData: cartGetData,
  };

  console.log(fullDetails);

  outletD.modes.map((modeCheck) => {
    if (metaGetData.mode === modeCheck.type) {
      modeCheck.taxSlabs.map((taxSlab) => {
        if (taxSlab.type === "PERCENTAGE") {
          taxPrice = taxPrice + taxSlab.value * itemsTotal;
        } else {
          taxPrice = taxPrice + taxSlab.value;
        }
      });
      modeCheck.otherCharges.map((otherC) => {
        if (otherC.type === "PERCENTAGE") {
          otherCharg = otherCharg + otherC.value * itemsTotal;
        } else {
          otherCharg = otherCharg + otherC.value;
        }
      });
    }
  });

  return (
    <>
      <div className="subtotal">
        <div className="billDetails">
          <div className="itemTotal">
            <p>Item Total</p>
            <p className="cartItemPrice">{itemsTotal}</p>
          </div>
          <span></span>
          {outletD.modes.map((modeCheck) =>
            metaGetData.mode === modeCheck.type
              ? modeCheck.taxSlabs.map((taxSlab) => (
                  <div className="taxPrice">
                    <p>{taxSlab.label} <span style = {{fontFamily: "roboto", color: "#6e6e6e", fontSize: "11px"}}>({taxSlab.type === "PERCENTAGE" ? taxSlab.value*100 : taxSlab.value} {taxSlab.type})</span></p>
                    {taxSlab.type === "PERCENTAGE" ? (
                      <p className="tax">{(taxSlab.value * itemsTotal).toFixed(2)}</p>
                    ) : (
                      <p className="tax">{taxSlab.value}</p>
                    )}
                  </div>
                ))
              : null
          )}
          <span></span>
          {outletD.modes.map((modeCheck) =>
            metaGetData.mode === modeCheck.type
              ? modeCheck.otherCharges.map((otherCh) => (
                  <div className="taxPrice">
                    <p>{otherCh.label}</p>
                    {otherCh.type === "PERCENTAGE" ? (
                      <p className="tax">{(otherCh.value * 100).toFixed(2)}</p>
                    ) : (
                      <p className="tax">{otherCh.value}</p>
                    )}
                  </div>
                ))
              : null
          )}
          <div className="toPay">
            <h4>Total</h4>
            <p className="toPayTotal">{itemsTotal + taxPrice + otherCharg}</p>
          </div>
        </div>
        
      </div>
    </>
  );
}

export default Subtotal;
