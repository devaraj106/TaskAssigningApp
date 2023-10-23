

  const fileupload=async(req, res) => {  
    var fileResponse={Path:"",orginalName:""}
    console.log(req.file)
    fileResponse={responseCode:'200',Path:req.file.filename,orginalName:req.file.originalname}
    console.log(fileResponse);
    return res.send(fileResponse);
  }

  module.exports={
    fileupload:fileupload
  }