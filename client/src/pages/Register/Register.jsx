import React, { useState } from 'react';
import { Form, Button as BSButton, Card } from 'react-bootstrap'
import "antd/dist/antd.css";
import { message } from 'antd';
import history from "../../history";
const Register = () => {
   const [displayName, setDisplayName] = useState("");
   const [email, setemial] = useState("");
   const [username, setUsername] = useState("");
   const [password, setpassword] = useState("");
   const [password2, setpassword2] = useState("");

   const updateFrom = (e, type) => {
      switch (type) {
         case "displayName":
            setDisplayName(e.target.value);
            break;
         case "email":
            setemial(e.target.value);
            break;
         case "username":
            setUsername(e.target.value);
            break;
         case "password":
            setpassword(e.target.value);
            break;
         case "password2":
            setpassword2(e.target.value);
            break;
      }
   }

   const submit = () => {
      let userData = {
         username,
         displayName,
         email,
         password,
         password2
      }
      console.log(JSON.stringify(userData))

      fetch('/api/auth/register', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(userData)
      }).then((response) => {
         console.log("res", response)
         return response.json();
      }).then((jsonData) => {
         console.log("json", jsonData)
         if (jsonData.errors) {
            console.log(jsonData.errors)
            for (let i = 0; i < jsonData.errors.length; i++) {
               message.error(jsonData.errors[i].msg);
            }
         } else {
            message.success(jsonData.message);
            history.push('/login')
         }
      }).catch((err) => {
         console.log('錯誤:', err);
      })

   }

   return (
      <div className="container" style={{ display: "flex", justifyContent: "center" }}>
         <div style={{ marginTop: "2rem", width: "500px" }}>
            <Card>
               <Card.Header>
                  <h3>註冊</h3>
               </Card.Header>
               <Card.Body>
                  <Form>
                     <Form.Group controlId="confirmPassword">
                        <Form.Label>姓名</Form.Label>
                        <Form.Control placeholder="請輸入姓名" onChange={e => updateFrom(e, "displayName")} />
                     </Form.Group>

                     <Form.Group>
                        <Form.Label>信箱</Form.Label>
                        <Form.Control type="email" placeholder="請輸入信箱" onChange={e => updateFrom(e, "email")} />
                     </Form.Group>

                     <Form.Group controlId="formBasicEmail">
                        <Form.Label>帳號</Form.Label>
                        <Form.Control placeholder="請輸入帳號" onChange={e => updateFrom(e, "username")} />
                     </Form.Group>

                     <Form.Group controlId="formBasicPassword">
                        <Form.Label>密碼</Form.Label>
                        <Form.Control type="password" placeholder="請輸入密碼" onChange={e => updateFrom(e, "password")} />
                     </Form.Group>

                     <Form.Group controlId="confirmPassword">
                        <Form.Label>確認密碼</Form.Label>
                        <Form.Control type="password" placeholder="請在輸入一次密碼" onChange={e => updateFrom(e, "password2")} />
                     </Form.Group>

                     <BSButton variant="primary" style={{ float: "right" }} onClick={submit}>
                        註冊
                     </BSButton>
                  </Form>
               </Card.Body>
            </Card>
         </div>
      </div>
   );
};

export default Register;