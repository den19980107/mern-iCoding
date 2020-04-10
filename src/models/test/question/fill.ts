import mongoose from "mongoose";
import { ObjectID } from 'mongodb';
import { resolve, reject } from "bluebird";
import { modelHelper } from "../../modelHelper";
export type FillDocument = mongoose.Document & {
    belongQuestionId: string
    order: number,
    answer: string,
};

let fillSchema = new mongoose.Schema({
    belongQuestionId: {
        type: String,
        require: true
    },
    order: {
        type: Number,
        require: true
    },
    answer: {
        type: String
    }
}, { timestamps: true })


export class FillModel extends modelHelper {
    /**
     * 建立選擇題選項
     * @param choice 
     */
    static async createFill(question: FillDocument): Promise<boolean> {
        let newChoice = new Fill(question)
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
    static async getFillById(id: string): Promise<FillDocument> {
        let choice: FillDocument = await FillModel.getById(id, Fill)
        return choice
    }

    /**
     * 刪除 choice by id
     * @param id 
     */
    static async deleteFillById(id: string): Promise<boolean> {
        let res = await this.deleteById(id, Fill)
        return res
    }

}
export const Fill = mongoose.model<FillDocument>("Fill", fillSchema);
