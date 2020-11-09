import React from "react";
import { Link } from "react-router-dom";
import LazyLoad from "react-lazyload";
import "./MenuItem.css";
import nonVegSymbol from "../../assets/imgs/non-veg-symbol.png";
import vegSymbol from "../../assets/imgs/veg-symbol.png";
import { useStateValue } from "../../contexts/StateProvider";
import { getInCount } from "../../contexts/reducer";

function MenuItem({
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
  customOpt,
}) {
  const [{ basket }, dispatch] = useStateValue();
  let itemc = getInCount(basket, itemCode);

  const isInCart = (product) => {
    return !!basket.find((item) => item.itemCode === product);
  };

  const Loading = () => (
    <div className="post loading">
            <div className="menuItemMainWrapper">
              <div className="dummyFullWidth">
                <div>
                  <span className="itemNameWrapper dummyLoading labelDummy"></span>
                </div>
                <div className="itemNameWrapper">
                  <span className="itemNameText dummyLoading titleDummy"></span>
                </div>
                <div className="itemPriceWrapper dummyFullWidth">
                  <span className="dummyLoading priceDummy"></span>
                </div>
              </div>
              <div className="itemRightSectionWrapper">
                <span alt="" className="dummyImageWrapper"></span>
                <div className="itemAddButtonWrapper">
                  <div className="itemAddButton itemAddButtonDummy">
                    <span className="addBtn dummyAdd">ADD</span>
                  </div>
                </div>
              </div>
            </div>
    </div>
  );

  const addToBasket = () => {
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        itemCode: itemCode,
        itemName: itemName,
        itemPrice: itemPrice,
        itemVeg: itemVeg,
      },
    });
  };

  const incrementItem = () => {
    dispatch({
      type: "INCREASE_ITEM",
      itemCode: itemCode,
    });
  };

  const decrementItem = () => {
    dispatch({
      type: "DECREASE_ITEM",
      itemCode: itemCode,
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
                        <ion-icon name="time-outline" className="timerIcon"></ion-icon>
                        <p>{itemPrep + "m"}</p>
                      </span>
                    </div>
                    <div className="dot"></div>
                    <div className="servesNumberWrapper">
                      <span className="servesNumber">
                        <p>Serves {itemServes}</p>
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
                      {itemCustom ? (
                        <>
                          <Link
                            to={{
                              pathname: "/customised",
                              state: {
                                itemCode: itemCode,
                                itemName: itemName,
                                customOpt: customOpt,
                                itemPrice: itemPrice,
                                itemVeg: itemVeg,
                                isCustom: itemCustom,
                              },
                            }}
                            style={{ textDecoration: "none" }}
                          >
                          <span className="addBtn" style={{ fontSize: "16px", }} > ADD </span>
                          </Link>
                        </>
                      ) : (
                        <>
                          {isInCart(itemCode) ? (
                            <>
                              <div
                                className="_2pWL- YtkFu"
                                data-cy="item-quantity-button"
                              >
                                <div
                                  className="_1H238"
                                  onClick={decrementItem}
                                ></div>
                                <div className="_33Vfv">{itemc}</div>
                                <div className="QSzbj" onClick={incrementItem}>
                                  +
                                </div>
                              </div>
                            </>
                          ) : (
                            <span className="addBtn" onClick={() => { addToBasket(); }} >
                              ADD
                            </span>
                          )}
                        </>
                      )}
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
                    <span className="addBtn" style={{ color: "#999999" }}>
                      ADD
                    </span>
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
