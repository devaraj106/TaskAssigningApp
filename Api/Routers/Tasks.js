const express=require('express');
var{TaskResponse,Tasks,Attacements}=require('../models/Model.js')
const{verifyToken}=require('../DAL/TokenDAL.js');
const{AuthenticateUser}=require('../DAL/TokenDAL.js');
const { GenerateIdentifier } = require('../CommanHelper/Helper.js');
const{GetUserByIdentifier}=require('../DAL/UserDAL.js');
const fs = require('fs');
const Router=express.Router();
const LookUpwithUsers={
    from:"users",
    localField:"developerId",
    foreignField:"identifier",
    as:"DeveloperList"
}

Router.post("/",verifyToken,async(req,res)=>{
    TaskResponse={};
    try{
        var user=req.user;
        
        var users=await GetUserByIdentifier(req.body.identifier);
        //var emailid=req.body.emailId;
        console.log(users,"users")
     if(await AuthenticateUser(users.email,user.email))
     {
        var developerId=req.body.developerId;
        var taskName=req.body.taskName;
        var taskDescription=req.body.taskDescription;
  const task=new Tasks({
    taskName:taskName,
    taskDescription:taskDescription,
    taskId:await GenerateIdentifier(13),
    assignedBy:user.identifier,
    developerId:developerId
  })
var result=await task.save();
console.log(req.body.attachement,"attachements")

console.log(req.body.attachement[0],"attachements TEST123")

if(req.body.attachement!=null && req.body.attachement.length > 0)
{
    console.log(req.body.attachement)
const attachements=new Attacements({
    taskId:task.taskId,
    path:req.body.attachement[0].path,
    orginalName:req.body.attachement[0].orginalName,
    fileId:await GenerateIdentifier(13)
})

var fileobj=await attachements.save();

}

TaskResponse.responseCode="200";
TaskResponse.responseMessage="Task Saved";
        
     }else{
        TaskResponse.responseCode="403";
        TaskResponse.responseMessage="UnAuthorized";
     }
    }catch(error)
    {
        console.log(error);
        TaskResponse.responseCode="500";
        TaskResponse.responseMessage="ServerError";
    }finally{
        res.json(TaskResponse);
    }
});

Router.get("/:identifier",verifyToken,async(req,res)=>{
TaskResponse={};
var userData=await GetUserByIdentifier(req.params.identifier)
try{
var user = req.user;
if(await AuthenticateUser(userData.email,user.email)){
   const TaskList=await Tasks.aggregate([

    {
        $lookup:LookUpwithUsers
    },
    {
       $unwind:'$DeveloperList'
    },
    {
        $lookup:{...LookUpwithUsers,localField:"assignedBy",as:"AssignedList"}
    },
    {
        $unwind:'$AssignedList'
    },
    {
        $sort: {
          'createdAt': -1
        }
      }
      ,
    {
      $match:
        {
            $expr:{
                $and:[
                    {"$eq":["$developerId",user.identifier]}
                ]
                
            }
        }
      
    },

    {
        $project:{
            _id:1,
            taskId:1,
           taskName:1,
            taskDescription:1,
            developername:{$concat:["$DeveloperList.firstName"," ","$DeveloperList.lastName"]},
            assignedName:{$concat:["$AssignedList.firstName"," ","$AssignedList.lastName"]},
            taskStatus:1,
            createdDate:1
        }
    }


   ])


   
var taskattachements={};

var tasklist=TaskList.sort(function(a,b){
    return new Date(b.createdDate) - new Date(a.createdDate);
  });

  


if(tasklist.length > 0)
{
    for(var i=0;i<tasklist.length;i++)
    {
        var taskattachements={};
        taskattachements=await Attacements.findOne({taskId:tasklist[i].taskId}).then((data) => {return data});
        tasklist[i].attachement=taskattachements;
        
        //console.log(taskattachements);
    }
}

 //console.log(tasklist);
 
   TaskResponse.responseCode="200";
   TaskResponse.responseMessage="Success";
   TaskResponse.Tasks=tasklist;

}else{
    TaskResponse.responseCode="404";
    TaskResponse.responseMessage="UnAuthorized";
}
}catch(err){
    console.log(err)
    TaskResponse.responseCode="500";
    TaskResponse.responseMessage="Server Error";
}finally{
    res.send(TaskResponse);
}
});

Router.get("/count/:identifier",verifyToken,async(req,res)=>{
    TaskResponse={};
    var userData=await GetUserByIdentifier(req.params.identifier)
    try{
        var user=req.user;
        if(await AuthenticateUser(userData.email,user.email)){
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
                             {$eq:["$developerId",req.params.identifier]}
                         ]
                    }
                }
            },
            {
                "$group":{_id:"$taskStatus",count:{$sum:1}}
            }
        ])

        TaskResponse.responseCode="200";
        TaskResponse.responseMessage="Success";
        TaskResponse.TaskCount=countlist;

        }
        else
        {
        TaskResponse.responseCode="403";
        TaskResponse.responseMessage="Unauthorized";
        }
    }catch(error){
        TaskResponse.responseCode="500";
        TaskResponse.responseMessage="server Error";
    }finally{
        res.send(TaskResponse)
    }
})

Router.post("/status/:identifier",verifyToken,async(req,res)=>{
    TaskResponse={};
    var userData=await GetUserByIdentifier(req.params.identifier)
    try{
        var user=req.user;
        if(await AuthenticateUser(userData.email,user.email)){
   
        var statusid=req.body.status;
console.log(statusid)
        const filter={taskId:req.body.identifier}
        const updateq={taskStatus:statusid}
       
        let val=await Tasks.findOneAndUpdate(filter,updateq,{
            returnOriginal:false
        });

 
        if(val!=null && val!=undefined && val!=""){
        TaskResponse.responseCode="200";
        TaskResponse.responseMessage="Success";
        }else{
            TaskResponse.responseCode="401";
            TaskResponse.responseMessage="unsuccess";
        }

        }
        else
        {
        TaskResponse.responseCode="403";
        TaskResponse.responseMessage="Unauthorized";
        }
    }catch(error){
        TaskResponse.responseCode="500";
        TaskResponse.responseMessage="server Error";
    }finally{
        res.send(TaskResponse)
    }
})

Router.get("/download/:identifier",async(req,res)=>{
    var identifier=req.params.identifier;

    if(identifier!=null && identifier!="")
    {
        var attachement=await Attacements.findOne({taskId:identifier}).then((data)=>{return data;});

        if(attachement!=null)
        {
            var originalpath=attachement.path;
            if(originalpath!=null && originalpath!="")
            {
                var content={fileName:"",base64:""}
                const contents = fs.readFileSync('Files/'+originalpath, {encoding: 'base64'});
                content.base64=contents;
                content.fileName=attachement.orginalName;
                res.send(content);
            }
        }
    }
})




module.exports=Router;