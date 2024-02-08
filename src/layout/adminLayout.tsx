import { Outlet, useNavigate } from "react-router-dom";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import React, { useState } from "react";
import type { MenuProps } from "antd";
import {
  DashboardOutlined,
  UserAddOutlined,
  TeamOutlined,
  ReconciliationOutlined,
  AppleOutlined,
  ClusterOutlined,
  CopyOutlined,
  PieChartOutlined,
  RiseOutlined,
  DatabaseOutlined,
} from "@ant-design/icons";

const { Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Dashboard", "dashboard", <DashboardOutlined />),
  getItem("Users", "users", <TeamOutlined />),
  getItem("Category", "category", <ClusterOutlined />),
  getItem("Products", "products", <PieChartOutlined />),
  getItem("Brands", "brands", <AppleOutlined />),
  getItem("Events", "events", <RiseOutlined />),
  getItem("Orders", "orders", <DatabaseOutlined />),
  getItem("Attributes", "attributes", <ReconciliationOutlined />),
  getItem("Pages", "pages", <CopyOutlined />),
  getItem("Add Admin", "addadmin", <UserAddOutlined />),
];

const adminLayout: React.FC = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleMenuClick = (key: React.Key) => {
    key === "dashboard" ? navigate("/admin") : navigate(`/admin/${key}`);
    sessionStorage.setItem("currentPage", key.toString());
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={[
            sessionStorage.getItem("currentPage") || "dashboard",
          ]}
          mode="inline"
          items={items}
          onClick={({ key }) => handleMenuClick(key)}
        />
      </Sider>
      <Layout>
        {/* <Header style={{ padding: 0, background: colorBgContainer }} /> */}
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Admin</Breadcrumb.Item>
            <Breadcrumb.Item>
              {sessionStorage.getItem("currentPage")?.toUpperCase() ||
                "Dashboard"}
            </Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {<Outlet />}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          ©{new Date().getFullYear()} Created by A
        </Footer>
      </Layout>
    </Layout>
  );
};

export default adminLayout;
