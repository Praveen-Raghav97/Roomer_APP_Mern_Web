import React from 'react'
import DashNav from './DashNav/DashNav'
import AddProduct from './AddProduct/AddProduct'
import './Dashboard.css'
import Messages from './Messages/Messages'
import Footer from '../Components/Footer/Footer'
import AddedList from './AddedList/AddedList'

const Dashboard = () => {
  return (
    <>
    <DashNav/>
  <div className="dash-container">
  
  <div className="hero-text">
      <h1>Welcome To Dashboard </h1>
      <p>"Home is not a place, it's a feeling. Rent a house and make it your home where memories are made and cherished forever."</p>
            <button className='btn'>Explore more  </button>
    </div>
  </div>
  <AddProduct/>

  <Messages/>
  <AddedList/>
<Footer/>
    </>
  
  )
}

export default Dashboard
