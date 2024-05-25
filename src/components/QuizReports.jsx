import { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto';

Chart.register(CategoryScale);

const QuizReport = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [filterEmail, setFilterEmail] = useState('');
    const [filterCourse, setFilterCourse] = useState('');
    const [filterSemester, setFilterSemester] = useState('');

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
        return quiz.email.includes(filterEmail) 
            && quiz.Course.includes(filterCourse)
            && quiz.Semester.includes(filterSemester);
    });

    const chartData = {
        labels: filteredQuizzes.map((quiz, index) => `Quiz ${index + 1}`),
        datasets: [
            {
                label: 'Quiz Grades',
                data: filteredQuizzes.map(quiz => quiz.sumgrades),
                backgroundColor: filteredQuizzes.map(() => `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.2)`),
                borderColor: filteredQuizzes.map(() => 'rgba(0, 0, 0, 0.1)'),
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="flex flex-wrap gap-5 overflow-y-scroll overflow-x-hidden items-start justify-center h-[90dvh]">
            <div className='flex flex-col justify-start items-start overflow-x-scroll'>
                <div className=' max-sm:w-[45rem] max-sm:h-[50dvh] sm:w-[80vw] sm:h-[50vh]'>
                    <Pie data={chartData} />
                </div>
            </div>
            
            <div className='flex flex-col'>
                <div className='flex flex-wrap gap-1 justify-center items-center self-center'>
                    <input 
                        type="text" 
                        placeholder="Filter by email" 
                        value={filterEmail} 
                        onChange={e => setFilterEmail(e.target.value)} 
                        className="mb-4 p-2 w-[60%] border border-gray-300 rounded"
                    />
                    <input 
                        type="text" 
                        placeholder="Filter by course" 
                        value={filterCourse} 
                        onChange={e => setFilterCourse(e.target.value)} 
                        className="mb-4 p-2 w-[60%] border border-gray-300 rounded"
                    />
                    <input 
                        type="text" 
                        placeholder="Filter by semester" 
                        value={filterSemester} 
                        onChange={e => setFilterSemester(e.target.value)} 
                        className="mb-4 p-2 w-[60%] border border-gray-300 rounded"
                    />
                </div>
                <div className="shadow h-[40dvh] w-[80vw] overflow-scroll l border-b border-gray-200  sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quiz Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Semester</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sum Grades</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredQuizzes.map((quiz, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap">{quiz.username}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{quiz.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{quiz.Quiz_Name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{quiz.Course}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{quiz.Semester}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{quiz.sumgrades}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default QuizReport;