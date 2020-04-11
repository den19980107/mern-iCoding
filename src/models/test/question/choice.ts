import mongoose from "mongoose";
import { ObjectID } from 'mongodb';
import { resolve, reject } from "bluebird";
import { modelHelper } from "../../modelHelper";
export type ChoiceDocument = mongoose.Document & {
    belongQuestionId: string
    order: number,
    title: string,
    isAnswer: boolean,
};

let choiceSchema = new mongoose.Schema({
    belongQuestionId: {
        type: String,
        require: true
    },
    order: {
        type: Number,
        require: true
    },
    title: {
        type: String
    },
    isAnswer: {
        type: Boolean
    }
}, { timestamps: true })

export class ChoiceModel extends modelHelper {
    static async getQuestionData(questionId: string): Promise<any[]> {
        let choices = await Choice.find({ belongQuestionId: questionId })
        return choices
    }

    /**
     * 建立選擇題選項
     * @param choice 
     */
    static async createChoice(question: ChoiceDocument): Promise<boolean> {
        let newChoice = new Choice(question)
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
    static async getChoiceById(id: string): Promise<ChoiceDocument> {
        let choice: ChoiceDocument = await ChoiceModel.getById(id, Choice)
        return choice
    }

    /**
     * 刪除 choice by id
     * @param id 
     */
    static async deleteChoiceById(id: string): Promise<boolean> {
        let res = await this.deleteById(id, Choice)
        return res
    }

}
export const Choice = mongoose.model<ChoiceDocument>("Choice", choiceSchema);
