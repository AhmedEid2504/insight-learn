import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useEffect, useState } from 'react';

const Dashboard = () => {
    const [showSideBar, setShowSideBar ] = useState('true');

    const toggleSideBar = () => {
        setShowSideBar(!showSideBar);
    };

    useEffect(() => {
        const handleResize = () => {
            setShowSideBar(window.innerWidth > 768);
        };

        window.addEventListener('resize', handleResize);

        // Clean up the event listener when the component is unmounted
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className=" flex bg-c_5 h-screen overflow-hidden">
                <div>
                        { showSideBar ? 
                            <div>
                                { window.innerWidth < 768 ? 
                                    <div>
                                        <div className='w-screen'>
                                            <Sidebar 
                                                showSideBar={showSideBar}
                                                toggleSideBar={toggleSideBar}
                                            />
                                        </div>
                                        <div className="flex p-5 justify-center items-center bg-c_5 text-black overflow-x-scroll">
                                            <Outlet/>
                                        </div>
                                    </div>
                                :
                                    <div className='flex justify-start items-center'>
                                        <div className='w-1/4 justify-start'>
                                                <Sidebar 
                                                    showSideBar={showSideBar}
                                                    toggleSideBar={toggleSideBar}
                                                />
                                        </div>
                                        <div className="flex w-full p-5 justify-center items-center bg-c_5 text-black">
                                                <Outlet/>
                                        </div>
                                    </div>
                                }
                            </div>
                        : 
                            <div>   
                                { window.innerWidth < 768 ? 
                                    <div className='flex'>
                                        <div className=''>
                                                <Sidebar 
                                                    showSideBar={showSideBar}
                                                    toggleSideBar={toggleSideBar}
                                                />
                                        </div>
                                        <div className="w-[90vw] p-5 flex justify-center items-center bg-c_5 text-black">
                                                <Outlet/>
                                        </div>
                                    </div>

                                :

                                    <div className='flex'>
                                        <div className=''>
                                                <Sidebar 
                                                    showSideBar={showSideBar}
                                                    toggleSideBar={toggleSideBar}
                                                />
                                        </div>
                                        <div className="w-[90vw] p-5 flex justify-center items-center bg-c_5 text-black">
                                                <Outlet/>
                                        </div>
                                    </div>

                                }
                            </div>
                        }
                </div>
            
        </div>
    );
}

export default Dashboard;