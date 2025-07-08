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
import Stars from "@/component/Stars/Stars";
import {getAvgByAllUser, getAvgByQuiz, getLastCompletions, getRatingCompany} from "@/api/analytic";
import AdminAnalytics from "@/component/AdminAnalytics/AdminAnalytics";
import {ChartData} from "chart.js";
import CustomChart from "@/component/CustomChart/CustomChart";

export default async function CompanyProfile({params}: { params: Promise<{ id: string; locale: string }> }) {
  const {id} = await params;
  const cookieStore = await cookies();
  const company = await getCompany(id);
  const userRaw = JSON.parse(cookieStore.get("user")?.value ?? "");
  const {averageScore} = await getRatingCompany(id);

  const isAdmin = userRaw.id === company.owner_id || company.admin_ids.includes(userRaw.id);

  const chartQuiz = await getAvgByAllUser();

  const sampleData: ChartData<"line"> = {
    labels: chartQuiz?.labels ?? [],
    datasets: [
      {
        label: chartQuiz?.label ?? "",
        data: chartQuiz?.data ?? [],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.3,
      },
    ],
  };

  const chartByQuiz = await getAvgByQuiz();

  const sampleDataByQuiz: ChartData<"line"> = {
    labels: chartByQuiz?.labels ?? [],
    datasets: [
      {
        label: chartByQuiz?.label ?? "",
        data: chartByQuiz?.data ?? [],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.3,
      },
    ],
  };

  if (!company) return <div className="p-10">Company not found</div>;

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-4">{company.name}</h1>
      <div className="mb-6">
        <p className="text-lg font-medium">Rating:</p>
        <div className="flex items-center gap-2">
          <Stars score={averageScore}/>
          <span className="text-sm text-gray-500">({averageScore.toFixed(1)} / 10)</span>
        </div>
      </div>
      <p>{company.description}</p>
      <Link href={Router.Companies + "/" + id + Router.Quizzes} className="btn btn-secondary">
        Quizzes
      </Link>

      <div className="p-2">
        <h2 className="text-xl font-bold mb-4">Analytic</h2>
        <CustomChart data={sampleData}/>
        <CustomChart data={sampleDataByQuiz}/>
      </div>

      {isAdmin && (
        <AdminAnalytics id={id} userId={userRaw.id} />
      )}

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
