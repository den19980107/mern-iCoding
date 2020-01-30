import React, { useContext } from 'react';
import _ from "lodash";
import history from '../../history'
import { Link } from 'react-router-dom'
import UserProvider from '../../context/UserProvider';
import './MenuBar.css'
//component
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap'
import { Avatar } from 'antd';


const MenuBar = () => {
   const user = useContext(UserProvider.context);
   const isLogin = !_.isEmpty(user) ? true : false;

   return (
      <Navbar bg="light" expand="lg" style={{ fontSize: "20px" }}>
         <Navbar.Brand href="/">i-Coding</Navbar.Brand>
         <Navbar.Toggle aria-controls="basic-navbar-nav" />
         <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
               {isLogin &&
                  <React.Fragment>
                     <Nav.Link onClick={() => history.push('/')}>首頁</Nav.Link>
                     <Nav.Link onClick={() => history.push('/class')}>總開課清單</Nav.Link>
                  </React.Fragment>
               }
            </Nav>
            {isLogin ?
               <React.Fragment>
                  <Nav style={{ marginRight: "2rem" }} >
                     <Nav.Link onClick={() => history.push('/createClass')}>建立課程</Nav.Link>
                  </Nav>
                  <div style={{ display: "flex" }}>
                     <div style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
                        <Avatar src={user.avatarsUrl} />
                     </div>
                     <NavDropdown title={user.displayName} style={{ marginRight: "1rem" }} id="nav-dropdown" >
                        <NavDropdown.Item><Link style={{ color: "black" }} to="/profile">個人資料</Link></NavDropdown.Item>
                        <NavDropdown.Item><Link style={{ color: "black" }} to="/account">帳號設定</Link></NavDropdown.Item>
                        <NavDropdown.Item><Link style={{ color: "black" }} to="/myclass">開課清單</Link></NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="http://localhost:5000/auth/logout" style={{ color: "black" }}>登出</NavDropdown.Item>
                     </NavDropdown>
                  </div>

               </React.Fragment>
               :
               <React.Fragment>
                  <Nav.Link><Link to="/login" style={{ color: "black" }}>登入</Link></Nav.Link>
                  <Nav.Link><Link to="/register" style={{ color: "black" }}>註冊</Link></Nav.Link>
               </React.Fragment>
            }
         </Navbar.Collapse>
      </Navbar>
   );
};

export default MenuBar;