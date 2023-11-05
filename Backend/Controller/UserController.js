const jwt=require('jsonwebtoken')
const mongoose=require('mongoose')
const bcrypt=require('bcrypt');
require('dotenv').config()

const User=require('../Model/UserModel');

const securePassword=async(password)=>{
    try{
        const passwordHash=await bcrypt.hash(password,10)
        return passwordHash
    }catch(error){
        console.log(error.message)
    }
}

const userRegistration=async( req,res)=>{
    try{
        const{name,email,phone,password}=req.body;
        const spassword =await securePassword(password)
        const emailExist=await User.findOne({email:email})
        if(emailExist){
            res.json({alert:"This email is already exist",status:false})
        }else{
            const user=new User({
                name:name,
                phone:phone,
                email:email,
                password:spassword,
                isAdmin:0,
            });
            const userData=await user.save();

            const token=jwt.sign({userId:user},process.env.SECRET_KEY,{
                expiresIn:"1hr",
            })
            res.json({userData,alert:"Registration",status:true,token})
        }
        
    }catch(err){
        console.log(err.message)
    }
}

const userLogin=async(req,res)=>{
    try{
      
        const {email,password}=req.body;
        const emailExist=await User.findOne({email:email})
        if(emailExist){
            const access=await bcrypt.compare(password,emailExist.password);
            if(access){
                const token=jwt.sign({userId:emailExist.id},process.env.SECRET_KEY,{expiresIn:"1hr"});
                           
                 res.json({userData:emailExist,status:true,token})
            }else{
                res.json({alert:"password id incorrect"})
            }
            
        }else{
            res.json({alert:"No account in this email"})
        }

    }catch(err){
        console.log(err.message)
    }
}
const addProfileImage=async(req,res)=>{
    try{
        
        const id=req.body.userId
        const images=req.file.filename;
        const updateImg=await User.findOneAndUpdate(
            {_id:new mongoose.Types.ObjectId(id)},
            {$set: {image:images} },
            {new:true}
        )
        .then((response)=>{
            res.json({updated:true,data:response});
        });
    }catch(error){
        console.log(error.message)
    }
}
module.exports={
    userRegistration,
    userLogin,
    addProfileImage,
}