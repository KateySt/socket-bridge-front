import {cookies} from "next/headers";
import ProfileItem from "@/component/ProfileItem/ProfileItem";
import {deleteUser, me} from "@/api/users";
import EditUserModal from "@/component/EditUserModal/EditUserModal";
import {redirect} from "next/navigation";
import {Router} from "@/utils/router";
import DeleteUserModal from "@/component/DeleteUserModal/DeleteUserModal";

async function deleteProfile() {
  "use server";
  try {
    const cookieStore = await cookies();
    const userRaw = JSON.parse(cookieStore.get("user")?.value ?? "");
    await deleteUser(userRaw.id);

    cookieStore.delete("access_token");
    cookieStore.delete("user");
    redirect(Router.Login);
  } catch (err) {
    console.error(err);
  }
}

export default async function UserProfile({params}: { params: Promise<{ id: string; locale: string }> }) {
  const {id} = await params;
  const user = await me();

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
    </main>
  );
}
