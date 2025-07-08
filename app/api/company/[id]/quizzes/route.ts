import {NextRequest, NextResponse} from "next/server";

export async function GET(request: NextRequest, {params}: { params: Promise<{ id: string }> }) {
  const {id} = await params;

  const token = request.headers.get("authorization")?.trim();

  if (!token) {
    return NextResponse.json(
      {success: false, error: "Unauthorized: No access token"},
      {status: 401}
    );
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL_BACK}/quizzes/api/quizzes/company/${id}`,
    {
      method: "GET",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    return NextResponse.json(
      {
        success: false,
        error: errorData.error || errorData.message || "Failed to fetch invitations",
      },
      {status: res.status}
    );
  }

  const data = await res.json();

  return NextResponse.json({
    success: true,
    quizzes: data,
  });
}

