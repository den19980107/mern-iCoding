import React from 'react';

// import component 
import VideoUploader from '../../../components/VideoUploader/VideoUploader';
const Step3 = ({ handleVideoUpload }) => {
   return (
      <div className="container">
         <h4>上傳一個 1 ~ 3 分鐘的課程大綱影片</h4>
         <VideoUploader onChange={handleVideoUpload}></VideoUploader>
      </div>
   );
};

export default Step3;