import React, { useState, useEffect } from 'react';
import BraftEditor from 'braft-editor';
import { languageFn } from '../../CreateMaterialModal/CreateMaterialModal';
import { Collapse, Tabs, Input } from 'antd';
import ChoiceQutionCreater, { Choice } from '../components/ChoiceQutionCreater'
import CodeQutionCreater, { TestData } from '../components/CodeQutionCreater'
import FillQutionCreater, { Fill } from '../components/FillQutionCreater'
import YesNoQutionCreater, { YesNo } from '../components/YesNoQutionCreater'

const { Panel } = Collapse;
const { TabPane } = Tabs;
const Step2 = ({ questions, addQuestion }) => {
    const [questionName, setQuestionName] = useState("");
    const [editorState, setEditorState] = useState(null);

    // component did mount
    useEffect(() => {
        setEditorState(BraftEditor.createEditorState(""));
    }, [])

    const handleChangeQuestion = (key) => {

    }

    const handleChangeQuestionName = (e) => {
        setQuestionName(e.target.value)
    }
    const handleAddQuestion = (questionData) => {
        let question = {
            name: questionName,
            description: editorState.toHTML(),
            type: questionData.type,
            data: questionData.data
        }
        addQuestion(question)

        // 清空資料
        setQuestionName("")
        setEditorState(BraftEditor.createEditorState(""));
    }
    return (
        <div style={{ display: "flex", padding: "1rem" }}>
            <div style={{ width: "50%", height: "100%", overflow: "auto", textAlign: "start" }}>
                <Collapse defaultActiveKey={['1']}>
                    <Panel header="題目名稱" key="1">
                        <Input value={questionName} onChange={handleChangeQuestionName} size="large" placeholder="題目名稱" />
                    </Panel>
                    <Panel header="題目描述" key="2">
                        <BraftEditor
                            style={{ background: "white" }}
                            value={editorState}
                            onChange={(data) => {
                                setEditorState(data)
                            }}
                            language={languageFn}
                        />
                    </Panel>
                    <Panel header="題目答案" key="3">
                        <Tabs defaultActiveKey="1" onChange={handleChangeQuestion}>
                            <TabPane tab="選擇題" key="1">
                                <ChoiceQutionCreater onAddQuestion={handleAddQuestion}></ChoiceQutionCreater>
                            </TabPane>
                            <TabPane tab="填充題" key="2">
                                <FillQutionCreater onAddQuestion={handleAddQuestion}></FillQutionCreater>
                            </TabPane>
                            <TabPane tab="是非題" key="3">
                                <YesNoQutionCreater onAddQuestion={handleAddQuestion}></YesNoQutionCreater>
                            </TabPane>
                            <TabPane tab="程式題" key="4">
                                <CodeQutionCreater onAddQuestion={handleAddQuestion}></CodeQutionCreater>
                            </TabPane>
                        </Tabs>
                    </Panel>
                </Collapse>
            </div>
            <div style={{ width: "50%", marginLeft: "1rem", padding: "1rem", maxHeight: "500px", overflowY: "auto", background: "white" }}>
                {questions.map(question => (
                    <DisplayQuestion question={question}></DisplayQuestion>
                ))}
            </div>
        </div>
    );
};

const DisplayQuestion = ({ question }) => {
    let type = ""
    let body;
    switch (question.type) {
        case "choice":
            type = "選擇題"
            body = <ChoiceBody question={question}></ChoiceBody>
            break;
        case "fill":
            type = "填充題"
            body = <FillBody question={question}></FillBody>
            break;
        case "YesNo":
            type = "是非題"
            body = <YesNoBody question={question}></YesNoBody>
            break;
        case "code":
            type = "程式題"
            body = <CodeBody question={question}></CodeBody>
            break;
    }
    return (
        <Collapse>
            <Panel header={`${question.name} [${type}]`} >
                {body}
            </Panel>
        </Collapse>
    )
}

const ChoiceBody = ({ question }) => {
    return (
        <div>
            <div style={{ textAlign: "start" }} dangerouslySetInnerHTML={{ __html: question.description }}></div>
            {question.data.map(choice => (
                <Choice choice={choice}></Choice>
            ))}
        </div>
    )
}

const FillBody = ({ question }) => {
    return (
        <div>
            <div style={{ textAlign: "start" }} dangerouslySetInnerHTML={{ __html: question.description }}></div>
            {question.data.map(fill => (
                <Fill answer={fill}></Fill>
            ))}
        </div>
    )
}

const YesNoBody = ({ question }) => {
    return (
        <div>
            <div style={{ textAlign: "start" }} dangerouslySetInnerHTML={{ __html: question.description }}></div>
            <YesNo isRight={question.data}></YesNo>

        </div>
    )
}

const CodeBody = ({ question }) => {
    return (
        <div>
            <div style={{ textAlign: "start" }} dangerouslySetInnerHTML={{ __html: question.description }}></div>
            {question.data.map(testData => (
                <TestData testData={testData}></TestData>
            ))}
        </div>
    )
}

export default Step2;