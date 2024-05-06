import { useState } from 'react';
import Navbar from '../components/Navbar';
import Spinner from 'react-bootstrap/Spinner';
import { Link } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');


    const handleChange = (event) => {
        if(event.target.name === 'username') {
            setUsername(event.target.value);
        } else {
            setPassword(event.target.value);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setErrorMessage(''); // Clear any previous error message
        
        // Validation
        if (!username.trim()) {
            setErrorMessage("Username is required");
            setIsLoading(false);
            return;
        }
        if (!password.trim() || password.length < 8) {
            setErrorMessage("Password must be at least 8 characters long");
            setIsLoading(false);
            return;
        }
        try {
            const response = await fetch('https://dj-render-ldb1.onrender.com/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            });
    
            const data = await response.json();
    
            if (response.ok) {
                // Store token in local storage
                localStorage.setItem('token', data.token);
                localStorage.setItem('userEmail', data.user.email);
                localStorage.setItem('username', data.user.username);
                // Redirect using router after successful login
                window.location.href = '/';
            } else {
                // Handle error here
                setErrorMessage(data.message);
                setIsLoading(false);
            }
        } catch (error) {
            console.error('An error occurred:', error);
            setErrorMessage('An error occurred. Please try again later.');
            setIsLoading(false);
        } finally {
            setIsLoading(false);
        }
    }


    return (
        <div className="flex flex-col self-center items-center h-screen pt-[20vh]">
            <Navbar />
            <h2 className="text-white">New user ? <span className="">
            <Link className="hover:text-c_4 transition-all ease-in duration-200" to="/signup">Sign Up</Link>
                </span></h2>
            <div className="flex flex-col justify-center w-fit self-center bg-opacity-[50%] bg-white mt-5 text-white items-center border-[1px] border-white p-5">
                <img className="w-[120px]" src="images/login-profile.png" alt="" />
                <form className='flex flex-col gap-5 p-2'>
                <div className="flex justify-between w-full text-c_3">
                        <img className="w-[50px]" src="images/user-icon.jpeg" alt="" />
                        <input
                            className='w-[90%] h-13 bg-opacity-[50%] bg-white  rounded-sm p-2 border-none'
                            type="text"
                            id="username"
                            name="username"
                            value={username}
                            onChange={handleChange}
                            placeholder="User Name"
                            required
                        />
                    </div>
                    <div className="flex justify-between w-full text-c_3">
                        
                        <input
                            className='w-[90%] h-13 bg-opacity-[50%] bg-white rounded-sm p-2 border-none'
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Password"
                            value={password}
                            onChange={handleChange}
                            required
                        />
                        <img className="w-[50px]" src="images/lock-icon.jpeg" alt="" />
                    </div>
                    <div className='w-full'>
                        {errorMessage && <p className='bg-opacity-5 text-center font-bold text-[#930505] text-md'>{errorMessage}</p>}
                    </div>
                    <button 
                        className="bg-c_3 p-2 hover:bg-opacity-[30%] border-2 border-c_3 transition-all duration-200 ease-in"
                        
                        onClick={handleSubmit}
                        type="submit">
                            {isLoading ? (
                                <Spinner animation="border" role="status">
                                    <span className="">Loading...</span>
                                </Spinner>
                            ) : (
                                'Log In'
                            )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;