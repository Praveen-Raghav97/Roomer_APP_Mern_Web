import React, { useEffect, useState } from 'react'
import './Testimonials.css'

import Image1 from '../../assets/messenger.png'

import TestiCard from '../TestiCard/TestiCard'
import axios from 'axios'

const Testimonials = () => {
 





  return (
    <div className='testi'>
      <div className="leftT">
       <img src={Image1} alt="" />
       <p>What People Are Saying...</p>
      </div>
      <div className="rightT">

<TestiCard/>
      </div>
    </div>
  )
}

export default Testimonials
