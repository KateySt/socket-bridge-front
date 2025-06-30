import React from "react";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";

export default async function Layout({
                                 children,
                                 params,
                               }: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token");

  if (!token) {
    redirect(`/${params.locale}/login`);
  }

  return children;
}
