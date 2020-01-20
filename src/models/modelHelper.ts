import { ObjectID } from 'mongodb';
import { Model, Document } from 'mongoose';
import { cat } from 'shelljs';
import { resolve } from 'bluebird';

export class modelHelper {
   static async create(data: any, model: Model<any>): Promise<boolean> {
      try {
         let newData = new model(data);
         return new Promise(function (resolve, reject) {
            newData.save(function (err, createData) {
               if (err) {
                  console.log("save erro in modelHelper err = ", err)
                  resolve(false)
               } else {
                  resolve(true)
               }
            });
         })
      } catch (err) {
         console.log("create error in modelHelper err = ", err)
      }
   }
   static async deleteById(id: string, model: Model<any>): Promise<boolean> {
      try {
         return new Promise(function (resolve, reject) {
            model.deleteOne({ _id: new ObjectID(id) }, function (err) {
               if (err) {
                  console.log("deleteOne error in model Helper err = ", err)
                  resolve(false)
               } else {
                  resolve(true)
               }
            })
         })
      } catch (err) {
         console.log("delete error in modelHelper err = ", err)
      }
   }
   static async update(id: string, keysValue: object, model: Model<any>): Promise<boolean> {
      let modelData = await model.findById(id);
      if (modelData) {
         const ObjectId: ObjectID = new ObjectID(id);
         const updateQuery = {
            $set: keysValue
         }
         return new Promise(function (resolve, reject) {
            model.updateOne({ _id: ObjectId }, updateQuery, function (err) {
               if (err) {
                  resolve(false)
               } else {
                  resolve(true)
               }
            })
         })
      } else {
         return false
      }
   }

   static async getById(id: string, model: Model<any>): Promise<any> {
      try {
         return new Promise(function (resolve, reject) {
            model.findById(id, function (err, data) {
               if (err) {
                  resolve(null)
               } else {
                  resolve(data)
               }
            })
         })
      } catch (err) {
         console.log("getById error in modelHelper err = " + err);
      }
   }

   static async getAll(model: Model<any>): Promise<any> {
      try {
         return new Promise(function (resolve, reject) {
            model.find({}, function (err, datas) {
               if (err) {
                  resolve(false)
               } else {
                  resolve(datas)
               }
            })
         })
      } catch (err) {
         console.log("getById error in modelHelper err = " + err);
      }
   }
}