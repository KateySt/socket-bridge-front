import {userApi} from "@/api";

export async function fetchUsers() {
  const res = await fetch(process.env.NEXT_PUBLIC_URL + userApi.getUsers);
  if (!res.ok) throw new Error('Failed to fetch users');
  return res.json();
}
