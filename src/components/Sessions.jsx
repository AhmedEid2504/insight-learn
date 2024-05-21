import { useEffect, useState } from 'react';

const SessionTable = () => {
    const [sessions, setSessions] = useState([]);
    const [filterEmail, setFilterEmail] = useState('');
    const [filterDuration, setFilterDuration] = useState('');

    useEffect(() => {
        fetch('https://dj-render-ldb1.onrender.com/unique/') // Replace with your API URL
            .then(response => response.json())
            .then(data => setSessions(data))
            .catch(error => console.error('Error:', error));
    }, []);

    const filteredSessions = sessions.filter(session => {
        return session.userEmail.includes(filterEmail) && session.Session_Duration >= filterDuration;
    });

    return (
        <div className="flex flex-col items-start justify-start h-[80dvh] overflow-scroll">
            <div className='flex flex-wrap gap-1 justify-center items-center self-center'>
                <input 
                    type="text" 
                    placeholder="Filter by email" 
                    value={filterEmail} 
                    onChange={e => setFilterEmail(e.target.value)} 
                    className="mb-4 p-2 w-[60%] border border-gray-300 rounded"
                />
                <select 
                    value={filterDuration} 
                    onChange={e => setFilterDuration(e.target.value)} 
                    className="mb-4 p-2 border border-gray-300 rounded"
                >
                    <option value="">All durations</option>
                    <option value="10">10+ minutes</option>
                    <option value="20">20+ minutes</option>
                    <option value="30">30+ minutes</option>
                </select>
            </div>
            <div className="shadow l border-b border-gray-200  sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 ">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Session For</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Session Started</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Session Ended</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Session Duration Text</th>
                            {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Session Duration (minutes)</th> */}
                            
                        </tr>
                    </thead>
                    <tbody className="bg-white  divide-y divide-gray-200">
                        {filteredSessions.map((session, index) => (
                            <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap">{session.userEmail}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{session.session_for}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{session.Session_Started}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{session.Session_Ended}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{session.Session_Duration_Txt}</td>
                                {/* <td className="px-6 py-4 whitespace-nowrap">{session.Session_Duration}</td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SessionTable;