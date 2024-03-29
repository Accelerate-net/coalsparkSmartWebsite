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
  let oldTotal = 0;

  let metaGetData = JSON.parse(localStorage.getItem("metaData"));
  let userGetData = JSON.parse(localStorage.getItem("userData"));
  let cartGetData = JSON.parse(localStorage.getItem("cartItem"));
  let getOldCart = localStorage.getItem("oldCart")
    ? JSON.parse(localStorage.getItem("oldCart"))
    : [];

  getOldCart.map((total) => {
    oldTotal = oldTotal + (parseInt(total.itemPrice) * total.itemCount);
  });

  let fullDetails = {
    metaData: metaGetData,
    userData: userGetData,
    cartData: cartGetData,
  };

  outletD.modes.map((modeCheck) => {
    if (metaGetData.mode === modeCheck.type) {
      modeCheck.taxSlabs.map((taxSlab) => {
        if (taxSlab.type === "PERCENTAGE") {
          taxPrice = taxPrice + taxSlab.value * (itemsTotal + oldTotal);
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
            <p className="cartItemPrice">{itemsTotal + oldTotal}</p>
          </div>
          <span></span>
          {outletD.modes.map((modeCheck) =>
            metaGetData.mode === modeCheck.type
              ? modeCheck.taxSlabs.map((taxSlab) => (
                  <div className="taxPrice">
                    <p>
                      {taxSlab.label}{" "}
                      <span
                        style={{
                          fontFamily: "roboto",
                          color: "#6e6e6e",
                          fontSize: "11px",
                        }}
                      >
                        (
                        {taxSlab.type === "PERCENTAGE" ? (
                          <span>{(taxSlab.value * 100).toFixed(2)}%</span>
                        ) : (
                          <span className="orderSubTotalAmount">
                            {taxSlab.value}
                          </span>
                        )}
                        )
                      </span>
                    </p>
                    {taxSlab.type === "PERCENTAGE" ? (
                      <p className="tax">
                        {(taxSlab.value * (itemsTotal + oldTotal)).toFixed(2)}
                      </p>
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
                    <p>
                      {otherCh.label}
                      <span
                        style={{
                          fontFamily: "roboto",
                          color: "#6e6e6e",
                          fontSize: "11px",
                        }}
                      >
                        (
                        {otherCh.type === "PERCENTAGE" ? (
                          <span>{(otherCh.value * 100).toFixed(2)}%</span>
                        ) : (
                          <span className="orderSubTotalAmount">
                            {otherCh.value}
                          </span>
                        )}
                        )
                      </span>
                    </p>
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
            <p className="toPayTotal">
              {itemsTotal + taxPrice + otherCharg + oldTotal}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Subtotal;
