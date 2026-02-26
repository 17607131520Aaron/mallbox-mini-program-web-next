import React from "react";
import { HomeOutlined } from "@ant-design/icons";
export const ADMIN_HOME_PATH = "/home";
export const LOGIN_PATH = "/login";
export const REGISTER_PATH = "/register";

export const SIDE_MENU_ITEMS = [
  {
    key: "home",
    label: "首页",
    path: "/home",
    icon: <HomeOutlined />,
  },
  {
    key: "users",
    label: "用户管理",
    path: "/users",
  },
  {
    key: "orders",
    label: "订单管理",
    path: "/orders",
  },
  {
    key: "settings",
    label: "系统设置",
    path: "/settings",
  },
] as const;

