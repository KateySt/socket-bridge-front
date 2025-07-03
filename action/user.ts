"use server"

import {changeUser, deleteUser} from "@/api/users";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {Router} from "@/utils/router";
import {acceptInvitationCompany, declineInvitationCompany} from "@/api/companies";

export async function user(formData: FormData) {
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

export async function declineInvitationAction(formData: FormData) {
  try {
    const cookieStore = await cookies();


    const user = JSON.parse(cookieStore.get('user')?.value ?? '{}');

    const companyId = formData.get('companyId')?.toString() || '';

    if (!companyId || !user.id) {
      throw new Error('Missing required fields');
    }

    await declineInvitationCompany(companyId, user.id);
    redirect(`/users/${user.id}`);
  } catch (err) {
    if ((err as { message: string })?.message === 'NEXT_REDIRECT') throw err;
    console.error(err);
  }
}

export async function acceptInvitationAction(formData: FormData) {
  try {
    const cookieStore = await cookies();


    const user = JSON.parse(cookieStore.get('user')?.value ?? '{}');

    const companyId = formData.get('companyId')?.toString() || '';

    if (!companyId || !user.id) {
      throw new Error('Missing required fields');
    }

    await acceptInvitationCompany(companyId, user.id);
    redirect(`/users/${user.id}`);
  } catch (err) {
    if ((err as { message: string })?.message === 'NEXT_REDIRECT') throw err;
    console.error(err);
  }
}

export async function deleteProfile() {
  try {
    const cookieStore = await cookies();
    const userRaw = JSON.parse(cookieStore.get("user")?.value ?? "");
    await deleteUser(userRaw.id);

    cookieStore.delete("access_token");
    cookieStore.delete("user");
    redirect(Router.Login);
  } catch (err) {
    if ((err as { message: string })?.message === 'NEXT_REDIRECT') throw err;
    console.error(err);
  }
}