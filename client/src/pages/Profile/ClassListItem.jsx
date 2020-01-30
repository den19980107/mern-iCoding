import React from 'react';
import history from '../../history'

// import component
import { Button } from 'antd';
const ClassListItem = ({ classData }) => {
   return (
      <div style={{
         fontSize: "26px",
         display: "flex",
         justifyContent: "space-between",
         border: "0.5px solid #ccc",
         padding: "1rem",
         background: "rgb(243,178,78)",
         color: "white",
         marginBottom: "1rem"
      }}>
         {classData.name}
         <Button size="large" onClick={() => { history.push("/class/" + classData._id) }}>前往課程</Button>
      </div>
   );
};

export default ClassListItem;