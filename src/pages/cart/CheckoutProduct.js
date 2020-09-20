import React from "react";
import "./CheckoutProduct.css";
import nonVegSymbol from "../../assets/imgs/non-veg-symbol.png";
import vegSymbol from "../../assets/imgs/veg-symbol.png";
import { useStateValue } from "../../contexts/StateProvider";

function CheckoutProduct({
  itemCode,
  itemName,
  itemPrice,
  itemOriginalPrice,
  itemVeg,
  itemCount,
}) {
  const [{ basket }, dispatch] = useStateValue();
  const removeFromBasket = () => {
    // remove from basket
    dispatch({
      type: "REMOVE_FROM_BASKET",
      itemCode: itemCode,
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
        <p className="checkoutProduct__title">{itemName}</p>
        {/* <button className="checkoutProduct__remove">Remove</button> */}
        <div className="_2pWL- YtkFu" data-cy="item-quantity-button">
          <div className="_1H238" onClick={removeFromBasket}></div>
          <div className="_33Vfv">{itemCount}</div>
          <div className="QSzbj">+</div>
        </div>
        <p className="checkoutProduct__price">
          <span>{itemOriginalPrice}</span>
        </p>
      </div>
    </div>
  );
}

export default CheckoutProduct;