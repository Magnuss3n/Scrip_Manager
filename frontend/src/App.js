import './App.css';
import Home from "./pages/home.js";
import Login from "./pages/login.js";
import Signup from './pages/signup.js';
import { Navigate, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuthContext } from './context/AuthContext.js';

function App() {
  const { authUser } = useAuthContext();
  return (
    <div className="App" >
      <Routes>
        <Route path='/' element={authUser ? <Home /> : <Navigate to={"/login"} />} />
        <Route path='/login' element={authUser ? <Navigate to="/" /> : <Login />} />
        <Route path='/signup' element={authUser ? <Navigate to='/' /> : <Signup />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
