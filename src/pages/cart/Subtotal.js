import React from "react";
import "./Subtotal.css";
import { useStateValue } from "../../contexts/StateProvider";
import { getBasketTotal } from "../../contexts/reducer";

function Subtotal() {
  const [{ basket }, dispatch] = useStateValue();
  let itemsTotal = getBasketTotal(basket);
  let tax = itemsTotal * 0.1;
  let subTotal = tax + itemsTotal;
  return (
    <div className="subtotal">
      <div className="billDetails">
        <div className="itemTotal">
          <p>Item Total</p>
          <p className="cartItemPrice">{itemsTotal}</p>
        </div>
        <span></span>
        <div className="taxPrice">
          <p>Taxes and Charges</p>
          <p className="tax">{tax}</p>
        </div>
        <span></span>
        <div className="toPay">
          <h4>To Pay</h4>
          <p className="toPayTotal">{subTotal}</p>
        </div>
      </div>
    </div>
  );
}

export default Subtotal;
