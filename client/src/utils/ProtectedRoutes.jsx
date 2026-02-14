import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

import React from 'react'

export const ProtectedRoutes = () => {
    const { user } = useAuth();
  return user ? <Outlet /> : <Navigate to='/'/>
}

export default ProtectedRoutes
