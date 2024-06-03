import { useEffect, useState } from 'react';

    const Predictions = () => {
    const [predictions, setPredictions] = useState([]);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('all');

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

    // Add a function to handle changes to the filter
    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };
    
  // Filter the predictions array based on the filter value
    const filteredPredictions = predictions.filter(prediction => 
        filter === 'all' || (filter === 'pass' && prediction.predictions === 1) || (filter === 'fail' && prediction.predictions !== 1)
    );


    if (error) {
        return <div className="text-red-500">Error: {error}</div>;
    }

    if (predictions.length === 0) {
        return <div className="text-gray-500">Loading...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-4 bg-c_5 dark:bg-black shadow-md rounded-lg">
            <h1 className="text-2xl font-bold dark:text-white mb-4">Predictions</h1>
            <select 
                value={filter}  
                className="mb-4 dark:bg-black dark:bg-opacity-25 dark:text-white p-2 border border-gray-300 rounded"
                onChange={handleFilterChange}
            >
                <option value="all">All</option>
                <option value="pass">Pass</option>
                <option value="fail">Fail</option>
            </select>
            <div className='overflow-auto dark:bg-black dark:bg-opacity-25 h-[70vh] w-[70vw]'>
                <table className="min-w-full bg-c_5 dark:bg-black dark:bg-opacity-25 dark:text-white">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b-2 border-gray-200">Email</th>
                            <th className="py-2 px-4 border-b-2 border-gray-200">Arousal</th>
                            <th className="py-2 px-4 border-b-2 border-gray-200">Attention</th>
                            <th className="py-2 px-4 border-b-2 border-gray-200">Valence</th>
                            <th className="py-2 px-4 border-b-2 border-gray-200">Volume</th>
                            <th className="py-2 px-4 border-b-2 border-gray-200">Prediction</th>
                        </tr>
                    </thead>
                    <tbody>
                    {filteredPredictions.map((prediction, index) => (
                        <tr key={index} className="hover:bg-gray-100">
                            <td className="py-2 px-4 text-center border-b">{prediction.email}</td>
                            <td className="py-2 px-4 text-center border-b">{prediction.arousal}</td>
                            <td className="py-2 px-4 text-center border-b">{prediction.attention}</td>
                            <td className="py-2 px-4 text-center border-b">{prediction.valence}</td>
                            <td className="py-2 px-4 text-center border-b">{prediction.volume}</td>
                            <td className="py-2 px-4 text-center border-b">
                                {prediction.predictions === 1 ? (
                                <span className="text-green-500 font-semibold">Pass</span>
                                ) : (
                                <span className="text-red-500 font-semibold">Fail</span>
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
