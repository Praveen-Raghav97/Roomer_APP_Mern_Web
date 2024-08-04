import React from 'react'
import user_3 from '../../assets/users.png'
const TestiSlide = ({username , email , description}) => {
  return (
    <>
       <li>
                    

                    <div className="slide">
    
                     <div className="user-info">
                        <img src= {user_3} alt="" />
                        <div>
                            <h3>{username}</h3>
                            <span>{email}</span>
                        </div>
                        </div>
                            <p>
                                {description}
                            </p>
                        
                     
                    </div>
                    </li>
    </>
  )
}

export default TestiSlide
