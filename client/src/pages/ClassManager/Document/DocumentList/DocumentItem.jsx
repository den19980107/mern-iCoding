import React, { useContext } from 'react';
import './DocumentItem.css'
import htmlToText from 'html-to-text'
import history from '../../../../history'
import ClassDataProvider from '../../../../context/ClassDataProvider'
// import component
import { Card, Icon, Button, Menu, Dropdown, Modal } from 'antd'
import RenameModal from './RenameModel/RenameModel'
import DeleteModal from './DeleteModel/DeleteModel'
const DocumentItem = ({ type, document, updateDocumentList, unitId }) => {
   const data = useContext(ClassDataProvider.context);
   const classData = data.classInfo

   const menu = (
      <Menu>
         <Menu.Item>
            <RenameModal document={document} type={type} updateDocumentList={updateDocumentList}></RenameModal>
         </Menu.Item>
         <Menu.Item>
            <DeleteModal document={document} type={type} updateDocumentList={updateDocumentList}></DeleteModal>
         </Menu.Item>
      </Menu>
   );


   if (type == "material") {
      return (
         <MaterialCard document={document} menu={menu} classData={classData} unitId={unitId}></MaterialCard>
      );
   } else if (type == "video") {
      return (
         <VideoCard document={document} menu={menu} classData={classData} unitId={unitId}></VideoCard>
      )
   } else if (type == "test") {
      return (
         <TestCard document={document} menu={menu} classData={classData} unitId={unitId}></TestCard>
      )
   } else {
      return (
         <div></div>
      )
   }
};

const MaterialCard = ({ document, menu, classData, unitId }) => {
   return (
      <Card className="documentCard"
         onClick={() => history.push(`/class/${classData._id}/unit/${unitId}/material/${document._id}`)}
         title={
            <div style={{ display: "flex" }}>
               <div className="iconContainer">
                  <Icon type="file-word" theme="filled" />
               </div>
               <div className="nameContainer">
                  <span className="title">{document.name}</span>
               </div>
            </div>
         } extra={
            <Dropdown overlay={menu} placement="bottomLeft">
               <Icon type="more" className="more" />
            </Dropdown>
         }>
         <div className="cardBody">
            {htmlToText.fromString(document.body)}
         </div>
      </Card>
   )
}


const VideoCard = ({ document, menu, classData, unitId }) => {
   return (
      <div
         onClick={() => history.push(`/class/${classData._id}/unit/${unitId}/video/${document._id}`)}
         style={{ border: "0.5px solid #ccc", display: "flex", flexDirection: "column", marginRight: "1rem", marginBottom: "1rem" }}
      >
         <video src={`/video/${document._id}`} width="310" height="174" style={{ background: "black" }}></video>
         <div style={{ padding: "0.5rem", display: "flex", justifyContent: "space-between" }}>
            <span>{document.displayName || document.name}</span>
            <Dropdown overlay={menu} placement="bottomLeft">
               <Icon type="more" className="more" />
            </Dropdown>
         </div>
      </div>
   )
}

const TestCard = ({ document, menu, classData, unitId }) => {
   return (
      <div
         onClick={() => history.push(`/class/${classData._id}/unit/${unitId}/test/${document._id}`)}
      >
         <div>test card</div>
         <Dropdown overlay={menu} placement="bottomLeft">
            <Icon type="more" className="more" />
         </Dropdown>
      </div>
   )
}

export default DocumentItem;