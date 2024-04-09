/* eslint-disable react/prop-types */
import { useEffect } from "react";

const AgeComponent = (props) => {


  useEffect(() => {
    function bindEvent() {
      window.addEventListener("CY_FACE_AGE_RESULT", handleAgeEvent);
    }

    function handleAgeEvent(evt) {
      // set userData from props to save dominantEmotion 
      props.setUserData(prevUserData => ({
        ...prevUserData,
        age: Math.floor(evt.detail.output.numericAge) || 0
      }));
      props.setUserDataChanged(true)
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
