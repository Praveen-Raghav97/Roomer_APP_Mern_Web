import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router , Route, Routes  } from 'react-router-dom'
import Dashboard from './Dashboard/Dashboard.jsx'
import Login from './Login/Login.jsx'
import AddProduct from './Dashboard/AddProduct/AddProduct.jsx'
import Messages from './Dashboard/Messages/Messages.jsx'
import CardList from './Components/CardList/CardList.jsx'
import SignupForm from './Signup/Signup.jsx'
import Signup from './Signup/Signup.jsx'
import AdminLogin from './Dashboard/AdminLogin/AdminLogin.jsx'
import Otp from './OtpVerification/Otp.jsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import AdminRegister from './Dashboard/adminRegister/AdminRegister.jsx'
import { AuthProvider } from './ProtectRoute/auth.context.jsx'
import ProtectedRoute from './ProtectRoute/ProtectRoute.jsx'
import HomeProtectedRoute from './ProtectRoute/HomeProtectRoute.jsx'
import PropertyId from './Components/PropertyId/PropertyId.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     
    <Router>

      <AuthProvider>


      <Routes>
        <Route path="/" element={<HomeProtectedRoute>
          <App />
        </HomeProtectedRoute>

       
        }/>

        
        <Route path="/dashboard" element={ <ProtectedRoute>
          <Dashboard/> 
        </ProtectedRoute>
           }   />
        <Route path="/adminLogin" element={<AdminLogin/>} />
        <Route path="/adminRegister" element={<AdminRegister/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Signup/>} />
        <Route path="/verify" element={<Otp/>} />
        <Route path="/AddProduct" element={<AddProduct/>} />
        <Route path="/cardlist" element={<CardList/>} />
        <Route path="/property/:id" element={<PropertyId/>} />

       
      </Routes>


      </AuthProvider>
      
    </Router>
    <ToastContainer
 
       />
  </React.StrictMode>,
)
