import React, { useState } from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import history from "../../history";
import { Router, Route } from "react-router-dom";
import Members from './Members/Members';
const { Header, Content, Footer, Sider } = Layout;

const TeacherBackEnd = (props) => {
    const [collapsed, setCollapsed] = useState(false);
    const [needHideSideBar, setNeedHideSideBar] = useState(false);
    const classId = props.match.params.id;

    const onCollapse = collapsed => {
        console.log(collapsed);
        setCollapsed(collapsed)
    };
    const onSelect = selected => {
        console.log(props.match.params)
        history.push(`/class/${classId}/backend/${selected.key}`)
    }
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider
                breakpoint="lg"
                collapsible
                collapsed={collapsed}
                onCollapse={onCollapse}
                collapsedWidth={needHideSideBar ? "0" : "80"}
                onBreakpoint={broken => {
                    console.log(broken);
                    if (broken) {
                        setNeedHideSideBar(true)
                    } else {
                        setNeedHideSideBar(false)
                    }
                }}
            >
                <Menu theme="dark" defaultSelectedKeys={[props.match.params.tab]} onSelect={onSelect} mode="inline">
                    <Menu.Item key="members">
                        <Icon type="team" />
                        <span>本班成員</span>
                    </Menu.Item>
                    <Menu.Item key="assistant">
                        <Icon type="user-add" />
                        <span>助教管理</span>
                    </Menu.Item>
                    <Menu.Item key="test">
                        <Icon type="file-text" />
                        <span>批閱測驗</span>
                    </Menu.Item>
                    <Menu.Item key="studySituation">
                        <Icon type="pie-chart" />
                        <span>學習狀況</span>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                {/* <Header style={{ background: '#fff', padding: 0 }} /> */}
                <Content style={{ margin: '0 16px' }}>
                    {(function () {
                        switch (props.match.params.tab) {
                            case 'members':
                                return <Members classId={classId}></Members>;
                            case 'assistant':
                                return <p>assistant</p>;
                            case 'test':
                                return <p>test</p>
                            case 'studySituation':
                                return <p>studySituation</p>;
                            default:
                                return <Members classId={classId}></Members>;
                        }
                    })()}
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        </Layout>

    );
};

export default TeacherBackEnd;