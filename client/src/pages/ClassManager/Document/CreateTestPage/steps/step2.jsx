import React, { useState } from 'react';
import BraftEditor from 'braft-editor';
import { languageFn } from '../../CreateMaterialModal/CreateMaterialModal';
import { Collapse, Tabs, Input } from 'antd';

import ChoiceQutionCreater from '../components/ChoiceQutionCreater'
import CodeQutionCreater from '../components/CodeQutionCreater'
import FillQutionCreater from '../components/FillQutionCreater'
import YesNoQutionCreater from '../components/YesNoQutionCreater'

const { Panel } = Collapse;
const { TabPane } = Tabs;
const Step2 = () => {
    const [questionName, setQuestionName] = useState("");

    const handleBodyChange = (html) => {
        console.log(html)
    }

    const handleChangeQuestion = (key) => {

    }

    const handleChangeQuestionName = (e) => {
        setQuestionName(e.target.value)
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
                            onChange={(data) => {
                                handleBodyChange(data.toHTML())
                            }}
                            language={languageFn}
                        />
                    </Panel>
                    <Panel header="題目答案" key="3">
                        <Tabs defaultActiveKey="1" onChange={handleChangeQuestion}>
                            <TabPane tab="選擇題" key="1">
                                <ChoiceQutionCreater></ChoiceQutionCreater>
                            </TabPane>
                            <TabPane tab="填充題" key="2">
                                <FillQutionCreater></FillQutionCreater>
                            </TabPane>
                            <TabPane tab="是非題" key="3">
                                <YesNoQutionCreater></YesNoQutionCreater>
                            </TabPane>
                            <TabPane tab="程式題" key="4">
                                <CodeQutionCreater></CodeQutionCreater>
                            </TabPane>
                        </Tabs>
                    </Panel>
                </Collapse>
            </div>
            <div style={{ width: "50%" }}>
                asdads
            </div>
        </div>
    );
};

export default Step2;