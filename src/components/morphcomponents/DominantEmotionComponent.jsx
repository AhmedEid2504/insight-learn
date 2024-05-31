/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";


const GenderComponent = (props) => { 
  const [ dominantEmotion, setDominantEmotion ] = useState("Neutral");
  useEffect(() => {
    bindEvents();
  }, []);

  function bindEvents(){
    window.addEventListener("CY_FACE_EMOTION_RESULT", handleEmotionEvent );
  }

  function handleEmotionEvent(event){
    setDominantEmotion(event.detail.dominantEmotion);
  }

  useEffect(() => {
    const interval = setInterval(handleSetEmotion, 5000); // Fetches data every 5 seconds

    return () => clearInterval(interval); // This is important to clear the interval when the component unmounts
}, []);

  function handleSetEmotion() {
      // set userData from props to save dominantEmotion 
      props.setUserData(prevUserData => ({
        ...prevUserData,
        dominantEmotion: dominantEmotion === '' ? 'Neutral' : dominantEmotion
      }));
      console.log(dominantEmotion);
      props.setUserDataChanged(true);
  }

  

  return (
    <div >
    </div>
  );
};

export default GenderComponent;
