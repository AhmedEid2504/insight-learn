import  { useEffect, useState } from 'react';

const ReportCard = () => {
    const [grades, setGrades] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch the grades data from the API
        fetch('https://dj-render-ldb1.onrender.com/fetchquiz')
        .then((response) => response.json())
        .then((data) => {
            // Get the email from local storage
            const email = localStorage.getItem('email');

            if (!email) {
            throw new Error('No email found in local storage');
            }

            // Filter the data based on the email
            const filteredData = data.filter((item) => item.email === email);

            setGrades(filteredData);
        })
        .catch((err) => {
            setError(err.message);
        });
    }, []);

    if (error) {
        return <div className='text-[red]'>Error: {error}</div>;
    }

    if (grades.length === 0) {
        return <div className='dark:text-white'>Loading...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-4 bg-white dark:bg-black dark:bg-opacity-25  shadow-md rounded-lg">
            <div>
                <h1 className="text-2xl font-bold dark:text-white mb-4">Report Card</h1>
                <table className="min-w-full bg-white dark:bg-black dark:bg-opacity-25 dark:text-white">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b-2 border-c_4">Quiz Name</th>
                            <th className="py-2 px-4 border-b-2 border-c_4">Course</th>
                            <th className="py-2 px-4 border-b-2 border-c_4">Semester</th>
                            <th className="py-2 px-4 border-b-2 border-c_4">Grade</th>
                        </tr>
                    </thead>
                    <tbody>
                        {grades.map((grade, index) => (
                            <tr key={index} className="hover:bg-gray-100">
                                <td className="py-2 px-4 border-b border-c_4">{grade.Quiz_Name}</td>
                                <td className="py-2 px-4 border-b border-c_4">{grade.Course}</td>
                                <td className="py-2 px-4 border-b border-c_4">{grade.Semester}</td>
                                <td className="py-2 px-4 border-b border-c_4">{grade.sumgrades}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ReportCard;
