import React, { useContext } from 'react';
import ClassDataProvider from '../../context/ClassDataProvider';
import UserProvider from '../../context/UserProvider';
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer'
import history from '../../history';
import axios from 'axios';
import './ClassDashBoard.css'

// import componet 
import { Card, Row, Col, Button, Icon, message } from 'antd';
import UserInfoCard from '../../components/UserInfoCard/UserInfoCard'
import { useState } from 'react';
import { useEffect } from 'react';
import ClassStatusButton from './ClassStatusButton';


const ClassDashBoard = () => {
   const data = useContext(ClassDataProvider.context);
   const user = useContext(UserProvider.context)
   const classData = data.classInfo
   const teacherData = data.teacherInfo
   const classStudents = data.classStudents

   const [isInClass, setIsInClass] = useState(false)

   return (
      <div >
         <header>
            <div className="overlay"></div>
            <video className="video-thumbnails" src={classData.introVideoUrl}></video>
            <div className="container h-100">
               <div className="d-flex h-100 text-center align-items-center">
                  <div className="w-100 text-white">
                     <h3 style={{ color: "white" }}>{classData.name}</h3>
                     <VideoPlayer style={{ width: "70%" }} className="video-player" src={classData.introVideoUrl}></VideoPlayer>
                  </div>
               </div>
            </div>
         </header>
         <div className="info-session">
            <div className="info-list ">
               <div className="info-box ">
                  <Icon className="icon" type="file-text" />
                  <p>10 篇教材</p>
               </div>
               <div className="info-box">
                  <Icon className="icon" type="youtube" />
                  <p>20 部影片</p>
               </div>
               <div className="info-box ">
                  <Icon className="icon" type="form" />
                  <p>10 個小考</p>
               </div>
            </div>
            <div className="info-list ">
               <ClassStatusButton user={user} classData={classData} setIsInClass={setIsInClass}></ClassStatusButton>
            </div>
         </div>

         <div className="container mt">
            <div className="row">
               <div className="p-3 col-lg-8">
                  <Row gutter={16} className="mb-3">
                     <Col span={8}>
                        <Card title="學分" className="class-info-card" style={{ boxShadow: "0 2px 8px 0 rgba(0,0,0,0.12)" }}>
                           {classData.credit ? classData.credit : "loading.."} 學分
                        </Card>
                     </Col>
                     <Col span={8}>
                        <Card title="上課教室" className="class-info-card" style={{ boxShadow: "0 2px 8px 0 rgba(0,0,0,0.12)" }}>
                           {classData.classRoom ? classData.classRoom : "loading.."}
                        </Card>
                     </Col>
                     <Col span={8}>
                        <Card title="上課人數" className="class-info-card" style={{ boxShadow: "0 2px 8px 0 rgba(0,0,0,0.12)" }}>
                           {classStudents ? classStudents.length : "loading"}
                        </Card>
                     </Col>
                  </Row>
                  <div className="introduction" dangerouslySetInnerHTML={{ __html: classData.introduction ? classData.introduction : "loading.." }}>
                  </div>
               </div>
               <div className="p-3 col-lg-4">
                  <Card title="上課時間" style={{ boxShadow: "0 2px 8px 0 rgba(0,0,0,0.12)" }}>
                     {classData.classTime ?
                        classData.classTime.map(classTime => (
                           <span key={classTime.id}>{classTime.time}</span>
                        )) : "loading.."
                     }

                  </Card>
                  <UserInfoCard userInfo={teacherData} style={{ marginTop: "1rem" }}></UserInfoCard>
               </div>

            </div>
         </div>
      </div >
   );
};

export default ClassDashBoard;