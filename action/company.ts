"use server"

import {cookies} from "next/headers";
import {createCompany, deleteCompany, getCompany, revokeInvitationCompany} from "@/api/companies";
import {redirect} from "next/navigation";
import {Router} from "@/utils/router";

export async function company(formData: FormData) {
  try {
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const visible = formData.get('visible') === 'on';

    const cookieStore = await cookies();
    const user = cookieStore.get('user')?.value;

    if (!user) throw new Error('Unauthorized');

    const userId = JSON.parse(user).id;

    await createCompany({name, description, visible}, userId);

    redirect('/companies');
  } catch (err) {
    if ((err as { message: string })?.message === 'NEXT_REDIRECT') throw err;
    console.error(err);
  }
}

export async function revokeInvitationAction(formData: FormData) {
  try {
    const cookieStore = await cookies();
    const user = JSON.parse(cookieStore.get('user')?.value ?? '{}');

    const companyId = formData.get('companyId')?.toString() || '';
    const userId = formData.get('userId')?.toString() || '';

    if (!companyId || !userId || !user.id) {
      throw new Error('Missing required fields');
    }

    await revokeInvitationCompany(companyId, user.id, userId);
    redirect(`/companies/${companyId}`);
  } catch (err) {
    if ((err as { message: string })?.message === 'NEXT_REDIRECT') throw err;
    console.error(err);
  }
}

export async function deleteUserCompany() {
  try {
    const cookieStore = await cookies();
    const company = JSON.parse(cookieStore.get("company")?.value ?? "");
    const userRaw = JSON.parse(cookieStore.get("user")?.value ?? "");
    await deleteCompany(userRaw.id, company.id);
    redirect(Router.Companies);
  } catch (err) {
    if ((err as { message: string })?.message === 'NEXT_REDIRECT') throw err;
    console.error(err);
  }
}

export async function selectCompanyAction(formData: FormData) {
  const companyJson = formData.get('company') as string;
  const companyId = JSON.parse(companyJson).id;
  const company = await getCompany(companyId);

  const cookieStore = await cookies();
  cookieStore.set('company', JSON.stringify(company), {
    httpOnly: true,
    path: '/',
    maxAge: 1800,
  });
  redirect(`/companies/${companyId}`);
}