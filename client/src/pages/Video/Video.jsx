import React from 'react';

// import component
import VidoePlayer from '../../components/VideoPlayer/VideoPlayer'
import Comments from '../../components/Comments'
const Video = (props) => {
   const { classId, unitId, videoId } = props.match.params

   return (
      <div className="container">
         <div style={{ display: "flex", justifyContent: "center" }}>
            <VidoePlayer src={`/api/video/${videoId}`} style={{ width: "100%" }}></VidoePlayer>
         </div>

         <Comments
            type="video"
            belongId={videoId}
         ></Comments>
      </div>
   );
};

export default Video;