/* eslint-disable react/prop-types */
import { Link, useLocation  } from 'react-router-dom';
import { motion } from 'framer-motion';

const Sidebar = (props) => {
    const sidebarVariants = {
        collapsed: { width: "50px" },
        expanded: { width: "100%" }
    };

    const location = useLocation();

    return (
        <motion.div className='relative'  initial={false} animate={props.showSideBar ? "expanded" : "collapsed"} variants={sidebarVariants}>
            <div className="bg-c_3 text-white h-screen flex flex-col items-center justify-between py-5">
                <motion.div>
                    {props.showSideBar ? (
                        <ul className='text-xl flex flex-col gap-5 w-full'>
                            <li>
                                <Link to="/">
                                    <motion.img 
                                        className='px-10 py-5' src="/images/logo.png" alt="logo" animate={{ width: props.showSideBar ? (window.innerWidth > 768 ? "100%" : "20%") : "50%", minWidth: "70px", padding: "10px"  }} 
                                        onClick={() => props.toggleSideBar()}
                                    />
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    className={`flex p-5 cursor-pointer transition-all duration-150 ease-in ${location.pathname === "/dashboard/reports" ? 'bg-c_5 bg-opacity-15' : 'hover:bg-c_5 hover:bg-opacity-15'}`} to="/dashboard/reports"
                                    onClick={() => props.toggleSideBar()}
                                >
                                    Reports
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    className={`flex p-5 cursor-pointer transition-all duration-150 ease-in ${location.pathname === "/dashboard/predictions" ? 'bg-c_5 bg-opacity-15' : 'hover:bg-c_5 hover:bg-opacity-15'}`} to="/dashboard/predictions"
                                    onClick={() => props.toggleSideBar()}
                                >   
                                    Predictions
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    className={`flex p-5 cursor-pointer transition-all duration-150 ease-in ${location.pathname === "/dashboard/materials" ? 'bg-c_5 bg-opacity-15' : 'hover:bg-c_5 hover:bg-opacity-15'}`} to="/dashboard/materials"
                                    onClick={() => props.toggleSideBar()}
                                >
                                    Materials
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    className={`flex p-5 cursor-pointer transition-all duration-150 ease-in ${location.pathname === "/dashboard/users" ? 'bg-c_5 bg-opacity-15' : 'hover:bg-c_5 hover:bg-opacity-15'}`} to="/dashboard/users"
                                    onClick={() => props.toggleSideBar()}
                                >
                                    Users
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    className={`flex p-5 cursor-pointer transition-all duration-150 ease-in ${location.pathname === "/dashboard/courses" ? 'bg-c_5 bg-opacity-15' : 'hover:bg-c_5 hover:bg-opacity-15'}`} to="/dashboard/courses"
                                    onClick={() => props.toggleSideBar()}
                                >
                                    Courses
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    className={`flex p-5 cursor-pointer transition-all duration-150 ease-in ${location.pathname === "/dashboard/settings" ? 'bg-c_5 bg-opacity-15' : 'hover:bg-c_5 hover:bg-opacity-15'}`} to="/dashboard/settings"
                                    onClick={() => props.toggleSideBar()}
                                >
                                    Settings
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
                                    className={`flex p-3 cursor-pointer transition-all duration-150 ease-in ${location.pathname === "/dashboard/materials" ? 'bg-c_5 bg-opacity-15' : 'hover:bg-c_5 hover:bg-opacity-15'}`} to="/dashboard/materials"
                                    onClick={() => props.toggleSideBar()}
                                >
                                    <img className='w-10' src="/images/materials.png" alt="materials icon" />
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    className={`flex p-3 cursor-pointer transition-all duration-150 ease-in ${location.pathname === "/dashboard/courses" ? 'bg-c_5 bg-opacity-15' : 'hover:bg-c_5 hover:bg-opacity-15'}`} to="/dashboard/courses"
                                    onClick={() => props.toggleSideBar()}
                                >
                                    <img className='w-10' src="/images/materials.png" alt="materials icon" />
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    className={`flex p-3 cursor-pointer transition-all duration-150 ease-in ${location.pathname === "/dashboard/settings" ? 'bg-c_5 bg-opacity-15' : 'hover:bg-c_5 hover:bg-opacity-15'}`} to="/dashboard/settings"
                                    onClick={() => props.toggleSideBar()}
                                >
                                    <img className='w-10' src="/images/settingsicon.png" alt="settings icon" />
                                </Link>
                            </li>
                        </ul>
                    )}
                </motion.div>
                <motion.button 
                    onClick={() => props.toggleSideBar()} 
                    className='bottom-0 bg-c_3 bg-opacity-10 hover:bg-opacity-25 rounded-2xl text-white p-2'
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
        </motion.div>
    )
}

export default Sidebar;
