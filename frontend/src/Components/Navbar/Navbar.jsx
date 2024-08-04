import React, { useEffect, useState } from 'react'
import './Navbar.css'
import { Link } from 'react-scroll'
import Menu from '../../assets/menu-icon.png'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

  const navigate = useNavigate();

  const goToDashboard = () => {
    navigate('/dashboard');
  };
  const goToCardList = () => {
    navigate('/cardlist');
  };

  const goToHome = () => {
    navigate('/');
  };
  const[sticky,setSticky] = useState(false);
  useEffect( ()=>{
    window.addEventListener('scroll', ()=>{
      window.scrollY > 700 ?setSticky(true) :setSticky(false);
    })
  })

  const [mobileMenu,setMobileMenu] = useState(false);
  const toggleMenu = () =>{
    mobileMenu ? setMobileMenu (false) : setMobileMenu(true);
  }

  return (
    <nav className={`container  ${sticky?  'dark-nav' : ''}`}>
      <h1>Rommer</h1>
      <ul className={mobileMenu?'':'hide-mobile-menu'}>
        <li onClick={goToHome}>Home</li>
        <li><Link to='recentCards' smooth ={true} offset ={-70} duration={500} >Property</Link></li>
       
        <li><Link to='about' smooth ={true} offset ={-50} duration={500} >About us</Link></li>
        <li><Link to='services' smooth ={true} offset ={-80} duration={500} >Services</Link></li>
        <li><Link to='testimonials' smooth ={true} offset ={-260} duration={500} >Testimonials</Link></li>
        <li><Link to='/'  ><button onClick={goToDashboard} className='btn'>Dashboard</button></Link></li>
        
        
      </ul>

      <img src={Menu} alt="Rommer" className='menu-icon' onClick={toggleMenu} />
    </nav>
  )
}

export default Navbar
