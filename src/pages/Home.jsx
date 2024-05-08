/* eslint-disable react/prop-types */
import Session from "../components/Session"
import Navbar from '../components/Navbar';

// morphcast
import { useEffect, useRef, useState } from "react";
import { useExternalScript } from "../helpers/ai-sdk/externalScriptsLoader";
import { getAiSdkControls } from "../helpers/ai-sdk/loader";
import GenderComponent from "../components/morphcomponents/GenderComponent";
import Volume from "../components/morphcomponents/Volume";
import DominantEmotionComponent from "../components/morphcomponents/DominantEmotionComponent";
import FeatureComponent from "../components/morphcomponents/FeatureComponent";
import EngagementComponent from "../components/morphcomponents/EngagementComponent";
import FaceTrackerComponent from "../components/morphcomponents/FaceTrackerComponent";

import { set, ref, push } from "firebase/database";
import {database} from "/src/firebase";

const Home = () => {
    
    const handleSessionStart = () => {
        setSessionStarted(true);
        const currentTime = new Date().toLocaleTimeString([], {hour12: false});
        setUserData(prevUserData => ({...prevUserData, 
            SessionStartedAt:  currentTime
        }));
        window.open('http://4.157.125.46', '_blank')
    };
    
    const handleSessionEnd = async () => {
        const currentTime = new Date().toLocaleTimeString([], {hour12: false});
        setSessionStarted(false);
        setUserData(prevUserData => {
            const updatedUserData = { ...prevUserData, SessionEndedAt: currentTime };
            
            // Save user data to api
            (async () => {
                try {
                    const response = await fetch('https://dj-render-ldb1.onrender.com/add/', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(updatedUserData)
                    });
            
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }


            
                    console.log("Data sent to API successfully");
                    setUserDataChanged(false);
    
                    // Reset SessionEndedAt field
                    setUserData(prevUserData => ({ ...prevUserData, SessionEndedAt: null }));
                    setSessionStarted(false);
                } catch (error) {
                    console.error('There was a problem with the fetch operation: ', error);
                }
            })();
    
            return updatedUserData;
        });
    };

    // morphcast
    const mphToolsState = useExternalScript("https://sdk.morphcast.com/mphtools/v1.0/mphtools.js");
    const aiSdkState = useExternalScript("https://ai-sdk.morphcast.com/v1.16/ai-sdk.js");
    const videoEl = useRef(undefined)
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState({
        userEmail:'',
        dominantEmotion: '',
        arousal: '',
        valence: '',
        attention:'',
        feature_1: '',
        feature_2: '',
        feature_3: '',
        feature_4: '',
        feature_5: '',
        gender: '',
        volume: 0,
        SessionStartedAt: '',
        CaptureTime: ''
    })
    const [userDataChanged, setUserDataChanged] = useState(false); // State variable to track changes in userData
    const [isSendingData, setIsSendingData] = useState(false); // State variable to track whether data is currently being sent
    const [sessionStarted, setSessionStarted] = useState(false); // State variable to track whether the session has started
    const username = localStorage.getItem( "username" )
    useEffect(() => {
        // Check if token exists in local storage
        const token = localStorage.getItem('token');
        const userEmail = localStorage.getItem('userEmail');
        if (token) {
            setIsLoggedIn(true);
            setUserData(prevUserData => ({...prevUserData, userEmail: userEmail}));
        } else {
            window.location.href = '/login';
        }
    }, []);

    const handleLogout = () => {
        // Clear token from local storage
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        // Redirect or perform any other action after logout
        window.location.href = '/login';
    };

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
    
let sendTimeoutId = null; // Declare a variable to hold the timeout ID for sending data

async function sendData() {
    if (userDataChanged && sessionStarted && !isSendingData) {
        setIsSendingData(true); // Set isSendingData to true to indicate that data sending is in progress

        // Prepare data
        const updatedUserData = { ...userData, CaptureTime: new Date().toLocaleTimeString([], { hour12: false }) };

        // Delay execution for 15 seconds
        sendTimeoutId = setTimeout(async () => {
            // Send data to API
            try {
                const apiResponse = await fetch('https://dj-render-ldb1.onrender.com/add/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(updatedUserData)
                });

                if (!apiResponse.ok) {
                    throw new Error(`Failed to send data to API: ${apiResponse.status}`);
                }

                console.log("Data sent to API successfully");
            } catch (error) {
                console.error("Error sending data to API:", error);
            }

            // Save data to Firebase
            const dataRef = ref(database, `data/${username}/${userData.SessionStartedAt}/`);
            const newDataRef = push(dataRef, userData);

            try {
                await set(newDataRef, userData);
                console.log("Data saved to Firebase");
            } catch (error) {
                console.error("Error saving data to Firebase:", error);
            } finally {
                setIsSendingData(false); // Reset isSendingData after sending and saving data
                setUserDataChanged(false); // Reset userDataChanged after data is sent and saved
            }
        }, 15000); // 15-second delay
    }
}

// Use useEffect to trigger sendData when userData changes and sessionStarted is true
useEffect(() => {
    if (sessionStarted) {
        sendData();
    }
}, [sessionStarted, userData, userDataChanged]);

// Reset timeout if conditions change
useEffect(() => {
    // Clear previous timeout if it exists
    if (sendTimeoutId) {
        clearTimeout(sendTimeoutId);
        sendTimeoutId = null;
    }

    // Call sendData again if conditions change
    if (sessionStarted) {
        sendData();
    }
}, [sessionStarted, userData, userDataChanged]);

// Clear timeout when session ends
useEffect(() => {
    return () => {
        // Clear the timeout when the component unmounts or when session ends
        if (sendTimeoutId) {
            clearTimeout(sendTimeoutId);
            sendTimeoutId = null;
        }
    };
}, [sessionStarted]);

    
    
    

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
        <div className="flex flex-col w-full">
            <Navbar isLoggedIn={isLoggedIn} userEmail={userData.userEmail} handleLogout={handleLogout} />
            <div className="h-screen">
                <iframe className='h-full w-full' src="/header.html" title="Header" />
            </div>
            <div className="flex flex-col justify-center items-center bg-c_2 text-white">
                    <div className="relative">
                        <FaceTrackerComponent videoEl={videoEl}
                        ></FaceTrackerComponent>
                    </div>
                    <div>
                        <GenderComponent
                            userData={userData}
                            setUserData={setUserData}
                            setUserDataChanged={setUserDataChanged}
                        ></GenderComponent>
                        <DominantEmotionComponent
                            userData={userData}
                            setUserData={setUserData}
                            setUserDataChanged={setUserDataChanged}
                        ></DominantEmotionComponent>
                        <Volume
                            userData={userData}
                            setUserData={setUserData}
                            setUserDataChanged={setUserDataChanged}
                        ></Volume>
                        <FeatureComponent
                            userData={userData}
                            setUserData={setUserData}
                            setUserDataChanged={setUserDataChanged}
                        ></FeatureComponent>
                        <EngagementComponent
                            userData={userData}
                            setUserData={setUserData}
                            setUserDataChanged={setUserDataChanged}
                        ></EngagementComponent>
                    </div>
                </div>
            
            <Session 
                handleSessionStart={handleSessionStart}
                handleSessionEnd={handleSessionEnd}
                sessionStarted={sessionStarted}
                userEmail={userData.userEmail}
                username={username}
            />
            
            <div className="h-[260px] max-md:h-[410px] max-sm:h-[450px] w-full flex bg-c_3">
                <iframe className=" w-full" src="/footer.html" title="Footer" />
            </div>
        </div>
    )
}

export default Home












