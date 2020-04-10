import mongoose from "mongoose";
import { ObjectID } from 'mongodb';
import { resolve, reject } from "bluebird";
import { modelHelper } from "../modelHelper";
import { QuestionDocument, Question, QuestionModel } from "./question/question";
import { PostTestFormat, PostQuestion } from "./postTestFormate";
export type TestDocument = mongoose.Document & {
    testName: string
    uploader: string,
    belongUnitId: string,
    startTime: Date,
    testTime: number
};

let testSchema = new mongoose.Schema({
    testName: {
        type: String,
        require: true
    },
    // 上傳者id
    uploader: {
        type: String,
        require: true
    },
    belongUnitId: {
        type: String
    },
    startTime: {
        type: Date
    },
    testTime: {
        type: Number
    }
}, { timestamps: true })


export class TestModel extends modelHelper {
    /**
     * 建立教材
     * @param material 
     */
    static async createTest(material: TestDocument, postQuestions: Array<PostQuestion>): Promise<boolean> {
        let newTest = new Test(material)
        try {
            let test = await newTest.save();
            for (let i = 0; i < postQuestions.length; i++) {
                const question: PostQuestion = postQuestions[i];
                let isSuccess = QuestionModel.createQuestion(question, test._id);
                if (!isSuccess) throw "save question error";
            }
            return true
        } catch (e) {
            return false
        }
    }

    /**
     * 取得 material by id
     * @param id 
     */
    static async getTestById(id: string): Promise<TestDocument> {
        let test: TestDocument = await TestModel.getById(id, Test)
        return test
    }

    /**
     * 刪除教材 by id
     * @param id 
     */
    static async deleteTestById(id: string): Promise<boolean> {
        let res = await this.deleteById(id, Test)
        return res
    }

    /**
     * 更新教材名稱 by id
     * @param id 
     * @param newName 
     */
    static async updateNameById(id: string, newName: string): Promise<boolean> {
        const updateData = {
            name: newName
        }
        let res = await this.update(id, updateData, Test);
        return res;
    }

    /**
     * 更新教材內容
     * @param id 
     * @param newBody 
     */
    static async updateBodyById(id: string, newBody: string): Promise<boolean> {
        const updateData = {
            body: newBody
        }
        let res = await this.update(id, updateData, Test);
        return res;
    }

    static async getTestInUnit(unitId: string): Promise<Array<TestDocument>> {
        let tests: Array<TestDocument> = await Test.find({ belongUnitId: unitId })
        return tests
    }
}
export const Test = mongoose.model<TestDocument>("Test", testSchema);
