import React, { use } from 'react'
import { useAuth } from '../context/AuthContext';
import { Button } from '@mui/material';
import NavBar from '../components/NavBar';
export const Home = () => {
  const { logout } = useAuth();


  const handleLogout = async (event) => {
    event.preventDefault();
    try
    {
      await logout();
    }
    catch (error)
    {
      console.error('Error logging out')
    }


  }
  return (
    <>
      <NavBar />
        {/* <Button onClick={handleLogout} variant='contained' ></Button> */}
    </>
  )
}
