import React, { use } from 'react'
import { useAuth } from '../context/AuthContext';
import { Button } from '@mui/material';
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
    <div>
        <Button onClick={handleLogout} variant='contained' ></Button>
    </div>
  )
}
