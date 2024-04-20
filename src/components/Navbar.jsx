import { useState, useEffect, useRef } from "react";
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";


const Navbar =() => {
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
        <nav className="bg-transparent h-[10vh] absolute top-0 left-0 text-white shadow-sm shadow-black w-screen flex justify-between items-center px-5 font-sans transition-all ease-in duration-200">
            <div className="flex justify-center items-center p-4 gap-2">
                    <Link className="hover:text-c_1 text-md md:text-xl transition-all ease-in duration-200"                             
                        to="/">
                            <div className='w-[20vw] h-[10vh] bg-white absolute top-0 left-0'>
                                {/* <img className=' absolute -top-[85px]' src="images/logo.svg" alt="logo image" /> */}
                            </div>
                    </Link>
            </div>
            <div className="bg-c_3 text-center items-center justify-center mt-10 p-5 flex h-[10vh]">
            {windowWidth > 800 ? (
                
                <ul className="flex justify-between items-center list-none p-2 text-center gap-5">
                    <li><Link className="hover:text-c_1 transition-all ease-in duration-200" to="/quiz">Home</Link></li>
                    <li><Link className="hover:text-c_1 transition-all ease-in duration-200" to="/quiz">About Us</Link></li>
                    <li><Link className="hover:text-c_1 transition-all ease-in duration-200" to="/quiz">Contact</Link></li>
                    <li><Link className="hover:text-c_1 transition-all ease-in duration-200" to="/quiz">Quiz</Link></li>

                    <div className="flex justify-center items-center text-center content-center gap-3"> 
                        <button className="hover:text-c_1 transition-all ease-in duration-200 text-2xl flex items-center justify-center"  onClick={toggleUserMenu}>
                            <img src="images/user.png" alt="user settings icon" />
                        </button>
                    </div>
                    {showUserMenu && (
                        <ul className={showUserMenu ? "absolute bg-c_3 flex flex-col justify-center gap-2 items-center bg-third p-7 top-0 right-0 translate-y-20 h-auto w-auto transition-all ease-in duration-200" : "translate-y-20 transition-all ease-in duration-200"} ref={ulRef}>
                                <>
                                    <li><Link className="hover:text-c_1 transition-all ease-in duration-200"to="/signup">Sign Up</Link></li>
                                    <li><Link className="hover:text-c_1 transition-all ease-in duration-200" to="/login">Login</Link></li>
                                </> 
                                <>
                                    <li><button className="hover:text-c_1 transition-all ease-in duration-200" >Sign Out</button></li>
                                </>
                        </ul>
                    )}
                </ul>
            ) : (
                <ul className="flex justify-between items-center h-20 list-none p-2 text-center gap-5">
                    <li><Link className="hover:text-c_1 transition-all ease-in duration-200" to="/quiz">Quiz</Link></li>
                    <div className="flex justify-center items-center text-center content-center gap-2">
                        <button className="hover:text-c_1 transition-all ease-in duration-200 text-2xl flex items-center justify-center"  onClick={toggleUserMenu}>
                            <img src="images/user.png" alt="user settings icon" />
                        </button>
                    </div>
                    {showUserMenu && (
                        <ul className={showUserMenu ? "absolute bg-c_3 flex flex-col justify-center gap-2 items-center bg-third p-7 top-0 right-0 translate-y-20 h-auto w-auto transition-all ease-in duration-200" : "translate-y-20 transition-all ease-in duration-200"} ref={ulRef}>
                                <>
                                    <li><Link className="hover:text-c_1 transition-all ease-in duration-200" to="/signup">Sign Up</Link></li>
                                    <li><Link className="hover:text-c_1 transition-all ease-in duration-200" to="/login">Login</Link></li>
                                </> 
                                <>
                                    <li><button className="hover:text-c_1 transition-all ease-in duration-200" >Sign Out</button></li>
                                </>
                        </ul>
                    )}
                </ul>
                
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


