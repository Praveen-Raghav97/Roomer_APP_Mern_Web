import React from 'react'
import './Cards.css'
import { Link } from 'react-router-dom'
import Image from '../../assets/bg2.jpg'
import { AiFillEnvironment } from "react-icons/ai";
import { BsFillFilePersonFill } from "react-icons/bs";
import user from '../../assets/users.png'
import location from '../../assets/pin.png'
import bed from '../../assets/bed.png'
import { useNavigate } from 'react-router-dom';
const Cards = ({title, location ,image,category,id,quantity,price , photos}) => {

  //console.log(photos)

  

  




  
  const navigate = useNavigate();

    const goToPropertyId = () => {
        navigate('/property/:id');
      };
  return (
    <div className='cards3'>
      <div className="img1">
      
      <Link to={`/property/${id}`}>
      <img src={Image} alt=""  />
      </Link>
      
        
      </div>
      <div className="information1">
        <div className="information">
        <p><img className='icon' src={user} alt="" /> {category}</p>
        <p><img className='icon' src={bed} alt="" /> {quantity} </p>
        </div>
           
        
        <h4>{title}</h4>
        <p> <img className='icon' src={location} alt="" />{location}</p>
        <hr  />
        <h4>{price}</h4>
      </div>
     
    </div>
  )
}

export default Cards
