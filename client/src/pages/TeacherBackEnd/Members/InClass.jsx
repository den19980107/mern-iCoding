import React from 'react';
import { Table, Avatar, message } from 'antd';
import { Link } from 'react-router-dom';
import api from '../../../api';

function InClass({ classId, inClassStudentsData, updateData }) {
    console.log(inClassStudentsData)
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
            render: accountType => <span>{accountType == "local" ? "平台註冊" : accountType}</span>,
        },
        {
            key: 'action',
            render: (text, record) => (
                <span>
                    <a class="alert alert-danger" onClick={() => deleteUserInClass(record._id)}>刪除</a>
                </span>
            )
        },
    ];

    const deleteUserInClass = async (id) => {
        let res = await api.Class.student.quitClass(classId, id);
        if (res) {
            message.success(res.message);
            updateData();
        } else {
            message.error("發生問題");
        }
    }
    return (
        <div>
            <h3>本班成員</h3>
            <Table style={{ marginTop: "1rem" }} columns={columns} dataSource={inClassStudentsData} />

        </div>
    );
}

export default InClass;