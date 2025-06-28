"use client";

import React, {useEffect, useState} from "react";
import {Link} from "@/i18n/navigation";
import {useLocale} from "use-intl";

const langs = [
  {code: "en", label: "English"},
  {code: "uk", label: "Українська"},
];

export function LanguageSelect() {
  const [rout, setRout] = useState("/");
  const currentLocale = useLocale();

  useEffect(() => {
    const cleaned = window.location.pathname.replace(/^\/(en|uk)/, "") || "/";
    setRout(cleaned);
  }, []);

  return (
    <div className="flex items-center gap-2 rounded-md border p-1 bg-base-100 shadow">
      {langs.map((lang) => (
        <Link
          key={lang.code}
          href={rout}
          locale={lang.code}
          className={`px-3 py-1 rounded-md text-sm transition-colors ${
            currentLocale === lang.code
              ? "bg-primary text-primary-content"
              : "hover:bg-base-200"
          }`}
        >
          {lang.label}
        </Link>
      ))}
    </div>
  );
}