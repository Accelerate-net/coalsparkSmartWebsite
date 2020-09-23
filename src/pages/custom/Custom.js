import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import nonVegSymbol from "../../assets/imgs/non-veg-symbol.png";
import vegSymbol from "../../assets/imgs/veg-symbol.png";
import { useLocation } from "react-router-dom";
import "./Custom.css";
import { useStateValue } from "../../contexts/StateProvider";

function Custom() {
  let location = useLocation();
  const itemCode = location.state.itemCode;
  const itemName = location.state.itemName;
  const itemPrice = location.state.itemPrice;
  const customOption = location.state.customOpt;
  const isCustom = location.state.isCustom;
  const isVeg = location.state.itemVeg;
  const [{ basket }, dispatch] = useStateValue();
  const [selectedValue, handleOnChange] = useState("Small");
  let selectedVariantprice = 100;

  const handleVariant = (e) => {
    if (e.target.checked) {
      console.log("selected", e.target.value);
      handleOnChange(e.target.value);
    }
  };

  const valueExtractor = () => {
    customOption.map((custom) => {
      if (selectedValue === custom.variant) {
        selectedVariantprice = custom.price;
      }
    });
    return selectedVariantprice;
  };

  var itemPees = valueExtractor();

  const [loading, fetchData] = useState(false);

  const fetchDatad = () => {
    fetchData(!loading);

    //Faking API call here
    setTimeout(() => {
      fetchData(loading);
    }, 2000);
  };

  const addToBasket = () => {
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        itemCode: itemCode,
        itemName: itemName,
        itemPrice: selectedVariantprice,
        itemVeg: isVeg,
        customVariant: selectedValue,
        customOpt: customOption,
        isCustom: isCustom,
      },
    });
  };

  return (
    <div className="custom">
      <nav className="custom__Navbar">
        <Link to="/checkout">
          <ion-icon name="close-outline"></ion-icon>
        </Link>
        <div className="custom__navTitle">
          {isVeg ? (
            <img className="nonVegSymbol" src={vegSymbol} alt="" />
          ) : (
            <img className="nonVegSymbol" src={nonVegSymbol} alt="" />
          )}
          <div className="custom__navTitleDetails">
            <h1>{itemName}</h1>
            <p>{selectedVariantprice}</p>
          </div>
        </div>
      </nav>
      <div className="custom__Options">
        <h4>Quantity</h4>

        {customOption.map((item, k) => (
          <label className="" key={k}>
            <div className="vegOrNon">
              {isVeg ? (
                <img className="nonVegSymbol" src={vegSymbol} alt="nonveg" />
              ) : (
                <img className="nonVegSymbol" src={nonVegSymbol} alt="veg" />
              )}
            </div>
            <div className="option__Check">
              <label className="">
                <input
                  type="radio"
                  className=""
                  name="variants"
                  value={item.variant}
                  checked={selectedValue === item.variant}
                  onChange={(e) => handleVariant(e)}
                />
              </label>
            </div>
            <div className="option__Details">
              <div className="option__Name">
                <span>{item.variant}</span>
              </div>
              <div className="option__Price">
                <span>{item.price}</span>
              </div>
              <div className="servesNumberWrapper">
                <span className="servesNumber">
                  <ion-icon name="people-outline"></ion-icon>{" "}
                  <p>{item.serves}</p>
                </span>
              </div>
            </div>
          </label>
        ))}
      </div>
      <div className="custom__AddBtnWrapper">
        <div className="add_Quantity">
          <span>Quantity: {selectedValue}</span>
        </div>
        <button
          className="add__Btn"
          onClick={() => {
            addToBasket();
            fetchDatad();
          }}
          disabled={loading}>
          {loading === true ? <span>Adding...</span> : <span>Add</span>}
        </button>
      </div>
    </div>
  );
}

export default Custom;
