import React from 'react';
import './videoPlayer.css'
const VideoPlayer = ({ style, src }) => {
   if (!style) {
      style = {
         width: "480px",
         height: "360px"
      }
   }
   return (
      <video id="video-player" style={style} src={src} controls>
         <source></source>
      </video>
   );
};

export default VideoPlayer;