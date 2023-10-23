const express=require('express');
const{verifyToken}=require('../DAL/TokenDAL.js');
const{UserLogin,UserList,SaveUser}=require('../DAL/UserDAL.js');



 const Routers=express.Router();



 Routers.post("/userlogin",UserLogin);

 Routers.get("/:identifier",verifyToken,UserList);

 Routers.post("/",SaveUser);




 






 



 module.exports=Routers;