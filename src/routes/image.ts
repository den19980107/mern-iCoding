import * as express from 'express';
import { Request, Response, NextFunction } from 'express'
import Grid from 'gridfs-stream';
import { getUploader, findFileByFileName } from '../common/upload';
import mongoose from 'mongoose'
import config from '../config/keys';
import { ImageModel, ImageDocument, Image } from '../models/Image';
import { ObjectID } from 'mongodb'
const router = express.Router();
const imageUploader = getUploader('image');

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

// get image
router.get('/:imageId', async function (req: Request, res: Response) {
   let imageData: ImageDocument = await ImageModel.getImageById(req.params.imageId);
   if (imageData) {
      gfs.files.findOne({
         filename: imageData.fileName
      }, (err, img) => {
         //check if image exists
         if (!img || img.length === 0) {
            return res.status(404).json({
               err: 'No image exists'
            })
         }
         //check if image
         if (img.contentType === 'image/jpeg' || img.contentType === "image/png") {
            const readstream = gfs.createReadStream(img.filename);
            readstream.pipe(res);
         } else {
            return res.status(404).json({
               err: 'No an image'
            })
         }
      });
   } else {
      res.status(404).json({ errors: [{ msg: "找不到照片" }] })
   }
})

// 上傳照片
router.post('/upload', imageUploader.any(), function (req: Request, res: Response) {
   if (req.files && req.files.length > 0) {
      let files: any = req.files;
      files.forEach(async file => {
         if (file.mimetype.startsWith("image/")) {
            const originalName = file.originalname
            const uploader = req.user._id
            const fileName = file.filename

            let newImage = new Image;
            newImage._id = new ObjectID();
            newImage.imageName = originalName;
            newImage.fileName = fileName
            newImage.uploader = uploader;

            let isSuccess = await ImageModel.createImage(newImage);
            if (isSuccess) {
               res.status(200).json({ message: "新增成功", imageUrl: req.headers.origin + '/api/image/' + newImage._id })
            } else {
               res.status(500).json({ errors: [{ msg: "新增失敗" }] })
            }
         }
      })
   }
})



export = router;
