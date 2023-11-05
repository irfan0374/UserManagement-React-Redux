import React from 'react'
import {Routes,Route}from 'react-router-dom'
import AdminPublic from '../Routes/AdminPublic'
import AdminProtect from '../Routes/AdminProtect';

import AddUser from '../Pages/AdminPage/addUser/addUser'
import EditUser from '../Pages/AdminPage/editUser/editUser'
import Dashboard from '../Pages/AdminPage/Dashbosrd/Dashboard'
import AdminLogin from '../Pages/AdminPage/adminLogin/AdminLogin';



const AdminRoute = () => {
  return (
    <Routes>
      <Route path='/'element={<AdminPublic><AdminLogin/></AdminPublic>}/>
      <Route path='/dashboard'element={<AdminProtect><Dashboard/></AdminProtect>}/>
      <Route path='/addUser'element={<AdminProtect><AddUser/></AdminProtect>}/>
      <Route path='/editUser/:id'element={<AdminProtect><EditUser/></AdminProtect>}/>
    </Routes>
  )
}

export default AdminRoute;
