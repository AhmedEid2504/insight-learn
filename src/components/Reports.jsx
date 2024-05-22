import { useEffect, useState } from 'react';
import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto';

Chart.register(CategoryScale);
const Reports = () => {
    const [sessions, setSessions] = useState([]);
    const [filterEmail, setFilterEmail] = useState('');
    const [filterDuration, setFilterDuration] = useState('');
    const [filterSessionType, setFilterSessionType] = useState('');
    const [showAttention, setShowAttention] = useState(true);
    const [showArousal, setShowArousal] = useState(true);
    const [showValence, setShowValence] = useState(true);
    const [showVolume, setShowVolume] = useState(true);

    useEffect(() => {
        fetch('https://dj-render-ldb1.onrender.com/unique/') // Replace with your API URL
        .then(response => response.json())
        .then(data => {
            const modifiedData = data.map(session => {
                    if (session.session_for === '') {
                        session.session_for = 'assignment';
                    }
                    return session;
                });
                setSessions(modifiedData);
            })
            .catch(error => console.error('Error:', error));
    }, []);
    
    const filteredSessions = sessions.filter(session => {
        return session.userEmail.includes(filterEmail) 
            && session.Session_Duration >= filterDuration
            && (filterSessionType === '' || session.session_for === filterSessionType);
    });
    



    return (
        <div className="flex flex-wrap gap-5  items-start justify-start h-[80dvh] overflow-scroll">
            <div className='flex flex-col '>
                <div className='flex flex-wrap gap-1 justify-center items-center self-center'>
                    <input 
                        type="text" 
                        placeholder="Filter by email" 
                        value={filterEmail} 
                        onChange={e => setFilterEmail(e.target.value)} 
                        className="mb-4 p-2 w-[60%] border border-gray-300 rounded"
                    />
                    <select 
                        value={filterSessionType} 
                        onChange={e => setFilterSessionType(e.target.value)} 
                        className="mb-4 p-2 border border-gray-300 rounded"
                    >
                        <option value="">All session types</option>
                        <option value="assignment">Assignment</option>
                        <option value="SA-quiz">SA-quiz</option>
                        <option value="MOT-quiz">MOT-quiz</option>
                    </select>
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
                    <div className='flex gap-2'>
                      <input 
                      type="checkbox" 
                      checked={showAttention} 
                      onChange={e => setShowAttention(e.target.checked)} 
                      />
                      <label>Show Attention</label>
                      <input 
                          type="checkbox" 
                          checked={showArousal} 
                          onChange={e => setShowArousal(e.target.checked)} 
                      />
                      <label>Show Arousal</label>
                      <input 
                          type="checkbox" 
                          checked={showValence} 
                          onChange={e => setShowValence(e.target.checked)} 
                      />
                      <label>Show Valence</label>
                      <input 
                          type="checkbox" 
                          checked={showVolume} 
                          onChange={e => setShowVolume(e.target.checked)} 
                      />
                      <label>Show Volume</label>
                    </div>
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
                          {showAttention && <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Max Attention</th>}
                          {showAttention && <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Min Attention</th>}
                          {showAttention && <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Average Attention</th>}
                          {showArousal && <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Max Arousal</th>}
                          {showArousal && <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Min Arousal</th>}
                          {showArousal && <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Average Arousal</th>}
                          {showValence && <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Max Valence</th>}
                          {showValence && <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Min Valence</th>}
                          {showValence && <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Average Valence</th>}
                          {showVolume && <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Max Volume</th>}
                          {showVolume && <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Min Volume</th>}
                          {showVolume && <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Average Volume</th>}
                      </tr>
                        </thead>
                        <tbody className="bg-white  divide-y divide-gray-200">
                            {filteredSessions.map((session, index) => (
                                <tr key={index}>
                                  <td className="px-6 py-4 whitespace-nowrap">{session.userEmail}</td>
                                  <td className="px-6 py-4 whitespace-nowrap">{session.session_for}</td>
                                  <td className="px-6 py-4 whitespace-nowrap">{session.Session_Started}</td>
                                  <td className="px-6 py-4 whitespace-nowrap">{session.Session_Ended}</td>
                                  <td className="px-6 py-4 whitespace-nowrap">{session.Session_Duration_Text}</td>
                                  {showAttention && <td className="px-6 py-4 whitespace-nowrap">{session.max_attention}</td>}
                                  {showAttention && <td className="px-6 py-4 whitespace-nowrap">{session.min_attention}</td>}
                                  {showAttention && <td className="px-6 py-4 whitespace-nowrap">{session.average_attention}</td>}
                                  {showArousal && <td className="px-6 py-4 whitespace-nowrap">{session.max_arousal}</td>}
                                  {showArousal && <td className="px-6 py-4 whitespace-nowrap">{session.min_arousal}</td>}
                                  {showArousal && <td className="px-6 py-4 whitespace-nowrap">{session.average_arousal}</td>}
                                  {showValence && <td className="px-6 py-4 whitespace-nowrap">{session.max_valence}</td>}
                                  {showValence && <td className="px-6 py-4 whitespace-nowrap">{session.min_valence}</td>}
                                  {showValence && <td className="px-6 py-4 whitespace-nowrap">{session.average_valence}</td>}
                                  {showVolume && <td className="px-6 py-4 whitespace-nowrap">{session.max_volume}</td>}
                                  {showVolume && <td className="px-6 py-4 whitespace-nowrap">{session.min_volume}</td>}
                                  {showVolume && <td className="px-6 py-4 whitespace-nowrap">{session.average_volume}</td>}
                              </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        
            
        </div>
    );
};

export default Reports;