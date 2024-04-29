import { useState } from 'react';
import Navbar from '../components/Navbar';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleChange = (event) => {
        if(event.target.name === 'username') {
            setUsername(event.target.value);
        } else {
            setPassword(event.target.value);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
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
            // Redirect using router after successful login
            window.location.href = '/';
        } else {
            console.error(data);
            alert('Login failed. Please check your credentials.');
        }
    }



    return (
        <div className="flex flex-col self-center items-center h-screen pt-[20vh]">
            <Navbar />
            <h2 className="text-white">New user ? <span className="">Create an account</span></h2>
            <div className="flex flex-col justify-center w-fit self-center bg-opacity-[50%] bg-white mt-5 text-white items-center border-[1px] border-white p-5">
                <img className="w-[120px]" src="images/login-profile.png" alt="" />
                <form className='flex flex-col gap-5 p-2'>
                <div className="flex justify-between w-full text-c_3">
                        <img className="w-[50px]" src="images/user-icon.jpeg" alt="" />
                        <input
                            className='w-[80%] h-13 bg-opacity-[50%] bg-white  rounded-sm p-2 border-none'
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
                            className='w-[80%] h-13 bg-opacity-[50%] bg-white rounded-sm p-2 border-none'
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
                    <div className="flex w-full justify-between items-center">
                        <div className="flex justify-center items-center gap-1 text-center">
                            <input type="checkbox" name="remember" id="remember" />
                            <label htmlFor="remember" className="text-white text-sm">Remember me</label>
                        </div>
                        {/* forgot password */}
                        <a href="#" className="text-white text-sm hover:text-c_2">Forgot password ?</a>
                    </div>
                    <button 
                        className="bg-c_3 p-2 hover:bg-opacity-[30%] border-2 border-c_3 transition-all duration-200 ease-in"
                        onClick={handleSubmit}
                        type="submit">Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;