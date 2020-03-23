import React, { useContext, useState, useEffect } from 'react';
import _ from "lodash";
import history from '../../history'
import { Link } from 'react-router-dom'
import UserProvider from '../../context/UserProvider';
import config from '../../config/default'
import './MenuBar.css'
//component
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap'
import { Avatar } from 'antd';


const MenuBar = () => {
    const user = useContext(UserProvider.context);
    const [pageYOffset, setPageYOffset] = useState(window.pageYOffset)
    const [navExpanded, setNavExpanded] = useState(false);

    const isLogin = !_.isEmpty(user) ? true : false;

    useEffect(() => {
        window.addEventListener('scroll', listenToScroll)
    }, [])

    const listenToScroll = () => {
        const winScroll =
            document.body.scrollTop || document.documentElement.scrollTop

        const height =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight

        const scrolled = winScroll

        setPageYOffset(scrolled)

    }

    const closeNav = () => {
        setNavExpanded(false)
    }

    const openNav = () => {
        setNavExpanded(true)
    }

    const flipNav = () => {
        setNavExpanded(!navExpanded)
    }

    const navTo = (url) => {
        history.push(url);
        closeNav()
    }

    const notSticky = {
        fontSize: "20px",
        boxShadow: "0px 2px 5px rgba(0,0,0,0.27)",
        position: "relative"
    }

    const sticky = {
        fontSize: "20px",
        position: "fixed",
        top: "0",
        width: "100%",
        zIndex: 1000,
        boxShadow: "0px 2px 5px rgba(0,0,0,0.27)",

    }

    const NavBarStyle = pageYOffset >= 20 ? sticky : notSticky;

    return (
        <Navbar bg="light" expand="lg" style={NavBarStyle} expanded={navExpanded}>
            <Navbar.Brand href="/">i-Coding</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={flipNav} />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    {isLogin &&
                        <React.Fragment>
                            <Nav.Link onClick={() => navTo('/')}>首頁</Nav.Link>
                            <Nav.Link onClick={() => navTo('/class')}>總開課清單</Nav.Link>
                        </React.Fragment>
                    }
                </Nav>
                {isLogin ?
                    <React.Fragment>
                        <Nav style={{ marginRight: "2rem" }} >
                            <Nav.Link onClick={() => navTo('/createClass')}>建立課程</Nav.Link>
                        </Nav>
                        <div style={{ display: "flex" }}>
                            <div style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
                                <Avatar src={user.avatarsUrl} />
                            </div>
                            <NavDropdown title={user.displayName} style={{ marginRight: "1rem" }} id="nav-dropdown" >
                                <NavDropdown.Item><Link style={{ color: "black" }} to="/profile" onClick={closeNav}>個人資料</Link></NavDropdown.Item>
                                <NavDropdown.Item><Link style={{ color: "black" }} to="/account" onClick={closeNav}>帳號設定</Link></NavDropdown.Item>
                                <NavDropdown.Item><Link style={{ color: "black" }} to="/myclass" onClick={closeNav}>開課清單</Link></NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href={`${config.serverUrl}/api/auth/logout`} onClick={closeNav} style={{ color: "black" }}>登出</NavDropdown.Item>
                            </NavDropdown>
                        </div>

                    </React.Fragment>
                    :
                    <React.Fragment>
                        <Nav.Link><Link to="/login" onClick={closeNav} style={{ color: "black" }}>登入</Link></Nav.Link>
                        <Nav.Link><Link to="/register" onClick={closeNav} style={{ color: "black" }}>註冊</Link></Nav.Link>
                    </React.Fragment>
                }
            </Navbar.Collapse>
        </Navbar>
    );
};

export default MenuBar;