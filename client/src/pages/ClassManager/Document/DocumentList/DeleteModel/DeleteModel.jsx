import React from 'react';
import axios from 'axios'
import api from '../../../../../api'
import { Modal, message } from 'antd'
const DeleteModel = ({ document, type, updateDocumentList }) => {
    let deleteMethod;
    switch (type) {
        case "material":
            deleteMethod = api.Class.material.deleteMaterialById;
            break;
        case "video":
            deleteMethod = api.Class.video.deleteVideoById;
            break;
        case "test":
            deleteMethod = api.Class.test.deleteTestById;
            break;
        default:
            break;
    }
    const handleDelete = () => {
        Modal.confirm({
            title: `確定要刪除 "${document.displayName || document.name}" 嗎？`,
            async onOk() {
                try {
                    const data = await deleteMethod(document._id);
                    console.log(data)
                    if (data && data.message) {
                        message.success(data.message)
                        updateDocumentList();
                    }
                } catch (error) {
                    console.log(error)
                    message.error("刪除失敗！")
                }
            },
            onCancel() {
                console.log('Cancel');
            },
        })
    }
    return (
        <div>
            <a onClick={handleDelete}>
                刪除
            </a>
        </div>
    );
};

export default DeleteModel;