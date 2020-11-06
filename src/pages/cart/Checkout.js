import React from "react";
import { useStateValue } from "../../contexts/StateProvider";
import { Link, useHistory } from "react-router-dom";
import "./Checkout.css";
import CheckoutProduct from "./CheckoutProduct";
import Subtotal from "./Subtotal";
import BilledItem from "./BilledItem";

function Checkout({ outletData }) {
  const [{ basket }] = useStateValue();
  const history = useHistory();
  let urlParams = JSON.parse(localStorage.getItem("metaData"));
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
    : {};

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

  const billedItem = oldCartData?.map((item, k) => (
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
    />
  ));

  return (
    <div className="checkout">
      <nav>
        <Link to="/menu">
          <ion-icon name="arrow-back-outline"></ion-icon>
        </Link>
        <h2
          className="checkout__title">
          {" "}
          Your Basket
        </h2>
      </nav>
      {basket?.length === 0 && oldCartData?.length === 0 ? (
        <div className="checkout__Empty">
          <h2>Your Food Cart is Empty!</h2>
          <p>Go back and try clicking on the Add button</p>
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
                <h3>Order Placed for</h3>
                {billedItem}
                <h3>New Order Items</h3>
                {newCart}
              </div>
            ) : null}
          </div>
          <hr />
        </>
      )}
      {basket.length > 0 && (
        <div className="checkout__Total">
          <h1>Bill details</h1>
          <Subtotal outletD={outletData} />
        </div>
      )}
    </div>
  );
}

export default Checkout;
