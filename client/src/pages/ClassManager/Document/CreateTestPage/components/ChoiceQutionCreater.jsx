import React, { useState } from 'react';
import uuid from 'uuid';
import { Button, Icon, Input } from 'antd';
const ChoiceQutionCreater = () => {
    const [choices, setChoices] = useState([]);
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
    return (
        <div>
            {choices && choices.map(choice => (
                <Choice choice={choice} changeIsAnswer={changeIsAnswer}></Choice>
            ))}
            <Button onClick={addNewChoice}>新增選項</Button>
        </div>
    );
};

const Choice = ({ choice, changeIsAnswer }) => {
    return (
        <div style={{ display: "flex", margin: "1rem 0" }}>
            <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", margin: "0 1rem 0 0 " }}>
                {choice.isAnswer ?
                    <Icon style={{ fontSize: "1.5rem", color: "#4caf50" }} type="check-circle" onClick={() => changeIsAnswer(choice.id)} />
                    :
                    <Icon style={{ fontSize: "1.5rem" }} type="close-circle" onClick={() => changeIsAnswer(choice.id)} />
                }
            </div>
            <Input value={choice.title}></Input>
        </div>
    )
}

export default ChoiceQutionCreater;