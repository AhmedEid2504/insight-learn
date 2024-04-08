import { useState, useEffect } from "react";


const GenderComponent = () => {
  const [gender, setGender] = useState("");
  
  useEffect(() => {
    bindEvents();
  }, []);

  function bindEvents(){
    window.addEventListener("CY_FACE_GENDER_RESULT", (evt) => {
      setGender(evt.detail.output.mostConfident || "") ;
    });
  }
  return (
    <>
    </>
    
  );
};

export default GenderComponent;
