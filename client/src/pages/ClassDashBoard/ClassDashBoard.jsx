import React, { useContext, useState, useEffect } from 'react';
import ClassDataProvider from '../../context/ClassDataProvider';
import UserProvider from '../../context/UserProvider';
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer'
import history from '../../history';
import axios from 'axios';
import './ClassDashBoard.css'

// import componet 
import { Card, Row, Col, Button, Icon, message, Modal } from 'antd';
import UserInfoCard from '../../components/UserInfoCard/UserInfoCard'
import VideoUploader from '../../components/VideoUploader/VideoUploader'
import ClassStatusButton from './ClassStatusButton';
import Loader from '../../components/Loader/Loader';
import useMaterial from '../../context/useMaterial';


const ClassDashBoard = () => {
   const data = useContext(ClassDataProvider.context);
   const user = useContext(UserProvider.context)
   const [classId, setClassId] = useState("")
   const classData = data.classInfo
   const teacherData = data.teacherInfo
   const classStudents = data.classStudents
   const [videos, materials, tests] = useMaterial(classId)
   const [isInClass, setIsInClass] = useState(false)
   const [changeVideoModalVisable, setChangeVideoModalVisable] = useState(false)
   const [newVideoUrl, setNewVideoUrl] = useState(null)

   useEffect(() => {
      setClassId(classData._id)
   }, [classData])

   const openChangeVideoModal = () => {
      setChangeVideoModalVisable(true)
   }

   const cancelChangeVideo = () => {
      setChangeVideoModalVisable(false)
   }

   const changeVideo = async () => {
      if (newVideoUrl) {
         try {
            const { data } = await axios.post('/api/class/updateIntroVideo', {
               newIntroVideoUrl: newVideoUrl,
               classId: classData._id
            })
            message.success(data.message)
            setChangeVideoModalVisable(false)
            window.location.reload();

         } catch (error) {
            let errors = error.response.data
            for (let i = 0; i < errors.length; i++) {
               message.error(errors[i].msg)
            }
         }
      }
   }

   if (!classData || !teacherData || !classStudents || !user) return (<Loader></Loader>)
   return (
      <div >
         <header>
            <div className="overlay"></div>
            <video className="video-thumbnails">
               <source src={classData.introVideoUrl} type="video/mp4" />
            </video>
            <div className="container h-100">
               <div className="d-flex h-100 text-center align-items-center">
                  <div className="w-100 text-white">
                     <h3 style={{ color: "white" }}>{classData.name}</h3>
                     {user._id == teacherData._id &&
                        <React.Fragment>
                           <Button
                              type="primary"
                              size="large"
                              style={{ position: "absolute", top: "2rem", right: "1rem" }}
                              onClick={openChangeVideoModal}
                           >更改封面影片</Button>
                           <Modal
                              title="更改封面影片"
                              visible={changeVideoModalVisable}
                              onCancel={cancelChangeVideo}
                              onOk={changeVideo}
                           >
                              <VideoUploader onChange={(url) => { setNewVideoUrl(url) }}></VideoUploader>
                           </Modal>
                        </React.Fragment>
                     }
                     <VideoPlayer style={{ width: "70%" }} className="video-player" src={classData.introVideoUrl}></VideoPlayer>
                  </div>
               </div>
            </div>
         </header>
         <div className="info-session">
            <div className="info-list ">
               <div className="info-box ">
                  <Icon className="icon" type="file-text" />
                  <p>{materials ? materials.length + "篇教材" : "loading"}</p>
               </div>
               <div className="info-box">
                  <Icon className="icon" type="youtube" />
                  <p>{videos ? videos.length + "部影片" : "loading"}</p>
               </div>
               <div className="info-box ">
                  <Icon className="icon" type="form" />
                  <p>{tests ? tests.length + "個小考" : "loading"}</p>
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
                           {classData.credit ? classData.credit + " 學分" : "未設定"}
                        </Card>
                     </Col>
                     <Col span={8}>
                        <Card title="上課教室" className="class-info-card" style={{ boxShadow: "0 2px 8px 0 rgba(0,0,0,0.12)" }}>
                           {classData.classRoom ? classData.classRoom : "未設定"}
                        </Card>
                     </Col>
                     <Col span={8}>
                        <Card title="上課人數" className="class-info-card" style={{ boxShadow: "0 2px 8px 0 rgba(0,0,0,0.12)" }}>
                           {classStudents ? classStudents.length : "未設定"}
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