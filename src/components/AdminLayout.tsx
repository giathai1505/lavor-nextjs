"use client";
import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import { AdminSiderMenuData } from "@/assets/staticData";
import logo from "@/assets/images/logo/logo-white.webp";
import Link from "next/link";
import Image from "next/image";

const { Header, Sider, Content } = Layout;
const DEFAULT_ACTIVE_MENU = ["1"];

const AdminLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout className="h-screen">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="sidebar-avatar">
          <Link href="/admin">
            <Image src={logo} alt="logo-white" className="sidebar-logo" />
          </Link>
          <p>Xin chào Lavor</p>
        </div>
        <p className="dashboard-text ">DASHBOARD</p>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={DEFAULT_ACTIVE_MENU}
          items={AdminSiderMenuData}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          Content
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
