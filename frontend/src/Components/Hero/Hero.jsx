import React from 'react'
import './Hero.css'
import home_video from '../../assets/Hero_Video.mp4'
const Hero = () => {
  return (
    <div className='hero-container'>
      <video src={home_video} loop muted autoPlay className='video'></video>
    <div className="hero-text">
      <h1>YOUR DREAM HOME</h1>
      <p>"Home is not a place, it's a feeling. Rent a house and make it your home where memories are made and cherished forever."</p>
            <button className='btn'>Explore more  </button>
    </div>
  </div>
  )
}

export default Hero
