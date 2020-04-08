import React from 'react';
import { useState } from 'react';
import uuid from 'uuid'
import { Input, Button } from 'antd'
import { TiDeleteOutline } from 'react-icons/ti'
const { TextArea } = Input;
const CodeQutionCreater = ({ onAddQuestion }) => {
    const [testDatas, setTestDatas] = useState([])
    const addNewQution = () => {
        onAddQuestion({
            type: "code",
            data: testDatas
        });
        setTestDatas([])
    }
    const addNewTestData = () => {
        let newTestDatas = [...testDatas]
        newTestDatas.push({
            id: uuid(),
            input: "",
            output: ""
        })
        setTestDatas(newTestDatas)
    }

    const deleteTestDataById = (id) => {
        let updateArray = [];
        for (let i = 0; i < testDatas.length; i++) {
            if (testDatas[i].id != id) {
                updateArray.push(testDatas[i])
            }
        }
        setTestDatas(updateArray)
    }
    const handleInputChange = (id, input) => {
        let updateArray = [...testDatas];
        for (let i = 0; i < updateArray.length; i++) {
            if (updateArray[i].id == id) {
                updateArray[i].input = input
            }
        }
        setTestDatas(updateArray)
    }
    const handleOutputChange = (id, output) => {
        let updateArray = [...testDatas];
        for (let i = 0; i < updateArray.length; i++) {
            if (updateArray[i].id == id) {
                updateArray[i].output = output
            }
        }
        setTestDatas(updateArray)
    }
    return (
        <div>
            <div style={{ maxHeight: "500px", overflow: "auto" }}>
                {testDatas.map(testData => (
                    <TestData
                        testData={testData}
                        deleteTestDataById={deleteTestDataById}
                        handleInputChange={handleInputChange}
                        handleOutputChange={handleOutputChange}
                    ></TestData>
                ))}
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button style={{ marginRight: "1rem" }} onClick={addNewTestData}>新增測資</Button>
                <Button type="primary" onClick={addNewQution}>新增題目</Button>
            </div>
        </div>
    );
};

export const TestData = ({ testData, deleteTestDataById, handleInputChange, handleOutputChange }) => {
    if (deleteTestDataById && handleInputChange && handleOutputChange) {
        return (
            <div style={{ padding: "1rem", border: "0.5px solid #ccc", borderRadius: "10px", marginBottom: "1rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <h5>測資</h5>
                    <div style={{ display: "flex", justifyContent: 'center', flexDirection: "column" }}>
                        <TiDeleteOutline fontSize="1.5rem" onClick={() => deleteTestDataById(testData.id)}></TiDeleteOutline>
                    </div>
                </div>
                <span>測資輸入</span>
                <TextArea value={testData.input} onChange={(e) => handleInputChange(testData.id, e.target.value)}></TextArea>
                <span>測資輸出</span>
                <TextArea value={testData.output} onChange={(e) => handleOutputChange(testData.id, e.target.value)}></TextArea>
            </div>
        )
    } else {
        return (
            <div style={{ padding: "1rem", border: "0.5px solid #ccc", borderRadius: "10px", marginBottom: "1rem" }}>
                <div style={{ display: "flex", justifyContent: "flex-start" }}>
                    <h5>測資</h5>
                </div>
                <span>測資輸入</span>
                <TextArea value={testData.input} ></TextArea>
                <span>測資輸出</span>
                <TextArea value={testData.output} ></TextArea>
            </div>
        )
    }
}

export default CodeQutionCreater;