/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';

const Sidebar = (props) => {
    
    return (
        <div className='relative'>
            <div className="bg-c_3 text-white h-screen flex flex-col items-center justify-between py-5">
                {props.showSideBar ? 
                    <div className="flex flex-col justify-center items-center gap-8">
                        <Link to="/">
                            { window.innerWidth > 768 ?
                                <img className='px-10 py-5 w-[100%]' src="/images/logo.png" alt="logo" />
                            :
                                <img className='px-10 py-5 w-[50%]' src="/images/logo.png" alt="logo" />
                            }
                        </Link>
                        <div>
                            <h1 className='text-2xl'>Dr. Esraa</h1>

                        </div>
                        <ul className='text-xl flex flex-col gap-5 w-full'>
                            <li ><Link className=' hover:bg-c_5 hover:bg-opacity-15 flex p-5 cursor-pointer transition-all duration-150 ease-in' to="/dashboard/reports">Reports</Link></li>
                            <li ><Link className=' hover:bg-c_5 hover:bg-opacity-15 flex p-5 cursor-pointer transition-all duration-150 ease-in' to="/dashboard/predictions">predictions</Link></li>
                            <li ><Link className=' hover:bg-c_5 hover:bg-opacity-15 flex p-5 cursor-pointer transition-all duration-150 ease-in' to="/dashboard/settings">Settings</Link></li>
                        </ul>
                    </div>
                :
                    <div className="flex w-[70px] sticky  flex-col justify-center items-center gap-8">
                        <Link to="/">
                            <img className='py-5 px-2' src="/images/logo.png" alt="logo" />
                        </Link>
                        <div>
                            <h1 className='text-2xl'>E</h1>

                        </div>
                        <ul className='text-xl flex flex-col gap-5'>
                            <li ><Link className=' hover:bg-c_5 hover:bg-opacity-15 flex p-5 cursor-pointer transition-all duration-150 ease-in' to="/dashboard/reports">
                                    <img className='w-10' src="/images/reportsicon.png" alt="" />
                                </Link>
                            </li>
                            <li ><Link className=' hover:bg-c_5 hover:bg-opacity-15 flex p-5 cursor-pointer transition-all duration-150 ease-in' to="/dashboard/predictions">
                                    <img className='w-10' src="/images/predictionsicon.png" alt="" />
                                </Link>
                            </li>
                            <li ><Link className=' hover:bg-c_5 hover:bg-opacity-15 flex p-5 cursor-pointer transition-all duration-150 ease-in' to="/dashboard/settings">
                                    <img className='w-10' src="/images/settingsicon.png" alt="" />
                                </Link>
                            </li>
                        </ul>
                    </div>
                }
            <button onClick={() => props.toggleSideBar(!props.showSideBar)} className='bottom-0  bg-c_3 bg-opacity-10 hover:bg-opacity-25 rounded-2xl text-white p-2'>
                {props.showSideBar ? 
                    <img className='w-5' src="/images/leftarrow.png" alt="leftarrow" />
                : 
                    <img className='w-5' src="/images/rightarrow.png" alt="rightarrow" />
                }
            </button>
            </div>
        </div>
    )
}

export default Sidebar
