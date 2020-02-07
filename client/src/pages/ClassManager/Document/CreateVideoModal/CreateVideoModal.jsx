import React from 'react';
import { useState } from 'react';

import VideoUploader from '../../../../components/VideoUploader/VideoUploader'
import { Modal, Button, Input } from 'antd';

const CreateVideoModal = ({ unitId }) => {
   const [visible, setVisible] = useState(false)
   const [videoUrl, setVideoUrl] = useState(null)
   const [videoName, setVideoName] = useState("")
   const showModal = () => {
      setVisible(true)
   };

   const handleOk = e => {
      console.log(e);
      setVisible(false)
   };

   const handleCancel = e => {
      console.log(e);
      setVisible(false)
   };

   const handleVideoChange = (url) => {
      console.log(url)
      setVideoUrl(url)
   }

   const handleVideoNameChange = (e) => {
      setVideoName(e.target.value)
   }
   return (
      <div>
         <a style={{ padding: "0.5rem 2rem" }} onClick={showModal}>影片</a>
         <Modal
            title="新增影片"
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
         >
            <p>影片名稱</p>
            <Input placeholder="請輸入影片名稱" onChange={handleVideoNameChange} value={videoName}></Input>
            <VideoUploader onChange={handleVideoChange} belongUnit={unitId} displayName={videoName} style={{ fontSize: "16px", marginTop: "1rem" }}></VideoUploader>
         </Modal>
      </div>
   );
};

export default CreateVideoModal;