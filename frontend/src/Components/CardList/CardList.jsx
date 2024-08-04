import React, { useEffect, useState } from 'react'
import './CardList.css'
import next_icon from '../../assets/next-icon.png'
import back_icon from '../../assets/back-icon.png'
import { useNavigate } from 'react-router-dom'
import Footer from '../Footer/Footer'
import Cards from '../Cards/Cards'
import { toast, useToast } from 'react-toastify'
import axios from 'axios'
const CardList = () => {
    const [menu , setMenu] = useState('room');
    const [data , setData] = useState([])
const [filteredProperties, setFilteredProperties] = useState([]);
    const navigate = useNavigate();

   

    const goToBack = () => {
      navigate('/');
    };

   
  

   
   useEffect(()=>{
    const fatchdata = async () =>{
      const response = await axios.get('http://localhost:8000/api/v1/property/getAllProperty',{
        params: {
          category: menu,  // Example query parameter
                // Another example query parameter
        },
      });
      // console.log(response.data.data[0])
      if (!response) {
        console.log("There was no Exists Blogs")
      }
    setData(response.data.data)
    console.log(data);
    

   }

   fatchdata();
  },[])


   // Filter properties by category
  
   function findPropertyByCategory(data, category) {
    return data.filter(property => property.category.toLowerCase() === category.toLowerCase());
}

const rentProperties = findPropertyByCategory(data, menu);
console.log(rentProperties);



  
  return (
    <>

<div className='card-list container'>
        <div className='page'>
            <img onClick={goToBack} src={back_icon} className='back' alt="" />
           
        </div>
      <div className='top'>
      <button  onClick={() => setMenu('Room')}  className={menu=== "Room"?'topbtn':"topbtn2"}>Room</button> 
     <button  onClick={() => setMenu('P.G')}  className={menu=== "P.G"? 'topbtn':"topbtn2"}>P.G</button> 
     <button  onClick={() => setMenu('Room-Partner')}  className={menu=== "Room-Partner"? 'topbtn':"topbtn2"}>Partner</button> 
     <button  onClick={() => setMenu('Flat')} className={menu=== "Flat"? 'topbtn':"topbtn2"}>Flat</button> 
      </div>
    <hr />
      <div className="allcards">

        {
          rentProperties.map((item,index) =>{
            return<Cards

            key={index}
            title={item.title}
            image= {item.image}
            price={item.price}
            location ={item.location}
            quantity ={item.quantity}
            category={item.category}
            id={item._id}
         
            />
          })
        }




      </div>
    </div>
<Footer/>
    </>

  )
}

export default CardList
