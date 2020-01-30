import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { Upload, message, Button, Icon } from 'antd';

// import compornent
import ClassItem from '../../Classes/ClassItem';

const Step1 = ({ value, teacherData, handleChange, handleImageUpload }) => {
   let coverImage = value.coverImage ? value.coverImage : "https://hahow.in/static/media/coursebrief-placeholder.3ba531a3.svg"

   return (
      <div className="container">
         <div className="row">
            <Form className="col">
               <Form.Group controlId="formBasicEmail">
                  <Form.Label>課程名稱</Form.Label>
                  <Form.Control type="text" placeholder="請輸入課程名稱" onChange={handleChange('name')} value={value.name} />
                  <Form.Text className="text-muted">
                     吸引人的課程名稱很重要
               </Form.Text>
               </Form.Group>

               <Form.Group controlId="formBasicPassword">
                  <Form.Label>課程封面照片</Form.Label>
                  <Upload
                     name="coverImage"
                     action="/image/upload"
                     onChange={(info) => {
                        if (info.file.status === 'done') {
                           message.success(`${info.file.name} file uploaded successfully`);
                           console.log(handleChange)
                           handleImageUpload('coverImage', info.file.response.imageUrl)
                        } else if (info.file.status === 'error') {
                           message.error(`${info.file.name} file upload failed.`);
                        }
                     }
                     }
                  >
                     <Button>
                        <Icon type="upload" /> Click to Upload
                  </Button>
                  </Upload>
               </Form.Group>

               <Form.Group controlId="formBasicEmail">
                  <Form.Label>簡短的課程描述</Form.Label>
                  <Form.Control as="textarea" rows="8" onChange={handleChange('outline')} value={value.outline} />
               </Form.Group>

            </Form>
            <div >
               <ClassItem
                  classDatas={{
                     classData: {
                        coverImage: coverImage,
                        name: value.name,
                        outline: value.outline
                     },
                     teacher: teacherData
                  }}>
               </ClassItem>
            </div>
         </div>
      </div>
   );
};

export default Step1;