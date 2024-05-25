
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Home from './pages/Home'
import Login from './pages/Login';
// import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Reports from './components/Reports';
import Settings from './components/Settings';
import Predictions from './components/Predictions';
import { Analytics } from "@vercel/analytics/react"
import Materials from './components/Materials';
import Courses from './components/Courses';
import Users from './components/Users';
import UsersData from './components/UsersData';
import AddUser from './components/AddUser';
import Usage from './components/Usage';
import Sessions from './components/Sessions';
import TotalSessions from './components/TotalSessions';
import QuizReport from './components/QuizReports';
function App() {
    const [user, setUser] = useState(null);

    return (
        <div className="h-auto flex flex-col justify-between">
            <Router>
                <Routes>
                    <Route path="/" element={<Home user={user} setUser={setUser} />} />
                    <Route path="/login" element={<Login setUser={setUser} />} />
                    {/* <Route path="/signup" element={<Signup />} /> */}
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
                            <Route path='quizreport' element={<QuizReport/>}/>
                            <Route path='courses' element={<Courses/>}/>
                            <Route path="quizreports/:courseName" element={<QuizReport />} />
                        </Route>
                    </>
                </Routes>
            </Router>
            <Analytics />
        </div>
    )
}

export default App


