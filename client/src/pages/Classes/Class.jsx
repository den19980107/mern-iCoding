import React from 'react';
import ClassList from './ClassList';
import './Class.css'
const Class = () => {
   return (
      <div className="container class-container">
         <div className="banner">
            <h3 style={{ margin: 0 }}>所有課程</h3>
         </div>
         <div style={{ marginTop: "1rem" }}>
            <ClassList></ClassList>
         </div>
      </div>
   );
};

export default Class;