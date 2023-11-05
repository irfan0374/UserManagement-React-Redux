
import React from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { useDispatch } from "react-redux"
import {logoutDetails} from '../../../../Redux/userSlice'
import { useNavigate } from "react-router-dom";

const AdminHeader = () => {
    const navigate=useNavigate()
    const dispatch=useDispatch()

    
    const handleLogout=()=>{
        localStorage.removeItem("adminToken")
       dispatch(
        logoutDetails({
            id:"",
            name:"",
            email:'',
            phone:'',
            isAdmin:'',
            image:'',
        })
       )
       navigate('/admin')

    }
  return (
    <div className="w-full">
    <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none py-2 px-4 lg:px-8 lg:py-4">
      <div className="flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          className="mr-4 cursor-pointer py-1.5 font-medium"
        >
          Admin Dashboard
        </Typography>
        <div className="flex items-center gap-4">
          <div className="mr-4 hidden lg:block"></div>
          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
           
          >
          </IconButton>
        </div>
      </div>
    
       
      <Button onClick={handleLogout} variant="gradient" size="xm" fullWidth className="mb-5 text-sm"> {/* or className="mb-5 px-2 py-1" */}
  <span>Logout</span>
</Button>
   
    </Navbar>
  </div>
  )
}

export default AdminHeader
