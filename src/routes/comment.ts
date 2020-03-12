import * as express from 'express';
import { Request, Response, NextFunction } from 'express'
import { UserDocument, User, UserModel } from '../models/user';
import { ClassDocument, ClassModel } from '../models/class';
import { StudentTakeCourseModel, StudentTakeCourseDocument } from '../models/studentTakeCourse';
import { CommentModel, CommentDocument, Comment } from '../models/comment';
const router = express.Router();

router.post('/create', async function (req: Request, res: Response) {
   // const { belongId, body } = req.body
   // let newComment: CommentDocument;
   // newComment.userId = req.user._id.toString();
   // newComment.belongId = belongId;
   // newComment.body = body
   const userId = req.user._id;
   const belongId = req.body.belongId;
   const body = req.body.body;
   let newComment: CommentDocument = new Comment({
      userId: userId,
      belongId: belongId,
      body: body,
   })
   let isSuccess = CommentModel.createComments(newComment)
   if (isSuccess) {
      res.status(200).json({ message: "新增留言成功！" })
   } else {
      res.status(500).json({ error: { msg: ["新增留言失敗"] } })
   }
})

router.get("/video/:videoId", async function (req, res) {
   const videoId = req.params.videoId;
   let comments = await CommentModel.getComments(videoId);
   comments = comments.sort(function (a, b) {
      return b.createdAt.getTime() - a.createdAt.getTime()
   });
   if (comments) {
      res.status(200).json(comments)
   } else {
      res.status(500).json({ errors: [{ msg: "取得影片留言錯誤！" }] })
   }
})


router.get("/material/:materialId", async function (req, res) {
   const materialId = req.params.materialId;
   let comments = await CommentModel.getComments(materialId);
   comments = comments.sort(function (a, b) {
      return b.createdAt.getTime() - a.createdAt.getTime()
   });
   if (comments) {
      res.status(200).json(comments)
   } else {
      res.status(500).json({ errors: [{ msg: "取得教材留言錯誤！" }] })
   }
})


router.get("/test/:testId", async function (req, res) {
   const testId = req.params.testId;
   let comments = await CommentModel.getComments(testId);
   comments = comments.sort(function (a, b) {
      return b.createdAt.getTime() - a.createdAt.getTime()
   });
   if (comments) {
      res.status(200).json(comments)
   } else {
      res.status(500).json({ errors: [{ msg: "取得測驗留言錯誤！" }] })
   }
})


export = router;
