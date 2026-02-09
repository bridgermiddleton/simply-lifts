import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import NavBar from '../components/NavBar';
import { Box, Card, CardActions, CardContent, Button, Typography, TextField } from '@mui/material'
import { useNavigate } from 'react-router-dom';
export const WorkoutSession = () => {

    const {workoutId} = useParams();
    const [exercises, setExercises] = useState([]);
    const [workoutName, setWorkoutName] = useState("")
    const [logData, setLogData] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
    fetch(`/api/workouts/${workoutId}`, {
        credentials: 'include'
    })
    .then(response => response.json())
    .then(data => {
        setWorkoutName(data["workout_name"]);
        setExercises(data["exercises"]);
        console.log(data);
        const exerciseArray = []
        for (let i = 0; i < data["exercises"].length; i++)
        {
            const exercise = data['exercises'][i]
            console.log(exercise)
            const exerciseLog = {"exerciseId": exercise["exercise_id"], "sets": []};
            for (let j = 0; j < exercise["sets"]; j++)
            {
                exerciseLog["sets"].push({"setNumber": j+1, "weight": 0, "reps": 0});
            }
            exerciseArray.push(exerciseLog);
        }
        setLogData(exerciseArray);
        

    })
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try
        {
            const response = await fetch('/api/log-workout', {
                credentials: 'include',
    
                method: "POST",
    
                headers: {
                    'Content-Type': 'application/json',
                },
    
                body: JSON.stringify({"workoutId": workoutId, "logData": logData}),
            });
    
            if (response.ok)
            {
                const result = await response.json();
                console.log(result);
                if (result.message == "success")
                {
                    navigate('/home')
                }
    
            }
            else{
                console.error("submission failed", response.statusText);
            }

        } catch (error)
        {
            console.error('error submitting workout:', error)
        }

    }

    const handleChange = (event, index, setIdx) => {
        const {name, value} = event.target
        console.log('logData', logData)
        const newArray = [...logData]
        console.log('new array before', newArray)
        const setsArray = newArray[index]["sets"]
        setsArray[setIdx][name] = value
        console.log(newArray)
        setLogData(newArray)
    }

  return (
 <>
    <NavBar />
    <Box sx={{alignItems: 'center', mt: 3}}>
        <Typography sx={{color:'black', fontSize: '50px', textAlign:'center'}}>{workoutName}</Typography>
    </Box>
        <Box sx={{
            display:'flex',
            flexDirection: 'column',
            width: '50%',
            margin: 'auto'
        }}
        component='form'
        onSubmit={handleSubmit}>
    {exercises.map((exercise, index) => (
        <Box key={exercise.id} sx={{
            display:'flex',
            flexDirection: 'column',
            width: '50%',
            margin: 'auto'
        }}>

            <Typography variant='h6' sx={{mr:'10px', color: 'black', mb: 1, mt: 2}}>{exercise["name"]}: {exercise["sets"]} x {exercise["reps"]}</Typography>
            {Array(exercise["sets"]).fill().map((_, setIdx) => (
                <div key={setIdx} style={{display: 'flex', flexDirection: 'row'}}>

                <TextField onChange={(event) => handleChange(event, index, setIdx)} name='weight' sx={{mb: 2, mr: 2}} label={`Set ${setIdx + 1} weight`} placeholder='enter weight'></TextField>
                <TextField onChange={(event) => handleChange(event, index, setIdx)} name='reps' sx={{mb: 2}} label="Reps" placeholder='enter reps completed'></TextField>
                </div>
            ))}
        </Box>

    ))}
        

    <Button sx={{m: 2}} variant='contained' type='submit' color='success'>Finish Workout</Button>

    </Box>
    </>
    
  )
}
