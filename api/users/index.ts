export async function login(user: { username: string; password: string }) {
  const res = await fetch('http://localhost:3000/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
    body: JSON.stringify(user),
    credentials: 'include',
  });

  if (!res.ok) throw new Error('Failed to login');

  return res.json();
}

export async function register(user: { username: string; password: string; first_name: string; last_name: string; email: string;}) {
  const res = await fetch('http://localhost:3000/api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
    credentials: 'include',
    body: JSON.stringify(user),
  });

  if (!res.ok) throw new Error('Failed to register');

  return res.json();
}

export async function fetchUsers() {
  const res = await fetch('http://localhost:3000/api/users', {
    cache: 'no-store'
  });
  if (!res.ok) throw new Error('Failed to fetch users');
  return res.json();
}
