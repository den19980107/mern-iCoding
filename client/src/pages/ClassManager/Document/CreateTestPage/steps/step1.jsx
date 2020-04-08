import React from 'react';
import { Input } from 'antd';
const Step1 = ({ testName, setTestName }) => {
    const handleTestNameChange = (e) => {
        console.log(e.target.value)
        setTestName(e.target.value)
    }
    return (
        <div className="mt-5">
            <h3>請輸入測驗名稱</h3>
            <Input style={{ width: "40%" }} value={testName} onChange={handleTestNameChange} size="large" placeholder="測驗名稱" />
        </div>
    );
};

export default Step1;