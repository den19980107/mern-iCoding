import React from 'react';
import { useState } from 'react';
import { Switch, DatePicker, InputNumber, Alert } from 'antd';

const Step3 = ({ setTestTime, setStartTime, setIsAssistantCorrectable, setIsAnserViewAble, isAnswerViewable, isAssistantCorrectable }) => {
    const [isSetTestTime, setIsSetClassTime] = useState(false)
    const [isSetTimePublicTest, setIsSetTimePublicTest] = useState(false)
    return (
        <div className="container">
            <div style={{ textAlign: "start", margin: "3rem 1rem", padding: "1rem", background: "white" }}>
                <h3>測驗設定</h3>
                <hr></hr>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <p style={{ padding: "0", margin: "0" }}>考試時間</p>
                    <Switch onChange={() => setIsSetClassTime(!isSetTestTime)} />
                </div>
                {
                    isSetTestTime &&
                    <div style={{ padding: "1rem 1rem 1rem 0" }}>
                        <InputNumber min={1} defaultValue={30} onChange={(time) => { setTestTime(time) }} /> 分鐘
                    </div>
                }
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <p style={{ padding: "0", margin: "0" }}>是否給助教批閱</p>
                    <Switch onChange={() => setIsAssistantCorrectable(!isAssistantCorrectable)} />
                </div>
                {
                    isAssistantCorrectable ?
                        <div style={{ padding: "1rem 0 1rem 0" }}>
                            <Alert message="開放給助教批閱測驗之後，在您課程中的助教將有權限為這個測驗進行批閱" type="warning" />
                        </div>
                        :
                        <div style={{ padding: "1rem 0 1rem 0" }}>
                            <Alert message="不開放給助教批閱測驗將只有您可以批閱這個測驗" type="warning" />
                        </div>
                }
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <p style={{ padding: "0", margin: "0" }}>考試完成後可直接觀看答案</p>
                    <Switch onChange={() => setIsAnserViewAble(!isAnswerViewable)} />
                </div>
                {
                    isAnswerViewable ?
                        <div style={{ padding: "1rem 0 1rem 0" }}>
                            <Alert message="開放考試完成後可直接觀看答案表示學生在完成測驗後，即可馬上看到本次測驗的答案" type="warning" />
                        </div>
                        :
                        <div style={{ padding: "1rem 0 1rem 0" }}>
                            <Alert message="關閉考試完成後可直接觀看答案表示學生在完成測驗後，無法看到本次測驗的答案" type="warning" />
                        </div>
                }
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <p style={{ padding: "0", margin: "0" }}>在指定時間發佈測驗</p>
                    <Switch onChange={() => setIsSetTimePublicTest(!isSetTimePublicTest)} />
                </div>
                {
                    isSetTimePublicTest &&
                    <div style={{ padding: "1rem 0 1rem 0" }}>
                        <DatePicker showTime placeholder="設定測驗開放時間" onChange={(time, dateString) => { setStartTime(dateString) }} onOk={() => { }} />
                    </div>
                }
            </div>
        </div>
    );
};

export default Step3;