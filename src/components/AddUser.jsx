import { useState } from 'react';

function AddUser() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        fetch('https://dj-render-ldb1.onrender.com/add_user/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password,
            }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            setUsername('');
            setEmail('');
            setPassword('');
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    return (
        <div className='bg-c_5 p-5 py-10 shadow-md'>
            <form onSubmit={handleSubmit} className="flex gap-5 flex-col items-start">
                <div className='flex flex-col justify-center'>
                    <label htmlFor='username' className="mb-1">
                        Username:
                    </label>
                    <input id='username' type="text" value={username} onChange={e => setUsername(e.target.value)} className="ml-2 p-1 border rounded" />
                </div>
                <div className='flex flex-col justify-center'>
                    <label htmlFor='email' className="mb-1">
                        Email:
                    </label>
                    <input id='email' type="email" value={email} onChange={e => setEmail(e.target.value)} className="ml-2 p-1 border rounded" />
                </div>
                <div className='flex flex-col justify-center'>
                    <label htmlFor='password' className="mb-1">
                        Password:
                    </label>
                    <div className='flex justify-center items-center'>
                        <input id='password' type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} className="ml-2 p-1 border rounded" />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="p-2">
                            <div className='w-5'>
                                {showPassword ? 
                                    <img src="/images/open-eye.png" alt="" />
                                : 
                                    <img src="/images/closed-eye.png" alt="" />
                                }
                            </div>
                        </button>
                    </div>
                </div>
                <div className='self-center pt-5'>
                    <input type="submit" value="Add" className="p-1 border rounded cursor-pointer" />
                </div>
            </form>
        </div>
    );
}

export default AddUser;