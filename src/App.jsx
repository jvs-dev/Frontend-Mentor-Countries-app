import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, createBrowserRouter } from "react-router-dom";
import Home from './pages/Home/Home';
import Country from './pages/Country/Country';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/country/:id' element={<Country />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App