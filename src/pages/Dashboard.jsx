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
        <div className=" flex bg-c_2 h-screen overflow-x-hidden">
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
                        <div>
                            <div className='w-1/4 fixed left-0 top-0 bottom-0'>
                                    <Sidebar 
                                        showSideBar={showSideBar}
                                        toggleSideBar={toggleSideBar}
                                    />
                            </div>
                            <div className=" translate-x-[45vw] flex p-5 justify-center items-center bg-c_2 text-white">
                                    <Outlet/>
                            </div>
                        </div>
                    }
                </div>
            : 
                <div>
                    { window.innerWidth < 768 ? 
                        <div>
                            <div className='w-1/7 fixed'>
                                    <Sidebar 
                                        showSideBar={showSideBar}
                                        toggleSideBar={toggleSideBar}
                                    />
                            </div>
                            <div className=" translate-x-[35vw] p-5 flex justify-center items-center bg-c_2 text-white">
                                    <Outlet/>
                            </div>
                        </div>
                    
                    :
                        <div>
                            <div className='w-1/7 fixed left-0 top-0 bottom-0'>
                                    <Sidebar 
                                        showSideBar={showSideBar}
                                        toggleSideBar={toggleSideBar}
                                    />
                            </div>
                            <div className=" translate-x-[15vw] p-5 flex justify-center items-center bg-c_2 text-white">
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