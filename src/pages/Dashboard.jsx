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
        <div className=" flex bg-c_2 h-screen overflow-hidden">
            { showSideBar ? 
                <div>
                    { window.innerWidth < 768 ? 
                        <div>
                            <div className='z-50 absolute w-screen'>
                                <Sidebar 
                                    showSideBar={showSideBar}
                                    toggleSideBar={toggleSideBar}
                                />
                            </div>
                            <div className="flex p-5 justify-center items-center bg-c_2 text-white overflow-x-scroll">
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
                            <div className="flex w-full p-5 justify-center items-center bg-c_2 text-white">
                                    <Outlet/>
                            </div>
                        </div>
                    }
                </div>
            : 
                <div>
                    { window.innerWidth < 768 ? 
                        <div className='flex flex-col'>
                            <div className=' bottom-0 w-screen h-[10vh] z-10'>
                                    <Sidebar 
                                        showSideBar={showSideBar}
                                        toggleSideBar={toggleSideBar}
                                    />
                            </div>
                            <div className="flex h-[50dvh] justify-center items-start bg-c_2 text-white pt-10">
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
                            <div className="w-[90vw] p-5 flex justify-center items-center bg-c_2 text-white">
                                    <Outlet/>
                            </div>
                        </div>
                    }
                </div>
            }
        </div>
    );
}

export default Dashboard;