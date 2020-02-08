import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios'
import './ClassManager.css'
// import component
import CreateUnitButton from './CreateUnitButton/CreateUnitButton'
import { Layout, Menu, Icon, Button, message, Modal } from 'antd';
import Document from './Document/Document'
import ClassDataProvider from '../../context/ClassDataProvider';
import { resolve, reject } from 'bluebird';

const { Content, Footer, Sider } = Layout;

const ClassManager = () => {
   const classData = useContext(ClassDataProvider.context)
   const [units, setUnits] = useState([])
   const [currentUnit, setCurrentUnit] = useState(null)
   const [theme, setTheme] = useState("light")

   useEffect(() => {
      getUnits();
   }, [classData])

   const getUnits = async () => {
      try {
         const { data } = await axios.get(`/api/class/${classData.classInfo._id}/units`)
         setUnits(data)
         if (data && data[0] && data[0]._id) {
            setCurrentUnit(data[0]._id)
         }
         return true
      } catch (error) {
         message.error("取得單元失敗！")
         return false
      }
   }

   const showDocumentInUnit = ({ item, key, keyPath, domEvent }) => {
      setCurrentUnit(key)
   }

   const deleteUnit = (currentUnitName, unitId) => {
      Modal.confirm({
         title: `你確定要刪除單元 "${currentUnitName}"?`,
         content: '刪除後此單元內的教材將全部不見！請注意',
         async onOk() {
            try {
               // 檢查是不是剩下一筆單元 如果是的話 刪除後就不顯示 document 了
               let isLast = units.length == 1
               let newSelectUnitIndex = getUnitIndex(unitId) == 0 ? 0 : getUnitIndex(unitId) - 1
               console.log(newSelectUnitIndex, units[newSelectUnitIndex])
               const { data } = await axios.post(`/api/class/deleteUnit/${unitId}`)
               if (data) {
                  // 更新 unit 資料
                  getUnits()
                  if (!isLast) {
                     setCurrentUnit(units[newSelectUnitIndex]._id)
                  } else {
                     setCurrentUnit(null)
                  }
                  message.success(data)
               }
            } catch (error) {
               message.error("刪除單元失敗！")
            }
         },
         onCancel() {
            console.log('Cancel');
         },
      })
      console.log(currentUnit)
   }

   const getUnitIndex = (unitId) => {
      let index = 0;
      for (let i = 0; i < units.length; i++) {
         if (units[i]._id == unitId) {
            index = i;
            break;
         }
      }
      return index
   }

   // 取 state 裡面的 unit
   const getUnitById = (unitId) => {
      let index = getUnitIndex(unitId);
      return (units[index])
   }

   return (
      <Layout>
         <Sider
            breakpoint="lg"
            collapsedWidth="0"
            theme={theme}
            onBreakpoint={broken => {
               console.log(broken);
               if (broken) {
                  setTheme("dark")
               } else {
                  setTheme("light")
               }
            }}
            onCollapse={(collapsed, type) => {
               console.log(type)
            }}
         >
            <div style={{ padding: "1rem" }}>
               <CreateUnitButton updateData={getUnits} style={{ width: "100%" }}></CreateUnitButton>
            </div>
            {units.length != 0 ?
               <Menu theme={theme} mode="inline" defaultSelectedKeys={[units[0]._id]} onClick={showDocumentInUnit}>
                  {units.map(unit => (
                     <Menu.Item key={unit._id} style={{ display: "flex", justifyContent: "space-between" }}>
                        <span className="nav-text">{unit.name}</span>
                        <div style={{ display: "flex", justifyContent: "center", flexDirection: "column" }} onClick={() => deleteUnit(unit.name, unit._id)}>
                           <Icon type="close" />
                        </div>
                     </Menu.Item>
                  ))}
               </Menu>
               :
               <div style={{ display: "flex", justifyContent: "center" }}>還沒有單元喔</div>
            }
         </Sider>
         <Layout>
            {/* <Header style={{ background: '#fff', padding: 0 }} /> */}
            <Content style={{ margin: '24px 16px 0' }}>
               <div className="contentContainer" style={{ padding: 24, background: '#fff', minHeight: "90vh" }}>
                  {
                     // 檢查是否有目前選到的 unit 了
                     currentUnit && <Document unit={getUnitById(currentUnit)}></Document>
                  }
               </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
         </Layout>
      </Layout>
   );
};

export default ClassManager;