import axios from 'axios'

const adminApi=axios.create({
    baseURL:`http://localhost:3000/admin`,
})

export async function adminLogin(loginData){
    try{
        const data=await adminApi.post("/login",loginData)
        return data;
    }catch(error){
        console.log(error.message)
    }
}
export const userListDetails=async()=>{
    try{
        const data=await adminApi.get('/userList')
    return data;
}catch(error){
    console.log(error.message)
}
}
export const deleteUser=async(userId)=>{
    try{
        const data=await adminApi.post(`/deleteUser/${userId}`)
        return data;
    }catch(error){
        console.log(error.message)
    }
}

export const addUser=async(userData)=>{
    try{
        console.log("addUser")
        const data=await adminApi.post('/addUser',userData)
        return data;
    }catch(error){
        console.log(error.message)
    }
}

export const editUser=async(userData)=>{
    try{
       
        const data=await adminApi.get(`/editUser/${userData}`)
        return data;

    }catch(error){
        console.log(error.message)
    }
}
export const updateUser=async(id,userData)=>{
    try{
        const {name,email,phone}=userData;
        console.log(id,name,email,phone)
        const data=await adminApi.post('/updateUser',{
            id,name,email,phone
        })
        return data;
    }catch(error){
        console.log(error.message)
    }   
}