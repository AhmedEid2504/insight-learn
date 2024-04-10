
const Signup = () => {

    return (
        <div className="flex flex-col justify-center w-fit self-center mt-10 text-white items-center border-4 border-c_3 p-5 rounded-md">
            <h2>Sign Up</h2>
            <form className='flex flex-col gap-5 p-2 '>
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        className='w-[100%] h-8 bg-c_3 rounded-sm p-2 border-none'
                        type="text"
                        id="name"
                        name="name"
                        // value={formData.name}
                        // onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        className='w-[100%] h-8 bg-c_3 rounded-sm p-2 border-none'
                        type="email"
                        id="email"
                        name="email"
                        // value={formData.email}
                        // onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input
                        className='w-[100%] h-8 bg-c_3 rounded-sm p-2 border-none'
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        // value={formData.phoneNumber}
                        // onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        className='w-[100%] h-8 bg-c_3 rounded-sm p-2 border-none'
                        type="password"
                        id="password"
                        name="password"
                        // value={formData.password}
                        // onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        className='w-[100%] h-8 bg-c_3 rounded-sm p-2 border-none'
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        // value={formData.confirmPassword}
                        // onChange={handleChange}
                        required
                    />
                </div>
                <button 
                    className="bg-c_3 shadow-md shadow-c_4 focus:shadow-inner focus:shadow-c_1 p-2 rounded-md hover:bg-white hover:text-c_3 border-2 border-c_3 transition-all duration-200 ease-in"
                    type="submit">
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default Signup;