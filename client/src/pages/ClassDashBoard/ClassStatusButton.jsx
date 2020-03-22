import React from 'react';
import axios from 'axios';
import { Button, message } from 'antd'
import { useState } from 'react';
import { useEffect } from 'react';
import history from '../../history';
// keys
const notTake = "notTake";
const inProgress = "inProgress";
const alreadyIn = "alreadyIn";
const quit = "quit";



const ClassStatusButton = ({ user, classData, setIsInClass }) => {
    const [status, setStatus] = useState(notTake);

    useEffect(() => {
        axios.get('/api/class/' + classData._id + '/studentStatusList')
            .then(res => {
                let statuses = res.data;
                for (let i = 0; i < statuses.length; i++) {
                    if (statuses[i].studentId == user._id) {
                        if (statuses[i].status == alreadyIn) {
                            setStatus(alreadyIn)
                            setIsInClass(true)
                        } else {
                            setStatus(statuses[i].status)
                        }
                    }
                }
            }).catch(err => {
                console.log(err.response)
            })
    }, [classData, user])


    const handleTakeCourse = async () => {
        try {
            let res = await axios.post("/api/class/takeCourse", {
                studentId: user._id,
                classId: classData._id
            })
            if (res.status == 200) {
                setStatus(inProgress)
                message.success(res.data.message)
            } else {
                message.error(res.data.errors[0].msg)
            }
        } catch (err) {
            message.error(err.response.data.errors[0].msg)
        }
    }

    const handleQuitCourse = async () => {
        try {
            let res = await axios.post("/api/class/quitClass", {
                studentId: user._id,
                classId: classData._id
            })
            if (res.status == 200) {
                setIsInClass(false)
                setStatus(quit)
                message.success(res.data.message)
            } else {
                message.error(res.data.errors[0].msg)
            }
        } catch (err) {
            message.error(err.response.data.errors[0].msg)
        }
    }

    const toClassManager = () => {
        history.push('/class/' + classData._id + '/classManager')
    }
    const toMaterial = () => {
        history.push('/class/' + classData._id + '/material')
    }

    const toTeacherBackEnd = () => {
        history.push('/class/' + classData._id + '/backend')
    }

    if (user._id !== classData.teacherId) {
        return (
            <div>
                {(status == notTake || status == quit) &&
                    <React.Fragment>
                        <Button className="info-button" onClick={handleTakeCourse}>我要上課</Button>
                        <Button className="info-button" icon="book">收藏</Button>
                    </React.Fragment>
                }
                {status == alreadyIn &&
                    <React.Fragment>
                        <Button className="info-button" style={{ background: "red" }} onClick={handleQuitCourse}>退選課程</Button>
                        <Button className="info-button" icon="file-text" onClick={toMaterial}>查看教材</Button>
                    </React.Fragment>
                }
                {status == inProgress &&
                    <React.Fragment>
                        <Button className="info-button" onClick={handleTakeCourse}>審核中...</Button>
                        <Button className="info-button" icon="book">收藏</Button>
                    </React.Fragment>
                }
            </div>
        );
    } else {
        return (
            <React.Fragment>
                <Button icon="file-text" className="info-button" onClick={toClassManager}><span>管理教材</span></Button>
                <Button icon="setting" className="info-button" onClick={toTeacherBackEnd}><span>後台</span></Button>
            </React.Fragment>
        )
    }

};

export default ClassStatusButton;