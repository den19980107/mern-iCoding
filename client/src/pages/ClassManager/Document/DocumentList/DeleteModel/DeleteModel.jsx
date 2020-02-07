import React from 'react';
import axios from 'axios'

import { Modal, message } from 'antd'
const DeleteModel = ({ document, type, updateDocumentList }) => {
   let apiUrl;
   switch (type) {
      case "material":
         apiUrl = `/class/deleteMaterial/${document._id}`
         break;
      case "video":
         apiUrl = `/class/deleteVideo/${document._id}`
         break;
      case "test":
         apiUrl = `/class/deleteTest/${document._id}`
         break;
      default:
         break;
   }
   const handleDelete = () => {
      Modal.confirm({
         title: `確定要刪除 "${document.displayName || document.name}" 嗎？`,
         async onOk() {
            console.log(apiUrl)
            if (apiUrl) {
               try {
                  const { data } = await axios.post(apiUrl)
                  if (data && data.message) {
                     message.success(data.message)
                     updateDocumentList();
                  }
               } catch (error) {
                  message.error("刪除失敗！")
               }
            } else {
               message.info("發生問題！")
            }
         },
         onCancel() {
            console.log('Cancel');
         },
      })
   }
   return (
      <div>
         <a onClick={handleDelete}>
            刪除
            </a>
      </div>
   );
};

export default DeleteModel;