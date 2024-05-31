/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";


const GenderComponent = (props) => { 
  useEffect(() => {
    bindEvents();
  }, []);

  function bindEvents(){
    window.addEventListener("CY_FACE_EMOTION_RESULT", handleSetEmotion );
  }


  useEffect(() => {
    const interval = setInterval(handleSetEmotion, 5000); // Fetches data every 5 seconds

    return () => clearInterval(interval); // This is important to clear the interval when the component unmounts
}, []);

  function handleSetEmotion(event) {
      // set userData from props to save dominantEmotion 
      props.setUserData(prevUserData => ({
        ...prevUserData,
        dominantEmotion: event.detail.dominantEmotion === ('' || 'Undefined' || 'undefined') ? 'Neutral' : event.detail.dominantEmotion
      }));
      console.log(event.detail.dominantEmotion);
      props.setUserDataChanged(true);
  }

  

  return (
    <div >
    </div>
  );
};

export default GenderComponent;
