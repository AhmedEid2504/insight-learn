import { useEffect, useRef, useState } from "react";
import { useExternalScript } from "../helpers/ai-sdk/externalScriptsLoader";
import { getAiSdkControls } from "../helpers/ai-sdk/loader";
import GenderComponent from "../components/morphcomponents/GenderComponent";
import AgeComponent from "../components/morphcomponents/AgeComponent";
import DominantEmotionComponent from "../components/morphcomponents/DominantEmotionComponent";
import FeatureComponent from "../components/morphcomponents/FeatureComponent";
import EngagementComponent from "../components/morphcomponents/EngagementComponent";
import FaceTrackerComponent from "../components/morphcomponents/FaceTrackerComponent";
import MoodComponent from "../components/morphcomponents/MoodComponent";
import EmotionBarsComponent from "../components/morphcomponents/EmotionBarsComponent";
import { ref, push, serverTimestamp, set } from "firebase/database";
import {database} from "/src/firebase";
function MorphCast() {


    const mphToolsState = useExternalScript("https://sdk.morphcast.com/mphtools/v1.0/mphtools.js");
    const aiSdkState = useExternalScript("https://ai-sdk.morphcast.com/v1.16/ai-sdk.js");
    const videoEl = useRef(undefined)
    const [userName, setUserName] = useState(''); // Separate state for the userName
    const [userData, setUserData] = useState({
        userName: userName,
        age:'',
        gender: '',
        emotion: [],
        dominantEmotion: '',
        engagement: 0,
        features: [],
        time:serverTimestamp()
    })
    const [isTyping, setIsTyping] = useState(false); // State variable to track whether the user is typing
    
    // Update userData whenever userName changes
    useEffect(() => {
        setUserData(prevUserData => ({
            ...prevUserData,
            userName: userName
        }));
    }, [userName]);
    // Function to save data to Firebase Realtime Database
    async function saveToFirebase() {
        // Check if the user has finished typing their name and it is not empty
        if (!isTyping && userName.trim() !== "") {
            const dataRef = ref(database, "data/" + userName);
            const newDataRef = push(dataRef);

            set(newDataRef, userData)
                .then(() => {
                    console.log("Data saved to Firebase");
                })
                .catch((error) => {
                    console.error("Error saving:", error);
                });
        }
    }
    // useEffect hook to run saveToFirebase every 3 seconds
    useEffect(() => {
        // save every 3 seconds
        if (!isTyping && userName !== "") {
            const intervalId = setInterval(saveToFirebase, 3000);
            
            return () => clearInterval(intervalId); //cleanup on unmount
        }
    }, [userName, userData, isTyping]);

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
        <div className="flex flex-col justify-center items-center p-2 bg-c_2 text-white">
            <div className="relative">
                <video id="videoEl"></video>
                <FaceTrackerComponent videoEl={videoEl}></FaceTrackerComponent>
            </div>
            <div>
        {/* Input field for the user's name */}
        <label htmlFor="userName">Your Name</label>
        <input
            id="userName"
            className="p-2 indent-2 rounded-sm text-c_4"
            type="text"
            value={userName}
            maxLength={15}
            onChange={(e) => {
                setUserName(e.target.value);
                setIsTyping(true); // Set isTyping to true while the user is typing
            }}
            onBlur={() => setIsTyping(false)} // Set isTyping to false when the input field loses focus
            placeholder="Enter your name here..."
        />
        </div>
            <GenderComponent
                userData={userData}
                setUserData={setUserData}
                isTyping={isTyping}
            ></GenderComponent>
            <DominantEmotionComponent
                userData={userData}
                setUserData={setUserData}
                isTyping={isTyping}
            ></DominantEmotionComponent>
            <AgeComponent
                userData={userData}
                setUserData={setUserData}
                isTyping={isTyping}
            ></AgeComponent>
            <FeatureComponent
                userData={userData}
                setUserData={setUserData}
                isTyping={isTyping}
            ></FeatureComponent>
            <EngagementComponent
                userData={userData}
                setUserData={setUserData}
                isTyping={isTyping}
            ></EngagementComponent>
            <MoodComponent
                userData={userData}
                setUserData={setUserData}
                isTyping={isTyping}
            ></MoodComponent>
            <EmotionBarsComponent
                userData={userData}
                setUserData={setUserData}
                isTyping={isTyping}
            ></EmotionBarsComponent>
        </div>
    );
}

export default MorphCast;
