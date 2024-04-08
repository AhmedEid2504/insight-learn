import {useState} from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home'
import Navbar from './components/Navbar'

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
        </Routes>
      </Router>
    </div>
  )
}

export default App
