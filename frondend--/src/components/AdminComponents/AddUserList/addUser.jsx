import React, { useState } from 'react';
import { Button, Card, Input, Typography } from "@material-tailwind/react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import "react-toastify/dist/ReactToastify.css";

import { setUserDetails } from '../../../../Redux/userSlice';
import { addUser } from '../../../Api/adminApi';


const AddUser = () => {
  const [value, setValue] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        
      if (value.name.trim() === "") {
        toast("Please enter your name");
      } else if (value.phone.trim() === "") {
        toast("Please enter your number");
      } else if (value.email.trim() === "") {
        
        toast("Please enter your email");
      } else if (value.password.trim() === "") {
        toast("Please enter your password");
    } else {
        const response=await addUser(value);
        if(response.data.status){
            const {_id,name,phone,email,isAdmin,image}=response.data.UserData
            console.log(name)
                localStorage.setItem('token',response.data.token)
                dispatch(
                    setUserDetails({
                        id:_id,
                        name:name,
                        phone:phone,
                        email:email,
                        image:image,
                        isAdmin:isAdmin

                    })
                );
                navigate('/admin/dashboard')
            
        }
        toast(response.data.alert);
    }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="w-full flex justify-center pt-4">
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Add user details
        </Typography>
        <form
          onSubmit={handleSubmit}
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
        >
          <div className="mb-4 flex flex-col gap-6">
            <Input
              name="name"
              onChange={(e) =>
                setValue({ ...value, [e.target.name]: e.target.value })
              }
              size="lg"
              label="Name"
            />
            <Input
              name="phone"
              onChange={(e) =>
                setValue({...value, [e.target.name]: e.target.value })
              }
              size="lg"
              label="Number"
            />
            <Input
              name="email"
              onChange={(e) =>
                setValue({ ...value, [e.target.name]: e.target.value })
              }
              size="lg"
              label="Email"
            />
            <Input
              name="password"
              onChange={(e) =>
                setValue({ ...value, [e.target.name]: e.target.value })
              }
              type="password"
              size="lg"
              label="Password"
            />
          </div>
          <Button type="submit" className="mt-6" fullWidth>
            Submit
          </Button>
          <ToastContainer />
        </form>
      </Card>
    </div>
  );
};

export default AddUser;
