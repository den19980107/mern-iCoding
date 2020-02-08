import React, { useState, useEffect } from 'react';
import axios from 'axios'
// import component
import ClassListItem from './ClassListItem';

const MyStudyClass = ({ user }) => {
   const [myStudyClass, setMyStudyClass] = useState([]);
   useEffect(() => {
      if (user) {
         getMyStudyClassData();
      }
   }, [user])
   const getMyStudyClassData = async () => {
      let myStudyClassRes = await axios.get('/api/user/myStudyClass/' + user._id);

      if (myStudyClassRes.request.status == 200) {
         setMyStudyClass(myStudyClassRes.data)
      }
   }
   return (
      <div>
         {myStudyClass.map((classData) => (
            <ClassListItem classData={classData}></ClassListItem>
         ))}
      </div>
   );
};

export default MyStudyClass;