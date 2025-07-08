import React from "react";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";

export default async function Layout({children, params,}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token");
  const {locale} = await params;

  if (!token) {
    redirect(`/${locale}/login`);
  }

  return children;
}
