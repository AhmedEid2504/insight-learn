
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
import Users from './components/morphcomponents/Users';

function App() {

    return (
        <div className="h-auto flex flex-col justify-between">
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="dashboard" element={<Dashboard />} >
                        <Route path='reports' element={<Reports />}/>
                        <Route path='settings' element={<Settings />}/>
                        <Route path='predictions' element={<Predictions />}/>
                        <Route path="users" element={<Users />} />
                        <Route path='materials' element={<Materials/>}/>
                        <Route path='courses' element={<Courses/>}>
                            <Route path=':courseId' element={<CourseDetail />}/>
                        </Route>
                    </Route>
                </Routes>
            </Router>
            <Analytics />
        </div>
    )
}

export default App


