import React, { useEffect, useState } from 'react';
import axios from 'axios'
// import component
import DocumentItem from './DocumentItem'
import Loader from '../../../../components/Loader/Loader'
import { message, Icon } from 'antd'
const DocumentList = ({ type, unitId, isNeedUpdate, upDateComplelte }) => {
   const [documents, setDocuments] = useState([])
   const [isLoding, setIsLoding] = useState(true)

   useEffect(() => {
      getData()
      upDateComplelte()
   }, [isNeedUpdate, type, unitId])

   const getData = async () => {
      let url = `/api/class/${type}InUnit/${unitId}`
      console.log(url)
      try {
         setDocuments([])
         setIsLoding(true)
         const { data } = await axios.get(url)
         console.log(data)
         setDocuments(data)
         setIsLoding(false)
      } catch (error) {
         let errors = error.response.data
         for (let i = 0; i < errors.length; i++) {
            message.error(errors[i].msg)
         }
      }
   }
   return (
      <div style={{ marginTop: "1rem" }}>
         {isLoding && <Loader></Loader>}
         <div style={{ display: "flex", flexWrap: "wrap" }}>
            {documents.length >= 0 && documents.map(document => (
               <DocumentItem type={type} document={document} updateDocumentList={getData} unitId={unitId}></DocumentItem>
            ))}
         </div>
      </div>
   );
};

export default DocumentList;