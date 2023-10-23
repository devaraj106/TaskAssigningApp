import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../Components/navbar'
import axios from 'axios';
import Config from '../config';
import { UserContext } from '../Context/context'
import Card from '../Components/Card';
import Footer from '../Components/footer';

function Home() {
  const[count,setcount]=useState({notstarted:0,progress:0,finished:0});
  useEffect(()=>{
    console.log("inn home")
    Getcountofstatus();
  },[])

  
  function Getcountofstatus()
  {
    var userloc=localStorage.getItem('User');
    var parseUser=JSON.parse(userloc);
      if(parseUser.token!=null && parseUser.token!="")
      {
        axios.get(Config.Url+"Tasks/count/"+(parseUser&&parseUser.identifier),{headers: { Authorization: `Bearer ${(parseUser&&parseUser.token)}` }})
        .then(function ({data}) {
          console.log(data)
          if(data.responseCode=="200"){
            data.TaskCount.map((val)=>{
              console.log(val)
              if(val._id==1){
                setcount((pre)=>{
                  return({...pre,notstarted:val.count})
                })
              }else if(val._id==2){
                setcount((pre)=>{
                  return({...pre,progress:val.count})
                })
              }else if(val._id==3){
                setcount((pre)=>{
                  return({...pre,finished:val.count})
                })
              }
            })
          }
         
        })
        .catch(function (error) {
          console.log(error);});
      }else{
      
      }
  }
  return (
    <>
    <Navbar></Navbar>
    
    <div className="row mt-3" style={{padding:"10px"}}>
<Card  color="#7a7777" txtcolor="white" title="Not Started" count={count.notstarted}></Card>
<Card color="rgb(255 193 7 / 81%)" txtcolor="black" title="On Progress" count={count.progress}></Card>
<Card color="#198754" txtcolor="white" title="Completed" count={count.finished}></Card>

</div>
<Footer></Footer>
    </>
  )
}

export default Home