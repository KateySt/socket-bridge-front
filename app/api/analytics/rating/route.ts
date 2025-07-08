import {NextRequest, NextResponse} from "next/server";

export async function GET(request: NextRequest) {
  const companyId = request.headers.get("companyId");
  const token = request.headers.get("authorization")?.trim();

  if (!token) {
    return NextResponse.json(
      {success: false, error: "Unauthorized: No access token"},
      {status: 401}
    );
  }

  const backendRes = await fetch(
    `${process.env.NEXT_PUBLIC_URL_BACK}/quizzes/api/analytics/rating?companyId=${companyId}`,
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

  return NextResponse.json({
    success: true,
    averageScore: data,
  });
}
