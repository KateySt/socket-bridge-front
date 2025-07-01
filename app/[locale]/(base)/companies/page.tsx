import {cookies} from "next/headers";
import {getCompanies, getCompany} from "@/api/companies";
import CreateCompanyModal from "@/component/CreateCompanyModal/CreateCompanyModal";
import {redirect} from 'next/navigation';

async function selectCompanyAction(formData: FormData) {
  "use server";
  const companyJson = formData.get('company') as string;
  const companyId = JSON.parse(companyJson).id;
  const company = await getCompany(companyId);

  const cookieStore = await cookies();
  cookieStore.set('company', JSON.stringify(company), {
    httpOnly: true,
    path: '/',
    maxAge: 1800,
  });
  redirect(`/companies/${companyId}`);
}

export default async function CompaniesPage() {
  const cookieStore = await cookies();
  const userRaw = JSON.parse(cookieStore.get("user")?.value ?? "");
  const response = await getCompanies(userRaw.id);
  const companies = Object.entries(response)
    .filter(([key]) => !isNaN(Number(key)))
    .map(([_, company]) => company);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-4">Companies</h1>

      <CreateCompanyModal />

      <ul className="menu bg-base-100 w-full rounded-box">
        {companies.map(company => (
          <li key={company.id}>
            <form action={selectCompanyAction}>
              <input type="hidden" name="company" value={JSON.stringify(company)} />
              <button type="submit" className="w-full text-left">
                <div>
                  <span className="font-bold">{company.name}</span><br/>
                  <span className="text-sm text-gray-500">{company.description}</span>
                </div>
              </button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
}