import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div>
            <div className="bg-c_3 text-white h-screen">
                <div className="flex flex-col p-5 justify-center items-center gap-8">
                    <img src="/images/logo.png" alt="logo" />
                    <div>
                        <h1 className='text-2xl'>Dr. Esraa</h1>

                    </div>
                    <ul className='text-xl flex flex-col gap-5'>
                        <li><Link to="/dashboard/reports">Reports</Link></li>
                        <li><Link to="/dashboard/predictions">predictions</Link></li>
                        <li><Link to="/dashboard/settings">Settings</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
