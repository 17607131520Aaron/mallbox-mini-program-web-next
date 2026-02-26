import { NextResponse } from "next/server";
import { AUTH_TOKEN_KEY } from "@/lib/auth";

export async function POST() {
  const res = NextResponse.json({ success: true });

  res.cookies.set(AUTH_TOKEN_KEY, "", {
    httpOnly: true,
    path: "/",
    maxAge: 0,
  });

  return res;
}

