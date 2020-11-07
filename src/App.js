import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/home/Home";
import Checkout from "./pages/cart/Checkout";
import MenuButton from "./components/Menubutton";
import Custom from "./pages/custom/Custom";
import Search from "./pages/search/Search";
import Login from "./pages/login/Login";
import Success from "./pages/success/Success";
import Error from "./pages/error/Error";
import Invoice from "./pages/invoice/Invoice";
import Feedback from "./pages/feedback/Feedback";
import Thanks from "./pages/thankyou/Thanks";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      menu: [],
      activeStatus: "",
    };
  }

  componentDidMount() {
    let urlParams = localStorage.getItem("metaData")
      ? JSON.parse(localStorage.getItem("metaData"))
      : {};

    const menu_api_url =
      "https://accelerateengine.app/smart-menu/apis/menu.php?branchCode=VELACHERY";

    fetch(menu_api_url)
      .then((response) => response.json())
      .then((data) => {
        if (data.status) {
          localStorage.setItem("outletData", JSON.stringify(data.outletData));
          this.setState({
            brandLoaded: true,
            brand: data.outletData,
          });

          let menuData = data.menuData;
          menuData.sort((a, b) => a.rank - b.rank);

          this.setState({
            menuLoaded: true,
            menu: menuData,
          });
        } else {
          //TODO Show Error Toast and go back to main menu
        }
      });
  }

  render() {
    const { error, menu, brand } = this.state;

    if (error) {
      return (
        <div className="loadingStyle">
          Something went wrong, try refreshing this page.
        </div>
      );
    } else {
      return (
        <Router>
          <div>
            <Switch>
              <Route exact path="/customised">
                <Custom />
              </Route>
              <Route path="/search">
                <Search searchItem={menu} />
              </Route>
              <Route path="/checkout">
                <Checkout />
              </Route>
              <Route exact path="/menu">
                <Header />
                <Home menu={menu} brand={brand} />
                <MenuButton menuCategory={menu} />
              </Route>
              <Route exact path="/">
                <Login />
              </Route>
              <Route path="/success">
                <Success />
              </Route>
              <Route path="/feedback">
                <Feedback />
              </Route>
              <Route path="/invoice">
                <Invoice />
              </Route>
              <Route>
                <Thanks path="/thankyou" />
              </Route>
              <Route>
                <Error path="*" />
              </Route>
            </Switch>
          </div>
        </Router>
      );
    }
  }
}

export default App;
