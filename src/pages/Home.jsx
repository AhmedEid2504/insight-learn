/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { useExternalScript } from "../helpers/ai-sdk/externalScriptsLoader";
import { getAiSdkControls } from "../helpers/ai-sdk/loader";
import Session from "../components/Session"
import Navbar from '../components/Navbar';
import Volume from "../components/Volume";
import DominantEmotionComponent from "../components/morphcomponents/DominantEmotionComponent";
import EngagementComponent from "../components/morphcomponents/EngagementComponent";
import FaceTrackerComponent from "../components/morphcomponents/FaceTrackerComponent";

const Home = () => {
    const videoEl = useRef(undefined)
    const [userData, setUserData] = useState({
        userEmail:'',
        dominantEmotion: 'Neutral',
        arousal: 0,
        valence: 0,
        attention:0,
        volume: 0,
        SessionStartedAt: '',
        CaptureTime: '',
        Session_for:'MOT-lecture',
        })
    const [userDataChanged, setUserDataChanged] = useState(false); // State variable to track changes in userData
    const [isSendingData, setIsSendingData] = useState(false); // State variable to track whether data is currently being sent
    const [sessionStarted, setSessionStarted] = useState(false); // State variable to track whether the session has started
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const username = localStorage.getItem("username")
    
    // Load external scripts
    const mphToolsState = useExternalScript("https://sdk.morphcast.com/mphtools/v1.0/mphtools.js");
    const aiSdkState = useExternalScript("https://ai-sdk.morphcast.com/v1.16/ai-sdk.js");
    
    // Check login status on mount
    useEffect(() => {
        // Check if token exists in local storage
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
            setUserData(prevUserData => ({...prevUserData, userEmail:localStorage.email}));
        } else {
            window.location.href = '/login';
        }
    }, []);

    // Logout handler
    const handleLogout = async () => {
        const token = localStorage.getItem('token');
    
        const requestOptions = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
        };
    
        const response = await fetch('https://dj-render-ldb1.onrender.com/logout/', requestOptions);
    
        if (response.ok) {
            localStorage.removeItem('token');
            localStorage.removeItem('email');
            localStorage.removeItem('username');
            localStorage.removeItem('is_active');
            localStorage.removeItem('is_staff');
            localStorage.removeItem('is_superuser');
            
            setIsLoggedIn(false);
            window.location.href = '/login';
        } else {
            // Handle error
            console.error('Logout failed');
        }
    };
            
            
    // Session start handler
    const handleSessionStart = () => {
        try {
            setSessionStarted(true);
            const currentTime = new Date().toLocaleTimeString([], { hour12: false });
            setUserData(prevUserData => ({
                ...prevUserData,
                SessionEndedAt: '',
                CaptureTime: currentTime,
                SessionStartedAt: currentTime
                }));
                window.open('http://insightlearn.me/', '_blank');
        } catch (error) {
            console.error("Error starting session:", error);
            }
            };
    
    // Session end handler
    const handleSessionEnd = async () => {
        try {
            const currentTime = new Date().toLocaleTimeString([], { hour12: false });
            
            // Update session and user data
            setSessionStarted(false);
            const updatedUserData = { ...userData, SessionEndedAt: currentTime, CaptureTime: currentTime };
            setUserData(updatedUserData);
    
            // Save user data to API
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
    
            // Data sent successfully
            console.log("Final Data sent to API successfully");
            setUserDataChanged(false);
        } catch (error) {
            // Handle fetch errors
            console.error('There was a problem with the fetch operation: ', error);
        } finally {
            // Reset session data and flags
            setUserData(prevUserData => ({ ...prevUserData, SessionEndedAt: "" }));
            setSessionStarted(false);
        }
    };
    




    // sending data to django api
    let timeoutId = null; // Declare a variable to hold the timeout ID
    async function sendDataToAPI() {
        if ( userDataChanged && sessionStarted && !isSendingData) {
            setIsSendingData(true); // Set isSendingData to true to indicate that data sending is in progress
            setUserData(prevUserData => ({ ...prevUserData, CaptureTime: new Date().toLocaleTimeString([], {hour12: false}) }));
            try {
                const response = await fetch('https://dj-render-ldb1.onrender.com/add/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(userData)
                });
    
                if (response.ok) {
                    console.log("Data sent to API successfully");
                    console.log(userData);
                    setUserDataChanged(false);
                } else {
                    console.error("Failed to send data to API:", response.status);
                    console.log(userData);
                }
            } catch (error) {
                console.error("Error sending data:", error);
            } finally {
                if (timeoutId) {
                    clearTimeout(timeoutId); 
                }
                timeoutId = setTimeout(() => {
                    setIsSendingData(false); 
                }, 15000); // 15-second delay
            }
        }
    }

    // Use useEffect to trigger sendDataToAPI when userData changes
    useEffect(() => {
        {sessionStarted && sendDataToAPI()}
    }, [sessionStarted, userData, userDataChanged]);

    // AI SDK setup effect
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
            <Navbar
                isLoggedIn={isLoggedIn} 
                userEmail={userData.userEmail} 
                handleLogout={handleLogout} 
            />
            <div className="h-screen">
                <iframe className='h-full w-full' src="/header.html" title="Header" />
            </div>
            <div className="flex flex-col justify-center items-center bg-c_1 text-white">
                    <div className="relative">
                        <FaceTrackerComponent videoEl={videoEl}
                        ></FaceTrackerComponent>
                    </div>
                    <div>
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
            
            <div className="h-[260px] max-md:h-[360px] max-sm:h-[350px] w-full flex bg-c_1">
                <iframe className=" w-full" src="/footer.html" title="Footer" />
            </div>
        </div>
    )
}

export default Home












