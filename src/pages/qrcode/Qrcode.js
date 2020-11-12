import React, { Component } from "react";
import "./Qrcode.css";
import QrReader from "react-qr-reader";
import logo from "../../assets/imgs/logo_white.png";

class Qrcode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      delay: 100,
      result: "No result",
    };
    this.handleScan = this.handleScan.bind(this);
  }
  //   componentDidMount() {
  //     if (navigator.getUserMedia) {
  //       navigator.getUserMedia(
  //         {
  //           video: true,
  //         },
  //         function (localMediaStream) {},
  //         function (err) {
  //           alert(
  //             "The following error occurred when trying to access the camera: " +
  //               err
  //           );
  //         }
  //       );
  //     } else {
  //       alert("Sorry, browser does not support camera access");
  //     }
  //   }
  handleScan(data) {
    this.setState({
      result: data,
    });
  }
  handleError(err) {
    console.error(err);
  }
  openImageDialog() {
    this.refs.qrReader1.openImageDialog();
  }

  render() {
    const previewStyle = {
      height: 240,
      width: 320,
    };

    return (
      <div className="qr__Wrapper">
        <div className="logo_Wrap">
          <img src={logo} alt="Zaitoon Logo" />
        </div>
        <div className="qr__Scan">
          <QrReader
            ref="qrReader1"
            delay={this.state.delay}
            previewStyle={previewStyle}
            // onLoad = {streamLabel: }
            onError={this.handleError}
            onScan={this.handleScan}
            legacyMode={true}
          />
        </div>
        <div className="qr__Btn">
          <input
            type="button"
            value="Submit QR Code"
            onClick={this.openImageDialog.bind(this)}
          />
        </div>
        <div className="qr__Result">
          {this.state.result === null ? (
            <p>Scan Failed! Try Again</p>
          ) : this.state.result === "No result" ? null : (
            <a href={this.state.result}>Click to Start Ordering!</a>
          )}
        </div>
        <div className="qr__Instruct">
          <p>Take a photo of the QR code and submit to access the link.</p>
        </div>
      </div>
    );
  }
}

export default Qrcode;
