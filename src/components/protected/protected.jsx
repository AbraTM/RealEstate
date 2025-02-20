import React from 'react'
import { useAuth } from '../../../context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'

export default function Protected() {
  const { isLoggedIn } = useAuth()  
  
  React.useEffect(() => {
    if(!isLoggedIn){
      alert("Please register or login first.")
    }
  }, [isLoggedIn])
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace/>
}
