import mongoose from "mongoose";
import { ObjectID } from 'mongodb';
import { resolve, reject } from "bluebird";
import { modelHelper } from "./modelHelper";
export type MaterialDocument = mongoose.Document & {
   name: String
   uploader: String,
   belongUnitId: String,
   body: String
};

let materialSchema = new mongoose.Schema({
   name: {
      type: String,
      require: true
   },
   // 上傳者id
   uploader: {
      type: String,
      require: true
   },
   belongUnitId: {
      type: String
   },
   body: {
      type: String
   }
}, { timestamps: true })


export class MaterialModel extends modelHelper {
   /**
    * 建立教材
    * @param material 
    */
   static async createMaterial(material: MaterialDocument): Promise<boolean> {
      let newMaterial = new Material(material)
      return new Promise(function (resolve, reject) {
         newMaterial.save(function (err) {
            if (err) {
               resolve(false)
            } else {
               resolve(true)
            }
         })
      })
   }

   /**
    * 取得 material by id
    * @param id 
    */
   static async getMaterialById(id: string): Promise<MaterialDocument> {
      let material: MaterialDocument = await MaterialModel.getById(id, Material)
      return material
   }

   /**
    * 刪除教材 by id
    * @param id 
    */
   static async deleteMaterialById(id: string): Promise<boolean> {
      let res = await this.deleteById(id, Material)
      return res
   }

   /**
    * 更新教材名稱 by id
    * @param id 
    * @param newName 
    */
   static async updateNameById(id: string, newName: string): Promise<boolean> {
      const updateData = {
         name: newName
      }
      let res = await this.update(id, updateData, Material);
      return res;
   }

   /**
    * 更新教材內容
    * @param id 
    * @param newBody 
    */
   static async updateBodyById(id: string, newBody: string): Promise<boolean> {
      const updateData = {
         body: newBody
      }
      let res = await this.update(id, updateData, Material);
      return res;
   }

   static async getMaterialInUnit(unitId: string): Promise<Array<MaterialDocument>> {
      let materials: Array<MaterialDocument> = await Material.find({ belongUnitId: unitId })
      return materials
   }
}
export const Material = mongoose.model<MaterialDocument>("Material", materialSchema);
