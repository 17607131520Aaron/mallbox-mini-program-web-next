'use client';

import { useState } from "react";
import { Button, Form, Input, Typography, message } from "antd";
import { useRouter } from "next/navigation";
import { ADMIN_HOME_PATH, REGISTER_PATH } from "@/lib/routes";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onFinish = async (values: { username: string; password: string }) => {
    try {
      setLoading(true);
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "登录失败");
      }

      message.success("登录成功");
      router.replace(ADMIN_HOME_PATH);
    } catch (error) {
        const errorMessage =
        error instanceof Error ? error.message : "登录失败，请稍后重试";
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-sm">
        <Typography.Title level={3} className="mb-2! text-center!">
          Mallbox 管理后台
        </Typography.Title>
        <Typography.Paragraph className="mb-8! text-center! text-gray-500">
          请输入账号和密码登录系统
        </Typography.Paragraph>

        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: "请输入用户名" }]}
          >
            <Input placeholder="admin" />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: "请输入密码" }]}
          >
            <Input.Password placeholder="任意密码（示例环境）" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loading}
            >
              登录
            </Button>
          </Form.Item>
        </Form>

        <div className="mt-4 flex justify-between text-sm text-gray-500">
          <span>还没有账号？</span>
          <Button type="link" onClick={() => router.push(REGISTER_PATH)}>
            去注册
          </Button>
        </div>
      </div>
    </div>
  );
}

