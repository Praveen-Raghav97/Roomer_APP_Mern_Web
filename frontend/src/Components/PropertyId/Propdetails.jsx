import React from 'react'
import './PropertyId.css'
import Image1 from '../../assets/star.png'
import Image from '../../assets/bg2.jpg'
import { useForm } from 'react-hook-form';
import { toast, useToast } from 'react-toastify'
import axios from 'axios';
const Propdetails = ({property}) => {

    if (!property) {
        return <div>Loading...</div>; // Or some placeholder
      }
    
      // Access properties safely
      const { title, description, photos, location, price, quantity, rooms , category } = property;
    
      
      const { register , handleSubmit , reset } = useForm({});

      const onSubmit = async (data) => {
      
        try {
          const response = await axios.post('http://localhost:8000/api/v1/booking/SendRequest', data);
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
    <div className='property-con container'>
     
    <div className="property-info1">
<h1>{title}</h1>
<p>{location}</p>
<div className="feu">
  <img src={Image1} alt="abv" />
  <h6>FEATURED</h6>
</div>
    </div>
    <div className="img-container">

      <div className="one">
      <img  src={Image} alt="" />
      </div>
      <div className="two">
      <img  src={Image} alt="" />
      <img  src={Image} alt="" />
      </div>
     
     <div className="three">
     <img  src={Image} alt="" />
     <img  src={Image} alt="" />
     </div>
      
    </div>
    <div className="property-info2">
      <div className="info-left">
 <div className="info-top">
  <h2> Price - {price}</h2>
  <p> Category - {quantity}</p> <p> Rooms - {rooms}</p>
  <p>{category}</p>
 </div>
 <br />
 <div className="info-down">
<p> {description}?{description}:Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quidem cumque beatae earum eum ullam saepe eius, alias, tenetur eos temporibus debitis, minima nostrum modi rem! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus impedit autem laboriosam et ullam iure ducimus rerum quas d</p>
 <br />
 
 </div>
      </div>
      <div className="info-right">
<form 
   className='send-form'  onSubmit={handleSubmit(onSubmit)}>
  <h1>Send Message</h1>
  <input type="text" placeholder='FullName'{...register('username')} required  />
  <input type="email" placeholder='Email' {...register('email')} required />
  <input type="Phone" placeholder='Phone' required {...register('phone')}/>
  <button className=' btn dark-btn' type='submit'> Send Message</button>
</form>
      </div>
    </div>
  </div>
  )
}

export default Propdetails
