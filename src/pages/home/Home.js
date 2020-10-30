import React from "react";
import { useHistory } from "react-router-dom";
import MenuItem from "./MenuItem";

function Home({ menu }) {
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

  return (
    <div className="home">
      {menu.map((menuA, k) => (
        <div key={k}>
          <div className="home__menuCard" style={{ padding: "20px 16px 0" }}>
            <h1 id={menuA.categoryName}>{menuA.categoryName}</h1>
            {menuA.menu.map((menuItems, i) => (
              <>
                <div key={i}>
                  <h1 className="subCategoryTitle">
                    {menuItems.subCategoryName}
                  </h1>
                  {menuItems.items.map((menuItem, m) => (
                    <>
                      <MenuItem
                        key={m}
                        menuSubCat={menuItems.subCategoryName}
                        itemCode={menuItem.code}
                        itemName={menuItem.name}
                        itemPrice={menuItem.price}
                        itemServes={menuItem.serves}
                        itemPrep={menuItem.averagePreperationTime}
                        itemCustom={menuItem.isCustomisable}
                        itemImg={menuItem.imageUrl}
                        itemVeg={menuItem.isVeg}
                        itemAvailable={menuItem.isAvailable}
                        itemLabel={menuItem.labels}
                        customOpt={menuItem.customOptions}
                      />
                      <div className="seperationLine"></div>
                    </>
                  ))}
                </div>
              </>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;
