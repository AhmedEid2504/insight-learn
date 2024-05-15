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

                    const dataRef = ref(database, "data/" + username + "/" + userData.SessionStartedAt + "/");
                    const newDataRef = push(dataRef);

                    set(newDataRef, updatedUserData)
                        .then(() => {
                            console.log("Data saved to Firebase");
                        })
                        .catch(() => {
                            console.error("Error saving:");
                        })
                        .finally(() => {
                            console.log("Final Data sent to firebase");
                        });

                    console.log("Data sent to API successfully");
                    setUserDataChanged(false);
    
                    // Reset userData fields
                    setUserData(prevUserData => {
                        return {
                            ...prevUserData,
                            userEmail: '',
                            dominantEmotion: '',
                            arousal: '',
                            valence: '',
                            attention: '',
                            volume: 0,
                            SessionStartedAt: '',
                            CaptureTime: '',
                            Session_for: 'SA-quiz'
                        };
                    })
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
        volume: 0,
        SessionStartedAt: '',
        CaptureTime: '',
        Session_for:'SA-quiz'
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
    
    let fTimeoutId = null; // Declare a variable to hold the timeout ID
    
    async function saveToFirebase() {
    if ( userDataChanged && sessionStarted && !isSendingData) {
        const dataRef = ref(database, "data/" + username + "/" + userData.SessionStartedAt + "/");
        const newDataRef = push(dataRef);

        set(newDataRef, userData)
            .then(() => {
                console.log("Data saved to Firebase");
            })
            .catch(() => {
                console.error("Error saving:");
            })
            .finally(() => {
                if (fTimeoutId) {
                    clearTimeout(fTimeoutId); // Clear the timeout if it exists
                }
                fTimeoutId = setTimeout(() => {
                }, 10000); // 10-second delay
            });
    }
}

// Use useEffect to trigger saveToFirebase when userData changes
useEffect(() => {
    {sessionStarted && saveToFirebase()}
}, [sessionStarted, userData, userDataChanged]);


    // sending data to django api
    let aTimeoutId = null; // Declare a variable to hold the timeout ID
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
                    setUserDataChanged(false); // Reset userDataChanged after data is sent
                } else {
                    console.error("Failed to send data to API:", response.status);
                }
            } catch (error) {
                console.error("Error sending data:", error);
            } finally {
                if (aTimeoutId) {
                    clearTimeout(aTimeoutId); // Clear the timeout if it exists
                }
                aTimeoutId = setTimeout(() => {
                    setIsSendingData(false); // Reset isSendingData after the delay
                }, 15000); // 15-second delay
            }
        }
    }
    
    // Use useEffect to trigger sendDataToAPI when userData changes
    useEffect(() => {
        {sessionStarted && sendDataToAPI()}
    }, [sessionStarted, userData, userDataChanged]);

    

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
            
            <div className="h-[260px] max-md:h-[360px] max-sm:h-[350px] w-full flex bg-c_1">
                <iframe className=" w-full" src="/footer.html" title="Footer" />
            </div>
        </div>
    )
}

export default Home












