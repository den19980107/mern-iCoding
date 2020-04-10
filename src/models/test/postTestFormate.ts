export type PostTestFormat = {
    unitId: string,
    testName: string
    questions: Array<PostQuestion>,
    testTime: string,
    startTime: string,
    isAssistantCorrectable: boolean,
    isAnswerViewable: boolean,
};
export type PostQuestion = {
    name: string,
    description: string,
    type: QuestionType,
    data: any
}

export enum QuestionType {
    choice = "choice",
    fill = "fill",
    code = "code",
    YesNo = "YesNo"
}