import mongoose from "mongoose";
import { ObjectID } from 'mongodb';
import { resolve, reject } from "bluebird";
import { modelHelper } from "./modelHelper";
export type VideoDocument = mongoose.Document & {
   videoName: String
   uploader: String,
   fileName: String
};

let videoSchema = new mongoose.Schema({
   videoName: {
      type: String,
      require: true
   },
   uploader: {
      type: String,
      require: true
   },
   fileName: {
      type: String,
      require: true
   }
}, { timestamps: true })


export class VideoModel extends modelHelper {
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

   static async getVideoById(id: string): Promise<VideoDocument> {
      let video: VideoDocument = await VideoModel.getById(id, Video)
      return video
   }
}
export const Video = mongoose.model<VideoDocument>("Video", videoSchema);
