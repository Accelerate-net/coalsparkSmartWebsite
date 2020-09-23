import React from "react";
import { useStateValue } from "../../contexts/StateProvider";
import { Link } from "react-router-dom";
import "./Checkout.css";
import CheckoutProduct from "./CheckoutProduct";
import Subtotal from "./Subtotal";

function Checkout() {
  const [{ basket }] = useStateValue();
  return (
    <div className="checkout">
      <nav>
        <Link to="/">
          <ion-icon name="arrow-back-outline"></ion-icon>
        </Link>
        <h2
          className="checkout__title"
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            color: "#E86565",
          }}>
          {" "}
          Your Basket
        </h2>
      </nav>
      {basket?.length === 0 ? (
        <div className="checkout__Empty">
          <h2>Your Food Cart is Empty!</h2>
          <p>Go back and try clicking on the Add button</p>
        </div>
      ) : (
        <>
          <div>
            {basket?.map((item, k) => (
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
            ))}
          </div>
          <hr />
        </>
      )}
      {basket.length > 0 && (
        <div className="checkout__Total">
          <h1>Bill details</h1>
          <Subtotal />
        </div>
      )}
    </div>
  );
}

export default Checkout;
