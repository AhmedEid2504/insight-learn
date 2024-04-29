/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";


const Navbar =(props) => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const ulRef = useRef(null);



    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            
        };

        window.addEventListener('resize', handleResize);

        // Add event listener for clicks outside the ul
        document.addEventListener('click', handleClickOutside);

        return () => {
            window.removeEventListener('resize', handleResize);
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const handleClickOutside = (event) => {
        if (ulRef.current && !ulRef.current.contains(event.target)) {
            setShowUserMenu(false);
        }
    };


    const toggleUserMenu = (event) => {
        event.stopPropagation(); // Stop event propagation
        setShowUserMenu(!showUserMenu);
    };

    return (
        <nav className="z-50 text-white shadow-sm shadow-black flex justify-between items-center font-sans transition-all ease-in duration-200">
            <div>
                    <Link                            
                        to="/">
                            <div className=' bg-c_3  px-6 py-4 absolute top-0 left-0'>
                                <div className=' bg-c_3   px-5 py-2 absolute top-0 left-0 w-[180px] -skew-x-[30deg] h-full -z-50'>
                                </div>
                                <img className='w-[100px] h-auto' src="images/logo.png" alt="logo image" />
                            </div>
                    </Link>
            </div>
            <div className="bg-c_3 text-center items-center justify-center p-7 absolute top-5 right-5 flex">
                {windowWidth > 800 ? (
                    <div>

                        <div className="bg-c_3 text-center items-center justify-center w-[300px] -skew-x-[30deg] h-[96px] top-0 -z-50 absolute  right-7 flex"></div>
                        <ul className="flex justify-between items-center list-none p-2 text-center gap-5">
                            <li><Link className="hover:text-c_4 transition-all ease-in duration-200" to="/">Home</Link></li>
                            { !props.isLoggedIn ?
                                <div className="flex gap-5">
                                    <li><Link className="hover:text-c_4 transition-all ease-in duration-200" to="/login">Login</Link></li>
                                    <li><Link className="hover:text-c_4 transition-all ease-in duration-200" to="/signup">Sign Up</Link></li>
                                </div>
                            :
                                <div className="flex gap-5">

                                    <li><Link className="hover:text-c_4 transition-all ease-in duration-200" to="/dashboard">Dashboard</Link></li>
                                    <li><button onClick={props.handleLogout} className="hover:text-c_4 transition-all ease-in duration-200" >Sign Out</button></li>
                                </div>
                            }
                        </ul>
                    </div>
                ) : (
                    <div>
                        <div className="bg-c_3 text-center items-center justify-center w-[80px] -skew-x-[30deg] h-[88px] top-0 -z-50 absolute  right-8 flex"></div>
                        <ul className="flex justify-between items-center list-none p-0 text-center gap-5">
                            <div className="flex justify-center items-center text-center content-center gap-2">
                                <button className="hover:text-c_4 transition-all ease-in duration-200 text-2xl flex items-center justify-center"  onClick={toggleUserMenu}>
                                    ☰
                                </button>
                            </div>
                            {showUserMenu && (
                                <ul className={showUserMenu ? "absolute bg-c_3 flex flex-col justify-center gap-3 items-center bg-third p-10 px-[30px] top-1 right-0 translate-y-20 h-auto w-auto transition-all ease-in duration-200" : "translate-y-20 transition-all ease-in duration-200"} ref={ulRef}>
                                        <>
                                            <li><Link className="hover:text-c_4 transition-all ease-in duration-200" to="/">Home</Link></li>
                                            { !props.isLoggedIn ?
                                                <div className="flex flex-col gap-3">
                                                    <li><Link className="hover:text-c_4 transition-all ease-in duration-200" to="/login">Login</Link></li>
                                                    <li><Link className="hover:text-c_4 transition-all ease-in duration-200" to="/signup">Sign Up</Link></li>
                                                </div>
                                            :
                                                <div className="flex flex-col gap-3">
                                                    <li><Link className="hover:text-c_4 transition-all ease-in duration-200" to="/dashboard">Dashboard</Link></li>
                                                    <li><button onClick={props.handleLogout} className="hover:text-c_4 transition-all ease-in duration-200" >Sign Out</button></li>
                                                </div>
                                            }
                                        </> 
                                </ul>
                            )}
                        </ul>

                    </div>
                    
                )}
            </div>
            
        </nav>
    )
}

Navbar.propTypes = {
    // Define PropTypes here
        darkMode: PropTypes.bool,
        toggleDarkMode: PropTypes.func,
        changeComponent:     PropTypes.func,

};

export default Navbar;


