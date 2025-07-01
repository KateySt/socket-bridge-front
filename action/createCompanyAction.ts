"use server"

import {cookies} from "next/headers";
import {createCompany} from "@/api/companies";
import {redirect} from "next/navigation";

export async function createCompanyAction(formData: FormData) {
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const visible = formData.get('visible') === 'on';

  const cookieStore = await cookies();
  const user = cookieStore.get('user')?.value;

  if (!user) throw new Error('Unauthorized');

  const userId = JSON.parse(user).id;

  await createCompany({name, description, visible}, userId);

  redirect('/companies');
}
