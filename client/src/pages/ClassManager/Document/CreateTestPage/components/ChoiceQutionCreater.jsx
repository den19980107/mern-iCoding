import React, { useState } from 'react';
import uuid from 'uuid';
import { Button, Icon, Input } from 'antd';
import { MdRadioButtonChecked, MdRadioButtonUnchecked, MdDelete } from "react-icons/md";

const ChoiceQutionCreater = ({ onAddQuestion }) => {
    const [choices, setChoices] = useState([]);
    const addNewQution = () => {
        onAddQuestion({
            type: "choice",
            data: choices
        })
        setChoices([])
    }
    const addNewChoice = () => {
        let newChoices = [...choices]
        newChoices.push({
            id: uuid(),
            title: "",
            isAnswer: false
        })
        setChoices(newChoices)
    }
    const changeIsAnswer = (id) => {
        let updateArray = [...choices];
        for (let i = 0; i < updateArray.length; i++) {
            if (updateArray[i].id == id) {
                updateArray[i].isAnswer = !updateArray[i].isAnswer
            }
        }
        setChoices(updateArray)
    }
    const deleteAnswerById = (id) => {
        let updateArray = [];
        for (let i = 0; i < choices.length; i++) {
            if (choices[i].id !== id) {
                updateArray.push(choices[i])
            }
        }
        setChoices(updateArray)
    }
    const handleChoiceTitleChange = (id, title) => {
        let updateArray = [...choices];
        for (let i = 0; i < updateArray.length; i++) {
            if (updateArray[i].id == id) {
                updateArray[i].title = title
            }
        }
        setChoices(updateArray)
    }
    return (
        <div>
            {choices && choices.map(choice => (
                <Choice
                    choice={choice}
                    changeIsAnswer={changeIsAnswer}
                    deleteAnswerById={deleteAnswerById}
                    handleChoiceTitleChange={handleChoiceTitleChange}
                ></Choice>
            ))}
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button style={{ marginRight: "1rem" }} onClick={addNewChoice}>新增選項</Button>
                <Button type="primary" onClick={addNewQution}>新增題目</Button>
            </div>
        </div>
    );
};

export const Choice = ({ choice, changeIsAnswer, deleteAnswerById, handleChoiceTitleChange }) => {
    if (changeIsAnswer && deleteAnswerById && handleChoiceTitleChange) {
        return (
            <div style={{ display: "flex", margin: "1rem 0" }}>
                <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", margin: "0 1rem 0 0 " }}>
                    {choice.isAnswer ?
                        <MdRadioButtonChecked fontSize="1.5rem" onClick={() => changeIsAnswer(choice.id)}></MdRadioButtonChecked>
                        :
                        <MdRadioButtonUnchecked fontSize="1.5rem" onClick={() => changeIsAnswer(choice.id)} ></MdRadioButtonUnchecked>
                    }
                </div>
                <Input value={choice.title} onChange={(e) => handleChoiceTitleChange(choice.id, e.target.value)}></Input>
                <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", margin: "0 0 0 1rem " }}>
                    <MdDelete fontSize="1.5rem" onClick={() => deleteAnswerById(choice.id)}></MdDelete>
                </div>
            </div>
        )
    } else {
        return (
            <div style={{ display: "flex", margin: "1rem 0" }}>
                <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", margin: "0 1rem 0 0 " }}>
                    {choice.isAnswer ?
                        <MdRadioButtonChecked fontSize="1.5rem"></MdRadioButtonChecked>
                        :
                        <MdRadioButtonUnchecked fontSize="1.5rem"></MdRadioButtonUnchecked>
                    }
                </div>
                <Input value={choice.title} ></Input>
            </div>
        )
    }
}

export default ChoiceQutionCreater;