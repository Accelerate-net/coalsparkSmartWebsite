import React from "react";
import "./CheckoutProduct.css";
import nonVegSymbol from "../../assets/imgs/non-veg-symbol.png";
import vegSymbol from "../../assets/imgs/veg-symbol.png";
import { useStateValue } from "../../contexts/StateProvider";
import { Link } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function BilledItem({
  itemCode,
  itemName,
  itemPrice,
  itemOriginalPrice,
  itemVeg,
  itemCount,
  customVariant,
  customOpt,
  isCustom,
  orderPersonLabel,
  orderPersonMobile
}) {
  const [{ basket }, dispatch] = useStateValue();

  const showToast = () => {
    toast.warning("Already placed order can not be altered")
  };

  const addToBasket = () => {
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        itemCode: itemCode,
        itemName: itemName,
        itemPrice: itemPrice,
        itemVeg: itemVeg,
        customVariant: customVariant,
        customOpt: customOpt,
        isCustom: isCustom
      },
    });
  };

  const userData = localStorage.getItem("userValidatedData")
      ? JSON.parse(localStorage.getItem("userValidatedData"))
      : {};

  const getOrderPersonLabel = (orderPersonLabel, orderPersonMobile) => {
    if(userData.mobile == orderPersonMobile){
      return "Your Order";
    } 
    return orderPersonLabel;
  }

  const isSelfUser = (orderPersonLabel, orderPersonMobile) => {
    return userData.mobile == orderPersonMobile;
  }

  return (
    <div className="checkoutProduct billedItem">
      <div className="checkoutProduct__info">
        {itemVeg === true ? (
          <img className="nonVegSymbol" src={vegSymbol} alt="" />
        ) : (
          <img className="nonVegSymbol" src={nonVegSymbol} alt="" />
        )}
        <p className="checkoutProduct__title">
          {itemName}
          {isCustom ? (
            <>
              <span
                className="variantName"
                style={{ fontSize: "12px", color: "#000" }}
              >
                <span>{customVariant} {isSelfUser(orderPersonLabel, orderPersonMobile) ? (<span><i class="fa fa-circle specialSelfDotGreen"></i> <span className="self">Your Order</span></span>) : (<span><i class="fa fa-circle specialSelfDotRed"></i> <span className="peer">{getOrderPersonLabel(orderPersonLabel, orderPersonMobile)}</span></span>)}</span>
              </span>
              <Link
                to={{
                  pathname: "/customised",
                  state: {
                    itemCode: itemCode,
                    itemName: itemName,
                    customOpt: customOpt,
                    itemPrice: itemOriginalPrice,
                    itemVeg: itemVeg,
                    isCustom: isCustom,
                    orderPersonMobile: orderPersonMobile,
                    orderPersonLabel: orderPersonLabel
                  },
                }}
                className="checkoutCustomizedLink"
              >
                CUSTOMISE <ion-icon name="arrow-down-outline"></ion-icon>
              </Link>
            </>
          ) : null}
          {!isCustom ? (isSelfUser(orderPersonLabel, orderPersonMobile) ? (<span className="self">Your Order</span>) : (<span className="peer">{getOrderPersonLabel(orderPersonLabel, orderPersonMobile)}</span>)) : null}
        </p>
        {/* <button className="checkoutProduct__remove">Remove</button> */}

        <div className="_2pWL- YtkFu" data-cy="item-quantity-button">
          <div className="_1H238" onClick={() => showToast()}></div>
          <div className="_33Vfv">{itemCount}</div>
          <div className="QSzbj" onClick={addToBasket}>
            +
          </div>
        </div>
        <p className="checkoutProduct__price">
          <span>{itemPrice}</span>
        </p>
      </div>
    </div>
  );
}

export default BilledItem;
