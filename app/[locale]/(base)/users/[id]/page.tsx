import {use} from "react";

const mockUserData = {
  '1': {name: 'Alice Johnson', age: 30},
  '2': {name: 'Bob Smith', age: 25},
};

export default function UserProfile({params}: { params: Promise<{ id: string; locale: string }> }) {
  const {id} = use(params);
  const user = mockUserData[id as keyof typeof mockUserData];
  if (!user) return <div className="p-10">User not found</div>;
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-4">{user.name}</h1>
      <p>Age: {user.age}</p>
    </div>
  );
}
