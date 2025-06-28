const mockUsers = [
    { id: 1, name: 'Alice Johnson' },
    { id: 2, name: 'Bob Smith' },
];

export default function UsersPage() {
    return (
        <div className="p-10">
            <h1 className="text-3xl font-bold mb-4">Users</h1>
            <ul className="menu bg-base-100 w-56 rounded-box">
                {mockUsers.map(user => (
                    <li key={user.id}>
                        <a href={`/users/${user.id}`}>{user.name}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
}