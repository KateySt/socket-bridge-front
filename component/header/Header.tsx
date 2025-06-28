import {Router} from "@/utils/router";
import { Menu } from "lucide-react";
import { getTranslations } from 'next-intl/server';
import {LanguageSelect} from "@/component/select/LanguageSelect";
import { Link } from "@/i18n/navigation";

export async function Header() {
    const t = await getTranslations();
    return (
        <header className="navbar bg-base-100 shadow-md">
            <div className="flex-1">
                <Link href={Router.Home} className="btn btn-ghost text-xl">
                    {t("nav.app")}
                </Link>
            </div>
            <LanguageSelect/>
            <div className="flex-none">
                <div className="dropdown dropdown-end md:hidden">
                    <label tabIndex={0} className="btn btn-ghost">
                        <Menu className="w-5 h-5" />
                    </label>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                    >
                        <li><Link href={Router.About}>{t("nav.about")}</Link></li>
                        <li><Link href={Router.Users}>{t("nav.users")}</Link></li>
                        <li><Link href={Router.Companies}>{t("nav.companies")}</Link></li>
                    </ul>
                </div>
                <ul className="menu menu-horizontal px-1 hidden md:flex">
                    <li><Link href={Router.About}>{t("nav.about")}</Link></li>
                    <li><Link href={Router.Users}>{t("nav.users")}</Link></li>
                    <li><Link href={Router.Companies}>{t("nav.companies")}</Link></li>
                </ul>
            </div>
        </header>
    );
}