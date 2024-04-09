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

    return (
        <div className="flex flex-col justify-center items-center p-2 bg-c_2 text-white">
            <div className="relative">
                
                <FaceTrackerComponent videoEl={videoEl}
                ></FaceTrackerComponent>
            </div>
            <div>
        {/* Input field for the user's name */}
        <label htmlFor="userName">Your Name</label>
        <input
            id="userName"
            className="p-2 indent-2 rounded-sm text-c_4"
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
            <MoodComponent
            ></MoodComponent>
            <EmotionBarsComponent
            ></EmotionBarsComponent>
        </div>
    );
}

export default MorphCast;