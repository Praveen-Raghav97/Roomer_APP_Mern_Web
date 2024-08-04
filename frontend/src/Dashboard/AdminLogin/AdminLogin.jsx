import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import './AdminLogin.css'
import { useNavigate } from 'react-router-dom';
import { toast, useToast } from 'react-toastify'
import {useAuth} from "../.././ProtectRoute/auth.context"
const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const AdminLogin = () => {
  const navigate = useNavigate();
  const {login} = useAuth();

  const goToSignup = () => {
    navigate('/adminRegister');
  };


  const { register, handleSubmit, formState: { errors }, reset} = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:8000/api/v1/Admin/login', data);
      console.log(response.data);
    

      const token = response.data.data.token;
      const AdminID = response.data.data.id
      
    localStorage.setItem("token" , token)
    localStorage.setItem("adminId" , AdminID)
      toast('Login Succesfully');
      reset();
      login();
      navigate("/dashboard")
      
      // Handle successful login (e.g., redirect to dashboard)
    } catch (error) {
      console.error(error);
      toast.error("Something Went Wrong")
      // Handle login error
    }
  };

  return (
    <div className="login-con">
          <form onSubmit={handleSubmit(onSubmit)} className="login-box">
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" {...register('email')} placeholder='rahul@gmail.com' />
        <p className='error'>{errors.email?.message}</p>
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" {...register('password')} placeholder='rahul1234' />
        <p className='error'>{errors.password?.message}</p>
      </div>
      <button className='btn dark-btn login-btn' type="submit">Log In</button>
      <div className="link">
       <p>Forgot Password</p>
       <p onClick={goToSignup}>Sign up</p>
      </div>
    </form>
    </div>

  );
};

export default AdminLogin;
