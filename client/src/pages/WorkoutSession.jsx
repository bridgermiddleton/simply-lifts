import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import NavBar from '../components/NavBar';
import { Box, Button, Typography, TextField } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
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
        const exerciseArray = []
        for (let i = 0; i < data["exercises"].length; i++)
        {
            const exercise = data['exercises'][i]
            const exerciseLog = {"exerciseId": exercise["exercise_id"], "sets": []};
            if (exercise['logs'].length == 0)
            {
                for (let j = 0; j < exercise["sets"]; j++)
                    {
                        exerciseLog["sets"].push({"setNumber": j+1, "weight": 0, "reps": 0});
                    }
            }
            else
            {
                exerciseLog["sets"] = exercise["logs"]
            }

            exerciseArray.push(exerciseLog);
        }
        setLogData(exerciseArray);
        

    })
    }, []);
    const handleClick = (workout) => {
        navigate('/home');
    }

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
        const newArray = [...logData]
        const setsArray = newArray[index]["sets"]
        setsArray[setIdx][name] = value
        setLogData(newArray)
    }

  return (
 <>
    <NavBar />
    <Box sx={{alignItems: 'center', mt: 7}}>
    <IconButton onClick={handleClick}>
            <ArrowBackIcon/>
        </IconButton>
        <Typography sx={{color:'black', fontSize: '50px', textAlign:'center'}}>{workoutName}</Typography>
    </Box>
        <Box sx={{
            display:'flex',
            flexDirection: 'column',
            width: '50%',
            margin: 'auto',
            alignItems: 'center'
        }}
        component='form'
        onSubmit={handleSubmit}>
    {exercises.map((exercise, index) => (
        <Box key={index} sx={{
            display:'flex',
            flexDirection: 'column',
            width: '50%',
            margin: 'auto'
        }}>

            <Typography variant='h6' sx={{mr:'10px', color: 'black', mb: 1, mt: 2}}>{exercise["name"]}: {exercise["sets"]} x {exercise["reps"]}</Typography>
            {logData[index].sets.map((log, setIdx) => (
                <div key={setIdx} style={{display: 'flex', flexDirection: 'row'}}>

                <TextField onChange={(event) => handleChange(event, index, setIdx)} name='weight' sx={{mb: 2, mr: 2}} label='Weight' placeholder={`${log.weight}`}></TextField>
                <TextField onChange={(event) => handleChange(event, index, setIdx)} name='reps' sx={{mb: 2}} label="Reps" placeholder={`${log.reps}`}></TextField>
                </div>
            ))}
        </Box>

    ))}
        

    <Button sx={{m: 2}} variant='contained' type='submit' color='success'>Finish Workout</Button>

    </Box>
    </>
    
  )
}
