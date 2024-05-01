/* eslint-disable react/prop-types */
import { Link, useLocation  } from 'react-router-dom';
import { motion } from 'framer-motion';

const Sidebar = (props) => {
    const sidebarVariants = {
        collapsed: { width: "80px" },
        expanded: { width: "100%" }
    };

    const location = useLocation();
    console.log(location.pathname); // This will log the current pathname

    return (
        <motion.div className='relative' initial={false} animate={props.showSideBar ? "expanded" : "collapsed"} variants={sidebarVariants}>
            <div className="bg-c_3 text-white h-screen flex flex-col items-center justify-between py-5">
                <motion.div>
                
                    {props.showSideBar ? (
                        <ul className='text-xl flex flex-col gap-5 w-full'>
                            <li>
                                <Link  to="/">
                                    <motion.img className='px-10 py-5' src="/images/logo.png" alt="logo" animate={{ width: props.showSideBar ? (window.innerWidth > 768 ? "100%" : "50%") : "50%", minWidth: "70px", padding: "10px"  }} />
                                </Link>
                            </li>
                            <li>
                                <Link className={`flex p-5 cursor-pointer transition-all duration-150 ease-in ${location.pathname === "/dashboard/reports" ? 'bg-c_5 bg-opacity-15' : 'hover:bg-c_5 hover:bg-opacity-15'}`} to="/dashboard/reports">
                                    Reports
                                </Link>
                            </li>
                            <li>
                                <Link className={`flex p-5 cursor-pointer transition-all duration-150 ease-in ${location.pathname === "/dashboard/predictions" ? 'bg-c_5 bg-opacity-15' : 'hover:bg-c_5 hover:bg-opacity-15'}`} to="/dashboard/predictions">
                                    Predictions
                                </Link>
                            </li>
                            <li>
                                <Link className={`flex p-5 cursor-pointer transition-all duration-150 ease-in ${location.pathname === "/dashboard/settings" ? 'bg-c_5 bg-opacity-15' : 'hover:bg-c_5 hover:bg-opacity-15'}`} to="/dashboard/settings">
                                    Settings
                                </Link>
                            </li>
                        </ul>
                    ) : (
                        <ul className='text-xl flex flex-col gap-5'>
                            <li>
                                <Link to="/">
                                    <motion.img className='px-10 py-5' src="/images/logo.png" alt="logo" animate={{ width: props.showSideBar ? (window.innerWidth > 768 ? "100%" : "50%") : "50%", minWidth: "80px", padding: "10px" }} />
                                </Link>
                            </li>
                            <li>
                                <Link className={`flex p-5 cursor-pointer transition-all duration-150 ease-in ${location.pathname === "/dashboard/reports" ? 'bg-c_5 bg-opacity-15' : 'hover:bg-c_5 hover:bg-opacity-15'}`} to="/dashboard/reports">
                                    <img className='w-10' src="/images/reportsicon.png" alt="" />
                                </Link>
                            </li>
                            <li>
                                <Link className={`flex p-5 cursor-pointer transition-all duration-150 ease-in ${location.pathname === "/dashboard/predictions" ? 'bg-c_5 bg-opacity-15' : 'hover:bg-c_5 hover:bg-opacity-15'}`} to="/dashboard/predictions">
                                    <img className='w-10' src="/images/predictionsicon.png" alt="" />
                                </Link>
                            </li>
                            <li>
                                <Link className={`flex p-5 cursor-pointer transition-all duration-150 ease-in ${location.pathname === "/dashboard/settings" ? 'bg-c_5 bg-opacity-15' : 'hover:bg-c_5 hover:bg-opacity-15'}`} to="/dashboard/settings">
                                    <img className='w-10' src="/images/settingsicon.png" alt="" />
                                </Link>
                            </li>
                        </ul>
                    )}
                </motion.div>
                <motion.button 
                    onClick={() => props.toggleSideBar(!props.showSideBar)} 
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
