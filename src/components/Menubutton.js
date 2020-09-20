import React, { Component } from "react";
import "./Menubutton.css";
import { Link } from "react-scroll";

class Popup extends React.Component {
  render() {
    return (
      <div className="popup" onClick={this.props.closePopup}>
        <div className="innerwrapper">
          <div className="popup_inner">
            {" "}
            {this.props.text.map((main) => (
              <Link
                to={main.categoryName}
                duration={1000}
                smooth={true}
                className="categoryText"
                onClick={this.props.closePopup}>
                {main.categoryName}{" "}
              </Link>
            ))}{" "}
          </div>{" "}
        </div>{" "}
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
          id="menuButtonWrapper">
          <div className="menuButton">
            <span onClick={this.togglePopup}>
              <i className="fas fa-utensils"> </i>MENU
            </span>
          </div>
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
