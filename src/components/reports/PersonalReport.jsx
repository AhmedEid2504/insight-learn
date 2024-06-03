/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Chart } from 'chart.js/auto';

// Register chart components
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const UserReports = () => {
    const [sessions, setSessions] = useState([]);
    const [showAttention, setShowAttention] = useState(true);
    const [showArousal, setShowArousal] = useState(true);
    const [showValence, setShowValence] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [showNoDataPopup, setShowNoDataPopup] = useState(false);
    const currentUserEmail = localStorage.getItem('email');
    useEffect(() => {
        fetch('https://dj-render-ldb1.onrender.com/unique/')
            .then(response => response.json())
            .then(data => {
                const userSessions = data.filter(session => session.userEmail === currentUserEmail);
                const modifiedData = userSessions.map(session => {
                    if (session.session_for === '') {
                        session.session_for = 'assignment';
                    }
                    return session;
                });
                setSessions(modifiedData);
                setIsLoading(false);
                if (modifiedData.length === 0) {
                    setShowNoDataPopup(true);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                setIsLoading(false);
            });
    }, [currentUserEmail]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const chartData = {
        labels: sessions.map(session => session.session_for),
        datasets: [
            {
                label: 'Average Attention',
                data: showAttention ? sessions.map(session => session.average_attention) : [],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div className="h-screen dark:text-white overflow-auto">
            {showNoDataPopup && <NoDataPopup setShowNoDataPopup={setShowNoDataPopup} />}
            <div className="flex flex-wrap gap-5 h-[80dvh]">
                <div className="flex flex-col">
                    <div className="flex flex-wrap items-center justify-center gap-2">
                        <div className="flex gap-2">
                            <input
                                type="checkbox"
                                checked={showAttention}
                                onChange={e => setShowAttention(e.target.checked)}
                            />
                            <label>Show Attention</label>
                        </div>
                        <div className="flex gap-2">
                            <input
                                type="checkbox"
                                checked={showArousal}
                                onChange={e => setShowArousal(e.target.checked)}
                            />
                            <label>Show Arousal</label>
                        </div>
                        <div className="flex gap-2">
                            <input
                                type="checkbox"
                                checked={showValence}
                                onChange={e => setShowValence(e.target.checked)}
                            />
                            <label>Show Valence</label>
                        </div>
                    </div>
                    <div className="flex self-center shadow dark:text-white dark:bg-black dark:bg-opacity-25 h-[40dvh] w-[80vw] overflow-scroll border-b border-gray-200 sm:rounded-lg">
                        <table className="divide-y divide-gray-200">
                            <thead className="bg-gray-50 dark:text-white dark:bg-black dark:bg-opacity-25">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Session For</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Session Started</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Session Ended</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Session Duration Text</th>
                                    {showAttention && <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Average Attention</th>}
                                    {showArousal && <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Average Arousal</th>}
                                    {showValence && <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Average Valence</th>}
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:text-white dark:bg-black dark:bg-opacity-25 divide-y divide-gray-200">
                                {sessions.map((session, index) => (
                                    <tr key={index}>
                                        <td className="px-6 py-4 whitespace-nowrap">{session.session_for}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{session.Session_Started}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{session.Session_Ended}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{session.Session_Duration_Txt}</td>
                                        {showAttention && <td className="px-6 py-4 whitespace-nowrap">{session.average_attention}</td>}
                                        {showArousal && <td className="px-6 py-4 whitespace-nowrap">{session.average_arousal}</td>}
                                        {showValence && <td className="px-6 py-4 whitespace-nowrap">{session.average_valence}</td>}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="flex-grow">
                    <Bar data={chartData} options={options} />
                </div>
            </div>
        </div>
    );
};

const NoDataPopup = ({ setShowNoDataPopup }) => (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
        <div className="popup-content bg-white p-4 border border-red-500 rounded">
            <p className="text-red-500">No data available for the specified user.</p>
            <button className="mt-4 px-4 py-2 bg-red-500 text-black rounded" onClick={() => setShowNoDataPopup(false)}>Close</button>
        </div>
    </div>
);

export default UserReports;