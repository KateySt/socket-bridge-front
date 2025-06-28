import { use } from 'react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { fetchUsers } from '@/api/users';

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const t = await getTranslations({ locale: params.locale, namespace: 'Metadata' });
  return {
    title: t('title'),
  };
}

export default function Home({ params }: { params: { locale: string } }) {
  const { locale } = params;
  setRequestLocale(locale);

  const users = use(fetchUsers());

  console.log(users);

  return (
    <main className="p-10">
      <h1 className="text-4xl font-bold mb-4">Welcome to the App</h1>
      <p className="text-lg">Users count: {users.length}</p>
      <input type="text" placeholder="Secondary" className="input input-secondary" />
    </main>
  );
}
