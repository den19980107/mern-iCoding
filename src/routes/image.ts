import * as express from 'express';
import { Request, Response, NextFunction } from 'express'
import Grid from 'gridfs-stream';
import mongoose from 'mongoose'
import config from '../config/keys';
const router = express.Router();
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
router.get('/:imageName', function (req: Request, res: Response) {
   gfs.files.findOne({
      filename: req.params.imageName
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
})



export = router;
