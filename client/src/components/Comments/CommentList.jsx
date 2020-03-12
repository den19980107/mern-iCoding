import React, { useEffect, useState } from 'react';
import axios from 'axios'
import api from '../../api'
// import component
import Comment from './Comment'
import CommentInput from './CommentInput'

const CommentList = ({ type, belongId }) => {
   const [comments, setComment] = useState([])

   useEffect(() => {
      console.log(type, belongId);

      getComments()
   }, [])

   const getComments = async () => {
      console.log("getComment")
      let res
      switch (type) {
         case "video":
            res = await api.Comment.getVideoComment(belongId)
            setComment(res);
            break;
         case "material":
            res = await api.Comment.getMaterialComment(belongId)
            setComment(res);
            break;
         case "test":
            res = await api.Comment.getTestComment(belongId)
            setComment(res);
            break;
      }
   }
   return (
      <div>
         <CommentInput belongId={belongId} updateComment={getComments}></CommentInput>
         {comments && comments.map(comment => (
            <Comment
               body={comment.body}
               id={comment._id}
               userId={comment.userId}
               time={comment.createdAt}
            >

            </Comment>
         ))}
      </div>
   );
};

export default CommentList;