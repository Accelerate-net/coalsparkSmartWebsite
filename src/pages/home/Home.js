import React from "react";
import { useHistory } from "react-router-dom";
import MenuItem from "./MenuItem";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const axios = require('axios');

const SILENT_MENU_RELOAD_INTERVAL = 1000 * 60 * 2; //2 mins
const SILENT_STATUS_REFRESH_INTERVAL = 1000 * 60 * 1; //1 mins
const DEFAULT_SUCCESS_REDIRECT_TIME = 500;

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


  //Format cart back to frontend standard
  function formatCart(cart){
    let original_menu = {};
    let menuData = localStorage.getItem('menuData') ? JSON.parse(localStorage.getItem('menuData')) : [];
    for(let n = 0; n < menuData.length; n++){
      for(let m = 0; m < menuData[n].menu.length; m++){
        for(let i = 0; i < menuData[n].menu[m].items.length; i++){
          let item = menuData[n].menu[m].items[i];
          original_menu[item.code] = item;
        }
      }
    }

    let formatted_cart = [];
    for(let i = 0; i < cart.length; i++){
      let serverItem = cart[i];
      let originalItem = original_menu[serverItem.code];
      if(!originalItem){
        return [];
      }
      else {
        let formatted_item = {
          itemCode: originalItem.code,
          itemName: originalItem.name,
          customOpt: originalItem.customOptions,
          itemPrice: serverItem.price,
          itemVeg: originalItem.isVeg,
          isCustom: originalItem.isCustomisable,
          itemOptions: originalItem.customOptions,
          itemCount: serverItem.qty,
          orderPersonLabel: serverItem.orderPersonLabel,
          orderPersonMobile: serverItem.orderPersonMobile,
          customVariant: serverItem.variant,
          itemOriginalPrice: serverItem.qty * serverItem.price
        }

        formatted_cart.push(formatted_item);
      }
    }
    return formatted_cart;
  }


  /******************************
       CHECK STATUS SILENTLY
  ******************************/

  function silentCheckStatus() {
      let userData = localStorage.getItem("userValidatedData")
        ? JSON.parse(localStorage.getItem("userValidatedData"))
        : {};
      let metaData = localStorage.getItem("metaData")
        ? JSON.parse(localStorage.getItem("metaData"))
        : {};
      let peerData = localStorage.getItem("peerData")
        ? JSON.parse(localStorage.getItem("peerData"))
        : {};
      let optionalPeerCode = peerData.peerCode;

      /******************************
              CHECK ACTIVE 
      ******************************/
      const status_api_url = "https://accelerateengine.app/smart-menu/apis/checkstatus.php";
      const status_api_options = {
        params : {
          branchCode: metaData.branchCode,
          qrCodeReference: metaData.qrCodeReference,
          userMobile: userData.mobile,
          tableNumber: metaData.tableNumber,
          peerCode: optionalPeerCode && optionalPeerCode != null && optionalPeerCode != "" ? optionalPeerCode : 0
        },
        timeout: 10000
      }

      axios.get(status_api_url, status_api_options)
      .then(function (apiResponse) {
          let response = apiResponse.data;
          if (response.status) {
            let activeStatusData = response.data;
            let getActiveStatus = activeStatusData.status;
            localStorage.setItem("activeStatus", JSON.stringify(getActiveStatus));
            
            activeStatusData.cart = formatCart(activeStatusData.cart);
            localStorage.setItem("activeStatusData", JSON.stringify(activeStatusData));

            switch(getActiveStatus){
              case "active":{
                localStorage.setItem("oldCart", JSON.stringify(activeStatusData.cart));
                break;
              }
              case "billed":{
                setTimeout(() => { history.push("/invoice"); }, SILENT_STATUS_REFRESH_INTERVAL);
                break;
              }
              default:{
                break;
              }
            }
          }
      })
      .catch(function (error) {
      })
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

  setInterval(function(){
    silentCheckStatus();
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
