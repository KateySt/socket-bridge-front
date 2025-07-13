import {Router} from "@/utils/router";
import {Menu} from "lucide-react";
import {getTranslations} from "next-intl/server";
import {LanguageSelect} from "@/component/select/LanguageSelect";
import {Link} from "@/i18n/navigation";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {NotificationsDropdown} from "@/component/NotificationsDropdown/NotificationsDropdown";

async function logout() {
  "use server";
  const cookieStore = await cookies();
  cookieStore.delete("access_token");
  cookieStore.delete("user");
  redirect(Router.Login);
}

export async function Header() {
  const t = await getTranslations();
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token");
  const user = JSON.parse(cookieStore.get("user")?.value ?? "{}");
  const isAuthenticated = Boolean(token);

  const listLinks = (
    <>
      <li><Link href={Router.About}>{t("nav.about")}</Link></li>
      {isAuthenticated ? (
        <>
          <li><Link href={Router.Users}>{t("nav.users")}</Link></li>
          <li><Link href={Router.Companies}>{t("nav.companies")}</Link></li>
          <li>
            <form action={logout}>
              <button type="submit" className="btn btn-sm btn-accent">
                Logout
              </button>
            </form>
          </li>
        </>
      ) : (
        <>
          <li><Link href={Router.Login}>{t("nav.login")}</Link></li>
          <li><Link href={Router.Register}>{t("nav.register")}</Link></li>
        </>
      )}
    </>
  )

  return (
    <header className="navbar bg-secondary text-secondary-content shadow-md">
      <div className="flex-1">
        <Link href={Router.Home} className="btn btn-secondary text-xl normal-case">
          {t("nav.app")}
        </Link>
      </div>

      <NotificationsDropdown />

      <LanguageSelect/>

      <div className="flex-none">
        <div className="dropdown dropdown-end md:hidden">
          <label tabIndex={0} className="btn btn-secondary">
            <Menu className="w-5 h-5"/>
          </label>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-secondary text-secondary-content rounded-box w-52"
          >
            {listLinks}
          </ul>
        </div>

        <ul className="menu menu-horizontal px-1 hidden md:flex">
          {listLinks}
        </ul>
      </div>
    </header>
  );
}