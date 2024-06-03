/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import PersonalReport from "./PersonalReport"

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
                setUsers(usersData);
                setIsLoading(false);
            } catch (error) {
                console.error('Error:', error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);
    
    
    return (
        <div className="flex flex-wrap overflow-auto gap-5 h-[90dvh] justify-around">
            <div className="flex flex-wrap gap-5 h-auto justify-around basis-[100%]">
                <div className="flex flex-wrap gap-5">
                    <div className="flex flex-col justify-center items-center gap-5">
                        <div className="flex justify-center items-center gap-5">
                            <div className="w-auto h-fit overflow-auto p-3 dark:text-white dark:bg-black bg-c_4 bg-opacity-25 dark:bg-opacity-15 rounded shadow">
                                <h2 className="text-xl font-bold mb-2">Total Users</h2>
                                <p>{isLoading ? "Loading..." : users.length}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center items-center flex-wrap">
            </div>
            <div className=" basis-[100%] overflow-x-auto p-4 dark:text-white dark:bg-black bg-c_4 bg-opacity-25 dark:bg-opacity-15 rounded shadow">
                <h2 className="text-xl font-bold mb-2">Total Session Duration Graph</h2>
                <PersonalReport />
            </div>


        </div>
    )
}

export default MainDash;