import React, { useState } from 'react';

// import component
import { Menu, Icon } from 'antd';
const { SubMenu } = Menu;
const DocumentSelector = ({ onChange }) => {
   const [current, setCurrent] = useState()

   const handleClick = e => {
      setCurrent(e.key)
      onChange(e.key)
   };
   return (
      <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
         <Menu.Item key="material">
            <Icon type="file-text" />
            講義
        </Menu.Item>
         <Menu.Item key="video">
            <Icon type="youtube" />
            影片
        </Menu.Item>
         <Menu.Item key="test">
            <Icon type="form" />
            測驗
        </Menu.Item>
      </Menu>
   );
};

export default DocumentSelector;