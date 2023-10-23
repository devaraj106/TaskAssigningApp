import React, { useContext, useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from '../Context/context'

function ProtectedRoutes() { 
  var User=localStorage.getItem('User');

useEffect(()=>{
  console.log('in protected routes')
},[])

  return (
    <>
 {
    User!=null && User!=''?<Outlet></Outlet>:<Navigate to="/"></Navigate>
 }
 </>
  )
  
}

export default ProtectedRoutes