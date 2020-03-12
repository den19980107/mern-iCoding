import mongoose, { Document, Model } from "mongoose";
import { ObjectID } from 'mongodb';
import { modelHelper } from "./modelHelper";
export type ClassDocument = mongoose.Document & {
   name: string
   outline: string
   teacherId: string
   credit: number
   classTime: Array<string>
   classRoom: string
   isLaunched: boolean
   coverImage: string
   introduction: string
   introVideoUrl: string
};

let classSchema = new mongoose.Schema({
   name: {
      type: String
   },
   outline: {
      type: String
   },
   teacherId: {
      type: String
   },
   credit: {
      type: Number
   },
   classTime: {
      type: Array
   },
   classRoom: {
      type: String
   },
   isLaunched: {
      type: Boolean,
      default: false
   },
   coverImage: {
      type: String,
   },
   introduction: {
      type: String
   },
   introVideoUrl: {
      type: String
   }
}, { timestamps: true })

export class ClassModel extends modelHelper {

   static async createClass(classInfo: ClassDocument): Promise<boolean> {
      let newClass = new Class(classInfo)
      return new Promise(function (resolve, reject) {
         newClass.save(function (err, user) {
            console.log(err, user)
            if (err) {
               resolve(false)
            } else {
               resolve(true)
            }
         });
      })
   }
   /**
    * 取得課程 by id
    * @param id 
    */
   static async getClassById(id: string): Promise<ClassDocument> {
      let classInfo: ClassDocument = await Class.findById(id);
      console.log(classInfo)
      return classInfo
   }
   /**
    * 檢查 class 是否存在
    * @param {string} classId
    * @returns {boolean} isExisted // false if not exist
    */
   static async checkClassExisted(classId: string): Promise<boolean> {
      let isExisted: boolean = false;
      let classInfo = await Class.findById(classId);
      if (classInfo) {
         isExisted = true
      }
      return isExisted;
   }

   /**
    * 更新課程名稱
    * @param classId 
    * @param newName 
    */
   static async updateClassName(classId: string, newName: string): Promise<boolean> {
      const updateData = {
         name: newName
      }
      let res = await this.update(classId, updateData, Class);
      return res;
   }

   /**
    * 更新課程簡介
    * @param classId 
    * @param outline 
    */
   static async updateOutline(classId: string, outline: string): Promise<boolean> {
      const updateData = {
         outline: outline
      }
      let res = await this.update(classId, updateData, Class);
      return res;
   }
   /**
    * 更新課程學分
    * @param classId 
    * @param newCredit 
    */
   static async updateClassCredit(classId: string, newCredit: number): Promise<boolean> {
      const updateData = {
         credit: newCredit
      }
      let res = await this.update(classId, updateData, Class);
      return res;
   }

   /**
    * 更新上課時間
    * @param classId 
    * @param newTime 
    */
   static async updateClassTime(classId: string, newTime: Date): Promise<boolean> {
      const updateData = {
         classTime: newTime
      }
      let res = await this.update(classId, updateData, Class);
      return res;
   }

   /**
    * 更新上課教室
    * @param classId 
    * @param newClassRoom 
    */
   static async updateClassRoom(classId: string, newClassRoom: string): Promise<boolean> {
      const updateData = {
         classRoom: newClassRoom
      }
      let res = await this.update(classId, updateData, Class);
      return res;
   }

   /**
    * 上架課程
    * @param classId 
    */
   static async launchClass(classId: string): Promise<boolean> {
      const updateData = {
         isLaunched: true
      }
      let res = await this.update(classId, updateData, Class);
      return res;
   }

   /**
    * 下架課程
    * @param classId 
    */
   static async closeClass(classId: string): Promise<boolean> {
      const updateData = {
         isLaunched: false
      }
      let res = await this.update(classId, updateData, Class);
      return res;
   }

   /**
    * 更新封面照片
    * @param classId 
    * @param newImg 
    */
   static async updateCoverImage(classId: string, newImg: string): Promise<boolean> {
      const updateData = {
         coverImage: newImg
      }
      let res = await this.update(classId, updateData, Class);
      return res;
   }

   /**
    * 更新自我介紹
    * @param classId 
    * @param newIntroduction 
    */
   static async updateIntroduction(classId: string, newIntroduction: string): Promise<boolean> {
      const updateData = {
         introduction: newIntroduction
      }
      let res = await this.update(classId, updateData, Class);
      return res;
   }

   /**
    * 取得user開課清單
    * @param userId 
    */
   static async getUserClasses(userId: string): Promise<Array<ClassDocument>> {
      let classes = await Class.find({
         teacherId: userId
      })
      if (classes) {
         return classes
      } else {
         return []
      }
   }

   /**
    * 更新封面影片
    * @param classId 
    * @param newVideoUrl 
    */
   static async updateIntroVideoUrl(classId: string, newVideoUrl: string): Promise<boolean> {
      const updateData = {
         introVideoUrl: newVideoUrl
      }
      let res = await this.update(classId, updateData, Class);
      return res;
   }
}

export const Class = mongoose.model<ClassDocument>("Class", classSchema);
