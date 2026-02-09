import React, { useEffect, useState } from 'react'
import { Box, Card, CardActions, CardContent, Button, Typography } from '@mui/material'
import NavBar from '../components/NavBar'
import { useNavigate } from 'react-router-dom'

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
  return (
    <>
    <NavBar />
<Box sx={{alignItems: 'center', mt: '60px'}}>
{workouts.map((workout, index) => (
        <Card sx={{minWidth: 275, mt: 5}}>
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
