import {NextRequest, NextResponse} from "next/server";

export async function GET(request: NextRequest) {
  const token = request.headers.get("authorization")?.trim();

  if (!token) {
    return NextResponse.json(
      {success: false, error: "Unauthorized: No access token"},
      {status: 401}
    );
  }

  const backendRes = await fetch(
    `${process.env.NEXT_PUBLIC_URL_BACK}/quizzes/api/analytics/avg-by-user`,
    {
      method: "GET",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
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
      label: "Average Score"
    }
  });
}
