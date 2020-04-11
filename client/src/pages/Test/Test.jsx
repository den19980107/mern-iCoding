import React, { useEffect, useState } from 'react';
import Comments from '../../components/Comments'
import api from '../../api';
import history from '../../history'
import moment from '../../common/moment'

// import component
import Loader from '../../components/Loader/Loader'
import Choice from './question/Choice';
import Code from './question/Code';
import YesNo from './question/YesNo';
import Fill from './question/Fill'

const Test = (props) => {
    const { classId, unitId, testId } = props.match.params
    const [testData, setTestData] = useState(null)
    const [startTime, setStartTime] = useState(null)
    const [endTime, setEndTime] = useState(null);
    const [remainingTime, setRemainingTime] = useState(0)
    useEffect(() => {
        getTestData();
    }, [])

    useEffect(() => {
        const timer = setInterval(() => {
            const minute = Math.round((endTime - new Date().getTime()) / 1000 / 60)
            const second = Math.round(((endTime - new Date().getTime()) / 1000 / 60 - minute) * 60)
            setRemainingTime(`${minute} 分鐘 ${second} 秒後結束`)
        }, 1000);
        return () => {
            clearInterval(timer);
        };
    }, [endTime])

    const getTestData = async () => {
        let data = await api.Class.test.getTestById(testId)
        console.log(data)
        if (data) {
            setTestData(data)
            let startTime_local = new Date(data.startTime)
            setStartTime(startTime_local.getTime())
            let endTime_local = new Date(startTime_local.getTime() + data.testTime * 60 * 100)
            setEndTime(endTime_local.getTime())
        } else {
            history.goBack()
        }
    }


    return (
        <div className="container mt-3">
            {testData
                ?
                <div>
                    <div>
                        <h3>{testData.testName}</h3>
                        <p>{remainingTime}</p>
                    </div>
                    <div>
                        {testData.questions.map(question => {
                            return (
                                <div style={{ background: "white", padding: "1rem", border: "0.5px solid #ccc", marginBottom: "1rem" }}>
                                    <p>{question.name}</p>
                                    <div dangerouslySetInnerHTML={{ __html: question.description }}></div>
                                    <div>
                                        {question.type == "choice" && question.data.map(questionData => <Choice choice={questionData}></Choice>)}
                                        {question.type == "fill" && <Fill></Fill>}
                                        {question.type == "code" && <Code></Code>}
                                        {question.type == "YesNo" && <YesNo></YesNo>}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                :
                <Loader></Loader>
            }
        </div>
    );
};

export default Test;