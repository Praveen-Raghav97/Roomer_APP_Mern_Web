import React, { useEffect, useRef, useState } from 'react'
import './Testimonials.css'
import next_icon from '../../assets/next-icon.png'
import back_icon from '../../assets/back-icon.png'

import user_3 from '../../assets/user-3.png'
import user_4 from '../../assets/user-4.png'
import axios from 'axios'
import { toast } from 'react-toastify'
import TestiSlide from './TestiSlide'
const TestiCard = () => {

 const [testimonials ,setTestimonials] = useState([]);


  
       
         useEffect( () =>{

            const fatchTestimonial = async () =>{
                try {
                    const response = await axios.get("http://localhost:8000/api/v1/testimonials/getTestimonials")
                   
                   
                      if (!response) {
                      toast.error("There was no Exists Testimonial")
                    }
                  
                   setTestimonials(response.data.data)  
                   
                //console.log(response.data)
                 
                } catch (error) {
                  console.log(error)
                }
               }

          fatchTestimonial();
        },[])



    const slider =  useRef();
    let tx = 0;
    const slideForward = ()=>{
        if(tx > -75){
            tx-=25;

        }
        slider.current.style.transform =`translateX(${tx}%)`;

    }
    const slideBackward = () =>{
        if(tx < 0){
            tx+=25;

        }
        slider.current.style.transform =`translateX(${tx}%)`;

    }

  return (
    <div className='testimonials'>
        <img src={next_icon} alt="" className='next-btn' onClick={slideForward} />
        <img src={back_icon} alt="" className='back-btn' onClick={slideBackward}/>
        <div className="slider">
            <ul ref={slider} >

            <div>
           
            </div>
            
               {testimonials.map((item, index) =>{
                return  <TestiSlide
                email={item.email}
                username={item.username}
                description={item.description}
                key={index}
                id= {item.id}
               
                />
               
               })}     
                  <li>
                <div className="slide">
                 <div className="user-info">
                    <img src={user_4} alt="" />
                    <div>
                        <h3>Roman Willam</h3>
                        <span>Edusity,India</span>
                    </div>
                    </div>
                        <p>Chossing to parsue my degree at Educity was one of
                            the best decision I've ever made. the supportive
                            comunity, state-of-the-art facilities, commitment
                            academic excellence hvae truely exceeded my
                            exeptations.
                        </p>
                    
                 
                </div>
                </li>
               <li>
               <div className="slide">
                 <div className="user-info">
                    <img src={user_3} alt="" />
                    <div>
                        <h3>Ayish Willam</h3>
                        <span>Edusity,India</span>
                    </div>
                    </div>
                        <p>Chossing to parsue my degree at Educity was one of
                            the best decision I've ever made. the supportive
                            comunity, state-of-the-art facilities, commitment
                            academic excellence hvae truely exceeded my
                            exeptations.
                        </p>
                    
                 
                </div>
               </li>
                <li>
                <div className="slide">
                 <div className="user-info">
                    <img src={user_4} alt="" />
                    <div>
                        <h3>Gainy Willam</h3>
                        <span>Edusity,India</span>
                    </div>
                    </div>
                        <p>Chossing to parsue my degree at Educity was one of
                            the best decision I've ever made. the supportive
                            comunity, state-of-the-art facilities, commitment
                            academic excellence hvae truely exceeded my
                            exeptations.
                        </p>
                    
                 
                </div>
                </li>
            
            
             
                
               
                </ul>
        </div>
      
    </div>
  )
}

export default TestiCard
