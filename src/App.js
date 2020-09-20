import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/home/Home";
import Checkout from "./pages/cart/Checkout";
import MenuButton from "./components/Menubutton";

const brandId = "zaitoon";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      menu: [],
    };
  }

  componentDidMount() {
    var post;

    // Call the API
    fetch(
      "https://jsonblob.com/api/jsonBlob/37850320-f982-11ea-a18d-69ca0607fcc5/" +
        brandId
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
          brand: data,
        });
        // Fetch another API
        return fetch(
          "https://jsonblob.com/api/jsonBlob/fd947b2d-f7e1-11ea-aed3-e943147a178d/"
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
          userData.sort((a, b) => a.rank - b.rank);
          this.setState({
            menuLoaded: true,
            menu: userData,
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
        <div className="loadingStyle"> Fetching our Amazing Dishes 😋... </div>
      );
    } else {
      return (
        <Router>
          <div>
            <Switch>
              <Route path="/checkout">
                <Checkout />
              </Route>
              <Route exact path="/">
                <Header />
                <Home menu={menu} brand={brand} />
                <MenuButton menuCategory={menu} />
                {/* <h1>Home</h1> */}
              </Route>
            </Switch>
          </div>
        </Router>
      );
    }
  }
}

export default App;
