import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import AdminLayout from "@/components/layout/AdminLayout";
import { isAuthenticatedOnServer } from "@/lib/auth";
import { LOGIN_PATH } from "@/lib/routes";

export default async function AdminRootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const isAuthed = await isAuthenticatedOnServer();

  if (!isAuthed) {
    redirect(LOGIN_PATH);
  }

  return <AdminLayout>{children}</AdminLayout>;
}

