import React, { use } from 'react'
import { Box, Button, Typography } from '@mui/material';
import NavBar from '../components/NavBar';
import { Link } from 'react-router-dom';
export const Home = () => {

  return (
    <>
      <NavBar />
      <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4}}>
      <Typography variant='h1' style={{color: 'black', marginTop: '30px', marginBottom: '30px'}}>
        Welcome to Simply Lifts
      </Typography>
      <Typography variant='h4' style={{color: 'black', marginBottom: '30px'}}>
        Make tracking your workouts a simple and seamless process.
      </Typography>

      <Button sx={{mt: 3}} variant='contained'><Link style={{color: 'white', fontSize: 30}} to='/workouts'>Let's Lift</Link></Button>
      </Box>
    </>
  )
}
