import { useEffect, useState } from 'react';

    const Predictions = () => {
    const [predictions, setPredictions] = useState([]);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        // Fetch the predictions data from the API
        fetch('https://dj-render-ldb1.onrender.com/prediction')
        .then((response) => response.json())
        .then((data) => {
            setPredictions(data);
        })
        .catch((err) => {
            setError(err.message);
        });
    }, []);

    // Add a function to handle changes to the search term
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };
    
    // Modify the filteredPredictions to also filter based on the search term
    const filteredPredictions = predictions.filter(prediction => 
        (filter === 'all' || (filter === 'pass' && prediction.predictions === 1) || (filter === 'fail' && prediction.predictions !== 1)) &&
        (prediction.email.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    if (error) {
        return <div className="text-red-500">Error: {error}</div>;
    }

    if (predictions.length === 0) {
        return <div className="text-white">Loading...</div>;
    }

    return (
        <div className="flex flex-col max-w-4xl mx-auto p-4 gap-5 bg-c_5 dark:bg-black shadow-md rounded-lg">
            <h1 className="text-2xl font-bold dark:text-white mb-4">Predictions</h1>

            <div className='flex flex-col justify-center items-center gap-3'>
                <h2 className="text-lg font-semibold dark:text-white">Total Predictions: {predictions.length}</h2>
                {filteredPredictions.some(prediction => prediction.predictions !== 1) ? (
                <h2 className="text-lg font-semibold dark:text-white">Failed Predictions: {filteredPredictions.filter(prediction => prediction.predictions !== 1).length}</h2>
                ) : (
                    <div className='flex justify-center border-2 border-[green] p-3 w-fit items-center gap-5'>
                        <h1 className="text-2xl font-semibold text-[green]">All students are Predicted to pass</h1>
                        <img className='w-8' src="/images/pass.png" alt="" />
                    </div>
                )}
            </div>
            <div className='flex justify-center items-center gap-5'>
                <input 
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="mb-4 dark:bg-black dark:bg-opacity-25 dark:text-white p-2 border border-c_4 rounded"
                    placeholder="Search for a user"
                />
                <select 
                    value={filter}  
                    className="mb-4 dark:bg-black dark:bg-opacity-25 dark:text-white p-2 border border-c_4 rounded"
                    onChange={(e) => setFilter(e.target.value)}
                >
                    <option value="all">All</option>
                    <option value="pass">Pass</option>
                    <option value="fail">Fail</option>
                </select>
            </div>

            <div className='overflow-auto dark:bg-black dark:bg-opacity-25 h-[50vh] w-[70vw]'>
                <table className="min-w-full bg-c_5 dark:bg-black dark:bg-opacity-25 dark:text-white">
                <thead>
                    <tr>
                    <th className="py-2 px-4 border-b-2 border-c_4">Email</th>
                    <th className="py-2 px-4 border-b-2 border-c_4">Prediction</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredPredictions.map((prediction, index) => (
                    <tr key={index} className="hover:bg-c_4">
                        <td className="py-2 px-4 text-start border-b border-c_4">{prediction.email}</td>
                        <td className="py-2 px-4 text-center border-b border-c_4">
                        {prediction.predictions === 1 ? (
                            <span className="text-[green] font-semibold">Pass</span>
                        ) : (
                            <span className="text-[red] font-semibold">Fail</span>
                        )}
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
        </div>
    );
};

export default Predictions;
