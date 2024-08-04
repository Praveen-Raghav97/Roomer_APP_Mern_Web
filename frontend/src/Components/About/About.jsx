import React from 'react'
import './About.css'
import Image from '../../assets/bg3.jpg'
import Image2 from '../../assets/hand-shake.png'
import Image3 from '../../assets/vehicle.png'
import Image4 from '../../assets/preview.png'
const About = () => {
  return (
    <div className='about'>
      <div className='about-left'>
        <div className='box1'>
            <div className='para'>
                <p>About us</p>
            </div>
            <div className='heading1'>
            <h3 >
             What We Stands For
            </h3>
            </div>
           
        </div>
        <div className="about-box">
            <div className="heading1">
                <img src={Image3} alt="" />
                <h4>Quality Rooms</h4>
                
            </div>
            <div className="para">
                    <p>Whether you're looking for a stunnig apartment, a cozy
                        vacation home, or a unique property, our platform has got you covered.
                    </p>
                </div>
        </div>
        <div className="about-box">
            <div className="heading1">
                <img src={Image4} alt="" />
               <h4> Excellent Services  </h4>
            </div>
            <div className="para">
                    <p>Our team is committed to ensueing that your experience on our platform is smooth,enjoyable,and hassel-free.</p>
                </div>
        </div>
        <div className="about-box">
            <div className="heading1">
            <img src={Image3} alt="" />
                <h4>Trusted Name</h4>
               
            </div>
            <div className="para">
                    <p> We have been in the bussiness of years.ensuring the satisfaction of our clients.</p>
                </div>
        </div>
      </div>
      <div className='about-right'>
    <img src={Image} alt="" />
      </div>
    </div>
  )
}

export default About
