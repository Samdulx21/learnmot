import React from "react";
 
import {
    Navigate ,
    useLocation
  } from "react-router-dom";


export const setToken = (token) =>{
    // set token in localStorage
    localStorage.setItem('token', token)
}

export const setTokenType = (token_type) => {
    localStorage.setItem('token_type', token_type)
}

// export const setTokenUserData = (user_data) => {
//     localStorage.setItem('user_data', user_data)
// }

export const fetchToken = (token) =>{
    // fetch the token
    return localStorage.getItem('token')
}

export function RequireToken({children}) {
     
    let auth = fetchToken()
    let location = useLocation();
   
    if (!auth) {
       
      return <Navigate to="/" state={{ from: location }} />;
    }
   
    return children;
}