import React from 'react';
import { useState } from 'react';
import { Button } from 'antd'
const YesNoQutionCreater = ({ onAddQuestion }) => {
    const [isRight, setIsRight] = useState(true);
    const addNewQution = () => {
        onAddQuestion({
            type: "YesNo",
            data: isRight
        });
        setIsRight(true)
    }
    return (
        <div>
            <YesNo isRight={isRight} setIsRight={setIsRight}></YesNo>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button type="primary" onClick={addNewQution}>新增題目</Button>
            </div>
        </div>
    );
};
export const YesNo = ({ isRight, setIsRight }) => {
    if (setIsRight) {
        return (
            <div style={{ display: "flex", justifyContent: "center" }}>
                <Button style={{ marginRight: "1rem" }} type={isRight ? "primary" : ""} onClick={() => setIsRight(true)}>正確</Button>
                <Button type={!isRight ? "primary" : ""} onClick={() => setIsRight(false)}>不正確</Button>
            </div>
        )
    } else {
        return (
            <div style={{ display: "flex", justifyContent: "center" }}>
                <Button style={{ marginRight: "1rem" }} type={isRight ? "primary" : ""}>正確</Button>
                <Button type={!isRight ? "primary" : ""} >不正確</Button>
            </div>
        )
    }
}

export default YesNoQutionCreater;