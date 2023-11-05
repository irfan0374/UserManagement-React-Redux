const user=require('../Model/UserModel');
const bcrypt=require('bcrypt');
const jwt=require("jsonwebtoken");
require('dotenv').config()

const securePassword=async(password)=>{
    try{
        const passwordHash=bcrypt.hash(password,10);
        return passwordHash;
    }catch(error){
        console.log(error.message);
    }
}

const adminLogin=async (req,res)=>{
    try{
        const{email,password}=req.body;
        const emailExist=await user.findOne({email:email});
    if(emailExist){
        if(emailExist.isAdmin===1){
            const access=await bcrypt.compare(password,emailExist.password)
            if(access){
                const adminToken=jwt.sign({adminId:emailExist._id},process.env.SECRET_KEY,{expiresIn:'1hr'})
            res.json({adminData:emailExist,alert:"success",adminToken,status:true})
            }else{
                res.json({alert:"password is incorrect"})
            }
        }else{
            res.json({alert:"You are not admin"})
        }
    }else{
        res.json({alert:"Email does not exist"})
    }
}catch(error){
    console.log(error.message)
}

};

const UserList=async(req,res)=>{
try{
    const userData=await user.find({isAdmin:0})
    if(userData){
        res.json({userData,status:true})
    }else{
        res.json({status:false})
    }
}catch(error){
    console.log(error.message)
}

}

const addUserData=async(req,res)=>{
    try{
        const{email,name,phone,password}=req.body;
        console.log(phone)
        const emailExist  = await user.findOne({email:email})
    console.log(emailExist,"emailexist")
    if(emailExist){
        res.json({alert:"Email is already exist"})
    }else{
        const spassword=await securePassword(password)
        const users=new user({
            email:email,
            name:name,
            phone:phone,
            password:spassword,
            isAdmin:0
        })
        const UserData =await users.save();
        console.log(UserData)
        console.log("success")
        const token=jwt.sign({userData:UserData},process.env.SECRET_KEY,{expiresIn:'1hr'})
        res.json({UserData,token,status:true,alert:"Registration"})
    }
    }catch(error){
        console.log(error.message)
    }
};
const EditUserData=async(req,res)=>{
    try{
        const {id}=req.params;
        const userData=await user.findById(id)
        if(userData){
            res.json({userData,status:true,message:"Data found"})
        }else{
            res.json({status:false,message:"Data not found"})
        }

    }catch(error){
         console.log (error.message)
    }
}

const updataUserDetails=async(req,res)=>{
    try{
       
        const {id,name,email,phone}=req.body;
        const updateData=await user.updateOne({_id:id},{$set:{name,email,phone}})
        if(updateData){  
           res.json({userData:updateData,status:true,alert:"Updated"})
        }else{
            res.json({status:true,alert:"updation failed"})
        }
    }catch(error){
        console.log(error.message)
    }
}
const DeleteUser=async(req,res)=>{
    try{
        console.log(id)
        const UserData=await user.deleteOne({_id:id})
        if(UserData){
            res.json({deleted:true})
            
        }else{
            res.json({deleted:false})
        }

    }catch(error){
        console.log(error.message)
    }
}
module.exports={
    DeleteUser,
    updataUserDetails,
    EditUserData,
    addUserData,
    UserList,
    adminLogin

}