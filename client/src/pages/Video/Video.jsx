import React from 'react';

// import component
import VidoePlayer from '../../components/VideoPlayer/VideoPlayer'
const Video = (props) => {
   const { classId, unitId, videoId } = props.match.params

   return (
      <div className="container">
         <div style={{ display: "flex", justifyContent: "center" }}>
            <VidoePlayer src={`/video/${videoId}`} style={{ width: "80%" }}></VidoePlayer>
         </div>
         <p>classId = {classId}</p>
         <p>unitId = {unitId}</p>
         <p>videoId = {videoId}</p>
      </div>
   );
};

export default Video;