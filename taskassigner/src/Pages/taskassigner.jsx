import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../Components/navbar'
import pending from '../Images/pending.svg'
import Config from '../config';
import axios from 'axios';
import Modal from '../Components/modal';
import Pagination from '../Components/pagination';
import Search from '../Components/Search';

function Taskassigner() {
  const[tempusers,settempUsers]=useState([]);
  const[Allusers,setallUsers]=useState([]);
  const[recordcount,setrecordcount]=useState([]);
  const[Tasks,setTasks]=useState({taskName:"",taskDescription:"",identifier:"",developerId:"",developerName:"",attachement:{}});
  const[flag,setflag]=useState({taskName:false,taskDescription:false})
  const[search,setsearch]=useState({search:""})
  const[filter,setfilter]=useState({filter:0})
  const[pagenumber,setpagenumber]=useState(1);
  const[click,setclick]=useState({click:0});
  const[attachements,setattachements]=useState([{path:"",originalName:""}]);

  useEffect(()=>{
    console.log('task assigner')
    GetAllUsersWithTasks();
    },[])

    useEffect(()=>{
    setallUsers(tempusers);
    //setpagination(tempusers.length);
    handlepagechanger(pagenumber);

    },[tempusers])

    // useEffect(()=>{
    //   //setpagination(Allusers.length)
    //   handlepagechanger(pagenumber);
    // },[setallUsers])

    useEffect(()=>{
     
  handlepagechanger(pagenumber);
      },[search])

      useEffect(()=>{
handlepagechanger(pagenumber);
      },[filter])

    function setpagination(len){
      //handlepagechanger(pagenumber);
     setrecords(len);
    }

    function setrecords(len)
    {
      
      if(len > 0)
      {
       var pagevalue=Math.ceil(len/5);
       var records=[]
       for(var i=1;i<=pagevalue;i++)
       {
         records.push(i);
       }
       setrecordcount(records);
       
      }else{
        setrecordcount([])
      }
    }

    function GetAllUsersWithTasks()
    {
      var userloc=localStorage.getItem('User');
      var parseUser=JSON.parse(userloc);
        if(parseUser.token!=null && parseUser.token!="")
        {
          axios.get(Config.Url+"Users/"+(parseUser&&parseUser.identifier),{headers: { Authorization: `Bearer ${(parseUser&&parseUser.token)}` }})
          .then(function ({data}) {
            if(data.responseCode=="200"){settempUsers(data.Users); console.log(data.Users,"users") }
            else settempUsers(null);
          })
          .catch(function (error) {console.log(error);});
        }else{
          console.log("no user")
        }
    }

const handletoassigntask=(e)=>{
  var devname="";
  var userloc=localStorage.getItem('User');
  var parseUser=JSON.parse(userloc);
  var currentuser=Allusers.filter(emp=>emp.identifier===e.target.id);
 
  clearvalues();
  if(currentuser.length>0)devname=currentuser[0].userName;
 setTasks((prev)=>{
  return({...prev,identifier:parseUser.identifier,developerId:e.target.id,developerName:devname})
 })
}
const handlebindvalues=(e)=>{
  setTasks((prev)=>{
    return({...prev,[e.target.name]:e.target.value})
  })
}
const handlesavetasks=(e)=>{
  var userloc=localStorage.getItem('User');
  var parseUser=JSON.parse(userloc);
  var flg=0;
  if(Tasks.taskName==="" || Tasks.taskDescription==="")
  {
    var flg=1
    if(Tasks.taskName===""){setflag((prev)=>{return({...prev,taskName:true})})}else{setflag((prev)=>{return({...prev,taskName:false})})}
    if(Tasks.taskDescription===""){setflag((prev)=>{return({...prev,taskDescription:true})})}else{setflag((prev)=>{return({...prev,taskDescription:false})})}
  }else{
    setflag({taskName:false,taskDescription:false})
  }
  if(flg==0)
  {
    var attachemntoj=[];
    
   if(attachements[0].path!=null && attachements[0].path!="" )
   {
    attachemntoj.push({path:attachements[0].path,orginalName:attachements[0].originalName});
   }
    Tasks.attachement=attachemntoj;
     axios.post(Config.Url+"Tasks",Tasks,{headers: { Authorization: `Bearer ${(parseUser&&parseUser.token)}` }})
    .then(function ({data}) {
       data=data

       if(data.responseCode==="200")
       {
        GetAllUsersWithTasks();
       }else{
         alert(data.responseMessage);
        
       }
    
    })
    .catch(function (error) {
      alert(error);
     
    
    }
      
      );
      clearvalues();
      document.getElementById('closemodal').click();
  
  }
}
const handlepagechanger=(pagenumber)=>{

var users=[...tempusers];

if(search.search!="")
{
  users=tempusers.filter(emp=>{
    if((emp.userName).replace(" ","").toString().toLowerCase().trim().indexOf(search.search.replace(" ","").toLowerCase().trim()) > -1)
    {
      return emp;
    }
  })
}

if(filter.filter!=0)
{
  users=users.filter(emp=>emp.roleId==filter.filter);
}
setrecords(users.length)

users=users.splice((pagenumber-1)*5,5);



setpagenumber(pagenumber)

setallUsers(users)
}
const handlesort=(sort)=>{
  if(click.click==0)
  {
    
    setclick({click:1})
  }
 else{
   setclick({click:0})
 }
 Dosort(sort);
}
const Dosort=(sort)=>{
if(click.click==0)
{
 var users=[...Allusers]
 var sortusers=[];
if(sort==1)
{
   sortusers= users.sort((a,b)=>{
    if ( a.userName > b.userName ){
      return 1;
    }
   else{
      return -1;
    }
   
  })
}
else if(sort==2)
{
  sortusers= users.sort((a,b)=>{
    if ( a.countryName > b.countryName ){
      return 1;
    }
   else{
      return -1;
    }
   
  })
}
else if(sort==3)
{
  sortusers= users.sort((a,b)=>{
    if ( a.rolename > b.rolename ){
      return 1;
    }
   else{
      return -1;
    }
   
  })
}


setallUsers(()=>{
  return(sortusers)
});
//setpagination(sortusers.length)

}
else{
  var users=[...Allusers]
if(sort==1)
{
  var sortusers= users.sort((a,b)=>{
    if ( a.userName < b.userName ){
      return 1;
    }
   else{
      return -1;
    }
   
  })
  setallUsers(()=>{
    return(sortusers)
  });
  // setpagination(sortusers.length)
}else if(sort==2)
{
  var sortusers= users.sort((a,b)=>{
    if ( a.countryName < b.countryName ){
      return 1;
    }
   else{
      return -1;
    }
   
  })
  setallUsers(()=>{
    return(sortusers)
  });
  //setpagination(sortusers.length)
}else if(sort==3)
{
  var sortusers= users.sort((a,b)=>{
    if ( a.rolename < b.rolename ){
      
      return 1;
    }
   else{
      return -1;
    }
   
  })
  setallUsers(()=>{
    return(sortusers)
  });
  //setpagination(sortusers.length)
}

}
}

const clearvalues=()=>{
  setflag({taskName:false,taskDescription:false})
  setTasks({taskName:"",taskDescription:"",identifier:"",developerId:"",developerName:""})
  document.getElementById('fileattachement').value="";
}

const handlesearch=(e)=>{
  var search=e.target.value;

  if(search!="")
  {
  
  if(e.keyCode=="13")
  {
    setpagenumber(1);
    setsearch({search:search})
    
      // var newuser=tempusers.filter(emp=>{
      //     if((emp.userName).replace(" ","").toString().toLowerCase().trim().indexOf(search.replace(" ","").toLowerCase().trim()) > -1)
      //     {
      //       return emp;
      //     }
      //   })
       
      //  //setallUsers(newuser);
      //  setpagination(newuser.length)
   
  }
}else{
      var allusers=tempusers;
      setpagenumber(1);
      setsearch({search:""})
      

  //     if(filter.filter!=0)
  // {
  //   allusers=allusers.filter(emp=>emp.roleId==filter.filter)
   
  // }

     
  //     //setallUsers(allusers);
  //     setpagination(allusers.length)
}
}

function handlefilter(e)
{
  // var users=[...tempusers];

  var filterval=e.target.value;
  setpagenumber(1);
  setfilter({filter:filterval})
//   if(filterval!=0)
//   {
//     users=users.filter(emp=>emp.roleId==filterval)
   
//   }


// if(search.search!="")
// {
//   users=tempusers.filter(emp=>{
//     if((emp.userName).replace(" ","").toString().toLowerCase().trim().indexOf(search.replace(" ","").toLowerCase().trim()) > -1)
//     {
//       return emp;
//     }
//   })
// }



  //setallUsers(users);
  //setpagination(users.length);
}


function Getfilteredsearchdata()
{
  var users=[...tempusers];

  var filterval=filter.filter;
  setfilter({filter:filterval})
  if(filterval!=0)
  {
    users=users.filter(emp=>emp.roleId==filterval)
   
  }


if(search.search!="")
{
  users=tempusers.filter(emp=>{
    if((emp.userName).replace(" ","").toString().toLowerCase().trim().indexOf(search.replace(" ","").toLowerCase().trim()) > -1)
    {
      return emp;
    }
  })
}

return users;
}

function handlefileupload(e)
{
  var file=e.target.files;
  var formData = new FormData();
  formData.append("File", file[0])

   axios.post(Config.Url+"FileUplod/single",formData)
  .then(function ({data}) {
     data=data

     if(data.responseCode==="200")
     {
      console.log(data);
      setattachements([{path:data.Path,originalName:data.orginalName}])

     }
     else{
       alert(data.responseMessage);
      
     }
  
  })
  .catch(function (error) {
    alert(error);
   
  
  }
    
    );
}

  return (
    <>
    <Navbar></Navbar>
    
    <div style={{display:'flex',float:'right',padding:'30px'}}>
      <div>
        <select className='mt-3' value={filter.filter} onChange={handlefilter}>
          <option value={0}>All</option>
          <option value={1}>Manager</option>
          <option value={2}>Developer</option>
        </select>
      </div>
    <div className='mt-3 mx-4' style={{textAlign:"end"}}>
    <input type="text" onKeyUp={(e)=>{handlesearch(e)}} placeholder='search' />
    </div>
    </div>

   <div className='p-3'>
    <table className="table table-striped table_bg">
  <thead className='bg-black text-white '>
    <tr>

      <th scope="col" className='sort_class' onClick={()=>{handlesort(1)}}>Name</th>
      <th scope="col" className='sort_class' onClick={()=>{handlesort(2)}}>Country</th>
      <th scope="col" className='sort_class' onClick={()=>{handlesort(3)}}>Designation</th>
      <th scope='col'>Total Task Assigned</th>
      <th scope='col'>Tasks status</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
    {
 Allusers && Allusers.length>0 ? Allusers.map((value,i)=>{
  
  var statuslist=value.statuslist;
var notstarted=0;
var pending=0;
var completed=0;
for(var i=0;i<statuslist.length;i++)
{
  if(statuslist[i]._id==1){
    notstarted=statuslist[i].count;
  }else if(statuslist[i]._id==2)
  {
   pending=statuslist[i].count;
  }else if(statuslist[i]._id==3){
completed=statuslist[i].count;
  }
}


  return(
    <tr id={'taskass_'+i}>
      <td>{value.userName}</td>
      <td>{value.countryName}</td>
      <td>{value.rolename}</td>
      <td>{value.taskCount}</td>
{
  
  <td>
    <div>
      <div style={{display:'flex'}}>
<div>
<span ><i className="fa fa-clock-o"></i></span>
<div>
<span>{notstarted}</span>
</div>
</div>
      
<div>
<span className='mx-2'><i className="fa fa-spinner fa-solid fa-spin"></i></span>
<div className='mx-2' style={{textAlign:'center'}}>
<span >{pending}</span>
</div>
</div>

<div>
<span><i className="fa fa-flag-checkered fa-solid"></i></span>
<div>
<span>{completed}</span>
</div>
</div>

      </div>


    {/* <div style={{display:'flex',letterSpacing:'17px'}}>
      
      <span>{notstarted}</span>
      <span>{pending}</span>
      <span>{completed}</span>
      
    </div> */}
    </div>
    </td>
 }

      <td><button id={value.identifier} onClick={handletoassigntask} data-bs-toggle="modal" data-bs-target="#exampleModal" className='btn btn-success'>Assign Task</button></td>
    </tr>
  )
 }):<tr><td>No Data Available</td></tr>
}

  </tbody>
</table>
</div>

<div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Add Task for {Tasks && Tasks.developerName ? Tasks.developerName:"User"}</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <div className="form-group">
    <label for="exampleInputEmail1">Task Name</label>
    <input type="text" className={"form-control "+(flag.taskName?"error_div":" ")} value={Tasks.taskName} id="taskname" onChange={handlebindvalues} name='taskName' aria-describedby="emailHelp" placeholder="Task Name"/>
  
  </div>
  <div className="form-group mt-3">
    <label for="exampleInputPassword1">Task Description</label>
    <textarea className={"form-control "+(flag.taskDescription?"error_div":" ")} value={Tasks.taskDescription} id="taskdes" name='taskDescription' rows='3' onChange={handlebindvalues} placeholder="Description"></textarea>
  </div>

  <div className="form-group mt-3">
    <label for="exampleInputPassword1">File</label>
    <input className="form-control" id='fileattachement'  type='file' onChange={handlefileupload}/>
  </div>

      </div>
      <div className="modal-footer" style={{display:"flex",justifyContent:"center"}}>
        <button type="button" className="btn btn-secondary" id="closemodal" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary" onClick={handlesavetasks}>Save Tasks</button>
      </div>
    </div>
  </div>
</div>
<Pagination recordcount={recordcount} setpagenumber={handlepagechanger} pagenumber={pagenumber}></Pagination>
    </>
  )
}

export default Taskassigner