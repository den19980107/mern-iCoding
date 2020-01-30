import * as express from 'express';
import { Request, Response, NextFunction } from 'express'
import { UserDocument, User, UserModel } from '../models/user';
import { ClassDocument, ClassModel } from '../models/class';
import { StudentTakeCourseModel, StudentTakeCourseDocument } from '../models/studentTakeCourse';
const router = express.Router();

// 取得目前登入的 user 資料
router.get('/getCurrentLoginUser', _getCurrentLoginUserRoute)
// 更新使用者名稱
router.post('/updateDisplayName/:userId', _updateDisplayNameRoute)
// 更新 email
router.post('/updateEmail/:userId', _updateEmailRoute)
// 更新自我介紹
router.post('/updateProfile/:userId', _updateProfile)
// 更新大頭照
router.post('/updateAvatar/:userId', _updateAvatar)
// 取得 user 資料 by id
router.get('/:id', _getUserById)
// 取得 user 公開資料 by id
router.get('/info/:id', _getUserInfoById)
// 取得 user 修課清單 by user id
router.get('/myStudyClass/:id', _getMyStudyClassById)
// 取得 user 開課清單 by user id
router.get('/myClass/:id', _getMyClass)

/**
 * [Get] /user/getCurrentLoginUser
 * 取得目前登入的 user 資料
 * @param {UserDocument} req.user // 如果已登入的話 req.user 會有值
 */
function _getCurrentLoginUserRoute(req: Request, res: Response) {
   if (req.user) {
      const postUser = req.user as UserDocument;
      User.findById(postUser._id, function (err, user) {
         res.json(user)
      })
   } else {
      res.status(500).json({ errors: [{ msg: "尚未登入" }] })
   }
}
/**
 * [Post] /user/updateDisplayName/:userId
 * 更新使用者名稱
 * @param {string} userId // in params
 * @param {string} username // in body
 */
async function _updateDisplayNameRoute(req: Request, res: Response) {

   // check req value
   req.checkBody('displayName', '名稱格式錯誤').notEmpty()
   req.checkParams("userId", "id 長度錯誤！").isLength({ min: 24, max: 24 })
   let errors = req.validationErrors();
   if (errors) {
      res.status(500).json({ errors: errors })
      return;
   }

   const userId = req.params.userId;
   const newName = req.body.displayName;

   // check is user existed
   let isUserExisted: boolean = await UserModel.checkUserExisted(userId)
   if (!isUserExisted) {
      res.status(404).json("無此使用者!");
      return;
   }

   // check update success
   let isUpdateSuccess = await UserModel.updateDisplayName(userId, newName);
   if (isUpdateSuccess) {
      res.status(200).json({ message: "更新成功!" })
   } else {
      res.status(500).json({ errors: [{ meg: "更新使用者名稱失敗!" }] })
   }
}

/**
 * [Post] /user/updateEmail/:userId
 * 更新 user email
 * @param {string} userId // in params
 * @param {string} email // in body
 */
async function _updateEmailRoute(req: Request, res: Response) {
   req.checkParams("userId", "userId 格式錯誤！").isLength({ max: 24, min: 24 })
   req.checkBody("email", "email 未填寫").notEmpty();
   req.checkBody("email", "email 格式不合").isEmail();
   const errors = req.validationErrors();
   if (errors) {
      res.status(500).json({ errors: errors })
      return;
   }
   const userId = req.params.userId;
   const newEmail = req.body.email;
   let isSuccess = await UserModel.updateEmail(userId, newEmail);
   if (isSuccess) {
      res.status(200).json({ message: "更新成功！" })
   } else {
      res.status(500).json({ errors: [{ msg: "更新失敗！" }] })
   }
}

async function _updateProfile(req: Request, res: Response) {
   req.checkParams("userId", "userId 格式錯誤！").isLength({ max: 24, min: 24 })
   req.checkBody("profile", "profile 未填寫").notEmpty();
   const errors = req.validationErrors();
   if (errors) {
      res.status(500).json({ errors: errors })
      return;
   }
   const userId = req.params.userId;
   const newProfile = req.body.profile;
   let isSuccess = await UserModel.updateProfile(userId, newProfile);
   if (isSuccess) {
      res.status(200).json({ message: "更新成功！" })
   } else {
      res.status(500).json({ errors: [{ msg: "更新失敗！" }] })
   }
}

async function _updateAvatar(req: Request, res: Response) {
   req.checkParams("userId", "userId 格式錯誤！").isLength({ max: 24, min: 24 })
   req.checkBody("avatarsUrl", "avatarsUrl 未填寫").notEmpty();
   const errors = req.validationErrors();
   if (errors) {
      res.status(500).json({ errors: errors })
      return;
   }
   const userId = req.params.userId;
   const avatarsUrl = req.body.avatarsUrl;
   let isSuccess = await UserModel.updateAvatarsUrl(userId, avatarsUrl);
   if (isSuccess) {
      res.status(200).json({ message: "更新成功！" })
   } else {
      res.status(500).json({ errors: [{ msg: "更新失敗！" }] })
   }
}

/**
 * [Get] /user/:id
 * 取得使用者資料 by id
 * @param id // in params
 */
async function _getUserById(req: Request, res: Response) {
   const id = req.params.id;
   let user = await UserModel.getUserById(id);
   if (user) {
      res.status(200).json({ user: user })
   } else {
      res.status(404).json({ user: null })
   }
}

/**
 * @param id // inparams
 * @param req 
 * @param res 
 */
async function _getUserInfoById(req: Request, res: Response) {
   const id = req.params.id;
   let user = await UserModel.getUserById(id);
   if (user) {
      const { displayName, avatarsUrl, email, profile } = user
      let userInfo = {
         displayName,
         avatarsUrl,
         email,
         profile
      }
      res.status(200).json({ userInfo: userInfo })
   } else {
      res.status(404).json({ userInfo: null })
   }
}

/**
 * @param userId // in params
 * @param req 
 * @param res 
 */
async function _getMyClass(req: Request, res: Response) {
   const userId = req.params.id;
   try {
      let classes = await ClassModel.getUserClasses(userId);
      res.status(200).json(classes)
   } catch (err) {
      console.log(err)
      res.status(500).json({ errors: [{ msg: err }] })
   }
}

/**
 * @param userId // in params
 * @param req 
 * @param res 
 */
async function _getMyStudyClassById(req: Request, res: Response) {
   const userId = req.params.id;
   let classList: Array<ClassDocument> = []
   try {
      let takeCourseRecord: Array<StudentTakeCourseDocument> = await StudentTakeCourseModel.getUserTakeCourses(userId);
      for (let i = 0; i < takeCourseRecord.length; i++) {
         let classData: ClassDocument = await ClassModel.getClassById(takeCourseRecord[i].classId);
         classList.push(classData)
      }
      res.status(200).json(classList);
   } catch (err) {
      console.log(err)
      res.status(500).json({ errors: [{ msg: err }] })
   }
}

export = router;
