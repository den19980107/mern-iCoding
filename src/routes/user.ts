import * as express from 'express';
import { Request, Response, NextFunction } from 'express'
import { UserDocument } from '../models/user';
const router = express.Router();
const User = require('../models/user');

router.get('/getUser', function (req: Request, res: Response) {
   if (req.user) {
      const postUser = req.user as UserDocument;
      User.findById(postUser._id, function (err, user) {
         res.json(user)
      })
   } else {
      res.status(500).json({ message: "尚未登入" })
   }
})

module.exports = router;
