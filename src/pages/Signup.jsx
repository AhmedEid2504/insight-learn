import { useState } from 'react';

const Signup = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await fetch('https://dj-render-ldb1.onrender.com/signup/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: name,
                password: password,
                email: email,
            }),
        });

        const data = await response.json();

        if (response.ok) {
            // Handle successful signup here
            console.log(data);
        } else {
            // Handle error here
            console.error(data);
        }
    }

    return (
        <div className="flex flex-col justify-center w-fit self-center mt-10 text-white items-center border-4 border-c_3 p-5 rounded-md">
            <h2>Sign Up</h2>
            <form className='flex flex-col gap-5 p-2 ' onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        className='w-[100%] h-8 bg-c_3 rounded-sm p-2 border-none'
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default Signup;