import React from 'react';
import { Upload, Button, Icon } from 'antd';
const VideoUploader = ({ onChange, belongUnit, displayName, style }) => {
   const props = {
      action: '/api/video/upload',
      onChange({ file, fileList }) {
         if (file.status !== 'uploading') {
            if (file.xhr.status == 200) {
               onChange(file.response.videoUrl)
            }
         }
      },
      accept: 'video/*',
      defaultFileList: [],
      data: {}
   };
   if (belongUnit) {
      props.data.belongUnitId = belongUnit
   }
   if (displayName) {
      props.data.displayName = displayName
   }
   return (
      <Upload {...props} >
         <button style={{ fontSize: "20px", padding: "0.5rem", backgroundColor: "white", border: "0.5px solid #ccc", ...style }}>
            <Icon type="upload" /> 上傳影片
         </button>
      </Upload>
   );
};

export default VideoUploader;