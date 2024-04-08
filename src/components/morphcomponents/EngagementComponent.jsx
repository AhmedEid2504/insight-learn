import { useState, useEffect, useRef } from "react";
import "./componentCSS/engagementComponent.css"


const EngagementComponent = () => {
  const [arousal, setArousal] = useState(0);
  const [valence, setValence] = useState(0);
  const [attention, setAttention] = useState(0);
  const timeout = useRef(undefined);

  useEffect(() => {
    function resetTimeout() {
      let to = timeout.current;
      clearTimeout(to);
      to =setTimeout(() => {
        setAllToZero();
      }, 3000)

      timeout.current= to;
    }
  
    function bindEvent(){
        window.addEventListener(
            "CY_FACE_AROUSAL_VALENCE_RESULT",
            handleArousalValenceEvents
          );
        window.addEventListener("CY_FACE_ATTENTION_RESULT", handleAttentionEvents);
    }
    
    function handleArousalValenceEvents (evt) {
        setValence(Math.abs(evt.detail.output.valence * 100) || 0);
        setArousal(Math.abs(evt.detail.output.arousal * 100) || 0);
        resetTimeout();
    }
    function handleAttentionEvents (evt) {
        if (evt.detail.output.attention > 0.1) {
            setAttention(evt.detail.output.attention * 100 || 0);
            resetTimeout();
        }
    }
    function setAllToZero() {
        setArousal(0);
        setValence(0);
        setAttention(0);
    }
    bindEvent();
    
  }, []);


  return (
    <>
   
    </>
    
  );
};

export default EngagementComponent;
