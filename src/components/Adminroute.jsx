import React, {useEffect, useState} from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { isLoggedIn, getCurrentUser } from '../auth';

const Adminroute=()=> { 
    const [login,setLogin]=useState(false);  
    const [user,setUser]=useState(undefined);  
   

      useEffect(()=>{
        setLogin(isLoggedIn());
        setUser(getCurrentUser());
      },[login]);
    //   console.log(user.role);
      console.log("hi");

    if(isLoggedIn()) {
        return <Outlet />
    }else{
        return <Navigate to={"/signin"}/>;
    }
}

export default Adminroute;