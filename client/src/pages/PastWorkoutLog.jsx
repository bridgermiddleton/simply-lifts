import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Box, Button, Typography, TextField } from '@mui/material'
import NavBar from '../components/NavBar'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';

export const PastWorkoutLog = () => {
    const navigate = useNavigate();
    const {logId} = useParams();
    const [workoutName, setWorkoutName] = useState("");
    const [date, setDate] = useState("");
    const [workoutExercises, setWorkoutExercises] = useState([])
    useEffect(() => {
        fetch(`/api/past-workouts/${logId}`, {
            credentials: 'include'
        })
        .then(response => response.json())
        .then(data => {
            setWorkoutName(data["workout_name"])
            setDate(data["date"]);
            setWorkoutExercises(data["workout_exercises"])

        })
    }, [])

    const handleClick = () => {
        navigate('/home');
    }
  return (
<>
    <NavBar />
    <Box sx={{alignItems: 'center', mt: 10}}>
        <IconButton onClick={handleClick}>
            <ArrowBackIcon/>
        </IconButton>
        <Typography sx={{color:'black', fontSize: '50px', textAlign:'center'}}>{workoutName}</Typography>
        <Typography sx={{color:'black', fontSize: '30px', textAlign:'center', mt: 3}}>Date: {date}</Typography>
    </Box>
        <Box sx={{
            display:'flex',
            flexDirection: 'column',
            width: '50%',
            margin: 'auto'
        }}>
    {workoutExercises.map((exercise, index) => (
        <Box key={index} sx={{
            display:'flex',
            flexDirection: 'column',
            width: '50%',
            margin: 'auto',
            alignItems: 'center',
            mt: 3
        }}>

            <Typography variant='h6' sx={{mr:'10px', color: 'black', mb: 1, mt: 2}}>{exercise["exercise_name"]}: {exercise["sets"]} x {exercise["reps"]}</Typography>
            {exercise['logs'].map((log, setIdx) => (
                <div key={setIdx} style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <Typography sx={{color: 'black',mb: 2, mr: 2}}>Set {log["setNumber"]} : {log["weight"]} lb for {log["reps"]} reps</Typography>
                </div>
            ))}
        </Box>

    ))}

    </Box>
    </>
  )
}
