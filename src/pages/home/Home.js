import React from "react";
import MenuItem from "./MenuItem";

function Home({ menu }) {
  return (
    <div className="home">
      {menu.map((menuA, k) => (
        <div key={k}>
          <div className="home__menuCard" style={{ padding: "20px 16px 0" }}>
            <h1 id={menuA.categoryName}>{menuA.categoryName}</h1>
            {menuA.menu.map((menuItems, l) => (
              <>
                <div key={l}>
                  <h1 className="subCategoryTitle">
                    {menuItems.subCategoryName}
                  </h1>
                  {menuItems.items.map((menuItem, m) => (
                    <>
                      <div key={m}>
                        <MenuItem
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
                      </div>
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
