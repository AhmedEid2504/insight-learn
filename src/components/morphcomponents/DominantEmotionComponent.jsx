/* eslint-disable react/prop-types */
import { useEffect } from "react";


const GenderComponent = (props) => {  
  useEffect(() => {
    bindEvents();
  }, []);

  function bindEvents(){
    window.addEventListener("CY_FACE_EMOTION_RESULT", (evt) => {
      // set userData from props to save dominantEmotion 
        { evt.detail.output.dominantGender !== undefined && props.setUserData(prevUserData => ({
          ...prevUserData,
          dominantGender: evt.detail.output.dominantGender
        }));
      }
    });
  }
  return (
    <div >
    </div>
  );
};

export default GenderComponent;
