import mongoose from "mongoose";
import { ObjectID } from 'mongodb';
import { resolve, reject } from "bluebird";
import { modelHelper } from "../../modelHelper";
import { PostQuestion, QuestionType } from "../postTestFormate";
import { YesNo } from "./yesno";
import { Choice } from "./choice";
import { Code } from "./code";
import { Fill } from "./fill";
export type QuestionDocument = mongoose.Document & {
    order: number,
    belongTestId: string
    name: string,
    description: string,
    type: string,
};

let questionSchema = new mongoose.Schema({
    order: {
        type: Number
    },
    belongTestId: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    description: {
        type: String
    },
    type: {
        type: String
    }
}, { timestamps: true })


export class QuestionModel extends modelHelper {
    /**
     * 建立題目
     * @param question 
     */
    static async createQuestion(question: PostQuestion, testId: string): Promise<boolean> {
        let newQuestion = new Question({
            belongTestId: testId,
            name: question.name,
            description: question.description,
            type: question.type
        })
        try {
            let createdQuestion = await newQuestion.save();
            switch (createdQuestion.type) {
                case QuestionType.YesNo:
                    let newYesNo = new YesNo({
                        belongQuestionId: createdQuestion._id,
                        answer: question.data
                    })
                    await newYesNo.save();
                    break;
                case QuestionType.choice:
                    for (let i = 0; i < question.data.length; i++) {
                        let newChoice = new Choice({
                            belongQuestionId: createdQuestion._id,
                            order: i,
                            title: question.data[i].title,
                            isAnswer: question.data[i].isAnswer,
                        });
                        await newChoice.save();
                    }
                    break;
                case QuestionType.code:
                    for (let i = 0; i < question.data.length; i++) {
                        let newCode = new Code({
                            belongQuestionId: createdQuestion._id,
                            input: question.data[i].input,
                            output: question.data[i].output
                        });
                        await newCode.save();
                    }
                    break;
                case QuestionType.fill:
                    for (let i = 0; i < question.data.length; i++) {
                        let newFill = new Fill({
                            belongQuestionId: createdQuestion._id,
                            order: i,
                            answer: question.data[i].answer,
                        });
                        await newFill.save();
                    }
                    break;

            }
            return true
        } catch (e) {
            return false
        }
    }

    /**
     * 用 testId 取得所有 questions
     * @param id 
     */
    static async getQuestionsByTestId(id: string): Promise<Array<QuestionDocument>> {
        let questions = await Question.find({ belongTestId: id });
        return questions
    }

    /**
     * 取得 question by id
     * @param id 
     */
    static async getQuestionById(id: string): Promise<QuestionDocument> {
        let question: QuestionDocument = await QuestionModel.getById(id, Question)
        return question
    }

    /**
     * 刪除 question by id
     * @param id 
     */
    static async deleteQuestionById(id: string): Promise<boolean> {
        let res = await this.deleteById(id, Question)
        return res
    }

}
export const Question = mongoose.model<QuestionDocument>("Question", questionSchema);
