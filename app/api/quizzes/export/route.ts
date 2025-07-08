import {NextRequest, NextResponse} from "next/server";

export async function GET(request: NextRequest) {
  const userId = request.headers.get("x-user-id");
  const format = request.nextUrl.searchParams.get("format") || "json";
  const targetUserId = request.nextUrl.searchParams.get("userId");

  const query = new URLSearchParams();
  if (format) query.append("format", format);
  if (targetUserId) query.append("userId", targetUserId);

  const backendUrl = `${process.env.NEXT_PUBLIC_URL_BACK}/quizzes/api/quiz-results/export?${query.toString()}`;

  const backendRes = await fetch(backendUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-User-Id": userId || "",
    },
  });

  if (!backendRes.ok) {
    const errorData = await backendRes.json().catch(() => ({}));
    return NextResponse.json(
      {
        success: false,
        error: errorData.error || errorData.message || "Unknown error",
      },
      { status: backendRes.status }
    );
  }

  if (!backendRes.ok) {
    const text = await backendRes.text();
    return new NextResponse(text, { status: backendRes.status });
  }

  if (format === "CSV") {
    const csv = await backendRes.text();
    return new NextResponse(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="results_${targetUserId}.csv"`,
      },
    });
  }

  if (format === "JSON") {
    const json = await backendRes.text();
    return new NextResponse(json, {
      status: 200,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Content-Disposition": `attachment; filename="results_${targetUserId}.json"`,
      },
    });
  }

  return new NextResponse("Unsupported format", { status: 400 });
}

