import * as express from 'express';
import { Request, Response, NextFunction } from 'express'
import { ClassModel, ClassDocument, Class } from '../models/class';
import { getUploader, findFileByFileName } from '../common/upload';
import { UserModel, User, UserDocument } from '../models/user';
import { ReadStream } from 'fs';
const router = express.Router();
const imageUpload = getUploader('image');

router.get('/', async function (req: Request, res: Response) {
   let classes: ClassDocument[] = await ClassModel.getAll(Class);
   let data: any[] = [];
   for (let i = 0; i < classes.length; i++) {
      const classData = classes[i];
      const teacher: UserDocument = await UserModel.getById(classData.teacherId, User);
      data.push({
         classData: classData,
         teacher: teacher
      })
   }
   if (classes) {
      res.status(200).json(data)
   } else {
      res.status(500).json({ errors: [{ msg: "取得課程錯誤！" }] })
   }
})

/**
 * 新增課程
 */
router.post('/create', async function (req: Request, res: Response) {
   req.checkBody('name', "課程名稱未填寫！").notEmpty();
   let errors = req.validationErrors();
   if (errors) {
      res.status(500).json(errors)
      return
   }
   let classInfo: ClassDocument = req.body;
   classInfo.isLaunched = false;
   classInfo.teacherId = req.user._id

   if (!classInfo.coverImage) {
      classInfo.coverImage = "https://i.imgur.com/cCAuz8C.jpg";
   } else {
      classInfo.coverImage = req.headers.origin + '/image/' + classInfo.coverImage;
   }

   if (classInfo.introVideoUrl) {
      classInfo.introVideoUrl = req.headers.origin + '/video/' + classInfo.introVideoUrl;
   }

   let isSuccess = await ClassModel.createClass(classInfo);
   if (isSuccess) {
      res.status(200).json({ message: "新增成功！" })
   } else {
      res.status(500).json({ errprs: [{ msg: "新增失敗！" }] })
   }
})

/**
 * 取得課程資料 by id
 */
router.get('/:id', async function (req: Request, res: Response) {
   const id = req.params.id;
   let classInfo: ClassDocument = await ClassModel.getClassById(id);
   if (classInfo) {
      res.status(200).json(classInfo);
   } else {
      res.status(404).json({ errors: [{ msg: "找不到此課程！" }] })

   }
})

/**
 * 更新課程名稱 by id
 */
router.post('/updateClassName/:id', async function (req: Request, res: Response) {
   const id = req.params.id;
   const newName = req.body.name;
   let isSuccess = await ClassModel.updateClassName(id, newName);
   if (isSuccess) {
      res.status(200).json({ message: "更改成功！" })
   } else {
      res.status(500).json({ errlrs: [{ msg: "更新失敗！" }] })
   }
})

/**
 * 更新課程簡介 by id
 */
router.post('/updateOutline/:id', async function (req: Request, res: Response) {
   const id = req.params.id;
   const newOutline = req.body.outline;
   let isSuccess = await ClassModel.updateOutline(id, newOutline);
   if (isSuccess) {
      res.status(200).json({ message: "更改成功！" })
   } else {
      res.status(500).json({ errlrs: [{ msg: "更新失敗！" }] })
   }
})

/**
 * 更新課程學分 by id
 */
router.post('/updateCredit/:id', async function (req: Request, res: Response) {
   const id = req.params.id;
   const newCredit: number = req.body.credit;
   let isSuccess = await ClassModel.updateClassCredit(id, newCredit);
   if (isSuccess) {
      res.status(200).json({ message: "更新成功!" })
   } else {
      res.status(500).json({ errors: [{ msg: "更新失敗！" }] })
   }
})

/**
 * 更新上課時間
 */
router.post('/updateClassTime/:id', async function (req: Request, res: Response) {
   const id = req.params.id;
   const newTime = req.body.classTime;
   let isSuccess = await ClassModel.updateClassTime(id, newTime);
   if (isSuccess) {
      res.status(200).json({ message: "更新成功!" })
   } else {
      res.status(500).json({ errors: [{ msg: "更新失敗！" }] })
   }
})

/**
 * 更新上課教室
 */
router.post('/updateClassRoom/:id', async function (req: Request, res: Response) {
   const id = req.params.id;
   const newClassRoom = req.body.classRoom;
   let isSuccess = await ClassModel.updateClassRoom(id, newClassRoom);
   if (isSuccess) {
      res.status(200).json({ message: "更新成功!" })
   } else {
      res.status(500).json({ errors: [{ msg: "更新失敗！" }] })
   }
})

/**
 * 上架課程
 */
router.post('/launchClass/:id', async function (req: Request, res: Response) {
   const id = req.params.id;
   let isSuccess = await ClassModel.launchClass(id);
   if (isSuccess) {
      res.status(200).json({ message: "更新成功!" })
   } else {
      res.status(500).json({ errors: [{ msg: "更新失敗！" }] })
   }
})

/**
 * 下架課程
 */
router.post('/launchClass/:id', async function (req: Request, res: Response) {
   const id = req.params.id;
   let isSuccess = await ClassModel.closeClass(id);
   if (isSuccess) {
      res.status(200).json({ message: "更新成功!" })
   } else {
      res.status(500).json({ errors: [{ msg: "更新失敗！" }] })
   }
})

/**
 * 上傳課程封面照片
 */
router.post('/uploadCoverImage', imageUpload.any(), async function (req: Request, res: Response) {
   if (req.files.length > 0) {
      const newImage = req.files[0].filename;
      res.status(200).json({ message: "上傳成功", imageName: newImage })
   } else {
      res.status(500).json({ errors: [{ msg: "上傳失敗！" }] })
   }
})

/**
 * 更新課程封面照片
 */
router.post('/updateCoverImage/:id', imageUpload.any(), async function (req: Request, res: Response) {
   if (req.files.length > 0) {
      const id = req.params.id;
      const newImage = req.files[0].filename;
      let isSuccess = await ClassModel.updateCoverImage(id, newImage);
      if (isSuccess) {
         res.status(200).json({ message: "更新成功!" })
      } else {
         res.status(500).json({ errors: [{ msg: "更新失敗！" }] })
      }
   }
})

/**
 * 取得封面圖片
 */

router.get('/coverImage/:fileName', async function (req: Request, res: Response) {
   const fileName = req.params.fileName;
   if (fileName) {
      let imgReadstream: ReadStream = await findFileByFileName(fileName)
      if (imgReadstream) {
         imgReadstream.pipe(res);
      } else {
         res.status(500).json({ errors: [{ msg: "找不到照片" }] })
      }
   } else {
      res.status(500).json({ errors: [{ msg: "請輸入照片名稱" }] })
   }
})
export = router;
