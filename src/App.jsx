
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home'
import Login from './pages/Login';
// import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Reports from './components/reports/Reports';
import Settings from './components/Settings';
import Predictions from './components/reports/Predictions';
import { Analytics } from "@vercel/analytics/react"
import Courses from './components/reports/Courses';
import Users from './components/reports/Users';
import UsersData from './components/reports/UsersData';
import AddUser from './components/AddUser';
import Usage from './components/reports/Usage';
import Sessions from './components/reports/Sessions';
import TotalSessions from './components/reports/TotalSessions';
import QuizReport from './components/reports/QuizReports';
function App() {
    const adminEmails = import.meta.env.VITE_ADMIN_EMAILS.split(',');

    return (
        <div className="h-auto flex flex-col justify-between">
            <Router>
                <Routes>
                    <Route path="/" element={<Home  />} />
                    <Route path="/login" element={<Login />} />
                    {/* <Route path="/signup" element={<Signup />} /> */}
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
                            <Route path='sessions' element={<Sessions/>}/>
                            <Route path='totalsessions' element={<TotalSessions/>}/>
                            <Route path='quizreport' element={<QuizReport/>}/>
                            <Route path='courses' element={<Courses/>}/>
                            <Route path="quizreports/:courseName" element={<QuizReport />} />
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


