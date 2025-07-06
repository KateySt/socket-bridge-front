import {getCompany} from "@/api/companies";
import DeleteCompanyModal from "@/component/DeleteCompanyModal/DeleteCompanyModal";
import EditCompanyModal from "@/component/EditCompanyModal/EditCompanyModal";
import {cookies} from "next/headers";
import InvitedList from "@/component/InvitedList/InvitedList";
import {deleteUserCompany} from "@/action/company";
import {sendRequestAction} from "@/action/user";
import React from "react";
import ListRequests from "@/component/ListRequests/ListRequests";
import ListMembers from "@/component/ListMembers/ListMembers";
import ListAdmins from "@/component/ListAdmins/ListAdmins";
import {Link} from "@/i18n/navigation";
import {Router} from "@/utils/router";

export default async function CompanyProfile({params}: { params: Promise<{ id: string; locale: string }> }) {
  const {id} = await params;
  const company = await getCompany(id);
  const cookieStore = await cookies();
  const userRaw = JSON.parse(cookieStore.get("user")?.value ?? "");

  if (!company) return <div className="p-10">Company not found</div>;

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-4">{company.name}</h1>
      <Link href={Router.Companies + "/" + id + Router.Quizzes} className="btn btn-secondary">
        Quizzes
      </Link>
      <p>{company.description}</p>
      {userRaw.id === company.owner_id ? (
        <div className="flex flex-row gap-2 mt-3">
          <EditCompanyModal/>
          <DeleteCompanyModal action={deleteUserCompany}/>
        </div>
      ) : (
        <form action={sendRequestAction} className="mt-3">
          <input type="hidden" name="companyId" value={id}/>
          <button
            type="submit"
            className="text-red-600 text-sm hover:underline"
          >
            Send request to join
          </button>
        </form>
      )}
      {userRaw.id === company.owner_id && (
        <>
          <ListAdmins id={id}/>
          <InvitedList id={id}/>
          <ListRequests id={id}/>
        </>
      )}
      <ListMembers id={id} ownerId={company.owner_id}/>
    </div>
  );
}
