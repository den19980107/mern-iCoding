import React from 'react';
import CommentList from './CommentList'
const index = ({ type, belongId }) => {
   return (
      <div style={{ marginTop: "1rem" }}>
         <CommentList type={type} belongId={belongId} ></CommentList>
      </div>
   );
};

export default index;