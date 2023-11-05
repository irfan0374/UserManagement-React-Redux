import {
Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Tooltip,
    useSelect,
  } from "@material-tailwind/react";

   import {useDispatch,useSelector}from 'react-redux'
   import { useState } from "react";

   import { userImage } from "../../Api/userApi";
  import { setUserDetails } from "../../../Redux/userSlice";

  export function ProfileCard() {
    const [images,setImage]=useState(null);
    const dispatch=useDispatch();
    const {id,name,email,image,phone}=useSelector((state)=>state.user)
    const handleUpdateImage=async()=>{
        try{
            const response=await userImage(id,images);
            if(response.data.updated){
                const {_id,name,email,phone,image,mobile,isAdmin}=response.data.data;
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
            }
        }catch(error){
            console.log(error.message)
        }
    }
    return (
        <div className="flex justify-center items-center h-screen">
      <Card className="w-96">
        <CardHeader floated={false} className="h-80">
        <img
            src={
              image
                ? `/images/${image}`
                : "https://th.bing.com/th/id/OIP.puMo9ITfruXP8iQx9cYcqwHaGJ?pid=ImgDet&rs=1"
            }
            alt="card-image"
           
          />
        </CardHeader>
        <CardBody className="text-center">
          <Typography variant="h4" color="blue-gray" className="mb-2">
           {name}
          </Typography>
          <Typography color="blue-gray" className="font-medium" textGradient>
          {email}
          </Typography>
          <Typography color="blue-gray" className="font-medium" textGradient>
          {phone}
          </Typography>
        </CardBody>
        <CardFooter className="pt-0 flex flex-col gap-5">
      
          <input type="file" name="image" accept="image/*"
            onChange={(e)=>setImage(e.target.files[0])}/>
          <div>
            <Button onClick={handleUpdateImage}>Submit</Button>
          </div>
        </CardFooter>
      </Card>
      </div>
    );
  }