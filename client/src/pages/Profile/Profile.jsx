import React, { useContext, useState, useEffect } from 'react';
import queryString from 'query-string'
import UserProvider from '../../context/UserProvider';
import UserInfoCard from '../../components/UserInfoCard/UserInfoCard';
import { Icon } from 'antd'
import axios from 'axios';
import './Profile.css'

// import component
import SettingProfile from './SettingProfile';
import MyClass from './MyClass';
import MyStudyClass from './MyStudyClass';
import FigureCaption from 'react-bootstrap/FigureCaption';

const Profile = (props) => {
   const query = queryString.parse(props.location.search)
   const userId = query.id
   const isCurrentUser = !userId
   const currentUser = useContext(UserProvider.context)
   const [displayUser, setDisplayUser] = useState({})

   useEffect(() => {
      if (userId) {
         getUserInfo(userId)
      }
   }, [])

   async function getUserInfo(id) {
      let userInfoRes = await axios.get('/user/info/' + id)
      if (userInfoRes.request.status == 200) {
         console.log(userInfoRes.data)
         setDisplayUser(userInfoRes.data.userInfo)
      } else {
         setDisplayUser({})
      }
   }

   // 檢查是否有帶使用者id 如果沒有表示是看自己的 profile
   const userInfo = userId ? displayUser : currentUser
   return (
      <div className="container" style={{ marginTop: "3rem" }}>
         <div className="row">
            <div className="col-lg-4">
               <UserInfoCard
                  userInfo={userInfo}
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
                        user={userInfo}
                     ></SettingProfile>
                  </div>
               }
               <div className="titleContainer" >
                  <h3>修課清單</h3>
               </div>
               <MyStudyClass user={userInfo}></MyStudyClass>

               <div className="titleContainer" >
                  <h3>開課清單</h3>
               </div>
               <MyClass user={userInfo}></MyClass>

            </div>
         </div>
      </div>
   );
};

export default Profile;