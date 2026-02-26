'use client';

import { Layout, Menu, Button } from "antd";
import type { MenuProps } from "antd";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useMemo, useTransition } from "react";
import { SIDE_MENU_ITEMS, ADMIN_HOME_PATH } from "@/lib/routes";

const { Header, Sider, Content } = Layout;

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [, startTransition] = useTransition();

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
      router.push(target.path === ADMIN_HOME_PATH ? "/" : target.path);
    });
  };

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    router.replace("/login");
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider theme="light" width={220}>
        <div className="flex h-16 items-center justify-center border-b border-gray-200 text-lg font-semibold">
          Mallbox 后台
        </div>
        <Menu
          mode="inline"
          selectedKeys={selectedKeys}
          items={items}
          onClick={handleMenuClick}
        />
      </Sider>
      <Layout>
        <Header className="flex items-center justify-between bg-white px-6 shadow-sm">
          <div className="text-base font-medium">企业管理系统</div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">欢迎回来，管理员</span>
            <Button size="small" onClick={handleLogout}>
              退出登录
            </Button>
          </div>
        </Header>
        <Content className="bg-slate-50 p-6">
          <div className="min-h-[calc(100vh-120px)] rounded-lg bg-white p-6 shadow-sm">
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

