import mongoose from "mongoose";
import { ObjectID } from 'mongodb';
import { resolve, reject } from "bluebird";
import { modelHelper } from "./modelHelper";
export type ImageDocument = mongoose.Document & {
   imageName: String
   uploader: String,
   fileName: String
};

let imageSchema = new mongoose.Schema({
   imageName: {
      type: String,
      require: true
   },
   // 上傳者id
   uploader: {
      type: String,
      require: true
   },
   fileName: {
      type: String,
      require: true
   }
}, { timestamps: true })


export class ImageModel extends modelHelper {
   static async createImage(image: ImageDocument): Promise<boolean> {
      let newImage = new Image(image)
      return new Promise(function (resolve, reject) {
         newImage.save(function (err) {
            if (err) {
               resolve(false)
            } else {
               resolve(true)
            }
         })
      })
   }

   static async getImageById(id: string): Promise<ImageDocument> {
      let image: ImageDocument = await ImageModel.getById(id, Image)
      return image
   }
}
export const Image = mongoose.model<ImageDocument>("Image", imageSchema);
