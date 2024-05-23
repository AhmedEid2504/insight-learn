
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home'
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Reports from './components/Reports';
import Settings from './components/Settings';
import Predictions from './components/Predictions';
import { Analytics } from "@vercel/analytics/react"
import Materials from './components/Materials';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import Users from './components/Users';
import UsersData from './components/UsersData';
import AddUser from './components/AddUser';
import Usage from './components/Usage';
import Sessions from './components/Sessions';
import TotalSessions from './components/TotalSessions';
function App() {
    const adminEmails = import.meta.env.VITE_ADMIN_EMAILS.split(',');


    return (
        <div className="h-auto flex flex-col justify-between">
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    {adminEmails.includes(localStorage.userEmail) && 
                    <>
                        <Route path="dashboard" element={<Dashboard />} >
                            <Route path='reports' element={<Reports />}/>
                            <Route path='usage' element={<Usage />}/>
                            <Route path='settings' element={<Settings />}/>
                            <Route path='predictions' element={<Predictions />}/>
                            <Route path="users" element={<Users />} />
                            <Route path='usersdata' element={<UsersData />}/>
                            <Route path='add-user' element={<AddUser />}/>
                            <Route path='materials' element={<Materials/>}/>
                            <Route path='sessions' element={<Sessions/>}/>
                            <Route path='totalsessions' element={<TotalSessions/>}/>
                            
                            <Route path='courses' element={<Courses/>}>
                                <Route path=':courseId' element={<CourseDetail />}/>
                            </Route>
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


