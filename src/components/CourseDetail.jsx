import { useParams } from 'react-router-dom';

function CourseDetail() {
    let { courseId } = useParams();

    return (
        <div>
            <h2>Course ID: {courseId}</h2>
            {/* Display other course details here */}
            <div>
                <h3>Course Title</h3>
                <p>Course description</p>
            </div>
        </div>
    );
}

export default CourseDetail;