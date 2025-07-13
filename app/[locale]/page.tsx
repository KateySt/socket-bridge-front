import {getTranslations, setRequestLocale} from "next-intl/server";

export async function generateMetadata({params}: { params: Promise<{ locale: string }> }) {
  const {locale} = await params;
  const t = await getTranslations({locale: locale, namespace: "Metadata"});
  return {
    title: t("title"),
  };
}

export default async function Home({params}: { params: Promise<{ locale: string }> }) {
  const {locale} = await params;
  setRequestLocale(locale);

  return (
    <main className="p-10">
      <h1 className="text-4xl font-bold mb-4">Welcome to the App</h1>
    </main>
  );
}
