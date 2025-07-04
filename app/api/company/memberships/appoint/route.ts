import {NextRequest, NextResponse} from "next/server";

export async function POST(request: NextRequest) {
  const {companyId, userId, ownerId} = await request.json();
  const token = request.headers.get("authorization")?.trim();

  if (!token) {
    return NextResponse.json(
      {success: false, error: "Unauthorized: No access token"},
      {status: 401}
    );
  }

  const backendRes = await fetch(
    `${process.env.NEXT_PUBLIC_URL_BACK}/company/api/memberships/admin/appoint?companyId=${companyId}&userId=${userId}&ownerId=${ownerId}`,
    {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      }
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
    ...data,
  });
}
