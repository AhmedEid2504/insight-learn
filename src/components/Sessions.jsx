import { useEffect, useState } from 'react';

const SessionTable = () => {
    const [sessions, setSessions] = useState([]);

    useEffect(() => {
        fetch('https://dj-render-ldb1.onrender.com/unique/') // Replace with your API URL
            .then(response => response.json())
            .then(data => setSessions(data))
            .catch(error => console.error('Error:', error));
    }, []);

    return (
        <div className="flex flex-col h-[80dvh]">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full  sm:px-6 lg:px-8">
                    <div className="shadow l border-b border-gray-200  sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200 ">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Email</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Session Started</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Session Ended</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Session Duration (minutes)</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Session Duration Text</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white  divide-y divide-gray-200">
                                {sessions.map((session, index) => (
                                    <tr key={index}>
                                        <td className="px-6 py-4 whitespace-nowrap">{session.userEmail}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{session.Session_Started}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{session.Session_Ended}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{session.Session_Duration}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{session.Session_Duration_Txt}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SessionTable;