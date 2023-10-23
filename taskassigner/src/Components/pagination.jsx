import React, { useEffect,useState } from 'react'
import "../Style.css"




function Pagination({recordcount,setpagenumber,pagenumber}) {
    const[page,setpage]=useState(1);
    useEffect(()=>{
        console.log(pagenumber,"pagcom[")
        console.log(pagenumber,"activeclass")
        changeactiveclass();
        
    },[setpagenumber,recordcount])//page

    const handlechangepage=(e)=>{
   
        var pagenumber=e.target.id;
        setpagenumber(pagenumber);
        setpage(pagenumber);
        
      }
      const changeactiveclass=(e)=>{
        console.log(pagenumber,"activeclass")
        if(recordcount.length > 0){
            for(var i=1;i<=recordcount.length;i++)
            {
               if(document.getElementById(i).classList.contains('page_active'))
               {
                document.getElementById(i).classList.remove('page_active')
               }
            }

            if(!document.getElementById(pagenumber))
            {
                pagenumber=pagenumber-1;
                if(pagenumber==0 || pagenumber==undefined){pagenumber=1}
            }

            document.getElementById(pagenumber).classList.add('page_active')
           }
      }
  return (
    <div style={{display:"flex",justifyContent:"center"}}>
        {
            recordcount && recordcount.length>0 && recordcount.map((val,i)=>{
                return(
                    <button key={i} id={val} onClick={handlechangepage} className="btn btn me-2 page_inactive">{val}</button>
                )
            })
        }
    </div>
  )
}

export default Pagination