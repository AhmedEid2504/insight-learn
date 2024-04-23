
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home'
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

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

import { set, ref, push , serverTimestamp } from "firebase/database";
import {database} from "/src/firebase";
import Dashboard from './pages/Dashboard';


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
        time:serverTimestamp(),
        volume: 0
    })
    const [isTyping, setIsTyping] = useState(false); // State variable to track whether the user is typing
    const [userDataChanged, setUserDataChanged] = useState(false); // State variable to track changes in userData
    const [isSendingData, setIsSendingData] = useState(false); // State variable to track whether data is currently being sent


    let timeoutId = null; // Declare a variable to hold the timeout ID

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
                if (timeoutId) {
                    clearTimeout(timeoutId); // Clear the timeout if it exists
                }
                timeoutId = setTimeout(() => {
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

    // async function sendDataToAPI() {
    //     if (!isTyping && userDataChanged && userData.userName.trim() !== "" && !isSendingData) {
    //         setIsSendingData(true); // Set isSendingData to true to indicate that data sending is in progress
    
    //         try {
    //             const response = await fetch('https://morph-1.onrender.com/add/', {
    //                 method: 'POST',
    //                 headers: {
    //                     'Content-Type': 'application/json'
    //                 },
    //                 body: JSON.stringify({
    //                     username: userData.userName,
    //                     arousal: userData.arousal,
    //                     attention: userData.attention,
    //                     dominantEmotion: userData.dominantEmotion
    //                 })
    //             });
    
    //             if (response.ok) {
    //                 console.log("Data sent to API successfully");
    //                 setUserDataChanged(false); // Reset userDataChanged after data is sent
    //             } else {
    //                 console.error("Failed to send data to API:", response.status);
    //             }
    //         } catch (error) {
    //             console.error("Error sending data:", error);
    //         } finally {
    //             setTimeout(() => {
    //                 setIsSendingData(false); // Reset isSendingData after the delay
    //             }, 3000); // 3-second delay
    //         }
    //     }
    // }
    
    // // Use useEffect to trigger sendDataToAPI when userData changes
    // useEffect(() => {
    //     sendDataToAPI();
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
        <div className="bg-c_2 h-auto flex flex-col justify-between w-[100%]">
            <Router>
                <Navbar />
                <div className="flex flex-col justify-center items-center p-5 bg-c_2 text-white">
                    <div className="relative ">
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
                                setUserDataChanged(true);
                                
                            }}
                            onBlur={() => setIsTyping(false)} // Set isTyping to false when the input field loses focus
                            placeholder="Enter your name"
                        />
                    </div>
                    <div>
                        
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
                </div>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/quiz" element={<iframe className='h-screen w-full' src="/quiz.html" title="Quiz" />} />
                    <Route path="/moodle" element={<iframe name="moodleFrame" src="http://4.157.125.46" width="80%" height="800"></iframe>} />
                    <Route path="/video" element={<iframe className='h-[50vh] w-full' src="https://www.youtube.com/embed/bMknfKXIFA8" title="React Course - Beginner&#39;s Tutorial for React JavaScript Library [2022]" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>} />
                    <Route path="/pdf" element={<iframe className='h-[75vh] w-full' src='https://drive.google.com/file/d/1t_l0lVYwMKDwooqYNjEaNinW3Bz05Hx0/preview' frameBorder="0"></iframe>} />
                </Routes>
                <Footer />
        </Router>
    </div>
    )
}

export default App


