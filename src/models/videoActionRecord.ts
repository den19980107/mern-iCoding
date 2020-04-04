import mongoose, { Document, Model } from "mongoose";
import { ObjectID } from 'mongodb';
import { modelHelper } from "./modelHelper";
export type VideoActionRecordDocument = mongoose.Document & {
    actionName: string
    from: number
    to: number
    timeStamp: number
    userId: string
    videoId: string
};

let videoActionRecordSchema = new mongoose.Schema({
    actionName: {
        type: String
    },
    from: {
        type: Number
    },
    to: {
        type: Number
    },
    timeStamp: {
        type: Number
    },
    userId: {
        type: String
    },
    videoId: {
        type: String
    },
}, { timestamps: true })

export class VideoActionRecordModel extends modelHelper {

    static async createVideoActionRecord(videoActionRecord: VideoActionRecordDocument): Promise<boolean> {
        let newVideoActionRecord = new VideoActionRecord(videoActionRecord)
        return new Promise(function (resolve, reject) {
            newVideoActionRecord.save(function (err, record) {
                console.log(record)
                if (err) {
                    resolve(false)
                } else {
                    resolve(true)
                }
            });
        })
    }
}

export const VideoActionRecord = mongoose.model<VideoActionRecordDocument>("VideoActionRecord", videoActionRecordSchema);
