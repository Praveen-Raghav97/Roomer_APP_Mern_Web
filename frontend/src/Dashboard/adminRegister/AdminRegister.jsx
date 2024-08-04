import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import './AdminRegister.css'
import { useNavigate } from 'react-router-dom';


import { toast, useToast } from 'react-toastify'




const schema = yup.object().shape({
  username: yup.string().required('UserName is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

const AdminRegister = () => {
    const navigate = useNavigate();

  
   

    const goTolLogin = () => {
      navigate('/adminLogin');
    };

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
 
    try {
      const response = await axios.post('http://localhost:8000/api/v1/Admin/registerAdmin', data);
      console.log(response.data);
   
      toast.success(response.data.message);
      navigate('/AdminLogin')
      // Handle successful signup (e.g., redirect to login page)
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong" );
      // Handle signup error
    }
  };

  return (
    <div className="form-container">
    
<form onSubmit={handleSubmit(onSubmit)} className="form-signup">
      <div>
        <label htmlFor="name">Name</label>
        <input id="name" {...register('username')} />
        <p className='error'>{errors.username?.message}</p>
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" {...register('email')} />
        <p className='error'>{errors.email?.message}</p>
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" {...register('password')} />
        <p className='error'>{errors.password?.message}</p>
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input type="password" id="confirmPassword" {...register('confirmPassword')} />
        <p className='error'>{errors.confirmPassword?.message}</p>
      </div>
      <button className=' btn dark-btn' type="submit">Sign Up</button>
      <div className="link">
       <p onClick={goTolLogin}>Already have an account ?</p>
       <p onClick={goTolLogin} >Login</p>
      </div>
    </form>
    
    </div>

    
  );
};

export default AdminRegister;

