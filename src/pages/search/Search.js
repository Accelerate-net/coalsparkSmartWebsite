import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import "./Search.css";
import MenuItem from "../home/MenuItem";

function Search() {
  const [typedWord, handleInput] = useState("");

  useEffect(() => {
    document.getElementById("searchMenuInput").focus();
  });

  const history = useHistory();
  let searchItem = localStorage.getItem("menuData") ? JSON.parse(localStorage.getItem("menuData")) : [];

  var searchKey = document.getElementById("searchMenuInput")
    ? document.getElementById("searchMenuInput").value
    : "";

  const searchSpace = (e) => {
    searchKey = e.target.value;
    handleInput(searchKey);
  };

  var isSearchFound = false;

  var itemsStartingWith =
    typedWord.length >= 2
      ? searchItem.map((firstS, k) =>
          firstS.menu.map((second) =>
            second.items
              .filter((data) => {
                let itemSearchText = data.name.toLowerCase();
                let enteredWord = typedWord.toLowerCase();

                if (enteredWord === "") return null;
                else if (itemSearchText.startsWith(enteredWord)) {
                  return data;
                }
              })
              .map((searchItemList, m) => {
                isSearchFound = true;
                return (
                  <div style={{ padding: "18px 16px 10px" }}>
                    <>
                      <MenuItem
                        key={m}
                        menuSubCat={second.subCategoryName}
                        itemCode={searchItemList.code}
                        itemName={searchItemList.name}
                        itemPrice={searchItemList.price}
                        itemServes={searchItemList.serves}
                        itemPrep={searchItemList.averagePreparationTime}
                        itemCustom={searchItemList.isCustomisable}
                        itemImg={searchItemList.imageUrl}
                        itemVeg={searchItemList.isVeg}
                        itemAvailable={searchItemList.isAvailable}
                        itemLabel={searchItemList.labels}
                        customOpt={searchItemList.customOptions}
                      />
                      <div
                        className="seperationLine"
                        style={{ marginTop: "20px" }}
                      ></div>
                    </>
                  </div>
                );
              })
          )
        )
      : null;

  var itemsContains =
    typedWord.length >= 2
      ? searchItem.map((firstS, k) =>
          firstS.menu.map((second) =>
            second.items
              .filter((data) => {
                let itemSearchText = data.name.toLowerCase();
                let enteredWord = typedWord.toLowerCase();

                if (enteredWord === "") return null;
                else if (itemSearchText.includes(enteredWord) && !itemSearchText.startsWith(enteredWord)) {
                  return data;
                }
              })
              .map((searchItemList, m) => {
                isSearchFound = true;
                return (
                  <div style={{ padding: "18px 16px 10px" }}>
                    <>
                      <MenuItem
                        key={m}
                        menuSubCat={second.subCategoryName}
                        itemCode={searchItemList.code}
                        itemName={searchItemList.name}
                        itemPrice={searchItemList.price}
                        itemServes={searchItemList.serves}
                        itemPrep={searchItemList.averagePreparationTime}
                        itemCustom={searchItemList.isCustomisable}
                        itemImg={searchItemList.imageUrl}
                        itemVeg={searchItemList.isVeg}
                        itemAvailable={searchItemList.isAvailable}
                        itemLabel={searchItemList.labels}
                        customOpt={searchItemList.customOptions}
                      />
                      <div
                        className="seperationLine"
                        style={{ marginTop: "20px" }}
                      ></div>
                    </>
                  </div>
                );
              })
          )
        )
      : null;

  var isSearchStarted = searchKey.length !== 0 ? true : false;

  return (
    <div className="search">
      <nav className="search__Header">
        <Link to="/menu" className="search__Back">
          <ion-icon name="arrow-back-outline"></ion-icon>
        </Link>
        <input
          type="text"
          id="searchMenuInput"
          placeholder="Search in Zaitoon"
          onChange={(e) => searchSpace(e)}
        />
        <div className="search__SearchIcon">
          <ion-icon name="search-outline"></ion-icon>
        </div>
      </nav>
      <div>
        {isSearchStarted && !isSearchFound ? (
          <p className="noSearchResultsLabel">No dishes found</p>
        ) : (
          <div className="search__Display" style={{ backgroundColor: "#fff" }}>
            {" "}
            {itemsStartingWith}
            {itemsContains}
            {" "}
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
