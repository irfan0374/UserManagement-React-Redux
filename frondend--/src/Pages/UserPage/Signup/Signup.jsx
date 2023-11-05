import {Card,CardHeader,CardBody,CardFooter,Typography,Input,Checkbox,Button,} from "@material-tailwind/react";
import { useNavigate,Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import{useState}from 'react';
import {useDispatch}from "react-redux"
import { userSignup } from "../../../Api/userApi";
import { setUserDetails } from "../../../../Redux/userSlice";

   
  export function Signup() {
    const [name,setName]=useState("");
    const [phone,setPhone]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")

    const navigate=useNavigate();
    const dispatch=useDispatch();

    const handleSubmit=async(e)=>{
      e.preventDefault();
      try{
        if(name.trim==""){
          toast("please enter the name");
        }else if (phone.trim==""){
          toast("please enter the Phone number")
        }
        else if (email.trim==""){
          toast("please enter the Email")
        }
        else if (password.trim==""){
          toast("please enter the Password")
        }else{
         
          const response=await userSignup({name,phone,email,password})
          if(response.data.status){
            console.log(response.data.status)
            localStorage.setItem("token",response.data.token);
            const {_id,name,email,phone,image,isAdmin}=response.data.userData;
            dispatch(
              setUserDetails({
                id:_id,
                name:name,
                email:email,
                phone:phone,
                image:image,
                isAdmin:isAdmin,
              })
              );
              navigate("/")
            }else{
              toast(response.data.alert)
            }
        }
      }catch(err){
        console.log(err.message)
      }
    }
    return (
        <div className="flex justify-center items-center h-screen">
      <Card className="w-96">
        <CardHeader
          variant="gradient"
          color="gray"
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography variant="h3" color="white">
            Sign Up
          </Typography>
        </CardHeader>
        <form onSubmit={handleSubmit}>
        <CardBody className="flex flex-col gap-4">
          <Input label="Name" size="lg" type="text" value={name} onChange={(e)=>setName(e.target.value)}/>
          <Input label="Phone" size="lg"  type="text" value={phone} onChange={(e)=>setPhone(e.target.value)} />
          <Input label="Email" size="lg" type="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
          <Input label="Password" size="lg" type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
        </CardBody>
        <CardFooter className="pt-0">
          <Button variant="gradient" type="submit">
            Sign Up
          </Button>
          <Typography variant="small" className="mt-6 flex justify-center">
          You already have an account?
            <Typography
              as="a"
              href="#signup"
              variant="small"
              color="blue-gray"
              className="ml-1 font-bold"
            >
              <Link to={"/login"}>
              Login
              </Link>
            </Typography>
          </Typography>
        </CardFooter>
          </form>
          <ToastContainer />
      </Card>
      </div>
    );
  };