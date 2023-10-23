import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../Components/navbar'
import { UserContext } from '../Context/context'
import Config from '../config.js'
import axios from 'axios';
import Pagination from '../Components/pagination';

function MyTasks() {
  const{User,setUser}=useContext(UserContext);
const[temptasks,settempasks]=useState([]);
const[Tasks,setTasks]=useState([]);
const[sortTasks,sortsetTasks]=useState([]);
const[recordcount,setrecordcount]=useState([]);
const[filter,setfilter]=useState({status:0});
const[pagenumber,setpagenumber]=useState(1);
const[click,setclick]=useState({click:0})
  useEffect(()=>{
    console.log('my tasks')
     BindMyTasks();
  },[])

  
  useEffect(()=>{
    var tasks=[...temptasks];
    setTasks(tasks);
    console.log("innn",tasks.length)

    console.log("innn",tasks)
    handlepagechanger(pagenumber);

    },[temptasks])
    


  useEffect(()=>{
    
   handlepagechanger(pagenumber);
   //filteredtasks();
  },[filter]); //temptasks


  function setpagination(len)
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
     //handlepagechanger(pagenumber);
    }
  }


const BindMyTasks=()=>{
  var userloc=localStorage.getItem('User');
  var parseUser=JSON.parse(userloc);
  userloc?setUser(parseUser):setUser(null);
    if(parseUser.token!=null && parseUser.token!="")
    {
      axios.get(Config.Url+"Tasks/"+(parseUser&&parseUser.identifier),{headers: { Authorization: `Bearer ${(parseUser&&parseUser.token)}` }})
      .then(function ({data}) {
        if(data.responseCode=="200"){settempasks(data.Tasks); }
        else settempasks(null);
      })
      .catch(function (error) {console.log(error);});
    }else{
      console.log("no user")
    }
}
const handlechangestatus=(e,id)=>{
  var userloc=localStorage.getItem('User');
  var parseUser=JSON.parse(userloc);
  userloc?setUser(parseUser):setUser(null);
  var identifier="";
  identifier = e.target.id.split("_")[1];
  if(identifier!="" && parseUser.token!=null && parseUser.token!="")
  {
    axios.post(Config.Url+"Tasks/status/"+parseUser.identifier,{status:id,identifier:identifier},{headers: { Authorization: `Bearer ${(parseUser&&parseUser.token)}` }})
    .then(function({data}){
      if(data.responseCode=="200")
      {
        BindMyTasks();
      }
    }).catch(function(err){console.log(err);});
  }
}

const handlefilter=(e)=>{
  setpagenumber("1");
  var val=e.target.value;
  setfilter((pre)=>{
    return ({...pre,status:val})
  })

}

const handlepagechanger=(pagenumber)=>{
  
  var tasks=[...temptasks];
  if(filter.status!=0){
  tasks=tasks.filter((task)=>{return task.taskStatus==filter.status});
  }
  setpagenumber(pagenumber)

  setpagination(tasks.length)
  tasks=tasks.splice((pagenumber-1)*5,5);

  if(temptasks.length > 0 && tasks.length==0 && pagenumber!=1)
  {
    console.log("in length=0",tasks.length)
    pagenumber=pagenumber-1;
    setpagenumber(pagenumber);
    tasks=[...temptasks].filter((task)=>{return task.taskStatus==filter.status});
    setpagination(tasks.length)
    tasks=tasks.splice((pagenumber-1)*5,5);
  }

 


  setTasks(tasks);
  }

const filteredtasks= ()=>{
  var status=parseInt(filter.status);
  var filteredtasks=temptasks;
if(status!=0){
   filteredtasks=filteredtasks.filter((task)=>{return task.taskStatus==status});
}
  setTasks(()=>{
    return(filteredtasks)
  })
  setpagination(filteredtasks.length)
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
 var users=[...Tasks];

 if(filter.status!=0)
 {
   users=users.filter((task)=>{return task.taskStatus==filter.status})
 }

 var sortusers=[];
if(sort==1)
{
   sortusers= users.sort((a,b)=>{
    if ( a.taskName > b.taskName ){
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
    if ( a.taskDescription > b.taskDescription ){
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
    if ( a.developername > b.developername ){
      return 1;
    }
   else{
      return -1;
    }
   
  })
}
else if(sort==4)
{
  sortusers= users.sort((a,b)=>{
    if ( a.assignedName > b.assignedName ){
      return 1;
    }
   else{
      return -1;
    }
   
  })
}

 
setTasks(sortusers)
//setpagination(users.length)
//setpagination(sortusers.length)

}
else{
  var users=[...Tasks];
  if(filter.status!=0)
  {
    users=users.filter((task)=>{return task.taskStatus==filter.status})
  }
 
  var sortusers=[];
 if(sort==1)
 {
    sortusers= users.sort((a,b)=>{
     if ( a.taskName < b.taskName ){
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
     if ( a.taskDescription < b.taskDescription ){
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
     if ( a.developername < b.developername ){
       return 1;
     }
    else{
       return -1;
     }
    
   })
 }
 else if(sort==4)
 {
   sortusers= users.sort((a,b)=>{
     if ( a.assignedName < b.assignedName ){
       return 1;
     }
    else{
       return -1;
     }
    
   })
 }
 
 
 setTasks(sortusers)
 //setpagination(users.length)
//  setTasks(()=>{
//    return(sortusers)
//  });
//  setpagination(sortusers.length)
}
}

const handledownloadfile=(e)=>{
  //console.log(e.target.getAttribute('name'))
var taskid=e.target.getAttribute('name');
if(taskid!=null && taskid!=undefined && taskid!="")
{
  axios.get(Config.Url+"Tasks//download/"+(taskid))
  .then(function ({data}) {
    if(data!=null && data!="")
    {
      var mediaType = "data:octet-stream;base64,";
      var a=document.createElement('a');
      a.setAttribute('Download',data.fileName);
      a.setAttribute('href',mediaType+data.base64);
      a.click();
      a.remove();
    }
  })
  .catch(function (error) {console.log(error);});
}


}

  return (
  <>
  <Navbar></Navbar>
  <div className='mt-3 mx-4' style={{textAlign:"end",padding:'30px'}}>
    <select value={filter.status} onChange={handlefilter}>
    <option value={0}>All</option>
    <option value={1}>Not started</option>
    <option value={2}>In Progress</option>
    <option value={3}>Completed</option>
    </select>
  </div>
  <div className='p-3'>
  <table className="table table-striped table_bg">
  <thead className='bg-black text-white'>
    <tr>
      <th scope="col" className='sort_class' onClick={()=>{handlesort(1)}}>TaskName</th>
      <th scope="col" className='sort_class' onClick={()=>{handlesort(2)}}>TaskDescription</th>
      <th scope="col">status</th>
      <th scope="col" className='sort_class' onClick={()=>{handlesort(3)}}>Developer Name</th>
      <th scope="col" className='sort_class' onClick={()=>{handlesort(4)}}>Assigned By</th>
      <th scope="col" >Files</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
   {
    temptasks && Tasks.length > 0 && recordcount.length>0 ? Tasks.map((value,i)=>{
      var status=""
      if(value.taskStatus==1){status="Not Started";}
      else if(value.taskStatus==2){status="In Progress";}
      else if(value.taskStatus==3){status="Completed";}
      return(
        <tr key={i}>
          <td>{value.taskName}</td>
          <td>{value.taskDescription}</td>
          <td>{status}</td>
          <td>{value.developername}</td>
          
          <td>{value.assignedName}</td>
          { 
          value.attachement?
          <td><a href='#' name={value.taskId} onClick={handledownloadfile}>{value.attachement.orginalName}</a></td>:<td>No File</td>
    }
          <td>
            <div>
            <button className='btn btn-secondary me-2' onClick={(e)=>{handlechangestatus(e,1)}} id={'not_'+value.taskId} style={{display:(value.taskStatus==2 || value.taskStatus==3)?'inline-block':'none'}}>Not Started</button>
              <button className='btn btn-warning me-2' onClick={(e)=>{handlechangestatus(e,2)}} id={'pro_'+value.taskId} style={{display:(value.taskStatus==1 || value.taskStatus==3)?'inline-block':'none'}}>In Progress</button>
              <button className='btn btn-success' onClick={(e)=>{handlechangestatus(e,3)}} id={'com_'+value.taskId} style={{display:((value.taskStatus==1 || value.taskStatus==2)&&(value.taskStatus!=3)) ?'inline-block':'none'}}>Completed</button>
            </div>
          </td>
          </tr>
      )
    }):<tr><td>No data available</td></tr>

    
   }
  </tbody>
</table>
{
  Tasks.length>0 &&
<Pagination recordcount={recordcount} setpagenumber={handlepagechanger} pagenumber={pagenumber}></Pagination>
}
  </div>
  </>
  )
}

export default MyTasks