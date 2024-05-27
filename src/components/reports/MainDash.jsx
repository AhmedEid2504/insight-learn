/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import TotalSessionsGraph from "./graphs/TotalSessionsGraph";
import AverageReportsGraph from "./graphs/AverageReportsGraph";
import { Pie, Bar } from 'react-chartjs-2';
import QuizReportGraph from "./graphs/QuizReportGraph";

const MainDash = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

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
    
    
    return (
        <div className="flex flex-wrap overflow-auto gap-5 h-[90dvh] justify-around">
            <div className="flex flex-wrap gap-5 h-auto justify-around basis-[100%]">
                <div className="flex flex-wrap">
                    <div className="w-auto h-fit overflow-auto p-2 bg-white rounded shadow">
                        <h2 className="text-xl font-bold mb-2">Total Users</h2>
                        <p>{isLoading ? "Loading..." : users.length}</p>
                    </div>
                    <div className="w-auto h-fit overflow-auto p-2 bg-white rounded shadow">
                        <h2 className="text-xl font-bold mb-2">Male Users</h2>
                        <p>{isLoading ? "Loading..." : maleUsers}</p>
                    </div>
                    <div className="w-auto h-fit overflow-auto p-2 bg-white rounded shadow">
                        <h2 className="text-xl font-bold mb-2">Female Users</h2>
                        <p>{isLoading ? "Loading..." : femaleUsers}</p>
                    </div>
                </div>
                <div className=" h-fit w-[80vw] bg-white rounded shadow">
                    {isLoading ? "Loading..." : <Bar data={cgpaHistogramData} />}
                </div>
                <div className=" h-fit overflow-auto w-[30vw] max-sm:w-[50vw] bg-white rounded shadow">
                    {isLoading ? "Loading..." : <Pie data={genderData} />}
                </div>
            </div>
            <div className="flex justify-center items-center flex-wrap">
            </div>
            <div className=" basis-[100%] overflow-x-auto  bg-white rounded shadow">
                <QuizReportGraph  />
            </div>
            <div className=" basis-[100%] overflow-x-auto  bg-white rounded shadow">
                <h2 className="text-xl font-bold mb-2">Total Session Duration Graph</h2>
                <TotalSessionsGraph  />
            </div>
            <div className=" basis-[100%] overflow-x-auto  bg-white rounded shadow">
                <AverageReportsGraph  />
            </div>

        </div>
    )
}

export default MainDash;