import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const Dashboard = () => {
    return (
        <div className="h-screen flex">
            {/* <Navbar /> */}
            <div className='w-1/3'>
                <Sidebar />
            </div>
            <div className="w-full flex p-5 justify-center items-center bg-c_2 text-white">
                <Outlet/>
            </div>
        </div>
    );
}

export default Dashboard;