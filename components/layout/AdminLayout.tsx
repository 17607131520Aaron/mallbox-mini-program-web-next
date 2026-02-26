"use client";

import {
  AppstoreOutlined,
  SearchOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Input, List, Menu, Space, Avatar, Typography } from "antd";
import type { MenuProps } from "antd";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useMemo, useTransition } from "react";
import { SIDE_MENU_ITEMS, ADMIN_HOME_PATH } from "@/lib/routes";
import useRootLayout from "./useRootLayout";
import "./AdminLayout.scss";

const { Header, Sider, Content } = Layout;
const { Text } = Typography;

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [, startTransition] = useTransition();

  const {
    collapsed,
    handleComplete,
    searchValue,
    handleSearchChange,
    openKeys,
    handleOpenChange,
  } = useRootLayout();

  const selectedKeys = useMemo(() => {
    const current =
      SIDE_MENU_ITEMS.find((item) => pathname.startsWith(item.path)) ??
      SIDE_MENU_ITEMS[0];
    return [current.key];
  }, [pathname]);

  const items: MenuProps["items"] = SIDE_MENU_ITEMS.map((item) => ({
    key: item.key,
    label: item.label,
  }));

  const handleMenuClick: MenuProps["onClick"] = (info) => {
    const target = SIDE_MENU_ITEMS.find((item) => item.key === info.key);
    if (!target) return;
    startTransition(() => {
      // 避免多余跳转和首页二次重定向导致的闪烁
      if (!pathname.startsWith(target.path)) {
        router.push(target.path);
      }
    });
  };

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    router.replace("/login");
  };

  return (
    <Layout className="devpocket-pages">
      <Sider
        collapsible
        breakpoint="md"
        className="devpocket-sider"
        collapsed={collapsed}
        collapsedWidth={80}
        trigger={null}
        width={240}
        onBreakpoint={(broken) => {
          handleComplete(broken);
        }}
      >
        <div className="devpocket-sider-header">
          <div className="devpocket-sider-header-logo">
            <div className="devpocket-sider-header-logo-icon">
              <AppstoreOutlined />
            </div>
            {!collapsed && (
              <div className="devpocket-sider-header-logo-title">
                我不知道叫什么
              </div>
            )}
          </div>
        </div>
        {!collapsed && (
          <div className="devpocket-sider-search">
            <Input
              allowClear
              placeholder="搜索菜单"
              prefix={<SearchOutlined />}
              value={searchValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleSearchChange(e.target.value)
              }
            />
          </div>
        )}

        <div className="devpocket-sider-menu">
          <div className="devpocket-sider-menu-items">
            <Menu
              className="content"
              items={items}
              mode="inline"
              openKeys={openKeys}
              selectedKeys={selectedKeys}
              theme="light"
              onClick={handleMenuClick}
              onOpenChange={handleOpenChange}
            />
          </div>
        </div>

        {/* <div className="devpocket-sider-menu">
          {!showSearchResults ? (
            <div className="devpocket-sider-menu-items">
              <Menu
                className="content"
                items={menuItems}
                mode="inline"
                openKeys={openKeys}
                selectedKeys={selectedKeys}
                theme="light"
                onClick={handleMenuClick}
                onOpenChange={handleOpenChange}
              />
            </div>
          ) : (
            <div className="devpocket-sider-search-results">
              <div className="devpocket-sider-search-results-count">
                共搜索到 {flatSearchResults.length} 项与"{searchValue}"相关的菜单
              </div>
              <div className="devpocket-sider-search-results-list">
                <List<IFlatMenuItem>
                  dataSource={flatSearchResults || []}
                  renderItem={(item: IFlatMenuItem) => (
                    <List.Item
                      className={`devpocket-sider-search-result-item ${
                        selectedKeys.includes(item.key) ? "devpocket-sider-search-result-item-selected" : ""
                      }`}
                      onClick={() => {
                        if (item.key.startsWith("/")) {
                          handleMenuClick({ key: item.key });
                        }
                      }}
                    >
                      <div className="devpocket-sider-search-result-content">
                        {item.icon && <span className="devpocket-sider-search-result-icon">{item.icon}</span>}
                        <span className="devpocket-sider-search-result-label">
                          {item.parentLabel ? `${item.parentLabel} / ${item.label}` : item.label}
                        </span>
                      </div>
                    </List.Item>
                  )}
                />
              </div>
            </div>
          )}
        </div> */}
      </Sider>
      <Layout className="devpocket-content">
        <Header className="devpocket-content-header">
          <div className="devpocket-content-header-left">
            <div
              className="devpocket-content-header-toggle"
              onClick={() => handleComplete(!collapsed)}
            >
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </div>
          </div>
          <div className="devpocket-content-header-center" />
          <div className="devpocket-content-header-right">
            <Space size="middle">
              <Space
                className="devpocket-content-header-content-user"
                style={{ cursor: "pointer" }}
              >
                <Avatar
                  icon={<UserOutlined />}
                  size={32}
                  style={{ backgroundColor: "#237ffa" }}
                />
                <Text style={{ fontSize: 14, color: "#595959" }}>管理员</Text>
              </Space>
            </Space>
          </div>
        </Header>
        <Content className="devpocket-content-outlet">{children}</Content>
      </Layout>
    </Layout>
  );
}
