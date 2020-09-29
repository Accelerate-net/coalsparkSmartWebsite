import React from "react";
import { Link } from "react-router-dom";
import { useStateValue } from "../contexts/StateProvider";
import { getBasketTotal } from "../contexts/reducer";
import { getItemCount } from "../contexts/reducer";

function CartBanner() {
  const [{ basket }] = useStateValue();
  let itemsTotal = getBasketTotal(basket);
  let itemc = getItemCount(basket);

  return (
    <div>
      {itemc >= 1 ? (
        <div className="cartWrapper _213Hu">
          <div className="_1AAH9">
            <div className="_1aj3g">
              <div className="_1tugc">
                {itemc > 1 ? (
                  <div>
                    {itemc} Items <span className="_2NWOP"> | </span>{" "}
                    <span className="ny7XD"> {itemsTotal} </span>{" "}
                  </div>
                ) : (
                  <div>
                    {itemc} Item <span className="_2NWOP"> | </span>{" "}
                    <span className="ny7XD"> {itemsTotal} </span>{" "}
                  </div>
                )}
              </div>
              <div className="_39JPy">
                <Link to="/checkout"> View Cart </Link>{" "}
              </div>{" "}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default CartBanner;
