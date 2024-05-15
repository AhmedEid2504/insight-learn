/* eslint-disable react/prop-types */
import { Link, useLocation  } from 'react-router-dom';
import { motion } from 'framer-motion';

const Sidebar = (props) => {
    const sidebarVariants = {
        collapsed: { width: "50px" },
        expanded: { width: (window.innerWidth > 768 ? "250px" : "100%") }
    };

    const location = useLocation();

    return (
        <motion.div className='relative'  initial={false} animate={props.showSideBar ? "expanded" : "collapsed"} variants={sidebarVariants}>
            <div className="bg-c_3 text-white h-[100dvh] flex flex-col items-center justify-between py-3">
                <div className=' overflow-auto'>
                    <motion.div>
                        {props.showSideBar ? (
                            <ul className='text-xl flex flex-col gap-2 max-sm:w-screen w-full'>
                                <li>
                                    <Link to="/">
                                        <motion.img 
                                            className='px-10 py-5' src="/images/logo.png" alt="logo" animate={{ width: props.showSideBar ? (window.innerWidth > 768 ? "100%" : "20%") : "50%", minWidth: "70px", padding: "10px 20px"  }} 
                                            onClick={() => props.toggleSideBar()}
                                        />
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        className={`flex gap-3 items-center p-2 cursor-pointer transition-all duration-150 ease-in ${location.pathname === "/dashboard" ? 'bg-c_5 bg-opacity-15' : 'hover:bg-c_5 hover:bg-opacity-15'}`} to="/dashboard"
                                        onClick={() => props.toggleSideBar()}
                                    >
                                        <img className='w-10' src="/images/dashboard.png" alt="dashboard icon" />
                                        Dashboard
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        className={`flex gap-3 items-center p-2 cursor-pointer transition-all duration-150 ease-in ${location.pathname === "/dashboard/reports" ? 'bg-c_5 bg-opacity-15' : 'hover:bg-c_5 hover:bg-opacity-15'}`} to="/dashboard/reports"
                                        onClick={() => props.toggleSideBar()}
                                    >
                                        <img className='w-10' src="/images/reportsicon.png" alt="reports icon" />
                                        Reports
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        className={`flex gap-3 items-center p-2 cursor-pointer transition-all duration-150 ease-in ${location.pathname === "/dashboard/predictions" ? 'bg-c_5 bg-opacity-15' : 'hover:bg-c_5 hover:bg-opacity-15'}`} to="/dashboard/predictions"
                                        onClick={() => props.toggleSideBar()}
                                    >
                                        <img className='w-10' src="/images/predictionsicon.png" alt="predictions icon" />
                                        Predictions
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        className={`flex gap-3 items-center p-2 cursor-pointer transition-all duration-150 ease-in ${location.pathname === "/dashboard/users" ? 'bg-c_5 bg-opacity-15' : 'hover:bg-c_5 hover:bg-opacity-15'}`} to="/dashboard/users"
                                        onClick={() => props.toggleSideBar()}
                                    >
                                        <img className='w-10' src="/images/users.png" alt="users icon" />
                                        Users
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        className={`flex gap-3 items-center p-2 cursor-pointer transition-all duration-150 ease-in ${location.pathname === "/dashboard/add-user" ? 'bg-c_5 bg-opacity-15' : 'hover:bg-c_5 hover:bg-opacity-15'}`} to="/dashboard/add-user"
                                        onClick={() => props.toggleSideBar()}
                                    >
                                        <img className='w-10' src="/images/add-user.png" alt="users icon" />
                                        Add User
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        className={`flex gap-3 items-center p-2 cursor-pointer transition-all duration-150 ease-in ${location.pathname === "/dashboard/usersdata" ? 'bg-c_5 bg-opacity-15' : 'hover:bg-c_5 hover:bg-opacity-15'}`} to="/dashboard/usersdata"
                                        onClick={() => props.toggleSideBar()}
                                    >
                                        <img className='w-10' src="/images/user-data.png" alt="user data icon" />
                                        Users Data
                                    </Link>
                                </li>
                            </ul>
                        ) : (
                            <ul className='text-xl flex flex-col gap-5'>
                                <li>
                                    <Link to="/">
                                        <motion.img 
                                            className='px-10 py-5' src="/images/logo.png" alt="logo" animate={{ width: props.showSideBar ? (window.innerWidth > 768 ? "100%" : "50%") : "50%", minWidth: "50px", padding: "8px" }} 
                                            onClick={() => props.toggleSideBar()}
                                        />
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        className={`flex p-3 cursor-pointer transition-all duration-150 ease-in ${location.pathname === "/dashboard" ? 'bg-c_5 bg-opacity-15' : 'hover:bg-c_5 hover:bg-opacity-15'}`} to="/dashboard"
                                        onClick={() => props.toggleSideBar()}
                                    >
                                        <img className='w-10' src="/images/dashboard.png" alt="reports icon" />
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        className={`flex p-3 cursor-pointer transition-all duration-150 ease-in ${location.pathname === "/dashboard/reports" ? 'bg-c_5 bg-opacity-15' : 'hover:bg-c_5 hover:bg-opacity-15'}`} to="/dashboard/reports"
                                        onClick={() => props.toggleSideBar()}
                                    >
                                        <img className='w-10' src="/images/reportsicon.png" alt="reports icon" />
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        className={`flex p-3 cursor-pointer transition-all duration-150 ease-in ${location.pathname === "/dashboard/predictions" ? 'bg-c_5 bg-opacity-15' : 'hover:bg-c_5 hover:bg-opacity-15'}`} to="/dashboard/predictions"
                                        onClick={() => props.toggleSideBar()}
                                    >
                                        <img className='w-10' src="/images/predictionsicon.png" alt="predictions icon" />
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        className={`flex p-3 cursor-pointer transition-all duration-150 ease-in ${location.pathname === "/dashboard/users" ? 'bg-c_5 bg-opacity-15' : 'hover:bg-c_5 hover:bg-opacity-15'}`} to="/dashboard/users"
                                        onClick={() => props.toggleSideBar()}
                                    >
                                        <img className='w-10' src="/images/users.png" alt="users icon" />
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        className={`flex p-3 cursor-pointer transition-all duration-150 ease-in ${location.pathname === "/dashboard/add-user" ? 'bg-c_5 bg-opacity-15' : 'hover:bg-c_5 hover:bg-opacity-15'}`} to="/dashboard/add-user"
                                        onClick={() => props.toggleSideBar()}
                                    >
                                        <img className='w-10' src="/images/add-user.png" alt="users icon" />
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        className={`flex p-3 cursor-pointer transition-all duration-150 ease-in ${location.pathname === "/dashboard/usersdata" ? 'bg-c_5 bg-opacity-15' : 'hover:bg-c_5 hover:bg-opacity-15'}`} to="/dashboard/usersdata"
                                        onClick={() => props.toggleSideBar()}
                                    >
                                        <img className='w-10' src="/images/user-data.png" alt="user data icon" />
                                    </Link>
                                </li>
                                
                            </ul>
                        )}
                    </motion.div>
                </div>
                <div className='w-full flex flex-col gap-2 justify-center'>
                    <div className='w-[80%] h-0.5 self-center bg-c_5'></div>
                    {props.showSideBar ? 
                        <Link 
                            className={`flex p-2 items-center text-xl cursor-pointer transition-all duration-150 ease-in ${location.pathname === "/dashboard/settings" ? 'bg-c_5 bg-opacity-15' : 'hover:bg-c_5 hover:bg-opacity-15'}`} to="/dashboard/settings"
                            onClick={() => props.toggleSideBar()}
                        >
                            <img className='w-12' src="/images/settingsicon.png" alt="settings icon" />
                            Settings
                        </Link>
                    :
                        <Link 
                            className={`flex p-2 cursor-pointer transition-all duration-150 ease-in ${location.pathname === "/dashboard/settings" ? 'bg-c_5 bg-opacity-15' : 'hover:bg-c_5 hover:bg-opacity-15'}`} to="/dashboard/settings"
                            onClick={() => props.toggleSideBar()}
                        >
                            <img className='w-10' src="/images/settingsicon.png" alt="settings icon" />
                        </Link>
                    }
                    <motion.button 
                        onClick={() => props.toggleSideBar()} 
                        className='pl-2 w-[40px] self-center bg-c_3 bg-opacity-10 hover:bg-opacity-25 rounded-2xl text-white'
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        {props.showSideBar ?
                            <img className='w-5' src="/images/leftarrow.png" alt="leftarrow" />
                            :
                            <img className='w-5' src="/images/rightarrow.png" alt="rightarrow" />
                        }
                    </motion.button>
                </div>
            </div>
        </motion.div>
    )
}

export default Sidebar;
