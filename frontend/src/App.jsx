import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './Components/Navbar/Navbar'
import Hero from './Components/Hero/Hero'
import Title from './Components/Title/Title'
import About from './Components/About/About'
import Services from './Components/Services/Services'
import Testimonials from './Components/Testimonials/Testimonials'
import { BrowserRouter } from 'react-router-dom'
import Review from './Components/Review/Review'
import Footer from './Components/Footer/Footer'
import Cards from './Components/Cards/Cards'
import RecentCards from './Components/RecentCards/RecentCards'
import Rooms from './Components/Rooms/Rooms'



function App() {
  const [count, setCount] = useState(0)

  return (
    <>

    
  
     <Hero/>
   
     <div className='container'>
     <Navbar/>
     <RecentCards/>
     <Rooms/>
     <About/>
     <Services/>
  
     </div>
    
     <Testimonials/>
    
     <Review/>

     <Footer/>

  
    </>
  )
}

export default App
