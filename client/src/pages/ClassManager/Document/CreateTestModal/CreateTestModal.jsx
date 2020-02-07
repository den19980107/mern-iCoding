import React from 'react';
import { useState } from 'react';
import { Modal, Button } from 'antd';

const CreateTestModal = () => {
   const [visible, setVisible] = useState(false)

   const showModal = () => {
      setVisible(true)
   };

   const handleOk = e => {
      console.log(e);
      setVisible(false)
   };

   const handleCancel = e => {
      console.log(e);
      setVisible(false)
   };
   return (
      <div>
         <a style={{ padding: "0.5rem 2rem" }} onClick={showModal}>測驗</a>
         <Modal
            title="新增測驗"
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
         >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
         </Modal>
      </div>
   );
};

export default CreateTestModal;