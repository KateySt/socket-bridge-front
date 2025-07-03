import {getTranslations, setRequestLocale} from 'next-intl/server';
import {redirect} from 'next/navigation';
import {cookies} from "next/headers";
import {me, register} from '@/api/users';
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

export default async function RegisterPage({params}: { params: Promise<{ locale: string }> }) {
  const {locale} = await params;
  setRequestLocale(locale);

  return (
    <main className="p-10 max-w-md mx-auto">
      <h1 className="text-4xl font-bold mb-6">Registration</h1>

      <form
        action={async (formData: FormData) => {
          'use server';
          const username = formData.get('username') as string;
          const password = formData.get('password') as string;
          const first_name = formData.get('first_name') as string;
          const last_name = formData.get('last_name') as string;
          const email = formData.get('email') as string;

          if (!username || !password || !first_name || !last_name || !email) return;

          try {
            await register({
              username,
              password,
              first_name,
              last_name,
              email,
            }).then(async token => {
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
            console.error('Registration error:', err);
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
        <input
          name="first_name"
          placeholder="First Name"
          className="input input-secondary w-full"
          required
        />
        <input
          name="last_name"
          placeholder="Last Name"
          className="input input-secondary w-full"
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="input input-secondary w-full"
          required
        />
        <button type="submit" className="btn btn-secondary">
          Register
        </button>
        <Link href={Router.Login} className="text-center text-sm text-secondary-content underline">
          Already have an account? Login
        </Link>
      </form>
      <Link href={googleLink}>
        Google
      </Link>
    </main>
  );
}
