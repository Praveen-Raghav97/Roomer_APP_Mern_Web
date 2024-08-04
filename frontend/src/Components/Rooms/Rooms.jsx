import React, { useEffect, useState } from 'react'
import './Rooms.css'
import Cards from '../Cards/Cards'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const Rooms = () => {
  const [data , setData] = useState([])
  const [menu , setMenu] = useState('room');
    const navigate = useNavigate();

    const goToCardList = () => {
        navigate('/cardlist');
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
            console.log("There was no Exists property")
          }
        setData(response.data.data)
       // console.log(data);
        
    
       }
    
       fatchdata();
      },[])


        // Filter properties by category
  
function findPropertyByCategory(data, category) {
    return data.filter(property => property.category.toLowerCase() === category.toLowerCase());
}

const rentProperties = findPropertyByCategory(data, 'room');
//console.log(rentProperties);
    
  return (
    <div className='room'>
      <div className="room1">
      <h2>Best Rooms</h2>
      <button onClick ={goToCardList} className='btn dark-btn'>See All</button>

      </div>
      <div className="room2">
   
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
  )
}

export default Rooms
