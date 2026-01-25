import React, { useState } from 'react'
import { Box, Button, Container, TextField, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
export const Signup = () => {

  // Form data state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  // need this to navigate to other routes
  const navigate = useNavigate();


  // this tracks changes in the input fields.  essentially we get the name and value from event.targe.  when we set the form data
  // we use the spread operator to keep the state that didn't change and set the name that changed to the new value
  const handleFormChange = (event) => {
    const {name, value} = event.target;

    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };


  // handle form submission

  const handleSubmit = async (event) => {

    // this prevents the default behavior from happening.  when you submit a form in the browser, it typically wants to send an HTTP request and
    // reload the page.  this stops that so that we can write our own code to handle the submission
    event.preventDefault();
    try {

      // hit the server at the /api/register route
      const response = await fetch("/api/register", {

        // this is a POST request
        method: "POST",

        // specifiying that this will be json
        headers: {
          'Content-Type': 'application/json',
        },

        // jsonifying the form data to be sent to the server
        body: JSON.stringify(formData),
      });

      // if our post request didn't throw an error, then we check the response message and if it is success we navigate to the home page
      if (response.ok)
      {
        const result = await response.json();
        console.log(result)
        if (result.message == "success")
        {
          navigate('/home')
        }
      }

      // otherwise we return some error logging
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
