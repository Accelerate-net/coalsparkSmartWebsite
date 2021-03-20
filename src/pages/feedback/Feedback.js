import React, { useState } from "react";
import "./Feedback.css";
import angryEmoji from "../../assets/imgs/angryemoji.png";
import sadEmoji from "../../assets/imgs/sademoji.png";
import happyEmoji from "../../assets/imgs/happyemoji.png";
import { useHistory } from "react-router-dom";
const axios = require("axios");

function Feedback() {
  const [emojiVal, handleEmojiValue] = useState("happy");
  const [feedComm, handleFeedComments] = useState("");
  const sadEmojiImg = document.getElementsByClassName("sad__Emoji");
  const angryEmojiImg = document.getElementsByClassName("angry__Emoji");
  const happyEmojiImg = document.getElementsByClassName("happy__Emoji");
  const feedbackBtns = document.getElementsByClassName("feedback__btn");

  const history = useHistory();

  if (window.location.pathname === "/feedback") {
    window.addEventListener("popstate", function (event) {
      history.push("/feedback");
    });
  }

  const handleFeedComment = (e) => {
    let userFeed = e.target.value;
    handleFeedComments(userFeed);
  };

  function handleAngryEmojiSelection() {
    let angryemojiVal = document
      .getElementsByClassName("angry__Emoji")[0]
      .getAttribute("data-emoji");

    angryEmojiImg[0].classList.add("selectborder");
    sadEmojiImg[0].classList.remove("selectborder");
    happyEmojiImg[0].classList.remove("selectborder");

    handleEmojiValue(angryemojiVal);
    for(var i = 0; i<5 ; i++){
      feedbackBtns[i].classList.remove("selectfill")
    }
  }

  function handleSadEmojiSelection() {
    let sademojiVal = document
      .getElementsByClassName("sad__Emoji")[0]
      .getAttribute("data-emoji");

    angryEmojiImg[0].classList.remove("selectborder");
    sadEmojiImg[0].classList.add("selectborder");
    happyEmojiImg[0].classList.remove("selectborder");

    handleEmojiValue(sademojiVal);
    for(var i = 0; i<5 ; i++){
      feedbackBtns[i].classList.remove("selectfill")
    }
  }

  function handleHappyEmojiSelection() {
    let happyemojiVal = document
      .getElementsByClassName("happy__Emoji")[0]
      .getAttribute("data-emoji");
    angryEmojiImg[0].classList.remove("selectborder");
    sadEmojiImg[0].classList.remove("selectborder");
    happyEmojiImg[0].classList.add("selectborder");
    handleEmojiValue(happyemojiVal);
    for(var i = 0; i<5 ; i++){
      feedbackBtns[i].classList.remove("selectfill")
    }
  }

  //   Function to manage the feedback btns
  function manageFeedbackBtn(a, key) {
    if (
      document
        .getElementsByClassName("feedback__btn")
        [key].getAttribute("data-feedback-value") === a
    ) {
      feedbackBtns[key].classList.toggle("selectfill");
    }
  }

  const feedbackRating = {};
  feedbackRating["angry"] = 1;
  feedbackRating["sad"] = 2;
  feedbackRating["happy"] = 3;

  function gatherFeedback() {
    let allTags = [];
    var elems = document.getElementsByClassName("feedback__BtnsWrapper");
    Array.prototype.forEach.call(elems, function(elem) {
        var x = elem.getElementsByClassName("selectfill");
        Array.prototype.forEach.call(x, function(feedButton) {
            allTags.push(feedButton.innerText);
        });
    });

    const queryString = window.location.search;
    const queryParamsInUrl = new URLSearchParams(queryString);
    const redirect_MasterOrderId = queryParamsInUrl.get("orderId");
    const redirect_token = queryParamsInUrl.get("token");

    if(redirect_MasterOrderId){
          const feedbackData = {
            masterOrderId: redirect_MasterOrderId,
            rating: feedbackRating[emojiVal],
            tags: allTags,
            comments: feedComm,
            token: redirect_token
          };

          const feedback_api_options = {
            method: "post",
            url: "https://accelerateengine.app/smart-menu/apis/recordfeedback.php",
            data: feedbackData,
            timeout: 10000,
          };

          axios(feedback_api_options)
          .then(function (response) {
              window.localStorage.clear();
              setTimeout(() => {
                history.push("/thankyou");
              }, 1000);
            })
          .catch(function (error) {
              window.localStorage.clear();
              setTimeout(() => {
                history.push("/thankyou");
              }, 1000);
          });
    }
  }

  //   Message rendering conditionally
  const renderMessage = () => {
    if (emojiVal === "angry") {
      return (
        <>
          <h3>Ohh Snap!</h3>
          <p>Where did we go wrong?</p>
        </>
      );
    } else if (emojiVal === "sad") {
      return (
        <>
          <h3>Sorry!</h3>
          <p>How can we imporve?</p>
        </>
      );
    } else if (emojiVal === "happy") {
      return (
        <>
          <h3>Great!</h3>
          <p>What did you like the most?</p>
        </>
      );
    }
  };

  //Feedback Button Data in array form
  const angryFoodButton = [
    "No worth for money",
    "Service related",
    "Not liking the ambience",
    "Food quality",
    "Order Process"
  ];

  const sadFoodButton = [
    "Delayed serving time",
    "Table not cleaned",
    "Food taste",
    "Confusing Menu",
    "Less options to try"
  ];

  const happyFoodButton = [
    "Amazing Food",
    "Value for Money",
    "Superb Staff",
    "Excellent Service",
    "6 Star Experience"
  ];

  //   Rendering Button dynamically from the button array data
  const renderFeedbackButton = () => {
    if (emojiVal === "angry") {
      return (
        <>
          {angryFoodButton.map((angrybtn, a) => (
            <div
              className="feedback__btn"
              key={a}
              data-feedback-value={angrybtn}
              onClick={() => manageFeedbackBtn(angrybtn, a)}
            >
              {angrybtn}
            </div>
          ))}
        </>
      );
    } else if (emojiVal === "sad") {
      return (
        <>
          {sadFoodButton.map((sadbtn, s) => (
            <div
              className="feedback__btn"
              key={s}
              data-feedback-value={sadbtn}
              onClick={() => manageFeedbackBtn(sadbtn, s)}
            >
              {sadbtn}
            </div>
          ))}
        </>
      );
    } else if (emojiVal === "happy") {
      return (
        <>
          {happyFoodButton.map((happybtn, h) => (
            <div
              className="feedback__btn"
              key={h}
              data-feedback-value={happybtn}
              onClick={() => manageFeedbackBtn(happybtn, h)}
            >
              {happybtn}
            </div>
          ))}
        </>
      );
    }
  };

  return (
    <div className="feedback__Wrapper">
      <div className="payment__title">
        <h3 className="animate__backInDown"><i class="fa fa-check-circle"></i> Payment Successful</h3>
      </div>
      <div className="feeback__innerWrapper">
        <div className="feedback__Title"><p className="animate__fadeIn">How was your experience with <b>Zaitoon</b> today?</p></div>
        <div className="emoji__Wrapper">
          <div
            className="angry__Emoji animate__heartBeat"
            data-emoji="angry"
            onClick={() => handleAngryEmojiSelection()}
          >
            <img src={angryEmoji} alt="" />
          </div>
          <div
            className="sad__Emoji animate__heartBeat"
            data-emoji="sad"
            onClick={() => handleSadEmojiSelection()}
          >
            <img src={sadEmoji} alt="" />
          </div>
          <div
            className="happy__Emoji animate__heartBeat selectborder"
            data-emoji="happy"
            onClick={() => handleHappyEmojiSelection()}
          >
            <img src={happyEmoji} alt="" />
          </div>
        </div>
        <div className="emoji__Text">{renderMessage()}</div>
        <div className="feedback__BtnsWrapper">{renderFeedbackButton()}</div>
        <div className="feedback___sendBtn">
          <form>
            <textarea className="feedbackComments" type="text"
              name="feedbackComments"
              placeholder="Any other comments?"
              value={feedComm}
              onChange={(e) => handleFeedComment(e)} rows="4" charswidth="23" name="text_body"></textarea>
          </form>
          <button className="feed_sendBtn final" onClick={() => gatherFeedback()}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default Feedback;
