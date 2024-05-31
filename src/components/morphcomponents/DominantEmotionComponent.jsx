/* eslint-disable react/prop-types */
import { useEffect } from "react";


const GenderComponent = (props) => {  
  useEffect(() => {
    const interval =  setInterval(bindEvents, 5000);
    return () => clearInterval(interval);
  }, []);

  function bindEvents(){
    window.addEventListener("CY_FACE_EMOTION_RESULT", (evt) => {
      // set userData from props to save dominantEmotion 
      props.setUserData(prevUserData => ({
        ...prevUserData,
        dominantEmotion: evt.detail.output.dominantEmotion || "Neutral"
      }));
      console.log(evt.detail.output.dominantEmotion);
      props.setUserDataChanged(true)
    });
  }
  return (
    <div >
    </div>
  );
};

export default GenderComponent;
