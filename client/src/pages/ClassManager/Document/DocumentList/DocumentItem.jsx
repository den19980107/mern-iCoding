import React from 'react';
import './DocumentItem.css'
import htmlToText from 'html-to-text'
// import component
import { Card, Icon, Button, Menu, Dropdown, Modal } from 'antd'
import RenameModal from './RenameModel/RenameModel'
import DeleteModal from './DeleteModel/DeleteModel'
const DocumentItem = ({ type, document, updateDocumentList }) => {
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
         <MaterialCard document={document} menu={menu}></MaterialCard>
      );
   } else if (type == "video") {
      return (
         <VideoCard document={document} menu={menu}></VideoCard>
      )
   } else if (type == "test") {
      return (
         <TestCard document={document} menu={menu}></TestCard>
      )
   } else {
      return (
         <div></div>
      )
   }
};

const MaterialCard = ({ document, menu }) => {
   return (
      <Card className="documentCard"
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


const VideoCard = ({ document, menu }) => {
   return (
      <div style={{ border: "0.5px solid #ccc", display: "flex", flexDirection: "column", marginRight: "1rem", marginBottom: "1rem" }}>
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

const TestCard = ({ document, menu }) => {
   return (
      <div>
         <div>test card</div>
         <Dropdown overlay={menu} placement="bottomLeft">
            <Icon type="more" className="more" />
         </Dropdown>
      </div>
   )
}

export default DocumentItem;