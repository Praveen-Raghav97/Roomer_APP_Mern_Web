import React, { useEffect, useState } from 'react'
import './AddedList.css'
import axios from 'axios';
import AddData from './AddData';
import { toast, useToast } from 'react-toastify'
const AddedList = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  


  const adminId = localStorage.getItem("adminId");
  const fetchadmin = async ()=>{
   
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/Admin/${adminId}`)
     //  console.log(response.data)
      setProperties(response.data.data.AddedProperty)
      //console.log(response.data.data.AddedProperty)
      console.log(response.data.data.AddedProperty)
    //console.log(properties)
        } catch (error) {
     console.log(error)
   toast.error("Something Went Wrong")
    }
 
     
   }
   const deleteProperty = async(mongoId) =>{
   // console.log(mongoId)
   try {
    const response = await axios.get(`http://localhost:8000/api/v1/property/PropertyId/${mongoId}`)
    if(response.status != 200 || !response){
  //console.log("!Something went wrong")
  toast.error("!Server Error")
    }
         toast.success(response.data.message)
       fetchadmin();
   } catch (error) {
    console.log(error)
    toast.error("Something Went Wrong")
   }
     
  }


useEffect(()=>{
 
  
  fetchadmin();
},[adminId])

  //if (loading) return <div>Loading...</div>;
 // if (error) return <div>Error: {error}</div>;




  return (
    < div className='add-list'>
      <div className="add-list-top">
        <h1>Your Added Property</h1>
      </div>
  
  <div className="cone">
        <table className='table'>
        <thead className='t-head'>
      <tr className='tr'>
        <th scope='column' className='th1 hide'>
          ID
        </th>
     
        <th scope='column' className='th2'>
          Title
        </th><th scope='column' className='th1 hide'>
          Price
        </th>
        <th scope='column' className='th3 '>
          Action
        </th>
      </tr>
    </thead>
    <tbody>
      {properties.map((item , index) =>{
        return <AddData
        key={index} mongoId={item._id} title={item.title} date={item.createdAt} price={item.price} deleteProperty={deleteProperty}
        />
      })}
    </tbody>
    </table>
    </div>





    
      
    </div>
  )
}

export default AddedList
