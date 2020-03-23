import React, { useState } from 'react';
import axios from 'axios'
// import component 
import { Modal, Input, message } from 'antd'
const RenameModel = ({ document, type, updateDocumentList }) => {
    const [visible, setVisible] = useState(false)
    const [newName, setNewName] = useState("")
    let apiUrl;
    switch (type) {
        case "material":
            apiUrl = `/api/class/updateMaterialName/${document._id}`
            break;
        case "video":
            apiUrl = `/api/class/updateVideoName/${document._id}`
            break;
        case "test":
            apiUrl = `/api/class/updateTestName/${document._id}`
            break;
        default:
            break;
    }
    const handleOpen = () => {
        setVisible(true)
    }
    const handleRename = async () => {
        console.log(apiUrl)
        if (apiUrl) {
            try {
                const { data } = await axios.post(apiUrl, {
                    name: newName
                })
                if (data && data.message) {
                    message.success("更新名稱成功！")
                    updateDocumentList();
                }
            } catch (error) {
                message.error("更新名稱失敗！")
            }
        } else {
            message.info("發生問題！")
        }
        setVisible(false)
        setNewName("")
    }
    const handleCancel = () => {
        setVisible(false)
    }
    const handelNameChange = (e) => {
        setNewName(e.target.value)
    }
    return (
        <div>
            <a onClick={handleOpen}>
                重新命名
         </a>
            <Modal
                title="重新命名"
                visible={visible}
                onOk={handleRename}
                onCancel={handleCancel}
                okText="更新名稱"
                cancelText="取消"
            >
                <p>名稱</p>
                <Input placeholder="請輸入新的名稱" onChange={handelNameChange} value={newName}></Input>
            </Modal>
        </div>
    );
};

export default RenameModel;