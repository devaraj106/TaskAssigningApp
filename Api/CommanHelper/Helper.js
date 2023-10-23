const bcrypt=require('bcryptjs');



const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

const GenerateIdentifier=async(length) => {
    let identifier = ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        identifier += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return identifier.trim();
}


const hashpass=async(password)=>{
    var hashpass=await bcrypt.hash(password,10)
    return hashpass;
}

const Comparepass=async(password,encryptedpass)=>{

if(encryptedpass=="" && encryptedpass==null && encryptedpass==undefined){return false;}

    var result=await bcrypt.compare(password,encryptedpass);
   
    return result;
}



module.exports={
    hashpass:hashpass,
    comparepass:Comparepass,
    GenerateIdentifier:GenerateIdentifier
}