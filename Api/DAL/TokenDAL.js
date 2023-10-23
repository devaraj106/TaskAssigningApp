const jwt=require('jsonwebtoken');
var {UserResponse}=require('../models/Model.js')
require('dotenv');

const GenerateToken=async(user)=>{
    var token = jwt.sign(user,process.env.SECRETKEY,{expiresIn:'1d'});
 return token;
  }


const verifyToken=async(req,res,next)=>{
UserResponse={};
    var bearer=req.headers['authorization'];
  
    if(bearer==null || bearer==undefined){UserResponse.responseCode="401";UserResponse.responseMessage="unauthorizedd";UserResponse.Users=null;return res.json(UserResponse)}
    else{
        var token=bearer.split(" ")[1];
        jwt.verify(token,process.env.SECRETKEY,(err,user)=>{
            if(err){UserResponse.responseCode="401";UserResponse.responseMessage="unauthorized";UserResponse.Users=null;return res.json(UserResponse)}
            req.user=user;
      
            next();
           
        })
    }
    
 }


const AuthenticateUser=async(email,useremail)=>{

        if(email===useremail){
         
            return true;
        }else{
         
            return false;
        }
     }


     module.exports={
        GenerateToken:GenerateToken,
        verifyToken:verifyToken,
        AuthenticateUser:AuthenticateUser
     }
    