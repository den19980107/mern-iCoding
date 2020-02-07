import mongoose from "mongoose";
import { ObjectID } from 'mongodb';
import { resolve, reject } from "bluebird";
import { modelHelper } from "./modelHelper";
export type TestDocument = mongoose.Document & {
   name: String
   uploader: String,
   belongUnitId: String,
   body: String
};

let testSchema = new mongoose.Schema({
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


export class TestModel extends modelHelper {
   /**
    * 建立教材
    * @param material 
    */
   static async createTest(material: TestDocument): Promise<boolean> {
      let newTest = new Test(material)
      return new Promise(function (resolve, reject) {
         newTest.save(function (err) {
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
   static async getTestById(id: string): Promise<TestDocument> {
      let test: TestDocument = await TestModel.getById(id, Test)
      return test
   }

   /**
    * 刪除教材 by id
    * @param id 
    */
   static async deleteTestById(id: string): Promise<boolean> {
      let res = await this.deleteById(id, Test)
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
      let res = await this.update(id, updateData, Test);
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
      let res = await this.update(id, updateData, Test);
      return res;
   }

   static async getTestInUnit(unitId: string): Promise<Array<TestDocument>> {
      let tests: Array<TestDocument> = await Test.find({ belongUnitId: unitId })
      return tests
   }
}
export const Test = mongoose.model<TestDocument>("Test", testSchema);
