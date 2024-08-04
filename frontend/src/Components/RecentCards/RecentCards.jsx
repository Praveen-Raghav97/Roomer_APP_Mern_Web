import React, { useEffect, useState } from 'react'
import './RecentCards.css'
import Cards from '../Cards/Cards'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const RecentCards = () => {
    const navigate = useNavigate();
    const [data , setData] = useState([])
    const [date , setDate] = useState()
    const goToCardList = () => {
        navigate('/cardlist');
      };


      useEffect(()=>{
        const fatchdata = async () =>{
          const response = await axios.get('http://localhost:8000/api/v1/property/getAllProperty');
          // console.log(response.data.data[0])
          if (!response) {
            console.log("There was no Exists property")
          }
        setData(response.data.data)
       // setDate(response.data.data.createdAt)
        //console.log(response.data.data.createdAt)
        //console.log(data);
        
    
       }
    
       fatchdata();
      },[])

    //  function findPropertiesByDate(data, targetDate) {
   //     return data.filter(property => property.date === targetDate);
   // }
    
    // Example usage:
   // const targetDate = "2024-08-03";
    //const foundProperties = findPropertiesByDate(data, targetDate);
    
    //console.log(foundProperties);

  return (
    <div className="recentCards">
<div className='recent1'>
    <h2>Recent Added</h2>
    <button onClick ={goToCardList} className='btn dark-btn'>See All</button>
</div>
        <div className='recent2'>
        {
          data.map((item,index) =>{
            return<Cards

            key={index}
            title={item.title}
            image= {item.image}
            price={item.price}
            location ={item.location}
            quantity ={item.quantity}
            category={item.category}
            id={item._id}
            date = {item.createdAt}
         
            />
          })
        }
        </div>
     
      
    </div>
  )
}

export default RecentCards
