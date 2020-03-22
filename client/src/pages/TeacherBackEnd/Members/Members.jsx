import React, { useEffect, useState } from 'react';
import api from '../../../api';

// import component
import { Tabs } from 'antd';
import InClass from './InClass';
import InProgress from './InProgress';
const { TabPane } = Tabs;

function Members({ classId }) {
    const [studentsData, setStudentData] = useState([]);
    // 正在申請但還未審核的學生
    const [inProccessStudentsData, setInProccessStudentData] = useState([]);
    const [tab, setTab] = useState("inClass");

    useEffect(() => {
        _getStudentTakeCourseList();
    }, [])

    const _getStudentTakeCourseList = async () => {
        let studentTakeCoutseList = await api.Class.getStudentTakeCourseList(classId);
        let studentsData = [];
        let inProgressStudentsData = []
        for (let i = 0; i < studentTakeCoutseList.length; i++) {
            const studentTakeCourseData = studentTakeCoutseList[i];
            if (studentTakeCourseData.isIn) {
                const studentData = await api.User.getUserById(studentTakeCourseData.studentId);
                studentsData.push(studentData);
            } else if (studentTakeCourseData.status == "inProgress") {
                const studentData = await api.User.getUserById(studentTakeCourseData.studentId);
                inProgressStudentsData.push(studentData);
            }
        }
        setStudentData(studentsData);
        setInProccessStudentData(inProgressStudentsData);
        console.log(studentsData, inProgressStudentsData);
    }

    const _changeTab = (tab) => {
        setTab(tab)
    }
    return (
        <div class="container" style={{ paddingTop: "1rem" }}>
            <Tabs defaultActiveKey={tab} onChange={_changeTab}>
                <TabPane tab="本班成員" key="inClass"></TabPane>
                <TabPane tab="待審核成員" key="inProgress"></TabPane>
            </Tabs>
            {tab == "inClass" && <InClass classId={classId} updateData={_getStudentTakeCourseList} inClassStudentsData={studentsData}></InClass>}
            {tab == "inProgress" && <InProgress classId={classId} updateData={_getStudentTakeCourseList} inProccessStudentsData={inProccessStudentsData}></InProgress>}
        </div>
    );
}

export default Members;