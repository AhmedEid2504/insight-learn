/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import "./componentCSS/ageComponent.css";

const AgeComponent = (props) => {
  const [ageValue, setAgeValue] = useState(0);
  const [ageMin, setAgeMin] = useState(0);
  const [ageMax, setAgeMax] = useState(10);
  const timeout = useRef(undefined);

  useEffect(() => {
    function resetTimeout() {
      let to = timeout.current;
      clearTimeout(to);
      to = setTimeout(() => {
        setAgeValue(0);
        setAgeMin(0);
        setAgeMax(0);
      }, 3000);
      timeout.current = to;
    }

    function bindEvent() {
      window.addEventListener("CY_FACE_AGE_RESULT", handleAgeEvent);
    }

    function handleAgeEvent(evt) {
      resetTimeout();
      let age = Math.floor(evt.detail.output.numericAge) || 0;
      setAgeValue(age);
      // set userData from props to save dominantEmotion 
      props.setUserData(prevUserData => ({
        ...prevUserData,
        age: Math.floor(evt.detail.output.numericAge) || 0
      }));
      props.setUserDataChanged(true)
      setAgeMin(Math.floor(age / 10) * 10);
      setAgeMax((Math.floor(age / 10) + 1) * 10);
    }

    bindEvent();

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("CY_FACE_AGE_RESULT", handleAgeEvent);
    };
  }, []);

  return (
    <div>
    </div>
  );
};

export default AgeComponent;
