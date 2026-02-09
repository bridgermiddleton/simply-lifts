
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import { Login } from './pages/Login'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Signup } from './pages/Signup'
import { Home } from './pages/Home'
import ProtectedRoutes from './utils/ProtectedRoutes'
import { CreateWorkout } from './pages/CreateWorkout'
import { Workouts } from './pages/Workouts'
import { WorkoutSession } from './pages/WorkoutSession';
import { PastWorkouts } from './pages/PastWorkouts';


function App() {


  return (
   <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/signup" element={<Signup/>}/>
      <Route element={<ProtectedRoutes/>}>
      <Route path='/home' element={<Home />}/>
      <Route path='/create' element={<CreateWorkout />}/>
      <Route path='/workouts' element={<Workouts />}/>
      <Route path='/workouts/:workoutId/start' element={<WorkoutSession/>}/>
      <Route path='/past-workouts' element={<PastWorkouts/>}/>
      </Route>
   </Routes>
  )
}

export default App
