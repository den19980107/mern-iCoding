import React, { useState } from 'react';
import uuid from 'uuid';
import { Button, Input } from 'antd';
import { MdDelete } from "react-icons/md";

const FillQutionCreater = ({ onAddQuestion }) => {
    // 所有填空題可能的答案
    const [answers, setAnswers] = useState([]);

    const addNewQution = () => {
        onAddQuestion({
            type: "fill",
            data: answers
        })
        setAnswers([])
    }
    const addNewAnswer = () => {
        let newAnswers = [...answers]
        newAnswers.push({
            id: uuid(),
            answer: ""
        })
        setAnswers(newAnswers)
    }
    const handleAnswerChange = (id, answer) => {
        let updateArray = [...answers];
        for (let i = 0; i < updateArray.length; i++) {
            if (updateArray[i].id == id) {
                updateArray[i].answer = answer
            }
        }
        setAnswers(updateArray)
    }
    const deleteAnswerById = (id) => {
        let updateArray = [];
        for (let i = 0; i < answers.length; i++) {
            if (answers[i].id != id) {
                updateArray.push(answers[i])
            }
        }
        setAnswers(updateArray)
    }
    return (
        <div>
            {answers && answers.map(answer => (
                <Fill
                    answer={answer}
                    handleAnswerChange={handleAnswerChange}
                    deleteAnswerById={deleteAnswerById}
                ></Fill>
            ))}
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button style={{ marginRight: "1rem" }} onClick={addNewAnswer}>新增答案</Button>
                <Button type="primary" onClick={addNewQution}>新增題目</Button>
            </div>
        </div>
    );
};

export const Fill = ({ answer, handleAnswerChange, deleteAnswerById }) => {
    if (handleAnswerChange && deleteAnswerById) {
        return (
            <div style={{ display: "flex", margin: "1rem 0" }}>
                <Input value={answer.answer} onChange={(e) => handleAnswerChange(answer.id, e.target.value)}></Input>
                <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", margin: "0 0 0 1rem " }}>
                    <MdDelete fontSize="1.5rem" onClick={() => deleteAnswerById(answer.id)}></MdDelete>
                </div>
            </div>
        )
    } else {
        return (
            <div style={{ display: "flex", margin: "1rem 0" }}>
                <Input value={answer.answer}></Input>
            </div>
        )
    }
}

export default FillQutionCreater;