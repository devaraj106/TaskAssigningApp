import React, { useState } from 'react'
import{BrowserRouter,Routes,Route} from'react-router-dom'
import LogIn from './Pages/logIn'
import SignUp from './Pages/signUp'
import Error from './Pages/error'
import LoginLayout from './Pages/loginLayout'
import DashBoard from './Pages/dashBoard'
import Home from './Pages/home'
import MyTasks from './Pages/myTasks'
import Taskassigner from './Pages/taskassigner'
import {UserContext} from './Context/context'
import ProtectedRoutes from './Authentication/protectedRoutes'

function App() {
  const[User,setUser]=useState(null);
  return (
    <UserContext.Provider value={{User,setUser}}>

   <BrowserRouter>
   <Routes>

<Route path='/' element={<LogIn></LogIn>}>
</Route>
<Route path='/signup' element={<SignUp></SignUp>}>
</Route>

<Route path='/dashboard' element={<ProtectedRoutes/>}>
    <Route path=':id' element={<DashBoard></DashBoard>} />
    <Route path='home' element={<Home></Home>}>
      
    </Route>
<Route path='mytasks' element={<MyTasks></MyTasks>}></Route>
<Route path='assigntasks' element={<Taskassigner></Taskassigner>}></Route>
</Route>


<Route path='*' element={<Error></Error>}></Route>

   </Routes>
   </BrowserRouter>
   
   </UserContext.Provider>
  )
}

export default App