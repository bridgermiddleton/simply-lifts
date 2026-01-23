import React from 'react'
import { Box, Button, Container, TextField, Typography } from '@mui/material'
export const LoginSignUp = () => {

  return (
    <Container>
        <Box sx={{
            display:'flex',
            flexDirection: 'column',
            width: '100%'
        }} component="form">
            <Typography variant='h4' sx={{color: 'black', mb:3}}>Login</Typography>
                <TextField margin='normal' variant='standard' required label='Name'/>

                <TextField margin='normal' variant='standard' required label='Email'/>

                <TextField margin='normal' variant='standard' label='Password' type='password' required/>

                <Button sx={{m: 2}} variant='contained'>Login</Button>


        </Box>
    </Container>
  )
}
