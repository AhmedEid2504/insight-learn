import Session from "../components/Session"
import { useState, useEffect } from "react"

const Home = () => {
    const [sessionStarted, setSessionStarted] = useState(false); // State variable to track whether the session has started
    
    useEffect(() => {
        const handleBeforeUnload = (e) => {
          // Custom logic when user is about to leave the page
          // For example, you can show a confirmation dialog
            const confirmationMessage = 'Are you sure you want to leave, your session will end ?';
            e.returnValue = confirmationMessage; // Standard for Chrome
            return confirmationMessage; // Standard for all other browsers
        };
        handleSessionEnd()
        
        window.addEventListener('beforeunload', handleBeforeUnload);
    
        return () => {
          window.removeEventListener('beforeunload', handleBeforeUnload);
        };
      }, []);
    
    const handleSessionStart = () => {
        setSessionStarted(true);
        window.open('http://4.157.125.46', '_blank')
    };
    
    const handleSessionEnd = () => {
        setSessionStarted(false);
    }


    return (
        <div className="flex flex-col">
            <div className="bg-c_4 h-[40vh]">

            </div>
            <Session 
                handleSessionStart={handleSessionStart}
                handleSessionEnd={handleSessionEnd}
                sessionStarted={sessionStarted}
            />

            <div className="bg-c_4 h-[40vh]">

            </div>
            
        </div>
    )
}

export default Home
