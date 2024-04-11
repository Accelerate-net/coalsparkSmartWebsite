import React from "react";
import "./CheckoutProduct.css";
import nonVegSymbol from "../../assets/imgs/non-veg-symbol.png";
import vegSymbol from "../../assets/imgs/veg-symbol.png";
import { useStateValue } from "../../contexts/StateProvider";
import { Link } from "react-router-dom";

function CheckoutProduct({
  itemCode,
  itemName,
  itemPrice,
  itemOriginalPrice,
  itemVeg,
  itemCount,
  customVariant,
  customOpt,
  isCustom,
}) {
  const [{ basket }, dispatch] = useStateValue();
  let getActiveStatus = localStorage.getItem("activeStatus")
    ? JSON.parse(localStorage.getItem("activeStatus"))
    : {};
  let activeStatusData = localStorage.getItem("activeStatusData")
    ? JSON.parse(localStorage.getItem("activeStatusData"))
    : {};

  const incrementItem = () => {
    dispatch({
      type: "INCREASE_ITEM",
      itemCode: itemCode,
      customVariant: customVariant,
      customOpt: customOpt,
      isCustom: isCustom,
    });
  };

  const decrementItem = () => {
    dispatch({
      type: "DECREASE_ITEM",
      itemCode: itemCode,
      customVariant: customVariant,
      customOpt: customOpt,
      isCustom: isCustom,
    });
  };

  return (
    <div className="checkoutProduct">
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
                {customVariant}
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
                  },
                }}
                className="checkoutCustomizedLink"
              >
                CUSTOMISE <ion-icon name="arrow-down-outline"></ion-icon>
              </Link>
            </>
          ) : null}
        </p>
        {/* <button className="checkoutProduct__remove">Remove</button> */}

        <div className="_2pWL- YtkFu" data-cy="item-quantity-button">
          <div className="_1H238" onClick={decrementItem}></div>
          <div className="_33Vfv">{itemCount}</div>
          <div className="QSzbj" onClick={incrementItem}>
            +
          </div>
        </div>
        <p className="checkoutProduct__price">
          <span>{itemOriginalPrice}</span>
        </p>
      </div>
    </div>
  );
}

export default CheckoutProduct;
