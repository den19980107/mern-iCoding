import React from 'react';

// import component
import { Form } from 'react-bootstrap';
import ClassTimeSelector from '../../../components/ClassTimeSelector/ClassTimeSelector';
import 'braft-editor/dist/index.css'
import BraftEditor from 'braft-editor';
const languageFn = (languages, context) => {
   if (context === 'braft-editor') {
      console.log(languages)
      languages['zh-hant'].controls.clear = '清空'
      return languages['zh-hant']
   }

}
const Step2 = ({ handleChange, handleAddClassTime, handelIntroduction, value }) => {
   function handleClassTimeChange(value) {
      handleAddClassTime(value)
   }
   return (
      <div className="row container">
         <div className="col">
            <Form>
               <Form.Group >
                  <Form.Label>介紹一下你的課程吧！</Form.Label>
                  <BraftEditor
                     style={{ background: "white" }}
                     onChange={(data) => {
                        handelIntroduction(data.toHTML())
                     }}
                     language={languageFn}
                  />
                  {/* <Form.Control as="textarea" rows="12" onChange={handleChange("introduction")} value={value.introduction} /> */}
               </Form.Group>
            </Form>
         </div>
         <div className="col">
            <Form>
               <Form.Group>
                  <Form.Label>設定課程學分</Form.Label>
                  <Form.Control as="select" onChange={handleChange("credit")} value={value.credit}>
                     <option>0</option>
                     <option>1</option>
                     <option>2</option>
                     <option>3</option>
                     <option>4</option>
                     <option>5</option>
                  </Form.Control>
               </Form.Group>
               <Form.Group>
                  <Form.Label>設定課程教室</Form.Label>
                  <Form.Control type="text" onChange={handleChange("classRoom")} value={value.classRoom} />
               </Form.Group>
               <ClassTimeSelector onChange={handleClassTimeChange} value={value.classTime}></ClassTimeSelector>
            </Form>
         </div>
      </div>
   );
};

export default Step2;