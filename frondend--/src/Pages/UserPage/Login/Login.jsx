import {Card,CardHeader,CardBody,CardFooter,Typography,Input,Checkbox,Button} from "@material-tailwind/react";
import {ToastContainer,toast}from "react-toastify";
import {Link,useNavigate}from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";

import { setUserDetails } from "../../../../Redux/userSlice";
import { userLogin } from '../../../Api/userApi'

   function Login() {
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const dispatch=useDispatch()
    const navigate= useNavigate()

    const handleLogin=async(e)=>{
      e.preventDefault();
      try{
        const response=await userLogin({email,password});
        if(response.data.status){
          localStorage.setItem("token",response.data.token);
          const {_id,name,email,phone,image,isAdmin}=response.data.userData;
          console.log(_id,'login id');
          dispatch(setUserDetails({
            id:_id, 
            name:name,
            phone:phone,
            email:email,
            image:image,
            isAdmin:isAdmin,
          })
          )
          navigate("/")
        }else{
          toast(response.data.alert);
        }

      }catch(error){
        console.log(error.message)
      }
    }
    return (
    <div className="flex justify-center items-center h-screen">
    <Card className="w-96 ">
        <CardHeader
          variant="gradient"
          color="gray"
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography variant="h3" color="white">
            Sign In
          </Typography>
        </CardHeader>
          <form 
          onSubmit={handleLogin}>
        <CardBody className="flex flex-col gap-4">
          <Input 
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          label="Email" 
          size="lg" 
          />
          <Input label="Password" size="lg"
          type="password"
          onChange={(e)=>setPassword(e.target.value)}
          />
        </CardBody>
        <CardFooter className="pt-0">
          <Button type="submit" variant="gradient" fullWidth>
            Sign In
          </Button>
          <Typography variant="small" className="mt-6 flex justify-center">
            Don&apos;t have an account?
            <Typography
              as="a"
              href="#signup"
              variant="small"
              color="blue-gray"
              className="ml-1 font-bold"
            >
              <Link to={'/signup'}>
              Sign Up
              </Link>
            </Typography>
          </Typography>
        </CardFooter>
           <ToastContainer />
        </form>
      </Card>
      </div>
    );
  }

  export default Login
  