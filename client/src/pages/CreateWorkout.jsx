import React, { useState } from 'react'
import NavBar from '../components/NavBar'
import { Box, Typography, TextField, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom';

export const CreateWorkout = () => {

    const [exerciseArray, setExerciseArray] = useState([{}]);
    const [workoutName, setWorkoutName] = useState("");

    const navigate = useNavigate();
    const handleNameChange = (event) => {
        setWorkoutName(event.target.value);
    }
    const handleAddAnother = () => {

        const newArray = [...exerciseArray]
        const newExercise = {"name": "", "sets": 3, "reps": 10};
        newArray.push(newExercise);
        setExerciseArray(newArray);
        
    }

    const handleExerciseChange = (event, index) => {
        const {name, value} = event.target;
        const newArray = [...exerciseArray]
        newArray[index][name] = value
        setExerciseArray(newArray);

    }

    const handleSubmit = async (event) => {

        // this prevents the default behavior from happening.  when you submit a form in the browser, it typically wants to send an HTTP request and
        // reload the page.  this stops that so that we can write our own code to handle the submission
        event.preventDefault();
        const data = {"name": workoutName, "exerciseArray": exerciseArray}
        try {
    
          // hit the server at the /api/register route
          const response = await fetch("/api/create-workout", {
    
            // this is a POST request
            method: "POST",
    
            // specifiying that this will be json
            headers: {
              'Content-Type': 'application/json',
            },
    
            // jsonifying the form data to be sent to the server
            body: JSON.stringify(data),
          });
    
          // if our post request didn't throw an error, then we check the response message and if it is success we navigate to the home page
          if (response.ok)
          {
            const result = await response.json();
            console.log(result)
            if (result.message == "success")
            {
              navigate('/home');
            }
          }
    
          // otherwise we return some error logging
          else{
            console.error('Submission failed', response.statusText);
          }
        } catch (error){
          console.error('Error submitting workout:', error)
        }
      }
  return (
    <>
    <NavBar />
    <Box sx={{alignItems: 'center', mt: '20px'}}>
        <Typography sx={{color:'black', fontSize: '50px', textAlign:'center'}}>Create a Workout</Typography>
    </Box>
        <Box sx={{
            display:'flex',
            flexDirection: 'column',
            width: '50%',
            margin: 'auto'
        }} component="form" onSubmit={handleSubmit}>
    <TextField onChange={(event) => handleNameChange(event)} sx={{mr:'10px'}} name='workoutName' margin='normal' variant='standard' required label='Workout Name'/>
    {exerciseArray.map((exercise, index) => (
        <Box sx={{
            display:'flex',
            flexDirection: 'row',
            width: '50%',
            margin: 'auto'
        }}>

            <TextField onChange={(event) => handleExerciseChange(event, index)} sx={{mr:'10px'}} name='exerciseName' margin='normal' variant='standard' required label='Exercise Name'/>

            <TextField onChange={(event) => handleExerciseChange(event, index)} sx={{mr:'10px'}}  name='sets' margin='normal' variant='standard' label='Number of Sets' type='number' required/>

            <TextField onChange={(event) => handleExerciseChange(event, index)} sx={{mr:'10px'}}  name='reps' margin='normal' variant='standard' label='Number of Reps' type='number' required/>

        </Box>

    ))}
        
    <Button onClick={handleAddAnother} sx={{m: 2}} variant='contained'>Add Another</Button>

    <Button sx={{m: 2}} variant='contained' type='submit'>Create</Button>

    </Box>
    </>
  )
}
