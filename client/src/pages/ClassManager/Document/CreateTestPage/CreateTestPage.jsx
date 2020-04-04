import React from 'react';
import { Steps, Button, message } from 'antd';
import { useState } from 'react';
import Step1 from './steps/step1';
import Step2 from './steps/step2';
import Step3 from './steps/step3';
const { Step } = Steps;
const CreateTestPage = () => {
    const [current, setCurrent] = useState(0);

    // test data
    const [testName, setTestName] = useState("");


    const steps = [
        {
            title: 'First',
            content: <Step1 testName={testName} setTestName={setTestName}></Step1>,
        },
        {
            title: 'Second',
            content: <Step2></Step2>,
        },
        {
            title: 'Last',
            content: <Step3></Step3>,
        },
    ];

    const next = () => {
        setCurrent(current + 1)
    }

    const prev = () => {
        setCurrent(current - 1)

    }
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
                        Next
                    </Button>
                )}
                {current === steps.length - 1 && (
                    <Button type="primary" onClick={() => message.success('Processing complete!')}>
                        Done
                    </Button>
                )}
                {current > 0 && (
                    <Button style={{ marginLeft: 8 }} onClick={() => prev()}>
                        Previous
                    </Button>
                )}
            </div>
        </div>
    );
};

export default CreateTestPage;