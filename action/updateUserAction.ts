"use server"

import {changeUser} from "@/api/users";
import {cookies} from "next/headers";

export async function updateUserAction(formData: FormData) {
  const cookieStore = await cookies();
  const userRaw = JSON.parse(cookieStore.get("user")?.value ?? "");
  const firstName = formData.get('firstName')?.toString() || '';
  const lastName = formData.get('lastName')?.toString() || '';

  return await changeUser(
    userRaw.id,
    {
      first_name: firstName,
      last_name: lastName,
    }
  );
}
