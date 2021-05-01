import React, { useState } from "react";
import { Layout, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";

const { Sider, Header } = Layout;

export default function SidebarCyberbugs() {
  const [state, setState] = useState({ collapsed: false });
  const toggle = () => {
    setState({
      collapsed: !state.collapsed,
    });
  };

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={state.collapsed}>
        <Header
          className="site-layout-background text-center"
          style={{ padding: 0, color: "#fff", cursor: "pointer", fontSize: 25 }}
        >
          {React.createElement(
            state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: toggle,
            }
          )}
        </Header>
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<PlusOutlined style={{ fontSize: 25 }} />}>
            Create Project
          </Menu.Item>
          <Menu.Item key="2" icon={<SearchOutlined style={{ fontSize: 25 }} />}>
            Search Project
          </Menu.Item>
        </Menu>
      </Sider>
    </Layout>
  );
}
