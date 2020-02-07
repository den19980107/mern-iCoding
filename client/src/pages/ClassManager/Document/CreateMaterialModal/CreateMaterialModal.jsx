import React from 'react';
import { useState } from 'react';
import axios from 'axios'

// import modal
import { Modal, Button, Input, message } from 'antd';
import BraftEditor from 'braft-editor';

const CreateMaterialModal = ({ unitId, onNeedUpdate }) => {
   const [visible, setVisible] = useState(false)
   const [title, setTitle] = useState("")
   const [body, setBody] = useState("")
   const showModal = () => {
      setVisible(true)
   };

   const handleOk = async () => {
      try {
         const { data } = await axios.post('/class/createMaterial', {
            name: title,
            unitId: unitId,
            body: body
         })
         setTitle("")
         setBody("")
         message.success(data.message)
         onNeedUpdate()
      } catch (error) {
         let errors = error.response.data
         for (let i = 0; i < errors.length; i++) {
            message.error(errors[i].msg)
         }
      }
      setVisible(false)
   };

   const handleCancel = e => {
      setVisible(false)
   };

   const handleBodyChange = (newBody) => {
      setBody(newBody)
   }

   const handleTitleChange = (e) => {
      setTitle(e.target.value)
   }
   return (
      <div>
         <a style={{ padding: "0.5rem 2rem" }} onClick={showModal}>講義</a>
         <Modal
            title="新增講義"
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            width={"80%"}
            okText="新增"
            cancelText="取消"
         >
            <div>
               <h5>講義名稱</h5>
               <Input placeholder="請輸入講義名稱" onChange={handleTitleChange} value={title}></Input>
               <hr />
               <BraftEditor
                  style={{ background: "white" }}
                  onChange={(data) => {
                     handleBodyChange(data.toHTML())
                  }}
                  language={languageFn}
               />
            </div>
         </Modal>
      </div>
   );
};

const languageFn = (languages, context) => {
   if (context === 'braft-editor') {
      languages['zh-hant'].controls.clear = '清空'
      return languages['zh-hant']
   }

}

export default CreateMaterialModal;