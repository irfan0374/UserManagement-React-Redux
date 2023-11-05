const express=require("express");
const userRoute=express();
const userController=require('../Controller/UserController')
const {uploadOptions}=require('../Config/multer')


userRoute.post('/signup',userController.userRegistration)
userRoute.post('/login',userController.userLogin)

userRoute.post('/profileImage', uploadOptions.single('image'),userController.addProfileImage);


module.exports=userRoute;