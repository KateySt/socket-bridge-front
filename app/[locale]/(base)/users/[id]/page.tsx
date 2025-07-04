import {cookies} from "next/headers";
import ProfileItem from "@/component/ProfileItem/ProfileItem";
import {getInvitations, getRequests, me} from "@/api/users";
import EditUserModal from "@/component/EditUserModal/EditUserModal";
import {redirect} from "next/navigation";
import {Router} from "@/utils/router";
import DeleteUserModal from "@/component/DeleteUserModal/DeleteUserModal";
import React from "react";
import {acceptInvitationAction, cancelRequestAction, declineInvitationAction, deleteProfile} from "@/action/user";

export default async function UserProfile({params}: { params: Promise<{ id: string; locale: string }> }) {
  try {
    const {id} = await params;
    const cookieStore = await cookies();
    const access_token = cookieStore.get('access_token')?.value;

    if (!access_token) {
      redirect(Router.Login);
    }

    const user = await me();
    const userInvitations = await getInvitations(id);
    const userRequests = await getRequests(id);

    if (!user) return <div className="p-10">User not found</div>;

    return (
      <main className="p-10 max-w-md mx-auto space-y-6">
        <h1 className="text-4xl font-bold mb-6 text-center">User info</h1>

        <div className="space-y-3">
          <ProfileItem label="Username" value={user.username}/>
          <ProfileItem label="Email" value={user.email}/>
          <ProfileItem label="First Name" value={user.firstName}/>
          <ProfileItem label="Last Name" value={user.lastName}/>
          <ProfileItem label="ID" value={user.id}/>
          <ProfileItem label="Email Verified" value={user.emailVerified ? 'Yes' : 'No'}/>
          <ProfileItem label="2FA Enabled" value={user.totp ? 'Yes' : 'No'}/>
          <ProfileItem label="Created" value={new Date(user.createdTimestamp).toLocaleString()}/>
        </div>
        <div className='flex flex-row gap-2'>
          <EditUserModal/>
          <DeleteUserModal action={deleteProfile}/>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">Invitations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {userInvitations.invitations.length > 0 && userInvitations.invitations.map(invintation => (
              <div
                key={invintation.id}
                className="border border-gray-200 rounded-lg p-4 shadow-sm bg-white hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-medium text-gray-800">{invintation.status}</h3>
                <p className="text-sm text-gray-500">{invintation.company_id}</p>

                <form action={acceptInvitationAction} className="mt-3">
                  <input type="hidden" name="companyId" value={invintation.company_id}/>
                  <button
                    type="submit"
                    className="text-red-600 text-sm hover:underline"
                  >
                    Accept Invitation
                  </button>
                </form>
                <form action={declineInvitationAction} className="mt-3">
                  <input type="hidden" name="companyId" value={invintation.company_id}/>
                  <button
                    type="submit"
                    className="text-red-600 text-sm hover:underline"
                  >
                    Decline Invitation
                  </button>
                </form>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">Requests</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {userRequests.invitations.length > 0 && userRequests.invitations.map(invintation => (
              <div
                key={invintation.id}
                className="border border-gray-200 rounded-lg p-4 shadow-sm bg-white hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-medium text-gray-800">{invintation.status}</h3>
                <p className="text-sm text-gray-500">{invintation.company_id}</p>
                <form action={cancelRequestAction} className="mt-3">
                  <input type="hidden" name="companyId" value={invintation.company_id}/>
                  <button
                    type="submit"
                    className="text-red-600 text-sm hover:underline"
                  >
                    Cancel Request
                  </button>
                </form>
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  } catch (err) {
    return <div>{err.toString()}</div>
  }
}
