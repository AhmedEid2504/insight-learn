/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

const GenderComponent = (props) => {  
  const [ dominantEmotion, setDominantEmotion ] = useState("Neutral");
  const [ emotions, setEmotions ] = useState([]); // New state variable to keep track of the emotions detected in the last 10 seconds

  useEffect(() => {
    bindEvents();
  }, []);

  function bindEvents(){
    window.addEventListener("CY_FACE_EMOTION_RESULT", handleEmotionEvent );
  }

  function handleEmotionEvent(event){
    setEmotions(prevEmotions => {
      if (prevEmotions.length >= 2) { // If the list size exceeds the limit, remove the oldest emotion
        prevEmotions.shift();
      }
      return [...prevEmotions, event.detail.dominantEmotion]; // Add the detected emotion to the list
    });
  }

  useEffect(() => {
    const interval = setInterval(handleSetEmotion, 5000); // Fetches data every 5 seconds

    return () => clearInterval(interval); // This is important to clear the interval when the component unmounts
  }, []);

  function handleSetEmotion() {
    // Calculate the most frequent emotion in the list
    const freqMap = {};
    emotions.forEach(emotion => freqMap[emotion] = (freqMap[emotion] || 0) + 1);
    const dominantEmotion = Object.keys(freqMap).reduce((a, b) => freqMap[a] > freqMap[b] ? a : b, "Neutral");

    // set userData from props to save dominantEmotion 
    props.setUserData(prevUserData => ({
      ...prevUserData,
      dominantEmotion: dominantEmotion
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