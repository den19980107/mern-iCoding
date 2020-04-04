import React, { useState, useEffect } from 'react';

// import component 
import { Menu, Dropdown, Button } from 'antd'
import DocumentSelector from './DocumentSelector/DocumentSelector'
import DocumentList from './DocumentList/DocumentList'
import CreateMaterialModal from './CreateMaterialModal/CreateMaterialModal'
import CreateVideoModal from './CreateVideoModal/CreateVideoModal'
import { Link } from 'react-router-dom';

const Document = ({ classId, unit, isTeacher }) => {
    const [currentShowDocumentType, setCurrentDcoumentType] = useState("material")
    const [needUpdateDocument, setNedUpdateDocument] = useState(false)

    const onSelectDocumentType = (showDocumentType) => {
        setCurrentDcoumentType(showDocumentType)
    }

    const onNeedUpdate = () => {
        setNedUpdateDocument(true)
    }

    const onUpDateComplelte = () => {
        setNedUpdateDocument(false)
    }

    const menu = (
        <Menu>
            <Menu.Item>
                <CreateMaterialModal unitId={unit._id} onNeedUpdate={onNeedUpdate}></CreateMaterialModal>
            </Menu.Item>
            <Menu.Item>
                <CreateVideoModal unitId={unit._id}></CreateVideoModal>
            </Menu.Item>
            <Menu.Item>
                <div>
                    <Link style={{ padding: "0.5rem 2rem", color: "#555", textDecoration: "none" }} to={`/class/${classId}/classManager/unit/${unit._id}/createTest`}>測驗</Link>
                </div>
            </Menu.Item>
        </Menu>
    )
    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3 style={{ margin: "0" }}>{unit.name}</h3>
                {isTeacher &&
                    <Dropdown overlay={menu} placement="bottomRight">
                        <Button size="large" type="primary">新增教材</Button>
                    </Dropdown>
                }
            </div>
            <DocumentSelector onChange={onSelectDocumentType}></DocumentSelector>
            <DocumentList isTeacher={isTeacher} type={currentShowDocumentType} unitId={unit._id} isNeedUpdate={needUpdateDocument} upDateComplelte={onUpDateComplelte}></DocumentList>

        </div>
    );
};

export default Document;