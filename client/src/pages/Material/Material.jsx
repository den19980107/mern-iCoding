import React, { useEffect, useState } from 'react';
import axios from 'axios'
import './Material.css'
//import component
import Loader from '../../components/Loader/Loader'
import { message, Icon } from 'antd'
import Comments from '../../components/Comments'

const Material = (props) => {
   const { classId, unitId, materialId } = props.match.params
   const [material, setMaterial] = useState(null)
   useEffect(() => {
      getData()
   })

   const getData = async () => {
      try {
         let res = await axios.get(`/api/class/material/${materialId}`)
         if (res.request.status == 200) {
            setMaterial(res.data)
         }
      } catch (err) {
         err.response.data.errors.forEach(error => {
            message.error(error.msg)
         })
      }
   }
   if (material) {
      return (
         <div className="container">
            <div style={{ margin: "3rem 0 1rem 0" }}>
               <h3>{material.name}</h3>
            </div>
            <div style={{ background: "white", padding: "1rem" }}>
               <div dangerouslySetInnerHTML={{ __html: material.body }} className="body"></div>
            </div>
            <Comments
               type="material"
               belongId={materialId}
            ></Comments>
         </div>
      )
   } else {
      return (
         <Loader></Loader>
      )
   }
};

export default Material;