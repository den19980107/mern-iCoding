import React, { useState, useEffect } from 'react';
import './ClassItem.css'

// import component
import { Badge } from 'react-bootstrap';
import { Avatar } from 'antd';
import history from '../../history'
const ClassItem = ({ classDatas }) => {
   const { classData, teacher } = classDatas;
   function showClass() {
      if (classData._id && classData._id != "") {
         history.push('/class/' + classData._id)
      }
   }
   return (
      <div className="col-sm-12 col-lg-4 col-md-6" onClick={showClass}>
         <Avatar size={64} src={teacher.avatarsUrl} className="class-avatar" style={{
            position: "absolute",
            top: "-15px",
            left: "25px",
            border: "2px solid white"
         }} />
         <div className="classCard">
            <div className="coverImageContainer">
               <img src={classData.coverImage} className="converImage"></img>
            </div>
            <div className="classNameContainer">
               <span className="className">{classData.name}</span>
            </div>
            <div className="classTeacherContainer">
               <span className="classTeacher">
                  <Badge variant="secondary">{teacher.displayName}</Badge>
               </span>
            </div>
            <div className="classOutlineContainer">
               <span className="classOutline">{classData.outline}</span>
            </div>
         </div>
      </div>
   );
};

export default ClassItem;