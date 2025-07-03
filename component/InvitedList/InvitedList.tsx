import React from 'react';
import {cookies} from "next/headers";
import {getListInvitationsCompany} from "@/api/companies";
import {revokeInvitationAction} from "@/action/company";

const InvitedList = async ({id}: { id: string }) => {
  const cookieStore = await cookies();
  const userRaw = JSON.parse(cookieStore.get("user")?.value ?? "");
  const {users} = await getListInvitationsCompany(id, userRaw.id);

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-semibold mb-4">Invited Users</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {users.length > 0 && users.map(user => (
          <div
            key={user.id}
            className="border border-gray-200 rounded-lg p-4 shadow-sm bg-white hover:shadow-md transition-shadow"
          >
            <h3 className="text-lg font-medium text-gray-800">{user.username}</h3>
            <p className="text-sm text-gray-500">{user.email}</p>

            <form action={revokeInvitationAction} className="mt-3">
              <input type="hidden" name="companyId" value={id}/>
              <input type="hidden" name="userId" value={user.id}/>
              <button
                type="submit"
                className="text-red-600 text-sm hover:underline"
              >
                Revoke Invitation
              </button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InvitedList;