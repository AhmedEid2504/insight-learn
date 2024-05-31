/* eslint-disable react/prop-types */
import { useEffect } from "react";


const GenderComponent = (props) => {  
  useEffect(() => {
    bindEvents();
  }, []);

  function bindEvents(){
    window.addEventListener("CY_FACE_EMOTION_RESULT", handleEmotionEvent);
  }

  function handleEmotionEvent(evt) {
    setTimeout(() => {
      // set userData from props to save dominantEmotion 
      props.setUserData(prevUserData => ({
        ...prevUserData,
        dominantEmotion: evt.detail.output.dominantEmotion || "Neutral"
      }));
      console.log(props.userData.dominantEmotion);
    }, 5000); // Delay of 5 seconds
  }
  useEffect (() => {
    handleEmotionEvent();
  }, []);

  return (
    <div >
    </div>
  );
};

export default GenderComponent;
