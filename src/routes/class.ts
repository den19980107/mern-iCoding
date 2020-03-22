import * as express from 'express';
import { Request, Response, NextFunction } from 'express'
import { ClassModel, ClassDocument, Class } from '../models/class';
import { getUploader, findFileByFileName } from '../common/upload';
import { UserModel, User, UserDocument } from '../models/user';
import { ReadStream } from 'fs';
import { StudentTakeCourseModel, StudentTakeCourseStatus, StudentTakeCourse, StudentTakeCourseDocument } from '../models/studentTakeCourse';
import { UnitDocument, UnitModel, Unit } from '../models/unit';
import { Material, MaterialModel, MaterialDocument } from '../models/material';
import { Test, TestModel, TestDocument } from '../models/test';
import { VideoModel, VideoDocument } from '../models/video';
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

// ========================== 課程 ===================================

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
    }
    if (!classInfo.introVideoUrl) {

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
    try {
        let classInfo: ClassDocument = await ClassModel.getClassById(id);
        if (classInfo) {
            let teacehrData: UserDocument = await UserModel.getUserById(classInfo.teacherId)
            if (teacehrData) {
                let teacherInfo = {
                    displayName: teacehrData.displayName,
                    email: teacehrData.email,
                    avatarsUrl: teacehrData.avatarsUrl,
                    profile: teacehrData.profile,
                    _id: teacehrData._id
                }
                let classStudents: Array<UserDocument> = await StudentTakeCourseModel.getClassStudents(id)
                if (classStudents) {
                    let studentTakeCourseStatus: Array<StudentTakeCourseDocument> = await StudentTakeCourseModel.getClassStudentsStatus(id);
                    if (studentTakeCourseStatus) {
                        res.status(200).json({ classInfo, teacherInfo, classStudents, studentTakeCourse: studentTakeCourseStatus });
                    } else {
                        res.status(404).json({ errors: [{ msg: "找不到修課狀態！" }] })
                    }
                } else {
                    res.status(404).json({ errors: [{ msg: "找不到修課學生！" }] })
                }
            } else {
                res.status(404).json({ errors: [{ msg: "找不到開課教師！" }] })
            }
        } else {
            res.status(404).json({ errors: [{ msg: "找不到此課程！" }] })
        }
    } catch (err) {
        res.status(500).json({ errors: [{ msg: "找課程時發生錯誤！" }] })
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
router.post('/takeOffClass/:id', async function (req: Request, res: Response) {
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

router.post('/updateIntroVideo', async function (req: Request, res: Response) {
    const newVideoUrl = req.body.newIntroVideoUrl;
    const classId = req.body.classId;
    let isSuccess = await ClassModel.updateIntroVideoUrl(classId, newVideoUrl)
    if (isSuccess) {
        res.status(200).json({ message: "更新成功!" })
    } else {
        res.status(500).json({ errors: [{ msg: "更新失敗!" }] })
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


/**
 * 學生選課
 */
router.post('/takeCourse', async function (req: Request, res: Response) {
    const { studentId, classId } = req.body;
    let userStatus = await StudentTakeCourseModel.getUserStatus(classId, studentId)
    // 如果學生狀態是未選課或已退選
    if (userStatus == StudentTakeCourseStatus.notTake || userStatus == StudentTakeCourseStatus.quit) {
        let isSuccess = await StudentTakeCourseModel.takeCourse(studentId, classId)
        if (isSuccess) {
            res.status(200).json({ message: "選修成功！" })

        } else {
            res.status(500).json({ errors: [{ msg: "選修過程發生問題！" }] })
        }
    } else {
        res.status(500).json({ errors: [{ msg: "已經選修過了！" }] })
    }
})

/**
 * 教師審核學生
 */
router.post('/comfirmStudent', async function (req: Request, res: Response) {
    const { studentId, classId } = req.body;
    let isSuccess = await StudentTakeCourseModel.teacherComfirmStudent(classId, studentId)
    if (isSuccess) {
        res.status(200).json({ message: "審核成功！" })
    } else {
        res.status(500).json({ errors: [{ msg: "審核過程發生問題！" }] })
    }
})

/**
 * 學生退選課程
 */
router.post('/quitClass', async function (req: Request, res: Response) {
    const { studentId, classId } = req.body;
    let isSuccess = await StudentTakeCourseModel.studentQuitClass(classId, studentId)
    if (isSuccess) {
        res.status(200).json({ message: "退選成功！" })
    } else {
        res.status(500).json({ errors: [{ msg: "退選過程發生問題！" }] })
    }
})

/**
 * 取得修課清單的學生狀態 StudentTakeCourse
 */
router.get('/:id/studentStatusList', async function (req: Request, res: Response) {
    const id = req.params.id
    let stautsList: Array<StudentTakeCourseDocument> = await StudentTakeCourseModel.getClassStudentsStatus(id);
    if (stautsList) {
        res.status(200).json(stautsList)
    } else {
        res.status(500).json({ errors: [{ msg: "取得修課清單的學生狀態錯誤！" }] })
    }
})

// ========================== 單元 ===================================

/**
 * 建立單元
 */
router.post('/createUnit', async function (req: Request, res: Response) {
    // 檢查 body
    req.checkBody('unitName', "單元名稱不得為空").notEmpty();
    req.checkBody('classId', "課程id不得為空").notEmpty();

    let errors = req.validationErrors();
    if (errors) {
        res.status(500).json(errors)
        return
    }

    const unitName: string = req.body.unitName
    const classId: string = req.body.classId

    // 檢查是不是該老師的課
    const classData = await ClassModel.getClassById(classId);
    if (req.user.id !== classData.teacherId) {
        res.status(500).json({ errors: [{ msg: "您不是該課堂的老師" }] })
        return
    }

    // 新增單元
    let newUnit = new Unit({
        name: unitName,
        belongClassId: classId
    })


    let isSuccess = await UnitModel.createUnit(newUnit);
    if (isSuccess) {
        res.status(200).json({ message: "新增成功！" })
    } else {
        res.status(500).json({ errors: [{ msg: "新增失敗!" }] })
    }

})

/**
 * 取得課程中所有單元
 */
router.get('/:classId/units', async function (req: Request, res: Response) {
    let classId: string = req.params.classId;
    let units: Array<UnitDocument> = await UnitModel.getUnitInClass(classId)
    res.status(200).json(units)
})

/**
 * 更新單元名稱
 */
router.post('/updateUnitName/:unitId', async function (req: Request, res: Response) {
    req.checkBody('unitName', "單元名稱不得為空！").notEmpty();
    let errors = req.validationErrors();
    if (errors) {
        res.status(500).json(errors)
        return
    }
    const unitId = req.params.unitId;
    const newUnitName = req.body.unitName
    let isSuccess = await UnitModel.updateUnitName(unitId, newUnitName);
    if (isSuccess) {
        res.status(200).json({ message: "更改單元名稱成功！" })
    } else {
        res.status(500).json({ errors: [{ msg: "更改單元名稱失敗！" }] })
    }
})

/**
 * 刪除單元
 */
router.post('/deleteUnit/:unitId', async function (req: Request, res: Response) {
    const unitId = req.params.unitId;
    let isSuccess = await UnitModel.deleteUnitById(unitId);
    if (isSuccess) {
        res.status(200).json("刪除成功！")
    } else {
        res.status(500).json({ errors: [{ msg: "刪除失敗" }] })
    }
})

// ========================== 教材 ===================================

/**
 * 新增教材
 */
router.post('/createMaterial', async function (req: Request, res: Response) {
    // 檢查body
    req.checkBody('unitId', "單元id沒提供！").notEmpty();
    req.checkBody('name', "教材名稱不得為空！").notEmpty();
    req.checkBody('body', "教材內容不得為空！").notEmpty();
    let errors = req.validationErrors();
    if (errors) {
        res.status(500).json(errors);
        return;
    }

    // 建立教材
    const name = req.body.name;
    const unitId = req.body.unitId;
    const body = req.body.body;
    let newMaterial: MaterialDocument = new Material({
        name: name,
        belongUnitId: unitId,
        body: body,
        uploader: req.user._id
    })
    let isSuccess = await MaterialModel.createMaterial(newMaterial);
    if (isSuccess) {
        res.status(200).json({ message: "新增教材成功！" })
    } else {
        res.status(500).json({ errors: [{ meg: "新增教材失敗！" }] })
    }
})

/**
 * 取得教材內容 by id
 */
router.get('/material/:id', async function (req: Request, res: Response) {
    const materialId = req.params.id;
    let material: MaterialDocument = await MaterialModel.getMaterialById(materialId);
    res.status(200).json(material)
})

/**
 * 更新教材名稱
 */
router.post('/updateMaterialName/:materialId', async function (req: Request, res: Response) {
    req.checkBody('name', "教材名稱不得為空！").notEmpty();
    let errors = req.validationErrors();
    if (errors) {
        res.status(500).json(errors)
        return
    }

    const materialId = req.params.materialId;
    const newName = req.body.name;
    let isSuccess = await MaterialModel.updateNameById(materialId, newName)
    if (isSuccess) {
        res.status(200).json({ message: "更新成功！" })
    } else {
        res.status(500).json({ errors: [{ msg: "更新失敗！" }] })
    }
})

/**
 * 更新教材內容
 */
router.post('/updateMaterialBody/:materialId', async function (req: Request, res: Response) {
    req.checkBody('body', "教材內容不得為空！").notEmpty();
    let errors = req.validationErrors();
    if (errors) {
        res.status(500).json(errors)
        return
    }

    const materialId = req.params.materialId;
    const newBody = req.body.body;
    let isSuccess = await MaterialModel.updateBodyById(materialId, newBody)
    if (isSuccess) {
        res.status(200).json({ message: "更新成功！" })
    } else {
        res.status(500).json({ errors: [{ msg: "更新失敗！" }] })
    }
})

/**
 * 取得單元內教材
 */
router.get('/materialInUnit/:unitId', async function (req: Request, res: Response) {
    const unitId = req.params.unitId;
    let materials: Array<MaterialDocument> = await MaterialModel.getMaterialInUnit(unitId)
    res.status(200).json(materials)
})

/**
 * 刪除教材
 */
router.post('/deleteMaterial/:materialId', async function (req: Request, res: Response) {
    const materialId = req.params.materialId;
    let isSuccess = MaterialModel.deleteMaterialById(materialId);
    if (isSuccess) {
        res.status(200).json({ message: "刪除教材成功！" })
    } else {
        res.status(500).json({ errors: [{ msg: "刪除教材失敗！" }] })
    }
})


// ========================== 測驗 ===================================

/**
 * 新增測驗
 */
router.post('/createTest', async function (req: Request, res: Response) {
    // 檢查body
    req.checkBody('unitId', "單元id沒提供！").notEmpty();
    req.checkBody('name', "測驗名稱不得為空！").notEmpty();
    req.checkBody('body', "測驗內容不得為空！").notEmpty();
    let errors = req.validationErrors();
    if (errors) {
        res.status(500).json(errors);
        return;
    }

    // 建立測驗
    const name = req.body.name;
    const unitId = req.body.unitId;
    const body = req.body.body;
    let newTest: TestDocument = new Test({
        name: name,
        unitId: unitId,
        body: body,
        uploader: req.user._id
    })
    let isSuccess = await TestModel.createTest(newTest);
    if (isSuccess) {
        res.status(200).json({ message: "新增測驗成功！" })
    } else {
        res.status(500).json({ errors: [{ meg: "新增測驗失敗！" }] })
    }
})

/**
 * 更新測驗名稱
 */
router.post('/updateTestName/:testId', async function (req: Request, res: Response) {
    req.checkBody('name', "測驗名稱不得為空！").notEmpty();
    let errors = req.validationErrors();
    if (errors) {
        res.status(500).json(errors)
        return
    }

    const testId = req.params.testId;
    const newName = req.body.name;
    let isSuccess = await TestModel.updateNameById(testId, newName)
    if (isSuccess) {
        res.status(200).json({ message: "更新成功！" })
    } else {
        res.status(500).json({ errors: [{ msg: "更新失敗！" }] })
    }
})

/**
 * 更新測驗內容
 */
router.post('/updateTestlBody/:testId', async function (req: Request, res: Response) {
    req.checkBody('body', "測驗內容不得為空！").notEmpty();
    let errors = req.validationErrors();
    if (errors) {
        res.status(500).json(errors)
        return
    }

    const testId = req.params.testId;
    const newBody = req.body.body;
    let isSuccess = await TestModel.updateBodyById(testId, newBody)
    if (isSuccess) {
        res.status(200).json({ message: "更新成功！" })
    } else {
        res.status(500).json({ errors: [{ msg: "更新失敗！" }] })
    }
})

/**
 * 取得單元內測驗
 */
router.get('/testInUnit/:unitId', async function (req: Request, res: Response) {
    const unitId = req.params.unitId;
    let tests: Array<TestDocument> = await TestModel.getTestInUnit(unitId)
    res.status(200).json(tests)
})

/**
 * 刪除測驗
 */
router.post('/deleteTest/:testId', async function (req: Request, res: Response) {
    const testId = req.params.testId;
    let isSuccess = TestModel.deleteTestById(testId);
    if (isSuccess) {
        res.status(200).json({ message: "刪除測驗成功！" })
    } else {
        res.status(500).json({ errors: [{ msg: "刪除測驗失敗！" }] })
    }
})


// ========================== 影片 ===================================

/**
 * 新增影片 放在 video route
 */

/**
 * 更新影片名稱
 */
router.post('/updateVideoName/:videoId', async function (req: Request, res: Response) {
    req.checkBody('name', "影片名稱不得為空！").notEmpty();
    let errors = req.validationErrors();
    if (errors) {
        res.status(500).json(errors)
        return
    }

    const videoId = req.params.videoId;
    const newName = req.body.name;
    let isSuccess = await VideoModel.updateVideoNameById(videoId, newName)
    if (isSuccess) {
        res.status(200).json({ message: "更新成功！" })
    } else {
        res.status(500).json({ errors: [{ msg: "更新失敗！" }] })
    }
})

/**
 * 取得單元內影片
 */
router.get('/videoInUnit/:unitId', async function (req: Request, res: Response) {
    const unitId = req.params.unitId;
    let videos: Array<VideoDocument> = await VideoModel.getVideoInUnit(unitId)
    res.status(200).json(videos)
})

/**
 * 刪除影片
 */
router.post('/deleteVideo/:videoId', async function (req: Request, res: Response) {
    const videoId = req.params.videoId;
    let isSuccess = VideoModel.deleteVideoById(videoId);
    if (isSuccess) {
        res.status(200).json({ message: "刪除影片成功！" })
    } else {
        res.status(500).json({ errors: [{ msg: "刪除影片失敗！" }] })
    }
})
export = router;
