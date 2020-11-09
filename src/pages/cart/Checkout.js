import React, { useState } from "react";
import { useStateValue } from "../../contexts/StateProvider";
import { Link, useHistory } from "react-router-dom";
import "./Checkout.css";
import CheckoutProduct from "./CheckoutProduct";
import Subtotal from "./Subtotal";
import BilledItem from "./BilledItem";
import { getBasketTotal } from "../../contexts/reducer";
import emptyCart from "../../assets/imgs/emptycart.png";

function Checkout() {
  const [{ basket }] = useStateValue();
  const history = useHistory();
  const [showP, setShowPrice] = useState(false);
  // const [orderPlaced, setOrder] = useState(false);
  const [cartComm, handleCartComments] = useState("");

  const handleCartComment = (e) => {
    let userFeed = e.target.value;
    handleCartComments(userFeed);
  };

  let itemsTotal = getBasketTotal(basket);
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

  function showPrice() {
    setShowPrice(!showP);
  }

  let keysToRemove = [
    "outletData",
    "activeStatus",
    "activeStatusData",
    "cartItem",
    "oldCart",
  ];

  function resultRoute() {
    setTimeout(() => {
      // window.localStorage.clear();
      keysToRemove.forEach((k) => localStorage.removeItem(k));
      history.push("./success");
    }, 2000);
  }

  return (
    <>
      <div className="checkout">
        <nav>
          <Link to="/menu">
            <ion-icon name="arrow-back-outline"></ion-icon>
          </Link>
          <h2 className="checkout__title"> Your Cart</h2>
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
                  <div className="activeOrderSection">
                    <h3>
                      Active Order{" "}
                      <span className="activeOrderCheck">
                        <ion-icon name="checkmark-done-outline"></ion-icon>
                      </span>
                    </h3>
                    {billedItem}
                  </div>
                  <div className="newOrderSection">
                    <h3>New Order</h3>
                    {newCart}
                  </div>
                </div>
              ) : null}
            </div>
            <hr />
            {basket?.length > 0 ? (
              <div className="commentsWrapper">
                <form>
                  <input
                    type="text"
                    name="cartComments"
                    placeholder="Any special requests?"
                    value={cartComm}
                    onChange={(e) => handleCartComment(e)}
                  />
                </form>
              </div>
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
              <button className="checkoutBtn" onClick={() => resultRoute()}>
                PLACE ORDER
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Checkout;
