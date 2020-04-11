import React from 'react';
import { Button } from 'antd'
const YesNo = () => {
    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <Button style={{ marginRight: "1rem" }} >正確</Button>
            <Button  >不正確</Button>
        </div>
    );
};

export default YesNo;