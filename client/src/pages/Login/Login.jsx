import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import CardList from '../../components/LoginCard/CardList';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

// component
import { message } from 'antd';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

const Login = ({ isLogin }) => {
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");

   const updateFrom = (e, type) => {
      switch (type) {
         case "username":
            setUsername(e.target.value);
            break;
         case "password":
            setPassword(e.target.value);
            break;
         default:
            break;
      }
   }

   const handleLogin = () => {
      let loginData = {
         username,
         password
      }
      axios.post('/auth/login', loginData)
         .then(res => {
            console.log("qweq", res)
            if (res.status === 200) {
               console.log(res.data)
               window.location = "/"
               message.success(`哈摟！${res.data.user.displayName}`);
            } else {
               message.error(`登入失敗！`);
            }
         })
         .catch(err => {
            message.error(err.response.data.error);
         })
   }

   if (isLogin) {
      return <Redirect to="/"></Redirect>
   }
   return (
      <div class="container" style={{ display: "flex", justifyContent: "center" }}>
         <div style={{ width: "500px", marginTop: "2rem" }}>
            <Card>
               <Card.Header>
                  <h3>登入</h3>
               </Card.Header>
               <Card.Body>
                  <Form>
                     <Form.Group controlId="formBasicEmail">
                        <Form.Label>帳號</Form.Label>
                        <Form.Control placeholder="請輸入帳號" onChange={e => updateFrom(e, "username")} />
                     </Form.Group>

                     <Form.Group controlId="formBasicPassword">
                        <Form.Label>密碼</Form.Label>
                        <Form.Control type="password" placeholder="請輸入密碼" onChange={e => updateFrom(e, "password")} />
                     </Form.Group>

                     <Button variant="primary" style={{ float: "right" }} onClick={handleLogin}>
                        登入
                     </Button>
                  </Form>
               </Card.Body>
            </Card>
            <CardList></CardList>
         </div>
      </div>
   );
};

export default Login;