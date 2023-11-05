const express=require("express");
const adminRoute=express();
const adminController=require('../Controller/AdminController');

adminRoute.post('/login',adminController.adminLogin);
adminRoute.get('/userList',adminController.UserList);
adminRoute.post('/addUser',adminController.addUserData);
adminRoute.get('/editUser/:id',adminController.EditUserData);
adminRoute.post('/updateUser',adminController.updataUserDetails);
adminRoute.post('/deleteUser/:id',adminController.DeleteUser);

module.exports= adminRoute;
