const mongoose=require('mongoose');


const userschema=new mongoose.Schema({
    identifier:{type:String,required:false},
    firstName:String,
     
    lastName:String,
    phoneNumber:{type:Number,required:false},
    age:{type: Number, min: 1, max: 65},
    roleId:{type: Number,default:2,required:true},
    mId:{type:String,required:false},
    email:{type:String,unique:true,required:true},
    password:String,
    country:Number,
    createdDate:{type:Date,default:Date.now,required:false}
    
});
const countryschema=new mongoose.Schema({
    countryId:{type:Number,required:true,unique: true},
    countryName:String,
    createdDate:{type:Date,default:Date.now,required:false},
    flagDelete:{type:Boolean,default:false,required:false},

})

const roleschema=new mongoose.Schema({
    roleId:{type:Number,required:true,unique: true},
    roleName:String,
    createdDate:{type:Date,default:Date.now,required:false},
    flagDelete:{type:Boolean,default:false,required:false},


})

const statusMasterschema=new mongoose.Schema({
    statusId:{type:Number,required:true,unique:true},
    statusName:String,
    createdDate:{type:Date,default:Date.now,required:false},
    flagDelete:{type:Boolean,default:false,required:false},
})

const taskschema=new mongoose.Schema({
    taskId:String,
    taskName:{type:String,required:true},
    taskDescription:{type:String,required:true},
    taskStatus:{type:Number,default:1},
    assignedBy:String,
    developerId:{type:String,required:true},
    createdDate:{type:Date,default:Date.now,required:false},
})


const attachementschema=new mongoose.Schema({
    fileId:String,
    path:{type:String,required:true},
    orginalName:{type:String,required:true},
    taskId:{type:String},
    createdDate:{type:Date,default:Date.now,required:false}
})

var UserRequest={
    email:String,
    password:String
}


var UserResponse={
    responseCode:String,
    responseMessage:String,
    token:{type:String,default:""},
    Users:userschema
}

var TaskResponse={
    responseCode:String,
    responseMessage:String,
    TaskCount:[],
    Tasks:[]
}

const users=mongoose.model('users',userschema);
const countrymaster=mongoose.model("countrymaster",countryschema);
const rolemaster=mongoose.model("rolemaster",roleschema);
const tasks=mongoose.model("tasks",taskschema);
const statusmaster=mongoose.model("statusmaster",statusMasterschema);
const attachements=mongoose.model("attachements",attachementschema);

module.exports={
    Users:users,
    CountryMaster:countrymaster,
    RoleMaster:rolemaster,
    Tasks:tasks,
    StatusMaster:statusmaster,
    Attacements:attachements,
    UserResponse:UserResponse,
    TaskResponse:TaskResponse,
    UserRequest:UserRequest
}