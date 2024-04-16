
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Login from './pages/Login';
import Signup from './pages/Signup';

// morphcast
import { useEffect, useRef, useState } from "react";
import { useExternalScript } from "./helpers/ai-sdk/externalScriptsLoader";
import { getAiSdkControls } from "./helpers/ai-sdk/loader";
import GenderComponent from "./components/morphcomponents/GenderComponent";
import AgeComponent from "./components/morphcomponents/AgeComponent";
import DominantEmotionComponent from "./components/morphcomponents/DominantEmotionComponent";
import FeatureComponent from "./components/morphcomponents/FeatureComponent";
import EngagementComponent from "./components/morphcomponents/EngagementComponent";
import FaceTrackerComponent from "./components/morphcomponents/FaceTrackerComponent";
import { ref, push, serverTimestamp, set } from "firebase/database";
import {database} from "/src/firebase";

function App() {

  const [darkMode, setDarkMode] = useState(true);

  // morphcast
  const mphToolsState = useExternalScript("https://sdk.morphcast.com/mphtools/v1.0/mphtools.js");
    const aiSdkState = useExternalScript("https://ai-sdk.morphcast.com/v1.16/ai-sdk.js");
    const videoEl = useRef(undefined)
    const [userData, setUserData] = useState({
        userName:'',
        age:'',
        gender: '',
        dominantEmotion: '',
        arousal: '',
        valence: '',
        attention:'',
        features: ["","","","",""],
        time:serverTimestamp()
    })
    const [isTyping, setIsTyping] = useState(false); // State variable to track whether the user is typing
    const [userDataChanged, setUserDataChanged] = useState(false); // State variable to track changes in userData
    const [isSendingData, setIsSendingData] = useState(false); // State variable to track whether data is currently being sent

    async function saveToFirebase() {
      if (!isTyping && userDataChanged && userData.userName.trim() !== "" && !isSendingData) {
          setIsSendingData(true); // Set isSendingData to true to indicate that data sending is in progress
          const dataRef = ref(database, "data/" + userData.userName);
          const newDataRef = push(dataRef);
  
          set(newDataRef, userData)
              .then(() => {
                  console.log("Data saved to Firebase");
                  setUserDataChanged(false); // Reset userDataChanged after data is saved
              })
              .catch((error) => {
                  console.error("Error saving:", error);
              })
              .finally(() => {
                  setTimeout(() => {
                      setIsSendingData(false); // Reset isSendingData after the delay
                  }, 3000); // 3-second delay
              });
      } else {
          console.log("Not saving data - please enter a valid username or wait for facial recognition.");
      }
  }

  // Use useEffect to trigger saveToFirebase when userData changes
  useEffect(() => {
      saveToFirebase();
  }, [userData, userDataChanged]);

  useEffect(() => {
      videoEl.current = document.getElementById("videoEl");
      async function getAiSdk (){
      if(aiSdkState === "ready" && mphToolsState === "ready"){
          const { source, start } = await getAiSdkControls();
      await source.useCamera({
          toVideoElement: document.getElementById("videoEl"),
      });
          await start();
          
      }
      
      }
      getAiSdk();
  }, [aiSdkState, mphToolsState]);

  function toggleDarkMode() {
    setDarkMode((prevDarkMode) => prevDarkMode = !prevDarkMode)
  }
  return (
    <div className="flex flex-col bg-c_2 h-[100vh]">
        <Router>
            <Navbar 
                toggleDarkMode={toggleDarkMode} 
                darkMode={darkMode} 
            />
            <div className="flex flex-col h-[15vh] justify-center items-center p-5 bg-c_2 text-white">
                <div className="relative">
                    <FaceTrackerComponent videoEl={videoEl}
                    ></FaceTrackerComponent>
                </div>
                <div>
                    {/* Input field for the user's name */}
                    <label htmlFor="userName">Your Name</label>
                    <input
                        id="userName"
                        className='w-[100%] h-10 bg-c_3 rounded-sm p-2 border-none'
                        type="text"
                        value={userData.userName}
                        onChange={(e) => {
                            setUserData({ ...userData, userName : e.target.value })
                            setIsTyping(true); // Set isTyping to true while the user is typing
                            setUserDataChanged(true)
                        }}
                        onBlur={() => setIsTyping(false)} // Set isTyping to false when the input field loses focus
                        placeholder="Enter your name"
                    />
                </div>
                
                <GenderComponent
                    userData={userData}
                    setUserData={setUserData}
                    isTyping={isTyping}
                    setUserDataChanged={setUserDataChanged}
                ></GenderComponent>
                <DominantEmotionComponent
                    userData={userData}
                    setUserData={setUserData}
                    isTyping={isTyping}
                    setUserDataChanged={setUserDataChanged}
                ></DominantEmotionComponent>
                <AgeComponent
                    userData={userData}
                    setUserData={setUserData}
                    isTyping={isTyping}
                    setUserDataChanged={setUserDataChanged}
                ></AgeComponent>
                <FeatureComponent
                    userData={userData}
                    setUserData={setUserData}
                    isTyping={isTyping}
                    setUserDataChanged={setUserDataChanged}
                ></FeatureComponent>
                <EngagementComponent
                    userData={userData}
                    setUserData={setUserData}
                    isTyping={isTyping}
                    setUserDataChanged={setUserDataChanged}
                ></EngagementComponent>
            </div>
            <div className='flex justify-center items-center  w-full h-[70vh] overflow-y-scroll'>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/quiz" element={<iframe className='h-[100%] w-auto' src="/quiz.html" title="HTML Quiz Page"></iframe>} />
                </Routes>
            </div>
        </Router>
    </div>
    )
}

export default App
