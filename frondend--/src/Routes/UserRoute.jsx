import {Routes,Route}from 'react-router-dom'
import Login from '../Pages/UserPage/Login/Login'
import {Signup} from '../Pages/UserPage/Signup/Signup'
import Home from '../Pages/UserPage/Home/Home';
import UserPublic from './UserPublic';
import UserProtect from './UserProtect';
import Profile from '../Pages/UserPage/Profile/Profile';
import About from '../Pages/UserPage/NewPage/About'

const UserRoute = () => {
  return (
<Routes>
    <Route path='/login' element={<UserPublic><Login/></UserPublic>}/>
    <Route path='/signup' element={<UserPublic><Signup/></UserPublic>}/>
    <Route path='/' element={<Home/>}/> 
    <Route path='/profile'  element={<Profile/>}/>
</Routes>
  )
}
export default UserRoute



