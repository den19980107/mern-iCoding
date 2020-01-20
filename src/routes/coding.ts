import * as express from 'express';
import { Request, Response, NextFunction } from 'express'
import { CodeQutionModel, CodeQutionDocument, CodeQution, testData } from '../models/codeQution';
const router = express.Router();

/**
 * 取得題目
 * @param tag?
 */
router.get('/getQution', async function (req: Request, res: Response) {
   const tag = req.query.tag;
   let result;
   if (tag) {
      result = await CodeQutionModel.getQutions(tag)
   } else {
      result = await CodeQutionModel.getQutions()
   }

   if (result) {
      res.status(200).json(result);
   } else {
      res.status(500).json({ errors: [{ msg: "取得程式題錯誤" }] })
   }
})

/**
 * 建立題目
 */
router.post('/createQution', async function (req: Request, res: Response) {
   req.checkBody('title', '請輸入題目名稱').notEmpty();
   req.checkBody('body', '請輸入題目內容').notEmpty();
   req.checkBody('testDatas', '請輸入測資').notEmpty();
   const errors = req.validationErrors();
   if (errors) {
      res.status(500).json({ message: errors })
      return;
   }
   const newQution: CodeQutionDocument = req.body;
   let isSuccess = await CodeQutionModel.create(newQution);
   if (isSuccess) {
      res.status(200).json({ message: "新增成功！" })
   } else {
      res.status(500).json({ errors: [{ msg: "新增失敗" }] })
   }
})

/**
 * 刪除題目 by id
 */
router.get('/delete/:id', async function (req: Request, res: Response) {
   const id = req.params.id;
   if (id) {
      let isSuccess = await CodeQutionModel.deleteById(id, CodeQution);
      if (isSuccess) {
         res.status(200).json({ message: "刪除成功！" })
      } else {
         res.status(500).json({ errors: [{ msg: "刪除失敗" }] })
      }
   }
   res.status(500).json({ errors: [{ msg: "沒有提供id" }] })
})

/**
 * 更改標題
 */
router.post('/updateTitle/:id', async function (req: Request, res: Response) {
   const id: string = req.params.id;
   const newTitle: string = req.body.title;
   if (id && newTitle) {
      let isSuccess = await CodeQutionModel.updateTitle(id, newTitle);
      if (isSuccess) {
         res.status(200).json({ message: "更改成功！" })
      } else {
         res.status(500).json({ errors: [{ msg: "更改失敗！" }] })
      }
   } else {
      res.status(500).json({ errors: [{ msg: "id 或 title 未填寫" }] })
   }
})

/**
 * 更改題目內容
 */
router.post('/updateBody/:id', async function (req: Request, res: Response) {
   const id: string = req.params.id;
   const newBody: string = req.body.body;
   if (id && newBody) {
      let isSuccess = await CodeQutionModel.updateBody(id, newBody);
      if (isSuccess) {
         res.status(200).json({ message: "更改成功！" })
      } else {
         res.status(500).json({ errors: [{ msg: "更改失敗！" }] })
      }
   } else {
      res.status(500).json({ errors: [{ msg: "id 或 body 未填寫" }] })
   }
})

/**
 * 更改測資
 */
router.post('/updateTestDatas/:id', async function (req: Request, res: Response) {
   const id: string = req.params.id;
   const newTestDatas: Array<testData> = req.body.testDatas;
   if (id && newTestDatas) {
      let isSuccess = await CodeQutionModel.updateTestData(id, newTestDatas);
      if (isSuccess) {
         res.status(200).json({ message: "更改成功！" })
      } else {
         res.status(500).json({ errors: [{ msg: "更改失敗！" }] })
      }
   } else {
      res.status(500).json({ errors: [{ msg: "id 或 testDatas 未填寫" }] })
   }
})

/**
 * 更改標籤
 */
router.post('/updateTags/:id', async function (req: Request, res: Response) {
   const id: string = req.params.id;
   const newTags: Array<string> = req.body.tags;
   if (id && newTags) {
      let isSuccess = await CodeQutionModel.updateTags(id, newTags);
      if (isSuccess) {
         res.status(200).json({ message: "更改成功！" })
      } else {
         res.status(500).json({ errors: [{ msg: "更改失敗！" }] })
      }
   } else {
      res.status(500).json({ errors: [{ msg: "id 或 tags 未填寫" }] })
   }
})

export = router;
