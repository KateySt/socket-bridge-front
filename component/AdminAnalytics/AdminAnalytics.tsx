import React from "react";
import {getCompanyUsersLastTests, getLastCompletions} from "@/api/analytic";
import {ChartData} from "chart.js";
import CustomChart from "@/component/CustomChart/CustomChart";

const AdminAnalytics = async ({id, userId}: { id: string, userId: string }) => {
  const chartQuizTests = await getCompanyUsersLastTests(userId, id);
  const chartQuiz = await getLastCompletions(userId, id);

  const chartQuizTestsData: ChartData<"line"> = {
    labels: chartQuizTests?.labels ?? [],
    datasets: [
      {
        label: chartQuizTests?.label ?? "",
        data: chartQuizTests?.data ?? [],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.3,
      },
    ],
  };

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

  return (
    <>
      <div className="p-2">
        <CustomChart data={sampleData}/>
      </div>
      <div className="p-2">
        <CustomChart data={chartQuizTestsData}/>
      </div>
    </>
  );
};

export default AdminAnalytics;