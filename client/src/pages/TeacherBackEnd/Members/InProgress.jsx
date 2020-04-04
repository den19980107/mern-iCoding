import React from 'react';
import { Table, Avatar, Divider, message } from 'antd';
import { Link } from 'react-router-dom';
import api from '../../../api';

function InProgress({ classId, inProccessStudentsData, updateData }) {
    const addUserIntoClass = async (id) => {
        let res = await api.Class.teacher.comfirmStudent(classId, id);
        console.log(res)
        if (res) {
            message.success(res.message);
            updateData();
        } else {
            message.error("發生問題");
        }
    }
    const deleteUserRecord = async (id) => {

    }
    const columns = [
        {
            dataIndex: 'avatarsUrl',
            key: 'avatarsUrl',
            render: url => <Avatar src={url}></Avatar>,
            width: 30
        },
        {
            title: '名稱',
            dataIndex: 'displayName',
            key: 'displayName',
            render: (text, record) => <Link to={`/profile?id=${record._id}`}>{text}</Link>
        },
        {
            title: '帳號',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'email',
            dataIndex: 'email',
            key: 'email',
        }, {
            title: '帳號類型',
            dataIndex: 'accountType',
            key: 'accountType',
            render: accountType => <span>{accountType == "local" ? "平台註冊" : `使用 ${accountType} 登入`}</span>,
        },
        {
            key: 'action',
            render: (text, record) => (
                <span>
                    <a class="alert alert-success" onClick={() => addUserIntoClass(record._id)}>加入課程 {record.name}</a>
                    <Divider type="vertical" />
                    <a class="alert alert-danger" onClick={() => deleteUserRecord(record._id)}>刪除</a>
                </span>
            )
        },
    ]
    return (
        <div>
            <h3>審核成員</h3>
            <Table style={{ marginTop: "1rem" }} columns={columns} dataSource={inProccessStudentsData} />
        </div>
    );
}

export default InProgress;