'use client';

import { useState } from "react";
import { Button, Form, Input, Typography, message } from "antd";
import { useRouter } from "next/navigation";
import { LOGIN_PATH } from "@/lib/routes";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onFinish = async (values: {
    username: string;
    password: string;
    confirmPassword: string;
  }) => {
    if (values.password !== values.confirmPassword) {
      message.error("两次输入的密码不一致");
      return;
    }

    try {
      setLoading(true);
      // 这里可以调用真实的注册接口，目前先模拟成功
      await new Promise((resolve) => setTimeout(resolve, 500));
      message.success("注册成功，请登录");
      router.replace(LOGIN_PATH);
    } catch (error: any) {
      message.error(error.message || "注册失败，请稍后重试");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-sm">
        <Typography.Title level={3} className="mb-2! text-center!">
          注册账号
        </Typography.Title>
        <Typography.Paragraph className="mb-8! text-center! text-gray-500">
          创建一个新的管理后台账号
        </Typography.Paragraph>

        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: "请输入用户名" }]}
          >
            <Input placeholder="请输入用户名" />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: "请输入密码" }]}
          >
            <Input.Password placeholder="请输入密码" />
          </Form.Item>

          <Form.Item
            label="确认密码"
            name="confirmPassword"
            rules={[{ required: true, message: "请再次输入密码" }]}
          >
            <Input.Password placeholder="请再次输入密码" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loading}
            >
              注册
            </Button>
          </Form.Item>
        </Form>

        <div className="mt-4 flex justify-between text-sm text-gray-500">
          <span>已经有账号？</span>
          <Button type="link" onClick={() => router.push(LOGIN_PATH)}>
            去登录
          </Button>
        </div>
      </div>
    </div>
  );
}

