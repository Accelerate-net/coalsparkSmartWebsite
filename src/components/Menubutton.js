import React, { Component } from "react";
import "./Menubutton.css";
import { Link } from "react-scroll";
import CartBanner from "./CartBanner.js";

class Popup extends React.Component {
  render() {
    return (
      <div className="popup" onClick={this.props.closePopup}>
        <div className="innerwrapper">
          <div className="popup_inner">
            {this.props.text.map((main, i) =>
              main.menu.map((sub, k) => (
                <Link
                  key={i}
                  to={sub.subCategoryName}
                  duration={1000}
                  smooth={true}
                  className="categoryText"
                  onClick={this.props.closePopup}
                >
                  <span>{sub.subCategoryName}</span>

                  <span id="subCatItemCount">{sub.items.length}</span>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    );
  }
}
class MenuButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopup: false,
    };
    this.togglePopup = this.togglePopup.bind(this);
  }
  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup,
    });
  }

  render() {
    return (
      <>
        <div
          className="menuButtonWrapper animate__animated animate__fadeInUp"
          id="menuButtonWrapper"
        >
          <div className="menuButton">
            <span onClick={this.togglePopup}>
              <i className="fas fa-utensils"> </i>MENU
            </span>
          </div>
          <CartBanner />
        </div>

        {this.state.showPopup ? (
          <Popup
            text={this.props.menuCategory}
            closePopup={this.togglePopup.bind(this)}
          />
        ) : null}
      </>
    );
  }
}

export default MenuButton;
