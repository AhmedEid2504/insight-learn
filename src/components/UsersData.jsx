import { useEffect, useState } from "react";

const UserData = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('https://dj-render-ldb1.onrender.com/view/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            if (data["users-data"] && Array.isArray(data["users-data"])) {
                setData(data["users-data"]);
            } else {
                console.error('Unexpected data structure', data);
            }
        })
        .catch(error => console.error('Error:', error));
    }, []);

    return (
        <div className="flex flex-col h-[90vh] gap-5 overflow-y-scroll items-center justify-start">
            {data.map(user => (
                <div key={user.id} className="border-2 h-[80vh] border-blue-200 p-4 m-2  rounded-md">
                    <h2 className="text-xl font-bold mb-2">{user.userEmail}</h2>
                    <p>Capture Time: {user.CaptureTime}</p>
                    <p>Session Ended At: {user.SessionEndedAt}</p>
                    <p>Session Started At: {user.SessionStartedAt}</p>
                    <p>Session For: {user.Session_for}</p>
                    <p>Arousal: {user.arousal}</p>
                    <p>Attention: {user.attention}</p>
                    <p>Dominant Emotion: {user.dominantEmotion}</p>
                    <p>Valence: {user.valence}</p>
                    <p>Volume: {user.volume}</p>
                </div>
            ))}
        </div>
    )
}

export default UserData;