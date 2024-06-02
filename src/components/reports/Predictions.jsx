import { useEffect, useState } from 'react';
import { CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Chart } from 'chart.js/auto';
import { Bar, Line } from 'react-chartjs-2';

// Register chart components
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const UserReports = () => {
    const [sessions, setSessions] = useState([]);
    const [showAttention, setShowAttention] = useState(true);
    const [showArousal, setShowArousal] = useState(true);
    const [showValence, setShowValence] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [showNoDataPopup, setShowNoDataPopup] = useState(false);
    const [filterValue, setFilterValue] = useState('all');
    const [availableFilters, setAvailableFilters] = useState([]);
    const [isChartExpanded, setIsChartExpanded] = useState(false);
    const [quizGrades, setQuizGrades] = useState([]);
    const [quizCourseFilter, setQuizCourseFilter] = useState('all');
    const [quizNameFilter, setQuizNameFilter] = useState('all');

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

                // Extract unique session_for values
                const filters = ['all', ...new Set(modifiedData.map(session => session.session_for))];
                setAvailableFilters(filters);

                setIsLoading(false);
                if (modifiedData.length === 0) {
                    setShowNoDataPopup(true);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                setIsLoading(false);
            });

        fetch('https://dj-render-ldb1.onrender.com/fetchquiz')
            .then(response => response.json())
            .then(data => {
                const userQuizzes = data.filter(quiz => quiz.email === currentUserEmail);
                setQuizGrades(userQuizzes);
            })
            .catch(error => console.error('Error:', error));
    }, [currentUserEmail]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const filteredSessions = filterValue === 'all'
        ? sessions
        : sessions.filter(session => session.session_for === filterValue);

    const toggleChartSize = () => {
        setIsChartExpanded(prevState => !prevState);
    };

    const chartContainerStyle = {
        gridColumn: isChartExpanded ? 'span 2' : 'span 1',
        cursor: 'pointer',
    };

    const chartData = {
        labels: filteredSessions.map(session => session.session_for),
        datasets: [
            {
                label: 'Average Attention',
                data: showAttention ? filteredSessions.map(session => session.average_attention) : [],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
            {
                label: 'Average Arousal',
                data: showArousal ? filteredSessions.map(session => session.average_arousal) : [],
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1,
            },
            {
                label: 'Average Valence',
                data: showValence ? filteredSessions.map(session => session.average_valence) : [],
                backgroundColor: 'rgba(255, 159, 64, 0.2)',
                borderColor: 'rgba(255, 159, 64, 1)',
                borderWidth: 1,
            },
        ],
    };

    const filteredQuizGrades = quizGrades.filter(quiz => {
        const matchCourse = quizCourseFilter === 'all' || quiz.Course === quizCourseFilter;
        return matchCourse;
    });

    const quizChartData = {
        labels: filteredQuizGrades.map(quiz => quiz.Quiz_Name),
        datasets: [
            {
                label: 'Quiz Grades',
                data: filteredQuizGrades.map(quiz => parseFloat(quiz.sumgrades)),
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                // Change the chart type to 'line'
                type: 'line',
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
        plugins: {
            title: {
                display: true,
                text: '',
                font: {
                    size: 16,
                },
            },
        },
    };

    return (
        <div className="h-screen dark:text-white overflow-auto p-4 grid grid-cols-1 gap-8">
            {showNoDataPopup && <NoDataPopup setShowNoDataPopup={setShowNoDataPopup} />}
            <div className="flex flex-col">
                <div className="flex gap-2 items-center justify-center mb-4" style={{ marginBottom: '40px' }}>
                    <label>Filter by :</label>
                    <select
                        value={filterValue}
                        onChange={e => setFilterValue(e.target.value)}
                        className="border rounded p-1"
                    >
                        {availableFilters.map(filter => (
                            <option key={filter} value={filter}>{filter}</option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
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
                <div className="shadow dark:text-white dark:bg-black dark:bg-opacity-25 h-[40dvh] w-[80vw] overflow-scroll border-b border-gray-200 sm:rounded-lg mb-8">
                    <table className="divide-y divide-gray-200 w-full">
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
                            {filteredSessions.map((session, index) => (
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
            <div className="grid gap-8">
                <div style={chartContainerStyle} onClick={toggleChartSize}>
                    <Bar data={chartData} options={options} />
                </div>
                <div style={chartContainerStyle} onClick={toggleChartSize}>
                    <h1 className="text-center mb-4" style={{ fontSize: '2rem', marginTop:'20px' }}>Quiz Grades</h1>
                    <div className="flex items-center justify-center mb-4">
                        <label style={{ marginRight: '20px' }}>Filter by :  </label>
                        <select
                            value={quizCourseFilter}
                            onChange={e => setQuizCourseFilter(e.target.value)}
                            className="border rounded p-1"
                        >
                            <option value="all">All Courses</option>
                            {/* Add options for courses */}
                            {quizGrades.map((quiz, index) => (
                                <option key={index} value={quiz.Course}>{quiz.Course}</option>
                            ))}
                        </select>
                        <div style={{ marginLeft: '15px' }}>
                            <select
                                value={quizNameFilter}
                                onChange={e => setQuizNameFilter(e.target.value)}
                                className="border rounded p-1"
                            >
                                <option value="all">All Quizzes</option>
                                {/* Add options for quiz names */}
                                {quizGrades.map((quiz, index) => (
                                    <option key={index} value={quiz.Quiz_Name}>{quiz.Quiz_Name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <Line data={quizChartData} options={options} />
                </div>
            </div>
        </div>
    );
};

const NoDataPopup = ({ setShowNoDataPopup }) => (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
        <div className="popup-content bg-white p-4 border border-red-500 rounded">
            <p className="text-black-500">No data available for the specified user.</p>
            <button className="mt-4 px-4 py-2 bg-red-500 text-black rounded" onClick={() => setShowNoDataPopup(false)}>Close</button>
        </div>
    </div>
);

export default UserReports;