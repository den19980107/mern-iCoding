import * as express from 'express';
import { ObjectID } from 'mongodb'
import { Request, Response, NextFunction } from 'express'
import { getUploader, findFileByFileName } from '../common/upload';
import Grid from 'gridfs-stream';
import mongoose from 'mongoose'
import config from '../config/keys';
import { Video, VideoModel, VideoDocument } from '../models/video';
const router = express.Router();
const videoUpload = getUploader('video');
//init gfs   
let gfs

mongoose.connect(config.MONGODB.MONGODB_URI);
let db = mongoose.connection;


//check connection
db.once('open', function () {
   console.log("connect to mongodb");

   //init Stream
   gfs = Grid(db.db, mongoose.mongo);
   gfs.collection('videos');
});


router.get('/:videoId', function (req: Request, res: Response) {
   Video.findById(req.params.videoId, function (err, video: VideoDocument) {
      if (err || !video) {
         res.status(500).json({ errors: [{ msg: "沒有此影片" }] })
         return
      }
      const fileName = video.fileName;
      gfs.files.findOne({ //找出影片資訊‘
         filename: fileName
      }, (err, video) => {
         if (!video || video.length === 0) {
            return res.status(404).json({
               err: 'No Video exists'
            })
         }
         if (video.contentType.startsWith("video/")) { // 檢視影片型態是否為 video
            const readstream = gfs.createReadStream(video.filename);
            readstream.pipe(res);
         } else {
            return res.status(404).json({
               err: 'No an Video'
            })
         }
      });

   })
})

router.post('/upload', videoUpload.any(), function (req: Request, res: Response) {
   if (req.files && req.files.length > 0) {
      let files: any = req.files;
      files.forEach(async file => {
         if (file.mimetype.startsWith("video/")) {
            const originalName = file.originalname
            const uploader = req.user._id
            const fileName = file.filename
            let belongUnitId: string;
            if (req.body.belongUnitId) {
               belongUnitId = req.body.belongUnitId
            }
            let displayName: string;
            if (req.body.displayName) {
               displayName = req.body.displayName
            }

            let newVideo = new Video();
            newVideo._id = new ObjectID();
            newVideo.name = originalName;
            newVideo.fileName = fileName
            newVideo.uploader = uploader;
            if (belongUnitId) {
               newVideo.belongUnitId = belongUnitId
            }
            if (displayName) {
               newVideo.displayName = displayName
            }

            let isSuccess = await VideoModel.createVideo(newVideo);
            if (isSuccess) {
               res.status(200).json({ message: "新增成功", videoUrl: req.headers.origin + '/video/' + newVideo._id })
            } else {
               res.status(500).json({ errors: [{ msg: "新增失敗" }] })
            }
         }
      })
   }
})

export = router;
