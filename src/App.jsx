
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Home from './pages/Home'
import Login from './pages/Login';
// import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Reports from './components/reports/Reports';
import Predictions from './components/reports/Predictions';
import { Analytics } from "@vercel/analytics/react"
import Courses from './components/reports/Courses';
import Users from './components/reports/Users';
import UsersData from './components/reports/UsersData';
import AddUser from './components/AddUser';
import Sessions from './components/reports/Sessions';
import TotalSessions from './components/reports/TotalSessions';
import QuizReport from './components/reports/QuizReports';
import MainDash from './components/reports/MainDash';
import Profile from './components/Profile';
function App() {
    const adminEmails = import.meta.env.VITE_ADMIN_EMAILS.split(',');
    const [isDarkMode, setIsDarkMode] = useState(false);

    // On component mount, check if the user prefers dark mode
    useEffect(() => {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setIsDarkMode(true);
        }
    }, []);

    // When isDarkMode changes, add or remove the 'dark' class
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    return (
        <div className="h-auto flex flex-col justify-between">
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    {/* <Route path="/signup" element={<Signup />} /> */}
                    {adminEmails.includes(localStorage.email) && 
                    <>
                        <Route path="dashboard" element={<Dashboard isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />} >
                            <Route path='maindash' element={<MainDash />}/>
                            <Route path='reports' element={<Reports />}/>
                            <Route path='predictions' element={<Predictions />}/>
                            <Route path="users" element={<Users />} />
                            <Route path='usersdata' element={<UsersData />}/>
                            <Route path='add-user' element={<AddUser />}/>
                            <Route path='users-data' element={<UsersData />}/>
                            <Route path='sessions' element={<Sessions/>}/>
                            <Route path='totalsessions' element={<TotalSessions/>}/>
                            <Route path='courses' element={<Courses/>}/>
                            <Route path="quizreports/:courseName" element={<QuizReport />} />
                            <Route path='profile' element={<Profile/>}/>
                        </Route>
                    </>
                    }
                </Routes>
            </Router>
            <Analytics />
        </div>
    )
}

export default App


