import React, { useContext, useState, useEffect } from 'react';
import queryString from 'query-string'
import UserProvider from '../../context/UserProvider';
import UserInfoCard from '../../components/UserInfoCard/UserInfoCard';
import { Icon, message } from 'antd'
import axios from 'axios';
import './Profile.css'

// import component
import Loader from '../../components/Loader/Loader'
import SettingProfile from './SettingProfile';
import MyClass from './MyClass';
import MyStudyClass from './MyStudyClass';
import FigureCaption from 'react-bootstrap/FigureCaption';

const Profile = (props) => {
   const query = queryString.parse(props.location.search)
   const userId = query.id
   const isCurrentUser = !userId
   const currentUser = useContext(UserProvider.context)
   const [displayUser, setDisplayUser] = useState(null)
   useEffect(() => {
      if (currentUser) {
         if (isCurrentUser) {
            getUserInfo(currentUser._id)
         } else {
            getUserInfo(userId)
         }
      }
   }, [currentUser, userId])

   async function getUserInfo(id) {
      try {
         const { data } = await axios.get('/api/user/info/' + id)
         setDisplayUser(data.userInfo)
      } catch (error) {
         setDisplayUser({})
         message.error("取得使用者資料失敗")
      }
   }

   if (!displayUser) return (<Loader></Loader>)
   return (
      <div className="container" style={{ marginTop: "3rem" }}>
         <div className="row">
            <div className="col-lg-4">
               <UserInfoCard
                  userInfo={displayUser}
                  titleText=""
               ></UserInfoCard>
            </div>
            <div className="col-lg-8">
               {isCurrentUser &&
                  <div>
                     <div className="titleContainer" style={{ display: "flex", justifyContent: "space-between" }}>
                        <h3>編輯個人資料</h3>
                        <h3><Icon type="edit" /></h3>
                     </div>
                     <SettingProfile
                        user={displayUser}
                        updateUserInfo={getUserInfo}
                     ></SettingProfile>
                  </div>
               }
               <div className="titleContainer" >
                  <h3>修課清單</h3>
               </div>
               <MyStudyClass user={displayUser}></MyStudyClass>

               <div className="titleContainer" >
                  <h3>開課清單</h3>
               </div>
               <MyClass user={displayUser}></MyClass>

            </div>
         </div>
      </div>
   );
};

export default Profile;