import React, { useState } from 'react'
import NavBar from '../components/NavBar'
import { Box, Typography, TextField, Button, Divider } from '@mui/material'
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

    const handleRemoveExercise = (index) => {
        console.log("before",exerciseArray)
        console.log("index", index);
        const newArray = exerciseArray.filter((item, idx) => idx != index);
        console.log("after",newArray);
        setExerciseArray(newArray);
    }

    const handleExerciseChange = (event, index) => {
        const {name, value} = event.target
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
    <Box sx={{alignItems: 'center', mt: '100px'}}>
        <Typography sx={{color:'black', fontSize: '50px', textAlign:'center'}}>Create a Workout</Typography>
    </Box>
        <Box sx={{
            display:'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '50%',
            margin: 'auto'
        }} component="form" onSubmit={handleSubmit}>
    <TextField onChange={(event) => handleNameChange(event)} sx={{mr:'10px', mb: 10}} name='workoutName' margin='normal' variant='standard' required label='Workout Name'/>
    <Typography sx={{color: 'black'}} variant='h4'>Exercises</Typography>
    {exerciseArray.map((exercise, index) => (
        <div key={index} style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Divider sx={{mt: 3, borderColor: 'black', color: 'black'}}>Exercise {index + 1}</Divider>
            <TextField onChange={(event) => handleExerciseChange(event, index)} name='exerciseName' margin='normal' variant='standard' required label='Exercise Name'/>

            <TextField onChange={(event) => handleExerciseChange(event, index)} name='sets' margin='normal' variant='standard' label='Number of Sets' type='number' required/>

            <TextField onChange={(event) => handleExerciseChange(event, index)}  name='reps' margin='normal' variant='standard' label='Number of Reps' type='number' required/>
            {exerciseArray.length > 1 &&
            <Button onClick={() => handleRemoveExercise(index)} sx={{mt: 4, width: '50%'}} variant='contained' color='error'>Remove</Button>}
        </div>

    ))}
        
    <Button onClick={handleAddAnother} sx={{mt: 4}} variant='contained'>Add Another</Button>

    <Button sx={{mt: 4}} variant='contained' type='submit' color='success'>Create</Button>

    </Box>
    </>
  )
}
