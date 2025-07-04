import {serverApiRequest} from "@/lib/axios";

export async function login(user: { username: string; password: string }) {
  return await serverApiRequest({
    method: 'POST',
    url: '/login',
    data: user,
  });
}

export async function register(user: {
  username: string;
  password: string;
  first_name: string;
  last_name: string;
  email: string;
}) {
  return await serverApiRequest({
    method: 'POST',
    url: '/register',
    data: user,
  });
}

export async function me() {

  return await serverApiRequest({
    method: 'GET',
    url: '/me',
  });
}

export async function getUsers() {
  return await serverApiRequest({
    method: 'GET',
    url: '/users',
  });
}

export async function changeUser(
  id: string,
  data: { first_name: string; last_name: string }
) {
  return await serverApiRequest({
    method: 'PUT',
    url: `/users/${id}`,
    data,
  });
}

export async function deleteUser(
  id: string
) {
  return await serverApiRequest({
    method: 'DELETE',
    url: `/users/${id}`,
  });
}

export async function getInvitations(id: string) {
  return await serverApiRequest({
    method: 'GET',
    url: `/me/invitations?userId=${id}`,
  });
}

export async function getRequests(id: string) {
  return await serverApiRequest({
    method: 'GET',
    url: `/me/requests?userId=${id}`,
  });
}