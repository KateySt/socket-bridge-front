import {deleteCompany, getCompany} from "@/api/companies";
import {redirect} from "next/navigation";
import {Router} from "@/utils/router";
import DeleteCompanyModal from "@/component/DeleteCompanyModal/DeleteCompanyModal";
import EditCompanyModal from "@/component/EditCompanyModal/EditCompanyModal";
import {cookies} from "next/headers";

async function deleteUserCompany() {
  "use server";
  try {
    const cookieStore = await cookies();
    const company = JSON.parse(cookieStore.get("company")?.value ?? "");
    const userRaw = JSON.parse(cookieStore.get("user")?.value ?? "");
    await deleteCompany(userRaw.id, company.id);
    redirect(Router.Companies);
  } catch (err) {
    console.error(err);
  }
}

export default async function CompanyProfile({params}: { params: Promise<{ id: string; locale: string }> }) {
  const {id} = await params;
  const company = await getCompany(id);

  if (!company) return <div className="p-10">Company not found</div>;

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-4">{company.name}</h1>
      <p>{company.description}</p>
      <EditCompanyModal/>
      <DeleteCompanyModal action={deleteUserCompany}/>
    </div>
  );
}
