import React from 'react'
import './app.css'
import Header from './Components/Layout/Header'
import Footer from './Components/Layout/Footer'
import Home from './Components/Home'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'

const App = () => {
  return (
  <Router>
    <div>
      <HelmetProvider>
        <Header/>
        <Routes>
          <Route path='/' element={<Home/>}/>
        </Routes>
        <Footer/>
      </HelmetProvider>
    </div>
  </Router>
  )
}

export default App