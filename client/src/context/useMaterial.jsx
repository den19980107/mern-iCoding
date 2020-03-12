import React, { useEffect, useState } from 'react';

import api from '../api'
const useMaterial = (id) => {
   const [videos, setVideos] = useState(null);
   const [materials, setMaterials] = useState(null);
   const [tests, setTests] = useState(null)
   useEffect(() => {
      if (id) {
         getDocumentData()
      }
   }, [id])
   const getDocumentData = async () => {
      let units = await api.Class.unit.getAllUnitByClassId(id);
      let totalVideos = [];
      let totalMaterial = [];
      let totalTest = []
      if (units && units.length != 0) {
         for (let i = 0; i < units.length; i++) {
            let material = await getMaterial(units[i]._id);
            let videos = await getVideo(units[i]._id);
            let tests = await getTest(units[i]._id);

            totalVideos = totalVideos.concat(videos)
            totalMaterial = totalMaterial.concat(material)
            totalTest = totalTest.concat(tests)
         }
      }
      setVideos(totalVideos);
      setTests(totalTest);
      setMaterials(totalMaterial)
   }

   const getMaterial = async (unitId) => {
      let materials = await api.Class.material.getMaterialsInUnit(unitId)
      console.log(materials)
      return materials
   }

   const getVideo = async (unitId) => {
      let videos = await api.Class.video.getVideosInUnit(unitId);
      console.log(videos)

      return videos
   }

   const getTest = async (unitId) => {
      let tests = await api.Class.test.getTestInUnit(unitId)
      console.log(tests)

      return tests
   }
   return [videos, materials, tests]
};

export default useMaterial;