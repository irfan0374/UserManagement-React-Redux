import React from 'react'
import { Navigate } from 'react-router-dom'

const AdminProtect = (props) => {
if(localStorage.getItem("adminToken")){
  return props.children
}else{
  return <Navigate to='/admin'/>
}
}

export default AdminProtect
