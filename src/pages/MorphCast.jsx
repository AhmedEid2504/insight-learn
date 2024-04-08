import { useEffect, useRef } from "react";
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

function MorphCast() {

    const mphToolsState = useExternalScript("https://sdk.morphcast.com/mphtools/v1.0/mphtools.js");
    const aiSdkState = useExternalScript("https://ai-sdk.morphcast.com/v1.16/ai-sdk.js");
    const videoEl = useRef(undefined)

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
        <div className="flex flex-col justify-center items-center p-2 bg-c_2 text-c_white">
            <div className="relative hidden">
                <video className="hidden" id="videoEl"></video>
                <FaceTrackerComponent videoEl={videoEl}></FaceTrackerComponent>
            </div>
            <GenderComponent></GenderComponent>
            <DominantEmotionComponent></DominantEmotionComponent>
            <AgeComponent></AgeComponent>
            <FeatureComponent></FeatureComponent>
            <EngagementComponent></EngagementComponent>
            <MoodComponent></MoodComponent>
            <EmotionBarsComponent></EmotionBarsComponent>
            </div>
    );
}

export default MorphCast;
