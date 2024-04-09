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
import { database } from "/src/firebase";

function MorphCast() {
    const mphToolsState = useExternalScript("https://sdk.morphcast.com/mphtools/v1.0/mphtools.js");
    const aiSdkState = useExternalScript("https://ai-sdk.morphcast.com/v1.16/ai-sdk.js");
    const videoEl = useRef(undefined);
    const [faceIsShowing, setFaceIsShowing] = useState(false);
    const [userData, setUserData] = useState({
        userName: '',
        age: '',
        gender: '',
        dominantEmotion: '',
        arousal: '',
        valence: '',
        attention: '',
        features: ["", "", "", "", ""],
        time: serverTimestamp()
    });

    // Debounce function
    const debounce = (func, delay) => {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func(...args);
            }, delay);
        };
    };

    // Ref to store the latest userData
    const userDataRef = useRef(userData);
    userDataRef.current = userData;

    // Debounce state updates before sending to Firebase
    const debouncedUpdateFirebase = useRef(
        debounce(() => {
            const data = userDataRef.current;
            if (faceIsShowing && data.userName.trim() !== "") {
                const dataRef = ref(database, "data/" + data.userName);
                const newDataRef = push(dataRef);

                set(newDataRef, data)
                    .then(() => {
                        console.log("Data saved to Firebase");
                    })
                    .catch((error) => {
                        console.error("Error saving:", error);
                    });
            } else {
                console.log("Not saving data - please enter a valid username or wait for facial recognition.");
            }
        }, 3000) // Adjust debounce delay as needed
    ).current;

    useEffect(() => {
        // Set up video element and AI SDK controls
        videoEl.current = document.getElementById("videoEl");
        async function getAiSdk() {
            if (aiSdkState === "ready" && mphToolsState === "ready") {
                const { source, start } = await getAiSdkControls();
                await source.useCamera({
                    toVideoElement: document.getElementById("videoEl"),
                });
                await start();
            }
        }
        getAiSdk();
    }, [aiSdkState, mphToolsState]);

    useEffect(() => {
        // Call debounced function always
        const intervalId = setInterval(() => {
            debouncedUpdateFirebase();
        }, 1000); // Adjust interval as needed

        // Cleanup function to clear the interval
        return () => clearInterval(intervalId);
    }, [debouncedUpdateFirebase]);

    return (
        <div className="flex flex-col justify-center items-center p-2 bg-c_2 text-white">
            <div className="relative">
                <video id="videoEl"></video>
                <FaceTrackerComponent videoEl={videoEl} setFaceIsShowing={setFaceIsShowing}></FaceTrackerComponent>
            </div>
            {/* Input field for the user's name */}
            <div>
                <label htmlFor="userName">Your Name</label>
                <input
                    id="userName"
                    className="p-2 indent-2 rounded-sm text-c_4"
                    type="text"
                    value={userData.userName}
                    onChange={(e) => setUserData({ ...userData, userName: e.target.value })}
                    placeholder="Enter your name"
                />
            </div>
            {/* Other components */}
            <GenderComponent userData={userData} setUserData={setUserData}></GenderComponent>
            <DominantEmotionComponent userData={userData} setUserData={setUserData}></DominantEmotionComponent>
            <AgeComponent userData={userData} setUserData={setUserData}></AgeComponent>
            <FeatureComponent userData={userData} setUserData={setUserData}></FeatureComponent>
            <EngagementComponent userData={userData} setUserData={setUserData}></EngagementComponent>
            <MoodComponent></MoodComponent>
            <EmotionBarsComponent></EmotionBarsComponent>
        </div>
    );
}

export default MorphCast;
