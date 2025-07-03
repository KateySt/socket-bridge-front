import {getTranslations, setRequestLocale} from 'next-intl/server';
import {redirect} from 'next/navigation';
import {login, me} from '@/api/users';
import {cookies} from "next/headers";
import {Link} from "@/i18n/navigation";
import {Router} from "@/utils/router";
import {googleLink} from "@/api";

export async function generateMetadata({params}: { params: Promise<{ locale: string }> }) {
  const {locale} = await params;
  const t = await getTranslations({locale: locale, namespace: 'Metadata'});
  return {
    title: t('title'),
  };
}

export default async function LoginPage({params}: { params: Promise<{ locale: string }> }) {
  const {locale} = await params;
  setRequestLocale(locale);

  return (
    <main className="p-10 max-w-md mx-auto">
      <h1 className="text-4xl font-bold mb-6">Login</h1>

      <form
        action={async (formData: FormData) => {
          'use server';
          const username = formData.get('username') as string;
          const password = formData.get('password') as string;

          if (!username || !password) return

          try {
            await login({username, password}).then(async token=>{
              const cookieStore = await cookies();

              cookieStore.set('access_token', token.access_token, {
                httpOnly: true,
                path: '/',
                maxAge: 1800,
              });

              const user = await me();

              cookieStore.set('user', JSON.stringify(user), {
                httpOnly: true,
                path: '/',
                maxAge: 1800,
              });
            });

            redirect(Router.Home);
          } catch (err) {
            if ((err as { message: string })?.message === 'NEXT_REDIRECT') throw err;
            console.error('Login error:', err);
          }
        }}
        className="flex flex-col gap-4"
      >
        <input
          name="username"
          placeholder="Username"
          className="input input-secondary w-full"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="input input-secondary w-full"
          required
        />
        <button type="submit" className="btn btn-secondary">
          Login
        </button>
        <Link href={Router.Register}>Registration</Link>
      </form>
     <Link href={googleLink}>
       Google
     </Link>
    </main>
  );
}