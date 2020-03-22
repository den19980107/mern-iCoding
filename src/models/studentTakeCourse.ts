import mongoose from "mongoose";
import { ObjectID } from 'mongodb';
import { modelHelper } from "./modelHelper";
import { UserDocument, UserModel } from "./user";

export enum StudentTakeCourseStatus {
    notTake = "notTake",
    inProgress = "inProgress",
    alreadyIn = "alreadyIn",
    quit = "quit"
}

export type StudentTakeCourseDocument = mongoose.Document & {
    studentId: string
    classId: string
    status: StudentTakeCourseStatus
    isIn: boolean
};

let StudentTakeCourseSchema = new mongoose.Schema({
    studentId: {
        type: String,
        require: true
    },
    classId: {
        type: String,
        require: true
    },
    status: {
        type: String,
        require: true
    },
    isIn: {
        type: Boolean,
        require: true
    }
}, { timestamps: true })

export class StudentTakeCourseModel extends modelHelper {
    /**
     * 選課
     * @param studentId 
     * @param courseId 
     */
    static async takeCourse(studentId: string, classId: string): Promise<boolean> {
        let userStatus = await this.getUserStatus(classId, studentId)
        if (userStatus == StudentTakeCourseStatus.notTake || userStatus == StudentTakeCourseStatus.quit) {
            let record = await this.getRecord(classId, studentId)
            // 如果有修課紀錄就更改那筆紀錄
            if (record) {
                let query = {
                    isIn: false,
                    status: StudentTakeCourseStatus.inProgress
                }
                let isSuccess = await this.update(record.id, query, StudentTakeCourse)
                return isSuccess
            } else {
                let newTakeCourseRecord = new StudentTakeCourse({
                    studentId: studentId,
                    classId: classId,
                    isIn: false,
                    status: StudentTakeCourseStatus.inProgress
                })

                return new Promise(function (resolve, reject) {
                    newTakeCourseRecord.save(function (err) {
                        if (err) {
                            resolve(false)
                        } else {
                            resolve(true)
                        }
                    })
                })
            }
        } else {
            return false
        }
    }

    static async getUserStatus(classId: string, userId: string): Promise<StudentTakeCourseStatus> {
        let record: StudentTakeCourseDocument = await this.getRecord(classId, userId)
        if (record) {
            return record.status
        } else {
            return StudentTakeCourseStatus.notTake
        }
    }

    /**
     * 根據使用者 id 取得選課清單
     * @param studentId 
     */
    static async getUserTakeCourses(studentId: string): Promise<Array<StudentTakeCourseDocument>> {
        return new Promise(function (resolve, reject) {
            StudentTakeCourse.find({
                studentId: studentId
            }, function (err, courses: Array<StudentTakeCourseDocument>) {
                if (err) {
                    resolve(null)
                } else {
                    resolve(courses)
                }
            })
        })
    }

    /**
     * 教師審核學生
     * @param classId 
     * @param studentId 
     */
    static async teacherComfirmStudent(classId: string, studentId: string): Promise<Boolean> {
        let record = await this.getRecord(classId, studentId)
        if (!record) return false;
        let query = {
            status: StudentTakeCourseStatus.alreadyIn,
            isIn: true
        }
        let isSuccess = await this.update(record._id, query, StudentTakeCourse);
        return isSuccess
    }

    /**
     * 學生退選
     * @param classId 
     * @param studentId 
     */
    static async studentQuitClass(classId: string, studentId: string): Promise<Boolean> {
        let record = await this.getRecord(classId, studentId)
        if (!record) return false;
        let query = {
            status: StudentTakeCourseStatus.quit,
            isIn: false
        }
        let isSuccess = await this.update(record._id, query, StudentTakeCourse);
        return isSuccess
    }

    /**
     * 取得紀錄
     * @param classId 
     * @param studentId 
     */
    static async getRecord(classId: string, studentId: string): Promise<StudentTakeCourseDocument | null> {
        let records: Array<StudentTakeCourseDocument> = await StudentTakeCourse.find({
            classId: classId,
            studentId: studentId
        })

        if (records.length != 0) {
            return records[0]
        } else {
            return null
        }
    }

    /**
     * 取得課程內學生
     * @param classId 
     */
    static async getClassStudents(classId: string): Promise<Array<UserDocument>> {
        let classStudentIds: Array<StudentTakeCourseDocument> = await StudentTakeCourse.find({
            classId: classId
        })
        let classStudents: Array<UserDocument> = []
        for (let i = 0; i < classStudentIds.length; i++) {
            let id = classStudentIds[i].studentId;
            let student: UserDocument = await UserModel.getUserById(id);
            classStudents.push(student)
        }
        return classStudents
    }

    static async getClassStudentsStatus(classId: string): Promise<Array<StudentTakeCourseDocument> | null> {
        let classStudentStatus: Array<StudentTakeCourseDocument> = await StudentTakeCourse.find({
            classId: classId
        })
        if (classStudentStatus) {
            return classStudentStatus
        } else {
            return null
        }
    }
}
export const StudentTakeCourse = mongoose.model<StudentTakeCourseDocument>("StudentTakeCourse", StudentTakeCourseSchema);
