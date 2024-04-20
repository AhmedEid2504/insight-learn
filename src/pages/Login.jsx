

const Login = () => {
    

    return (
        <div className="flex flex-col self-center items-center">
            <h2 className="text-white">New user ? <span className="">Create an account</span></h2>
            <div className="flex flex-col justify-center w-fit self-center bg-opacity-[50%] bg-white mt-5 text-white items-center border-[1px] border-white p-5">
                <img className="w-[120px]" src="images/login-profile.png" alt="" />
                <form className='flex flex-col gap-5 p-2'>
                <div className="flex justify-between w-full text-c_3">
                        <img className="w-[50px]" src="images/user-icon.jpeg" alt="" />
                        <input
                            className='w-[80%] h-13 bg-opacity-[50%] bg-white  rounded-sm p-2 border-none'
                            type="email"
                            id="email"
                            name="email"
                            // value={formData.email}
                            // onChange={handleChange}
                            placeholder="Email address"
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
                            // value={formData.password}
                            // onChange={handleChange}
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
                        type="submit">Login
                    </button>
                </form>
            </div>
            
        </div>
    );
};

export default Login;