import React from 'react'
import './Services.css'
import Image1 from '../../assets/bg1.jpg'
import Image2 from '../../assets/bg2.jpg'
import Image3 from '../../assets/bg4.jpg'
import Image4 from '../../assets/24-hours.png'

const Services = () => {
  return (
    <div className='services'>
      <div className='services-header'>
        <img src={Image4} alt="" />
        <h3>Services</h3>
        <p>Our platform offers a wide vairety of houses,giving customers
            plenty of option to choose from based on their budget.
        </p>
      </div>
      <div className='cons'>
        <div className='box-left'>
            <img src={Image2} alt="" />
            <h3>Fully Furnished</h3>
            <p>Our Fully Furnished Rental Rooms are equipped with everything your need, from 
                appliances to furniture.
            </p>
        </div>
        <div className='box-center'>
            <img src={Image1} alt="" />
            <h3>Accesible Location</h3>
            <p>All are Properties are located in prine area
                to provide you with easy access to all of the neccesary
            </p>
        </div>
        <div className='box-right'>
            <img src={Image3} alt="" />
            <h3>Competitive Prices</h3>
            <p>We offer Affordable rental rates with no hidden charges for all our 
                high-quality rental listing on our platform.
            </p>
        </div>
        
      </div>
    </div>
  )
}

export default Services
