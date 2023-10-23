import React from 'react'
import '../Style.css'
const Card = ({color,txtcolor,title,count}) => {
  return (
  <div className='col-md-4'>
    <div className="card my-2 box_shadow_cards"  style={{backgroundColor:color!=""?color:"white",color:txtcolor,padding:"92px"}}>
      <div className="card-body">
        <h3 className="card-title text-center" >{title}</h3>
        <p  className="card-text text-center" style={{fontSize:"30px",fontWeight:"600"}}>{count}</p>
      </div>
    </div>
    </div>
  )
}

export default Card