import React, {useState} from 'react'
import { Box, Button, Container, formLabelClasses, TextField, Typography } from '@mui/material'
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
export const Login = () => {

    const { login } = useAuth();
    // Form data state
    const [formData, setFormData] = useState({
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


    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        console.log("almost there")
         await login(formData.email, formData.password);
      }
      catch (error)
      {
        console.error('Error logging in', error);
      }
    }
  return (
    <Container maxWidth='lg'>
        <Box sx={{
            display:'flex',
            flexDirection: 'column',
            width: '100%',
            margin: 'auto'
        }} component="form">
            <Typography variant='h4' sx={{color: 'black', mb:3}}>Login</Typography>

                <TextField onChange={handleFormChange} margin='normal' variant='standard' required label='Email'/>

                <TextField onChange={handleFormChange} margin='normal' variant='standard' label='Password' type='password' required/>

                <Button onSubmit={handleSubmit} type='submit' sx={{m: 2}} variant='contained'>Login</Button>
        </Box>
        <p style={{color: 'black'}}>Not registered?  Sign up <a href="/signup">here</a></p>
    </Container>
  )
}
