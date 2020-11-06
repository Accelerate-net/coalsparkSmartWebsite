import React, { useState } from "react";
import "./Feedback.css";
import angryEmoji from "../../assets/imgs/angryemoji.png";
import sadEmoji from "../../assets/imgs/sademoji.png";
import happyEmoji from "../../assets/imgs/happyemoji.png";

function Feedback() {
  const [emojiVal, handleEmojiValue] = useState("happy");
  const [feedBackMess, handleFeedbackBtn] = useState([]);
  const [feedComm, handleFeedComments] = useState("");
  const sadEmojiImg = document.getElementsByClassName("sad__Emoji");
  const angryEmojiImg = document.getElementsByClassName("angry__Emoji");
  const happyEmojiImg = document.getElementsByClassName("happy__Emoji");
  const feedbackBtns = document.getElementsByClassName("feedback__btn");

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
  }

  function handleSadEmojiSelection() {
    let sademojiVal = document
      .getElementsByClassName("sad__Emoji")[0]
      .getAttribute("data-emoji");

    angryEmojiImg[0].classList.remove("selectborder");
    sadEmojiImg[0].classList.add("selectborder");
    happyEmojiImg[0].classList.remove("selectborder");

    handleEmojiValue(sademojiVal);
  }

  function handleHappyEmojiSelection() {
    let happyemojiVal = document
      .getElementsByClassName("happy__Emoji")[0]
      .getAttribute("data-emoji");
    angryEmojiImg[0].classList.remove("selectborder");
    sadEmojiImg[0].classList.remove("selectborder");
    happyEmojiImg[0].classList.add("selectborder");
    handleEmojiValue(happyemojiVal);
  }

  let uniqueFeedb;
  function checkDup() {
    uniqueFeedb = [...new Set(feedBackMess)];
    return uniqueFeedb;
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

    checkDup();
    console.log(uniqueFeedb);
    handleFeedbackBtn((odlArray) => [odlArray, a]);
  }

  //   Stoting the feedback data
  var feedBackData = {
    emojiValue: emojiVal,
    feedbackMessgae: feedBackMess,
    feedbackComments: feedComm,
  };

  //   Function after clciking send feedback button
  function gatherFeedback() {
    console.log(feedBackData);
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

  //   Feedback Button Data in array form
  const angryFoodButton = [
    "Worst food ever",
    "Worst food ever ever",
    "Worst food ever ever ever",
    "Worst food ever",
    "Worst food ever ever",
  ];

  const sadFoodButton = [
    "Slow serving time ever",
    "Slow serving time ever ever",
    "Slow serving time ever ever",
    "Slow serving time ever everever",
    "Slow serving time ever",
  ];

  const happyFoodButton = [
    "Amazing Food",
    "Value for Money",
    "Superb Staff",
    "Excellent Service",
    "Had a Nice Experience"
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
      <div className="feedback__title">
        <h3>Your Feedback</h3>
        <p>We value your feedback</p>
      </div>
      <div className="feeback__innerWrapper">
        <div className="emoji__Wrapper">
          <div
            className="angry__Emoji"
            data-emoji="angry"
            onClick={handleAngryEmojiSelection}
          >
            <img src={angryEmoji} alt="" />
          </div>
          <div
            className="sad__Emoji"
            data-emoji="sad"
            onClick={handleSadEmojiSelection}
          >
            <img src={sadEmoji} alt="" />
          </div>
          <div
            className="happy__Emoji selectborder"
            data-emoji="happy"
            onClick={handleHappyEmojiSelection}
          >
            <img src={happyEmoji} alt="" />
          </div>
        </div>
        <div className="emoji__Text">{renderMessage()}</div>
        <div className="feedback__BtnsWrapper">{renderFeedbackButton()}</div>
        <div className="feedback___sendBtn">
          <form>
            <input
              type="text"
              name="feedbackComments"
              placeholder="Any other comments?"
              value={feedComm}
              onChange={(e) => handleFeedComment(e)}
            />
          </form>
          <button className="feed_sendBtn final" onClick={gatherFeedback()}>
            Submit Feedback
          </button>
        </div>
      </div>
    </div>
  );
}

export default Feedback;
