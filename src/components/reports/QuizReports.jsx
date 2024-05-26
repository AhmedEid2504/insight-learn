/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto';

Chart.register(CategoryScale);

const QuizReport = (props) => {
    const [quizzes, setQuizzes] = useState([]);
    const [gradeRange, setGradeRange] = useState('');

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
        if (quiz.Course !== props.courseName) {
            return false;
        }

        switch (gradeRange) {
            case '0-10':
                return quiz.sumgrades < 10;
            case '10-15':
                return quiz.sumgrades >= 10 && quiz.sumgrades < 15;
            case '15-20':
                return quiz.sumgrades >= 15 && quiz.sumgrades < 20;
            case '20+':
                return quiz.sumgrades > 20;
            default:
                return true;
        }
    });

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
        <div className="flex flex-wrap gap-5 overflow-y-scroll overflow-x-hidden items-start justify-center h-[90dvh]">
            <div className='flex flex-col justify-start items-start overflow-x-scroll'>
                <div className=' max-sm:w-[45rem] max-sm:h-[50dvh] sm:w-[80vw] sm:h-[50vh]'>
                    <Pie data={chartData} />
                </div>
            </div>
            
            <div className='flex flex-col'>
                <div className='flex flex-wrap gap-1 justify-center items-center self-center'>
                    <select 
                        value={gradeRange} 
                        onChange={e => setGradeRange(e.target.value)} 
                        className="mb-4 p-2 w-[100%] border border-gray-300 rounded"
                    >
                        <option value="">All grades</option>
                        <option value="0-10">Less than 10</option>
                        <option value="10-15">10 to 15</option>
                        <option value="15-20">15 to 20</option>
                        <option value="20+">More than 20</option>
                    </select>
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