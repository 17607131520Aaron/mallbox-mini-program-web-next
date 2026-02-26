import { redirect } from "next/navigation";
import { isAuthenticatedOnServer } from "@/lib/auth";
import { ADMIN_HOME_PATH, LOGIN_PATH } from "@/lib/routes";

export default async function Home() {
  const isAuthed = await isAuthenticatedOnServer();

  if (isAuthed) {
    redirect(ADMIN_HOME_PATH);
  } else {
    redirect(LOGIN_PATH);
  }
}
