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
import Error from "./pages/error/Error";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      // readyToRedirect: false,
      menu: [],
    };
  }

  componentDidMount() {
    // Call the API
    let urlParams = JSON.parse(localStorage.getItem("metaData"));

    fetch(
      "https://jsonblob.com/api/jsonBlob/c93505a6-1a16-11eb-b486-f3ef648c1054/?branchCode=" +
        urlParams.branchCode +
        "&mode=" +
        urlParams.mode
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return Promise.reject(response);
        }
      })
      .then((data) => {
        // Store the post data to a variable
        // post = data;
        this.setState({
          brandLoaded: true,
          brand: data.outletData,
        });
        // Fetch another API
        return fetch(
          "https://jsonblob.com/api/jsonBlob/c93505a6-1a16-11eb-b486-f3ef648c1054/?branchCode=" +
            urlParams.branchCode +
            "&mode=" +
            urlParams.mode
        );
      })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return Promise.reject(response);
        }
      })
      .then(
        (userData) => {
          userData.menuData.sort((a, b) => a.rank - b.rank);
          this.setState({
            menuLoaded: true,
            menu: userData.menuData,
          });
        },
        (error) => {
          // this.setState({
          //   error,
          // });
          console.warn(error);
        }
      );
  }

  render() {
    const { error, menuLoaded, menu, brand } = this.state;
    if (error) {
      return (
        <div className="loadingStyle"> Error in loading. Try Refreshing. </div>
      );
    } else if (!menuLoaded) {
      return (
        <div className="loadingStyle">
          {" "}
          Fetching our Amazing Dishes{" "}
          <span role="img" aria-label="emoji">
            😋
          </span>
          ...{" "}
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
                <Checkout outletData={brand} />
              </Route>
              <Route exact path="/menu">
                <Header />
                <Home menu={menu} brand={brand} />
                <MenuButton menuCategory={menu} />
              </Route>
              <Route exact path="/">
                <Login />
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
