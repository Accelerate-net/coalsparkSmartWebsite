import React, { useState, useEffect } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import nonVegSymbol from "../../assets/imgs/non-veg-symbol.png";
import vegSymbol from "../../assets/imgs/veg-symbol.png";
import "./Custom.css";
import { useStateValue } from "../../contexts/StateProvider";

function Custom() {
  let location = useLocation();
  const history = useHistory();
  const itemCode = location.state.itemCode;
  const itemName = location.state.itemName;
  const customOption = location.state.customOpt;
  const isCustom = location.state.isCustom;
  const isVeg = location.state.itemVeg;

  const [{ basket }, dispatch] = useStateValue();
  const [selectedVariant, handleOnChange] = useState("Small");
  const [selectedVariantprice, handlepriceChange] = useState(100);
  // let selectedVariantprice = 100;

  useEffect(() => {
    let elem = document.getElementsByClassName('radioBbtn')[0]
    let defVaraintPrice = elem.getAttribute('data-price')
    let defVariant = elem.getAttribute('value')
    handlepriceChange(defVaraintPrice)
    handleOnChange(defVariant)
  },[])

  let urlParams = JSON.parse(localStorage.getItem("metaData"));
  if (
    !urlParams.branchCode ||
    !urlParams.tableNumber ||
    !urlParams.qrCodeReference ||
    !urlParams.mode
  ) {
    history.push("*");
  }

  const handleVariant = (e) => {
    if (e.target.checked) {
      handleOnChange(e.target.value);
      handlepriceChange(e.target.getAttribute('data-price'))
    }
  };

  const showAddedAnimation = () => {
    var x = document.getElementById("add_custom_to_cart");
    x.disabled = true;
    x.innerHTML = "<i class='fa fa-check'></i> Added";
    setTimeout(function(){
      history.push("/menu")
    }, 300);
  };

  const addToBasket = () => {
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        itemCode: itemCode,
        itemName: itemName,
        itemPrice: selectedVariantprice,
        itemVeg: isVeg,
        customVariant: selectedVariant,
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
          <label>
            <div className="vegOrNon">
              {isVeg ? (
                <img className="nonVegSymbol" src={vegSymbol} alt="nonveg" />
              ) : (
                <img className="nonVegSymbol" src={nonVegSymbol} alt="veg" />
              )}
            </div>
            <div className="option__Check">
              <label key={k}>
                <input
                  type="radio"
                  className="radioBbtn"
                  name="variants"
                  value={item.variant}
                  data-price={item.price}
                  // checked={selectedVariant === item.variant}
                  defaultChecked={k === 0}
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
                  <p>Serves {item.serves}</p>
                </span>
              </div>
            </div>
          </label>
        ))}
      </div>
      <div className="custom__AddBtnWrapper">
        <button
          className="add__Btn"
          onClick={() => {
            addToBasket();
            showAddedAnimation();
          }}
        >
          <span id="add_custom_to_cart">Add to Cart</span>
        </button>
      </div>
    </div>
  );
}

export default Custom;
