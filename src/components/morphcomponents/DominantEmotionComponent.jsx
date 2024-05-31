/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

const GenderComponent = (props) => {  
  const [emotionBuffer, setEmotionBuffer] = useState([]);

  useEffect(() => {
    bindEvents();
    const interval = setInterval(calculateDominantEmotion, 5000); // Calculate dominant emotion every 5 seconds
    return () => {
      clearInterval(interval); // Clear interval when component unmounts
      window.removeEventListener("CY_FACE_EMOTION_RESULT", handleEmotionEvent); // Remove event listener when component unmounts
    };
  }, []);

  function bindEvents(){
    window.addEventListener("CY_FACE_EMOTION_RESULT", handleEmotionEvent);
  }

  function handleEmotionEvent(evt) {
    setEmotionBuffer(prevBuffer => [...prevBuffer, evt.detail.output.dominantEmotion || "Neutral"]);
  }

  function calculateDominantEmotion() {
    if (emotionBuffer.length === 0) return;

    const emotionCounts = emotionBuffer.reduce((acc, curr) => {
      if (curr in acc) {
        acc[curr]++;
      } else {
        acc[curr] = 1;
      }
      return acc;
    }, {});

    const dominantEmotion = Object.keys(emotionCounts).reduce((a, b) => emotionCounts[a] > emotionCounts[b] ? a : b);

    props.setUserData(prevUserData => ({
      ...prevUserData,
      dominantEmotion: dominantEmotion
    }));

    console.log(dominantEmotion);
    props.setUserDataChanged(true);
    setEmotionBuffer([]); // Clear the buffer
  }

  return (
    <div >
    </div>
  );
};

export default GenderComponent;