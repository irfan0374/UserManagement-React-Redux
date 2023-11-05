const mongoose=require("mongoose")
const useSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,

    },
    phone:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Number,
        required:true,
    
    },
    image:{
        type: String,
        default: "",
    },
});

const user = mongoose.model("User",useSchema);
module.exports = user;