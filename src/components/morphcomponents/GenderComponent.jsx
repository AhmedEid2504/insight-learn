/* eslint-disable react/prop-types */
import { useEffect } from "react";


const GenderComponent = (props) => {
  
  useEffect(() => {
    bindEvents();
  }, []);

  function bindEvents(){
    window.addEventListener("CY_FACE_GENDER_RESULT", (evt) => {
      // set userData from props to save dominantEmotion 
      props.setUserData(prevUserData => ({
        ...prevUserData,
        gender: evt.detail.output.mostConfident || ""
      }));
    });
  }
  return (
    <>

    </>
    
  );
};

export default GenderComponent;
