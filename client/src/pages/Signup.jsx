import React, { useState } from 'react'
import { Box, Button, Container, TextField, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
export const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleFormChange = (event) => {
    const {name, value} = event.target;

    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok)
      {
        const result = await response.json();
        console.log(result)
        if (result.message == "success")
        {
          navigate('/home')
        }
      }
      else{
        console.error('Submission failed', response.statusText);
      }
    } catch (error){
      console.error('Error submitting form:', error)
    }
  }
  return (
    <Container maxWidth='lg'>
    <Box sx={{
        display:'flex',
        flexDirection: 'column',
        width: '100%',
        margin: 'auto'
    }} component="form" onSubmit={handleSubmit}>
        <Typography variant='h4' sx={{color: 'black', mb:3}}>Sign Up</Typography>
            <TextField name='name' value={formData.name} onChange={handleFormChange} margin='normal' variant='standard' required label='Name'/>

            <TextField name='email' value={formData.email} onChange={handleFormChange} margin='normal' variant='standard' required label='Email'/>

            <TextField name='password' value={formData.password} onChange={handleFormChange} margin='normal' variant='standard' label='Password' type='password' required/>

            <Button type='submit' sx={{m: 2}} variant='contained'>Sign Up</Button>
    </Box>
    <p style={{color: 'black'}}>Already registered?  Login <Link to="/">here</Link></p>
</Container>
  )
}
