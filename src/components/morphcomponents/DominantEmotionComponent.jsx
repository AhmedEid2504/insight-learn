/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";

const GenderComponent = (props) => {
  const emotionData = useRef([]);

  useEffect(() => {
    bindEvents();
  }, []);

  function bindEvents() {
    window.addEventListener("CY_FACE_EMOTION_RESULT", handleEmotionEvent);
  }

  function handleEmotionEvent(event) {
    // Push the new emotion data to the array
    emotionData.current.push(event.detail.dominantEmotion);

    // Keep the array size limited to the last 100 emotions
    if (emotionData.current.length > 100) {
      emotionData.current.shift();
    }
  }

  useEffect(() => {
    const interval = setInterval(handleSetEmotion, 5000); // Process data every 5 seconds

    return () => clearInterval(interval); // This is important to clear the interval when the component unmounts
  }, []);

  function handleSetEmotion() {
    if (emotionData.current.length === 0) return;

    // Calculate the most frequent emotion
    const emotionCounts = emotionData.current.reduce((acc, emotion) => {
      acc[emotion] = (acc[emotion] || 0) + 1;
      return acc;
    }, {});

    const mostFrequentEmotion = Object.keys(emotionCounts).reduce((a, b) =>
      emotionCounts[a] > emotionCounts[b] ? a : b
    );

    // Update the user data with the most frequent emotion
    props.setUserData((prevUserData) => ({
      ...prevUserData,
      dominantEmotion: mostFrequentEmotion || "Neutral",
    }));

    props.setUserDataChanged(true);
  }

  return <div></div>;
};

export default GenderComponent;
