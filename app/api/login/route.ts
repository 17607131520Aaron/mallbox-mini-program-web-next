import { NextRequest, NextResponse } from "next/server";
import { AUTH_TOKEN_KEY } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  if (!username || !password) {
    return NextResponse.json(
      { message: "用户名和密码不能为空" },
      { status: 400 }
    );
  }

  // 示例：接受任意用户名密码作为成功登录
  const res = NextResponse.json({ success: true });

  res.cookies.set(AUTH_TOKEN_KEY, "demo-token", {
    httpOnly: true,
    path: "/",
  });

  return res;
}

