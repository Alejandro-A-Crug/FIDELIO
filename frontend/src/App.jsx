
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import { ToastContainer } from 'react-toastify'
import { useAuthContext } from './context/AuthContext'
function App() {
  const {authUser} = useAuthContext();

  return (
   <>
  
    <div>
    <video autoPlay loop muted playsInline className="background-video">
        <source src="/grass1.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <Routes>
        <Route path="/" element={authUser ? <Home/> : <Navigate to={"/login"} />} />
        <Route path="/login" element={authUser ? <Navigate to="/"/> : <Login/>} />
        <Route path="/signup" element={authUser ? <Navigate to="/"/> : <Signup/>} />
      </Routes>
    <ToastContainer/>
    </div>
  </> 
  )
}

export default App
