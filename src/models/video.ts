import mongoose from "mongoose";
import { ObjectID } from 'mongodb';
import { resolve, reject } from "bluebird";
import { modelHelper } from "./modelHelper";
export type VideoDocument = mongoose.Document & {
   name: String
   uploader: String,
   fileName: String,
   belongUnitId: String,
   displayName: String
};

let videoSchema = new mongoose.Schema({
   name: {
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
   },
   belongUnitId: {
      type: String
   },
   displayName: {
      type: String
   }
}, { timestamps: true })


export class VideoModel extends modelHelper {
   /**
    * 建立影片
    * @param video 
    */
   static async createVideo(video: VideoDocument): Promise<boolean> {
      let newVideo = new Video(video)
      return new Promise(function (resolve, reject) {
         newVideo.save(function (err) {
            if (err) {
               resolve(false)
            } else {
               resolve(true)
            }
         })
      })
   }

   /**
    * 取得影片 by id
    * @param id 
    */
   static async getVideoById(id: string): Promise<VideoDocument> {
      let video: VideoDocument = await VideoModel.getById(id, Video)
      return video
   }

   /**
    * 更新影片名稱 by id
    * @param id 
    * @param newName 
    */
   static async updateVideoNameById(id: string, newName: string): Promise<boolean> {
      const updateData = {
         name: newName
      }
      let res = await this.update(id, updateData, Video);
      return res;
   }

   /**
    * 取得單元內影片
    * @param unitId 
    */
   static async getVideoInUnit(unitId: string): Promise<Array<VideoDocument>> {
      let videos: Array<VideoDocument> = await Video.find({ belongUnitId: unitId })
      return videos
   }


   static async deleteVideoById(videoId: string): Promise<boolean> {
      let res = await this.deleteById(videoId, Video);
      return res
   }

}
export const Video = mongoose.model<VideoDocument>("Video", videoSchema);
