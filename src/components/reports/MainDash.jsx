/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import TotalSessionsGraph from "./graphs/TotalSessionsGraph";
import { Pie, Bar } from 'react-chartjs-2';

const MainDash = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [course, setCourse] = useState('');
    const [quizzes, setQuizzes] = useState([]);

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
                console.log('Users data:', usersData);
                setUsers(usersData);
                setIsLoading(false);
            } catch (error) {
                console.error('Error:', error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const maleUsers = users.filter(user => user.Gender === 'Male').length;
    const femaleUsers = users.filter(user => user.Gender === 'Female').length;
    const genderData = {
        labels: ['Male', 'Female'],
        datasets: [
            {
                data: [maleUsers, femaleUsers],
                backgroundColor: ['#36A2EB', '#FF6384'],
            }
        ]
    };

    const cgpaData = users.map(user => user.CGPA); // Assuming CGPA is a property in your user data

    const cgpaHistogramData = {
        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
        datasets: [
            {
                label: 'CGPA Distribution',
                data: cgpaData,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(75,192,192,0.7)',
                hoverBorderColor: 'rgba(75,192,192,1)',
            }
        ]
    };


    useEffect(() => {
        fetch('https://dj-render-ldb1.onrender.com/fetchquiz') // Replace with your API URL
        .then(response => response.json())
        .then(data => {
            const mappedData = data.map(quiz => ({
                ...quiz,
                sumgrades: parseFloat(quiz.sumgrades)
            }));
            setQuizzes(mappedData);
        })
        .catch(error => console.error('Error:', error));
    }, []);
    
    const filteredQuizzes = quizzes.filter(quiz => {
        if (course) {
            return quiz.Course === course;
        }
        return true;
    });
    
    const courseNames = [...new Set(quizzes.map(quiz => quiz.Course))];
    

    const gradeRanges = {
        'Less than 10': filteredQuizzes.filter(quiz => quiz.sumgrades < 10).length,
        '10 to 15': filteredQuizzes.filter(quiz => quiz.sumgrades >= 10 && quiz.sumgrades < 15).length,
        '15 to 20': filteredQuizzes.filter(quiz => quiz.sumgrades >= 15 && quiz.sumgrades < 20).length,
        'More than 20': filteredQuizzes.filter(quiz => quiz.sumgrades > 20).length,
    };

    const chartData = {
        labels: Object.keys(gradeRanges),
        datasets: [
            {
                label: 'Students',
                data: Object.values(gradeRanges),
                backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)'],
                borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)'],
                borderWidth: 1,
            },
        ],
    };
    
    return (
        <div className="flex flex-wrap overflow-auto h-[90dvh] justify-around">
            <div className="flex flex-wrap h-auto justify-between basis-[100%]">
                <div className="w-auto h-fit overflow-auto p-4 m-4 bg-white rounded shadow">
                    <h2 className="text-xl font-bold mb-2">Total Users</h2>
                    <p>{isLoading ? "Loading..." : users.length}</p>
                </div>
                <div className="w-auto h-fit overflow-auto p-4 m-4 bg-white rounded shadow">
                    <h2 className="text-xl font-bold mb-2">Male Users</h2>
                    <p>{isLoading ? "Loading..." : maleUsers}</p>
                </div>
                <div className="w-auto h-fit overflow-auto p-4 m-4 bg-white rounded shadow">
                    <h2 className="text-xl font-bold mb-2">Female Users</h2>
                    <p>{isLoading ? "Loading..." : femaleUsers}</p>
                </div>
            </div>
                <div className="w-[50vw] h-fit basis-[50%] p-4  bg-white rounded shadow">
                    <h2 className="text-xl font-bold mb-2">CGPA Distribution</h2>
                    {isLoading ? "Loading..." : <Bar data={cgpaHistogramData} />}
                </div>
            <div className="flex flex-wrap items-center justify-center h-auto basis-[100%]">
                <div className=" h-fit overflow-auto p-4 m-4 bg-white rounded shadow">
                    <h2 className="text-xl font-bold mb-2">Gender Distribution</h2>
                    {isLoading ? "Loading..." : <Pie data={genderData} />}
                </div>
                <div className="flex flex-col">
                    <div className='flex flex-col justify-start items-start overflow-x-scroll'>
                        <div className='max-sm:h-fit sm:h-fit'>
                            <Pie data={chartData} />
                        </div>
                    </div>
                    <div className='flex flex-wrap gap-1 justify-center items-center self-center'>
                        <select 
                            value={course} 
                            onChange={e => setCourse(e.target.value)} 
                            className="mb-4 p-2 w-[100%] border border-gray-300 rounded"
                        >
                            <option value="">All courses</option>
                            {courseNames.map((courseName, index) => (
                                <option key={index} value={courseName}>{courseName}</option>
                            ))}
                        </select>
                    </div>
                </div>
                
            </div>
            <div className=" basis-[100%] overflow-x-auto p-4 m-4 bg-white rounded shadow">
                <h2 className="text-xl font-bold mb-2">Total Session Duration Graph</h2>
                <TotalSessionsGraph  />
            </div>

        </div>
    )
}

export default MainDash;