import React, { createContext, useState, useEffect } from "react";
import history from "../history";
import config from '../config/default'
const context = createContext(null);

const UserProvider = ({ children }) => {
   const [user, setUser] = useState({});

   useEffect(() => {
      fetch(`${config.serverUrl}/auth/login/success`, {
         method: "GET",
         credentials: "include",
         headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true
         }
      })
         .then(response => {
            if (response.status === 200) {
               return response.json();
            } else {
               history.push("/login")
            }
         })
         .then(responseJson => {
            setUser(responseJson.user)
         })
         .catch(error => {
            setUser(null)
         });

   }, []);

   return (
      <context.Provider value={user}>
         {children}
      </context.Provider>
   );
};

UserProvider.context = context;

export default UserProvider;