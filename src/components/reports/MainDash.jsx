import { useEffect, useState } from "react";
import TotalSessionsGraph from "./graphs/TotalSessionsGraph";
import AverageReportsGraph from "./graphs/AverageReportsGraph";
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import QuizReportGraph from "./graphs/QuizReportGraph";

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

const MainDash = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [predictions, setPredictions] = useState([]);
    const [course, setCourse] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch users
                const usersResponse = await fetch('https://dj-render-ldb1.onrender.com/fetchuserdata', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const usersData = await usersResponse.json();
                setUsers(usersData);
                setIsLoading(false);
            } catch (error) {
                console.error('Error:', error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        // Fetch the predictions data from the API
        fetch('https://dj-render-ldb1.onrender.com/prediction')
            .then((response) => response.json())
            .then((data) => {
                setPredictions(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);
    // get only failed predictions
    const filteredPredictions = predictions.filter(prediction => prediction.Course === course);
    console.log(filteredPredictions);
    const failedPredictions = filteredPredictions.filter(prediction => prediction.predictions === 0); 
    const uniqueCourses = Array.from(new Set(predictions.map(pred => pred.Course)));


    const maleUsers = users.filter(user => user.Gender === 'Male').length;
    const femaleUsers = users.filter(user => user.Gender === 'Female').length;
    const totalUsers = maleUsers + femaleUsers;

    const genderData = {
        labels: ['Male', 'Female'],
        datasets: [
            {
                data: [maleUsers, femaleUsers],
                backgroundColor: ['#36A2EB', '#FF6384'],
            }
        ]
    };

    const genderOptions = {
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        const value = tooltipItem.raw;
                        const percentage = ((value / totalUsers) * 100).toFixed(2) + '%';
                        return `${tooltipItem.label}: ${percentage}`;
                    }
                }
            },
            legend: {
                display: true,
                position: 'top'
            }
        }
    };

    const bins = ['0 - 1', '1 - 2', '2 - 3', '3 - 3.5', '3.5 - 4'];

    const binCounts = bins.map(bin => {
        const [min, max] = bin.split('-').map(Number);
        return users.filter(user => user.CGPA >= min && user.CGPA < max).length;
    });

    const cgpaHistogramData = {
        labels: bins,
        datasets: [
            {
                label: 'Students',
                data: binCounts,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(75,192,192,0.7)',
                hoverBorderColor: 'rgba(75,192,192,1)',
            }
        ]
    };

    const handleCourseChange = (e) => {
        setCourse(e.target.value);
    };

    return (
        <div className="flex flex-wrap overflow-auto gap-5 h-[90dvh] justify-around">
                <div className="flex flex-wrap gap-5">
                    <div className="w-auto h-fit overflow-auto p-3 dark:text-white dark:bg-black bg-c_4 bg-opacity-25 dark:bg-opacity-15 rounded shadow">
                        <h2 className="text-xl font-bold mb-2">Total Users</h2>
                        <p>{isLoading ? "Loading..." : users.length}</p>
                    </div>
                </div>
            <div className="flex flex-wrap gap-5 h-auto justify-around basis-[100%]">
                <div className="flex flex-col justify-center bg-c_4 bg-opacity-25  dark:bg-black dark:bg-opacity-25 p-5 items-center">
                    <h2 className="text-xl dark:text-white font-bold mb-2">Notifications</h2>
                    <div className="flex flex-col gap-3">
                        <h2 className="text-xl dark:text-white font-bold mb-2">Students Predicted To Fail</h2>
                        <div className="flex flex-col">
                            <label htmlFor="course" className="text-lg dark:text-white font-medium">Course Name:</label>
                            <select id="course" value={course} onChange={handleCourseChange} className="border border-c_4 rounded-md px-3 py-2 dark:text-white dark:bg-black dark:bg-opacity-25 focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                                <option value="">Select a course</option>
                                {uniqueCourses.map((courseName, index) => (
                                    <option key={index} value={courseName}>{courseName}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex flex-col overflow-auto h-[15vh]">
                            {failedPredictions === 0 ? <p>No failed predictions</p> : null}
                                {failedPredictions && failedPredictions.map((prediction, index) => (
                                    <div key={index} className="flex flex-col gap-2 dark:text-white dark:bg-black bg-white  dark:bg-opacity-15 p-2 rounded shadow">
                                        <p>{prediction.email}</p>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
                <div className=" h-fit overflow-auto w-[30vw] max-sm:w-[50vw] p-4 dark:text-white dark:bg-black bg-c_4 bg-opacity-25 dark:bg-opacity-15 rounded shadow">
                    <div className="flex justify-center items-center gap-5 w-auto">
                        <div className="w-auto h-fit overflow-auto p-3 dark:text-white dark:bg-black bg-c_4 bg-opacity-25 dark:bg-opacity-15 rounded shadow">
                            <h2 className="text-xl font-bold mb-2">Male</h2>
                            <p>{isLoading ? "Loading..." : maleUsers}</p>
                        </div>
                        <div className="w-auto h-fit overflow-auto p-3 dark:text-white dark:bg-black bg-c_4 bg-opacity-25 dark:bg-opacity-15 rounded shadow">
                            <h2 className="text-xl font-bold mb-2">Female</h2>
                            <p>{isLoading ? "Loading..." : femaleUsers}</p>
                        </div>
                    </div>
                    {isLoading ? "Loading..." : <Pie data={genderData} options={genderOptions} />}
                </div>
                <div className=" h-fit w-[80vw] dark:text-white p-4 dark:bg-black dark:bg-opacity-15 bg-c_4 bg-opacity-25 rounded shadow">
                    <h2 className="text-xl font-bold mb-2">CGPA Distribution</h2>
                    {isLoading ? "Loading..." : <Bar data={cgpaHistogramData} />}
                </div>
            </div>
            <div className="flex justify-center items-center flex-wrap">
            </div>
            <div className=" basis-[100%] overflow-x-auto p-4  dark:text-white dark:bg-black dark:bg-opacity-15 bg-c_4 bg-opacity-25 rounded shadow">
                <h2 className="text-xl font-bold mb-2">Quiz Grades Pie Chart</h2>
                <QuizReportGraph />
            </div>
            <div className=" basis-[100%] overflow-x-auto p-4 dark:text-white dark:bg-black bg-c_4 bg-opacity-25 dark:bg-opacity-15 rounded shadow">
                <h2 className="text-xl font-bold mb-2">Total Session Duration Graph</h2>
                <TotalSessionsGraph />
            </div>
            <div className=" basis-[100%] overflow-x-auto p-4 dark:text-white dark:bg-black bg-c_4 bg-opacity-25 dark:bg-opacity-15 rounded shadow">
                <AverageReportsGraph />
            </div>

        </div>
    )
}

export default MainDash;
