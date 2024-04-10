import {useState} from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home'
import Navbar from './components/Navbar'
import MorphCast from './pages/MorphCast';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  const [darkMode, setDarkMode] = useState(true);

  function toggleDarkMode() {
    setDarkMode((prevDarkMode) => prevDarkMode = !prevDarkMode)
  }
  return (
    
    <div className="flex flex-col bg-c_2 h-screen">
      <Router>
        <Navbar 
            toggleDarkMode={toggleDarkMode} 
            darkMode={darkMode} 
          />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path='/morphcast' element={<MorphCast />}></Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
