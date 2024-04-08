/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";


const GenderComponent = (props) => {
  const [gender, setGender] = useState("");
  
  useEffect(() => {
    if (!props.userData.userName || props.isTyping) {
      // If userName is empty, user is typing, or data has been sent recently, return without saving data
      console.error("Please enter your name or wait until data can be sent again");
      return;
    }
    bindEvents();
  }, []);

  function bindEvents(){
    window.addEventListener("CY_FACE_GENDER_RESULT", (evt) => {
      setGender(evt.detail.output.mostConfident || "") ;
      props.setUserData({ ...props.userData, gender: gender });
    });
  }
  return (
    <>
    <p style={{fontSize:"20px"}}>Gender Component:</p>
    <div style={{minHeight: "200px"}}>
    <p>{gender}</p>
    {(gender.toLocaleLowerCase() === 'male') && <img alt="" src="image/male.png"/>}
    {(gender.toLocaleLowerCase() === 'female') && <img alt="" src="images/female.png"/>}
    </div>
    </>
    
  );
};

export default GenderComponent;
