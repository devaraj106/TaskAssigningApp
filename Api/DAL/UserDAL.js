const {Users,Tasks,CountryMaster}=require('../models/Model.js');
var {UserResponse}=require('../models/Model.js');
const{hashpass}=require('../CommanHelper/Helper.js');
const{comparepass,GenerateIdentifier}=require('../CommanHelper/Helper.js');
const{GenerateToken}=require('../DAL/TokenDAL.js');
const{AuthenticateUser}=require('../DAL/TokenDAL.js');
const { use } = require('../Routers/Users.js');


 
const UserLogin = async(req,res)=>{
    UserResponse={};
       try{
       if(req.body!=null && req.body!=undefined){
      var email=req.body.email;
      var password=req.body.password;
   
      if((email!=null && email!="" && email!=undefined)&&(password!=null && password!="" && password!=undefined))
      {
       var user=await GetUser(req.body.email);
       console.log(user)
       if(user!=null && user!=undefined){var passwordres=await comparepass(req.body.password,user.password);}
       if((user!=null && user!=undefined) && (passwordres===true))
       {
           
         var token = await GenerateToken(user.toJSON());
           UserResponse.responseCode="200";
           UserResponse.responseMessage="User Logged In";
           UserResponse.token=token;
           UserResponse.Users=user;
   
          
       }else{
           UserResponse.responseCode="401";
           UserResponse.responseMessage="Emailid or passsword may be wrong";
          
       }
         
      }else{
       UserResponse.responseCode="500";
       UserResponse.responseMessage="Make sure mandatory fields are filled";
      
      }
   }else{
       UserResponse.responseCode="500";
       UserResponse.responseMessage="UnSuccessfull";
      
   }
       }catch(error){
           UserResponse.responseCode="500";
       UserResponse.responseMessage="UnSuccessfull";
   
       }
       finally{
           res.json(UserResponse);
       }
    }

const UserList=async (req,res)=>{
    UserResponse={};
    var users=await GetUserByIdentifier(req.params.identifier);
   try{
    var user=req.user;

  if(await AuthenticateUser(users.email,user.email))
  {
    var useridentifier=user.identifier.trim();
    const userslist= await Users.aggregate([

        {
        $lookup:{
         from:"countrymaster",
         localField:"country",
         foreignField:"countryId",
         as:"usercountries"
        },
       
       },
       {$unwind: '$usercountries'},
       {
        $lookup:{
            from:"rolemaster",
            localField:"roleId",
            foreignField:"roleId",
            as:"userrole"
        }
       },
       {$unwind:'$userrole'},
    //    {
    //     $lookup:{
    //         from:"users",
    //         localField:"mId",
    //         foreignField:"identifier",
    //         as:"userManager"
    //     }
    //    }
    //    ,
    //    {$unwind:'$userManager'},
    {
      $lookup:{
        from:"tasks",
        localField:"identifier",
        foreignField:"developerId",
        as:"tasklist"
      }
    },

       { $match:{
        $expr:{
            $and:[
                {$ne:["identifier",req.params.identifier]}
            //{$eq:["$mId",identifier1]},
            //{$eq:["$roleId",2]}
            
            ]
        }
       }},

       
       {
        $project:{
           _id:1,
           identifier:1,
           mId:1,
           roleId:1,
           //managerName:{$concat:["$userManager.firstName"," ","$userManager.lastName"]},
           userName:{$concat:["$firstName"," ","$lastName"]},
           age:1,
           email:1,
           rolename:"$userrole.roleName",
           countryName : "$usercountries.countryName",
           taskCount:{$size:"$tasklist"},
        }
       }
     ])


if(userslist.length > 0){
  for(var i=0;i<userslist.length;i++)
  {
     var countlist=await Tasks.aggregate([
      {
        $lookup:{
          from:"statusmaster",
          foreignField:"statusId",
          localField:"taskStatus",
          as:"taskstatustb"
        }
      },
      {
          $match:{
              $expr:{
                   $and:[
                       {$eq:["$developerId",userslist[i].identifier]}
                   ]
              }
          }
      },
      {
          "$group":{_id:"$taskStatus",count:{$sum:1}}
      }
  ])

  userslist[i].statuslist=countlist;


}
}







     const users = await Users.find();
     UserResponse.Users=userslist;
     UserResponse.responseCode="200";
     UserResponse.responseMessage="Success";

     
    
  }else{
    UserResponse.responseCode="401";
    UserResponse.responseMessage="unauthorized";
  }
  

   }catch(error)
   {
    console.log(error)
    UserResponse.responseCode="500";
    UserResponse.responseMessage="UnSuccessfull";

    
   }finally{
    res.json(UserResponse);
   }
 }

const SaveUser=async(req,res)=>{
    UserResponse={};
try{
if(await UserAlreadyExist(req.body.email)){
 
  const user=new Users({
    firstName:req.body.firstName,
    identifier:await GenerateIdentifier(13),
    lastName:req.body.lastName,
    age:req.body.age,
    roleId:parseInt(req.body.roleId),
    //mId:req.body.mId,
    country:parseInt(req.body.country),
    email:req.body.email,
    password:await hashpass(req.body.password)
  });
  var result=await user.save();
   UserResponse.responseCode="200";
   UserResponse.responseMessage="User Saved";
   
}else{
  
    UserResponse.responseCode="200";
   UserResponse.responseMessage="User Already Exist";
 
}
}catch(error){
 console.log(error)
    UserResponse.responseCode="500";
    UserResponse.responseMessage="UnSuccessfull";
  
}finally{
    res.json(UserResponse);
}
 }
 const UserAlreadyExist=async(emailid)=>{
    
    var user =await Users.findOne({email:emailid}).then((data) => {return data})
 
    if(user!=null || user!=undefined)
    {
        return false;
    }else{
        return true;
    }

 }

 const GetUser=async(emailid)=>{
    var user=Users.findOne({email:emailid}).then((data)=>{return data})

    return user;
 }
 const GetUserByIdentifier=async(identifier)=>{
    var user=Users.findOne({identifier:identifier}).then((data)=>{return data});
    return user;
 }

 module.exports={
    UserLogin:UserLogin,
    UserList:UserList,
    SaveUser:SaveUser,
    GetUserByIdentifier:GetUserByIdentifier
 }