import React, { useEffect, useState } from 'react'
import './DashNav.css'
import { Link } from 'react-scroll'
import Menu from '../../assets/menu-icon.png'
import { useNavigate } from 'react-router-dom'

const DashNav = () => {

  const navigate = useNavigate();

  const goToHome = () => {
    navigate('/');
  };
  const goToLogin = () => {
    navigate('/adminLogin');
  };
  const goToAddProdcut = () => {
    navigate('/addProduct');
  };
  const goToMessages = () => {
    navigate('/messages');
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
        <li><Link to='addProduct' smooth ={true} offset ={-55} duration={500} >Add</Link></li>
        <li><Link to='addProduct' smooth ={true} offset ={-60} duration={500} >Listing</Link></li>
        <li onClick={goToMessages}><Link to='message' smooth ={true} offset ={-60} duration={500} >Messages</Link></li>
        <li><Link to='add-list' smooth ={true} offset ={-60} duration={500} >Properties</Link></li>
        <li><Link to='/'  ><button onClick={goToLogin} className='btn'>Login</button></Link></li>
        
        
      </ul>

      <img src={Menu} alt="Rommer" className='menu-icon' onClick={toggleMenu} />
    </nav>
  )
}

export default DashNav
