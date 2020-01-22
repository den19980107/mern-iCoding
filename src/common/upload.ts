//上傳照片
import mongoose from 'mongoose';
import crypto from 'crypto';
import config from '../config/keys';
import multer from 'multer';
import path from 'path';
import GridFsStorage from 'multer-gridfs-storage';
import Grid from 'gridfs-stream'
import { ReadStream } from 'fs';
//init gfs
let gfs

mongoose.connect(config.MONGODB.MONGODB_URI);
let db = mongoose.connection;


//check connection
db.once('open', function () {
   console.log("connect to mongodb");

   //init Stream
   gfs = Grid(db.db, mongoose.mongo);
   gfs.collection('uploads');
});

//create storage engine

// img
const imgStorage = new GridFsStorage({
   url: config.MONGODB.MONGODB_URI,
   file: (req, file) => {
      return new Promise((resolve, reject) => {
         crypto.randomBytes(16, (err, buf) => {
            if (err) {
               return reject(err);
            }
            const filename = buf.toString('hex') + path.extname(file.originalname);
            const fileInfo = {
               filename: filename,
               bucketName: 'uploads'
            };
            resolve(fileInfo);
         });
      });
   }
});

const imgUploader = multer({
   storage: imgStorage
});
// end of img

// video 
const videoStorage = new GridFsStorage({
   url: config.MONGODB.MONGODB_URI,
   file: (req, file) => {
      return new Promise((resolve, reject) => {
         crypto.randomBytes(16, (err, buf) => {
            if (err) {
               return reject(err);
            }
            const filename = buf.toString('hex') + path.extname(file.originalname);
            const fileInfo = {
               filename: filename,
               bucketName: 'videos'
            };
            resolve(fileInfo);
         });
      });
   }
});

const videoUploader = multer({
   storage: videoStorage
});

// end of video



const image = "image";
const video = "video"
export function getUploader(key: string) {
   switch (key) {
      case image:
         return imgUploader
      case video:
         return videoUploader
   }
}


export async function findFileByFileName(filename: string): Promise<ReadStream> {
   return new Promise(function (resolve, reject) {
      gfs.files.findOne({
         filename: filename
      }, (err, img) => {
         if (err) {
            resolve(null)
         } else {
            resolve(gfs.createReadStream(img.filename));
         }
      })
   })
}