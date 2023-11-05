import React from 'react'
import { Navigate } from 'react-router-dom'

const UserPublic = (props) => {
try{
  const token=localStorage.getItem('token')
  if(token){
    return <Navigate to="/"/>
  }else{
    <Navigate to="/login"/>
    return props.children
  }
}catch(err){
  console.log(err.message)
 }
}

export default UserPublic
