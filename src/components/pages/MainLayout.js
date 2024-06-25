import React from 'react'
import Navbar from '../inc/navbar'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
        <>
            <Navbar />
            <Outlet/>
        </>
  )
}

export default MainLayout