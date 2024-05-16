/* eslint-disable react/prop-types */
import { Link, useLocation  } from 'react-router-dom';


const Sidebar = (props) => {


    const location = useLocation();

    return (
        <div className={props.showSideBar ? window.innerWidth > 768 ? "relative w-[250px]" : "relative w-[100%]" : "relative w-[50px]"}>
            <div className="bg-c_3 text-white h-[100dvh] flex flex-col items-center justify-between py-3">
                <div className=' overflow-auto'>
                    <div>
                        {props.showSideBar ? (
                            <ul className='text-xl flex flex-col gap-2 max-sm:w-screen w-full'>
                                <li>
                                    <Link to="/">
                                        <img 
                                            src="/images/logo.png" alt="logo" className={props.showSideBar ? window.innerWidth > 768 ? "px-10 py-5 w-[100%] min-w-[70px]" : "px-10 py-5 w-[20%] min-w-[70px]" : "px-10 py-5 w-[100%] min-w-[70px]"} 
                                            onClick={() => props.toggleSideBar()}
                                        />
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        className={`flex gap-3 items-center p-2 cursor-pointer transition-all duration-150 ease-in ${location.pathname === "/dashboard" ? 'bg-c_5 bg-opacity-15' : 'hover:bg-c_5 hover:bg-opacity-15'}`} to="/dashboard"
                                        onClick={() => props.toggleSideBar()}
                                    >
                                        <img className='w-8' src="/images/dashboard.png" alt="dashboard icon" />
                                        Dashboard
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        className={`flex gap-3 items-center p-2 cursor-pointer transition-all duration-150 ease-in ${location.pathname === "/dashboard/reports" ? 'bg-c_5 bg-opacity-15' : 'hover:bg-c_5 hover:bg-opacity-15'}`} to="/dashboard/reports"
                                        onClick={() => props.toggleSideBar()}
                                    >
                                        <img className='w-8' src="/images/reportsicon.png" alt="reports icon" />
                                        Reports
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        className={`flex gap-3 items-center p-2 cursor-pointer transition-all duration-150 ease-in ${location.pathname === "/dashboard/predictions" ? 'bg-c_5 bg-opacity-15' : 'hover:bg-c_5 hover:bg-opacity-15'}`} to="/dashboard/predictions"
                                        onClick={() => props.toggleSideBar()}
                                    >
                                        <img className='w-8' src="/images/predictionsicon.png" alt="predictions icon" />
                                        Predictions
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        className={`flex gap-3 items-center p-2 cursor-pointer transition-all duration-150 ease-in ${location.pathname === "/dashboard/users" ? 'bg-c_5 bg-opacity-15' : 'hover:bg-c_5 hover:bg-opacity-15'}`} to="/dashboard/users"
                                        onClick={() => props.toggleSideBar()}
                                    >
                                        <img className='w-8' src="/images/users.png" alt="users icon" />
                                        Users
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        className={`flex gap-3 items-center p-2 cursor-pointer transition-all duration-150 ease-in ${location.pathname === "/dashboard/add-user" ? 'bg-c_5 bg-opacity-15' : 'hover:bg-c_5 hover:bg-opacity-15'}`} to="/dashboard/add-user"
                                        onClick={() => props.toggleSideBar()}
                                    >
                                        <img className='w-8' src="/images/add-user.png" alt="users icon" />
                                        Add User
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        className={`flex gap-3 items-center p-2 cursor-pointer transition-all duration-150 ease-in ${location.pathname === "/dashboard/usersdata" ? 'bg-c_5 bg-opacity-15' : 'hover:bg-c_5 hover:bg-opacity-15'}`} to="/dashboard/usersdata"
                                        onClick={() => props.toggleSideBar()}
                                    >
                                        <img className='w-8' src="/images/user-data.png" alt="user data icon" />
                                        Users Data
                                    </Link>
                                </li>
                            </ul>
                        ) : (
                            <ul className='text-xl flex flex-col gap-3'>
                                <li>
                                    <Link to="/">
                                        <img 
                                            src="/images/logo.png" alt="logo" 
                                            className={props.showSideBar ? window.innerWidth > 768 ? "px-10 py-5 w-[100%] min-w-[50px]" : "px-10 py-5 w-[50%] min-w-[50px]" : "px-4 py-2 w-[50%] min-w-[70px]"} 
                                            onClick={() => props.toggleSideBar()}
                                        />
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        className={`flex px-5 py-2 cursor-pointer transition-all duration-150 ease-in ${location.pathname === "/dashboard" ? 'bg-c_5 bg-opacity-15' : 'hover:bg-c_5 hover:bg-opacity-15'}`} to="/dashboard"
                                        onClick={() => props.toggleSideBar()}
                                    >
                                        <img className='w-10' src="/images/dashboard.png" alt="reports icon" />
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        className={`flex px-5 py-2 cursor-pointer transition-all duration-150 ease-in ${location.pathname === "/dashboard/reports" ? 'bg-c_5 bg-opacity-15' : 'hover:bg-c_5 hover:bg-opacity-15'}`} to="/dashboard/reports"
                                        onClick={() => props.toggleSideBar()}
                                    >
                                        <img className='w-10' src="/images/reportsicon.png" alt="reports icon" />
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        className={`flex px-5 py-2 cursor-pointer transition-all duration-150 ease-in ${location.pathname === "/dashboard/predictions" ? 'bg-c_5 bg-opacity-15' : 'hover:bg-c_5 hover:bg-opacity-15'}`} to="/dashboard/predictions"
                                        onClick={() => props.toggleSideBar()}
                                    >
                                        <img className='w-10' src="/images/predictionsicon.png" alt="predictions icon" />
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        className={`flex px-5 py-2 cursor-pointer transition-all duration-150 ease-in ${location.pathname === "/dashboard/users" ? 'bg-c_5 bg-opacity-15' : 'hover:bg-c_5 hover:bg-opacity-15'}`} to="/dashboard/users"
                                        onClick={() => props.toggleSideBar()}
                                    >
                                        <img className='w-10' src="/images/users.png" alt="users icon" />
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        className={`flex px-5 py-2 cursor-pointer transition-all duration-150 ease-in ${location.pathname === "/dashboard/add-user" ? 'bg-c_5 bg-opacity-15' : 'hover:bg-c_5 hover:bg-opacity-15'}`} to="/dashboard/add-user"
                                        onClick={() => props.toggleSideBar()}
                                    >
                                        <img className='w-10' src="/images/add-user.png" alt="users icon" />
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        className={`flex px-5 py-2 cursor-pointer transition-all duration-150 ease-in ${location.pathname === "/dashboard/usersdata" ? 'bg-c_5 bg-opacity-15' : 'hover:bg-c_5 hover:bg-opacity-15'}`} to="/dashboard/usersdata"
                                        onClick={() => props.toggleSideBar()}
                                    >
                                        <img className='w-10' src="/images/user-data.png" alt="user data icon" />
                                    </Link>
                                </li>
                                
                            </ul>
                        )}
                    </div>
                </div>
                <div className='w-full flex flex-col gap-2 justify-center'>
                    <div className='w-[80%] h-0.5 self-center bg-c_5'></div>
                    {props.showSideBar ? 
                        <div className='flex flex-col gap-3'>
                            <Link 
                                className={`flex p-1 items-center text-xl cursor-pointer transition-all duration-150 ease-in ${location.pathname === "/dashboard/settings" ? 'bg-c_5 bg-opacity-15' : 'hover:bg-c_5 hover:bg-opacity-15'}`} to="/dashboard/settings"
                                onClick={() => props.toggleSideBar()}
                            >
                                <img className='w-10' src="/images/settingsicon.png" alt="settings icon" />
                                Settings
                            </Link>
                            <Link 
                                className={`flex p-2 px-2 gap-2 items-center text-xl cursor-pointer transition-all duration-150 ease-in ${location.pathname === "/dashboard/profile" ? 'bg-c_5 bg-opacity-15' : 'hover:bg-c_5 hover:bg-opacity-15'}`} to="/dashboard/profile"
                                onClick={() => props.toggleSideBar()}
                            >
                                <img className='w-8' src="/images/profile.png" alt="profile icon" />
                                Profile
                            </Link>
                        </div>
                    :
                        <div className='flex flex-col gap-2'>
                            <Link 
                                className={`flex p-2.5 py-2 cursor-pointer transition-all duration-150 ease-in ${location.pathname === "/dashboard/settings" ? 'bg-c_5 bg-opacity-15' : 'hover:bg-c_5 hover:bg-opacity-15'}`} to="/dashboard/settings"
                                onClick={() => props.toggleSideBar()}
                            >
                                <img className='w-12' src="/images/settingsicon.png" alt="settings icon" />
                            </Link>
                            <Link 
                                className={`flex p-3 py-2 cursor-pointer transition-all duration-150 ease-in ${location.pathname === "/dashboard/profile" ? 'bg-c_5 bg-opacity-15' : 'hover:bg-c_5 hover:bg-opacity-15'}`} to="/dashboard/profile"
                                onClick={() => props.toggleSideBar()}
                            >
                                <img className='w-12' src="/images/profile.png" alt="profile icon" />
                            </Link>
                        </div>
                    }
                    <button 
                        onClick={() => props.toggleSideBar()} 
                        className='pl-2 w-[40px] self-center bg-c_3 bg-opacity-10 hover:bg-opacity-25 rounded-2xl text-white'
                    >
                        {props.showSideBar ?
                            <img className='w-5' src="/images/leftarrow.png" alt="leftarrow" />
                            :
                            <img className='w-5' src="/images/rightarrow.png" alt="rightarrow" />
                        }
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Sidebar;
