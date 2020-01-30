import React from 'react';
import { Upload, Button, Icon } from 'antd';
import './ImageUploader.css'
const ImageUploader = ({ onChange, style }) => {
   const props = {
      action: '/image/upload',
      onChange({ file, fileList }) {
         if (file.status !== 'uploading') {
            if (file.xhr.status == 200) {
               onChange(file.response.imageUrl)
            }
         }
      },
      showUploadList: false,
   };
   return (
      <Upload {...props} className="uploader">
         <button style={{ fontSize: "20px", padding: "0.5rem", backgroundColor: "white", border: "0.5px solid #ccc", ...style }}>
            <Icon type="upload" /> 上傳照片
         </button>
      </Upload>
   );
};

export default ImageUploader;