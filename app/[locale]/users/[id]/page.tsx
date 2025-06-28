interface UserProfileProps {
    params: { id: string };
}

const mockUserData = {
    1: { name: 'Alice Johnson', age: 30 },
    2: { name: 'Bob Smith', age: 25 },
};

export default function UserProfile({ params }: UserProfileProps) {
    const user = mockUserData[params.id as keyof typeof mockUserData];
    if (!user) return <div className="p-10">User not found</div>;
    return (
        <div className="p-10">
            <h1 className="text-3xl font-bold mb-4">{user.name}</h1>
            <p>Age: {user.age}</p>
        </div>
    );
}
