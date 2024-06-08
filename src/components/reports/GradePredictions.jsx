/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'



const GradePredictions = ({courseName}) => {
    const [predictions, setPredictions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterBy, setFilterBy] = useState('username');
    const [filterType, setFilterType] = useState('contains');


    
    useEffect(() => {
        // Fetch the predictions data from the API
        fetch('https://dj-render-ldb1.onrender.com/gradeprediction')
            .then((response) => response.json())
            .then((data) => {
                setPredictions(data);
                setIsLoading(false);
                console.log(data)
                console.log(courseName)
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);



    const filteredPredictions = predictions.filter(prediction => {
        return prediction.Course === courseName;
    });

    const searchResults = filteredPredictions.filter(user => {
        if (filterBy === 'username') {
            if (filterType === 'contains') {
                return user.email.toLowerCase().includes(searchTerm.toLowerCase());
            } else if (filterType === 'startsWith') {
                return user.email.toLowerCase().startsWith(searchTerm.toLowerCase());
            } else if (filterType === 'endsWith') {
                return user.email.toLowerCase().endsWith(searchTerm.toLowerCase());
            }
        } else if (filterBy === 'email') {
            if (filterType === 'contains') {
                return user.email.toLowerCase().includes(searchTerm.toLowerCase());
            } else if (filterType === 'startsWith') {
                return user.email.toLowerCase().startsWith(searchTerm.toLowerCase());
            } else if (filterType === 'endsWith') {
                return user.email.toLowerCase().endsWith(searchTerm.toLowerCase());
            }
        }
    });



    if (isLoading) {
        return <div className='bg-c_3 dark:bg-dark-grey justify-center items-center rounded-lg flex p-5'>
            <img className="w-[20vw] animate-pulse" src="/images/logo.png" alt="" />
        </div>;
    }

    return (
        <div className='flex flex-col'>
            <div className='flex justify-center items-center gap-5'>
                <input
                    type="text"
                    placeholder="Search..."
                    onChange={event => setSearchTerm(event.target.value)}
                    className="p-2 mb-4 dark:bg-black dark:bg-opacity-25 dark:text-white border border-c_4  rounded-md"
                />
                <select 
                    value={filterBy} 
                    onChange={e => setFilterBy(e.target.value)} 
                    className="p-2 mb-4 border border-c_4 dark:bg-black dark:text-white dark:bg-opacity-25  rounded-md"
                >
                    <option value="username">Username</option>
                    <option value="email">Email</option>
                </select>
                <select
                    value={filterType}
                    onChange={event => setFilterType(event.target.value)}
                    className="p-2 mb-4 border border-c_4 dark:bg-black dark:text-white dark:bg-opacity-25  rounded-md"
                >
                    <option value="contains">Contains</option>
                    <option value="startsWith">Starts with</option>
                    <option value="endsWith">Ends with</option>
                </select>
            </div>
            <div className="shadow h-[40dvh] dark:bg-black dark:bg-opacity-25 dark:text-white w-[80vw] overflow-scroll l border-b border-gray-200 ">
                <table className="min-w-full divide-y divide-c_4 ">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 border border-c_4 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 border border-c_4 uppercase tracking-wider">Course</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 border border-c_4 uppercase tracking-wider">Predictions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {searchResults.map((prediction, index) => (
                            <tr key={index}>
                                <td className="px-6 py-4 border border-c_4 whitespace-nowrap">{prediction.email}</td>
                                <td className="px-6 py-4 border border-c_4 whitespace-nowrap">{prediction.Course}</td>
                                <td className="px-6 py-4 border border-c_4 whitespace-nowrap">{prediction.predictions}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        
    )
}

export default GradePredictions