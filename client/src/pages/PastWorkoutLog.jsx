import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

export const PastWorkoutLog = () => {

    const {logId} = useParams();
    useEffect(() => {
        fetch(`/api/past-workouts/${logId}`)
    })
  return (
    <div>PastWorkoutLog</div>
  )
}
