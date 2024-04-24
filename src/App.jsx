
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home'
import Login from './pages/Login';
import Signup from './pages/Signup';


import Dashboard from './pages/Dashboard';


function App() {

    
    

    return (
        <div className="bg-c_2 h-auto flex flex-col justify-between w-[100%]">
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/quiz" element={<iframe className='h-screen w-full' src="/quiz.html" title="Quiz" />} />
                    <Route path="/moodle" element={<iframe name="moodleFrame" src="http://4.157.125.46" width="80%" height="800"></iframe>} />
                    <Route path="/video" element={<iframe className='h-[50vh] w-full' src="https://www.youtube.com/embed/bMknfKXIFA8" title="React Course - Beginner&#39;s Tutorial for React JavaScript Library [2022]" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>} />
                    <Route path="/pdf" element={<iframe className='h-[75vh] w-full' src='https://drive.google.com/file/d/1t_l0lVYwMKDwooqYNjEaNinW3Bz05Hx0/preview' frameBorder="0"></iframe>} />
                </Routes>
                
        </Router>
    </div>
    )
}

export default App


