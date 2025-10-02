import React from 'react'
import {Routes,Route} from "react-router-dom";
import Signup from './Components/Signup';
import Login from './Components/Login';
import Logout from './Components/Logout';
import ForgotPassword from './Components/ForgotPassword';
export const ServerUrl="http://localhost:4000/api/v1";
function App() {
  return (
    <Routes>
      <Route path='/signup' element={<Signup/>}/>
       <Route path='/login' element={<Login/>}/>
        <Route path='/logout' element={<Logout/>}/>
        <Route path='/forgot-passowrd' element={<ForgotPassword/>}/>
    </Routes>
  )
}

export default App