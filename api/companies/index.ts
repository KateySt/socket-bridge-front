import {serverApiRequest} from "@/lib/axios";

export async function getCompanies(userId: string) {
  return await serverApiRequest({
    method: 'GET',
    url: '/company',
    headers: {
      'X-User-Id': userId,
    },
  });
}

export async function createCompany(company: { name: string, description: string, visible: boolean }, userId: string) {
  return await serverApiRequest({
    method: 'POST',
    url: '/company/' + userId,
    data: company
  });
}

export async function getCompany(id:string) {
  return await serverApiRequest({
    method: 'GET',
    url: '/company/' + id,
  });
}

export async function changeCompany(
  id: string,
  data: { name: string; description: string, companyId: string}
) {
  return await serverApiRequest({
    method: 'PUT',
    url: `/company/${id}`,
    data,
  });
}

export async function deleteCompany(
  id: string,
  companyId: string,
) {
  return await serverApiRequest({
    method: 'DELETE',
    url: `/company/${id}`,
    body:{
      companyId
    }
  });
}

