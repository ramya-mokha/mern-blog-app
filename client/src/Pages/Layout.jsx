import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className='bg-gray-50 min-h-screen'>
    <Navbar/>
    <div className='max-w-500 mx-auto '>
      <Outlet/>
    </div>
      </div>
  )
}

export default Layout
