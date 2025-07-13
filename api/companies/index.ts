import {serverApiRequest} from "@/lib/axios";

export async function getCompanies(userId: string, page = 0, size = 10, query = "") {
  return await serverApiRequest({
    method: 'GET',
    url: `/company?query=${encodeURIComponent(query)}&page=${page}&size=${size}`,
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

export async function getCompany(id: string) {
  return await serverApiRequest({
    method: 'GET',
    url: '/company/' + id,
  });
}

export async function changeCompany(
  id: string,
  data: { name: string; description: string, companyId: string }
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
    data: {
      companyId,
    },
  });
}

export async function inviteToCompany(companyId: string, ownerId: string, userId: string) {
  return await serverApiRequest({
    method: 'POST',
    url: '/company/memberships/invite',
    data: {
      companyId,
      ownerId,
      userId,
    }
  });
}

export async function getListInvitationsCompany(companyId: string, ownerId: string) {
  return await serverApiRequest({
    method: 'POST',
    url: `/company/${companyId}/invitations`,
    data: {
      ownerId,
    }
  });
}

export async function revokeInvitationCompany(companyId: string, ownerId: string, userId: string) {
  return await serverApiRequest({
    method: 'POST',
    url: '/company/memberships/revoke',
    data: {
      companyId,
      ownerId,
      userId,
    }
  });
}

export async function acceptInvitationCompany(companyId: string, userId: string) {
  return await serverApiRequest({
    method: 'POST',
    url: '/company/memberships/accept',
    data: {
      companyId,
      userId,
    }
  });
}

export async function declineInvitationCompany(companyId: string, userId: string) {
  return await serverApiRequest({
    method: 'POST',
    url: '/company/memberships/decline',
    data: {
      companyId,
      userId,
    }
  });
}

export async function sendRequestCompany(companyId: string, userId: string) {
  return await serverApiRequest({
    method: 'POST',
    url: '/company/memberships/request',
    data: {
      companyId,
      userId,
    }
  });
}

export async function cancelRequestCompany(companyId: string, userId: string) {
  return await serverApiRequest({
    method: 'POST',
    url: '/company/memberships/cancel',
    data: {
      companyId,
      userId,
    }
  });
}

export async function getListRequestsCompany(companyId: string, ownerId: string) {
  return await serverApiRequest({
    method: 'POST',
    url: `/company/${companyId}/requests`,
    data: {
      ownerId,
    }
  });
}

export async function approveRequestCompany(companyId: string, ownerId: string, userId: string) {
  return await serverApiRequest({
    method: 'POST',
    url: '/company/memberships/approve',
    data: {
      companyId,
      ownerId,
      userId,
    }
  });
}

export async function rejectRequestCompany(companyId: string, ownerId: string, userId: string) {
  return await serverApiRequest({
    method: 'POST',
    url: '/company/memberships/reject',
    data: {
      companyId,
      ownerId,
      userId,
    }
  });
}

export async function getListMembersCompany(companyId: string, ownerId: string) {
  return await serverApiRequest({
    method: 'POST',
    url: `/company/${companyId}/members`,
    data: {
      ownerId,
    }
  });
}

export async function removeUserCompany(companyId: string, ownerId: string, userId: string) {
  return await serverApiRequest({
    method: 'POST',
    url: '/company/memberships/remove',
    data: {
      companyId,
      ownerId,
      userId,
    }
  });
}

export async function leaveCompanyCompany(companyId: string, userId: string) {
  return await serverApiRequest({
    method: 'POST',
    url: '/company/memberships/leave',
    data: {
      companyId,
      userId,
    }
  });
}

export async function getListAdminsCompany(companyId: string, ownerId: string) {
  return await serverApiRequest({
    method: 'POST',
    url: `/company/${companyId}/admins`,
    data: {
      ownerId,
    }
  });
}

export async function removeAminCompany(companyId: string, ownerId: string, userId: string) {
  return await serverApiRequest({
    method: 'POST',
    url: '/company/memberships/remove/admin',
    data: {
      companyId,
      ownerId,
      userId,
    }
  });
}

export async function appointAminCompany(companyId: string, ownerId: string, userId: string) {
  return await serverApiRequest({
    method: 'POST',
    url: '/company/memberships/appoint',
    data: {
      companyId,
      ownerId,
      userId,
    }
  });
}