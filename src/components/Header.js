import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { useStateValue } from "../contexts/StateProvider";

function Header() {
  const [{ basket }] = useStateValue();
  return (
    <nav className="header">
      {/* Zaitoon text on left*/}
      <Link to="/">
        <h1 className="header__logo">Zaitoon</h1>
      </Link>
      <div className="header__rightSection">
        {/* Search Icon */}
        <div className="header__search">
          <ion-icon name="search-outline"></ion-icon>
        </div>
        {/* Cart icon with number*/}
        <Link to="/checkout">
          <div className="header__cart">
            <ion-icon name="restaurant-outline"></ion-icon>
            <div className="header__dot"></div>
            <span className="header__cartValue">{basket?.length}</span>
          </div>
        </Link>
      </div>
    </nav>
  );
}

export default Header;
