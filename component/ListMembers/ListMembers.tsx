import React from 'react';
import {cookies} from "next/headers";
import {getListMembersCompany} from "@/api/companies";
import {appointAdminAction, leaveCompanyAction, removeUserAction} from "@/action/company";

const ListMembers = async ({id, ownerId}: { id: string, ownerId: string }) => {
  const cookieStore = await cookies();
  const userRaw = JSON.parse(cookieStore.get("user")?.value ?? "");
  const {users} = await getListMembersCompany(id, userRaw.id);

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-semibold mb-4">Members</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {users.length > 0 && users.map(user => (
          <div
            key={user.id}
            className="border border-gray-200 rounded-lg p-4 shadow-sm bg-white hover:shadow-md transition-shadow"
          >
            <h3 className="text-lg font-medium text-gray-800">{user.username}</h3>
            <p className="text-sm text-gray-500">{user.email}</p>
            {userRaw.id === ownerId && (
              <form action={removeUserAction} className="mt-3">
                <input type="hidden" name="companyId" value={id}/>
                <input type="hidden" name="userId" value={user.id}/>
                <button
                  type="submit"
                  className="text-red-600 text-sm hover:underline"
                >
                  Remove User
                </button>
              </form>
            )}
            {userRaw.id === ownerId && (
              <form action={appointAdminAction} className="mt-3">
                <input type="hidden" name="companyId" value={id}/>
                <input type="hidden" name="userId" value={user.id}/>
                <button
                  type="submit"
                  className="text-red-600 text-sm hover:underline"
                >
                  Appoint admin
                </button>
              </form>
            )}
            {userRaw.id === user.id && (
              <form action={leaveCompanyAction} className="mt-3">
                <input type="hidden" name="companyId" value={id}/>
                <button
                  type="submit"
                  className="text-red-600 text-sm hover:underline"
                >
                  Live company
                </button>
              </form>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListMembers;