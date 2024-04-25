import { Route, Routes } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Reports from '../components/Reports';

const Dashboard = () => {
    return (
        <div className="h-screen flex">
            {/* <Navbar /> */}
            <Sidebar />
            <div className="w-full bg-c_2">
                <Routes>
                    <Route path='dashboard/*' element={<Reports />} />
                </Routes>
            </div>
        </div>
    );
}

export default Dashboard;