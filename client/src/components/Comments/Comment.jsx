import React from 'react';
import { Avatar } from 'antd';
import { useEffect } from 'react';
import api from '../../api';
import { useState } from 'react';
import moment from '../../common/moment'

const Comment = ({ body, id, userId, time }) => {
   const [user, setUser] = useState(null)
   useEffect(() => {
      getUserData()
   }, [])
   const getUserData = async () => {
      let { userInfo } = await api.User.getUserPublicInfoById(userId);
      setUser(userInfo)
   }
   return (
      <div style={styles.container}>
         <div style={styles.header}>
            <div style={{ width: "66px" }}>
               <Avatar style={styles.avatar} size={50} src={user ? user.avatarsUrl : ""} />

            </div>
            <div style={styles.title}>
               {user ? user.displayName : "loading..."}
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", flex: "2" }}>
               <div style={styles.time}>
                  {moment(time).startOf('second').fromNow()}
               </div>
            </div>
         </div>
         <div style={styles.body}>
            {body}
         </div>
      </div>
   );
};

const styles = {
   container: {
      display: "flex",
      flexDirection: "column",
      padding: "1rem",
      border: "0.3px solid #ccc",
      background: "white",
      marginBottom: "1rem"
   },
   header: {
      display: "flex",
   },
   avatar: {
      marginRight: "1rem"
   },
   title: {
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      textOverflow: "ellipsis",
      overflow: "hidden",
      width: "160px",
      whiteSpace: "nowrap"
   },
   body: {
      padding: "1rem",
      paddingLeft: "4rem"
   },
   time: {
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      textOverflow: "ellipsis",
      overflow: "hidden",
      whiteSpace: "nowrap"
   }
}

export default Comment;