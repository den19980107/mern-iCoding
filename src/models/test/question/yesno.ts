import mongoose from "mongoose";
import { ObjectID } from 'mongodb';
import { resolve, reject } from "bluebird";
import { modelHelper } from "../../modelHelper";
export type YesNoDocument = mongoose.Document & {
    belongQuestionId: string
    answer: string,
};

let yesnoSchema = new mongoose.Schema({
    belongQuestionId: {
        type: String,
        require: true
    },
    answer: {
        type: String
    }
}, { timestamps: true })


export class YesNoModel extends modelHelper {
    /**
     * 建立選擇題選項
     * @param choice 
     */
    static async createYesNo(question: YesNoDocument): Promise<boolean> {
        let newChoice = new YesNo(question)
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
     * 取得 choice by id
     * @param id 
     */
    static async getYesNoById(id: string): Promise<YesNoDocument> {
        let choice: YesNoDocument = await YesNoModel.getById(id, YesNo)
        return choice
    }

    /**
     * 刪除 choice by id
     * @param id 
     */
    static async deleteYesNoById(id: string): Promise<boolean> {
        let res = await this.deleteById(id, YesNo)
        return res
    }

}
export const YesNo = mongoose.model<YesNoDocument>("YesNo", yesnoSchema);
