import React from 'react';
// import component
import { Upload, Button, Icon, message } from 'antd'
import { Form } from 'react-bootstrap'
import { useState } from 'react';
import ImageUploader from '../../components/ImageUploader/ImageUploader';
import axios from 'axios';
import history from '../../history';


const SettingProfile = ({ user }) => {
   const [displayName, setDisplayName] = useState(user.displayName);
   const [avatarsUrl, setAvatarsUrl] = useState(user.avatarsUrl);
   const [profile, settingProfile] = useState(user.profile);

   const handleUploadNewAvatarImage = (imageUrl) => {
      setAvatarsUrl(imageUrl)
   }

   const handleChangeDisplayName = (e) => {
      setDisplayName(e.target.value)
   }

   const handleChangeProfile = (e) => {
      settingProfile(e.target.value)
   }

   const handleSvaeData = async () => {
      if (displayName) {
         try {
            let res = await axios.post('/user/updateDisplayName/' + user._id, { displayName: displayName });
            if (res.request.status == 200) {
               message.success("顯示名稱 " + res.data.message)
            }
         } catch (err) {
            err.response.data.errors.forEach(error => {
               message.error("顯示名稱 " + error.msg)
            })
         }
      }

      if (avatarsUrl) {
         try {
            let res = await axios.post('/user/updateAvatar/' + user._id, { avatarsUrl: avatarsUrl });
            if (res.request.status == 200) {
               message.success("大頭貼 " + res.data.message)
            }
         } catch (err) {
            err.response.data.errors.forEach(error => {
               message.error("大頭貼 " + error.msg)
            })
         }
      }

      if (profile) {
         try {
            let res = await axios.post('/user/updateProfile/' + user._id, { profile: profile });
            if (res.request.status == 200) {
               message.success("自我介紹 " + res.data.message)
            }
         } catch (err) {
            err.response.data.errors.forEach(error => {
               message.error("自我介紹 " + error.msg)
            })
         }
      }
      window.location = "/profile"
   }
   return (
      <div style={{ marginBottom: "1rem" }}>
         <Form.Label>大頭貼</Form.Label>

         <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ height: "15rem", width: "15rem", position: "relative", display: "flex", justifyContent: "center", flexDirection: "column", overflow: "hidden", background: "black" }}>
               <img src={avatarsUrl || user.avatarsUrl} style={{ width: "100%" }}></img>
               <ImageUploader onChange={handleUploadNewAvatarImage} style={{ fontSize: "10px", position: "absolute", top: 0, right: 0 }}></ImageUploader>
            </div>
         </div>
         <Form>
            <Form.Group>
               <Form.Label>顯示名稱</Form.Label>
               <Form.Control type="text" value={displayName || user.displayName} onChange={handleChangeDisplayName} />
            </Form.Group>
            <Form.Group>
               <Form.Label>帳號</Form.Label>
               <Form.Control type="text" value={user.username} disabled />
            </Form.Group>
            <Form.Group>
               <Form.Label>自我介紹</Form.Label>
               <Form.Control type="text" as="textarea" rows="5" value={profile || user.profile} onChange={handleChangeProfile} />
            </Form.Group>
         </Form>
         <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button type="primary" onClick={handleSvaeData}>儲存</Button>
         </div>
      </div>
   );
};

export default SettingProfile;