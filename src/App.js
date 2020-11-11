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

    // let urlParams = localStorage.getItem("metaData")
    //   ? JSON.parse(localStorage.getItem("metaData"))
    //   : {};

    // const showToast = (message, type) => {
    //   switch(type){
    //     case "error":{
    //       toast.error(message);
    //       break;
    //     }
    //     case "warning":{
    //       toast.warning(message);
    //       break;
    //     }
    //     default:{
    //       toast.info(message);
    //       break;
    //     }
    //   }
    // };



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
              <Route exact path="/thankyou">
                <Thanks />
              </Route>
              <Route path="*">
                <Error />
              </Route>
            </Switch>
          </div>
        </Router>
      );
    }
  }
}

export default App;
