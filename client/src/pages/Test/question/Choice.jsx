import React from 'react';
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from 'react-icons/md'
import { Input } from 'antd'
const Choice = ({ choice }) => {
    return (
        <div style={{ display: "flex", margin: "1rem 0" }}>
            <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", margin: "0 1rem 0 0 " }}>
                {choice.isAnswer ?
                    <MdRadioButtonChecked fontSize="1.5rem"></MdRadioButtonChecked>
                    :
                    <MdRadioButtonUnchecked fontSize="1.5rem"></MdRadioButtonUnchecked>
                }
            </div>
            <Input value={choice.title} ></Input>
        </div>
    );
};

export default Choice;