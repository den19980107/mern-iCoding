import React, { createContext, useState, useEffect } from "react";
const context = createContext(null);

const UserProvider = ({ children }) => {
   const [user, setUser] = useState({});

   useEffect(() => {
      fetch("http://localhost:5000/auth/login/success", {
         method: "GET",
         credentials: "include",
         headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true
         }
      })
         .then(response => {
            if (response.status === 200) return response.json();
            throw new Error("failed to authenticate user");
         })
         .then(responseJson => {
            console.log(responseJson.user)
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