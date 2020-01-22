import React from 'react';
import { Upload, Button, Icon } from 'antd';
const VideoUploader = ({ onChange }) => {
   const props = {
      action: '/video/upload',
      onChange({ file, fileList }) {
         if (file.status !== 'uploading') {
            if (file.xhr.status == 200) {
               onChange(file.response.introVideoId)
            }
         }
      },
      defaultFileList: [],
   };
   return (
      <Upload {...props}>
         <button style={{ fontSize: "20px", padding: "0.5rem", backgroundColor: "white", border: "0.5px solid #ccc" }}>
            <Icon type="upload" /> 上傳影片
         </button>
      </Upload>
   );
};

export default VideoUploader;