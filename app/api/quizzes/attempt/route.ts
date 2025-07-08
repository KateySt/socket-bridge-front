import {NextRequest, NextResponse} from "next/server";

export async function POST(request: NextRequest) {
  const quiz = await request.json();
  const token = request.headers.get("authorization")?.trim();

  if (!token) {
    return NextResponse.json(
      {success: false, error: "Unauthorized: No access token"},
      {status: 401}
    );
  }

  const backendRes = await fetch(
    `${process.env.NEXT_PUBLIC_URL_BACK}/quizzes/api/quiz-results/attempt`,
    {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
        "X-User-Id": quiz.userId,
      },
      body: JSON.stringify({
        quiz_id: quiz.quizId,
        company_id: quiz.companyId,
        answers: quiz.answers.map(el => ({question_id: el.questionId, selected_options: el.selectedOptions}))
      }),
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
