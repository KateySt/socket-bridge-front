import {NextRequest, NextResponse} from "next/server";

export async function GET(request: NextRequest) {
  const userId = request.headers.get("x-user-id");
  const companyId = request.headers.get("companyId");
  const token = request.headers.get("authorization")?.trim();

  if (!token) {
    return NextResponse.json(
      {success: false, error: "Unauthorized: No access token"},
      {status: 401}
    );
  }

  const backendRes = await fetch(
    `${process.env.NEXT_PUBLIC_URL_BACK}/quizzes/api/analytics/company-users-last-tests?companyId=${companyId}`,
    {
      method: "GET",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
        "X-User-Id": userId,
      },
    }
  );

  if (!backendRes.ok) {
    const errorData = await backendRes.json().catch(() => ({}));
    return NextResponse.json(
      {
        success: false,
        error: errorData.error || errorData.message || "Unknown error",
      },
      {status: backendRes.status}
    );
  }

  const data = await backendRes.json();

  const chartData = data.map((item: any) => item.avgScore);
  const chartLabels = data.map((item: any) => item.quizTitle);

  return NextResponse.json({
    success: true,
    chart: {
      labels: chartLabels,
      data: chartData,
      label: "Last Completions"
    }
  });
}
