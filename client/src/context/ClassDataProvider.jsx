import React, { createContext, useState, useEffect } from "react";
import history from "../history";
import axios from 'axios';
const context = createContext(null);

const ClassDataProvider = ({ id, children }) => {
   const [data, setData] = useState({ classInfo: {}, teacherInfo: {}, classStudents: null });

   useEffect(() => {

      getData()

   }, []);

   async function getData() {
      let classDataRes = await axios.get("/api/class/" + id);
      if (classDataRes.request.status == 200) {
         console.log(classDataRes.data)
         setData(classDataRes.data)
      } else {
         // 先 push 到 class 再到 notfound 避免使用者按上一頁又回到 notfound
         history.push("/class")
         history.push("/notfound")
      }
   }
   return (
      <context.Provider value={data}>
         {children}
      </context.Provider>
   );
};

ClassDataProvider.context = context;

export default ClassDataProvider;
