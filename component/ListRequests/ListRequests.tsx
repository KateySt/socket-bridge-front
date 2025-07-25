import React from 'react';
import {cookies} from "next/headers";
import {getListRequestsCompany} from "@/api/companies";
import {approveRequestAction, rejectRequestAction} from "@/action/company";

const ListRequests = async ({id}: { id: string }) => {
  const cookieStore = await cookies();
  const userRaw = JSON.parse(cookieStore.get("user")?.value ?? "");
  const {users} = await getListRequestsCompany(id, userRaw.id);

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-semibold mb-4">Request Users</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {users.length > 0 && users.map(user => (
          <div
            key={user.id}
            className="border border-gray-200 rounded-lg p-4 shadow-sm bg-white hover:shadow-md transition-shadow"
          >
            <h3 className="text-lg font-medium text-gray-800">{user.username}</h3>
            <p className="text-sm text-gray-500">{user.email}</p>

            <form action={approveRequestAction} className="mt-3">
              <input type="hidden" name="companyId" value={id}/>
              <input type="hidden" name="userId" value={user.id}/>
              <button
                type="submit"
                className="text-red-600 text-sm hover:underline"
              >
                Approve Request
              </button>
            </form>
            <form action={rejectRequestAction} className="mt-3">
              <input type="hidden" name="companyId" value={id}/>
              <input type="hidden" name="userId" value={user.id}/>
              <button
                type="submit"
                className="text-red-600 text-sm hover:underline"
              >
                Reject Request
              </button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListRequests;