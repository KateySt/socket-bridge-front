import {NextRequest, NextResponse} from "next/server";

export async function PUT(request: NextRequest, {params}: { params: { id: string } }) {
  const quiz = await request.json();
  const token = request.headers.get("authorization")?.trim();
  const {id} = await params;

  if (!token) {
    return NextResponse.json(
      {success: false, error: "Unauthorized: No access token"},
      {status: 401}
    );
  }

  const backendRes = await fetch(
    `${process.env.NEXT_PUBLIC_URL_BACK}/quizzes/api/quizzes/${id}`,
    {
      method: "PUT",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
        'X-User-Id': quiz.owner_id,
      },
      body: JSON.stringify(quiz),
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

  return NextResponse.json({success: true});
}

export async function DELETE(request: NextRequest, {params}: { params: { id: string } }) {
  const token = request.headers.get("authorization")?.trim();
  const {id} = await params;
  const quizId = await request.json();

  if (!token) {
    return NextResponse.json(
      {success: false, error: "Unauthorized: No access token"},
      {status: 401}
    );
  }

  const backendRes = await fetch(`${process.env.NEXT_PUBLIC_URL_BACK}/quizzes/api/quizzes/${quizId}`, {
    method: "DELETE",
    headers: {
      Authorization: token,
      'X-User-Id': id,
    },
  });

  if (!backendRes.ok) {
    const errorText = await backendRes.text().catch(() => "Unknown error");
    return NextResponse.json(
      {
        success: false,
        error: errorText,
      },
      {status: backendRes.status}
    );
  }

  return NextResponse.json({
    success: true,
    message: "User deleted successfully",
  });
}