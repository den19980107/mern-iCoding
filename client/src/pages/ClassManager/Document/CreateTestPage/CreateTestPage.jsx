import React from 'react';
import { Steps, Button, message } from 'antd';
import { useState } from 'react';
import api from '../../../../api/index'
import Step1 from './steps/step1';
import Step2 from './steps/step2';
import Step3 from './steps/step3';
const { Step } = Steps;
const CreateTestPage = (props) => {
    const [current, setCurrent] = useState(0);
    const { unitId } = props.match.params
    // test data
    const [testName, setTestName] = useState("");
    const [questions, setQuestions] = useState([]);
    const [testTime, setTestTime] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [isAssistantCorrectable, setIsAssistantCorrectable] = useState(false);
    const [isAnswerViewable, setIsAnserViewAble] = useState(false)


    const addQuestion = (questionData) => {
        let newQuestions = [...questions]
        newQuestions.push(questionData)
        setQuestions(newQuestions)
    }

    const postTest = async () => {
        const isSuccess = await api.Class.test.createTest(unitId, {
            testName,
            questions,
            testTime,
            startTime,
            isAssistantCorrectable,
            isAnswerViewable
        })
        if (isSuccess) {
            message.success("新增成功！")
        }
    }

    const next = () => {
        setCurrent(current + 1)
    }

    const prev = () => {
        setCurrent(current - 1)

    }

    const steps = [
        {
            title: '設定測驗名稱',
            content: <Step1 testName={testName} setTestName={setTestName}></Step1>,
        },
        {
            title: '設計測驗',
            content: <Step2 questions={questions} addQuestion={addQuestion}></Step2>,
        },
        {
            title: '測驗設定',
            content: <Step3
                isAssistantCorrectable={isAssistantCorrectable}
                isAnswerViewable={isAnswerViewable}
                setTestTime={setTestTime}
                setStartTime={setStartTime}
                setIsAssistantCorrectable={setIsAssistantCorrectable}
                setIsAnserViewAble={setIsAnserViewAble}
            ></Step3>,
        },
    ];
    return (
        <div className="container mt-3" style={{ maxWidth: "80%" }}>
            <Steps current={current}>
                {steps.map(item => (
                    <Step key={item.title} title={item.title} />
                ))}
            </Steps>
            <div className="steps-content m-0 p-0">{steps[current].content}</div>
            <div className="steps-action">
                {current < steps.length - 1 && (
                    <Button type="primary" onClick={() => next()}>
                        下一步
                    </Button>
                )}
                {current === steps.length - 1 && (
                    <Button type="primary" onClick={postTest}>
                        完成
                    </Button>
                )}
                {current > 0 && (
                    <Button style={{ marginLeft: 8 }} onClick={() => prev()}>
                        上一部
                    </Button>
                )}
            </div>
        </div>
    );
};

export default CreateTestPage;