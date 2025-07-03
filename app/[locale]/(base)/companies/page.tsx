import {cookies} from "next/headers";
import {getCompanies, inviteToCompany} from "@/api/companies";
import CreateCompanyModal from "@/component/CreateCompanyModal/CreateCompanyModal";
import ManageUserToCompanyModal from "@/component/ManageUserToCompanyModal/ManageUserToCompanyModal";
import {selectCompanyAction} from "@/action/company";

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

      <CreateCompanyModal/>

      <ul className="py-2 px-4 bg-base-100 w-full rounded-box">
        {companies.map(company => (
          <li key={company.id} className="w-full flex gap-2 flex-row flex-nowrap">
            <form action={selectCompanyAction} className="w-full flex gap-2">
              <input type="hidden" name="company" value={JSON.stringify(company)}/>
              <button type="submit" className="w-full text-left">
                <div>
                  <span className="font-bold">{company.name}</span><br/>
                  <span className="text-sm text-gray-500">{company.description}</span>
                </div>
              </button>
            </form>
            {userRaw.id === company.owner_id && (
              <ManageUserToCompanyModal
                onSubmit={async (formData: FormData) => {
                  "use server";
                  const companyId = company.id;
                  const ownerId = userRaw.id;
                  await inviteToCompany(companyId, ownerId, formData.get("userId"));
                }}
                textButton="Invite user"
                description="Select users to invite"
                modalId={`manage-users-to-company-${company.id}`}/>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}