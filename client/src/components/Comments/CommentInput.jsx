import React, { useContext, useState } from 'react';
import UserProvider from '../../context/UserProvider';
import api from '../../api'
import { Avatar, Input, Button, message } from 'antd';
const { TextArea } = Input;

const CommentInput = ({ belongId, updateComment }) => {
   const user = useContext(UserProvider.context);
   const [inputText, setInputText] = useState("");

   const postComment = async () => {
      if (inputText) {
         api.Comment.createComment(user._id, inputText, belongId)
         updateComment();
         setInputText("")
         message.success("留言成功！")
      }
   }
   return (
      <div style={styles.container}>
         <div style={styles.header}>
            <Avatar style={styles.avatar} size={50} src={user ? user.avatarsUrl : ""} />
            {user ? user.username : ""}
         </div>
         <div style={styles.input}>
            <TextArea rows={4} value={inputText} placeholder={"寫些東西ㄅ！"} onChange={(e) => { setInputText(e.target.value) }}></TextArea>
         </div>
         <div style={styles.footer}>
            <Button type="primary" onClick={postComment}>送出</Button>
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
      marginBottom: "1rem",
   },
   header: {
      display: "flex",
      alignItems: "center",
   },
   avatar: {
      marginRight: "1rem"
   },
   input: {
      width: "auto",
      marginLeft: "4rem"
   },
   footer: {
      marginTop: "1rem",
      display: "flex",
      justifyContent: "flex-end"
   }
}

export default CommentInput;