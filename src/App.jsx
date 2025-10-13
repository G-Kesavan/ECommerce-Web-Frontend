import React from 'react'
import './app.css'
import Header from './Components/Layout/Header'
import Footer from './Components/Layout/Footer'
import Home from './Components/Home'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import ProductDetials from './Components/Products/ProductDetails'
import { ToastContainer } from 'react-toastify'
import SearchProduct from './Components/Products/SearchProduct'

const App = () => {
  return (
  <Router>
    <div>
      <HelmetProvider>
        <Header/>
        <ToastContainer theme='dark'/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/product/:id' element={<ProductDetials/>}/>
          <Route path='/search/:keyword' element={<SearchProduct/>}/>
        </Routes>
        <Footer/>
      </HelmetProvider>
    </div>
  </Router>
  )
}

export default App