import React, { useState, useEffect } from 'react';
import axios from 'axios'

// import Component
import ClassListItem from './ClassListItem';


const MyClass = ({ user }) => {
   const [myClass, setMyClass] = useState([]);
   useEffect(() => {
      if (user) {
         getMyClassData();
      }
   }, [user])

   const getMyClassData = async () => {
      let myClassRes = await axios.get('/user/myClass/' + user._id);

      if (myClassRes.request.status == 200) {
         setMyClass(myClassRes.data)
      }
   }

   return (
      <div>
         {myClass.map((classData) => (
            <ClassListItem classData={classData}></ClassListItem>
         ))}
      </div>
   );
};

export default MyClass;