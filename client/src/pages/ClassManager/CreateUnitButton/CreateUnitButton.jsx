import React, { useState, useContext } from 'react';
import axios from 'axios'
// import component
import { Modal, Button, Input, message } from 'antd';
import ClassDataProvider from '../../../context/ClassDataProvider'
const CreateUnitButton = ({ style, updateData }) => {
   const classData = useContext(ClassDataProvider.context);
   const [visible, setVisible] = useState(false)
   const [newUnitName, setNewUnitName] = useState("")
   const showModal = () => {
      setVisible(true)
   };

   const handleOk = async () => {
      if (classData && classData.classInfo && classData.classInfo._id) {
         console.log("send request")
         try {
            const { data } = await axios.post('/api/class/createUnit', {
               unitName: newUnitName,
               classId: classData.classInfo._id
            })
            updateData()
            setNewUnitName("")
            message.success(data.message)
         } catch (error) {
            let errors = error.response.data
            for (let i = 0; i < errors.length; i++) {
               message.error(errors[i].msg)
            }
         }
         setVisible(false)
      }
   };

   const handleCancel = e => {
      console.log(e);
      setVisible(false)
   };

   const handleNewUnitNameChange = e => {
      setNewUnitName(e.target.value)
   }
   return (
      <div>
         <Button style={style} type="primary" onClick={showModal}>
            新增單元
        </Button>
         <Modal
            title="新增單元"
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            okText={"新增"}
            cancelText={"取消"}
         >
            <p>請輸入單元名稱</p>
            <Input onChange={handleNewUnitNameChange} value={newUnitName} />
         </Modal>
      </div>
   );
};

export default CreateUnitButton;