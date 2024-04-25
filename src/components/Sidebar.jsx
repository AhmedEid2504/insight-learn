import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div>
            <div className="bg-c_3 w-1/6 h-screen">
                <div className="flex flex-col justify-center items-center gap-5">
                    <img src="images/logo.png" alt="logo" className="w-1/2" />
                    <ul>
                        <li><Link to="/dashboard/reports">Reports</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
