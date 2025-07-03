import {getCompany} from "@/api/companies";
import DeleteCompanyModal from "@/component/DeleteCompanyModal/DeleteCompanyModal";
import EditCompanyModal from "@/component/EditCompanyModal/EditCompanyModal";
import {cookies} from "next/headers";
import InvitedList from "@/component/InvitedList/InvitedList";
import {deleteUserCompany} from "@/action/company";

export default async function CompanyProfile({params}: { params: Promise<{ id: string; locale: string }> }) {
  const {id} = await params;
  const company = await getCompany(id);
  const cookieStore = await cookies();
  const userRaw = JSON.parse(cookieStore.get("user")?.value ?? "");

  if (!company) return <div className="p-10">Company not found</div>;

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-4">{company.name}</h1>
      <p>{company.description}</p>
      {userRaw.id === company.owner_id && (
        <div className='flex flex-row gap-2 mt-3'>
          <EditCompanyModal/>
          <DeleteCompanyModal action={deleteUserCompany}/>
        </div>
      )}
      {userRaw.id === company.owner_id && (
        <InvitedList id={id}/>
      )}
    </div>
  );
}
