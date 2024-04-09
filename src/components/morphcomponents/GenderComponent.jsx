/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";


const GenderComponent = (props) => {
  const [gender, setGender] = useState("");
  
  useEffect(() => {
    bindEvents();
  }, []);

  function bindEvents(){
    window.addEventListener("CY_FACE_GENDER_RESULT", (evt) => {
      setGender(evt.detail.output.mostConfident || "") ;
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
