import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Config from '../config';
import "../Style.css"

function SignUp() {
  const[userDetails,setUserDetails]=useState({firstName:"",lastName:"",age:"",roleId:"0",country:"0",email:"",password:""});
  const[flag,setflag]=useState({firstName:false,lastName:false,age:false,roleId:false,country:false,email:false,password:false});

useEffect(()=>{
  localStorage.clear();
},[])

  const navigate=useNavigate();

const handlebindvalues=(e)=>{
  setUserDetails((prev)=>{
    return({...prev,[e.target.name]:e.target.value})
  })
}

const handlesaveuser=(e)=>{
  console.log(userDetails)
var flg=1;
 if(userDetails.firstName=="" || userDetails.lastName=="" || userDetails.email=="" || userDetails.password=="" || userDetails.country=="0" || userDetails.roleId=="0" || userDetails.age=="" )
 {
  flg=0;
 if(userDetails.firstName==""){setflag((pre)=>{return({...pre,firstName:true})})}else{setflag((pre)=>{return({...pre,firstName:false})})}
 if(userDetails.lastName==""){setflag((pre)=>{return({...pre,lastName:true})})}else{setflag((pre)=>{return({...pre,lastName:false})})}
 if(userDetails.email==""){setflag((pre)=>{return({...pre,email:true})})}else{setflag((pre)=>{return({...pre,email:false})})}
 if(userDetails.password==""){setflag((pre)=>{return({...pre,password:true})})}else{setflag((pre)=>{return({...pre,password:false})})}
 if(userDetails.country=="0"){setflag((pre)=>{return({...pre,country:true})})}else{setflag((pre)=>{return({...pre,country:false})})}
 if(userDetails.roleId=="0"){setflag((pre)=>{return({...pre,roleId:true})})}else{setflag((pre)=>{return({...pre,roleId:false})})}
 if(userDetails.age==""){setflag((pre)=>{return({...pre,age:true})})}else{setflag((pre)=>{return({...pre,age:false})})}

 }else{
  flg=1;
  setflag({firstName:false,lastName:false,age:false,roleId:false,country:false,email:false,password:false});
 }

 if(flg==1)
 {
  
  axios.post(Config.Url+"users",userDetails)
  .then(function({data}){
   if(data.responseCode=="200")
   {
    alert(data.responseMessage);
   }else{
    alert(data.responseMessage);
   }
   
  }).catch(function(err){
    alert(err);
    console.log(err);
  })
  .finally(function(){
    navigate("/")
  })
 }


}


  return (
    <div className='container login_Container '>
      <div className='login_div'>
      <h1 id='signup_txt'>Signup</h1>
  <div className="htmlForm-group margin_space_textboxes">
    <label htmlFor="exampleInputEmail1">Email address</label>
    <input type="email" className={"form-control "+(flag.email?"error_div":"")}  name='email' value={userDetails.email} onChange={handlebindvalues} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
   
  </div>
  <div className="htmlForm-group margin_space_textboxes">
    <label htmlFor="exampleInputPassword1">Password</label>
    <input type="password"  className={"form-control "+(flag.password?"error_div":"")} value={userDetails.password} onChange={handlebindvalues} id="exampleInputPassword1" name='password' placeholder="Password"/>
  </div>
  <div className="htmlForm-group margin_space_textboxes">
    <label htmlFor="exampleInputPassword1">First Name</label>
    <input type="text" className={"form-control "+(flag.firstName?"error_div":"")} value={userDetails.firstName} onChange={handlebindvalues} id="exampleInputPassword1" name='firstName' placeholder="First Name"/>
  </div>
  <div className="htmlForm-group margin_space_textboxes">
    <label htmlFor="exampleInputPassword1">Last Name</label>
    <input type="text" className={"form-control "+(flag.lastName?"error_div":"")} value={userDetails.lastName} onChange={handlebindvalues} id="exampleInputPassword1" name='lastName' placeholder="Last Name"/>
  </div>
  <div className="htmlForm-group margin_space_textboxes">
  <label htmlFor="exampleInputPassword1">Country</label>
    <select className={"form-control "+(flag.country?"error_div":"")} value={userDetails.country} onChange={handlebindvalues}  name='country'>
    <option value="0" selected>select</option>
        <option value="1">India</option>
        <option value="2">China</option>
        
    </select>
  </div>
  <div className="htmlForm-group margin_space_textboxes">
    <label htmlFor="exampleInputPassword1">Age</label>
    <input type="number" className={"form-control "+(flag.age?"error_div":"")} onChange={handlebindvalues} value={userDetails.age} name='age' id="exampleInputPassword1" placeholder="Age"/>
  </div>

  <div className="htmlForm-group margin_space_textboxes">
  <label htmlFor="exampleInputPassword1">Designation</label>
    <select className={"form-control "+(flag.roleId?"error_div":"")} value={userDetails.roleId} onChange={handlebindvalues}  name='roleId'>
    <option value="0" selected>select</option>
        <option value="1">Manager</option>
        <option value="2">Developer</option>
        
    </select>
  </div>

  {/* <div className="htmlForm-group margin_space_textboxes">
    <label htmlFor="exampleInputPassword1">Role</label>
    <select className='htmlForm-select'>
    <option value="1">Manager</option>
        <option value="2">Developer</option>
        
    </select>
  </div> */}
  
  <div className='submit_div'>
  <button type="submit" onClick={handlesaveuser} className="btn btn-primary mx-3">Sign Up</button>
  <button type="submit" onClick={()=>{navigate("/")}} className="btn btn-primary">Back</button>
  </div>
  </div>
    </div>
  )
}

export default SignUp