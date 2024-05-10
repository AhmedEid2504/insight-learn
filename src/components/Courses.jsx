import { Link } from 'react-router-dom';

const Courses = () => {
    // Replace this with your actual list of courses
    const courses = [
        { id: 1, name: 'Course 1', description: 'This is course 1' },
        { id: 2, name: 'Course 2', description: 'This is course 2' },
        { id: 3, name: 'Course 3', description: 'This is course 3' },
    ];

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">Courses</h1>
            {courses.map((course) => (
                <div key={course.id} className="mb-6 p-4 border rounded shadow">
                    <h2 className="text-xl font-semibold mb-2">{course.name}</h2>
                    <p className="mb-2">{course.description}</p>
                    <Link to={`/dashboard/courses/${course.id}`} className="text-blue-500 hover:underline">View Details</Link>
                </div>
            ))}
        </div>
    );
};

export default Courses;