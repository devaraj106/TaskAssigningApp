import React, { useEffect, useState } from 'react'
import { useNavigate, useParams,NavLink } from 'react-router-dom'
import Navbar from '../Components/navbar';
import '../Style.css'
function DashBoard() {
const[auth,setauth]=useState({authvalue:false,Logintxt:""})
let isactive = ({isActive})=> isActive ? 'box' : 'nav_links';
const{id}=useParams();
const navigate=useNavigate();
useEffect(()=>{
 if(id==1 || id==2)
 {
   setauth((prev)=>{
return({...prev,authvalue:true})
   });
   
   if(id==1){setauth((pre)=>{
   
    return({...pre,Logintxt:"Developer DashBoard"})
   })}
   else if(id==2){setauth((pre)=>{
    return({...pre,Logintxt:"Manager DashBoard"})
   })}

 }else{
    setauth((prev)=>{
        return({...prev,authvalue:false})
    })
 }
},[])

  return (
    <>
    {
        auth.authvalue?
    <div>
   <Navbar title={"Manager DashBoard"}></Navbar>


    </div>:
    navigate("/")
}
    </>
  )
}

export default DashBoard