"use client";

import React, { useEffect, useState } from "react";
import { Link } from "@/i18n/navigation";
import { useLocale } from "use-intl";

const langs = [
  { code: "en", label: "English" },
  { code: "uk", label: "Українська" },
];

export function LanguageSelect() {
  const [rout, setRout] = useState("/");
  const currentLocale = useLocale();

  useEffect(() => {
    const cleaned = window.location.pathname.replace(/^\/(en|uk)/, "") || "/";
    setRout(cleaned);
  }, []);

  return (
    <div className="flex items-center gap-2 rounded-xl bg-secondary p-1 shadow-md">
      {langs.map((lang) => (
        <Link
          key={lang.code}
          href={rout}
          locale={lang.code}
          className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors duration-200 ${
            currentLocale === lang.code
              ? "bg-secondary-content text-secondary"
              : "hover:bg-secondary-focus text-secondary-content"
          }`}
        >
          {lang.label}
        </Link>
      ))}
    </div>
  );
}