import React from 'react';
import { Upload, Button, Icon, message } from 'antd';
import './ImageUploader.css'
const ImageUploader = ({ onChange, style }) => {
   const props = {
      action: '/image/upload',
      onChange({ file, fileList }) {
         if (file.status !== 'uploading') {
            if (file.xhr && file.xhr.status == 200) {
               message.success("上傳成功！")
               onChange(file.response.imageUrl)
            } else {
               message.error("上傳失敗！")
            }
         }
      },
      accept: "image/*",
      showUploadList: false,
   };
   const checkImageSize = (file) => {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
         message.error('你只能上傳小於 2MB 的照片!');
      }
      return isLt2M;
   }
   return (
      <Upload
         {...props}
         beforeUpload={checkImageSize}
         className="uploader">
         <button style={{ fontSize: "20px", padding: "0.5rem", backgroundColor: "white", border: "0.5px solid #ccc", ...style }}>
            <Icon type="upload" /> 上傳照片
         </button>
      </Upload>
   );
};

export default ImageUploader;