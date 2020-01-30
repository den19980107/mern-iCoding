import React, { createContext, useState, useEffect, useContext } from "react";
import history from "../history";
import ClassDataProvider from './ClassDataProvider'
import axios from "axios";
const context = createContext(null);

const UserInfoProvider = ({ children, id }) => {
   const [userInfo, setUserInfo] = useState({});
   useEffect(() => {
      getData()
   }, []);

   async function getData() {
      if (id) {
         let userInfoRes = await axios.get("/user/info/" + id)
         if (userInfoRes.request.status == 200) {
            setUserInfo(userInfoRes.data)
         } else {
            setUserInfo(null)
         }
      }
   }

   return (
      <context.Provider value={userInfo}>
         {children}
      </context.Provider>
   );
};

UserInfoProvider.context = context;

export default UserInfoProvider;