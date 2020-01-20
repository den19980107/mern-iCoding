import mongoose, { Document, Model } from "mongoose";
import { modelHelper } from "./modelHelper";

export type testData = {
   input: string,
   output: string
}

export type CodeQutionDocument = mongoose.Document & {
   title: string
   body: string
   testDatas: Array<testData>
   tags: Array<string>
};

let codeQutionSchema = new mongoose.Schema({
   title: {
      type: String,
      require: true
   },
   body: {
      type: String,
      require: true
   },
   testDatas: {
      type: Array,
      require: true
   },
   tags: {
      type: Array
   }
}, { timestamps: true })

export class CodeQutionModel extends modelHelper {
   /**
    * 取得題目
    * @param tag 
    */
   static async getQutions(tag?: string): Promise<Array<CodeQutionDocument>> {
      let codeQutions: Array<CodeQutionDocument> = await CodeQution.find({});
      if (codeQutions) {
         if (tag) {
            let result = [];
            for (let i = 0; i < codeQutions.length; i++) {
               let codeQution = codeQutions[i];
               for (let j = 0; j < codeQution.tags.length; j++) {
                  if (codeQution.tags[j] == tag) {
                     result.push(codeQution);
                     break;
                  }
               }
            }
            return result;
         } else {
            return codeQutions
         }
      } else {
         return null;
      }
   }

   /**
    * 新增題目
    * @param qution 
    */
   static async create(qution: CodeQutionDocument): Promise<boolean> {
      let newQution = new CodeQution(qution)

      return new Promise(function (resolve, reject) {
         newQution.save(function (err) {
            if (err) {
               resolve(false)
            } else {
               resolve(true)
            }
         })
      })
   }

   /**
    * 更改標題
    * @param id 
    * @param newTitle 
    */
   static async updateTitle(id: string, newTitle: string): Promise<boolean> {
      const query = {
         title: newTitle
      }
      let result = await this.update(id, query, CodeQution);
      return result
   }

   /**
    * 更改題目內容
    * @param id 
    * @param newBody 
    */
   static async updateBody(id: string, newBody: string): Promise<boolean> {
      const query = {
         body: newBody
      }
      let result = await this.update(id, query, CodeQution);
      return result
   }

   /**
    * 更改測資
    * @param id 
    * @param newTestDatas 
    */
   static async updateTestData(id: string, newTestDatas: Array<testData>): Promise<boolean> {
      const query = {
         testDatas: newTestDatas
      }
      let result = await this.update(id, query, CodeQution);
      return result
   }

   /**
    * 更改標籤
    * @param id 
    * @param newTages 
    */
   static async updateTags(id: string, newTages: Array<string>): Promise<boolean> {
      const query = {
         tags: newTages
      }
      let result = await this.update(id, query, CodeQution);
      return result
   }
}

export const CodeQution = mongoose.model<CodeQutionDocument>("CodeQution", codeQutionSchema);
