import {getUsers} from "@/api/users";
import {cookies} from "next/headers";

export default async function UsersPage() {
  const cookieStore = await cookies();
  const response = await getUsers();
  const users = Object.entries(response)
    .filter(([key]) => !isNaN(Number(key)))
    .map(([_, user]) => user);
  const userRaw = JSON.parse(cookieStore.get("user")?.value ?? "");

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-4">Users</h1>
      <ul className="menu bg-base-100 w-full rounded-box">
        {users.map(user => (
          <li key={user.id}>
            {user.id === userRaw.id ? (
              <a href={`/users/${user.id}`}>
                <span>{user.firstName} {user.lastName}</span>
                <span>{user.email}</span>
              </a>
            ) : (
              <div className="cursor-default">
                <span>{user.firstName} {user.lastName}</span>
                <span>{user.email}</span>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}