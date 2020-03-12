import axios from 'axios'
import { _get, _post } from './common';
const getAllClass = async () => {
   const url = "/api/class"
   let res = await _get(url, "api getAllClass error")
   return res
}
/**
 * 
 * @param {Class} classInfo 
 */
const createClass = async (classInfo) => {
   const url = "/api/class/create"
   let res = await _post(url, classInfo, "api createClass error")
   return res
}
/**
 * 
 * @param {string} classId 
 */
const getClassById = async (classId) => {
   const url = `/api/class/${classId}`
   let res = await _get(url, "api getClassById error")
   return res
}
/**
 * 
 * @param {string} classId 
 * @param {string} name 
 */
const updateClassNamme = async (classId, name) => {
   const url = `/api/class/updateClassName/${classId}`
   let res = await _post(url, { name: name }, "api updateClassNamme error")
   return res
}
/**
 * 
 * @param {string} classId 
 * @param {string} outline 
 */
const updateOutline = async (classId, outline) => {
   const url = `/api/class/updateOutline/${classId}`
   let res = await _post(url, { outline: outline }, "api updateOutline error")
   return res
}
/**
 * 
 * @param {string} classId 
 * @param {string} credit 
 */
const updateCredit = async (classId, credit) => {
   const url = `/api/class/updateCredit/${classId}`
   let res = await _post(url, { credit: credit }, "api updateCredit error")
   return res
}
/**
 * 
 * @param {string} classId 
 * @param {string} classTime 
 */
const updateClassTime = async (classId, classTime) => {
   const url = `/api/class/updateClassTime/${classId}`
   let res = await _post(url, { classTime: classTime }, "api updateClassTime error")
   return res
}

/**
 * 
 * @param {string} classId 
 * @param {string} classRoom 
 */
const updateClassRoom = async (classId, classRoom) => {
   const url = `/api/class/updateClassRoom/${classId}`
   let res = await _post(url, { classRoom: classRoom }, "api updateClassRoom error")
   return res
}

/**
 * 上架課程
 * @param {string} classId 
 */
const launchClass = async (classId) => {
   const url = `/api/class/launchClass/${classId}`
   let res = await _post(url, null, "api launchClass error")
   return res
}
/**
 * 下架課程
 * @param {string} classId 
 */
const takeOffClass = async (classId) => {
   const url = `/api/class/takeOffClass/${classId}`
   let res = await _post(url, null, "api takeOffClass error")
   return res
}
/**
 * 
 * @param {string} classId 
 * @param {string} newIntroVideoUrl 
 */
const updateIntroVideo = async (classId, newIntroVideoUrl) => {
   const url = `/api/class/updateIntroVideo`
   let res = await _post(url, {
      newIntroVideoUrl: newIntroVideoUrl,
      classId: classId
   }, "api updateIntroVideo error")
   return res
}

const takeCourse = async (classId, studentId) => {
   const url = `/api/class/takeCourse`
   let res = await _post(url, {
      studentId: studentId,
      classId: classId
   }, "api takeCourse error")
   return res
}

const comfirmStudent = async (classId, studentId) => {
   const url = `/api/class/comfirmStudent`
   let res = await _post(url, {
      studentId: studentId,
      classId: classId
   }, "api comfirmStudent error")
   return res
}

const quitClass = async (classId, studentId) => {
   const url = `/api/class/quitClass`
   let res = await _post(url, {
      studentId: studentId,
      classId: classId
   }, "api quitClass error")
   return res
}
const getStudentTakeCourseList = async (classId) => {
   const url = `/api/class/${classId}/studentStatusList`
   let res = await _get(url, "api getStudentTakeCourseList error")
   return res
}
const createUnit = async (classId, unitName) => {
   const url = `/api/class/createUnit`
   let res = await _post(url, {
      unitName: unitName,
      classId: classId
   }, "api createUnit error")
   return res
}

const getAllUnitByClassId = async (classId) => {
   const url = `/api/class/${classId}/units`
   let res = await _get(url, "api getAllUnitByClassId error")
   return res
}

const updateUnitName = async (unitId, unitName) => {
   const url = `/api/class/updateUnitName/${unitId}`
   let res = await _post(url, {
      unitName: unitName
   }, "api updateUnitName error")
   return res
}

const deleteUnit = async (unitId) => {
   const url = `/api/class/deleteUnit/${unitId}`
   let res = await _post(url, null, "api deleteUnit error")
   return res
}

const createMaterial = async (unitId, name, body) => {
   const url = `/api/class/createMaterial`
   let res = await _post(url, {
      unitId,
      name,
      body
   }, "api createMaterial error")
   return res
}

const getMaterialById = async (materialId) => {
   const url = `/api/class/material/${materialId}`
   let res = await _get(url, "api getMaterialById error")
   return res
}

const updateMaterialNameById = async (materialId, name) => {
   const url = `/api/class/updateMaterialName/${materialId}`
   let res = await _post(url, {
      name
   }, "api updateMaterialNameById error")
   return res
}

const updateMaterialBodyById = async (materialId, body) => {
   const url = `/api/class/updateMaterialBody/${materialId}`
   let res = await _post(url, {
      body
   }, "api updateMaterialBodyById error")
   return res
}

const getMaterialsInUnit = async (unitId) => {
   const url = `/api/class/materialInUnit/${unitId}`
   let res = await _get(url, "api getMaterialsInUnit error")
   return res
}

const deleteMaterialById = async (materialId) => {
   const url = `/api/class/deleteMaterial/${materialId}`
   let res = await _post(url, null, "api deleteMaterialById error")
   return res
}

const createTest = async (unitId, name, body) => {
   const url = `/api/class/createTest`
   let res = await _post(url, {
      unitId,
      name,
      body
   }, "api createTest error")
   return res
}

const updateTestName = async (testId, name) => {
   const url = `/api/class/updateTestName/${testId}`
   let res = await _post(url, {
      name
   }, "api updateTestName error")
   return res
}

const updateTestlBody = async (testId, body) => {
   const url = `/api/class/updateTestlBody/${testId}`
   let res = await _post(url, {
      body
   }, "api updateTestlBody error")
   return res
}

const getTestInUnit = async (unitId) => {
   const url = `/api/class/testInUnit/${unitId}`
   let res = await _get(url, "api getTestInUnit error")
   return res
}

const deleteTestById = async (testId) => {
   const url = `/api/class/deleteTest/${testId}`
   let res = await _post(url, null, "api deleteTestById error")
   return res
}

const updateVideoName = async (videoId, name) => {
   const url = `/api/class/updateVideoName/${videoId}`
   let res = await _post(url, { name: name }, "api updateVideoName error")
   return res
}

const getVideosInUnit = async (unitId) => {
   const url = `/api/class/videoInUnit/${unitId}`
   let res = await _get(url, "api getVideosInUnit error")
   return res
}

export default {
   getAllClass,
   createClass,
   getClassById,
   updateClassNamme,
   updateOutline,
   updateCredit,
   updateClassTime,
   updateClassRoom,
   launchClass,
   takeOffClass,
   updateIntroVideo,
   student: {
      takeCourse,
      quitClass
   },
   teacher: {
      comfirmStudent
   },
   getStudentTakeCourseList,
   unit: {
      createUnit,
      getAllUnitByClassId,
      updateUnitName,
      deleteUnit
   },
   material: {
      createMaterial,
      getMaterialById,
      updateMaterialNameById,
      updateMaterialBodyById,
      getMaterialsInUnit,
      deleteMaterialById
   },
   test: {
      createTest,
      updateTestName,
      updateTestlBody,
      getTestInUnit,
      deleteTestById
   },
   video: {
      getVideosInUnit,
      updateVideoName
   }
}