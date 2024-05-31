/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto';

Chart.register(CategoryScale);

const QuizReport = (props) => {
    const [studentsgrades, setStudentsGrades] = useState([]);
    const [gradeRange, setGradeRange] = useState('');

    useEffect(() => {
        fetch('https://dj-render-ldb1.onrender.com/fetchquiz') // Replace with your API URL
            .then(response => response.json())
            .then(data => {
                const mappedData = data
                    .filter(student => student.sumgrades !== null)
                    .map(student => ({
                        ...student,
                        sumgrades: parseFloat(student.sumgrades)
                    }));
    
                // Filter the grades for the selected course
                const courseGrades = mappedData.filter(quiz => quiz.Course === props.courseName);
                setStudentsGrades(courseGrades);
                console.log(`Total students in ${props.courseName}: ${courseGrades.length}`);
                
            })
            .catch(error => console.error('Error:', error));
    
        // Cleanup function to reset state when component unmounts
        return () => {
            setStudentsGrades([]);
            setGradeRange('');
        };
    }, [props.courseName]);


    const filteredQuizzes = studentsgrades.filter(quiz => {
        if (quiz.Course !== props.courseName) {
            return false;
        }

        switch (gradeRange) {
            case '0-10':
                return quiz.sumgrades < 10;
            case '10-15':
                return quiz.sumgrades >= 11 && quiz.sumgrades <= 15;
            case '15-20':
                return quiz.sumgrades >= 16 && quiz.sumgrades <= 20;
            case '20-25':
                return quiz.sumgrades >= 21 && quiz.sumgrades <= 25;
            case '25-30':
                return quiz.sumgrades >= 26 && quiz.sumgrades <= 30;
            case '30-35':
                return quiz.sumgrades >= 31 && quiz.sumgrades <= 35;
            case '35-40':
                return quiz.sumgrades >= 36 && quiz.sumgrades <= 40;
            default:
                return true;
        }
    });

    const gradeRanges = {
        'Less than 10': filteredQuizzes.filter(quiz => quiz.sumgrades < 10).length,
        '10 to 15': filteredQuizzes.filter(quiz => quiz.sumgrades >= 11 && quiz.sumgrades <= 15).length,
        '15 to 20': filteredQuizzes.filter(quiz => quiz.sumgrades >= 16 && quiz.sumgrades <= 20).length,
        '20 to 25': filteredQuizzes.filter(quiz => quiz.sumgrades >= 21 && quiz.sumgrades <= 25).length,
        '25 to 30': filteredQuizzes.filter(quiz => quiz.sumgrades >= 26 && quiz.sumgrades <= 30).length,
        '30 to 35': filteredQuizzes.filter(quiz => quiz.sumgrades >= 31 && quiz.sumgrades <= 35).length,
        '35 to 40': filteredQuizzes.filter(quiz => quiz.sumgrades >= 36 && quiz.sumgrades <= 40).length,
    };

    

    const chartData = {
    labels: Object.keys(gradeRanges),
    datasets: [
        {
            label: 'Students',
            data: Object.values(gradeRanges),
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',  // Less than 10
                'rgba(54, 162, 235, 0.2)',  // 10 to 15
                'rgba(255, 206, 86, 0.2)',  // 15 to 20
                'rgba(75, 192, 192, 0.2)',  // 20 to 25
                'rgba(153, 102, 255, 0.2)', // 25 to 30
                'rgba(255, 159, 64, 0.2)',  // 30 to 35
                'rgba(0, 240, 0, 0.2)'  // 35 to 40
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',    // Less than 10
                'rgba(54, 162, 235, 1)',    // 10 to 15
                'rgba(255, 206, 86, 1)',    // 15 to 20
                'rgba(75, 192, 192, 1)',    // 20 to 25
                'rgba(153, 102, 255, 1)',   // 25 to 30
                'rgba(255, 159, 64, 1)',    // 30 to 35
                'rgba(0, 199, 199, 1)'    // 35 to 40
            ],
            borderWidth: 1,
        },
    ],
};

    const sortedQuizzes = [...studentsgrades].sort((a, b) => b.sumgrades - a.sumgrades);
    const top10Quizzes = sortedQuizzes.slice(0, 10);



    return (
        <div className="flex flex-wrap gap-5 overflow-y-scroll overflow-x-hidden items-start justify-center h-[90dvh]">
            <div className='flex flex-wrap dark:bg-black dark:bg-opacity-25 p-5 dark:text-white justify-center items-center'>
                <div className='flex flex-col justify-start items-start overflow-x-scroll'>
                    <div className='max-sm:h-fit sm:h-fit'>
                        <Pie data={chartData} />
                    </div>
                </div>
                <div className='flex flex-col justify-center items-center'>
                    <h1>Top 10</h1>
                    <table className="table-auto">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">Username</th>
                                <th className="px-4 py-2">Grade</th>
                            </tr>
                        </thead>
                        <tbody>
                            {top10Quizzes.map((quiz, index) => (
                                <tr key={index} className={index % 2 === 0 ? 'bg-gray-200' : ''}>
                                    <td className="border px-4 py-2">{quiz.username}</td>
                                    <td className="border px-4 py-2">{quiz.sumgrades}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            
            <div className='flex flex-col'>
                <div className='flex flex-wrap gap-1 justify-center items-center self-center'>
                    <select 
                        value={gradeRange} 
                        onChange={e => setGradeRange(e.target.value)} 
                        className="mb-4 p-2 w-[100%] dark:bg-black dark:bg-opacity-25 dark:text-white border border-gray-300 rounded"
                    >
                        <option value="">All grades</option>
                        <option value="0-10">Less than 10</option>
                        <option value="10-15">10 to 15</option>
                        <option value="15-20">15 to 20</option>
                        <option value="20+">More than 20</option>
                    </select>
                </div>
                <div className="shadow h-[40dvh] dark:bg-black dark:bg-opacity-25 w-[80vw] overflow-scroll l border-b border-gray-200  sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Username</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Email</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Quiz Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Course</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Semester</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Sum Grades</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-black dark:bg-opacity-25 dark:text-white divide-y divide-gray-200">
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