import mongoose, { Document, Model } from "mongoose";
import { ObjectID } from 'mongodb';
import { modelHelper } from "./modelHelper";
export type UnitDocument = mongoose.Document & {
   name: string
   belongClassId: string
};

let unitSchema = new mongoose.Schema({
   name: {
      type: String
   },
   belongClassId: {
      type: String
   }
}, { timestamps: true })

export class UnitModel extends modelHelper {

   /**
    * 新增單元
    * @param unit 
    */
   static async createUnit(unit: UnitDocument): Promise<boolean> {
      let newUnit = new Unit(unit)
      return new Promise(function (resolve, reject) {
         newUnit.save(function (err, unit) {
            if (err) {
               resolve(false)
            } else {
               resolve(true)
            }
         });
      })
   }

   /**
    * 修改單元名稱
    * @param unitId 
    * @param newName 
    */
   static async updateUnitName(unitId: string, newName: string): Promise<boolean> {
      const updateData = {
         name: newName
      }
      let res = await this.update(unitId, updateData, Unit);
      return res;
   }

   /**
    * 刪除單元
    * @param unitId 
    */
   static async deleteUnitById(unitId: string): Promise<boolean> {
      let isSuccess = await this.deleteById(unitId, Unit);
      return isSuccess
   }

   static async getUnitInClass(classId: string): Promise<Array<UnitDocument>> {
      let units = await Unit.find({ belongClassId: classId })
      return units
   }
}

export const Unit = mongoose.model<UnitDocument>("Unit", unitSchema);
