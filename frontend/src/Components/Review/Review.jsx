import React from 'react'
import Image1 from '../../assets/messenger.png'
import './Review.css'
import { useForm } from 'react-hook-form';
import { toast, useToast } from 'react-toastify'
import axios from 'axios';
const Review = () => {

  const { register , handleSubmit , reset } = useForm({});

  const onSubmit = async (data) => {
  
    try {
      const response = await axios.post('http://localhost:8000/api/v1/testimonials/registerTestimonial', data);
      console.log(response.data);
      toast(response.data.message);
    reset();
      // Handle successful login (e.g., redirect to dashboard)
    } catch (error) {
      console.error(error);
      toast( "Something Went wrong " , error)
      // Handle login error
    }
  }

  return (
    <div className='review'>
    <div className="review-top">
     <img src={Image1} alt="" />
     <p>Write A Review For Us...</p>
    </div>
    <div className="down">
<form onSubmit={handleSubmit(onSubmit)}>
    <label className='heading' htmlFor="name"> Name</label>
    <input type="username" {...register('username')} placeholder='rahul' required />
    <label className='heading' htmlFor="">Email</label>
    <input id="email" {...register('email')} placeholder='rahul@gmail.com' required />
   <label className='heading' htmlFor="">Description</label>
   <textarea name="" {...register('description')} typeof='text'  id="" cols={30} required   placeholder='Type Something'></textarea>
   <button className='btn' type='submit'>Submit</button>
</form>
    </div>
  </div>
  )
}

export default Review
