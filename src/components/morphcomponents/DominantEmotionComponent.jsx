/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";


const GenderComponent = (props) => {
  const [dominantEmotion, setDominantEmotion] = useState("");
  
  useEffect(() => {
    if (!props.userData.userName || props.isTyping) {
      // If userName is empty, user is typing, or data has been sent recently, return without saving data
      console.error("Please enter your name or wait until data can be sent again");
      return;
    }
    bindEvents();
  }, []);

  function bindEvents(){
    window.addEventListener("CY_FACE_EMOTION_RESULT", (evt) => {
      setDominantEmotion(evt.detail.output.dominantEmotion || "") ;
      props.setUserData({...props.userData, dominantEmotion: dominantEmotion})
    });
  }
  return (
    <div >

    </div>
  );
};

export default GenderComponent;
