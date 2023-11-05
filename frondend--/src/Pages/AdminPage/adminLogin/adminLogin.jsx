import { Card, Typography, Input } from "@material-tailwind/react";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {useDispatch} from 'react-redux'
import "react-toastify/dist/ReactToastify.css";

import {adminLogin}from '../../../Api/adminApi'
import {setUserDetails} from '../../../../Redux/userSlice'
function AdminLogin() {
const [value,setvalue]=useState({email:'',password:''})

const navigate=useNavigate()
const dispatch=useDispatch()

const HandleLogin=async(e)=>{
  e.preventDefault();
  try{

  const {email,password}=value;

  if(email.trim()===''){
    toast.info("Please Check the email")
  }else if(password.trim()===""){
    toast.info("please enter the password")
  }else{
    const response=await adminLogin(value)

    if(response.data.status){

      localStorage.setItem('adminToken',response.data.adminToken)
   
    dispatch(
      setUserDetails({
     id:response.data.adminData._id,
     name:response.data.adminData.name,
     email:response.data.adminData.email,
     phone:response.data.adminData.phone,
     isAdmin:response.data.adminData.isAdmin,
     image:response.data.adminData.image

      })
      );
    
    navigate('/admin/dashboard');
    }else{
      toast.error(response.data.alert)
    }
  }
}catch(error){
  console.log(error.messge)
}
  
}

  return (
    <div className="w-full flex justify-center items-center h-screen bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-400">
      <Card color="transparent" shadow={false} className="bg-white p-8 rounded-lg">
        <Typography variant="h4" color="blue-gray" className="text-center mb-4 text-2xl font-semibold text-gray-800">
        AdminLogin
        </Typography>
        <form className="mt-4" onSubmit={HandleLogin}>
          <div className="mb-4 flex flex-col gap-4">
            <Input
              type="email"
              id="email"
              name="email"
              size="lg"
              placeholder="Your email"
              onChange={(e)=>
                setvalue({...value,[e.target.name]:e.target.value})
              }
              className="border-none focus:ring-2 focus:ring-blue-500"
            />
            <Input
              type="password"
              id="password"
              name="password"
              size="lg"
              placeholder="Your password"
              onChange={(e)=>
                setvalue({...value,[e.target.name]:e.target.value})
              }
              className="border-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:opacity-90 p-2 rounded-lg w-full"
          >
            Sign In
          </button>
        </form>
        <ToastContainer/>
      </Card>
    </div>
  );
}

export default AdminLogin;
