import React from 'react';
import { Icon } from 'antd'
const Loader = () => {
   return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: "3rem" }}>
         <Icon type="loading" style={{ fontSize: "64px" }}></Icon>
      </div>
   );
};

export default Loader;