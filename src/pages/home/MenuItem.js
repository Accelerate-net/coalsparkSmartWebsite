import React from "react";
import "./MenuItem.css";
import nonVegSymbol from "../../assets/imgs/non-veg-symbol.png";
import vegSymbol from "../../assets/imgs/veg-symbol.png";
import { useStateValue } from "../../contexts/StateProvider";

function MenuItem({
  menuSubCat,
  itemCode,
  itemName,
  itemPrice,
  itemServes,
  itemPrep,
  itemCustom,
  itemImg,
  itemVeg,
  itemAvailable,
  itemLabel,
}) {
  const [{}, dispatch] = useStateValue();
  const addToBasket = () => {
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        itemCode: itemCode,
        itemName: itemName,
        itemPrice: itemPrice,
        itemVeg: itemVeg,
        itemCount: 1,
      },
    });
  };

  return (
    <>
      <div>
        {itemAvailable ? (
          <>
            <div className="menuItemMainWrapper">
              <div>
                <div>
                  {itemVeg === true ? (
                    <img className="nonVegSymbol" src={vegSymbol} alt="" />
                  ) : (
                    <img className="nonVegSymbol" src={nonVegSymbol} alt="" />
                  )}
                  {/* <img className="nonVegSymbol" src={foodLabel} alt="" /> */}
                  <span className="itemAdjective">{itemLabel}</span>
                </div>
                <div className="itemNameWrapper">
                  <span className="itemNameText">{itemName}</span>
                </div>
                <div className="itemPriceWrapper">
                  <span className="itemPrice">{itemPrice}</span>
                </div>
                <div className="extraDetailsDisplay">
                  <div className="prepTimeWrapper">
                    <span className="prepTime">
                      <ion-icon name="time-outline"></ion-icon>
                      <p>{itemPrep + " mins"}</p>
                    </span>
                  </div>
                  <div className="dot"></div>
                  <div className="servesNumberWrapper">
                    <span className="servesNumber">
                      <ion-icon name="people-outline"></ion-icon>{" "}
                      <p>{itemServes}</p>
                    </span>
                  </div>
                </div>
              </div>
              <div className="itemRightSectionWrapper">
                {itemImg.length === 0 ? (
                  <img
                    alt=""
                    className="itemImageWrapper"
                    src={itemImg}
                    style={{ visibility: "hidden" }}
                  />
                ) : (
                  <img
                    alt=""
                    className="itemImageWrapper"
                    src={itemImg}
                    style={{ display: "block" }}
                  />
                )}
                <div className="itemAddButtonWrapper">
                  <div className="itemAddButton">
                    {/* <AddBtn addItem={itemA} /> */}
                    <span
                      className="addBtn"
                      style={{ color: "#ee9c00" }}
                      onClick={addToBasket}>
                      ADD
                    </span>
                    {/* <MainButton itemDetails={itemA} /> */}
                  </div>
                  {itemCustom ? (
                    <div className="customiseText">
                      {" "}
                      <p>Customisable</p>{" "}
                    </div>
                  ) : null}
                </div>
              </div>
              {/* <div className="seperationLine"></div> */}
            </div>
          </>
        ) : (
          <div className="menuItemMainWrapper">
            <div>
              <div>
                {itemVeg === true ? (
                  <img className="nonVegSymbol" src={vegSymbol} alt="" />
                ) : (
                  <img className="nonVegSymbol" src={nonVegSymbol} alt="" />
                )}
                {/* <img className="nonVegSymbol" src={foodLabel} alt="" /> */}
                <span className="itemAdjective" style={{ color: "#999999" }}>
                  {itemLabel}
                </span>
              </div>
              <div className="itemNameWrapper">
                <span className="itemNameText" style={{ color: "#999999" }}>
                  {itemName}
                </span>
              </div>
              <div className="itemPriceWrapper">
                <span className="itemPrice" style={{ color: "#999999" }}>
                  {itemPrice}
                </span>
              </div>
              <div className="extraDetailsDisplay">
                <div className="prepTimeWrapper">
                  <span className="prepTime">
                    <ion-icon name="time-outline"></ion-icon>
                    <p style={{ color: "#999999" }}>{itemPrep + " mins"}</p>
                  </span>
                </div>
                <div className="dot"></div>
                <div className="servesNumberWrapper">
                  <span className="servesNumber">
                    <ion-icon name="people-outline"></ion-icon>{" "}
                    <p>{itemServes}</p>
                  </span>
                </div>
              </div>
            </div>
            <div className="itemRightSectionWrapper">
              {itemImg.length === 0 ? (
                <img
                  alt=""
                  className="itemImageWrapper"
                  src={itemImg}
                  style={{ visibility: "hidden" }}
                />
              ) : (
                <img
                  alt=""
                  className="itemImageWrapper"
                  src={itemImg}
                  style={{ display: "block", filter: "grayscale(100%)" }}
                />
              )}
              <div className="itemAddButtonWrapper">
                <div className="itemAddButton">
                  {/* <AddBtn addItem={itemA} /> */}
                  <span className="addBtn" style={{ color: "#999999" }}>
                    ADD
                  </span>
                  {/* <MainButton itemDetails={itemA} /> */}
                </div>
                {itemCustom ? (
                  <div className="customiseText">
                    {" "}
                    <p>Customisable</p>{" "}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default MenuItem;