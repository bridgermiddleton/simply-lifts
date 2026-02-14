import React, { useEffect, useState } from 'react'
import { Box, Card, CardActions, CardContent, Button, Typography } from '@mui/material'
import NavBar from '../components/NavBar'
import { useNavigate } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
export const Workouts = () => {
    const [workouts, setWorkouts] = useState([])
    const navigate = useNavigate();
    useEffect(() => {
        fetch('/api/workouts', {
            credentials: "include"
        })
        .then(response => response.json())
        .then(data => {
            setWorkouts(data["workouts"])
        })
    }, []);

    const handleClick = (event, workout) => {
        navigate(`/workouts/${workout[0]}/start`);
    }
    const handleBackClick = () => {
        navigate('/home')
    }
  return (
    <>
    <NavBar />
    <IconButton sx={{mt: 10}} onClick={handleBackClick}>
            <ArrowBackIcon/>
        </IconButton>
<Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', mt: '60px'}}>
    <Typography sx={{color: 'black'}} variant='h3'>Select Your Workout</Typography>
{workouts.map((workout, index) => (
        <Card key={index} sx={{minWidth: 275, mt: 5}}>
            <CardContent>
                <Typography>
                    {workout[2]}
                </Typography>
            </CardContent>
            <CardActions>
                <Button onClick={(event) => handleClick(event, workout)}>Start</Button>
            </CardActions>

        </Card>

    ))}
</Box>

    
    </>
  )
}
