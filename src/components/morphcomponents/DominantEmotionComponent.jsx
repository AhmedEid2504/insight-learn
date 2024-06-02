/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";


const GenderComponent = (props) => {  
  const [dominantEmotion, setDominantEmotion] = useState("Neutral");

  useEffect(() => {
    bindEvents();
  }, []);

  function bindEvents(){
    window.addEventListener("CY_FACE_EMOTION_RESULT", (evt) => {
      setDominantEmotion(evt.detail.output.dominantEmotion || "Neutral") ;
      // set userData from props to save dominantEmotion 
      
      props.setUserData((prevData) => {
        return {
          ...prevData,
          dominantEmotion: dominantEmotion
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
