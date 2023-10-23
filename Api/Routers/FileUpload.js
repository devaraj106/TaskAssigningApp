const express=require('express');
const multer=require('multer');
var{TaskResponse,Tasks}=require('../models/Model.js')
const{verifyToken}=require('../DAL/TokenDAL.js');
const{AuthenticateUser}=require('../DAL/TokenDAL.js');
const { GenerateIdentifier } = require('../CommanHelper/Helper.js');
const{GetUserByIdentifier}=require('../DAL/UserDAL.js');
const { fileupload } = require('../DAL/FileUploadDAL.js');

 
const Router=express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "Files/")
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname)
    },
  })

  const uploadStorage = multer({ storage: storage })

  Router.post("/single",uploadStorage.single('File'),fileupload)

  module.exports=Router;