import React from 'react'
import Collection from './pages/Collection'
import { Route,Routes } from 'react-router-dom'
import About from './pages/About'
import Orders from './pages/Orders'
import PlaceOrder from './pages/PlaceOrder'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import Cart from './pages/Cart' 
import Login from './pages/login'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import Product from './pages/Product'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Contact from './pages/Contact'
import Verify from './pages/Verify'
const App = () => {
  return (
    <div className='px-4 sm:px-[5vm] md:px-[7vm] lg:px-[9vm]'>
      <ToastContainer/>
      <NavBar/>
      <SearchBar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/collection' element={<Collection/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/product/:productId' element={<Product/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/orders' element={<Orders/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/place-order' element={<PlaceOrder/>}/>
        <Route path='/verify' element={<Verify/>}/>
        
      </Routes>
      <Footer/>
  
      
    </div>
  )
}

export default App
