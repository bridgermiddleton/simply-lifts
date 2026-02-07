import React, { use } from 'react'
import { Button, Typography } from '@mui/material';
import NavBar from '../components/NavBar';
export const Home = () => {

  return (
    <>
      <NavBar />
      <Typography variant='h1'>
        Welcome to Simply Lifts
      </Typography>
      <Typography variant='h3' style={{color: 'black'}}>
        Make tracking your workouts a simple and seamless process.  No fluff, no AI, just you and your lifts.
      </Typography>

    </>
  )
}
