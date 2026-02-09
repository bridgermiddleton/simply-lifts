import React, { useEffect, useState } from 'react'
import { Box, Card, CardActions, CardContent, Button, Typography } from '@mui/material'
import NavBar from '../components/NavBar'
export const PastWorkouts = () => {

    const [pastWorkouts, setPastWorkouts] = useState([])
    useEffect(() => {
        fetch('/api/past-workouts', {
            credentials: 'include'
        })
        .then(response => response.json())
        .then(data => {
            setPastWorkouts(data["logs"])

        })
    })
  return (
    <>
    <NavBar />
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

        </Card>

    ))}
</Box>

    
    </>
  )
}
