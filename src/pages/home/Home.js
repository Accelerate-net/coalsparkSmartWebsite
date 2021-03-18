import React from "react";
import { useHistory } from "react-router-dom";
import MenuItem from "./MenuItem";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const axios = require('axios');

const SILENT_MENU_RELOAD_INTERVAL = 1000 * 60 * 2; //2 mins

function Home() {
  const history = useHistory();

  let menu = localStorage.getItem("menuData") ? JSON.parse(localStorage.getItem("menuData")) : [];
  var isMenuLoaded = false;
  if (menu && menu.length !== 0) {
    isMenuLoaded = true;
  }

  let urlParams = localStorage.getItem("metaData") ? JSON.parse(localStorage.getItem("metaData")) : {};
  if (
    !urlParams.branchCode ||
    !urlParams.tableNumber ||
    !urlParams.qrCodeReference ||
    !urlParams.mode
  ) {
    history.push("*");
  }

  /******************************
        LOAD MENU SILENTLY
  ******************************/
  const silentReloadMenu = () => {

    let userValidatedData = localStorage.getItem("userValidatedData") ? JSON.parse(localStorage.getItem("userValidatedData")) : {};

    const menu_api_data = {
      branchCode: urlParams.branchCode,
      token: userValidatedData.token,
    }

    axios({
      method: 'post',
      url: "https://accelerateengine.app/smart-menu/apis/menu.php",
      data: menu_api_data,
      timeout: 10000
    })
    .then(function (response) {
        if (response.data.status) {
          let data = response.data;
          localStorage.setItem("outletData", JSON.stringify(data.outletData));

          let menuData = data.menuData;
          menuData.sort((a, b) => a.rank - b.rank);
          localStorage.setItem("menuData", JSON.stringify(menuData));
          menu = menuData;
        }
    })
  };

  setInterval(function(){
    silentReloadMenu();
  }, SILENT_MENU_RELOAD_INTERVAL);


  const Loading = () => (
    <div className="home__menuCard" style={{ padding: "20px 16px 0" }}>
      <h1 className="dummyMenuTitle">Arabian Cuisine</h1>
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
        <div className="seperationLineDummy"></div>
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
        <div className="seperationLineDummy"></div>
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
        <div className="seperationLineDummy"></div>
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
        <div className="seperationLineDummy"></div>
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
    </div>
  );

  return (
    <div className="home">
      {isMenuLoaded ? <span></span> : <Loading />}
      {menu.map((menuA, k) => (
        <div key={k}>
          <div className="home__menuCard" style={{ padding: "20px 16px 0" }}>
            <h1 id={menuA.categoryName}>{menuA.categoryName}</h1>
            {menuA.menu.map((menuItems, i) => (
              <>
                <div key={i}>
                  <h1
                    className="subCategoryTitle"
                    id={menuItems.subCategoryName}
                  >
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
                        itemPrep={menuItem.averagePreparationTime}
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
      <div className="lastSpace"></div>
    </div>
  );
}

export default Home;
