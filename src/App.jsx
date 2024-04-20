
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home'
import Login from './pages/Login';
import Signup from './pages/Signup';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
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
        }
    }

    // Use useEffect to trigger saveToFirebase when userData changes
    useEffect(() => {
        saveToFirebase();
    }, [userData, userDataChanged]);

    // sending data to django api

    // async function saveToServer() {
    //     if (!isTyping && userDataChanged && userData.userName.trim() !== "" && !isSendingData) {
    //         setIsSendingData(true);
    //         const response = await fetch('http://localhost:8000/userdata/', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(userData),
    //         });
    
    //         if (!response.ok) {
    //             throw new Error(`HTTP error! status: ${response.status}`);
    //         }
    
    //         console.log("Data saved to server");
    //         setUserDataChanged(false);
    //         setTimeout(() => {
    //             setIsSendingData(false);
    //         }, 3000);
    //     }
    // }
    
    // useEffect(() => {
    //     const intervalId = setInterval(() => {
    //         saveToServer().catch(e => console.error(e));
    //     }, 3000); // Send data every 3 seconds
    
    //     return () => clearInterval(intervalId); // Clean up on component unmount
    // }, [userData, userDataChanged]);

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


    return (
    <div className="flex flex-col bg-c_2 h-screen">
        <Router>
            <Navbar />
            <div className='flex flex-col absolute justify-center items-center  w-full h-[70vh] translate-y-[25%]'>
                <div className="flex flex-col justify-center items-center p-5 bg-c_2 text-white">
                    <div className="relative">
                        <FaceTrackerComponent videoEl={videoEl}
                        ></FaceTrackerComponent>
                    </div>
                    <div className='flex flex-col '>
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
                <div className='w-full h-[100%] flex justify-center items-center'>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/quiz" element={<iframe className='h-[100%] w-full' src="/quiz.html" title="Quiz"></iframe>} />
                    </Routes>
                </div>
            </div>
        </Router>
        <Footer />
    </div>
    )
}

export default App
