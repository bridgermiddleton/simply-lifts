import React from 'react'
import { Box, Button, Container, TextField, Typography } from '@mui/material'
export const Login = () => {

  return (
    <Container maxWidth='lg'>
        <Box sx={{
            display:'flex',
            flexDirection: 'column',
            width: '100%',
            margin: 'auto'
        }} component="form">
            <Typography variant='h4' sx={{color: 'black', mb:3}}>Login</Typography>

                <TextField margin='normal' variant='standard' required label='Email'/>

                <TextField margin='normal' variant='standard' label='Password' type='password' required/>

                <Button sx={{m: 2}} variant='contained'>Login</Button>
        </Box>
        <p style={{color: 'black'}}>Not registered?  Sign up <a href="/signup">here</a></p>
    </Container>
  )
}
