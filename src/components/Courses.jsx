import { useState, useEffect } from 'react';
import axios from 'axios';

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [selectedSemester, setSelectedSemester] = useState(null);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('https://dj-render-ldb1.onrender.com/fetchcourse');
                const mappedData = response.data.map(course => ({
                    id: course.id,
                    name: course.Course,
                    semester: course.Semester
                }));
                setCourses(mappedData);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchCourses();
    }, []);

    const semesters = [...new Set(courses.map(course => course.semester))];

    return (
        <div className="container mx-auto h-[100dvh] flex flex-col gap-5">
            <div className='bg-c_5 p-5 flex flex-col shadow-md'>
                <h1 className="text-2xl self-center font-bold mb-4">Semesters</h1>
                <div className="flex flex-wrap overflow-auto h-[35dvh] max-sm:h-[30dvh] justify-start">
                    {semesters.map((semester, index) => (
                        <div key={index} className="p-4 border rounded-lg hover:bg-black bg-white transition-all duration-200 hover:bg-opacity-10  shadow-md m-2 cursor-pointer" onClick={() => setSelectedSemester(semester)}>
                            <h2 className="text-lg font-semibold">{semester}</h2>
                        </div>
                    ))}
                </div>
            </div>

            {selectedSemester && (
                <div className='bg-c_5 p-5 flex flex-col shadow-md'>
                    <h1 className="text-2xl self-center font-bold mb-4">Courses for {selectedSemester}</h1>
                    <div className="flex flex-wrap overflow-auto h-[35dvh] max-sm:h-[20dvh] justify-start">
                        {courses.filter(course => course.semester === selectedSemester).map((course) => (
                            <div key={course.id} className="p-4 border flex justify-center items-center rounded-lg hover:bg-black bg-white transition-all duration-200 hover:bg-opacity-10  shadow-md m-2 cursor-pointer">
                                <h2 className="text-lg font-semibold">{course.name}</h2>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Courses;