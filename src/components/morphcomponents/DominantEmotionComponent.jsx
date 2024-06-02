/* eslint-disable react/prop-types */
import { useEffect } from "react";


const GenderComponent = (props) => {  
  useEffect(() => {
    bindEvents();
  }, []);

  function bindEvents(){
    window.addEventListener("CY_FACE_EMOTION_RESULT", (evt) => {
      // set userData from props to save dominantEmotion 
      props.setUserData((prevData) => {
        return {
          ...prevData,
          dominantEmotion: evt.detail.dominantEmotion
        }
      });
    });
  }
  return (
    <div >
    </div>
  );
};

export default GenderComponent;
