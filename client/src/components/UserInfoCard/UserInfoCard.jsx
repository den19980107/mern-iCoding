import React from 'react';
import { Icon, message, Button, Avatar } from 'antd';
const UserInfoCard = ({ userInfo, titleText, style }) => {
   if (titleText == null || titleText == undefined) titleText = "關於老師 "
   return (
      <div style={{ width: "100%", boxShadow: "0 2px 8px 0 rgba(0,0,0,0.12)", background: "white", ...style }}>
         <div style={{ padding: "2rem", borderBottom: "0.5px solid #eee", textAlign: "center" }}>
            <h4 style={{ padding: 0, margin: 0, color: "#666" }}>{titleText + userInfo.displayName}</h4>
         </div>
         <div style={{ display: "flex", justifyContent: "center", padding: "1rem" }}>
            <div style={{ borderRadius: "50%", width: "70%", display: "flex", justifyContent: "center" }}>
               <Avatar src={userInfo.avatarsUrl} size={200} />
            </div>
         </div>
         <div style={{ display: "flex", justifyContent: "center", padding: "1rem" }}>
            <Icon type="mail" style={{ fontSize: "30px", color: "#333", margin: "1rem" }} />
            <Icon type="home" style={{ fontSize: "30px", color: "#333", margin: "1rem" }} />
         </div>
         <div style={{ padding: "0 1rem 1rem 1rem", fontSize: "20px" }}>
            {userInfo.profile}
         </div>
      </div>
   );
};

export default UserInfoCard;