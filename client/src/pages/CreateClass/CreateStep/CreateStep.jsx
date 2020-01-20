import React, { useState, useEffect, useContext } from 'react';
import './CreateStep.css'
import { Steps, Button, message } from 'antd';
import UserProvider from '../../../context/UserProvider'
// import component
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';

const { Step } = Steps;

const CreateStep = () => {
   const user = useContext(UserProvider.context);
   const [current, setCurrent] = useState(0);
   const [name, setName] = useState("這邊會顯示您設定的課程名稱呦 (つ´ω`)つ");
   const [outline, setOutline] = useState("這邊會顯示您輸入的課程介紹呦!(簡介可提供學生了解課程內容)⁽⁽٩(๑˃̶͈̀ ᗨ ˂̶͈́)۶⁾⁾");
   const [credit, setCredit] = useState("");
   const [classTime, setClassTime] = useState("");
   const [classRoom, setClassRoom] = useState("");
   const [isLaunched, setIsLaunched] = useState("");
   const [coverImage, setCoverImage] = useState(null);

   function next() {
      let isVerified = false
      switch (current) {
         case 0:
            if ((name != "") && (outline != "")) {
               isVerified = true
            } else {
               message.error(`請填寫詳細！`);
            }
            break;
         case 1:
            break;
         case 2:
            break;
      }
      if (isVerified) {
         setCurrent(current + 1);
      }
   }

   function prev() {
      setCurrent(current - 1);
   }

   // Handle fields change
   const handleChange = (input) => e => {
      const newValue = e.target.value
      switch (input) {
         case "name":
            setName(newValue)
            break;
         case "outline":
            setOutline(newValue)
            break;
         case "credit":
            setCredit(newValue)
            break;
         case "classTime":
            setClassTime(newValue)
            break;
         case "classRoom":
            setClassRoom(newValue)
            break;
         case "isLaunched":
            setIsLaunched(newValue)
            break;
      }
   };

   const handleImageUpload = (input, value) => {
      setCoverImage(value);
   }
   // const { name, outline, teacherId, credit, classTime, classRoom, isLaunched, coverImage } = classData;
   const value = { name, outline, credit, classTime, classRoom, isLaunched, coverImage }
   const steps = [
      {
         title: '第一步',
         content: <Step1 value={value} teacherData={user} handleChange={handleChange} handleImageUpload={handleImageUpload}></Step1>,
      },
      {
         title: '第二步',
         content: <Step2 value={value} handleChange={handleChange}></Step2>,
      },
      {
         title: '最後一步',
         content: <Step2></Step2>,
      },
   ];
   return (
      <div>
         <Steps current={current}>
            {steps.map(item => (
               <Step key={item.title} title={item.title} />
            ))}
         </Steps>
         <div className="steps-content" style={{ textAlign: "start" }}>{steps[current].content}</div>
         <div className="steps-action">
            {current < steps.length - 1 && (
               <Button type="primary" onClick={() => next()}>
                  下一步
               </Button>
            )}
            {current === steps.length - 1 && (
               <Button type="primary" onClick={() => message.success('Processing complete!')}>
                  建立
               </Button>
            )}
            {current > 0 && (
               <Button style={{ marginLeft: 8 }} onClick={() => prev()}>
                  上一步
               </Button>
            )}
         </div>
      </div>
   );
};

export default CreateStep;