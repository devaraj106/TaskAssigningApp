import React, { useContext, useEffect, useState } from 'react'
import { json, Navigate, NavLink, useNavigate, useParams } from 'react-router-dom'
import { UserContext } from '../Context/context';
import axios from 'axios';
import "../Style.css"
import Config from '../config';



function LogIn() {
  const{id}=useParams();
let navigate = useNavigate();
const[auth,setauth]=useState({authvalue:true,Logintxt:""});
 const[saveuser,setsaveuser]=useState({email:"",password:""});
 const[flag,setflag]=useState({email:false,password:false})

 useEffect(()=>{
localStorage.clear();
 },[])

const handlesetDate=(e)=>{
  setsaveuser((prev)=>{
  return({...prev,[e.target.name]:e.target.value})
  })
}
const handlesubmit=(e)=>{
if((saveuser.email==='' || saveuser.password===''))
{
  console.log('innn')
  if(saveuser.email===''){setflag((prev)=>{return({...prev,email:true})})}else{console.log("in else"); setflag((prev)=>{return({...prev,email:false})})}
  if(saveuser.password===''){setflag((prev)=>{return({...prev,password:true})})}else{setflag((prev)=>{return({...prev,password:false})})}
}else{setflag(()=>{return({email:false,password:false})})}

if(saveuser.email!=='' && saveuser.password!==''){
var data={};
   axios.post(Config.Url+'users/userlogin',saveuser)
  .then(function ({data}) {
     data=data;
     if(data.responseCode==="200")
     {
      var userData={token:data.token,username:data.Users.firstName+" "+data.Users.lastName,identifier:data.Users.identifier,roleId:data.Users.roleId}
   localStorage.setItem("User",JSON.stringify(userData));
       navigate("/dashboard/home")
     }else{
       alert(data.responseMessage);
       localStorage.clear();
       navigate("/")
     }
  
  })
  .catch(function (error) {
    alert(error);
    localStorage.clear();
    navigate("/")
  
  }
    
    );


  

}else{
}
  

}

                       
    return (

 <>
 {
  auth.authvalue?
      <div className='container login_Container '>
        <div className='login_div'>
          <h1 id='login_txt'>Log in</h1>
    <div className="form-group">
      <label htmlFor="exampleInputEmail1">Email address</label>
      <input type="email" className={"form-control " + (flag.email?"error_div":"")} onChange={handlesetDate} id="email" name='email'  aria-describedby="emailHelp" placeholder="Enter email"/>
     
    </div>
    <div className="form-group my-2">
      <label htmlFor="exampleInputPassword1">Password</label>
      <input type="password" className={"form-control " + (flag.password?"error_div":"")} onChange={handlesetDate} id="password" name='password' placeholder="Password"/>
    </div>
    <span>New User?</span><span className='mx-2'><NavLink to="/signup">SignUp</NavLink></span>
    
    <div className='submit_div'>
    <button type="submit" onClick={handlesubmit}  className="btn btn-primary login_btn">Log In</button>
    </div>
    </div>
      </div>:navigate("/")
}
 </>
 

    )
  
}

export default LogIn