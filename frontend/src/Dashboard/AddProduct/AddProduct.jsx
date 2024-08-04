import React, { useEffect, useState } from 'react'
import './AddProduct.css'
import DashNav from '../DashNav/DashNav'
import Image from '../../assets/upload_area.png'
import { toast, useToast } from 'react-toastify'
import axios from 'axios'
import { useForm } from 'react-hook-form'



const AddProduct = () => {

  const [images, setImages] = useState([]);
  const [preview, setPreview] = useState([]);
  const [token , setToken] = useState(null);
  const [AdminId, setAdminID] = useState(null);
  const { register,  reset} = useForm({
  });

  const [propertyData, setPropertyData] = useState({
    title: '',
    description: '',
    price:'',
    quantity:'1',
    
    username:'',
    category:'room',
    location:'',
  });

  const handleInputChange = (e) => {
    setPropertyData({
      ...propertyData,
      [e.target.name]: e.target.value,
    });
  };


  useEffect(() => {
    // Get token And AdminId from localStorage when the component mounts
    const savedToken = localStorage.getItem('token');
    setToken(savedToken);
    const AdminId = localStorage.getItem('adminId')
     setAdminID(AdminId);
     //console.log(AdminId ,savedToken)
  }, []);


  const handleChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);

    const previewUrls = files.map(file => URL.createObjectURL(file));
    setPreview(previewUrls);
  };
  
  const onSubmit = async (data) => {
  
  // console.log(data)
   
    
    try {
      const response = await axios.post('http://localhost:8000/api/v1/property/addproperty',{ data,admin:localStorage.getItem("adminId")}
        ,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }

      );
     

     // console.log(response.data);
      toast(response.data.message);
    reset();

      // Handle successful login (e.g., redirect to dashboard)
    } catch (error) {
      console.error(error);
      toast("Something went wrong")
      // Handle login error
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', propertyData.title);
    formData.append('description', propertyData.description);
    formData.append('username', propertyData.username);
    formData.append('quantity', propertyData.quantity);
    formData.append('category', propertyData.category);
   
    formData.append('price', propertyData.price);
    formData.append('location', propertyData.location);
    images.forEach(image => {
      formData.append('images', image);
    });
      
    const admin = localStorage.getItem("adminId");
    try {
      const response = await axios.post('http://localhost:8000/api/v1/property/addproperty', formData 
        ,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }

      );
     

      console.log(response.data);
      toast(response.data.message);
    reset();

      // Handle successful login (e.g., redirect to dashboard)
    } catch (error) {
      console.error(error);
      toast("Something went wrong")
      // Handle login error
    }
  }




  return (

    <>
 
      <div className='addProduct'>
      <h1>ADD Your Property</h1>

      <form onSubmit={handleSubmit} className='form'>
    <p className='heading'>Upload Images</p>
    
 <label htmlFor="image">
  <img className='img' src={Image} alt="" />
  <div className='image3'>
  {preview.map((url, index) => (
          <img key={index} src={url} alt="preview" style={{ width: '100px', height: '100px' }} />
        ))}
  </div>
 </label>
 <input multiple onChange={handleChange} name='file'  type="file" id='image'  hidden />
 <p className='heading'> Title</p>
 <input id='title' onChange={handleInputChange}  name='title' className='input' type="text" placeholder='Type Here' required />
 <p className='heading'>Your Name</p>
 <input id='username' onChange={handleInputChange}  name='username' className='input' type="text" placeholder='Type Here' required />

 <p className='heading'> Price</p>
 <input  id='price' onChange={handleInputChange}  name='price' className='input' type="text" placeholder='Type Here' required />
 <p className='heading'> Location</p>
 <input id='location' onChange={handleInputChange}  name='location' className='input' type="text" placeholder='Type Here' required /> 
 
 <div>
  
 </div>
 <p className='heading'>  Description</p>
 <textarea id='description' onChange={handleInputChange}  name='description' className='textarea'   placeholder='Write Your Description.  For Better Expreiance.' rows={6} required />
 
 <div className="box">
 <div className='cate'>
 <p className='heading'>Category</p>
 <select  onChange={handleInputChange}  className='select ' name="category" id="category"> 
  <option value="Room">Room</option>
  <option value="Room Partner">Room Partner</option>
  <option value="P.G">P.G</option>
  <option value="Flat">Flat</option>
 </select>
 </div>
 <div className='Quant'>
 <p className='heading'>Quantity</p>
 <select onChange={handleInputChange}     className='select ' name="quantity" id="quantity"> 
  <option value="Room">1</option>
  <option value="Room Partner">2</option>
  <option value="P.G">3</option>
  <option value="Flat">4</option>
  <option value="Flat">Above 5</option>
 </select>
 </div>

 </div>





<br />

 <button type='submit' className='submitbtn '>Submit</button>
    </form>
        
    </div>
    </>
  
  )
}

export default AddProduct
