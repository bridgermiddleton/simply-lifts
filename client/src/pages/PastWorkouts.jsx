import React, { useEffect, useState } from 'react'
import { Box, Card, CardActions, CardContent, Button, Typography } from '@mui/material'
import NavBar from '../components/NavBar'
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
export const PastWorkouts = () => {

    const navigate = useNavigate();
    const [pastWorkouts, setPastWorkouts] = useState([])
    useEffect(() => {
        fetch('/api/past-workouts', {
            credentials: 'include'
        })
        .then(response => response.json())
        .then(data => {
            setPastWorkouts(data["logs"])

        })
    }, [])

    const handleClick = (workout) => {
        navigate(`/past-workouts/${workout["log_id"]}`);
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
    <Typography sx={{color: 'black'}} variant='h3'>Past Workouts</Typography>
{pastWorkouts.map((workout, index) => (
        <Card key={index} sx={{minWidth: 275, mt: 5}}>
            <CardContent>
                <Typography>
                    {workout["name"]}
                </Typography>
                <Typography>
                    {workout["date"]}
                </Typography>
                
            </CardContent>
            <CardActions>
                <Button onClick={() => handleClick(workout)} size='small'>View Workout</Button>
            </CardActions>

        </Card>

    ))}
</Box>

    
    </>
  )
}
