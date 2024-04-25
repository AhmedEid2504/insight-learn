/* eslint-disable react/prop-types */
import Session from "../components/Session"
import Navbar from '../components/Navbar';

// morphcast
import { useEffect, useRef, useState } from "react";
import { useExternalScript } from "../helpers/ai-sdk/externalScriptsLoader";
import { getAiSdkControls } from "../helpers/ai-sdk/loader";
import GenderComponent from "../components/morphcomponents/GenderComponent";
import AgeComponent from "../components/morphcomponents/AgeComponent";
import DominantEmotionComponent from "../components/morphcomponents/DominantEmotionComponent";
import FeatureComponent from "../components/morphcomponents/FeatureComponent";
import EngagementComponent from "../components/morphcomponents/EngagementComponent";
import FaceTrackerComponent from "../components/morphcomponents/FaceTrackerComponent";

import { set, ref, push } from "firebase/database";
import {database} from "/src/firebase";

const Home = () => {
    
    const handleSessionStart = () => {
        setSessionStarted(true);
        setUserData(prevUserData => ({...prevUserData, 
            SessionStartedAt: new Date().toLocaleTimeString()
        }));
        window.open('http://4.157.125.46', '_blank')
    };
    
    const handleSessionEnd = () => {
        setSessionStarted(false);
        
        // Create a copy of userData and update the SessionEndedAt field
        const finalUserData = {
            ...userData,
            SessionEndedAt:new Date().toLocaleTimeString()
        };
    
        // Send the final record to Firebase
        const dataRef = ref(database, "data/" + finalUserData.userName + "/" + finalUserData.SessionStartedAt + "/");
        const newDataRef = push(dataRef);
        
        set(newDataRef, finalUserData)
        .then(() => {
                console.log("Final session record saved to Firebase");
            })
            .catch((error) => {
                console.error("Error saving final session record:", error);
            });
    }
    
    // morphcast
    const mphToolsState = useExternalScript("https://sdk.morphcast.com/mphtools/v1.0/mphtools.js");
    const aiSdkState = useExternalScript("https://ai-sdk.morphcast.com/v1.16/ai-sdk.js");
    const videoEl = useRef(undefined)
    const [userData, setUserData] = useState({
        userName:'',
        dominantEmotion: '',
        arousal: '',
        valence: '',
        attention:'',
        feature_1: '',
        feature_2: '',
        feature_3: '',
        feature_4: '',
        feature_5: '',
        volume: 0,
    })
    const [isTyping, setIsTyping] = useState(false); // State variable to track whether the user is typing
    const [userDataChanged, setUserDataChanged] = useState(false); // State variable to track changes in userData
    const [isSendingData, setIsSendingData] = useState(false); // State variable to track whether data is currently being sent
    const [sessionStarted, setSessionStarted] = useState(false); // State variable to track whether the session has started
    
    useEffect(() => {
        const handleBeforeUnload =  (e) => {
            setSessionStarted(false);
            const confirmationMessage = 'Are you sure you want to leave, your session will end ?';
            e.returnValue = confirmationMessage;
            return confirmationMessage;
        };
    
        const handleUnload = () => {
            setSessionStarted(false);
        }
        
        window.addEventListener('beforeunload', handleBeforeUnload);
        window.addEventListener("unload", handleUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
            window.removeEventListener("unload", handleUnload);
        };
    }, []);
    
    let timeoutId = null; // Declare a variable to hold the timeout ID
    
    async function saveToFirebase() {
    if (!isTyping && userDataChanged && sessionStarted && userData.userName.trim() !== "" && !isSendingData) {
        setIsSendingData(true); // Set isSendingData to true to indicate that data sending is in progress
        const dataRef = ref(database, "data/" + userData.userName + "/" + userData.SessionStartedAt + "/");
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
    {sessionStarted && saveToFirebase()}
}, [sessionStarted, userData, userDataChanged]);


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
        <div className="flex flex-col">
            <Navbar />
            <div className="flex flex-col justify-center items-center p-5 mt-40 bg-c_2 text-white">
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
            <Session 
                handleSessionStart={handleSessionStart}
                handleSessionEnd={handleSessionEnd}
                sessionStarted={sessionStarted}
            />
            <div className="h-[310px] max-md:h-[490px]">
                <iframe className='h-full w-full' src="/footer.html" title="Footer" />
            </div>
        </div>
    )
}

export default Home
