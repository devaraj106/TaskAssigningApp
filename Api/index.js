const express=require('express');
require('dotenv').config();
const users=require('./Routers/Users.js');
const tasks=require('./Routers/Tasks.js')
const fileupload=require('./Routers/FileUpload.js')
const mongoose=require('mongoose');
const cors=require('cors');
const port=process.env.PORT;
const connectionstring=process.env.CONSTRING;
const app=express();
app.use(cors());

 async function DbConnect()
{


  
try{
  console.log("in")
    mongoose.set("strictQuery", false);
  mongoose.connect(connectionstring);
  console.log('connected');
}catch(error){
console.log(error,'error')
}
}

DbConnect();

app.use(express.json());
app.use("/Users",users);
app.use("/Tasks",tasks);
app.use("/FileUplod",fileupload);







app.listen(port,()=>{
    console.log(`listen at ${port}`)
});