/* eslint-disable react/prop-types */
import Session from "../components/Session"

const Home = (props) => {
    


    return (
        <div className="flex flex-col">
            <div className="bg-c_2 h-[40vh]">

            </div>
            <Session 
                handleSessionStart={props.handleSessionStart}
                handleSessionEnd={props.handleSessionEnd}
                sessionStarted={props.sessionStarted}
            />
        </div>
    )
}

export default Home
