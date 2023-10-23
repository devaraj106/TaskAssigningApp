import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams,NavLink } from 'react-router-dom'
import { UserContext } from '../Context/context';
import logo from '../Images/logo.png'
import '../Style.css'

function Navbar() {
  const{User,setUser}=useContext(UserContext);
var navigate=useNavigate();

  useEffect(()=>{
 var userloc=localStorage.getItem('User');
 userloc?setUser(JSON.parse(userloc)):setUser(null)
  },[])

  // useEffect(()=>{
  //   var userloc=localStorage.getItem('User');
  //   userloc?setUser(JSON.parse(userloc)):setUser(null)
  // },[User])

  const handlelogout=()=>{
    localStorage.clear()
    navigate("/")
  }

    let isactive = ({isActive})=> isActive ? 'nav_links' : 'default';
  return (
    <>
    
    
    <nav className="navbar navbar-expand-lg navbar-light bgcolor_nav">
      <img className='mx-3' src={logo} style={{width:"108px"}} alt='no image'></img>
<h5 className="navbar-brand" href="#" style={{marginLeft:"415px"}}>{User && User.roleId==1?"Manager DashBoard" : "Developer DashBoard"}</h5>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav" style={{marginLeft:"40px",marginBottom:"7px"}}>
      <li className="nav-item active">
        
      </li>
      <li className="nav-item margin_right">
      <NavLink to="/dashboard/home" className={isactive}>Home</NavLink>
      </li>
      <li className="nav-item margin_right">
      <NavLink to="/dashboard/mytasks" className={isactive}>MyTasks</NavLink>
      </li>
       {
       User && User.roleId==1 &&
      <li className="nav-item margin_right">
      <NavLink to="/dashboard/assigntasks" style={{whiteSpace:"nowrap"}} className={isactive}>Assign Tasks</NavLink>
      </li>

      }
    </ul>
    <div style={{width:"75%",marginLeft:"50px",textAlign:"end",display:"flex",justifyContent:"flex-end"}}>
      <h5 className='h5 mt-2 mx-4'>{User && User.username}</h5>
    <button className='btn btn-primary me-3' onClick={handlelogout}><i className='fa fa-sign-out'></i>&nbsp;Log out</button>
    </div>

  </div>
</nav>
    </>
  )
}

export default Navbar