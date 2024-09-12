import React from 'react'
import Navbar from '../inc/navbar'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <div className='main-container'>
        <Outlet />
      </div>
    </>
  )
}

export default MainLayout