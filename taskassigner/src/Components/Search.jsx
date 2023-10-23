import React from 'react'

 const Search = ({tempusers,setusers,setrecordcount,setpagination}) => {
    const handlesearch=(e)=>{
        var search=e.target.value;
        if(search!="")
        {
        if(e.keyCode=="13")
        {
            var newuser=tempusers.filter(emp=>{
                if((emp.userName).replace(" ","").toString().toLowerCase().trim().indexOf(search.replace(" ","").toLowerCase().trim()) > -1)
                {
                  return emp;
                }
              })
              //setrecordcount(newuser.length)
             setusers(newuser);
         
        }
      }else{
            var allusers=tempusers;
            //setpagination(allusers.length)
            setusers(allusers);
      }
    }
  return (
    <div className='mt-3 mx-4' style={{textAlign:"end"}}>
        <input type="text" onKeyUp={(e)=>{handlesearch(e)}} placeholder='search' />
    </div>
  )
}

export default Search;
