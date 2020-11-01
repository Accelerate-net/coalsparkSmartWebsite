import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./Search.css";
import MenuItem from "../home/MenuItem";

function Search({ searchItem }) {
  const [typedWord, handleInput] = useState("");
  const history = useHistory();
  let urlParams = JSON.parse(localStorage.getItem("metaData"));
  if (
    !urlParams.branchCode ||
    !urlParams.tableNumber ||
    !urlParams.qrCodeReference ||
    !urlParams.mode
  ) {
    history.push("*");
  }
  const searchSpace = (e) => {
    let keyword = e.target.value;
    handleInput(keyword);
  };

  var itemL = searchItem.map((firstS, k) =>
    firstS.menu.map((second) =>
      second.items
        .filter((data) => {
          if (typedWord === "") return null;
          else if (data.name.toLowerCase().includes(typedWord.toLowerCase())) {
            return data;
          }
        })
        .map((searchItemList, m) => {
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
  );

  return (
    <div className="search">
      <nav className="search__Header">
        <Link to="/menu" className="search__Back">
          <ion-icon name="arrow-back-outline"></ion-icon>
        </Link>
        <input
          type="text"
          placeholder="Search in Zaitoon"
          onChange={(e) => searchSpace(e)}
        />
        <div className="search__SearchIcon">
          <ion-icon name="search-outline"></ion-icon>
        </div>
      </nav>
      <div>
        <div
          className="search__Display"
          style={{
            backgroundColor: "#fff",
          }}
        >
          {itemL}
        </div>
      </div>
    </div>
  );
}

export default Search;
