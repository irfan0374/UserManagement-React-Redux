import React from 'react'
import { Navigate } from 'react-router-dom'

const AdminPublic = (props) => {
  
   if(localStorage.getItem('adminToken')){
         return <Navigate to='/admin/dashboard'/>
   }else{
          return props.children;
   }

}

export default AdminPublic;
