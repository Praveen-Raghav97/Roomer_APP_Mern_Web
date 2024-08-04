import React, { useEffect, useState } from 'react'
import './PropertyId.css'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import Image from '../../assets/bg2.jpg'
import Image1 from '../../assets/star.png'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Propdetails from './Propdetails.jsx'
const PropertyId = () => {

  const {id} = useParams(); // Extract the property ID from the URL
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

// console.log(id)
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/property/${id}`);
        setProperty(response.data.data);
        console.log(response.data.data)
        
      } catch (error) {
        console.log(error)
    
    };
  }
    fetchProperty();
  }, [id]);




  return (

    <>
    <div className='n'>
    <Navbar/>
    </div>
 
   
   <Propdetails property={property} />
      <Footer/>
    </>
    
  )
}

export default PropertyId
