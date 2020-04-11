import mongoose from "mongoose";
import { ObjectID } from 'mongodb';
import { resolve, reject } from "bluebird";
import { modelHelper } from "../../modelHelper";
export type CodeDocument = mongoose.Document & {
    belongQuestionId: string
    input: string,
    output: string,
};

let codeSchema = new mongoose.Schema({
    belongQuestionId: {
        type: String,
        require: true
    },
    input: {
        type: String,
        require: true
    },
    output: {
        type: String,
        require: true
    }
}, { timestamps: true })


export class CodeModel extends modelHelper {
    static async getQuestionData(questionId: string): Promise<any[]> {
        let codes = await Code.find({ belongQuestionId: questionId })
        return codes
    }

    /**
     * 建立程式題選項
     * @param choice 
     */
    static async createCode(question: CodeDocument): Promise<boolean> {
        let newChoice = new Code(question)
        return new Promise(function (resolve, reject) {
            newChoice.save(function (err) {
                if (err) {
                    resolve(false)
                } else {
                    resolve(true)
                }
            })
        })
    }

    /**
     * 取得 code by id
     * @param id 
     */
    static async getCodeById(id: string): Promise<CodeDocument> {
        let choice: CodeDocument = await CodeModel.getById(id, Code)
        return choice
    }

    /**
     * 刪除 code by id
     * @param id 
     */
    static async deleteCodeById(id: string): Promise<boolean> {
        let res = await this.deleteById(id, Code)
        return res
    }

}
export const Code = mongoose.model<CodeDocument>("Code", codeSchema);
