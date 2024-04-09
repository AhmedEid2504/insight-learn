/* eslint-disable react/prop-types */
import { useEffect } from "react";


const GenderComponent = (props) => {  
  useEffect(() => {
    bindEvents();
  }, []);

  function bindEvents(){
    window.addEventListener("CY_FACE_EMOTION_RESULT", (evt) => {
      // set userData from props to save dominantEmotion 
      props.setUserData(prevUserData => ({
        ...prevUserData,
        dominantEmotion: evt.detail.output.dominantEmotion || ""
      }));
    });
  }
  return (
    <div >
    </div>
  );
};

export default GenderComponent;
